import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MARKET_CENTER,
  MAX_PAN_BOUNDS,
  getInitialFitBounds,
  svgToGeoLatLng,
  polygonToLatLngs,
  resolveGeoLatLng,
  haversineMeters
} from './projection.js';
import {
  createFeaturedMarker,
  createStandCircle,
  createPoiMarker,
  createZoneLabelMarker,
  createUserLocationMarker,
  createPulseMarker
} from './markers.js';

export class CuemancoMap {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.options = options;

    this.markersMap = new Map();
    this.poisMap = new Map();
    this.zonesMap = new Map();

    this.activePulseMarker = null;
    this.activeZoneId = null;
    this.selectedId = null;
    this.selectedType = null;
    this.selectedMarkerEntry = null;
    this.currentCategory = 'todos';
    this.showAllStands = true;
    this.baseStyle = 'voyager';

    const initialMobile = this.isMobileViewport();
    this.layerVisibility = {
      locales: true,
      sanitarios: !initialMobile,
      accesos: true
    };

    this.onSelectCallback = options.onSelectLocal || (() => {});
    this.onLayerChangeCallback = options.onLayerChange || (() => {});

    this.initMap();
  }

  isMobileViewport() {
    return typeof window !== 'undefined' && window.innerWidth <= 900;
  }

  svgToLatLng(coords) {
    return svgToGeoLatLng(coords);
  }

  initMap() {
    this.map = L.map(this.containerId, {
      center: MARKET_CENTER,
      zoom: 17,
      minZoom: 15,
      maxZoom: 20,
      zoomSnap: 0.25,
      zoomDelta: 0.5,
      wheelPxPerZoomLevel: 100,
      tapTolerance: 18,
      zoomControl: false,
      preferCanvas: true,
      attributionControl: false,
      inertia: true,
      inertiaDeceleration: 3000,
      maxBounds: MAX_PAN_BOUNDS,
      maxBoundsViscosity: 0.85
    });

    // Mapa base continuo OpenStreetMap Standard y capa Satélite Esri + referencias (sin API key)
    this.voyagerLayer = L.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 20,
        maxNativeZoom: 19
      }
    ).addTo(this.map);

    this.map.getContainer().classList.add('map-base-voyager');

    this.satelliteGroup = L.layerGroup([
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 20,
          maxNativeZoom: 19
        }
      ),
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 20,
          maxNativeZoom: 19,
          opacity: 0.78
        }
      ),
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 20,
          maxNativeZoom: 19,
          opacity: 0.9
        }
      )
    ]);

    if (this.isMobileViewport()) {
      this.map.fitBounds(getInitialFitBounds(true), {
        paddingTopLeft: [16, 108],
        paddingBottomRight: [16, 138]
      });
    } else {
      this.map.fitBounds(getInitialFitBounds(false));
    }

    // Capas ordenadas de abajo hacia arriba (sin polígonos de sectores)
    this.zonesLayerGroup = L.layerGroup();
    this.sanitariosLayerGroup = L.layerGroup();
    if (this.layerVisibility.sanitarios) {
      this.sanitariosLayerGroup.addTo(this.map);
    }
    this.accesosLayerGroup = L.layerGroup().addTo(this.map);
    this.standsLayerGroup = L.layerGroup().addTo(this.map);
    this.featuredLayerGroup = L.layerGroup().addTo(this.map);
    this.userLocationLayerGroup = L.layerGroup().addTo(this.map);
    this.highlightLayerGroup = L.layerGroup().addTo(this.map);

    L.control.attribution({
      position: 'bottomright',
      prefix: 'Cuemanco · © OpenStreetMap · Esri'
    }).addTo(this.map);

    this.updateZoomLOD();
    this.map.on('zoomend', () => this.updateZoomLOD());

    this.map.on('click', (e) => {
      if (
        e.originalEvent &&
        e.originalEvent.target &&
        (e.originalEvent.target.classList.contains('leaflet-container') ||
          e.originalEvent.target.classList.contains('leaflet-tile') ||
          e.originalEvent.target.classList.contains('leaflet-pane'))
      ) {
        this.clearSelection();
      }
    });
  }

  setBaseStyle(style = 'voyager') {
    const next = style === 'satellite' ? 'satellite' : 'voyager';
    this.baseStyle = next;

    const container = this.map.getContainer();
    container.classList.toggle('map-base-satellite', next === 'satellite');
    container.classList.toggle('map-base-voyager', next !== 'satellite');

    if (next === 'satellite') {
      if (this.map.hasLayer(this.voyagerLayer)) this.map.removeLayer(this.voyagerLayer);
      if (!this.map.hasLayer(this.satelliteGroup)) this.map.addLayer(this.satelliteGroup);
    } else {
      if (this.map.hasLayer(this.satelliteGroup)) this.map.removeLayer(this.satelliteGroup);
      if (!this.map.hasLayer(this.voyagerLayer)) this.map.addLayer(this.voyagerLayer);
    }

    return next;
  }

  updateZoomLOD() {
    const container = this.map.getContainer();
    const zoom = this.map.getZoom();
    container.classList.remove('map-zoom-low', 'map-zoom-mid', 'map-zoom-high');
    if (zoom < 17.25) {
      container.classList.add('map-zoom-low');
    } else if (zoom < 18.25) {
      container.classList.add('map-zoom-mid');
    } else {
      container.classList.add('map-zoom-high');
    }
  }

  renderZones() {
    this.zonesLayerGroup.clearLayers();
    this.zonesMap.clear();
  }

  renderPOIs(pois = []) {
    this.sanitariosLayerGroup.clearLayers();
    this.accesosLayerGroup.clearLayers();
    this.poisMap.clear();

    const defaultZMap = {
      sanitario: 360,
      estacionamiento: 380,
      acceso: 390
    };

    for (const poi of pois) {
      const latLng = resolveGeoLatLng(poi);
      const marker = createPoiMarker(poi, latLng, (item, type) => {
        this.selectItem(item, type);
      });

      const targetGroup = poi.poiType === 'sanitario'
        ? this.sanitariosLayerGroup
        : this.accesosLayerGroup;

      targetGroup.addLayer(marker);
      this.poisMap.set(poi.id, {
        marker,
        poi,
        defaultZIndex: defaultZMap[poi.poiType] || 370
      });
    }

    this.applyCategoryStylesToZonesAndPois();
    if (this.selectedType === 'poi' && this.selectedId) {
      this.applySelectionFocus(this.selectedId, 'poi');
    }
  }

  renderLocales(featuredLocales = [], allLocales = []) {
    this.featuredLayerGroup.clearLayers();
    this.standsLayerGroup.clearLayers();
    this.markersMap.clear();

    featuredLocales.forEach((local, index) => {
      const latLng = resolveGeoLatLng(local);
      const marker = createFeaturedMarker(local, latLng, (item, type) => {
        this.selectItem(item, type);
      }, index);

      this.featuredLayerGroup.addLayer(marker);
      this.markersMap.set(local.id, { marker, local, isFeatured: true, defaultZIndex: 500 });
    });

    for (const local of allLocales) {
      if (this.markersMap.has(local.id)) continue;

      const latLng = resolveGeoLatLng(local);
      const circle = createStandCircle(local, latLng, (item, type) => {
        this.selectItem(item, type);
      });

      this.standsLayerGroup.addLayer(circle);
      this.markersMap.set(local.id, { marker: circle, local, isFeatured: false, defaultZIndex: 400 });
    }

    if (this.currentCategory !== 'todos') {
      this.filterByCategory(this.currentCategory);
    }

    if (this.selectedType === 'local' && this.selectedId) {
      this.applySelectionFocus(this.selectedId, 'local');
    }
  }

  toggleLayer(layerName, visible) {
    if (layerName === 'zonas') {
      return { ...this.layerVisibility };
    }
    const nextVisible = typeof visible === 'boolean'
      ? visible
      : !this.layerVisibility[layerName];
    this.layerVisibility[layerName] = nextVisible;

    const groupsMap = {
      locales: [this.featuredLayerGroup, ...(this.showAllStands ? [this.standsLayerGroup] : [])],
      sanitarios: [this.sanitariosLayerGroup],
      accesos: [this.accesosLayerGroup]
    };

    const groups = groupsMap[layerName] || [];
    for (const group of groups) {
      if (nextVisible) {
        if (!this.map.hasLayer(group)) this.map.addLayer(group);
      } else {
        if (this.map.hasLayer(group)) this.map.removeLayer(group);
      }
    }

    const snapshot = { ...this.layerVisibility };
    this.onLayerChangeCallback(snapshot);
    return snapshot;
  }

  toggleStandsView(enable) {
    this.showAllStands = enable;
    if (enable && this.layerVisibility.locales) {
      if (!this.map.hasLayer(this.standsLayerGroup)) {
        this.map.addLayer(this.standsLayerGroup);
      }
    } else if (this.map.hasLayer(this.standsLayerGroup)) {
      this.map.removeLayer(this.standsLayerGroup);
    }
  }

  matchesCategory(item, catId) {
    if (catId === 'todos') return true;
    return (
      item.categoriaId === catId ||
      (Array.isArray(item.categoriasAdicionales) && item.categoriasAdicionales.includes(catId))
    );
  }

  applyZoneStyle() {}

  applyZoneStyles() {}

  applyCategoryStylesToZonesAndPois() {
    const showFullPoi = this.currentCategory === 'todos' || this.currentCategory === 'servicios';
    for (const { marker, poi } of this.poisMap.values()) {
      const match = showFullPoi || this.matchesCategory(poi, this.currentCategory);
      marker.setOpacity(match ? 1 : 0.4);
    }
  }

  filterByCategory(catId) {
    this.currentCategory = catId;
    this.map.getContainer().classList.toggle('map-filtered', catId !== 'todos');

    for (const item of this.markersMap.values()) {
      const match = this.matchesCategory(item.local, catId);
      const layerGroup = item.isFeatured ? this.featuredLayerGroup : this.standsLayerGroup;
      if (match) {
        layerGroup.addLayer(item.marker);
      } else {
        layerGroup.removeLayer(item.marker);
      }
    }

    this.applyCategoryStylesToZonesAndPois();
  }

  highlightZone() {
    this.activeZoneId = null;
  }

  clearSelectionFocus() {
    const container = this.map.getContainer();
    container.classList.remove('has-selection');

    if (this.selectedMarkerEntry) {
      const { marker, defaultZIndex } = this.selectedMarkerEntry;
      if (typeof marker.setZIndexOffset === 'function') {
        marker.setZIndexOffset(defaultZIndex);
      }
      const el = typeof marker.getElement === 'function' ? marker.getElement() : null;
      if (el) el.classList.remove('is-selected');
      this.selectedMarkerEntry = null;
    }
  }

  applySelectionFocus(id, itemType) {
    this.clearSelectionFocus();

    const container = this.map.getContainer();
    container.classList.add('has-selection');

    const entry = itemType === 'local'
      ? this.markersMap.get(id)
      : itemType === 'poi'
        ? this.poisMap.get(id)
        : null;

    if (!entry) return;

    const { marker, defaultZIndex } = entry;
    if (typeof marker.setZIndexOffset === 'function') {
      marker.setZIndexOffset(900);
    }

    const markSelectedEl = () => {
      const el = typeof marker.getElement === 'function' ? marker.getElement() : null;
      if (el) el.classList.add('is-selected');
    };

    markSelectedEl();
    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(markSelectedEl);
    }

    this.selectedMarkerEntry = { marker, defaultZIndex };
  }

  selectItem(item, itemType = 'local') {
    if (!item) {
      this.clearSelection();
      return;
    }

    const normalizedType = typeof itemType === 'boolean'
      ? (itemType ? 'local' : 'poi')
      : (itemType || (item.isZone ? 'zone' : 'local'));

    if (normalizedType === 'poi' && item.poiType === 'sanitario' && !this.layerVisibility.sanitarios) {
      this.toggleLayer('sanitarios', true);
    }

    this.selectedId = item.id;
    this.selectedType = normalizedType;
    this.highlightLayerGroup.clearLayers();
    this.applySelectionFocus(item.id, normalizedType);

    const isMobile = this.isMobileViewport();

    if (normalizedType === 'zone' && Array.isArray(item.polygon) && item.polygon.length >= 3) {
      const bounds = L.polygon(polygonToLatLngs(item.polygon)).getBounds();
      if (isMobile) {
        const mapSize = this.map.getSize();
        this.map.flyToBounds(bounds, {
          paddingTopLeft: [24, 110],
          paddingBottomRight: [24, Math.round(mapSize.y * 0.48)],
          maxZoom: 18.25,
          duration: 0.7
        });
      } else {
        this.map.flyToBounds(bounds, {
          padding: [70, 70],
          maxZoom: 18.5,
          duration: 0.75
        });
      }
    } else {
      const latLng = resolveGeoLatLng(item);
      if (isMobile) {
        const targetZoom = Math.max(this.map.getZoom(), 18.25);
        const projected = this.map.project(latLng, targetZoom);
        const offsetY = Math.round(this.map.getSize().y * 0.19);
        const shiftedLatLng = this.map.unproject([projected.x, projected.y + offsetY], targetZoom);
        this.map.flyTo(shiftedLatLng, targetZoom, {
          duration: 0.7,
          easeLinearity: 0.25
        });
      } else {
        const targetZoom = Math.max(this.map.getZoom(), 18.5);
        this.map.flyTo(latLng, targetZoom, {
          duration: 0.75,
          easeLinearity: 0.25
        });
      }

      this.activePulseMarker = createPulseMarker(latLng).addTo(this.highlightLayerGroup);
    }

    this.onSelectCallback(item, normalizedType);
  }

  selectById(id) {
    if (!id) return false;

    if (this.markersMap.has(id)) {
      this.selectItem(this.markersMap.get(id).local, 'local');
      return true;
    }
    if (this.poisMap.has(id)) {
      this.selectItem(this.poisMap.get(id).poi, 'poi');
      return true;
    }
    if (this.zonesMap.has(id)) {
      this.selectItem(this.zonesMap.get(id).zone, 'zone');
      return true;
    }
    return false;
  }

  locateUser({ onStatus = () => {} } = {}) {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      onStatus({ ok: false, reason: 'unsupported' });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const accuracy = pos.coords.accuracy || 25;
        const userLatLng = [lat, lng];

        this.userLocationLayerGroup.clearLayers();

        L.circle(userLatLng, {
          radius: Math.min(accuracy, 120),
          color: '#2563EB',
          weight: 1,
          opacity: 0.45,
          fillColor: '#3B82F6',
          fillOpacity: 0.14,
          interactive: false
        }).addTo(this.userLocationLayerGroup);

        createUserLocationMarker(userLatLng).addTo(this.userLocationLayerGroup);

        const distanceMeters = Math.round(haversineMeters(userLatLng, MARKET_CENTER));
        const inBounds = L.latLngBounds(MAX_PAN_BOUNDS).contains(userLatLng);

        if (distanceMeters <= 2500 && inBounds) {
          this.map.flyTo(userLatLng, 18.5, { duration: 0.8 });
        }

        onStatus({
          ok: true,
          lat,
          lng,
          accuracy,
          insideMarket: distanceMeters <= 550,
          distanceMeters,
          inBounds
        });
      },
      (err) => {
        onStatus({
          ok: false,
          reason: err.code === 1 ? 'denied' : 'unavailable'
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 15000
      }
    );
  }

  prepareIntroOverview() {
    this.map.setView(MARKET_CENTER, 15.6, { animate: false });
  }

  playIntroFlyIn(targetId = null) {
    if (targetId && this.selectById(targetId)) {
      return;
    }

    if (this.isMobileViewport()) {
      this.map.flyToBounds(getInitialFitBounds(true), {
        paddingTopLeft: [16, 108],
        paddingBottomRight: [16, 138],
        duration: 1.0,
        easeLinearity: 0.2
      });
    } else {
      this.map.flyToBounds(getInitialFitBounds(false), {
        duration: 1.0,
        easeLinearity: 0.2
      });
    }
  }

  resetView() {
    if (this.isMobileViewport()) {
      this.map.flyToBounds(getInitialFitBounds(true), {
        paddingTopLeft: [16, 108],
        paddingBottomRight: [16, 138],
        duration: 0.75
      });
    } else {
      this.map.flyToBounds(getInitialFitBounds(false), { duration: 0.75 });
    }
  }

  clearSelection() {
    this.highlightLayerGroup.clearLayers();
    this.activePulseMarker = null;
    this.activeZoneId = null;
    this.selectedId = null;
    this.selectedType = null;
    this.clearSelectionFocus();
    this.applyZoneStyles();
    this.onSelectCallback(null, null);
  }
}
