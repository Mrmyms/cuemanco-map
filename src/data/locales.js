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
    servicios: { bg: '#F8FAFC', primary: '#475569', secondary: '#94A3B8', icon: '☕', accent: '#334155' }
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
    <text x="300" y="240" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="700" font-size="22" fill="#1e293b" text-anchor="middle">${title.replace(/&/g, '&amp;')}</text>
    <rect x="220" y="258" width="160" height="26" rx="13" fill="${t.primary}" fill-opacity="0.12"/>
    <text x="300" y="275" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="600" font-size="12" fill="${t.accent}" text-anchor="middle">MERCADO CUEMANCO</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// Locales destacados con catálogo completo de productos
export const FEATURED_LOCALES = [
  {
    id: 'loc-104',
    numero: '104',
    numeroDisplay: 'Local 104',
    pasillo: 'Pasillo 1 - Rosas y Flores',
    pasilloNum: 1,
    nombre: 'Vivero La Bugambilia Rosa',
    categoriaId: 'flores',
    categoriaNombre: 'Flores y Ornato',
    rating: 4.9,
    reviews: 142,
    estado: 'Abierto ahora',
    horario: 'Lunes a Domingo: 8:00 AM - 6:30 PM',
    telefono: '+52 55 5678 1204',
    whatsapp: '525556781204',
    descripcion: 'Especialistas en bugambilias injertadas de hasta 5 colores, rosales miniatura, hortensias de Xochimilco y flores aromáticas para jardín y balcón.',
    badges: ['Reina del Mercado', 'Rosa Mexicano Oficial'],
    servicios: ['Pago con Tarjeta', 'Acepta Transferencia', 'Entrega a Carro', 'Asesoría Gratis'],
    svgCoords: [135, 230],
    productos: [
      { id: 'p-1', nombre: 'Bugambilia Rosa Mexicano Copa 1.5m', precio: '$350 MXN', tag: 'Más Vendida', desc: 'Arbolito de floración permanente y resistente a sol pleno.' },
      { id: 'p-2', nombre: 'Rosal Inglés Trepador Aromático', precio: '$180 MXN', tag: 'Recomendado', desc: 'Rosas grandes en tono fucsia y durazno.' },
      { id: 'p-3', nombre: 'Hortensia Azul Xochimilco en Maceta', precio: '$220 MXN', tag: 'Temporada', desc: 'Floración densa, ideal para sombra parcial o pasillos.' },
      { id: 'p-4', nombre: 'Gardenia Blanca Fragante de Mata', precio: '$160 MXN', tag: 'Aromática', desc: 'Aroma dulce inconfundible con follaje verde brillante.' },
      { id: 'p-5', nombre: 'Lavanda Francesa Flor Morada', precio: '$90 MXN', tag: 'Polinizador', desc: 'Atrae colibríes y mariposas; ahuyenta plagas.' }
    ]
  },
  {
    id: 'loc-215',
    numero: '215',
    numeroDisplay: 'Local 215',
    pasillo: 'Pasillo 2 - Plantas de Sombra',
    pasilloNum: 2,
    nombre: 'Selva & Sombra Deliciosa',
    categoriaId: 'interior',
    categoriaNombre: 'Plantas de Interior',
    rating: 5.0,
    reviews: 218,
    estado: 'Abierto ahora',
    horario: 'Lunes a Domingo: 8:30 AM - 6:00 PM',
    telefono: '+52 55 5678 1215',
    whatsapp: '525556781215',
    descripcion: 'La colección más frondosa de Monsteras Deliciosas gigantes, Ficus Lyrata para sala, Calatheas exóticas y Cunas de Moisés gigantes.',
    badges: ['Top Interiorismo', 'Purificadoras de Aire'],
    servicios: ['Asesoría de Riego', 'Trasplante al Momento', 'Pago con Terminal'],
    svgCoords: [175, 280],
    productos: [
      { id: 'p-6', nombre: 'Monstera Deliciosa Hoja Fenestrada 1.2m', precio: '$480 MXN', tag: 'Favorito', desc: 'Especie madura con hojas abiertas listas para sala o recámara.' },
      { id: 'p-7', nombre: 'Ficus Lyrata (Higuera Hoja de Violín)', precio: '$650 MXN', tag: 'Elegante', desc: 'Tronco único recto, altura 1.40m, follaje lustroso.' },
      { id: 'p-8', nombre: 'Cuna de Moisés Gigante con Flor Blanca', precio: '$280 MXN', tag: 'Fácil Cuidado', desc: 'Purificadora de aire según la NASA, flor de larga duración.' },
      { id: 'p-9', nombre: 'Helecho Boston Colgante Frondoso', precio: '$190 MXN', tag: 'Colgante', desc: 'Caída de más de 80cm de hojas verdes vibrantes.' },
      { id: 'p-10', nombre: 'Calathea Orbifolia Hojas Rayadas', precio: '$320 MXN', tag: 'Colección', desc: 'Diseño geométrico natural en hojas de textura sedosa.' }
    ]
  },
  {
    id: 'loc-340',
    numero: '340',
    numeroDisplay: 'Local 340',
    pasillo: 'Pasillo 3 - Orquídeas & Bonsáis',
    pasilloNum: 3,
    nombre: 'Orquídeas El Ajolote Mágico',
    categoriaId: 'orquideas',
    categoriaNombre: 'Orquídeas y Exóticas',
    rating: 4.9,
    reviews: 189,
    estado: 'Abierto ahora',
    horario: 'Lunes a Domingo: 8:00 AM - 7:00 PM',
    telefono: '+52 55 5678 1340',
    whatsapp: '525556781340',
    descripcion: 'Cultivadores directos de orquídeas en invernadero de Xochimilco. Phalaenopsis de doble y triple vara, Cymbidiums, Vanda colgante y bonsáis de 15 años.',
    badges: ['Floración Garantizada', 'Cultivo Local'],
    servicios: ['Sustrato Especializado Gratis', 'Garantía 30 Días', 'Tarjeta y Efectivo'],
    svgCoords: [215, 330],
    productos: [
      { id: 'p-11', nombre: 'Orquídea Phalaenopsis Rosa Mexicano 2 Varas', precio: '$390 MXN', tag: 'Estrella', desc: 'Floración fucsia intenso de más de 16 botones abiertos.' },
      { id: 'p-12', nombre: 'Orquídea Blanca Clásica Ojo Púrpura', precio: '$360 MXN', tag: 'Elegante', desc: 'Ideal para centros de mesa y regalos memorables.' },
      { id: 'p-13', nombre: 'Bonsái Ficus Retusa 12 Años con Bandeja', precio: '$1,200 MXN', tag: 'Obra de Arte', desc: 'Tronco grueso con raíces aéreas en maceta de cerámica japonesa.' },
      { id: 'p-14', nombre: 'Planta Carnívora Venus Atrapamoscas (Dionaea)', precio: '$180 MXN', tag: 'Exótica', desc: 'Trampas activas listas con musgo sphagnum importado.' },
      { id: 'p-15', nombre: 'Orquídea Vanda Colgante Raíz Expuesta', precio: '$850 MXN', tag: 'Exclusiva', desc: 'Sin maceta, flor azul violácea que cuelga en el aire.' }
    ]
  },
  {
    id: 'loc-412',
    numero: '412',
    numeroDisplay: 'Local 412',
    pasillo: 'Pasillo 4 - Cactario Cuemanco',
    pasilloNum: 4,
    nombre: 'Cactus & Suculentas Don Chente',
    categoriaId: 'suculentas',
    categoriaNombre: 'Cactus y Suculentas',
    rating: 4.8,
    reviews: 95,
    estado: 'Abierto ahora',
    horario: 'Lunes a Domingo: 8:00 AM - 6:00 PM',
    telefono: '+52 55 5678 1412',
    whatsapp: '525556781412',
    descripcion: 'Más de 300 variedades de suculentas miniatura, rosetas Echeveria, biznagas de colección y plantas desérticas de bajo mantenimiento.',
    badges: ['Mínimo Riego', 'Ideal Escritorio'],
    servicios: ['Combos de 5x$100', 'Tepojal y Tezontle incluido', 'Asesoría Sol/Sombra'],
    svgCoords: [260, 260],
    productos: [
      { id: 'p-16', nombre: 'Paquete Colección 6 Echeverias Raras', precio: '$150 MXN', tag: 'Super Oferta', desc: 'Diferentes tonos pastel (rosa, morado, azulado y verde menta).' },
      { id: 'p-17', nombre: 'Cactus Asiento de Suegra (Biznaga Dorada)', precio: '$220 MXN', tag: 'Clásico', desc: 'Espinación dorada perfecta en maceta de 8 pulgadas.' },
      { id: 'p-18', nombre: 'Lengua de Suegra Sansevieria Trifasciata', precio: '$180 MXN', tag: 'Indestructible', desc: 'Soporta poca luz y riegos esporádicos; diseño vertical.' },
      { id: 'p-19', nombre: 'Árbol de Jade Gigante (Crassula Ovata)', precio: '$320 MXN', tag: 'Abundancia', desc: 'Símbolo de buena fortuna con tronco leñoso.' },
      { id: 'p-20', nombre: 'Cactus Espiralis Cereus Forbessii', precio: '$550 MXN', tag: 'Rarísimo', desc: 'Crecimiento helicoidal único para coleccionistas exigentes.' }
    ]
  },
  {
    id: 'loc-520',
    numero: '520',
    numeroDisplay: 'Local 520',
    pasillo: 'Pasillo Central - Glorieta Kiosco',
    pasilloNum: 5,
    nombre: 'Talavera & Macetas San Pedro',
    categoriaId: 'macetas',
    categoriaNombre: 'Macetas y Talavera',
    rating: 5.0,
    reviews: 310,
    estado: 'Abierto ahora',
    horario: 'Lunes a Domingo: 7:30 AM - 7:00 PM',
    telefono: '+52 55 5678 1520',
    whatsapp: '525556781520',
    descripcion: 'Taller artesanal de macetas de barro cocido natural, talavera poblana certificada, jardineras de fibra de vidrio y platos para drenaje.',
    badges: ['100% Hecho en México', 'Arte en Talavera'],
    servicios: ['Descuento por Mayoreo', 'Empaque para Transporte Seguro', 'Perforación de Macetas'],
    svgCoords: [425, 215],
    productos: [
      { id: 'p-21', nombre: 'Maceta Talavera Azul y Rosa Mexicano 35cm', precio: '$420 MXN', tag: 'Artesanal', desc: 'Esmaltada a mano con flores tradicionales y orificio de drenaje.' },
      { id: 'p-22', nombre: 'Maceta Cilindro Barro Negro Oaxaqueño', precio: '$290 MXN', tag: 'Exclusiva', desc: 'Acabado satinado bruñido a mano, diseño contemporáneo.' },
      { id: 'p-23', nombre: 'Jardinera Rectangular Fibra de Vidrio 80cm', precio: '$680 MXN', tag: 'Ligera y Fuerte', desc: 'Para balcones y terrazas; no se despostilla con el sol.' },
      { id: 'p-24', nombre: 'Juego de 3 Macetas de Barro Natural Terracota', precio: '$160 MXN', tag: 'Básico Esencial', desc: 'Chica, mediana y grande con sus platos esmaltados.' },
      { id: 'p-25', nombre: 'Colgante Macramé de Algodón con Maceta', precio: '$140 MXN', tag: 'Boho Chic', desc: 'Tejido artesanal resistente para colgar en techos y balcones.' }
    ]
  },
  {
    id: 'loc-605',
    numero: '605',
    numeroDisplay: 'Local 605',
    pasillo: 'Pasillo 6 - Nutrición y Tierras',
    pasilloNum: 6,
    nombre: 'Sustratos y Tierras El Pedregal',
    categoriaId: 'tierra',
    categoriaNombre: 'Tierra y Abonos',
    rating: 4.8,
    reviews: 87,
    estado: 'Abierto ahora',
    horario: 'Lunes a Domingo: 8:00 AM - 6:00 PM',
    telefono: '+52 55 5678 1605',
    whatsapp: '525556781605',
    descripcion: 'Costales de tierra negra preparada con abono de borrego desinfectado, humus de lombriz californiana, perlita, tezontle rojo y corteza de pino.',
    badges: ['Nutrición Orgánica', 'Venta por Bulto y Kilo'],
    servicios: ['Carga a Cajuela', 'Asesoría de Mezclas', 'Precios Especiales Viveristas'],
    svgCoords: [470, 310],
    productos: [
      { id: 'p-26', nombre: 'Costal Tierra Negra Preparada 25kg', precio: '$95 MXN', tag: 'Más Vendido', desc: 'Mezcla con tierra de hoja, abono y jal para drenaje óptimo.' },
      { id: 'p-27', nombre: 'Humus de Lombriz Roja Sólido 10kg', precio: '$120 MXN', tag: '100% Orgánico', desc: 'El mejor fertilizante natural; no quema las raíces.' },
      { id: 'p-28', nombre: 'Bolsa Tezontle Rojo Gravilla para Drenaje', precio: '$50 MXN', tag: 'Drenaje', desc: 'Piedra volcánica porosa ideal para fondo de maceta y cactus.' },
      { id: 'p-29', nombre: 'Sustrato Especial para Orquídeas 5L', precio: '$85 MXN', tag: 'Corteza y Carbón', desc: 'Corteza de pino tratada, carbón vegetal y perlita gruesa.' },
      { id: 'p-30', nombre: 'Fertilizante Floración Rosa Mexicano 1L', precio: '$110 MXN', tag: 'Super Floración', desc: 'Fórmula rica en fósforo y potasio para estallido de capullos.' }
    ]
  },
  {
    id: 'loc-730',
    numero: '730',
    numeroDisplay: 'Local 730',
    pasillo: 'Pasillo 7 - Árboles Monumentales',
    pasilloNum: 7,
    nombre: 'Vivero Los Cipreses & Frutales',
    categoriaId: 'arboles',
    categoriaNombre: 'Árboles y Frutales',
    rating: 4.9,
    reviews: 132,
    estado: 'Abierto ahora',
    horario: 'Lunes a Domingo: 8:00 AM - 6:30 PM',
    telefono: '+52 55 5678 1730',
    whatsapp: '525556781730',
    descripcion: 'Árboles frutales injertados listos para dar fruto (limonero con limón, higuera, granado), palmas kentia de 2 metros y jacarandas enanas.',
    badges: ['Fruta Garantizada', 'Árboles para Banqueta'],
    servicios: ['Flete en Camioneta', 'Plantación a Domicilio', 'Poda y Mantenimiento'],
    svgCoords: [520, 270],
    productos: [
      { id: 'p-31', nombre: 'Limonero 4 Estaciones Injertado con Fruto', precio: '$450 MXN', tag: 'Productivo', desc: 'Da limones todo el año, apto para macetón grande o tierra.' },
      { id: 'p-32', nombre: 'Jacaranda Joven Flor Morada 2m', precio: '$380 MXN', tag: 'Icónica CDMX', desc: 'Crece rápido, raíces profundas y floración espectacular en primavera.' },
      { id: 'p-33', nombre: 'Palma Areca Frondosa 1.80m', precio: '$520 MXN', tag: 'Para Alberca/Jardín', desc: 'Múltiples tallos con follaje tropical denso y fresco.' },
      { id: 'p-34', nombre: 'Higuera Dulce Breva en Maceta', precio: '$390 MXN', tag: 'Frutal Dulce', desc: 'Hojas lobuladas hermosas e higos morados muy dulces.' },
      { id: 'p-35', nombre: 'Pata de Elefante (Beaucarnea) Tronco Gordo', precio: '$650 MXN', tag: 'Escultórica', desc: 'Base ancha bulbosa que almacena agua; no requiere cuidados.' }
    ]
  },
  {
    id: 'loc-850',
    numero: '850',
    numeroDisplay: 'Local 850',
    pasillo: 'Pasillo 8 - Flores Exóticas',
    pasilloNum: 8,
    nombre: 'Flores Xochiquetzal',
    categoriaId: 'flores',
    categoriaNombre: 'Flores y Ornato',
    rating: 4.9,
    reviews: 164,
    estado: 'Abierto ahora',
    horario: 'Lunes a Domingo: 8:00 AM - 6:30 PM',
    telefono: '+52 55 5678 1850',
    whatsapp: '525556781850',
    descripcion: 'Plantas con flor de colores vivos: geranios colgantes, malvones gigantes, dalia silvestre (flor nacional de México) y nochebuenas en temporada.',
    badges: ['Flor Nacional', 'Colores Vibrantes'],
    servicios: ['Venta por Docena', 'Asesoría de Abono', 'Apartado de Lotes'],
    svgCoords: [570, 320],
    productos: [
      { id: 'p-36', nombre: 'Dalia Mexicana en Flor Fucsia / Rosa', precio: '$140 MXN', tag: 'Flor Nacional', desc: 'Pétalos aterciopelados de gran tamaño; flor sagrada azteca.' },
      { id: 'p-37', nombre: 'Geranio Hiedra Colgante Flor Roja/Rosa', precio: '$95 MXN', tag: 'Para Balcón', desc: 'Cascadas de flores para colgar en barandales y muros.' },
      { id: 'p-38', nombre: 'Tulipán Holandés Clásico Maceta 4 Bulbos', precio: '$180 MXN', tag: 'Temporada', desc: 'Colores surtidos: amarillo sol, fucsia y naranja fuego.' }
    ]
  },
  {
    id: 'loc-920',
    numero: '920',
    numeroDisplay: 'Local 920',
    pasillo: 'Pasillo 9 - Suculentas Raras',
    pasilloNum: 9,
    nombre: 'El Rincón de las Suculentas',
    categoriaId: 'suculentas',
    categoriaNombre: 'Cactus y Suculentas',
    rating: 5.0,
    reviews: 110,
    estado: 'Abierto ahora',
    horario: 'Lunes a Domingo: 9:00 AM - 6:00 PM',
    telefono: '+52 55 5678 1920',
    whatsapp: '525556781920',
    descripcion: 'Especialidad en suculentas colgantes (cola de borrego, rosario verde, collar de corazones) y echeverias carunculadas de exposición.',
    badges: ['Suculentas Colgantes', 'Rarezas'],
    servicios: ['Muestrario de Semillas', 'Macetas Mini de Barro', 'Envíos'],
    svgCoords: [620, 280],
    productos: [
      { id: 'p-39', nombre: 'Suculenta Cola de Borrego Colgante 50cm', precio: '$240 MXN', tag: 'Espectacular', desc: 'Tallos repletos de hojas carnosas color verde glauco.' },
      { id: 'p-40', nombre: 'Cadena de Corazones (Ceropegia Woodii)', precio: '$290 MXN', tag: 'Romántica', desc: 'Hojas en forma de corazón jaspeadas con envés púrpura.' },
      { id: 'p-41', nombre: 'Planta Rosario (Senecio Rowleyanus)', precio: '$160 MXN', tag: 'Muy Buscada', desc: 'Cuentas esféricas verdes que caen como collar de perlas.' }
    ]
  },
  {
    id: 'loc-1050',
    numero: '1050',
    numeroDisplay: 'Local 1050',
    pasillo: 'Pasillo 10 - Cerámica y Jardín',
    pasilloNum: 10,
    nombre: 'Macetas Artesanales Xochimilco',
    categoriaId: 'macetas',
    categoriaNombre: 'Macetas y Talavera',
    rating: 4.7,
    reviews: 74,
    estado: 'Abierto ahora',
    horario: 'Lunes a Domingo: 8:00 AM - 6:30 PM',
    telefono: '+52 55 5678 2050',
    whatsapp: '525556782050',
    descripcion: 'Piedra de cantera tallada para fuentes, figuras de animales de jardín, maceteros de madera tratada y macetas esmaltadas al horno.',
    badges: ['Decoración Exterior', 'Resistente a Lluvia'],
    servicios: ['Fabricación a Medida', 'Empaque Seguro', 'Mayoreo'],
    svgCoords: [665, 340],
    productos: [
      { id: 'p-42', nombre: 'Fuente de Cantera Rosa con Bomba de Agua', precio: '$1,850 MXN', tag: 'Decoración', desc: 'Sonido relajante de agua para jardín o patio interior.' },
      { id: 'p-43', nombre: 'Maceta Esmaltada Turquesa / Rosa Mexicano 40cm', precio: '$360 MXN', tag: 'Brillo Duradero', desc: 'Cerámica horneada a alta temperatura no pierde color.' }
    ]
  },
  {
    id: 'loc-1140',
    numero: '1140',
    numeroDisplay: 'Local 1140',
    pasillo: 'Pasillo 11 - Viveros de Exterior',
    pasilloNum: 11,
    nombre: 'Vivero El Huerto Casero',
    categoriaId: 'interior',
    categoriaNombre: 'Plantas de Interior',
    rating: 4.8,
    reviews: 103,
    estado: 'Abierto ahora',
    horario: 'Lunes a Domingo: 8:30 AM - 6:00 PM',
    telefono: '+52 55 5678 2140',
    whatsapp: '525556782140',
    descripcion: 'Plántulas de hortalizas para huerto urbano (jitomate, chile manzano, epazote, menta, hierbabuena, romero gigante) y macetohuertos listos.',
    badges: ['Huerto Orgánico', 'Aromáticas de Cocina'],
    servicios: ['Guía de Siembra Incluida', 'Semillas Criollas', 'Fertilizante de Fruto'],
    svgCoords: [710, 290],
    productos: [
      { id: 'p-44', nombre: 'Kit 4 Hierbas de Olor (Romero, Menta, Albahaca, Tomillo)', precio: '$160 MXN', tag: 'Combo Cocina', desc: 'Frescas y listas para cortar y condimentar platillos.' },
      { id: 'p-45', nombre: 'Planta de Chile Manzano con Fruto', precio: '$120 MXN', tag: 'Picante Sabroso', desc: 'Chiles amarillos carnosos muy picantes de clima templado.' },
      { id: 'p-46', nombre: 'Mata de Epazote Morado Tradicional', precio: '$45 MXN', tag: 'Esencial Mexicano', desc: 'Para frijoles de la olla y quesadillas; crece rapidísimo.' }
    ]
  },
  {
    id: 'loc-cafeteria',
    numero: 'C-01',
    numeroDisplay: 'Cafetería Central',
    pasillo: 'Plaza Cívica Central',
    pasilloNum: 5,
    nombre: 'Café & Nieves de Xochimilco Las Rosas',
    categoriaId: 'servicios',
    categoriaNombre: 'Café y Servicios',
    rating: 4.9,
    reviews: 280,
    estado: 'Abierto ahora',
    horario: 'Lunes a Domingo: 7:30 AM - 7:00 PM',
    telefono: '+52 55 5678 9901',
    whatsapp: '525556789901',
    descripcion: 'El descanso favorito de los visitantes: Café de olla con piloncillo y canela, nieves artesanales de Xochimilco (pétalos de rosa, zapote, mamey), aguas frescas y antojitos.',
    badges: ['Café de Olla Tradicional', 'Nieve de Pétalos de Rosa'],
    servicios: ['Mesas al Aire Libre', 'Wi-Fi Gratis', 'Terminal Bancaria'],
    svgCoords: [415, 235],
    productos: [
      { id: 'p-47', nombre: 'Nieve Artesanal de Pétalos de Rosa', precio: '$45 MXN', tag: 'Icónica Cuemanco', desc: 'Sabor delicado con pétalos orgánicos de rosas mexicanas.' },
      { id: 'p-48', nombre: 'Café de Olla Veracruzano en Jarro de Barro', precio: '$40 MXN', tag: 'Calientito', desc: 'Con piloncillo y canela en raja servido en jarrito artesanal.' },
      { id: 'p-49', nombre: 'Agua Fresca de Horchata con Fresa 1L', precio: '$55 MXN', tag: 'Refrescante', desc: 'Receta tradicional con canela y fresa fresca machacada.' },
      { id: 'p-50', nombre: 'Tlacoyos de Frijol y Haba con Nopales (Orden de 2)', precio: '$60 MXN', tag: 'Antojito Típico', desc: 'Masa de maíz azul recién hechos al comal con queso fresco.' }
    ]
  }
];

// Puntos de interés del mercado (Servicios, Baños, Entradas, Estacionamiento)
export const POINTS_OF_INTEREST = [
  {
    id: 'poi-estac-norte',
    numeroDisplay: 'Estacionamiento Norte',
    pasillo: 'Acceso Norte',
    nombre: 'Estacionamiento Norte (P1)',
    categoriaId: 'servicios',
    categoriaNombre: 'Servicios',
    icon: '🅿️',
    descripcion: 'Amplia zona de estacionamiento pavimentada con vigilancia y acceso directo a los Pasillos 1 al 6.',
    horario: '7:00 AM - 7:00 PM',
    svgCoords: [400, 75],
    servicios: ['Capacidad 400 autos', 'Cuota de recuperación $30', 'Seguridad privada', 'Carretilleros disponibles']
  },
  {
    id: 'poi-estac-sur',
    numeroDisplay: 'Estacionamiento Sur',
    pasillo: 'Blvd. Adolfo Ruiz Cortines / Periférico',
    nombre: 'Estacionamiento Sur y Bahía de Carga (P2)',
    categoriaId: 'servicios',
    categoriaNombre: 'Servicios',
    icon: '🅿️',
    descripcion: 'Estacionamiento principal sobre Anillo Periférico Sur con acceso directo a la bahía de carga de camionetas y viveros exteriores.',
    horario: '7:00 AM - 7:00 PM',
    svgCoords: [390, 450],
    servicios: ['Capacidad 600 autos', 'Bahía de carga pesada', 'Fácil acceso desde Periférico']
  },
  {
    id: 'poi-wc-central',
    numeroDisplay: 'Sanitarios Centrales',
    pasillo: 'Glorieta Central',
    nombre: 'Módulo de Sanitarios Central (Kiosco)',
    categoriaId: 'servicios',
    categoriaNombre: 'Servicios',
    icon: '🚻',
    descripcion: 'Sanitarios limpios y desinfectados para hombres, mujeres y personas con movilidad reducida.',
    horario: '7:30 AM - 7:00 PM',
    svgCoords: [310, 320],
    servicios: ['Papel higiénico y jabón', 'Cambiador de bebés', 'Cuota $7 MXN']
  },
  {
    id: 'poi-wc-norte',
    numeroDisplay: 'Sanitarios Norte',
    pasillo: 'Pasillo 2 Norte',
    nombre: 'Sanitarios Norte',
    categoriaId: 'servicios',
    categoriaNombre: 'Servicios',
    icon: '🚻',
    descripcion: 'Sanitarios junto a la entrada norte y zona de tierra.',
    horario: '8:00 AM - 6:30 PM',
    svgCoords: [205, 200],
    servicios: ['Lavamanos limpios', 'Cuota $7 MXN']
  },
  {
    id: 'poi-wc-este',
    numeroDisplay: 'Sanitarios Este',
    pasillo: 'Pasillo 8',
    nombre: 'Sanitarios Este',
    categoriaId: 'servicios',
    categoriaNombre: 'Servicios',
    icon: '🚻',
    descripcion: 'Sanitarios en el corredor este cercano al parque ecológico.',
    horario: '8:00 AM - 6:30 PM',
    svgCoords: [490, 240],
    servicios: ['Lavamanos limpios', 'Cuota $7 MXN']
  },
  {
    id: 'poi-info',
    numeroDisplay: 'Módulo de Informes',
    pasillo: 'Acceso Principal Sur',
    nombre: 'Módulo de Información Turística y Quejas',
    categoriaId: 'servicios',
    categoriaNombre: 'Servicios',
    icon: 'ℹ️',
    descripcion: 'Atención a visitantes, directorio impreso de locales, primeros auxilios y servicio de voceo en el mercado.',
    horario: '8:00 AM - 6:00 PM',
    svgCoords: [320, 440],
    servicios: ['Directorio del Mercado', 'Botiquín Primeros Auxilios', 'Voceo de Extraviados']
  }
];

// Generador procedural de los 1,800 locales del Mercado de Cuemanco
// para que el usuario pueda buscar CUALQUIER número de local (ej. Local 842, Local 1500)
// y ubicarlo con total precisión sobre la cuadrícula arquitectónica del croquis.
export function generateAllMarketLocales() {
  const result = [...FEATURED_LOCALES];
  const featuredIds = new Set(FEATURED_LOCALES.map(l => l.id));
  const featuredNumbers = new Set(FEATURED_LOCALES.map(l => l.numero));

  // Configuración de los 12 pasillos radiales y áreas del mercado
  const pasillos = [
    { num: 1, name: 'Pasillo 1 (Oeste - Canal Nacional)', xBase: 130, yStart: 180, yEnd: 550, cat: 'flores' },
    { num: 2, name: 'Pasillo 2 (Plantas de Sombra)', xBase: 175, yStart: 175, yEnd: 560, cat: 'interior' },
    { num: 3, name: 'Pasillo 3 (Orquídeas y Exóticas)', xBase: 220, yStart: 170, yEnd: 570, cat: 'orquideas' },
    { num: 4, name: 'Pasillo 4 (Cactáceas y Crasas)', xBase: 265, yStart: 165, yEnd: 575, cat: 'suculentas' },
    { num: 5, name: 'Pasillo 5 (Plaza Central y Talavera)', xBase: 310, yStart: 160, yEnd: 580, cat: 'macetas' },
    { num: 6, name: 'Pasillo 6 (Sustratos y Abonos)', xBase: 460, yStart: 160, yEnd: 580, cat: 'tierra' },
    { num: 7, name: 'Pasillo 7 (Árboles y Palmeras)', xBase: 510, yStart: 165, yEnd: 575, cat: 'arboles' },
    { num: 8, name: 'Pasillo 8 (Rosales y Bugambilias)', xBase: 560, yStart: 170, yEnd: 560, cat: 'flores' },
    { num: 9, name: 'Pasillo 9 (Suculentas de Colección)', xBase: 610, yStart: 180, yEnd: 550, cat: 'suculentas' },
    { num: 10, name: 'Pasillo 10 (Cerámica y Jardineras)', xBase: 660, yStart: 190, yEnd: 530, cat: 'macetas' },
    { num: 11, name: 'Pasillo 11 (Viveristas de Xochimilco)', xBase: 710, yStart: 200, yEnd: 510, cat: 'interior' },
    { num: 12, name: 'Pasillo 12 (Este - Arbustos y Pasto)', xBase: 760, yStart: 215, yEnd: 480, cat: 'arboles' }
  ];

  const catNames = {
    flores: 'Flores y Ornato',
    interior: 'Plantas de Interior',
    orquideas: 'Orquídeas y Exóticas',
    suculentas: 'Cactus y Suculentas',
    macetas: 'Macetas y Talavera',
    tierra: 'Tierra y Abonos',
    arboles: 'Árboles y Frutales',
    servicios: 'Servicios'
  };

  const sampleTitles = {
    flores: ['Vivero Las Camelias', 'El Jardín de las Rosas', 'Flores María Luisa', 'Bugambilias Don Pedro', 'Vivero Bella Flor', 'Ornato Xochimilco'],
    interior: ['Vivero Selva Negra', 'El Rincón Verde', 'Plantas del Bosque', 'Vivero Hoja Verde', 'Sombra & Follaje', 'Ficus & Monsteras'],
    orquideas: ['El Nido de las Orquídeas', 'Orquideario Cuemanco', 'Bonsáis & Flores El Kiosco', 'Vivero La Orquídea Azul', 'Bromelias del Ajolote'],
    suculentas: ['Suculentas México', 'Cactus del Valle', 'Espinas & Rosetas', 'Cactario El Saguaro', 'Vivero La Biznaga', 'Rinconcito Desértico'],
    macetas: ['Artesanías El Alfarero', 'Macetas Poblanas', 'Talavera El Portal', 'Barro Tradicional', 'Macetones Cuemanco', 'Alfarería Los Hermanos'],
    tierra: ['Abonos Orgánicos La Chinampa', 'Tierras de Monte Don Lupe', 'Sustratos Xochimilco', 'El Semillero Cuemanco', 'Nutrición Botánica'],
    arboles: ['Vivero El Cedro', 'Frutales de Michoacán', 'Palmas de Morelos', 'Árboles El Encinar', 'Vivero Los Pinos', 'Frutales Don José']
  };

  let currentId = 1;
  const totalTarget = 1800;
  const perAisle = Math.floor(totalTarget / pasillos.length);

  for (const p of pasillos) {
    const countInThisAisle = perAisle;
    const yStep = (p.yEnd - p.yStart) / (countInThisAisle / 2);

    for (let i = 0; i < countInThisAisle; i++) {
      const numStr = String(currentId);
      currentId++;

      if (featuredNumbers.has(numStr)) {
        continue;
      }

      // Distribución a ambos lados del pasillo (lado izquierdo y derecho del corredor)
      const side = (i % 2 === 0) ? -1 : 1;
      const indexInColumn = Math.floor(i / 2);
      const x = p.xBase + (side * 14) + ((Math.sin(indexInColumn * 0.3)) * 2);
      const y = p.yStart + (indexInColumn * yStep);

      const titleList = sampleTitles[p.cat] || sampleTitles.flores;
      const baseTitle = titleList[i % titleList.length];
      const localName = `${baseTitle} #${numStr}`;

      result.push({
        id: `loc-${numStr}`,
        numero: numStr,
        numeroDisplay: `Local ${numStr}`,
        pasillo: p.name,
        pasilloNum: p.num,
        nombre: localName,
        categoriaId: p.cat,
        categoriaNombre: catNames[p.cat],
        rating: +(4.5 + (Math.sin(i * 11) * 0.4)).toFixed(1),
        reviews: Math.floor(25 + (Math.abs(Math.sin(i * 7)) * 120)),
        estado: 'Abierto ahora',
        horario: 'Lunes a Domingo: 8:00 AM - 6:00 PM',
        telefono: `+52 55 5678 ${numStr.padStart(4, '0')}`,
        whatsapp: `52555678${numStr.padStart(4, '0')}`,
        descripcion: `Stand especializado en ${catNames[p.cat].toLowerCase()} sobre el ${p.name}. Atención directa de productores de Xochimilco.`,
        badges: [catNames[p.cat]],
        servicios: ['Atención directa', 'Efectivo y Transferencia'],
        svgCoords: [+x.toFixed(1), +y.toFixed(1)],
        productos: [
          { id: `p-${numStr}-1`, nombre: `${catNames[p.cat]} Selección Cuemanco`, precio: `$${80 + (i % 8) * 40} MXN`, tag: 'Disponible', desc: 'Planta sana con cepellón listo para trasplante.' },
          { id: `p-${numStr}-2`, nombre: `Variedad Especial Local ${numStr}`, precio: `$${120 + (i % 5) * 50} MXN`, tag: 'Recomendado', desc: 'Excelente calidad y adaptación al clima de la CDMX.' }
        ]
      });
    }
  }

  return result;
}
