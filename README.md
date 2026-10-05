# 🌸 Mercado de Plantas y Flores Cuemanco · Mapa Interactivo

Croquis interactivo en 2D inspirado en la experiencia de navegación de **Leaflet (HoYoLAB / Genshin Impact)** y **Google Maps**, diseñado especialmente para el **Mercado de Plantas y Flores de Cuemanco (Xochimilco, CDMX)** con estética floral y **Rosa Mexicano (`#E4007C`)**.

---

## ⚡ Arquitectura Dinámica para Vercel

El proyecto cuenta con una arquitectura full-stack basada en **Serverless Functions nativas de Vercel** (`/api/*`), con soporte transparente de desarrollo local en Vite:

* **`GET /api/health`**: Estado y telemetría del servidor.
* **`GET /api/categories`**: Catálogo de categorías botánicas con metadatos.
* **`GET /api/locales`**: Consulta dinámica de los 1,800 locales con filtros:
  * `?category=flores` (filtro por categoría)
  * `?numero=104` (búsqueda por número de local)
  * `?featured=true` (solo destacados)
  * `?pasillo=1` (filtro por pasillo)
  * `?page=1&limit=50` (paginación opcional)
* **`GET /api/search?q=orquideas`**: Motor de búsqueda serverless con coincidencia difusa (fuzzy search) y match de productos botánicos.
* **`GET /api/pois`**: Puntos de interés (sanitarios, módulos de informes, accesos).

> **Resiliencia y Rendimiento Híbrido:** El cliente web se sincroniza dinámicamente con la API de Vercel en segundo plano manteniendo un tiempo de primera pintura inmediato (&lt;50ms) y tolerancia a fallos offline si se pierde la conexión en el mercado.

---

## 🚀 Cómo Ejecutar el Proyecto Localmente

1. Navega a la carpeta del proyecto:
   ```bash
   cd ~/Downloads/cuemanco-map
   ```

2. Inicia el servidor de desarrollo Vite (con middleware integrado que simula los endpoints `/api/*` de Vercel automáticamente):
   ```bash
   npm run dev
   ```

3. Abre en tu navegador `http://localhost:5173/`.

---

## ☁️ Despliegue en Vercel

El proyecto incluye el archivo de configuración `vercel.json` listo para producción:

### Opción 1: Con Vercel CLI
```bash
npm i -g vercel
vercel
```

### Opción 2: Desde el Dashboard de Vercel (GitHub / GitLab)
1. Conecta tu repositorio en [vercel.com](https://vercel.com).
2. Vercel detectará la configuración automáticamente (`Vite` + `dist` + `api/`).
3. Haz clic en **Deploy**.

---

## 📁 Estructura del Proyecto

* **`api/`**: Serverless Functions nativas de Vercel:
  * `api/health.js`
  * `api/categories.js`
  * `api/locales.js`
  * `api/search.js`
  * `api/pois.js`
  * `api/_lib/`: Helpers de CORS, parseo de URLs y utilidades compartidas.
* **`vercel.json`**: Configuración de Vercel con reglas de enrutamiento SPA, cabeceras CORS y caché inmutable de assets.
* **`vite.config.js`**: Servidor de desarrollo con middleware emulador de la API de Vercel.
* **`src/services/api.js`**: Cliente SDK para consumo de los endpoints serverless.
* **`src/map.js`**: Motor de mapa Leaflet (`L.CRS.Simple`) calibrado a las coordenadas del croquis.
* **`src/search.js`**: Motor de búsqueda MiniSearch optimizado.
* **`src/ui.js`**: Controlador del panel lateral deslizable y dropdowns.
* **`public/`**: Plano vectorial y ráster WebP en alta definición a 60 FPS.
