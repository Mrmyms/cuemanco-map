// Helper utilities for Vercel Serverless Functions
export function getQueryParams(req) {
  if (req.query && typeof req.query === 'object') {
    return req.query;
  }
  const host = req.headers ? (req.headers.host || 'localhost') : 'localhost';
  const url = new URL(req.url, `http://${host}`);
  return Object.fromEntries(url.searchParams.entries());
}

export function sendJson(res, statusCode, data, customHeaders = {}) {
  // Configurar CORS y caché por defecto
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  for (const [key, value] of Object.entries(customHeaders)) {
    res.setHeader(key, value);
  }

  if (typeof res.status === 'function') {
    res.status(statusCode);
  } else {
    res.statusCode = statusCode;
  }

  if (typeof res.json === 'function' && Object.keys(customHeaders).length === 0) {
    return res.json(data);
  }

  return res.end(JSON.stringify(data));
}
