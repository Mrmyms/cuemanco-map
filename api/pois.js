import { POINTS_OF_INTEREST } from '../src/data/locales.js';
import { getQueryParams, sendJson } from './_lib/helpers.js';

export default function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return sendJson(res, 204, {});
  }

  const query = getQueryParams(req);

  let pois = [...POINTS_OF_INTEREST];

  if (query.type) {
    const typeLower = query.type.toLowerCase();
    pois = pois.filter(p => p.id.includes(typeLower) || p.nombre.toLowerCase().includes(typeLower));
  }

  return sendJson(res, 200, {
    total: pois.length,
    pois
  }, {
    'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200'
  });
}
