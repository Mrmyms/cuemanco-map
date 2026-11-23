// Sistema centralizado de íconos SVG botánicos y de interfaz para Cuemanco
const SVG_OPEN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';

export const ICONS = {
  brandFlower: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><g fill="currentColor" opacity="0.95"><ellipse cx="12" cy="5.8" rx="2.4" ry="4.1"/><ellipse cx="12" cy="18.2" rx="2.4" ry="4.1"/><ellipse cx="5.8" cy="12" rx="4.1" ry="2.4"/><ellipse cx="18.2" cy="12" rx="4.1" ry="2.4"/><ellipse cx="7.6" cy="7.6" rx="2.3" ry="3.8" transform="rotate(-45 7.6 7.6)"/><ellipse cx="16.4" cy="16.4" rx="2.3" ry="3.8" transform="rotate(-45 16.4 16.4)"/><ellipse cx="16.4" cy="7.6" rx="2.3" ry="3.8" transform="rotate(45 16.4 7.6)"/><ellipse cx="7.6" cy="16.4" rx="2.3" ry="3.8" transform="rotate(45 7.6 16.4)"/></g><circle cx="12" cy="12" r="2.8" fill="#FDE047"/></svg>',

  all: `${SVG_OPEN}<rect x="3" y="3" width="7" height="7" rx="1.8"></rect><rect x="14" y="3" width="7" height="7" rx="1.8"></rect><rect x="3" y="14" width="7" height="7" rx="1.8"></rect><rect x="14" y="14" width="7" height="7" rx="1.8"></rect></svg>`,

  flores: `${SVG_OPEN}<circle cx="12" cy="12" r="2.5"></circle><path d="M12 2.5c1.8 0 3 1.7 3 3.4 0 1.3-.8 2.4-1.8 3 1.2-.3 2.5-.1 3.5.9 1.2 1.2 1.2 3.2 0 4.4-1 .9-2.3 1.2-3.5.9 1 .6 1.8 1.7 1.8 3 0 1.7-1.2 3.4-3 3.4s-3-1.7-3-3.4c0-1.3.8-2.4 1.8-3-1.2.3-2.5.1-3.5-.9-1.2-1.2-1.2-3.2 0-4.4 1-1 2.3-1.2 3.5-.9-1-.6-1.8-1.7-1.8-3 0-1.7 1.2-3.4 3-3.4z"></path></svg>`,

  interior: `${SVG_OPEN}<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>`,

  orquideas: `${SVG_OPEN}<path d="M12 13V21"></path><path d="M12 12C9 12 6 9.8 6 6.8 6 4.8 7.5 3.5 9.2 4.2 10.6 4.8 11.4 6 12 7.5 12.6 6 13.4 4.8 14.8 4.2 16.5 3.5 18 4.8 18 6.8 18 9.8 15 12 12 12z"></path><path d="M7.5 13.5c-2.5.2-4.2-1.2-4.5-3.2-.3-1.6 1-2.8 2.5-2.3"></path><path d="M16.5 13.5c2.5.2 4.2-1.2 4.5-3.2.3-1.6-1-2.8-2.5-2.3"></path><circle cx="12" cy="10.5" r="1.4" fill="currentColor"></circle></svg>`,

  suculentas: `${SVG_OPEN}<path d="M12 3v18"></path><path d="M9.5 21V6.5a2.5 2.5 0 0 1 5 0V21"></path><path d="M9.5 14H7a2.5 2.5 0 0 1-2.5-2.5V9a1.5 1.5 0 0 1 3 0v2.5h2"></path><path d="M14.5 12H17a2.5 2.5 0 0 0 2.5-2.5V7.5a1.5 1.5 0 0 0-3 0V9.5h-2"></path><path d="M6 21h12"></path></svg>`,

  macetas: `${SVG_OPEN}<path d="M5 9h14l-1.8 10.2a2 2 0 0 1-2 1.8H8.8a2 2 0 0 1-2-1.8L5 9z"></path><rect x="4" y="6" width="16" height="3" rx="1.2"></rect><path d="M8.5 14h7"></path></svg>`,

  tierra: `${SVG_OPEN}<path d="M7 20h10"></path><path d="M10 20c5.5-2.5.8-6.4 3-10"></path><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"></path><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"></path></svg>`,

  arboles: `${SVG_OPEN}<path d="M12 22v-6"></path><path d="M8 22h8"></path><path d="M12 3 6.5 10.5h3L5.5 16h13l-4-5.5h3L12 3z"></path></svg>`,

  servicios: `${SVG_OPEN}<circle cx="12" cy="12" r="9"></circle><polygon points="15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5 15.5 8.5"></polygon></svg>`,

  pottedPlant: `${SVG_OPEN}<path d="M7 14h10l-1.2 6.5a1.5 1.5 0 0 1-1.5 1.2H9.7a1.5 1.5 0 0 1-1.5-1.2L7 14z"></path><path d="M12 14V8"></path><path d="M12 10.5C9.2 10.5 7 8.8 7 6c2.8 0 5 1.7 5 4.5z"></path><path d="M12 9c0-2.8 2.2-4.5 5-4.5 0 2.8-2.2 4.5-5 4.5z"></path></svg>`,

  medicalLeaf: `${SVG_OPEN}<rect x="3" y="3" width="18" height="18" rx="5"></rect><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>`,

  utensils: `${SVG_OPEN}<path d="M4 3v7a3 3 0 0 0 6 0V3"></path><path d="M7 3v18"></path><path d="M16 3v18"></path><path d="M16 3c2.5 1 3.5 3.8 3.5 7.5H16"></path></svg>`,

  building: `${SVG_OPEN}<path d="M3 21h18"></path><path d="M5 21V7l7-4 7 4v14"></path><path d="M9 11h1"></path><path d="M14 11h1"></path><path d="M9 15h1"></path><path d="M14 15h1"></path><path d="M10 21v-3a2 2 0 0 1 4 0v3"></path></svg>`,

  sanitario: `${SVG_OPEN}<circle cx="9" cy="6" r="1.8"></circle><path d="M7 11h4l-.6 5H7.6L7 11z"></path><path d="M8 16v5"></path><path d="M10 16v5"></path><circle cx="16" cy="6" r="1.8"></circle><path d="M14 11h4l1 5h-6l1-5z"></path><path d="M15 16v5"></path><path d="M17 16v5"></path></svg>`,

  estacionamiento: `${SVG_OPEN}<rect x="4" y="4" width="16" height="16" rx="4"></rect><path d="M10 16V8h3.2a2.4 2.4 0 0 1 0 4.8H10"></path></svg>`,

  car: `${SVG_OPEN}<path d="M5 17h14v-5l-2-4.5a2 2 0 0 0-1.8-1.2H8.8A2 2 0 0 0 7 7.5L5 12v5z"></path><circle cx="7.5" cy="17.5" r="1.5"></circle><circle cx="16.5" cy="17.5" r="1.5"></circle><path d="M5 12h14"></path></svg>`,

  walk: `${SVG_OPEN}<circle cx="13" cy="5" r="1.8"></circle><path d="M10 21l2-6-2-3 2.5-3.5L15 11l3 1"></path><path d="M12.5 14.5l3.5 6.5"></path><path d="M9.5 11l-2.5 3"></path></svg>`,

  search: `${SVG_OPEN}<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,

  close: `${SVG_OPEN}<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,

  layers: `${SVG_OPEN}<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,

  chevronDown: `${SVG_OPEN}<polyline points="6 9 12 15 18 9"></polyline></svg>`,
  chevronLeft: `${SVG_OPEN}<polyline points="15 18 9 12 15 6"></polyline></svg>`,
  chevronRight: `${SVG_OPEN}<polyline points="9 18 15 12 9 6"></polyline></svg>`,

  compass: `${SVG_OPEN}<circle cx="12" cy="12" r="9"></circle><polygon points="15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5 15.5 8.5" fill="currentColor"></polygon></svg>`,

  crosshair: `${SVG_OPEN}<circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="3"></circle><line x1="12" y1="2" x2="12" y2="5"></line><line x1="12" y1="19" x2="12" y2="22"></line><line x1="2" y1="12" x2="5" y2="12"></line><line x1="19" y1="12" x2="22" y2="12"></line></svg>`,

  whatsapp: `${SVG_OPEN}<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`,

  phone: `${SVG_OPEN}<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,

  mapPin: `${SVG_OPEN}<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,

  share: `${SVG_OPEN}<circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>`,

  check: `${SVG_OPEN}<polyline points="20 6 9 17 4 12"></polyline></svg>`,
  clock: `${SVG_OPEN}<circle cx="12" cy="12" r="9"></circle><polyline points="12 7 12 12 15.5 14"></polyline></svg>`,
  info: `${SVG_OPEN}<circle cx="12" cy="12" r="9"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,

  sparkles: `${SVG_OPEN}<path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3z"></path><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z"></path></svg>`,

  starFull: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',

  starHalf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" opacity="0.25" fill="currentColor"></polygon><polygon points="12 2 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" stroke="none"></polygon><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',

  starEmpty: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" opacity="0.35" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',

  arrowRight: `${SVG_OPEN}<line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,

  mapZone: `${SVG_OPEN}<polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>`,

  workshop: `${SVG_OPEN}<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,

  store: `${SVG_OPEN}<path d="M3 9l1-5h16l1 5"></path><path d="M5 9v11h14V9"></path><path d="M9 20v-6h6v6"></path></svg>`,

  facebook: `${SVG_OPEN}<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>`,

  instagram: `${SVG_OPEN}<rect x="2" y="2" width="20" height="20" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`,

  tiktok: `${SVG_OPEN}<path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>`,

  xSocial: `${SVG_OPEN}<path d="M4 4l16 16"></path><path d="M20 4L4 20"></path></svg>`,

  globe: `${SVG_OPEN}<circle cx="12" cy="12" r="9"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9 15 15 0 0 1-4-9 15 15 0 0 1 4-9z"></path></svg>`,

  mail: `${SVG_OPEN}<rect x="2" y="4" width="20" height="16" rx="2"></rect><polyline points="22 6 12 13 2 6"></polyline></svg>`
};

export function getIconSvg(key, { size = 18, className = '' } = {}) {
  const raw = ICONS[key] || ICONS.mapPin;
  const cls = className ? ` class="${className}"` : '';
  return raw.replace('<svg ', `<svg width="${size}" height="${size}"${cls} `);
}

export function renderStarRating(rating = 5, size = 14) {
  const numeric = Number(rating) || 0;
  let html = '';
  for (let i = 1; i <= 5; i++) {
    const key = numeric >= i - 0.15
      ? 'starFull'
      : numeric >= i - 0.7
        ? 'starHalf'
        : 'starEmpty';
    html += getIconSvg(key, { size, className: 'star-svg' });
  }
  return html;
}
