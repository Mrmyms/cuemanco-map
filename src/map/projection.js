// Proyección y utilidades de coordenadas entre el plano lógico (1222 x 815),
// Leaflet L.CRS.Simple y coordenadas GPS (lat/lng) de respaldo.

export const MAP_WIDTH = 1222;
export const MAP_HEIGHT = 815;
export const MAP_BOUNDS = [[0, 0], [MAP_HEIGHT, MAP_WIDTH]];
export const INITIAL_FIT_BOUNDS = [[125, 100], [795, 1035]];

// Ancla calibrada sobre el centro del Mercado de Cuemanco
const GPS_ANCHOR = {
  lat: 19.29880,
  lng: -99.09795,
  svgX: 500,
  svgY: 330,
  scaleLngToX: 175000,
  scaleLatToY: -230000
};

/**
 * Convierte coordenadas del plano [x, y] (origen arriba-izquierda)
 * a coordenadas de Leaflet L.CRS.Simple [lat, lng] (origen abajo-izquierda).
 */
export function svgToLatLng(coords) {
  const [x, y] = coords;
  return [MAP_HEIGHT - y, x];
}

/**
 * Convierte una lista de vértices [x, y] a latLngs de Leaflet.
 */
export function polygonToLatLngs(points) {
  return (points || []).map(svgToLatLng);
}

/**
 * Proyecta coordenadas GPS { lat, lng } al plano lógico [x, y] de Cuemanco
 * como respaldo automático para locales nuevos sin svgCoords manuales.
 */
export function gpsToSvgCoords(coordsGps) {
  if (!coordsGps || typeof coordsGps.lat !== 'number' || typeof coordsGps.lng !== 'number') {
    return null;
  }

  const rawX = GPS_ANCHOR.svgX + (coordsGps.lng - GPS_ANCHOR.lng) * GPS_ANCHOR.scaleLngToX;
  const rawY = GPS_ANCHOR.svgY + (coordsGps.lat - GPS_ANCHOR.lat) * GPS_ANCHOR.scaleLatToY;

  const x = Math.round(Math.min(1180, Math.max(40, rawX)));
  const y = Math.round(Math.min(785, Math.max(30, rawY)));
  return [x, y];
}

/**
 * Resuelve las coordenadas finales de un local, POI o zona.
 * Prioriza svgCoords calibradas; usa gpsToSvgCoords como fallback.
 */
export function resolveMapCoords(item) {
  if (
    item &&
    Array.isArray(item.svgCoords) &&
    item.svgCoords.length === 2 &&
    Number.isFinite(item.svgCoords[0]) &&
    Number.isFinite(item.svgCoords[1])
  ) {
    return item.svgCoords;
  }

  const projected = item ? gpsToSvgCoords(item.coordsGps) : null;
  return projected || [500, 380];
}
