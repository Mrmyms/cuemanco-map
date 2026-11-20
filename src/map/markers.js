import L from 'leaflet';

export const CATEGORY_STYLE = {
  flores: { color: '#E4007C', icon: '🌸' },
  interior: { color: '#059669', icon: '🌿' },
  orquideas: { color: '#8B5CF6', icon: '🪴' },
  suculentas: { color: '#10B981', icon: '🌵' },
  macetas: { color: '#D97706', icon: '🏺' },
  tierra: { color: '#B45309', icon: '🌾' },
  arboles: { color: '#047857', icon: '🌳' },
  servicios: { color: '#475569', icon: '🩺' }
};

export function createFeaturedMarker(local, latLng, onSelect) {
  const style = CATEGORY_STYLE[local.categoriaId] || CATEGORY_STYLE.flores;
  const color = local.pinColor || style.color;
  const icon = local.icon || style.icon;
  const shortLabel = local.nombreCorto || local.numeroDisplay || local.nombre;

  const customIcon = L.divIcon({
    className: 'featured-market-marker',
    html: `
      <div class="marker-pin-wrapper" style="--pin-color: ${color}">
        <div class="marker-pin">
          <span class="marker-symbol">${icon}</span>
        </div>
        <div class="marker-label">${shortLabel}</div>
      </div>
    `,
    iconSize: [36, 48],
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

  marker.on('click', (e) => {
    L.DomEvent.stopPropagation(e);
    onSelect(local, 'local');
  });

  return marker;
}

export function createStandCircle(local, latLng, onSelect) {
  const style = CATEGORY_STYLE[local.categoriaId] || CATEGORY_STYLE.interior;
  const circle = L.circleMarker(latLng, {
    radius: 3.5,
    fillColor: style.color,
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

  circle.on('click', (e) => {
    L.DomEvent.stopPropagation(e);
    onSelect(local, 'local');
  });

  return circle;
}

export function createPoiMarker(poi, latLng, onSelect) {
  const poiType = poi.poiType || 'acceso';
  const zOffsets = {
    sanitario: 360,
    estacionamiento: 380,
    acceso: 390
  };
  const sizes = {
    sanitario: [26, 26],
    estacionamiento: [28, 28],
    acceso: [28, 28]
  };
  const size = sizes[poiType] || [28, 28];

  const badgeSymbol = poiType === 'estacionamiento'
    ? '<span class="poi-letter">P</span>'
    : poiType === 'sanitario'
      ? '<span class="poi-letter">WC</span>'
      : `<span class="poi-icon">${poi.icon || '📍'}</span>`;

  const poiIcon = L.divIcon({
    className: 'poi-custom-marker',
    html: `
      <div class="poi-marker-badge poi-type-${poiType}" title="${poi.nombre}">
        ${badgeSymbol}
      </div>
    `,
    iconSize: size,
    iconAnchor: [size[0] / 2, size[1] / 2]
  });

  const marker = L.marker(latLng, {
    icon: poiIcon,
    zIndexOffset: zOffsets[poiType] || 370
  });

  marker.bindTooltip(`<b>${poi.nombre}</b><br><small>${poi.pasillo}</small>`, {
    direction: 'top',
    offset: [0, -14],
    className: 'custom-map-tooltip'
  });

  marker.on('click', (e) => {
    L.DomEvent.stopPropagation(e);
    onSelect(poi, 'poi');
  });

  return marker;
}

export function createZoneLabelMarker(zone, latLng, onSelect) {
  const labelIcon = L.divIcon({
    className: 'zone-label-marker',
    html: `
      <button type="button" class="zone-map-label" style="--zone-color: ${zone.color || '#E4007C'}" title="${zone.nombre}">
        <span class="zone-label-dot"></span>
        <span class="zone-label-texts">
          <span class="zone-label-name">${zone.nombreCorto}</span>
          ${zone.subtitulo ? `<span class="zone-label-sub">${zone.subtitulo}</span>` : ''}
        </span>
      </button>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0]
  });

  const marker = L.marker(latLng, {
    icon: labelIcon,
    zIndexOffset: 220
  });

  marker.on('click', (e) => {
    L.DomEvent.stopPropagation(e);
    onSelect(zone, 'zone');
  });

  return marker;
}

export function createPulseMarker(latLng) {
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

  return L.marker(latLng, {
    icon: pulseIcon,
    zIndexOffset: 1000
  });
}
