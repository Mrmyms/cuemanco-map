import { FEATURED_LOCALES, generateAllMarketLocales } from '../src/data/locales.js';
import { getQueryParams, sendJson } from './_lib/helpers.js';

// Cache en memoria en la instancia serverless para evitar regeneración redundante
let cachedAllLocales = null;

function getAllLocales() {
  if (!cachedAllLocales) {
    cachedAllLocales = generateAllMarketLocales();
  }
  return cachedAllLocales;
}

export default function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return sendJson(res, 204, {});
  }

  const query = getQueryParams(req);

  // 1. Búsqueda por ID único
  if (query.id) {
    const all = getAllLocales();
    const found = all.find(l => l.id === query.id);
    if (!found) {
      return sendJson(res, 404, { error: `Local con id '${query.id}' no encontrado` });
    }
    return sendJson(res, 200, { local: found }, {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200'
    });
  }

  // 2. Búsqueda por número de local (ej: ?numero=104)
  if (query.numero) {
    const numClean = query.numero.toString().trim();
    const all = getAllLocales();
    const found = all.find(l => String(l.numero) === numClean);
    if (!found) {
      return sendJson(res, 404, { error: `Local número ${numClean} no encontrado` });
    }
    return sendJson(res, 200, { local: found }, {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200'
    });
  }

  // 3. Filtrar solo destacados
  if (query.featured === 'true') {
    return sendJson(res, 200, {
      total: FEATURED_LOCALES.length,
      locales: FEATURED_LOCALES
    }, {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    });
  }

  // 4. Filtrar por categoría, pasillo o listado general
  let dataset = getAllLocales();

  if (query.category && query.category !== 'todos') {
    dataset = dataset.filter(l => 
      l.categoriaId === query.category || 
      (l.categoriasAdicionales && l.categoriasAdicionales.includes(query.category))
    );
  }

  if (query.pasillo) {
    const pasilloNum = parseInt(query.pasillo, 10);
    if (!isNaN(pasilloNum)) {
      dataset = dataset.filter(l => l.pasilloNum === pasilloNum);
    } else {
      const pasilloStr = query.pasillo.toLowerCase();
      dataset = dataset.filter(l => (l.pasillo || '').toLowerCase().includes(pasilloStr));
    }
  }

  // 5. Paginación opcional
  const total = dataset.length;
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = query.limit ? Math.max(1, parseInt(query.limit, 10)) : null;

  let results = dataset;
  if (limit) {
    const offset = (page - 1) * limit;
    results = dataset.slice(offset, offset + limit);
  }

  return sendJson(res, 200, {
    total,
    page: limit ? page : 1,
    limit: limit || total,
    featuredCount: FEATURED_LOCALES.length,
    locales: results
  }, {
    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
  });
}
