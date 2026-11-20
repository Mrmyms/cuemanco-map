import { MARKET_ZONES } from '../src/data/zones.js';
import { getQueryParams, sendJson } from './_lib/helpers.js';

export default function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return sendJson(res, 204, {});
  }

  const query = getQueryParams(req);

  if (query.id) {
    const found = MARKET_ZONES.find(z => z.id === query.id);
    if (!found) {
      return sendJson(res, 404, { error: `Zona '${query.id}' no encontrada` });
    }
    return sendJson(res, 200, { zone: found }, {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200'
    });
  }

  let zones = [...MARKET_ZONES];

  if (query.category && query.category !== 'todos') {
    zones = zones.filter(z =>
      z.categoriaId === query.category ||
      (z.categoriasAdicionales && z.categoriasAdicionales.includes(query.category))
    );
  }

  return sendJson(res, 200, {
    total: zones.length,
    zones
  }, {
    'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200'
  });
}
