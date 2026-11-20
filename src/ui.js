import { generateBotanicalHeroSvg } from './data/locales.js';

export class MarketUI {
  constructor(options) {
    this.searchEngine = options.searchEngine;
    this.categories = options.categories;
    this.mapController = options.mapController;
    this.allLocales = options.locales || [];
    this.allZones = options.zones || [];

    // Elementos del DOM
    this.searchInput = document.getElementById('search-input');
    this.searchClearBtn = document.getElementById('search-clear-btn');
    this.searchDropdown = document.getElementById('search-dropdown');
    this.categoryBar = document.getElementById('category-bar');
    this.sideDrawer = document.getElementById('side-drawer');
    this.drawerContent = document.getElementById('drawer-content');
    this.drawerCloseBtn = document.getElementById('drawer-close-btn');
    this.layersPanel = document.getElementById('map-layers-panel');
    this.layersToggleBtn = document.getElementById('layers-toggle-btn');

    this.currentLocal = null;
    this.activeCategory = 'todos';

    this.initEvents();
    this.renderCategoryBar();
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

  initEvents() {
    this.searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      this.searchClearBtn.style.display = query.length > 0 ? 'flex' : 'none';

      if (query.length === 0) {
        this.hideSearchDropdown();
        return;
      }

      const results = this.searchEngine.search(query, 8);
      this.renderSearchResults(results, query);
    });

    this.searchClearBtn.addEventListener('click', () => {
      this.searchInput.value = '';
      this.searchClearBtn.style.display = 'none';
      this.hideSearchDropdown();
      this.searchInput.focus();
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-box-container')) {
        this.hideSearchDropdown();
      }
    });

    this.drawerCloseBtn.addEventListener('click', () => {
      this.closeSideDrawer();
      this.mapController.clearSelection();
    });

    // Control de Capas (colapsado por defecto en pantallas pequeñas)
    if (this.layersPanel && this.layersToggleBtn) {
      if (window.innerWidth <= 900) {
        this.layersPanel.classList.add('collapsed');
        this.layersToggleBtn.setAttribute('aria-expanded', 'false');
      }

      this.layersToggleBtn.addEventListener('click', () => {
        const collapsed = this.layersPanel.classList.toggle('collapsed');
        this.layersToggleBtn.setAttribute('aria-expanded', String(!collapsed));
      });

      this.layersPanel.querySelectorAll('input[data-layer]').forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
          this.mapController.toggleLayer(checkbox.dataset.layer, checkbox.checked);
        });
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeSideDrawer();
        this.hideSearchDropdown();
        this.mapController.clearSelection();
      }
    });
  }

  renderCategoryBar() {
    this.categoryBar.innerHTML = '';

    for (const cat of this.categories) {
      const chip = document.createElement('button');
      chip.className = `category-chip ${cat.id === this.activeCategory ? 'active' : ''}`;
      chip.dataset.categoryId = cat.id;
      chip.innerHTML = `
        <span class="chip-name">${cat.name}</span>
      `;

      chip.addEventListener('click', () => {
        this.categoryBar.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.activeCategory = cat.id;
        this.mapController.filterByCategory(cat.id);
      });

      this.categoryBar.appendChild(chip);
    }
  }

  renderSearchResults(results, query) {
    if (results.length === 0) {
      this.searchDropdown.innerHTML = `
        <div class="search-empty-state">
          <div class="empty-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <div class="empty-title">No encontramos "${this.escapeHtml(query)}"</div>
          <div class="empty-hint">Intenta buscar por: <i>Yura, D'raiz, Hospital IMFFSS, tacos, baños, macetas, orquídeas o estacionamiento</i></div>
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

      html += `
        <div class="search-result-item" data-id="${res.id}">
          <div class="res-icon-col">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
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
          this.hideSearchDropdown();
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
    this.syncUrlSelection(type, item.id);

    const heroTheme = type === 'poi'
      ? (item.categoriaId || 'servicios')
      : (item.categoriaId || 'flores');

    const heroImage = type === 'local'
      ? (item.foto || generateBotanicalHeroSvg(heroTheme, item.nombre, item))
      : generateBotanicalHeroSvg(heroTheme, item.nombre, item);

    const whatsappMessage = encodeURIComponent(
      `¡Hola! Vi su local (${item.numeroDisplay || item.nombre}) en el Mapa Interactivo de Cuemanco y quisiera información.`
    );
    const whatsappUrl = item.whatsapp ? `https://wa.me/${item.whatsapp}?text=${whatsappMessage}` : null;

    const mapsBtnHtml = item.googleMapsUrl ? `
      <a href="${item.googleMapsUrl}" target="_blank" rel="noopener" class="btn-action-maps" title="Abrir ubicación en Google Maps">
        <span>📍 Google Maps</span>
      </a>
    ` : '';

    const parentZone = item.zoneId && type !== 'zone'
      ? this.allZones.find(z => z.id === item.zoneId)
      : null;

    const parentZoneHtml = parentZone ? `
      <button type="button" class="drawer-zone-pill" id="btn-open-parent-zone">
        <span>🗺️ ${this.escapeHtml(parentZone.nombre)}</span>
        <span aria-hidden="true">→</span>
      </button>
    ` : '';

    let zoneLocalesHtml = '';
    let zoneLocales = [];
    if (type === 'zone') {
      zoneLocales = this.allLocales.filter(l => l.zoneId === item.id);
      if (zoneLocales.length > 0) {
        zoneLocalesHtml = `
          <div class="drawer-section">
            <div class="section-title-row">
              <h4 class="section-title">📍 Locales en esta zona</h4>
              <span class="badge-count">${zoneLocales.length} verificados</span>
            </div>
            <div class="zone-locales-list">
              ${zoneLocales.map(loc => `
                <button type="button" class="zone-local-card" data-local-id="${loc.id}">
                  <span class="zone-local-icon">${loc.icon || '🌸'}</span>
                  <span class="zone-local-info">
                    <span class="zone-local-name">${this.escapeHtml(loc.nombre)}</span>
                    <span class="zone-local-meta">${this.escapeHtml(loc.numeroDisplay)} · ${this.escapeHtml(loc.categoriaNombre)}</span>
                  </span>
                  <span class="zone-local-arrow" aria-hidden="true">→</span>
                </button>
              `).join('')}
            </div>
          </div>
        `;
      }
    }

    let workshopsHtml = '';
    if (item.talleres && item.talleres.length > 0) {
      workshopsHtml = `
        <div class="drawer-section">
          <div class="section-title-row">
            <h4 class="section-title">🌿 Talleres de Capacitación y Hospital</h4>
            <span class="badge-count">${item.talleres.length} talleres</span>
          </div>
          <div class="workshops-list">
            ${item.talleres.map(t => `
              <div class="workshop-card">
                <div class="workshop-icon-badge">${t.icon || '🌱'}</div>
                <div class="workshop-info">
                  <div class="workshop-title">${t.nombre}</div>
                  <div class="workshop-desc">${t.desc || ''}</div>
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
          <h4 class="section-title">🌐 Redes y Contacto Oficial</h4>
          <div class="social-links-grid">
            ${redes.facebook ? `
              <a href="${redes.facebook}" target="_blank" rel="noopener" class="social-pill fb" title="Facebook">
                <span>📘 ${redes.facebookName || 'Facebook'}</span>
              </a>
            ` : ''}
            ${redes.instagram ? `
              <a href="${redes.instagram}" target="_blank" rel="noopener" class="social-pill ig" title="Instagram">
                <span>📸 ${redes.instagramName || 'Instagram'}</span>
              </a>
            ` : ''}
            ${redes.tiktok ? `
              <a href="${redes.tiktok}" target="_blank" rel="noopener" class="social-pill tt" title="TikTok">
                <span>🎵 TikTok: ${redes.tiktokName}</span>
              </a>
            ` : ''}
            ${redes.x ? `
              <a href="${redes.x}" target="_blank" rel="noopener" class="social-pill tt" title="X / Twitter">
                <span>✖️ ${redes.xName}</span>
              </a>
            ` : ''}
            ${item.website ? `
              <a href="${item.website}" target="_blank" rel="noopener" class="social-pill web" title="Sitio Web">
                <span>🌍 ${item.websiteDisplay || item.website}</span>
              </a>
            ` : ''}
            ${item.email ? `
              <a href="mailto:${item.email}" class="social-pill mail" title="Correo Electrónico">
                <span>✉️ ${item.email}</span>
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
            ${(item.contacto || item.entidad).charAt(0)}
          </div>
          <div>
            ${item.entidad ? `<div class="contact-name">${item.entidad}</div>` : ''}
            ${item.contacto ? `<div class="contact-sub">Responsable: <b>${item.contacto}</b></div>` : ''}
            ${item.direccionCompleta ? `<div style="font-size: 11px; color: #475569; margin-top: 2px;">${item.direccionCompleta}</div>` : ''}
          </div>
        </div>
      `;
    }

    let productsHtml = '';
    if (item.productos && item.productos.length > 0) {
      productsHtml = `
        <div class="drawer-section">
          <div class="section-title-row">
            <h4 class="section-title">Catálogo y Venta</h4>
            <span class="badge-count">${item.productos.length} items</span>
          </div>
          <div class="products-list">
            ${item.productos.map(p => `
              <div class="product-card">
                <div class="prod-main">
                  <div class="prod-title">${p.nombre}</div>
                  <div class="prod-desc">${p.desc || ''}</div>
                </div>
                <div class="prod-aside">
                  <div class="prod-price">${p.precio || 'Consultar'}</div>
                  ${p.tag ? `<div class="prod-tag">${p.tag}</div>` : ''}
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
            ${item.servicios.map(s => `<span class="service-pill">${s}</span>`).join('')}
          </div>
        </div>
      `;
    }

    this.drawerContent.innerHTML = `
      <div class="drawer-hero-wrapper">
        <img src="${heroImage}" alt="${this.escapeHtml(item.nombre)}" class="drawer-hero-img" />
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
            <span class="loc-text">${this.escapeHtml(item.pasillo)}</span>
          </div>
          ${parentZoneHtml}

          ${item.rating ? `
            <div class="drawer-rating-row">
              <span class="rating-stars">★★★★★</span>
              <span class="rating-val">${item.rating}</span>
              <span class="rating-reviews">(${item.reviews} valoraciones de visitantes)</span>
            </div>
          ` : ''}
        </div>

        <div class="drawer-actions-bar">
          ${whatsappUrl ? `
            <a href="${whatsappUrl}" target="_blank" rel="noopener" class="btn-action-primary">
              <span>WhatsApp</span>
            </a>
          ` : ''}

          ${item.telefono ? `
            <a href="tel:${item.telefono}" class="btn-action-secondary">
              <span>Llamar</span>
            </a>
          ` : ''}

          ${mapsBtnHtml}

          <button class="btn-action-secondary" id="btn-copy-share">
            <span>Compartir</span>
          </button>
        </div>

        ${contactHtml}

        <div class="drawer-section drawer-details-box">
          <div class="detail-row">
            <div>
              <div class="detail-label">Horario de Atención</div>
              <div class="detail-value highlight-open">${this.escapeHtml(item.horario || 'Abierto de 8:00 AM a 6:30 PM')}</div>
            </div>
          </div>
          <div class="detail-row">
            <div>
              <div class="detail-label">Descripción</div>
              <div class="detail-value">${this.escapeHtml(item.descripcion || 'Punto tradicional dentro del Mercado de Plantas y Flores de Cuemanco.')}</div>
            </div>
          </div>
        </div>

        ${zoneLocalesHtml}
        ${workshopsHtml}
        ${productsHtml}
        ${servicesHtml}
        ${socialHtml}

        <div class="drawer-footer-note">
          Mercado de Plantas y Flores Cuemanco · Xochimilco, Ciudad de México
        </div>
      </div>
    `;

    const parentZoneBtn = document.getElementById('btn-open-parent-zone');
    if (parentZoneBtn && parentZone) {
      parentZoneBtn.addEventListener('click', () => {
        this.mapController.selectItem(parentZone, 'zone');
      });
    }

    if (zoneLocales.length > 0) {
      this.drawerContent.querySelectorAll('.zone-local-card').forEach(btn => {
        btn.addEventListener('click', () => {
          const loc = zoneLocales.find(l => l.id === btn.dataset.localId);
          if (loc) this.mapController.selectItem(loc, 'local');
        });
      });
    }

    const shareBtn = document.getElementById('btn-copy-share');
    if (shareBtn) {
      shareBtn.addEventListener('click', async () => {
        const label = shareBtn.querySelector('span:last-child');
        try {
          if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(window.location.href);
            label.textContent = '¡Enlace copiado!';
          } else {
            label.textContent = 'URL lista en barra';
          }
        } catch {
          label.textContent = 'URL lista en barra';
        }
        setTimeout(() => {
          label.textContent = 'Compartir';
        }, 2000);
      });
    }

    this.sideDrawer.classList.add('open');
  }

  closeSideDrawer() {
    this.sideDrawer.classList.remove('open');
    this.currentLocal = null;
    this.syncUrlSelection(null, null);
  }
}
