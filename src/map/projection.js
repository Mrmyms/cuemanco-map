// Proyección geográfica real (WGS84 / EPSG:3857) para el Mercado de Cuemanco
// y conversión calibrada desde coordenadas del plano lógico (1222 x 815).

export const MAP_WIDTH = 1222;
export const MAP_HEIGHT = 815;

export const MARKET_CENTER = [19.29850, -99.09800];
export const INITIAL_FIT_BOUNDS = [[19.29640, -99.10110], [19.30055, -99.09475]];
export const MOBILE_INITIAL_FIT_BOUNDS = [[19.29660, -99.10145], [19.30040, -99.09535]];
export const MAX_PAN_BOUNDS = [[19.2850, -99.1180], [19.3120, -99.0780]];

// Calibración exacta contra OpenStreetMap (EPSG:3857) a ~0.6339 m/px
// Origen lógico [0, 0] = [19.3004400, -99.1010232] (Edificio Central [560, 208] = [19.2992556, -99.0976445])
const GEO_ANCHOR = {
  originLat: 19.3004400,
  originLng: -99.1010232,
  degLatPerPx: 0.000005694,
  degLngPerPx: 0.000006033
};

export function getInitialFitBounds(isMobile = false) {
  return isMobile ? MOBILE_INITIAL_FIT_BOUNDS : INITIAL_FIT_BOUNDS;
}

export function isGeoLatLngPair(pair) {
  return (
    Array.isArray(pair) &&
    pair.length === 2 &&
    Number.isFinite(pair[0]) &&
    Number.isFinite(pair[1]) &&
    pair[0] >= 18 &&
    pair[0] <= 21 &&
    pair[1] <= -98 &&
    pair[1] >= -100
  );
}

/**
 * Convierte coordenadas del plano lógico [x, y] (0..1222 x 0..815)
 * a coordenadas geográficas reales [lat, lng] en WGS84.
 */
export function svgToGeoLatLng(coords) {
  if (!Array.isArray(coords) || coords.length < 2) {
    return MARKET_CENTER;
  }
  const [x, y] = coords;
  const lng = GEO_ANCHOR.originLng + x * GEO_ANCHOR.degLngPerPx;
  const lat = GEO_ANCHOR.originLat - y * GEO_ANCHOR.degLatPerPx;
  return [Number(lat.toFixed(6)), Number(lng.toFixed(6))];
}

/**
 * Convierte un polígono de vértices [x, y] (o pares ya geográficos) a [lat, lng][].
 */
export function polygonToLatLngs(points) {
  return (points || []).map((pt) => (isGeoLatLngPair(pt) ? pt : svgToGeoLatLng(pt)));
}

/**
 * Resuelve las coordenadas geográficas reales [lat, lng] de un local, POI o zona.
 * Prioriza coordsGps oficiales de Google Maps; usa geoCoords o svgCoords calibradas como respaldo.
 */
export function resolveGeoLatLng(item) {
  if (
    item &&
    item.coordsGps &&
    Number.isFinite(item.coordsGps.lat) &&
    Number.isFinite(item.coordsGps.lng)
  ) {
    return [item.coordsGps.lat, item.coordsGps.lng];
  }

  if (item && isGeoLatLngPair(item.geoCoords)) {
    return item.geoCoords;
  }

  if (
    item &&
    Array.isArray(item.svgCoords) &&
    item.svgCoords.length === 2 &&
    Number.isFinite(item.svgCoords[0]) &&
    Number.isFinite(item.svgCoords[1])
  ) {
    return svgToGeoLatLng(item.svgCoords);
  }

  return MARKET_CENTER;
}

/**
 * Distancia aproximada en metros entre dos coordenadas [lat, lng] usando fórmula Haversine.
 */
export function haversineMeters([lat1, lng1], [lat2, lng2]) {
  const R = 6371000;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Alias de compatibilidad
export const svgToLatLng = svgToGeoLatLng;
export const resolveMapCoords = resolveGeoLatLng;
