import { generateBotanicalHeroSvg } from './data/locales.js';

export class MarketUI {
  constructor(options) {
    this.searchEngine = options.searchEngine;
    this.categories = options.categories;
    this.mapController = options.mapController;

    // Elementos del DOM
    this.searchInput = document.getElementById('search-input');
    this.searchClearBtn = document.getElementById('search-clear-btn');
    this.searchDropdown = document.getElementById('search-dropdown');
    this.categoryBar = document.getElementById('category-bar');
    this.sideDrawer = document.getElementById('side-drawer');
    this.drawerContent = document.getElementById('drawer-content');
    this.drawerCloseBtn = document.getElementById('drawer-close-btn');
    this.toggleStandsBtn = document.getElementById('toggle-stands-btn');

    this.currentLocal = null;
    this.activeCategory = 'todos';

    this.initEvents();
    this.renderCategoryBar();
  }

  initEvents() {
    // Evento de escritura en el buscador (autocompletado en tiempo real)
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

    // Limpiar buscador
    this.searchClearBtn.addEventListener('click', () => {
      this.searchInput.value = '';
      this.searchClearBtn.style.display = 'none';
      this.hideSearchDropdown();
      this.searchInput.focus();
    });

    // Cerrar buscador al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-box-container')) {
        this.hideSearchDropdown();
      }
    });

    // Cerrar panel lateral
    this.drawerCloseBtn.addEventListener('click', () => {
      this.closeSideDrawer();
      this.mapController.clearSelection();
    });

    // Alternar visualización de los 1800 stands
    if (this.toggleStandsBtn) {
      this.toggleStandsBtn.addEventListener('click', () => {
        const isActive = this.toggleStandsBtn.classList.toggle('active');
        this.mapController.toggleStandsView(isActive);
        this.toggleStandsBtn.querySelector('.btn-text').textContent = isActive 
          ? 'Ocultar cuadrícula (1,800)' 
          : 'Ver todos los locales (1,800)';
      });
    }

    // Tecla Escape para cerrar modales
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
          <div class="empty-title">No encontramos "${query}"</div>
          <div class="empty-hint">Intenta buscar por: <i>orquídea, bugambilia, suculenta, maceta, pasillo 4 o número de local (ej. 104, 520)</i></div>
        </div>
      `;
      this.showSearchDropdown();
      return;
    }

    let html = '';
    for (const res of results) {
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
              <span class="res-name">${res.nombre}</span>
              ${res.numeroDisplay ? `<span class="res-badge">${res.numeroDisplay}</span>` : ''}
            </div>
            <div class="res-sub">
              <span>${res.pasillo}</span> · <span class="res-cat">${res.categoriaNombre}</span>
            </div>
            ${res.matchingProduct ? `
              <div class="res-product-match">
                <span class="match-tag">Producto:</span> ${res.matchingProduct}
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }

    this.searchDropdown.innerHTML = html;
    this.showSearchDropdown();

    // Eventos de clic en resultados de búsqueda
    this.searchDropdown.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.id;
        const matched = results.find(r => r.id === id);
        if (matched && matched.localRef) {
          this.searchInput.value = matched.localRef.nombre;
          this.hideSearchDropdown();
          this.mapController.selectItem(matched.localRef, matched.tipo === 'local');
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

  openSideDrawer(item, isLocal = true) {
    if (!item) {
      this.closeSideDrawer();
      return;
    }

    this.currentLocal = item;
    const heroImage = isLocal 
      ? (item.foto || generateBotanicalHeroSvg(item.categoriaId || 'flores', item.nombre))
      : generateBotanicalHeroSvg('servicios', item.nombre);

    const whatsappMessage = encodeURIComponent(
      `¡Hola! Vi su local (${item.numeroDisplay || item.nombre}) en el Mapa Interactivo de Cuemanco y quisiera información.`
    );
    const whatsappUrl = item.whatsapp ? `https://wa.me/${item.whatsapp}?text=${whatsappMessage}` : null;

    // Botón de Google Maps
    const mapsBtnHtml = item.googleMapsUrl ? `
      <a href="${item.googleMapsUrl}" target="_blank" rel="noopener" class="btn-action-maps" title="Abrir ubicación en Google Maps">
        <span>📍 Google Maps</span>
      </a>
    ` : '';

    // Sección de Talleres de Capacitación (si aplica)
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

    // Redes Sociales y Enlaces Oficiales
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

    // Bloque de Contacto / Entidad
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
        <img src="${heroImage}" alt="${item.nombre}" class="drawer-hero-img" />
        <div class="drawer-hero-badge">
          ${item.numeroDisplay || 'Cuemanco'}
        </div>
      </div>

      <div class="drawer-body">
        <div class="drawer-header">
          <div class="drawer-category-label" style="color: var(--rosa-mexicano)">
            ${item.categoriaNombre || 'Punto de Interés'}
          </div>
          <h2 class="drawer-title">${item.nombre}</h2>
          <div class="drawer-location-row">
            <span class="loc-text">${item.pasillo}</span>
          </div>

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
              <div class="detail-value highlight-open">${item.horario || 'Abierto de 8:00 AM a 6:30 PM'}</div>
            </div>
          </div>
          <div class="detail-row">
            <div>
              <div class="detail-label">Descripción</div>
              <div class="detail-value">${item.descripcion || 'Punto tradicional dentro del Mercado de Plantas y Flores de Cuemanco.'}</div>
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

    // Botón de compartir
    const shareBtn = document.getElementById('btn-copy-share');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href);
        shareBtn.querySelector('span:last-child').textContent = '¡Copiado!';
        setTimeout(() => {
          shareBtn.querySelector('span:last-child').textContent = 'Compartir';
        }, 2000);
      });
    }

    this.sideDrawer.classList.add('open');
  }

  closeSideDrawer() {
    this.sideDrawer.classList.remove('open');
    this.currentLocal = null;
  }
}
