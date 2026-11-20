// Zonas y sectores reales del Mercado de Plantas y Flores de Cuemanco
// Coordenadas calibradas al sistema lógico del plano base (1222 x 815)

export const MARKET_ZONES = [
  {
    id: 'zona-edificio-central',
    nombre: 'Edificio Central Administrativo',
    nombreCorto: 'Edificio Central',
    subtitulo: 'Local 1 · IMFFSS',
    numeroDisplay: 'Edificio Central',
    pasillo: 'Lateral 12 · Zona Norte Central',
    categoriaId: 'servicios',
    categoriaNombre: 'Administración y Hospital de Plantas',
    color: '#0284C7',
    icon: '🏛️',
    polygon: [
      [522, 168],
      [602, 174],
      [596, 250],
      [518, 244]
    ],
    svgCoords: [560, 208],
    horario: 'Lunes a Domingo: 8:00 AM - 6:30 PM',
    descripcion: 'Sede administrativa del Mercado de Cuemanco y ubicación del Hospital y Centro de Conservación de Plantas (IMFFSS A.C.) con talleres y asesoría fitosanitaria.',
    servicios: [
      'Oficinas Administrativas',
      'Hospital de Plantas IMFFSS',
      'Talleres de Capacitación',
      'Información al Visitante'
    ],
    isZone: true
  },
  {
    id: 'zona-ornato',
    nombre: 'Zona Ornato y Viveros',
    nombreCorto: 'Ornato y Viveros',
    subtitulo: 'Manzanas 15–20',
    numeroDisplay: 'Manzanas 15–20',
    pasillo: 'Sector Oeste · Pasillos de Viveros',
    categoriaId: 'flores',
    categoriaNombre: 'Flores, Ornato y Árboles',
    categoriasAdicionales: ['arboles', 'tierra', 'macetas'],
    color: '#10B981',
    icon: '🪴',
    polygon: [
      [154, 122],
      [500, 148],
      [494, 246],
      [344, 246],
      [322, 462],
      [134, 456]
    ],
    svgCoords: [268, 285],
    horario: 'Lunes a Domingo: 8:00 AM - 6:30 PM',
    descripcion: 'Amplio sector poniente con viveros de plantas de ornato, árboles frutales y de sombra, huacales artesanales, tierra preparada y abonos.',
    servicios: [
      'Plantas de Ornato',
      'Árboles y Frutales',
      'Huacales y Macetas de Madera',
      'Tierra de Hoja y Sustratos'
    ],
    isZone: true
  },
  {
    id: 'zona-flores',
    nombre: 'Corredor Central · Flores',
    nombreCorto: 'Corredor Central',
    subtitulo: 'Pasillos Centrales',
    numeroDisplay: 'Corredor Central',
    pasillo: 'Corazón del Mercado Cuemanco',
    categoriaId: 'flores',
    categoriaNombre: 'Flores y Plantas de Temporada',
    categoriasAdicionales: ['interior', 'orquideas', 'suculentas'],
    color: '#E4007C',
    icon: '🌸',
    polygon: [
      [344, 246],
      [662, 250],
      [648, 434],
      [514, 490],
      [322, 462]
    ],
    svgCoords: [495, 365],
    horario: 'Lunes a Domingo: 8:00 AM - 6:30 PM',
    descripcion: 'Pasillos centrales del mercado dedicados a flor de temporada, follaje decorativo, plantas de interior, orquídeas y suculentas.',
    servicios: [
      'Flores de Temporada',
      'Plantas de Interior',
      'Orquídeas y Suculentas',
      'Pasillos Peatonales'
    ],
    isZone: true
  },
  {
    id: 'zona-macetas',
    nombre: 'Zona Macetas y Diseño',
    nombreCorto: 'Macetas y Diseño',
    subtitulo: 'Manzanas 1–6',
    numeroDisplay: 'Manzanas 1–6',
    pasillo: 'Sector Noreste · Lateral Norte',
    categoriaId: 'macetas',
    categoriaNombre: 'Macetas, Talavera y Paisajismo',
    categoriasAdicionales: ['interior', 'arboles'],
    color: '#D97706',
    icon: '🏺',
    polygon: [
      [616, 158],
      [978, 190],
      [1006, 252],
      [972, 322],
      [648, 434],
      [662, 250],
      [614, 246]
    ],
    svgCoords: [815, 275],
    horario: 'Lunes a Domingo: 8:30 AM - 6:00 PM',
    descripcion: 'Sector oriente especializado en macetas de fibra de vidrio, cerámica de alta temperatura, barro tradicional, talavera y proyectos de paisajismo.',
    servicios: [
      'Macetas de Diseño',
      'Fibra de Vidrio y Cerámica',
      'Paisajismo Residencial',
      'Mayoreo y Menudeo'
    ],
    isZone: true
  },
  {
    id: 'zona-corredor-sur',
    nombre: 'Corredor Sur · Jardineras',
    nombreCorto: 'Corredor Sur',
    subtitulo: 'Macetas y Fibra',
    numeroDisplay: 'Corredor Sur',
    pasillo: 'Corredor Sur · Frente a Lateral 12',
    categoriaId: 'macetas',
    categoriaNombre: 'Macetas y Jardineras de Gran Formato',
    color: '#B45309',
    icon: '🏺',
    polygon: [
      [304, 466],
      [514, 490],
      [362, 558],
      [302, 552]
    ],
    svgCoords: [382, 508],
    horario: 'Lunes a Domingo: 8:00 AM - 6:00 PM',
    descripcion: 'Franja sur junto al estacionamiento de Lateral 12 especializada en macetas de gran formato, jardineras y facilidades de carga directa.',
    servicios: [
      'Jardineras Gran Formato',
      'Fibra de Vidrio Uso Rudo',
      'Fácil Acceso de Carga'
    ],
    isZone: true
  },
  {
    id: 'zona-jardin',
    nombre: 'Jardín Botánico Cuemanco',
    nombreCorto: 'Jardín Botánico',
    subtitulo: 'Área Verde',
    numeroDisplay: 'Área Verde',
    pasillo: 'Sector Suroeste · Viveros',
    categoriaId: 'arboles',
    categoriaNombre: 'Área Verde y Exhibición',
    categoriasAdicionales: ['flores'],
    color: '#16A34A',
    icon: '🌳',
    polygon: [
      [226, 466],
      [300, 466],
      [300, 552],
      [226, 552]
    ],
    svgCoords: [263, 509],
    horario: 'Lunes a Domingo: 8:00 AM - 6:00 PM',
    descripcion: 'Espacio ajardinado arbolado y pet-friendly al aire libre, punto de encuentro y descanso entre recorridos por los viveros.',
    servicios: [
      'Área Arbolada',
      'Punto de Encuentro',
      'Pet Friendly',
      'Exhibición Botánica'
    ],
    isZone: true
  },
  {
    id: 'zona-gastronomia',
    nombre: 'Zona Gastronómica',
    nombreCorto: 'Gastronomía',
    subtitulo: 'Antojitos y Tacos',
    numeroDisplay: 'Zona Comida',
    pasillo: 'Corredor Suroeste · Acceso Periférico',
    categoriaId: 'servicios',
    categoriaNombre: 'Comida y Bebidas Tradicionales',
    color: '#EA580C',
    icon: '🌮',
    polygon: [
      [134, 456],
      [224, 464],
      [220, 560],
      [296, 564],
      [250, 622],
      [128, 560]
    ],
    svgCoords: [178, 535],
    horario: 'Viernes a Domingo: 7:00 AM - 4:30 PM',
    descripcion: 'Corredor gastronómico tradicional con tacos de costilla, pollo, cecina, quesadillas y aguas frescas de temporada.',
    servicios: [
      'Tacos y Antojitos',
      'Aguas Frescas',
      'Área de Comensales'
    ],
    isZone: true
  },
  {
    id: 'zona-parking-norte',
    nombre: 'Estacionamiento Norte',
    nombreCorto: 'Estacionamiento Norte',
    subtitulo: 'Acceso Norte',
    numeroDisplay: 'Parking Norte',
    pasillo: 'Franja Norte · Parque Ecológico',
    categoriaId: 'servicios',
    categoriaNombre: 'Estacionamiento y Carga',
    color: '#475569',
    icon: '🅿️',
    polygon: [
      [278, 18],
      [1034, 78],
      [1054, 180],
      [218, 112]
    ],
    svgCoords: [634, 96],
    horario: 'Lunes a Domingo: 7:00 AM - 7:00 PM',
    descripcion: 'Estacionamiento principal de gran capacidad en el costado norte del mercado con acceso directo a la zona de viveros, Edificio Central y Macetas.',
    servicios: [
      'Cajones Amplios',
      'Carretilleros de Carga',
      'Acceso Directo a Manzanas'
    ],
    isZone: true
  },
  {
    id: 'zona-parking-sur',
    nombre: 'Lateral 12 · Estacionamiento Sur',
    nombreCorto: 'Lateral 12 · Sur',
    subtitulo: 'Acceso Periférico',
    numeroDisplay: 'Lateral 12',
    pasillo: 'Lateral 12 · Blvd. Adolfo Ruiz Cortines',
    categoriaId: 'servicios',
    categoriaNombre: 'Acceso Vehicular y Estacionamiento',
    color: '#0F766E',
    icon: '🚗',
    polygon: [
      [258, 624],
      [954, 326],
      [984, 368],
      [292, 658]
    ],
    svgCoords: [618, 494],
    horario: 'Lunes a Domingo: 7:00 AM - 7:00 PM',
    descripcion: 'Corredor vehicular y estacionamiento sur sobre Lateral 12 (Anillo Periférico) con bahía de carga y conexión hacia Parque Ecológico de Xochimilco.',
    servicios: [
      'Acceso Vehicular Periférico',
      'Bahía de Carga',
      'Estacionamiento Sur'
    ],
    isZone: true
  }
];
