import { CATEGORIES } from '../src/data/categories.js';
import { getQueryParams, sendJson } from './_lib/helpers.js';

export default function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return sendJson(res, 204, {});
  }

  const query = getQueryParams(req);

  let categories = [...CATEGORIES];

  if (query.excludeTodos === 'true') {
    categories = categories.filter(c => c.id !== 'todos');
  }

  return sendJson(res, 200, {
    total: categories.length,
    categories
  }, {
    'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200'
  });
}
