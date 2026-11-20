import { POINTS_OF_INTEREST, generateAllMarketLocales } from '../src/data/locales.js';
import { MARKET_ZONES } from '../src/data/zones.js';
import { MarketSearchEngine } from '../src/search.js';
import { getQueryParams, sendJson } from './_lib/helpers.js';

let searchEngineInstance = null;

function getSearchEngine() {
  if (!searchEngineInstance) {
    const allLocales = generateAllMarketLocales();
    searchEngineInstance = new MarketSearchEngine(allLocales, POINTS_OF_INTEREST, MARKET_ZONES);
  }
  return searchEngineInstance;
}

export default function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return sendJson(res, 204, {});
  }

  const query = getQueryParams(req);
  const q = (query.q || '').trim();
  const limit = Math.min(50, Math.max(1, parseInt(query.limit, 10) || 10));

  if (!q) {
    return sendJson(res, 200, {
      query: '',
      total: 0,
      results: []
    });
  }

  const engine = getSearchEngine();
  let results = engine.search(q, limit);

  if (query.category && query.category !== 'todos') {
    results = results.filter(r =>
      r.categoriaId === query.category ||
      (r.categoriasAdicionales && r.categoriasAdicionales.includes(query.category))
    );
  }

  return sendJson(res, 200, {
    query: q,
    total: results.length,
    results
  }, {
    'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200'
  });
}
