import { CATEGORIES } from './data/categories.js';
import { FEATURED_LOCALES, POINTS_OF_INTEREST, generateAllMarketLocales } from './data/locales.js';
import { CuemancoMap } from './map.js';
import { MarketSearchEngine } from './search.js';
import { api } from './services/api.js';
import { MarketUI } from './ui.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Carga inmediata inicial con datos base para 0 latencia en primera pintura
  let allLocales = generateAllMarketLocales();
  let allPOIs = POINTS_OF_INTEREST;
  let allCategories = CATEGORIES;

  let uiInstance = null;

  // 2. Inicializar el motor de mapa interactivo con Leaflet
  const mapController = new CuemancoMap('cuemanco-map', {
    onSelectLocal: (item, isLocal) => {
      if (uiInstance) {
        uiInstance.openSideDrawer(item, isLocal);
      }
    }
  });

  // Renderizar POIs y locales iniciales
  mapController.renderPOIs(allPOIs);
  mapController.renderLocales(FEATURED_LOCALES, allLocales);

  // 3. Inicializar el motor de búsqueda en memoria (MiniSearch)
  const searchEngine = new MarketSearchEngine(allLocales, allPOIs);

  // 4. Inicializar la interfaz gráfica de usuario
  uiInstance = new MarketUI({
    searchEngine,
    categories: allCategories,
    mapController
  });

  // 5. Conexión en segundo plano a la API dinámica de Vercel (/api/*)
  // Sincroniza dinámicamente con las Serverless Functions
  syncWithVercelServer({ mapController, searchEngine, uiInstance });

  // Botón para resetear la vista completa del mercado
  const resetViewBtn = document.getElementById('reset-view-btn');
  if (resetViewBtn) {
    resetViewBtn.addEventListener('click', () => {
      mapController.map.flyToBounds([[100, 80], [700, 850]], { duration: 0.8 });
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
    // Verificar salud del backend en Vercel
    const health = await api.checkHealth();
    console.log(`🌸 [Cuemanco Server] Conectado a Vercel Serverless (${health.environment || 'local'}) v${health.version}`);

    // Cargar datos dinámicos concurrentemente
    const [remoteCategories, remoteLocalesData, remotePOIs] = await Promise.all([
      api.fetchCategories(),
      api.fetchLocales(),
      api.fetchPOIs()
    ]);

    if (remoteLocalesData && remoteLocalesData.locales && remoteLocalesData.locales.length > 0) {
      const updatedLocales = remoteLocalesData.locales;
      const featured = updatedLocales.filter(l => l.rating >= 4.8).slice(0, 15);

      mapController.renderPOIs(remotePOIs);
      mapController.renderLocales(featured.length > 0 ? featured : FEATURED_LOCALES, updatedLocales);
      searchEngine.updateData(updatedLocales, remotePOIs);

      console.log(`✨ [Cuemanco Server] Sincronizados ${updatedLocales.length} locales dinámicos desde Vercel API.`);
    }

    if (remoteCategories && remoteCategories.length > 0 && uiInstance) {
      uiInstance.categories = remoteCategories;
      uiInstance.renderCategoryBar();
    }
  } catch (err) {
    console.warn('[Cuemanco Server] Modo autónomo/fallback activado:', err.message);
  }
}
