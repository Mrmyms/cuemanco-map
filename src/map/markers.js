import L from 'leaflet';
import { getIconSvg } from '../ui/icons.js';

export const CATEGORY_STYLE = {
  flores: { color: '#E4007C', iconKey: 'flores' },
  interior: { color: '#059669', iconKey: 'interior' },
  orquideas: { color: '#8B5CF6', iconKey: 'orquideas' },
  suculentas: { color: '#10B981', iconKey: 'suculentas' },
  macetas: { color: '#D97706', iconKey: 'macetas' },
  tierra: { color: '#B45309', iconKey: 'tierra' },
  arboles: { color: '#047857', iconKey: 'arboles' },
  servicios: { color: '#475569', iconKey: 'servicios' }
};

export function createFeaturedMarker(local, latLng, onSelect, index = 0) {
  const style = CATEGORY_STYLE[local.categoriaId] || CATEGORY_STYLE.flores;
  const color = local.pinColor || style.color;
  const iconKey = local.iconKey || style.iconKey;
  const shortLabel = local.nombreCorto || local.numeroDisplay || local.nombre;
  const delay = Math.min(index * 45, 270);

  const customIcon = L.divIcon({
    className: local.isPrimaryPin ? 'featured-market-marker is-primary-pin' : 'featured-market-marker',
    html: `
      <div class="marker-pin-wrapper" style="--pin-color: ${color}; --pin-delay: ${delay}ms">
        <div class="marker-pin-halo"></div>
        <div class="marker-pin">
          <span class="marker-symbol">${getIconSvg(iconKey, { size: 17 })}</span>
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
        <span class="tooltip-icon-inline">${getIconSvg(iconKey, { size: 13 })}</span>
        <b>${local.nombre}</b>
      </div>
      <div class="tooltip-sub">${local.pasillo} · ${local.numeroDisplay}</div>
      <div class="tooltip-cat">${local.categoriaNombre}</div>
    </div>
  `, {
    direction: 'top',
    offset: [0, -44],
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
      : `<span class="poi-icon-svg">${getIconSvg(poi.iconKey || 'car', { size: 14 })}</span>`;

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
      <button type="button" class="zone-map-text" style="--zone-color: ${zone.color || '#E4007C'}" title="${zone.nombre}">
        <span class="zone-text-row">
          <span class="zone-label-dot"></span>
          <span class="zone-text-name">${zone.nombreCorto}</span>
        </span>
        ${zone.subtitulo ? `<span class="zone-text-sub">${zone.subtitulo}</span>` : ''}
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

export function createUserLocationMarker(latLng) {
  const gpsIcon = L.divIcon({
    className: 'user-gps-marker',
    html: `
      <div class="user-gps-wrap" title="Tu ubicación actual">
        <div class="user-gps-pulse"></div>
        <div class="user-gps-dot"></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });

  return L.marker(latLng, {
    icon: gpsIcon,
    zIndexOffset: 950,
    interactive: false
  });
}

export function createPulseMarker(latLng) {
  const pulseIcon = L.divIcon({
    className: 'pulse-marker-wrapper',
    html: `
      <div class="mexican-pink-pulse">
        <div class="ring-pulse"></div>
        <div class="ring-pulse ring-pulse-delayed"></div>
        <div class="core-dot"></div>
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 24]
  });

  return L.marker(latLng, {
    icon: pulseIcon,
    zIndexOffset: 1000
  });
}
