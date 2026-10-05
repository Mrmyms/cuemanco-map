import { CATEGORIES } from '../data/categories.js';
import { FEATURED_LOCALES, POINTS_OF_INTEREST, generateAllMarketLocales } from '../data/locales.js';

export class MarketApiClient {
  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
  }

  async checkHealth() {
    try {
      const res = await fetch(`${this.baseUrl}/api/health`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('[ApiClient] No se pudo conectar al endpoint de salud:', err.message);
      return { status: 'offline', version: '1.0.0' };
    }
  }

  async fetchCategories() {
    try {
      const res = await fetch(`${this.baseUrl}/api/categories`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data.categories || CATEGORIES;
    } catch (err) {
      console.warn('[ApiClient] Usando categorías locales de respaldo:', err.message);
      return CATEGORIES;
    }
  }

  async fetchLocales(params = {}) {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'todos') query.set('category', params.category);
    if (params.featured) query.set('featured', 'true');
    if (params.numero) query.set('numero', params.numero);
    if (params.limit) query.set('limit', params.limit);

    const queryString = query.toString() ? `?${query.toString()}` : '';

    try {
      const res = await fetch(`${this.baseUrl}/api/locales${queryString}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return {
        locales: data.locales || [],
        total: data.total || 0,
        featuredCount: data.featuredCount || FEATURED_LOCALES.length
      };
    } catch (err) {
      console.warn('[ApiClient] Usando catálogo procedural local de respaldo:', err.message);
      const all = generateAllMarketLocales();
      return {
        locales: all,
        total: all.length,
        featuredCount: FEATURED_LOCALES.length
      };
    }
  }

  async fetchPOIs() {
    try {
      const res = await fetch(`${this.baseUrl}/api/pois`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data.pois || POINTS_OF_INTEREST;
    } catch (err) {
      console.warn('[ApiClient] Usando POIs locales de respaldo:', err.message);
      return POINTS_OF_INTEREST;
    }
  }

  async search(query, limit = 10, category = null) {
    if (!query || query.trim().length === 0) return [];

    const params = new URLSearchParams({ q: query.trim(), limit: String(limit) });
    if (category && category !== 'todos') params.set('category', category);

    try {
      const res = await fetch(`${this.baseUrl}/api/search?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data.results || [];
    } catch (err) {
      console.warn('[ApiClient] Error en búsqueda dinámica de servidor:', err.message);
      return null; // El frontend usará su motor local de MiniSearch como fallback
    }
  }
}

export const api = new MarketApiClient();
