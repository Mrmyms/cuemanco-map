import { CATEGORIES } from './data/categories.js';
import { FEATURED_LOCALES, POINTS_OF_INTEREST, generateAllMarketLocales } from './data/locales.js';
import { CuemancoMap } from './map.js';
import { MarketSearchEngine } from './search.js';
import { api } from './services/api.js';
import { MarketUI } from './ui.js';
import { IntroController } from './ui/intro.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Carga inmediata inicial con datos base para 0 latencia en primera pintura
  const allLocales = generateAllMarketLocales();
  const allPOIs = POINTS_OF_INTEREST;
  const allCategories = CATEGORIES;

  let uiInstance = null;

  // 2. Inicializar el motor de mapa interactivo geográfico con Leaflet
  const mapController = new CuemancoMap('cuemanco-map', {
    onSelectLocal: (item, itemType) => {
      if (uiInstance) {
        uiInstance.openSideDrawer(item, itemType);
      }
    },
    onLayerChange: (layerVisibility) => {
      if (uiInstance) {
        uiInstance.syncLayerCheckboxes(layerVisibility);
      }
    }
  });

  // Renderizar POIs y locales verificados iniciales
  mapController.renderPOIs(allPOIs);
  mapController.renderLocales(FEATURED_LOCALES, allLocales);

  // 3. Inicializar el motor de búsqueda en memoria (MiniSearch)
  const searchEngine = new MarketSearchEngine(allLocales, allPOIs);

  // 4. Inicializar la interfaz gráfica de usuario
  uiInstance = new MarketUI({
    searchEngine,
    categories: allCategories,
    mapController,
    locales: allLocales
  });

  // 5. Intro coreografiada y vuelo de cámara al mercado o al deep-link (?local=, ?poi=)
  const urlParams = new URLSearchParams(window.location.search);
  const initialTargetId = urlParams.get('local') || urlParams.get('poi');

  const introController = new IntroController({
    mapController,
    initialTargetId
  });
  introController.start();

  const brandReplayBtn = document.getElementById('brand-replay-btn');
  if (brandReplayBtn) {
    brandReplayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      introController.replay();
    });
  }

  // 6. Conexión en segundo plano a la API dinámica de Vercel (/api/*)
  syncWithVercelServer({ mapController, searchEngine, uiInstance });

  // Botón para resetear la vista completa del mercado + brújula
  const resetViewBtn = document.getElementById('reset-view-btn');
  if (resetViewBtn) {
    resetViewBtn.addEventListener('click', () => {
      mapController.resetView();
    });
  }

  const compassBtn = document.getElementById('compass-btn');
  if (compassBtn) {
    compassBtn.addEventListener('click', () => {
      mapController.resetView();
    });
  }

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

  window.addEventListener('resize', () => {
    mapController.map.invalidateSize();
  });
});

async function syncWithVercelServer({ mapController, searchEngine, uiInstance }) {
  try {
    const health = await api.checkHealth();
    console.log(`🌸 [Cuemanco Server] Conectado a Vercel Serverless (${health.environment || 'local'}) v${health.version}`);

    const [remoteCategories, remoteLocalesData, remotePOIs] = await Promise.all([
      api.fetchCategories(),
      api.fetchLocales(),
      api.fetchPOIs()
    ]);

    const updatedLocales = remoteLocalesData?.locales?.length > 0 ? remoteLocalesData.locales : null;

    if (Array.isArray(remotePOIs) && remotePOIs.length > 0) {
      mapController.renderPOIs(remotePOIs);
    }

    if (updatedLocales) {
      mapController.renderLocales(updatedLocales, updatedLocales);
      console.log(`✨ [Cuemanco Server] Sincronizados ${updatedLocales.length} locales verificados desde Vercel API.`);
    }

    searchEngine.updateData(updatedLocales, remotePOIs);
    if (uiInstance) {
      uiInstance.updateData({ locales: updatedLocales });
      uiInstance.renderFeaturedDock();
    }

    if (remoteCategories && remoteCategories.length > 0 && uiInstance) {
      uiInstance.categories = remoteCategories;
      uiInstance.renderCategoryBar();
    }
  } catch (err) {
    console.warn('[Cuemanco Server] Modo autónomo/fallback activado:', err.message);
  }
}
