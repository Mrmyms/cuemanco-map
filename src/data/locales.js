// Generador de imágenes botánicas vectoriales ligeras en formato SVG Data-URI
export function generateBotanicalHeroSvg(theme, title) {
  const themes = {
    flores: { bg: '#FFF0F7', primary: '#E4007C', secondary: '#FF85C0', icon: '🌸', accent: '#D81B60' },
    interior: { bg: '#ECFDF5', primary: '#059669', secondary: '#34D399', icon: '🌿', accent: '#047857' },
    orquideas: { bg: '#FAF5FF', primary: '#9333EA', secondary: '#C084FC', icon: '🪴', accent: '#7E22CE' },
    suculentas: { bg: '#F0FDF4', primary: '#16A34A', secondary: '#4ADE80', icon: '🌵', accent: '#15803D' },
    macetas: { bg: '#FFFBEB', primary: '#D97706', secondary: '#FBBF24', icon: '🏺', accent: '#B45309' },
    tierra: { bg: '#FEF3C7', primary: '#B45309', secondary: '#D97706', icon: '🌾', accent: '#78350F' },
    arboles: { bg: '#ECFDF5', primary: '#047857', secondary: '#10B981', icon: '🌳', accent: '#064E3B' },
    servicios: { bg: '#F8FAFC', primary: '#047857', secondary: '#10B981', icon: '🩺', accent: '#065F46' }
  };
  const t = themes[theme] || themes.flores;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${t.bg}"/>
        <stop offset="100%" stop-color="${t.secondary}" stop-opacity="0.3"/>
      </linearGradient>
      <pattern id="pat" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="1.5" fill="${t.primary}" fill-opacity="0.15"/>
      </pattern>
    </defs>
    <rect width="600" height="340" fill="url(#g)"/>
    <rect width="600" height="340" fill="url(#pat)"/>
    <circle cx="500" cy="70" r="130" fill="${t.primary}" fill-opacity="0.08"/>
    <circle cx="100" cy="270" r="90" fill="${t.primary}" fill-opacity="0.06"/>
    <g transform="translate(300, 140)">
      <circle cx="0" cy="0" r="58" fill="#ffffff" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.08))"/>
      <circle cx="0" cy="0" r="54" fill="${t.bg}" stroke="${t.primary}" stroke-width="2.5" stroke-dasharray="4 2"/>
      <text x="0" y="9" font-family="'Outfit', sans-serif" font-weight="800" font-size="24" fill="${t.primary}" text-anchor="middle">${(title.substring(0, 2)).toUpperCase()}</text>
    </g>
    <text x="300" y="240" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="700" font-size="20" fill="#1e293b" text-anchor="middle">${title.replace(/&/g, '&amp;')}</text>
    <rect x="200" y="258" width="200" height="26" rx="13" fill="${t.primary}" fill-opacity="0.12"/>
    <text x="300" y="275" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="600" font-size="12" fill="${t.accent}" text-anchor="middle">MERCADO CUEMANCO</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// Catálogo verificado de puntos oficiales en el Mercado de Cuemanco
export const FEATURED_LOCALES = [
  {
    id: 'loc-yura',
    numero: '22-23',
    numeroDisplay: 'Manzana 17 · Local 22 y 23',
    pasillo: 'Manzana 17, Local 22 y 23 · Mercado Cuemanco',
    pasilloNum: 17,
    manzana: '17',
    nombre: 'Plantas y huacales YURA',
    nombreCorto: 'Plantas y huacales YURA',
    categoriaId: 'flores',
    categoriaNombre: 'Plantas de Ornato, Árboles y Macetas',
    categoriasAdicionales: ['macetas', 'tierra', 'arboles'],
    rating: 5.0,
    reviews: 42,
    estado: 'Abierto ahora',
    horario: 'Lunes a Domingo: 8:00 AM - 6:30 PM',
    descripcion: 'Venta de plantas de ornato, árboles, macetas de madera, fibra y piedra, tierra de monte preparada, abonos orgánicos, huacales artesanales y accesorios botánicos.',
    badges: ['Manzana 17', 'Local 22 y 23', 'Plantas de Ornato', 'Huacales Artesanales'],
    servicios: [
      'Venta de Plantas de Ornato',
      'Árboles de Sombra y Frutales',
      'Macetas de Madera y Huacales',
      'Macetas de Fibra y Piedra',
      'Tierra Preparada y Sustratos',
      'Abonos y Fertilizantes'
    ],
    googleMapsUrl: 'https://www.google.com/maps?q=19.298938751220703,-99.09884643554688&z=17&hl=en',
    coordsGps: { lat: 19.298938751220703, lng: -99.09884643554688 },
    svgCoords: [260, 360],
    redes: {
      facebook: 'https://www.facebook.com/search/top?q=plantas%20y%20huacales%20yura',
      facebookName: 'Plantas y huacales YURA',
      instagram: 'https://www.instagram.com/explore/tags/plantasyhuacales/',
      instagramName: 'Plantas y huacales'
    },
    productos: [
      { id: 'yura-p1', nombre: 'Plantas de Ornato de Temporada', precio: 'Precio de productor', tag: 'Ornato', desc: 'Gran variedad de plantas florales, follaje y flores decorativas de jardín.' },
      { id: 'yura-p2', nombre: 'Árboles de Sombra y Frutales', precio: 'Directo vivero', tag: 'Exterior', desc: 'Árboles de sombra, cítricos y frutales listos para trasplante en jardín.' },
      { id: 'yura-p3', nombre: 'Macetas de Madera y Huacales', precio: 'Artesanal', tag: 'Madera', desc: 'Huacales rústicos y maceteros de madera de pino y cedro.' },
      { id: 'yura-p4', nombre: 'Macetas de Fibra de Vidrio', precio: 'Resistente', tag: 'Fibra', desc: 'Macetas ligeras resistentes a sol y agua para interiores y terrazas.' },
      { id: 'yura-p5', nombre: 'Macetas de Piedra y Cantera', precio: 'Calidad superior', tag: 'Piedra', desc: 'Elegancia y máxima durabilidad para exteriores y jardines.' },
      { id: 'yura-p6', nombre: 'Tierra de Hoja y Monte Preparada', precio: 'Por bulto / m³', tag: 'Sustrato', desc: 'Tierra negra enriquecida para nutrición óptima del cepellón.' },
      { id: 'yura-p7', nombre: 'Abonos y Fertilizantes Orgánicos', precio: 'Nutrición natural', tag: 'Abonos', desc: 'Composta y nutrientes para desarrollo radicular y floración.' }
    ]
  },
  {
    id: 'loc-imffss',
    numero: '1',
    numeroDisplay: 'Local 1 · Edificio Central',
    pasillo: 'Local 1, Edificio Central Administrativo · Lateral 12',
    pasilloNum: 1,
    nombre: 'Hospital y Centro de Conservación De Plantas',
    nombreCorto: 'Hospital de Plantas · IMFFSS',
    entidad: 'Instituto Mexicano de Fauna Flora y Sustentabilidad Social A.C.',
    contacto: 'Jorge Pereda Cuemanco',
    categoriaId: 'servicios',
    categoriaNombre: 'Hospital de Plantas, Conservación y Capacitación',
    categoriasAdicionales: ['orquideas', 'suculentas', 'interior', 'tierra'],
    rating: 5.0,
    reviews: 86,
    estado: 'Abierto ahora',
    horario: 'Lunes a Domingo: 8:00 AM - 6:30 PM',
    telefono: '+52 55 6263 2939',
    whatsapp: '525562632939',
    email: 'info@imffss.org',
    website: 'https://www.imffss.org',
    websiteDisplay: 'www.imffss.org',
    direccionCompleta: 'Lateral 12, Coapa, Parque Ecológico de Xochimilco, Xochimilco, 16036 Ciudad de México, CDMX, México',
    googleMapsUrl: 'https://maps.google.com/maps/search/Lateral%2012%2C%20Coapa%2C%20Parque%20Ecol%C3%B3gico%20de%20Xochimilco%2C%20Xochimilco%2C%2016036%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX%2C%20M%C3%A9xico/@19.29922103881836,-99.09764862060547,17z?hl=en',
    coordsGps: { lat: 19.29922103881836, lng: -99.09764862060547 },
    svgCoords: [330, 390],
    descripcion: 'Hospital Botánico y Centro de Conservación de Plantas del Instituto Mexicano de Fauna Flora y Sustentabilidad Social A.C. en el Edificio Central Administrativo de Cuemanco. Diagnóstico fitosanitario, talleres de capacitación práctica y venta especializada de especies botánicas.',
    badges: ['Hospital de Plantas', 'IMFFSS A.C.', 'Edificio Central', 'Capacitación Oficial'],
    redes: {
      facebook: 'https://www.facebook.com/search/top?q=Instituto%20Mexicano%20de%20Fauna%20Flora%20y%20Sustentabilidad%20Social%20A.C.',
      facebookName: 'Instituto Mexicano de Fauna Flora y Sustentabilidad Social A.C.',
      instagram: 'https://www.instagram.com/imffss_oficial',
      instagramName: 'imffss_oficial',
      tiktok: 'https://www.tiktok.com/@imffss_oficial',
      tiktokName: 'imffss_oficial',
      x: 'https://twitter.com/imffss_oficial',
      xName: 'imffss_oficial'
    },
    talleres: [
      { id: 't-1', nombre: 'Taller de Orquídeas', icon: '🪴', desc: 'Cultivo, control de humedad, sustratos y floración de orquídeas.' },
      { id: 't-2', nombre: 'Taller de Suculentas', icon: '🌵', desc: 'Manejo, propagación por esquejes, sustratos minerales y prevención de pudrición.' },
      { id: 't-3', nombre: 'Taller de Plantas Carnívoras', icon: '🪤', desc: 'Cuidados de dionaeas, sarracenias, nepenthes y trampas activas.' },
      { id: 't-4', nombre: 'Taller de Cuadros Vivos', icon: '🖼️', desc: 'Diseño y montaje artesanal de jardines verticales decorativos.' },
      { id: 't-5', nombre: 'Taller de Kokedamas', icon: '🎋', desc: 'Técnica tradicional japonesa de cultivo en bola de musgo natural.' },
      { id: 't-6', nombre: 'Taller de Marimos', icon: '🟢', desc: 'Mantenimiento de algas esféricas de agua dulce y biótopos acuáticos.' },
      { id: 't-7', nombre: 'Taller de Biofertilizantes', icon: '🧪', desc: 'Elaboración de abonos agroecológicos y microorganismos benéficos.' },
      { id: 't-8', nombre: 'Hospital de Plantas', icon: '🩺', desc: 'Diagnóstico botánico especializado, control de plagas y rescate de ejemplares.' }
    ],
    productos: [
      { id: 'im-p1', nombre: 'Plantas Carnívoras', tag: 'Exótica', desc: 'Dionaea muscipula, nepenthes y sarracenias aclimatadas.' },
      { id: 'im-p2', nombre: 'Plantas in vitro', tag: 'Biotecnología', desc: 'Plántulas reproducidas con micropropagación en laboratorio.' },
      { id: 'im-p3', nombre: 'Plantas Suculentas de Colección', tag: 'Suculentas', desc: 'Especies seleccionadas y de bajo requerimiento hídrico.' },
      { id: 'im-p4', nombre: 'Orquídeas', tag: 'Conservación', desc: 'Variedades selectas con trazabilidad y asesoría técnica.' },
      { id: 'im-p5', nombre: 'Cactus de Colección', tag: 'Cactáceas', desc: 'Especies cultivadas y protegidas de vivero.' },
      { id: 'im-p6', nombre: 'Marimos', tag: 'Acuático', desc: 'Algas vivas ornamentales esféricas de agua dulce.' },
      { id: 'im-p7', nombre: 'Monsteras', tag: 'Follaje', desc: 'Monstera deliciosa sana y frondosa.' },
      { id: 'im-p8', nombre: 'Monsteras Variegadas', tag: 'Colección Especial', desc: 'Ejemplares exclusivos con variegación crema y blanca.' },
      { id: 'im-p9', nombre: 'Biofertilizantes Orgánicos', tag: 'Agroecológico', desc: 'Fórmulas agroecológicas elaboradas por el Instituto.' },
      { id: 'im-p10', nombre: 'Fertilizantes y Nutrientes', tag: 'Nutrición', desc: 'Nutrición balanceada para floración y enraizamiento sano.' }
    ],
    servicios: [
      'Hospital de Plantas',
      'Talleres de Capacitación',
      'Diagnóstico Fitosanitario',
      'Venta de Especies de Conservación',
      'Biofertilizantes Orgánicos',
      'Contacto directo con Jorge Pereda Cuemanco'
    ]
  }
];

// Puntos de infraestructura oficial en el Mercado de Cuemanco
export const POINTS_OF_INTEREST = [
  {
    id: 'poi-edificio-central',
    numeroDisplay: 'Edificio Central',
    pasillo: 'Lateral 12, Coapa · Parque Ecológico de Xochimilco',
    nombre: 'Edificio Central Administrativo',
    categoriaId: 'servicios',
    categoriaNombre: 'Servicios',
    icon: '🏛️',
    descripcion: 'Edificio Administrativo del Mercado de Cuemanco, sede del Hospital y Centro de Conservación de Plantas (IMFFSS A.C.).',
    horario: 'Lunes a Domingo: 8:00 AM - 6:30 PM',
    svgCoords: [330, 390],
    servicios: ['Oficinas del Mercado', 'Hospital de Plantas IMFFSS', 'Capacitación y Talleres']
  },
  {
    id: 'poi-manzana17',
    numeroDisplay: 'Manzana 17',
    pasillo: 'Pasillo Central / Manzana 17',
    nombre: 'Manzana 17 (Plantas y huacales YURA)',
    categoriaId: 'flores',
    categoriaNombre: 'Flores y Ornato',
    icon: '🪴',
    descripcion: 'Ubicación de Plantas y huacales YURA (Locales 22 y 23). Venta de plantas de ornato, árboles, huacales y macetas.',
    horario: '8:00 AM - 6:30 PM',
    svgCoords: [260, 360],
    servicios: ['Locales 22 y 23', 'Plantas de Ornato', 'Huacales Artesanales', 'Macetas de Fibra y Piedra']
  },
  {
    id: 'poi-lateral12',
    numeroDisplay: 'Acceso Lateral 12',
    pasillo: 'Lateral 12, Coapa',
    nombre: 'Acceso Vehicular Lateral 12 y Estacionamiento',
    categoriaId: 'servicios',
    categoriaNombre: 'Servicios',
    icon: '🚗',
    descripcion: 'Acceso vehicular sobre Lateral 12 hacia Parque Ecológico de Xochimilco y Edificio Central Administrativo.',
    horario: '7:00 AM - 7:00 PM',
    svgCoords: [390, 450],
    servicios: ['Acceso Vehicular', 'Bahía de Carga', 'Parque Ecológico']
  }
];

// Generador de locales: Devuelve exclusivamente los puntos verificados provistos
export function generateAllMarketLocales() {
  return [...FEATURED_LOCALES];
}
