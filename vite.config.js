import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    host: true
  },
  plugins: [
    {
      name: 'vercel-api-dev-middleware',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (!req.url.startsWith('/api/')) {
            return next();
          }

          const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
          const pathname = parsedUrl.pathname;
          const route = pathname.replace(/^\/api\/?/, '').replace(/\/$/, '') || 'health';

          try {
            const modulePath = `./api/${route}.js`;
            const handlerModule = await server.ssrLoadModule(modulePath);
            const handler = handlerModule.default;

            if (typeof handler === 'function') {
              req.query = Object.fromEntries(parsedUrl.searchParams.entries());

              res.status = function(code) {
                res.statusCode = code;
                return res;
              };
              res.json = function(data) {
                res.setHeader('Content-Type', 'application/json; charset=utf-8');
                res.end(JSON.stringify(data));
                return res;
              };

              await handler(req, res);
              return;
            }
          } catch (err) {
            console.error(`[Vercel Dev API Error] ${pathname}:`, err.message);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify({ error: err.message }));
            return;
          }

          next();
        });
      }
    }
  ]
});
