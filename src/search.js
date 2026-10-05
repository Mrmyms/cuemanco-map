import MiniSearch from 'minisearch';

export class MarketSearchEngine {
  constructor(locales, pois) {
    this.locales = locales;
    this.pois = pois;
    this.searchIndex = new MiniSearch({
      fields: ['nombre', 'numero', 'numeroDisplay', 'pasillo', 'categoriaNombre', 'productosText', 'tagsText'],
      storeFields: ['id', 'nombre', 'numeroDisplay', 'pasillo', 'categoriaId', 'categoriaNombre', 'tipo', 'svgCoords'],
      searchOptions: {
        boost: { nombre: 3, numero: 4, numeroDisplay: 3, productosText: 2, categoriaNombre: 1.5 },
        fuzzy: 0.25,
        prefix: true
      }
    });

    this.initIndex();
  }

  initIndex() {
    const documents = [];

    // Indexar locales
    for (const loc of this.locales) {
      const productosText = (loc.productos || []).map(p => `${p.nombre} ${p.desc || ''}`).join(' ');
      const tagsText = (loc.badges || []).concat(loc.servicios || []).join(' ');

      documents.push({
        id: loc.id,
        nombre: loc.nombre,
        numero: loc.numero || '',
        numeroDisplay: loc.numeroDisplay || `Local ${loc.numero}`,
        pasillo: loc.pasillo || '',
        categoriaId: loc.categoriaId,
        categoriaNombre: loc.categoriaNombre,
        productosText: productosText,
        tagsText: tagsText,
        tipo: 'local',
        svgCoords: loc.svgCoords
      });
    }

    // Indexar Puntos de Interés (Baños, Estacionamientos, Cafetería)
    for (const poi of this.pois) {
      documents.push({
        id: poi.id,
        nombre: poi.nombre,
        numero: '',
        numeroDisplay: poi.numeroDisplay,
        pasillo: poi.pasillo,
        categoriaId: poi.categoriaId,
        categoriaNombre: poi.categoriaNombre,
        productosText: (poi.servicios || []).join(' '),
        tagsText: poi.descripcion,
        tipo: 'poi',
        svgCoords: poi.svgCoords
      });
    }

    this.searchIndex.addAll(documents);
  }

  updateData(locales, pois) {
    if (locales) this.locales = locales;
    if (pois) this.pois = pois;
    this.searchIndex.removeAll();
    this.initIndex();
  }

  search(query, limit = 10) {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const trimmed = query.trim().toLowerCase();

    // Búsqueda directa por número de local
    const numMatch = trimmed.match(/^(?:local\s*)?(\d+)$/i);
    if (numMatch) {
      const targetNum = numMatch[1];
      const directLocal = this.locales.find(l => String(l.numero) === targetNum);
      if (directLocal) {
        return [{
          id: directLocal.id,
          nombre: directLocal.nombre,
          numeroDisplay: directLocal.numeroDisplay,
          pasillo: directLocal.pasillo,
          categoriaId: directLocal.categoriaId,
          categoriaNombre: directLocal.categoriaNombre,
          tipo: 'local',
          matchReason: `Local número ${targetNum}`,
          localRef: directLocal
        }];
      }
    }

    const rawResults = this.searchIndex.search(query);
    const results = [];

    for (const res of rawResults.slice(0, limit)) {
      const originalItem = res.tipo === 'local' 
        ? this.locales.find(l => l.id === res.id)
        : this.pois.find(p => p.id === res.id);

      if (!originalItem) continue;

      // Buscar si coincidió con un producto específico
      let matchingProduct = null;
      if (originalItem.productos) {
        const qWords = trimmed.split(/\s+/);
        matchingProduct = originalItem.productos.find(p => 
          qWords.some(w => p.nombre.toLowerCase().includes(w) || (p.desc && p.desc.toLowerCase().includes(w)))
        );
      }

      results.push({
        id: originalItem.id,
        nombre: originalItem.nombre,
        numeroDisplay: originalItem.numeroDisplay,
        pasillo: originalItem.pasillo,
        categoriaId: originalItem.categoriaId,
        categoriaNombre: originalItem.categoriaNombre,
        tipo: res.tipo,
        matchingProduct: matchingProduct ? matchingProduct.nombre : null,
        localRef: originalItem
      });
    }

    return results;
  }
}
