import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export class CuemancoMap {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.options = options;
    this.width = 1222;
    this.height = 815;
    this.bounds = [[0, 0], [this.height, this.width]];

    this.markersMap = new Map();
    this.activePulseMarker = null;
    this.currentCategory = 'todos';
    this.showAllStands = true;

    this.onSelectCallback = options.onSelectLocal || (() => {});

    this.initMap();
  }

  // Convierte coordenadas del SVG (x: 0..1222 horizontal, y: 0..815 vertical hacia abajo)
  // a coordenadas de Leaflet L.CRS.Simple (lat: 0..815 vertical hacia arriba, lng: 0..1222 horizontal)
  svgToLatLng(coords) {
    const [x, y] = coords;
    return [this.height - y, x];
  }

  initMap() {
    this.map = L.map(this.containerId, {
      crs: L.CRS.Simple,
      minZoom: -1,
      maxZoom: 3,
      zoomSnap: 0.25,
      zoomDelta: 0.5,
      wheelPxPerZoomLevel: 100,
      zoomControl: false,
      preferCanvas: true,
      attributionControl: false,
      inertia: true,
      inertiaDeceleration: 3000,
      maxBounds: [[-100, -100], [this.height + 100, this.width + 100]],
      maxBoundsViscosity: 0.9
    });

    // Cargar el plano en WebP de ultra alta definición (acelerado por GPU a 60 FPS)
    this.mapOverlay = L.imageOverlay('/cuemanco-map.webp', this.bounds, {
      opacity: 0.98,
      interactive: false
    }).addTo(this.map);

    // Ajustar la vista inicial con un encuadre perfecto del mercado
    this.map.fitBounds([[100, 80], [700, 850]]);

    // Grupo para capas de locales y POIs
    this.featuredLayerGroup = L.layerGroup().addTo(this.map);
    this.standsLayerGroup = L.layerGroup().addTo(this.map); // 1,800 locales siempre visibles
    this.poiLayerGroup = L.layerGroup().addTo(this.map);
    this.highlightLayerGroup = L.layerGroup().addTo(this.map);

    // Añadir controles de atribución discreta
    L.control.attribution({
      position: 'bottomright',
      prefix: 'Mercado Cuemanco CDMX · OpenStreetMap Vector'
    }).addTo(this.map);

    // Evento de clic en el fondo del mapa para deseleccionar
    this.map.on('click', (e) => {
      if (e.originalEvent.target.classList.contains('leaflet-container')) {
        this.clearSelection();
      }
    });
  }

  renderPOIs(pois) {
    this.poiLayerGroup.clearLayers();

    for (const poi of pois) {
      const latLng = this.svgToLatLng(poi.svgCoords);

      const poiIcon = L.divIcon({
        className: 'poi-custom-marker',
        html: `
          <div class="poi-marker-badge" title="${poi.nombre}">
            <span class="poi-icon">${poi.icon}</span>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker(latLng, { icon: poiIcon, zIndexOffset: 400 });
      marker.bindTooltip(`<b>${poi.nombre}</b><br><small>${poi.pasillo}</small>`, {
        direction: 'top',
        offset: [0, -14],
        className: 'custom-map-tooltip'
      });

      marker.on('click', () => {
        this.selectItem(poi, false);
      });

      this.poiLayerGroup.addLayer(marker);
    }
  }

  renderLocales(featuredLocales, allLocales) {
    this.featuredLayerGroup.clearLayers();
    this.standsLayerGroup.clearLayers();
    this.markersMap.clear();

    const categoryColors = {
      flores: '#E4007C', // Rosa Mexicano
      interior: '#059669',
      orquideas: '#8B5CF6',
      suculentas: '#10B981',
      macetas: '#D97706',
      tierra: '#B45309',
      arboles: '#047857',
      servicios: '#475569'
    };

    const categoryIcons = {
      flores: '🌸',
      interior: '🌿',
      orquideas: '🪴',
      suculentas: '🌵',
      macetas: '🏺',
      tierra: '🌾',
      arboles: '🌳',
      servicios: '☕'
    };

    // 1. Renderizar los locales destacados con marcadores visuales ricos
    for (const local of featuredLocales) {
      const latLng = this.svgToLatLng(local.svgCoords);
      const color = categoryColors[local.categoriaId] || '#E4007C';
      let icon = local.icon || categoryIcons[local.categoriaId] || '🌸';
      if (local.id === 'loc-jarocho') icon = '🌮';
      if (local.id === 'loc-imffss') icon = '🩺';
      if (local.id === 'loc-yura') icon = '🪴';
      if (local.id === 'loc-draiz') icon = '🏺';
      if (local.id === 'loc-macetas-fibra') icon = '🏺';
      if (local.id === 'loc-jardin') icon = '🌳';

      const customIcon = L.divIcon({
        className: 'featured-market-marker',
        html: `
          <div class="marker-pin-wrapper" style="--pin-color: ${color}">
            <div class="marker-pin">
              <span class="marker-symbol">${icon}</span>
            </div>
            <div class="marker-label">${local.numeroDisplay}</div>
          </div>
        `,
        iconSize: [36, 46],
        iconAnchor: [18, 44]
      });

      const marker = L.marker(latLng, {
        icon: customIcon,
        zIndexOffset: 500
      });

      marker.bindTooltip(`
        <div class="tooltip-card">
          <div class="tooltip-header" style="color: ${color}">
            <b>${icon} ${local.nombre}</b>
          </div>
          <div class="tooltip-sub">${local.pasillo} · ${local.numeroDisplay}</div>
          <div class="tooltip-cat">${local.categoriaNombre}</div>
        </div>
      `, {
        direction: 'top',
        offset: [0, -42],
        className: 'custom-map-tooltip'
      });

      marker.on('click', () => {
        this.selectItem(local, true);
      });

      this.featuredLayerGroup.addLayer(marker);
      this.markersMap.set(local.id, { marker, local, isFeatured: true });
    }

    // 2. Renderizar la cuadrícula de stands en Canvas (para soportar los 1800 sin lag)
    for (const local of allLocales) {
      if (this.markersMap.has(local.id)) continue; // Ya es destacado

      const latLng = this.svgToLatLng(local.svgCoords);
      const color = categoryColors[local.categoriaId] || '#10B981';

      const circle = L.circleMarker(latLng, {
        radius: 3.5,
        fillColor: color,
        fillOpacity: 0.75,
        color: '#ffffff',
        weight: 1,
        pane: 'overlayPane'
      });

      circle.on('mouseover', () => {
        if (!circle.getTooltip()) {
          circle.bindTooltip(`<b>${local.numeroDisplay}</b> - ${local.nombre}<br><small>${local.pasillo}</small>`, {
            direction: 'top',
            className: 'custom-map-tooltip'
          }).openTooltip();
        }
      });

      circle.on('click', () => {
        this.selectItem(local, true);
      });

      this.standsLayerGroup.addLayer(circle);
      this.markersMap.set(local.id, { marker: circle, local, isFeatured: false });
    }
  }

  toggleStandsView(enable) {
    this.showAllStands = enable;
    if (enable) {
      if (!this.map.hasLayer(this.standsLayerGroup)) {
        this.map.addLayer(this.standsLayerGroup);
      }
    } else {
      if (this.map.hasLayer(this.standsLayerGroup)) {
        this.map.removeLayer(this.standsLayerGroup);
      }
    }
  }

  filterByCategory(catId) {
    this.currentCategory = catId;

    for (const [id, item] of this.markersMap.entries()) {
      const match = catId === 'todos' || 
        item.local.categoriaId === catId || 
        (item.local.categoriasAdicionales && item.local.categoriasAdicionales.includes(catId));
      if (item.isFeatured) {
        if (match) {
          this.featuredLayerGroup.addLayer(item.marker);
        } else {
          this.featuredLayerGroup.removeLayer(item.marker);
        }
      } else {
        if (match) {
          this.standsLayerGroup.addLayer(item.marker);
        } else {
          this.standsLayerGroup.removeLayer(item.marker);
        }
      }
    }
  }

  selectItem(item, isLocal = true) {
    const latLng = this.svgToLatLng(item.svgCoords);

    // Animación suave de la cámara al local
    const targetZoom = Math.max(this.map.getZoom(), 1);
    this.map.flyTo(latLng, targetZoom, {
      duration: 0.8,
      easeLinearity: 0.25
    });

    // Crear o mover el indicador de pulso con Rosa Mexicano
    this.highlightLayerGroup.clearLayers();

    const pulseIcon = L.divIcon({
      className: 'pulse-marker-wrapper',
      html: `
        <div class="mexican-pink-pulse">
          <div class="ring-pulse"></div>
          <div class="core-dot"></div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });

    this.activePulseMarker = L.marker(latLng, {
      icon: pulseIcon,
      zIndexOffset: 1000
    }).addTo(this.highlightLayerGroup);

    // Notificar a la UI para abrir el drawer tipo Google Maps
    this.onSelectCallback(item, isLocal);
  }

  clearSelection() {
    this.highlightLayerGroup.clearLayers();
    this.activePulseMarker = null;
    this.onSelectCallback(null);
  }
}
