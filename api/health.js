import { sendJson } from './_lib/helpers.js';

export default function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return sendJson(res, 204, {});
  }

  const payload = {
    status: 'ok',
    service: 'Mercado Cuemanco Map API',
    environment: process.env.VERCEL_ENV || 'development',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  };

  return sendJson(res, 200, payload, {
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  });
}
