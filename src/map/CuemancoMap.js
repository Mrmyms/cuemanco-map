import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MAP_WIDTH,
  MAP_HEIGHT,
  MAP_BOUNDS,
  INITIAL_FIT_BOUNDS,
  svgToLatLng,
  polygonToLatLngs,
  resolveMapCoords
} from './projection.js';
import {
  createFeaturedMarker,
  createStandCircle,
  createPoiMarker,
  createZoneLabelMarker,
  createPulseMarker
} from './markers.js';

export class CuemancoMap {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.options = options;
    this.width = MAP_WIDTH;
    this.height = MAP_HEIGHT;
    this.bounds = MAP_BOUNDS;

    this.markersMap = new Map();
    this.poisMap = new Map();
    this.zonesMap = new Map();

    this.activePulseMarker = null;
    this.activeZoneId = null;
    this.currentCategory = 'todos';
    this.showAllStands = true;
    this.layerVisibility = {
      zonas: true,
      locales: true,
      sanitarios: true,
      accesos: true
    };

    this.onSelectCallback = options.onSelectLocal || (() => {});

    this.initMap();
  }

  svgToLatLng(coords) {
    return svgToLatLng(coords);
  }

  initMap() {
    this.map = L.map(this.containerId, {
      crs: L.CRS.Simple,
      minZoom: -1,
      maxZoom: 2.5,
      zoomSnap: 0.25,
      zoomDelta: 0.5,
      wheelPxPerZoomLevel: 100,
      zoomControl: false,
      preferCanvas: true,
      attributionControl: false,
      inertia: true,
      inertiaDeceleration: 3000,
      maxBounds: [[-80, -80], [this.height + 80, this.width + 80]],
      maxBoundsViscosity: 0.9
    });

    this.mapOverlay = L.imageOverlay('/cuemanco-map.webp', this.bounds, {
      opacity: 0.96,
      interactive: false
    }).addTo(this.map);

    this.map.fitBounds(INITIAL_FIT_BOUNDS);

    // Capas ordenadas de abajo hacia arriba
    this.zonesLayerGroup = L.layerGroup().addTo(this.map);
    this.sanitariosLayerGroup = L.layerGroup().addTo(this.map);
    this.accesosLayerGroup = L.layerGroup().addTo(this.map);
    this.standsLayerGroup = L.layerGroup().addTo(this.map);
    this.featuredLayerGroup = L.layerGroup().addTo(this.map);
    this.highlightLayerGroup = L.layerGroup().addTo(this.map);

    L.control.attribution({
      position: 'bottomright',
      prefix: 'Mercado Cuemanco CDMX · Plano Interactivo'
    }).addTo(this.map);

    this.updateZoomLOD();
    this.map.on('zoomend', () => this.updateZoomLOD());

    this.map.on('click', (e) => {
      if (
        e.originalEvent &&
        e.originalEvent.target &&
        (e.originalEvent.target.classList.contains('leaflet-container') ||
          e.originalEvent.target.classList.contains('leaflet-image-layer'))
      ) {
        this.clearSelection();
      }
    });
  }

  updateZoomLOD() {
    const container = this.map.getContainer();
    const zoom = this.map.getZoom();
    container.classList.remove('map-zoom-low', 'map-zoom-mid', 'map-zoom-high');
    if (zoom < -0.25) {
      container.classList.add('map-zoom-low');
    } else if (zoom < 0.75) {
      container.classList.add('map-zoom-mid');
    } else {
      container.classList.add('map-zoom-high');
    }
  }

  renderZones(zones = []) {
    this.zonesLayerGroup.clearLayers();
    this.zonesMap.clear();

    for (const zone of zones) {
      const latLngs = polygonToLatLngs(zone.polygon);
      if (latLngs.length < 3) continue;

      const isParkingOrAccess = zone.id.includes('parking');
      const polygon = L.polygon(latLngs, {
        color: zone.color || '#E4007C',
        weight: 1.8,
        opacity: 0.75,
        fillColor: zone.color || '#E4007C',
        fillOpacity: 0.14,
        dashArray: isParkingOrAccess ? '5 5' : null,
        smoothFactor: 1.5
      });

      polygon.on('mouseover', () => {
        polygon.setStyle({ fillOpacity: 0.28, weight: 2.8, opacity: 1 });
      });

      polygon.on('mouseout', () => {
        this.applyZoneStyle(zone.id);
      });

      polygon.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        this.selectItem(zone, 'zone');
      });

      const labelLatLng = this.svgToLatLng(resolveMapCoords(zone));
      const labelMarker = createZoneLabelMarker(zone, labelLatLng, (item, type) => {
        this.selectItem(item, type);
      });

      this.zonesLayerGroup.addLayer(polygon);
      this.zonesLayerGroup.addLayer(labelMarker);
      this.zonesMap.set(zone.id, { polygon, labelMarker, zone });
    }

    this.applyZoneStyles();
  }

  renderPOIs(pois = []) {
    this.sanitariosLayerGroup.clearLayers();
    this.accesosLayerGroup.clearLayers();
    this.poisMap.clear();

    for (const poi of pois) {
      const latLng = this.svgToLatLng(resolveMapCoords(poi));
      const marker = createPoiMarker(poi, latLng, (item, type) => {
        this.selectItem(item, type);
      });

      const targetGroup = poi.poiType === 'sanitario'
        ? this.sanitariosLayerGroup
        : this.accesosLayerGroup;

      targetGroup.addLayer(marker);
      this.poisMap.set(poi.id, { marker, poi });
    }

    this.applyCategoryStylesToZonesAndPois();
  }

  renderLocales(featuredLocales = [], allLocales = []) {
    this.featuredLayerGroup.clearLayers();
    this.standsLayerGroup.clearLayers();
    this.markersMap.clear();

    for (const local of featuredLocales) {
      const latLng = this.svgToLatLng(resolveMapCoords(local));
      const marker = createFeaturedMarker(local, latLng, (item, type) => {
        this.selectItem(item, type);
      });

      this.featuredLayerGroup.addLayer(marker);
      this.markersMap.set(local.id, { marker, local, isFeatured: true });
    }

    for (const local of allLocales) {
      if (this.markersMap.has(local.id)) continue;

      const latLng = this.svgToLatLng(resolveMapCoords(local));
      const circle = createStandCircle(local, latLng, (item, type) => {
        this.selectItem(item, type);
      });

      this.standsLayerGroup.addLayer(circle);
      this.markersMap.set(local.id, { marker: circle, local, isFeatured: false });
    }

    if (this.currentCategory !== 'todos') {
      this.filterByCategory(this.currentCategory);
    }
  }

  toggleLayer(layerName, visible) {
    const nextVisible = typeof visible === 'boolean'
      ? visible
      : !this.layerVisibility[layerName];
    this.layerVisibility[layerName] = nextVisible;

    const groupsMap = {
      zonas: [this.zonesLayerGroup],
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

    return { ...this.layerVisibility };
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

  applyZoneStyle(zoneId) {
    const entry = this.zonesMap.get(zoneId);
    if (!entry) return;
    const { polygon, zone } = entry;
    const isActive = this.activeZoneId === zoneId;

    if (isActive) {
      polygon.setStyle({ fillOpacity: 0.28, weight: 3, opacity: 1 });
      return;
    }

    if (this.currentCategory === 'todos') {
      polygon.setStyle({ fillOpacity: 0.14, weight: 1.8, opacity: 0.75 });
      return;
    }

    if (this.matchesCategory(zone, this.currentCategory)) {
      polygon.setStyle({ fillOpacity: 0.25, weight: 2.4, opacity: 0.95 });
    } else {
      polygon.setStyle({ fillOpacity: 0.04, weight: 1, opacity: 0.35 });
    }
  }

  applyZoneStyles() {
    for (const zoneId of this.zonesMap.keys()) {
      this.applyZoneStyle(zoneId);
    }
  }

  applyCategoryStylesToZonesAndPois() {
    this.applyZoneStyles();

    const showFullPoi = this.currentCategory === 'todos' || this.currentCategory === 'servicios';
    for (const { marker, poi } of this.poisMap.values()) {
      const match = showFullPoi || this.matchesCategory(poi, this.currentCategory);
      marker.setOpacity(match ? 1 : 0.42);
    }
  }

  filterByCategory(catId) {
    this.currentCategory = catId;

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

  highlightZone(zoneId) {
    this.activeZoneId = zoneId || null;
    this.applyZoneStyles();

    if (!zoneId || !this.zonesMap.has(zoneId)) return;
    const { zone } = this.zonesMap.get(zoneId);
    const outline = L.polygon(polygonToLatLngs(zone.polygon), {
      color: '#E4007C',
      weight: 3,
      opacity: 0.9,
      fillColor: '#E4007C',
      fillOpacity: 0.08,
      dashArray: '6 4',
      interactive: false
    });
    this.highlightLayerGroup.addLayer(outline);
  }

  selectItem(item, itemType = 'local') {
    if (!item) {
      this.clearSelection();
      return;
    }

    const normalizedType = typeof itemType === 'boolean'
      ? (itemType ? 'local' : 'poi')
      : (itemType || (item.isZone ? 'zone' : 'local'));

    this.highlightLayerGroup.clearLayers();

    if (normalizedType === 'zone' && Array.isArray(item.polygon) && item.polygon.length >= 3) {
      const bounds = L.polygon(polygonToLatLngs(item.polygon)).getBounds();
      this.map.flyToBounds(bounds, {
        padding: [70, 70],
        maxZoom: 1,
        duration: 0.75
      });
      this.highlightZone(item.id);
    } else {
      const latLng = this.svgToLatLng(resolveMapCoords(item));
      const targetZoom = Math.max(this.map.getZoom(), 1);
      this.map.flyTo(latLng, targetZoom, {
        duration: 0.75,
        easeLinearity: 0.25
      });

      this.activePulseMarker = createPulseMarker(latLng).addTo(this.highlightLayerGroup);
      this.highlightZone(item.zoneId || null);
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

  resetView() {
    this.map.flyToBounds(INITIAL_FIT_BOUNDS, { duration: 0.75 });
  }

  clearSelection() {
    this.highlightLayerGroup.clearLayers();
    this.activePulseMarker = null;
    this.activeZoneId = null;
    this.applyZoneStyles();
    this.onSelectCallback(null, null);
  }
}
