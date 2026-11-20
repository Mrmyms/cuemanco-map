import { CATEGORIES } from './data/categories.js';
import { FEATURED_LOCALES, POINTS_OF_INTEREST, generateAllMarketLocales } from './data/locales.js';
import { MARKET_ZONES } from './data/zones.js';
import { CuemancoMap } from './map.js';
import { MarketSearchEngine } from './search.js';
import { api } from './services/api.js';
import { MarketUI } from './ui.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Carga inmediata inicial con datos base para 0 latencia en primera pintura
  const allLocales = generateAllMarketLocales();
  const allPOIs = POINTS_OF_INTEREST;
  const allZones = MARKET_ZONES;
  const allCategories = CATEGORIES;

  let uiInstance = null;

  // 2. Inicializar el motor de mapa interactivo con Leaflet
  const mapController = new CuemancoMap('cuemanco-map', {
    onSelectLocal: (item, itemType) => {
      if (uiInstance) {
        uiInstance.openSideDrawer(item, itemType);
      }
    }
  });

  // Renderizar zonas, POIs y locales iniciales
  mapController.renderZones(allZones);
  mapController.renderPOIs(allPOIs);
  mapController.renderLocales(FEATURED_LOCALES, allLocales);

  // 3. Inicializar el motor de búsqueda en memoria (MiniSearch)
  const searchEngine = new MarketSearchEngine(allLocales, allPOIs, allZones);

  // 4. Inicializar la interfaz gráfica de usuario
  uiInstance = new MarketUI({
    searchEngine,
    categories: allCategories,
    mapController,
    locales: allLocales,
    zones: allZones
  });

  // Abrir deep-link inicial si la URL especifica ?local=, ?poi= o ?zona=
  const urlParams = new URLSearchParams(window.location.search);
  const initialTargetId = urlParams.get('local') || urlParams.get('poi') || urlParams.get('zona');
  if (initialTargetId) {
    mapController.selectById(initialTargetId);
  }

  // 5. Conexión en segundo plano a la API dinámica de Vercel (/api/*)
  syncWithVercelServer({ mapController, searchEngine, uiInstance });

  // Botón para resetear la vista completa del mercado
  const resetViewBtn = document.getElementById('reset-view-btn');
  if (resetViewBtn) {
    resetViewBtn.addEventListener('click', () => {
      mapController.resetView();
    });
  }

  // Botones de Zoom In y Zoom Out en la esquina inferior derecha
  const zoomInBtn = document.getElementById('zoom-in-btn');
  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
      mapController.map.zoomIn();
    });
  }

  const zoomOutBtn = document.getElementById('zoom-out-btn');
  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
      mapController.map.zoomOut();
    });
  }

  // Prevenir desajuste de canvas en cambio de resolución o rotación móvil
  window.addEventListener('resize', () => {
    mapController.map.invalidateSize();
  });
});

async function syncWithVercelServer({ mapController, searchEngine, uiInstance }) {
  try {
    const health = await api.checkHealth();
    console.log(`🌸 [Cuemanco Server] Conectado a Vercel Serverless (${health.environment || 'local'}) v${health.version}`);

    const [remoteCategories, remoteLocalesData, remotePOIs, remoteZones] = await Promise.all([
      api.fetchCategories(),
      api.fetchLocales(),
      api.fetchPOIs(),
      api.fetchZones()
    ]);

    const updatedLocales = remoteLocalesData?.locales?.length > 0 ? remoteLocalesData.locales : null;
    const updatedZones = Array.isArray(remoteZones) && remoteZones.length > 0 ? remoteZones : null;

    if (updatedZones) {
      mapController.renderZones(updatedZones);
    }

    if (Array.isArray(remotePOIs) && remotePOIs.length > 0) {
      mapController.renderPOIs(remotePOIs);
    }

    if (updatedLocales) {
      const featuredIds = new Set(FEATURED_LOCALES.map(f => f.id));
      const featured = updatedLocales.filter(l => featuredIds.has(l.id) || l.rating >= 4.7);
      mapController.renderLocales(featured.length > 0 ? featured : FEATURED_LOCALES, updatedLocales);
      console.log(`✨ [Cuemanco Server] Sincronizados ${updatedLocales.length} locales dinámicos desde Vercel API.`);
    }

    searchEngine.updateData(updatedLocales, remotePOIs, updatedZones);
    if (uiInstance) {
      uiInstance.updateData({ locales: updatedLocales, zones: updatedZones });
    }

    if (remoteCategories && remoteCategories.length > 0 && uiInstance) {
      uiInstance.categories = remoteCategories;
      uiInstance.renderCategoryBar();
    }
  } catch (err) {
    console.warn('[Cuemanco Server] Modo autónomo/fallback activado:', err.message);
  }
}
