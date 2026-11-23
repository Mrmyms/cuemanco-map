import { generateBotanicalHeroSvg } from './data/locales.js';
import { getIconSvg, renderStarRating } from './ui/icons.js';
import { evaluateSchedule, getMarketStatus } from './utils/hours.js';

const QUICK_SEARCH_QUERIES = [
  'Orquídeas',
  'Suculentas',
  'Bonsái',
  'Talleres IMFFSS',
  'Macetas',
  'Tacos El Jarocho',
  'Sanitarios'
];

const CATEGORY_COLORS = {
  flores: '#E4007C',
  interior: '#059669',
  orquideas: '#8B5CF6',
  suculentas: '#10B981',
  macetas: '#D97706',
  tierra: '#B45309',
  arboles: '#047857',
  servicios: '#475569'
};

export class MarketUI {
  constructor(options) {
    this.searchEngine = options.searchEngine;
    this.categories = options.categories;
    this.mapController = options.mapController;
    this.allLocales = options.locales || [];
    this.allZones = options.zones || [];

    // Elementos del DOM
    this.appContainer = document.getElementById('app');
    this.searchInput = document.getElementById('search-input');
    this.searchClearBtn = document.getElementById('search-clear-btn');
    this.searchLivePill = document.getElementById('search-live-pill');
    this.searchDropdown = document.getElementById('search-dropdown');
    this.categoryBar = document.getElementById('category-bar');
    this.sideDrawer = document.getElementById('side-drawer');
    this.drawerContent = document.getElementById('drawer-content');
    this.drawerCloseBtn = document.getElementById('drawer-close-btn');
    this.drawerDragHandle = document.getElementById('drawer-drag-handle');
    this.layersPanel = document.getElementById('map-layers-panel');
    this.layersToggleBtn = document.getElementById('layers-toggle-btn');
    this.mobileLayersTrigger = document.getElementById('mobile-layers-trigger');
    this.locateBtn = document.getElementById('locate-me-btn');
    this.toastEl = document.getElementById('map-toast');
    this.marketLivePill = document.getElementById('market-live-pill');
    this.featuredDock = document.getElementById('featured-dock');
    this.featuredToggleBtn = document.getElementById('featured-toggle-btn');
    this.featuredStripList = document.getElementById('featured-strip-list');
    this.featuredPrevBtn = document.getElementById('featured-prev-btn');
    this.featuredNextBtn = document.getElementById('featured-next-btn');

    this.currentLocal = null;
    this.activeCategory = 'todos';
    this.dropdownFocusIndex = -1;
    this.sheetState = 'closed';
    this.justDragged = false;
    this.toastTimer = null;
    this.defaultLayerVisibility = { ...(this.mapController?.layerVisibility || {}) };

    this.initEvents();
    this.initBottomSheetGestures();
    this.renderCategoryBar();
    this.renderMarketStatus();
    this.renderFeaturedDock();
  }

  isMobile() {
    return typeof window !== 'undefined' && window.innerWidth <= 900;
  }

  escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  updateData({ locales, zones }) {
    if (Array.isArray(locales)) this.allLocales = locales;
    if (Array.isArray(zones)) this.allZones = zones;
  }

  updateSearchBarPills(hasText) {
    this.searchClearBtn.style.display = hasText ? 'flex' : 'none';
    if (this.searchLivePill) {
      this.searchLivePill.style.display = hasText ? 'none' : '';
    }
  }

  initEvents() {
    this.searchInput.addEventListener('focus', () => {
      const query = this.searchInput.value.trim();
      if (query.length === 0) {
        this.renderQuickSuggestions();
      } else {
        const results = this.searchEngine.search(query, 8);
        this.renderSearchResults(results, query);
      }
    });

    this.searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      this.updateSearchBarPills(query.length > 0);
      this.dropdownFocusIndex = -1;

      if (query.length === 0) {
        this.renderQuickSuggestions();
        return;
      }

      const results = this.searchEngine.search(query, 8);
      this.renderSearchResults(results, query);
    });

    this.searchInput.addEventListener('keydown', (e) => {
      if (this.searchDropdown.style.display === 'none') return;
      const items = Array.from(this.searchDropdown.querySelectorAll('.search-result-item'));
      if (items.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.dropdownFocusIndex = (this.dropdownFocusIndex + 1) % items.length;
        this.updateDropdownKeyboardFocus(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.dropdownFocusIndex = this.dropdownFocusIndex <= 0
          ? items.length - 1
          : this.dropdownFocusIndex - 1;
        this.updateDropdownKeyboardFocus(items);
      } else if (e.key === 'Enter' && this.dropdownFocusIndex >= 0) {
        e.preventDefault();
        items[this.dropdownFocusIndex]?.click();
      }
    });

    this.searchClearBtn.addEventListener('click', () => {
      this.searchInput.value = '';
      this.updateSearchBarPills(false);
      this.dropdownFocusIndex = -1;
      this.renderQuickSuggestions();
      this.searchInput.focus();
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-box-container')) {
        this.hideSearchDropdown();
      }

      if (
        this.isMobile() &&
        this.layersPanel &&
        !this.layersPanel.classList.contains('mobile-hidden') &&
        !e.target.closest('#map-layers-panel') &&
        !e.target.closest('#mobile-layers-trigger')
      ) {
        this.closeMobileLayersPopover();
      }
    });

    this.drawerCloseBtn.addEventListener('click', () => {
      this.closeSideDrawer();
      this.mapController.clearSelection();
    });

    if (this.drawerDragHandle) {
      this.drawerDragHandle.addEventListener('click', () => {
        if (this.justDragged) return;
        if (this.isMobile()) {
          this.setSheetState(this.sheetState === 'peek' ? 'expanded' : 'peek');
        } else {
          this.closeSideDrawer();
          this.mapController.clearSelection();
        }
      });
    }

    // Control de Capas (popover flotante en móvil / dock inferior izquierdo en escritorio)
    if (this.layersPanel && this.layersToggleBtn) {
      if (this.isMobile()) {
        this.layersPanel.classList.add('mobile-hidden');
      }

      this.syncLayerCheckboxes(this.mapController.layerVisibility);

      this.layersToggleBtn.addEventListener('click', () => {
        if (this.isMobile()) {
          this.closeMobileLayersPopover();
          return;
        }
        const collapsed = this.layersPanel.classList.toggle('collapsed');
        this.layersToggleBtn.setAttribute('aria-expanded', String(!collapsed));
      });

      const layerCheckboxes = Array.from(this.layersPanel.querySelectorAll('input[data-layer]'));
      layerCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
          this.mapController.toggleLayer(checkbox.dataset.layer, checkbox.checked);
        });
      });

      this.layersPanel.querySelectorAll('[data-map-style]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const style = btn.dataset.mapStyle;
          this.layersPanel.querySelectorAll('[data-map-style]').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.mapController.setBaseStyle(style);
        });
      });
    }

    if (this.locateBtn) {
      this.locateBtn.addEventListener('click', () => {
        if (this.locateBtn.classList.contains('is-locating')) return;
        this.locateBtn.classList.add('is-locating');
        this.mapController.locateUser({
          onStatus: (res) => {
            this.locateBtn.classList.remove('is-locating');
            if (res.ok) {
              this.locateBtn.classList.add('is-active');
              if (res.insideMarket) {
                this.showToast('Ubicación encontrada dentro de Cuemanco');
              } else if (res.distanceMeters < 1000) {
                this.showToast(`Estás a ${res.distanceMeters} m de Cuemanco`);
              } else {
                this.showToast(`Estás a ${(res.distanceMeters / 1000).toFixed(1)} km de Cuemanco`);
              }
            } else if (res.reason === 'denied') {
              this.showToast('Activa el permiso de ubicación en tu navegador');
            } else {
              this.showToast('No pudimos obtener tu ubicación GPS');
            }
          }
        });
      });
    }

    if (this.mobileLayersTrigger && this.layersPanel) {
      this.mobileLayersTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = this.layersPanel.classList.toggle('mobile-hidden');
        this.mobileLayersTrigger.classList.toggle('active', !isHidden);
        this.mobileLayersTrigger.setAttribute('aria-expanded', String(!isHidden));
      });
    }

    // Carrusel / Directorio de Destacados (inicia expandido en móvil y escritorio)
    if (this.featuredDock && this.featuredToggleBtn) {
      this.featuredToggleBtn.addEventListener('click', () => {
        const collapsed = this.featuredDock.classList.toggle('collapsed');
        this.featuredToggleBtn.setAttribute('aria-expanded', String(!collapsed));
      });
    }

    if (this.featuredPrevBtn) {
      this.featuredPrevBtn.addEventListener('click', () => this.stepFeatured(-1));
    }
    if (this.featuredNextBtn) {
      this.featuredNextBtn.addEventListener('click', () => this.stepFeatured(1));
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeSideDrawer();
        this.hideSearchDropdown();
        this.closeMobileLayersPopover();
        this.mapController.clearSelection();
      }
    });
  }

  showToast(message, duration = 3200) {
    if (!this.toastEl) return;
    clearTimeout(this.toastTimer);
    this.toastEl.textContent = message;
    this.toastEl.classList.add('visible');
    this.toastTimer = setTimeout(() => {
      this.toastEl.classList.remove('visible');
    }, duration);
  }

  syncLayerCheckboxes(layerVisibility) {
    if (!this.layersPanel || !layerVisibility) return;
    const checkboxes = Array.from(this.layersPanel.querySelectorAll('input[data-layer]'));
    checkboxes.forEach((cb) => {
      const key = cb.dataset.layer;
      if (typeof layerVisibility[key] === 'boolean') {
        cb.checked = layerVisibility[key];
      }
    });
    if (this.mobileLayersTrigger) {
      const customized = checkboxes.some((cb) => cb.checked !== Boolean(this.defaultLayerVisibility[cb.dataset.layer]));
      this.mobileLayersTrigger.classList.toggle('has-hidden-layers', customized);
    }
  }

  closeMobileLayersPopover() {
    if (!this.layersPanel) return;
    this.layersPanel.classList.add('mobile-hidden');
    if (this.mobileLayersTrigger) {
      this.mobileLayersTrigger.classList.remove('active');
      this.mobileLayersTrigger.setAttribute('aria-expanded', 'false');
    }
  }

  setSheetState(state) {
    this.sheetState = state;
    this.sideDrawer.style.transform = '';
    this.sideDrawer.classList.remove('is-dragging');

    if (state === 'closed') {
      this.sideDrawer.classList.remove('open', 'sheet-peek', 'sheet-expanded');
      if (this.appContainer) this.appContainer.classList.remove('drawer-open');
      return;
    }

    this.sideDrawer.classList.add('open');
    this.sideDrawer.classList.toggle('sheet-peek', state === 'peek');
    this.sideDrawer.classList.toggle('sheet-expanded', state === 'expanded');
    if (this.appContainer) this.appContainer.classList.add('drawer-open');
  }

  initBottomSheetGestures() {
    let dragging = false;
    let canDrag = false;
    let startY = 0;
    let startX = 0;
    let startTime = 0;
    let currentDeltaY = 0;
    let baseOffsetPx = 0;
    let fromScrollBody = false;

    this.sideDrawer.addEventListener('touchstart', (e) => {
      if (!this.isMobile() || this.sheetState === 'closed' || e.touches.length !== 1) return;

      const interactive = e.target.closest('a, button, input');
      if (interactive && !interactive.closest('#drawer-drag-handle')) return;

      const inHeaderZone = Boolean(
        e.target.closest('#drawer-drag-handle, .drawer-hero-wrapper, .drawer-header')
      );
      fromScrollBody = !inHeaderZone;
      if (fromScrollBody && this.drawerContent.scrollTop > 2) return;

      canDrag = true;
      dragging = false;
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
      startTime = Date.now();
      currentDeltaY = 0;
      baseOffsetPx = this.sheetState === 'peek' ? Math.round(window.innerHeight * 0.44) : 0;
    }, { passive: true });

    this.sideDrawer.addEventListener('touchmove', (e) => {
      if (!canDrag || e.touches.length !== 1) return;

      const deltaY = e.touches[0].clientY - startY;
      const deltaX = e.touches[0].clientX - startX;

      if (!dragging) {
        if (Math.abs(deltaY) < 6) return;
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          canDrag = false;
          return;
        }
        if (fromScrollBody && (deltaY < 0 || this.drawerContent.scrollTop > 2)) {
          canDrag = false;
          return;
        }
        dragging = true;
        this.sideDrawer.classList.add('is-dragging');
      }

      e.preventDefault();
      currentDeltaY = deltaY;
      const nextY = Math.max(0, baseOffsetPx + deltaY);
      this.sideDrawer.style.transform = `translate3d(0, ${nextY}px, 0)`;
    }, { passive: false });

    const finishDrag = () => {
      if (!canDrag) return;
      canDrag = false;

      if (!dragging) return;
      dragging = false;
      this.justDragged = true;
      setTimeout(() => { this.justDragged = false; }, 140);

      const dt = Math.max(1, Date.now() - startTime);
      const velocity = currentDeltaY / dt;

      if (this.sheetState === 'peek') {
        if (currentDeltaY < -55 || velocity < -0.45) {
          this.setSheetState('expanded');
        } else if (currentDeltaY > 70 || velocity > 0.5) {
          this.closeSideDrawer();
          this.mapController.clearSelection();
        } else {
          this.setSheetState('peek');
        }
      } else if (this.sheetState === 'expanded') {
        if (currentDeltaY > 220 || velocity > 0.9) {
          this.closeSideDrawer();
          this.mapController.clearSelection();
        } else if (currentDeltaY > 65 || velocity > 0.4) {
          this.setSheetState('peek');
        } else {
          this.setSheetState('expanded');
        }
      }
    };

    this.sideDrawer.addEventListener('touchend', finishDrag, { passive: true });
    this.sideDrawer.addEventListener('touchcancel', finishDrag, { passive: true });
  }

  updateDropdownKeyboardFocus(items) {
    items.forEach((el, idx) => {
      el.classList.toggle('is-focused', idx === this.dropdownFocusIndex);
      if (idx === this.dropdownFocusIndex) {
        el.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  renderMarketStatus() {
    const status = getMarketStatus();
    const label = status.tone === 'open'
      ? 'Abierto'
      : status.tone === 'closing-soon'
        ? 'Cierra pronto'
        : 'Cerrado';
    const html = `<span class="live-dot"></span><span>${label}</span>`;
    const title = `${status.statusText} · ${status.detailText} (CDMX)`;

    if (this.marketLivePill) {
      this.marketLivePill.className = `market-live-pill tone-${status.tone}`;
      this.marketLivePill.innerHTML = html;
      this.marketLivePill.title = title;
    }

    if (this.searchLivePill) {
      this.searchLivePill.className = `search-live-pill tone-${status.tone}`;
      this.searchLivePill.innerHTML = html;
      this.searchLivePill.title = title;
    }
  }

  renderCategoryBar() {
    this.categoryBar.innerHTML = '';

    for (const cat of this.categories) {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = `category-chip ${cat.id === this.activeCategory ? 'active' : ''}`;
      chip.dataset.categoryId = cat.id;
      const iconHtml = getIconSvg(cat.iconKey || cat.id, { size: 15, className: 'chip-icon-svg' });
      chip.innerHTML = `
        <span class="chip-icon">${iconHtml}</span>
        <span class="chip-name">${this.escapeHtml(cat.name)}</span>
      `;

      chip.addEventListener('click', () => {
        this.categoryBar.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.activeCategory = cat.id;
        this.mapController.filterByCategory(cat.id);
        this.renderFeaturedDock();
      });

      this.categoryBar.appendChild(chip);
    }
  }

  renderFeaturedDock() {
    if (!this.featuredStripList) return;
    const visibleLocales = this.activeCategory === 'todos'
      ? this.allLocales
      : this.allLocales.filter(loc =>
        loc.categoriaId === this.activeCategory ||
        (Array.isArray(loc.categoriasAdicionales) && loc.categoriasAdicionales.includes(this.activeCategory))
      );

    const countBadge = this.featuredDock?.querySelector('.featured-count-pill');
    if (countBadge) countBadge.textContent = String(visibleLocales.length);

    this.featuredStripList.innerHTML = visibleLocales.map(loc => {
      const status = evaluateSchedule(loc.schedule);
      const isActive = this.currentLocal && this.currentLocal.id === loc.id;
      const iconHtml = getIconSvg(loc.iconKey || loc.categoriaId || 'flores', { size: 17 });
      const color = loc.pinColor || CATEGORY_COLORS[loc.categoriaId] || '#E4007C';
      const shortStatus = status.isOpen ? 'Abierto' : 'Cerrado';

      return `
        <button type="button" class="featured-card ${isActive ? 'active' : ''}" data-featured-id="${loc.id}" style="--card-accent: ${color}" title="${this.escapeHtml(loc.nombre)} · ${status.statusText}">
          <span class="featured-card-icon">${iconHtml}</span>
          <span class="featured-card-body">
            <span class="featured-card-title">${this.escapeHtml(loc.nombreCorto || loc.nombre)}</span>
            <span class="featured-card-sub">${this.escapeHtml(loc.numeroDisplay)}</span>
            <span class="featured-card-meta">
              <span class="featured-chip-dot tone-${status.tone}" aria-hidden="true"></span>
              <span>${shortStatus}</span>
              ${loc.rating
                ? `<span class="featured-card-rating">★ ${loc.rating.toFixed(1)}</span>`
                : '<span class="featured-card-verified">· Verificado</span>'}
            </span>
          </span>
          <span class="featured-card-arrow" aria-hidden="true">${getIconSvg('chevronRight', { size: 14 })}</span>
        </button>
      `;
    }).join('');

    this.featuredStripList.querySelectorAll('.featured-card').forEach(btn => {
      btn.addEventListener('click', () => {
        const loc = visibleLocales.find(l => l.id === btn.dataset.featuredId);
        if (loc) this.mapController.selectItem(loc, 'local');
      });
    });
  }

  updateFeaturedActiveState(activeId) {
    if (!this.featuredStripList) return;
    this.featuredStripList.querySelectorAll('.featured-card').forEach(btn => {
      const match = activeId && btn.dataset.featuredId === activeId;
      btn.classList.toggle('active', Boolean(match));
      if (match) {
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });
  }

  stepFeatured(delta) {
    if (this.allLocales.length === 0) return;
    const currentIdx = this.currentLocal
      ? this.allLocales.findIndex(l => l.id === this.currentLocal.id)
      : -1;
    const nextIdx = currentIdx === -1
      ? (delta > 0 ? 0 : this.allLocales.length - 1)
      : (currentIdx + delta + this.allLocales.length) % this.allLocales.length;
    this.mapController.selectItem(this.allLocales[nextIdx], 'local');
  }

  renderQuickSuggestions() {
    const topShortcuts = this.allLocales.slice(0, 3);
    const pillsHtml = QUICK_SEARCH_QUERIES.map(term => `
      <button type="button" class="quick-suggest-chip" data-query="${this.escapeHtml(term)}">
        ${getIconSvg('search', { size: 12 })}
        <span>${this.escapeHtml(term)}</span>
      </button>
    `).join('');

    const shortcutsHtml = topShortcuts.map(loc => `
      <div class="search-result-item" data-shortcut-id="${loc.id}">
        <div class="res-icon-col res-icon-badge">
          ${getIconSvg(loc.iconKey || loc.categoriaId || 'flores', { size: 16 })}
        </div>
        <div class="res-info-col">
          <div class="res-header">
            <span class="res-name">${this.escapeHtml(loc.nombre)}</span>
            <span class="res-badge">${this.escapeHtml(loc.numeroDisplay)}</span>
          </div>
          <div class="res-sub">
            <span>${this.escapeHtml(loc.pasillo)}</span> · <span class="res-cat">${this.escapeHtml(loc.categoriaNombre)}</span>
          </div>
        </div>
      </div>
    `).join('');

    this.searchDropdown.innerHTML = `
      <div class="search-quick-section">
        <div class="search-section-label">
          ${getIconSvg('sparkles', { size: 13 })}
          <span>Explora Cuemanco</span>
        </div>
        <div class="quick-suggest-wrap">${pillsHtml}</div>
      </div>
      <div class="search-quick-divider"></div>
      <div class="search-quick-section">
        <div class="search-section-label">
          ${getIconSvg('store', { size: 13 })}
          <span>Lugares verificados</span>
        </div>
        ${shortcutsHtml}
      </div>
    `;

    this.showSearchDropdown();

    this.searchDropdown.querySelectorAll('.quick-suggest-chip').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const q = btn.dataset.query || '';
        this.searchInput.value = q;
        this.updateSearchBarPills(true);
        const results = this.searchEngine.search(q, 8);
        this.renderSearchResults(results, q);
      });
    });

    this.searchDropdown.querySelectorAll('[data-shortcut-id]').forEach(row => {
      row.addEventListener('click', () => {
        const loc = this.allLocales.find(l => l.id === row.dataset.shortcutId);
        if (loc) {
          this.searchInput.value = loc.nombre;
          this.updateSearchBarPills(true);
          this.hideSearchDropdown();
          this.searchInput.blur();
          this.mapController.selectItem(loc, 'local');
        }
      });
    });
  }

  renderSearchResults(results, query) {
    this.dropdownFocusIndex = -1;

    if (results.length === 0) {
      this.searchDropdown.innerHTML = `
        <div class="search-empty-state">
          <div class="empty-icon">
            ${getIconSvg('search', { size: 28 })}
          </div>
          <div class="empty-title">No encontramos "${this.escapeHtml(query)}"</div>
          <div class="empty-hint">Intenta buscar por: <i>Yura, D'raiz, La Hacienda, Savarioco, bonsái, suculentas, tacos o baños</i></div>
        </div>
      `;
      this.showSearchDropdown();
      return;
    }

    let html = '';
    for (const res of results) {
      const badgeText = res.tipo === 'zone'
        ? `Zona · ${res.numeroDisplay || ''}`.replace(/ · $/, '')
        : (res.numeroDisplay || 'Servicio');

      const itemIconKey = res.localRef?.iconKey || (res.tipo === 'zone' ? 'mapZone' : res.categoriaId || 'mapPin');

      html += `
        <div class="search-result-item" data-id="${res.id}">
          <div class="res-icon-col res-icon-badge">
            ${getIconSvg(itemIconKey, { size: 16 })}
          </div>
          <div class="res-info-col">
            <div class="res-header">
              <span class="res-name">${this.escapeHtml(res.nombre)}</span>
              ${badgeText ? `<span class="res-badge">${this.escapeHtml(badgeText)}</span>` : ''}
            </div>
            <div class="res-sub">
              <span>${this.escapeHtml(res.pasillo)}</span> · <span class="res-cat">${this.escapeHtml(res.categoriaNombre)}</span>
            </div>
            ${res.matchingProduct ? `
              <div class="res-product-match">
                <span class="match-tag">Coincidencia:</span> ${this.escapeHtml(res.matchingProduct)}
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }

    this.searchDropdown.innerHTML = html;
    this.showSearchDropdown();

    this.searchDropdown.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.id;
        const matched = results.find(r => r.id === id);
        if (matched && matched.localRef) {
          this.searchInput.value = matched.localRef.nombre;
          this.updateSearchBarPills(true);
          this.hideSearchDropdown();
          this.searchInput.blur();
          this.mapController.selectItem(matched.localRef, matched.tipo || 'local');
        }
      });
    });
  }

  showSearchDropdown() {
    this.searchDropdown.style.display = 'block';
  }

  hideSearchDropdown() {
    this.searchDropdown.style.display = 'none';
    this.dropdownFocusIndex = -1;
  }

  syncUrlSelection(itemType, id) {
    if (typeof window === 'undefined' || !window.history?.replaceState) return;
    const url = new URL(window.location.href);
    url.searchParams.delete('local');
    url.searchParams.delete('poi');
    url.searchParams.delete('zona');

    if (itemType && id) {
      const paramKey = itemType === 'zone' ? 'zona' : itemType === 'poi' ? 'poi' : 'local';
      url.searchParams.set(paramKey, id);
    }

    window.history.replaceState({}, '', url.toString());
  }

  openSideDrawer(item, itemType = 'local') {
    if (!item) {
      this.closeSideDrawer();
      return;
    }

    const type = typeof itemType === 'boolean'
      ? (itemType ? 'local' : 'poi')
      : (itemType || (item.isZone ? 'zone' : 'local'));

    this.currentLocal = item;
    this.closeMobileLayersPopover();
    this.syncUrlSelection(type, item.id);
    this.updateFeaturedActiveState(type === 'local' ? item.id : null);

    const heroTheme = type === 'poi'
      ? (item.categoriaId || 'servicios')
      : (item.categoriaId || 'flores');

    const heroImage = type === 'local'
      ? (item.foto || generateBotanicalHeroSvg(heroTheme, item.nombre, item))
      : generateBotanicalHeroSvg(heroTheme, item.nombre, item);

    const liveStatus = evaluateSchedule(item.schedule);

    const whatsappMessage = encodeURIComponent(
      `¡Hola! Vi su local (${item.numeroDisplay || item.nombre}) en el Mapa Interactivo de Cuemanco y quisiera información.`
    );
    const whatsappUrl = item.whatsapp ? `https://wa.me/${item.whatsapp}?text=${whatsappMessage}` : null;

    const mapsBtnHtml = item.googleMapsUrl ? `
      <a href="${item.googleMapsUrl}" target="_blank" rel="noopener" class="btn-action-maps" title="Abrir ubicación en Google Maps">
        ${getIconSvg('mapPin', { size: 15 })}
        <span>Google Maps</span>
      </a>
    ` : '';

    const actionCount = (whatsappUrl ? 1 : 0) + (item.telefono ? 1 : 0) + (mapsBtnHtml ? 1 : 0) + 1;

    let workshopsHtml = '';
    if (item.talleres && item.talleres.length > 0) {
      workshopsHtml = `
        <div class="drawer-section">
          <div class="section-title-row">
            <h4 class="section-title">
              ${getIconSvg('workshop', { size: 16 })}
              <span>Talleres de Capacitación y Hospital</span>
            </h4>
            <span class="badge-count">${item.talleres.length} talleres</span>
          </div>
          <div class="workshops-list">
            ${item.talleres.map(t => `
              <div class="workshop-card">
                <div class="workshop-icon-badge">${getIconSvg(t.iconKey || 'orquideas', { size: 18 })}</div>
                <div class="workshop-info">
                  <div class="workshop-title">${this.escapeHtml(t.nombre)}</div>
                  <div class="workshop-desc">${this.escapeHtml(t.desc || '')}</div>
                </div>
                ${whatsappUrl ? `
                  <a href="${whatsappUrl}%20Me%20interesa%20inscribirme%20al:%20${encodeURIComponent(t.nombre)}" target="_blank" rel="noopener" class="btn-ask-prod" title="Pedir informes por WhatsApp">
                    Informes
                  </a>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    let socialHtml = '';
    const redes = item.redes || {};
    const hasSocial = redes.facebook || redes.instagram || redes.tiktok || redes.x || item.website || item.email;
    if (hasSocial) {
      socialHtml = `
        <div class="drawer-section">
          <h4 class="section-title">
            ${getIconSvg('globe', { size: 16 })}
            <span>Redes y Contacto Oficial</span>
          </h4>
          <div class="social-links-grid">
            ${redes.facebook ? `
              <a href="${redes.facebook}" target="_blank" rel="noopener" class="social-pill fb" title="Facebook">
                ${getIconSvg('facebook', { size: 14 })}
                <span>${this.escapeHtml(redes.facebookName || 'Facebook')}</span>
              </a>
            ` : ''}
            ${redes.instagram ? `
              <a href="${redes.instagram}" target="_blank" rel="noopener" class="social-pill ig" title="Instagram">
                ${getIconSvg('instagram', { size: 14 })}
                <span>${this.escapeHtml(redes.instagramName || 'Instagram')}</span>
              </a>
            ` : ''}
            ${redes.tiktok ? `
              <a href="${redes.tiktok}" target="_blank" rel="noopener" class="social-pill tt" title="TikTok">
                ${getIconSvg('tiktok', { size: 14 })}
                <span>TikTok: ${this.escapeHtml(redes.tiktokName)}</span>
              </a>
            ` : ''}
            ${redes.x ? `
              <a href="${redes.x}" target="_blank" rel="noopener" class="social-pill tt" title="X / Twitter">
                ${getIconSvg('xSocial', { size: 14 })}
                <span>${this.escapeHtml(redes.xName)}</span>
              </a>
            ` : ''}
            ${item.website ? `
              <a href="${item.website}" target="_blank" rel="noopener" class="social-pill web" title="Sitio Web">
                ${getIconSvg('globe', { size: 14 })}
                <span>${this.escapeHtml(item.websiteDisplay || item.website)}</span>
              </a>
            ` : ''}
            ${item.email ? `
              <a href="mailto:${item.email}" class="social-pill mail" title="Correo Electrónico">
                ${getIconSvg('mail', { size: 14 })}
                <span>${this.escapeHtml(item.email)}</span>
              </a>
            ` : ''}
          </div>
        </div>
      `;
    }

    let contactHtml = '';
    if (item.contacto || item.entidad) {
      contactHtml = `
        <div class="contact-highlight-box">
          <div class="contact-avatar">
            ${this.escapeHtml((item.contacto || item.entidad).charAt(0))}
          </div>
          <div>
            ${item.entidad ? `<div class="contact-name">${this.escapeHtml(item.entidad)}</div>` : ''}
            ${item.contacto ? `<div class="contact-sub">Responsable: <b>${this.escapeHtml(item.contacto)}</b></div>` : ''}
            ${item.direccionCompleta ? `<div class="contact-address">${this.escapeHtml(item.direccionCompleta)}</div>` : ''}
          </div>
        </div>
      `;
    }

    let productsHtml = '';
    if (item.productos && item.productos.length > 0) {
      productsHtml = `
        <div class="drawer-section">
          <div class="section-title-row">
            <h4 class="section-title">
              ${getIconSvg('sparkles', { size: 16 })}
              <span>Catálogo y Venta</span>
            </h4>
            <span class="badge-count">${item.productos.length} items</span>
          </div>
          <div class="products-list">
            ${item.productos.map(p => `
              <div class="product-card">
                <div class="prod-main">
                  <div class="prod-title">${this.escapeHtml(p.nombre)}</div>
                  <div class="prod-desc">${this.escapeHtml(p.desc || '')}</div>
                </div>
                <div class="prod-aside">
                  <div class="prod-price">${this.escapeHtml(p.precio || 'Consultar')}</div>
                  ${p.tag ? `<div class="prod-tag">${this.escapeHtml(p.tag)}</div>` : ''}
                  ${whatsappUrl ? `
                    <a href="${whatsappUrl}%20Me%20interesa:%20${encodeURIComponent(p.nombre)}" target="_blank" rel="noopener" class="btn-ask-prod" title="Preguntar en WhatsApp">
                      Pedir
                    </a>
                  ` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    let servicesHtml = '';
    if (item.servicios && item.servicios.length > 0) {
      servicesHtml = `
        <div class="drawer-section">
          <h4 class="section-title">Servicios y Especialidades</h4>
          <div class="services-chips-wrap">
            ${item.servicios.map(s => `<span class="service-pill">${this.escapeHtml(s)}</span>`).join('')}
          </div>
        </div>
      `;
    }

    this.drawerContent.innerHTML = `
      <div class="drawer-hero-wrapper">
        <img src="${heroImage}" alt="${this.escapeHtml(item.nombre)}" class="drawer-hero-img" />
        <div class="drawer-hero-scrim" aria-hidden="true"></div>
        <div class="drawer-live-status tone-${liveStatus.tone}">
          <span class="live-dot"></span>
          <span>${this.escapeHtml(liveStatus.statusText)}${liveStatus.detailText ? ` · ${this.escapeHtml(liveStatus.detailText)}` : ''}</span>
        </div>
        <div class="drawer-hero-badge">
          ${this.escapeHtml(item.numeroDisplay || 'Cuemanco')}
        </div>
      </div>

      <div class="drawer-body">
        <div class="drawer-header">
          <div class="drawer-category-label" style="color: ${item.color || 'var(--rosa-mexicano)'}">
            ${this.escapeHtml(item.categoriaNombre || 'Punto de Interés')}
          </div>
          <h2 class="drawer-title">${this.escapeHtml(item.nombre)}</h2>
          <div class="drawer-location-row">
            ${getIconSvg('mapPin', { size: 14, className: 'loc-pin-svg' })}
            <span class="loc-text">${this.escapeHtml(item.pasillo)}</span>
          </div>

          ${item.rating ? `
            <div class="drawer-rating-row">
              <span class="rating-stars-svg">${renderStarRating(item.rating, 14)}</span>
              <span class="rating-val">${item.rating.toFixed(1)}</span>
              <span class="rating-reviews">(${item.reviews} valoraciones)</span>
            </div>
          ` : ''}
        </div>

        <div class="drawer-actions-bar" data-actions-count="${actionCount}">
          ${whatsappUrl ? `
            <a href="${whatsappUrl}" target="_blank" rel="noopener" class="btn-action-primary btn-whatsapp">
              ${getIconSvg('whatsapp', { size: 16 })}
              <span>WhatsApp</span>
            </a>
          ` : ''}

          ${item.telefono ? `
            <a href="tel:${item.telefono}" class="btn-action-secondary">
              ${getIconSvg('phone', { size: 15 })}
              <span>Llamar</span>
            </a>
          ` : ''}

          ${mapsBtnHtml}

          <button class="btn-action-secondary" id="btn-copy-share" type="button">
            <span class="share-icon-wrap">${getIconSvg('share', { size: 15 })}</span>
            <span class="share-label">Compartir</span>
          </button>
        </div>

        <button type="button" id="btn-sheet-expand" class="sheet-expand-cta">
          <span>Ver catálogo y detalles completos</span>
          ${getIconSvg('chevronDown', { size: 15, className: 'expand-cta-arrow' })}
        </button>

        ${contactHtml}

        <div class="drawer-section drawer-details-box">
          <div class="detail-row">
            <span class="detail-icon-box">${getIconSvg('clock', { size: 16 })}</span>
            <div>
              <div class="detail-label">Horario de Atención</div>
              <div class="detail-value highlight-status tone-${liveStatus.tone}">${this.escapeHtml(item.horario || 'Lunes a Domingo: 8:00 AM - 6:30 PM')}</div>
            </div>
          </div>
          <div class="detail-row">
            <span class="detail-icon-box">${getIconSvg('info', { size: 16 })}</span>
            <div>
              <div class="detail-label">Descripción</div>
              <div class="detail-value">${this.escapeHtml(item.descripcion || 'Punto tradicional dentro del Mercado de Plantas y Flores de Cuemanco.')}</div>
            </div>
          </div>
        </div>

        ${workshopsHtml}
        ${productsHtml}
        ${servicesHtml}
        ${socialHtml}

        <div class="drawer-footer-note">
          Mercado de Plantas y Flores Cuemanco · Xochimilco, Ciudad de México
        </div>
      </div>
    `;

    const expandBtn = document.getElementById('btn-sheet-expand');
    if (expandBtn) {
      expandBtn.addEventListener('click', () => {
        this.setSheetState('expanded');
      });
    }

    const shareBtn = document.getElementById('btn-copy-share');
    if (shareBtn) {
      shareBtn.addEventListener('click', async () => {
        const label = shareBtn.querySelector('.share-label');
        const iconWrap = shareBtn.querySelector('.share-icon-wrap');
        try {
          if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(window.location.href);
            label.textContent = '¡Copiado!';
            iconWrap.innerHTML = getIconSvg('check', { size: 15 });
          } else {
            label.textContent = 'URL lista';
          }
        } catch {
          label.textContent = 'URL lista';
        }
        setTimeout(() => {
          label.textContent = 'Compartir';
          iconWrap.innerHTML = getIconSvg('share', { size: 15 });
        }, 2000);
      });
    }

    this.drawerContent.scrollTop = 0;
    this.setSheetState(this.isMobile() ? 'peek' : 'expanded');
  }

  closeSideDrawer() {
    this.setSheetState('closed');
    this.currentLocal = null;
    this.updateFeaturedActiveState(null);
    this.syncUrlSelection(null, null);
  }
}
