// Generador de imágenes botánicas vectoriales premium en formato SVG Data-URI
export function generateBotanicalHeroSvg(theme, title, item = {}) {
  const id = item.id || '';
  const numeroDisplay = item.numeroDisplay || 'Mercado Cuemanco';

  // 1. Plantas y huacales YURA: Follaje tropical, huacal artesanal y ornatos
  if (id === 'loc-yura') {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="800" height="420">
      <defs>
        <linearGradient id="bg-yura" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#064E3B"/>
          <stop offset="50%" stop-color="#0F766E"/>
          <stop offset="100%" stop-color="#E4007C"/>
        </linearGradient>
        <linearGradient id="wood" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#F59E0B"/>
          <stop offset="100%" stop-color="#B45309"/>
        </linearGradient>
      </defs>
      <rect width="800" height="420" fill="url(#bg-yura)"/>
      <circle cx="700" cy="80" r="180" fill="#E4007C" fill-opacity="0.25"/>
      <circle cx="120" cy="350" r="160" fill="#10B981" fill-opacity="0.2"/>

      <!-- Huacal de Madera Rústico -->
      <g transform="translate(480, 210)">
        <rect x="0" y="50" width="260" height="24" rx="4" fill="url(#wood)"/>
        <rect x="0" y="82" width="260" height="24" rx="4" fill="url(#wood)"/>
        <rect x="0" y="114" width="260" height="24" rx="4" fill="url(#wood)"/>
        <rect x="15" y="42" width="22" height="104" rx="3" fill="#78350F"/>
        <rect x="223" y="42" width="22" height="104" rx="3" fill="#78350F"/>
        <path d="M70 50 L85 0 L175 0 L190 50 Z" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="3"/>
      </g>

      <!-- Hojas de Monstera Deliciosa y Flor Rosa Mexicano -->
      <g transform="translate(560, 160)">
        <path d="M0 0 C-40 -80 -120 -100 -160 -40 C-180 -10 -150 50 -100 80 C-40 100 20 80 0 0 Z" fill="#34D399" fill-opacity="0.9"/>
        <path d="M-80 -20 Q-50 -15 -30 -10 M-90 10 Q-60 12 -40 20 M-80 40 Q-50 45 -35 50" stroke="#064E3B" stroke-width="4" stroke-linecap="round"/>
        <circle cx="-30" cy="-60" r="28" fill="#E4007C"/>
        <circle cx="-50" cy="-65" r="20" fill="#FF85C0"/>
        <circle cx="-15" cy="-75" r="22" fill="#FF2D87"/>
        <circle cx="-30" cy="-60" r="8" fill="#FDE047"/>
      </g>

      <rect x="48" y="42" width="210" height="32" rx="16" fill="#FFFFFF" fill-opacity="0.2" stroke="#FFFFFF" stroke-opacity="0.3"/>
      <text x="153" y="63" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="700" font-size="12" fill="#FDF2F8" text-anchor="middle" letter-spacing="1">MANZANA 17 · LOCAL 22-23</text>

      <text x="50" y="145" font-family="'Outfit', sans-serif" font-weight="800" font-size="44" fill="#FFFFFF">Plantas y huacales</text>
      <text x="50" y="215" font-family="'Outfit', sans-serif" font-weight="900" font-size="68" fill="#FDE047">YURA</text>
      <text x="50" y="270" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="600" font-size="16" fill="#A7F3D0">Plantas de Ornato · Árboles Frutales · Macetas de Madera &amp; Fibra</text>

      <rect x="50" y="315" width="280" height="42" rx="21" fill="#E4007C"/>
      <text x="190" y="342" font-family="'Outfit', sans-serif" font-weight="700" font-size="14" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.5">🌸 VIVERO OFICIAL CUEMANCO</text>
    </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  // 2. Hospital y Centro de Conservación De Plantas (IMFFSS A.C.)
  if (id === 'loc-imffss') {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="800" height="420">
      <defs>
        <linearGradient id="bg-imffss" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#064E3B"/>
          <stop offset="45%" stop-color="#047857"/>
          <stop offset="100%" stop-color="#0F766E"/>
        </linearGradient>
      </defs>
      <rect width="800" height="420" fill="url(#bg-imffss)"/>
      <circle cx="680" cy="180" r="190" fill="#10B981" fill-opacity="0.18"/>

      <!-- Matraz de Laboratorio Botánico & Brote de Planta -->
      <g transform="translate(620, 230)">
        <path d="M-20 -100 L20 -100 L20 -50 L75 40 A30 30 0 0 1 50 80 L-50 80 A30 30 0 0 1 -75 40 L-20 -50 Z" fill="#FFFFFF" fill-opacity="0.15" stroke="#A7F3D0" stroke-width="4"/>
        <ellipse cx="0" cy="65" rx="45" ry="12" fill="#10B981" fill-opacity="0.5"/>
        <path d="M-40 45 Q0 35 40 45 L50 80 L-50 80 Z" fill="#10B981" fill-opacity="0.3"/>
        <path d="M0 65 Q-5 -30 20 -120" stroke="#FDE047" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M15 -90 C35 -120 70 -115 65 -90 C60 -70 30 -75 15 -90 Z" fill="#4ADE80"/>
        <path d="M-5 -60 C-35 -85 -65 -75 -55 -55 C-45 -40 -20 -45 -5 -60 Z" fill="#34D399"/>
        <circle cx="65" cy="-90" r="14" fill="#C084FC" fill-opacity="0.9"/>
        <circle cx="75" cy="-85" r="10" fill="#E879F9" fill-opacity="0.9"/>
      </g>

      <!-- Emblema de Cruz de Salud Botánica -->
      <g transform="translate(50, 45)">
        <rect x="0" y="0" width="46" height="46" rx="12" fill="#10B981"/>
        <path d="M23 11 V35 M11 23 H35" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>
        <rect x="56" y="8" width="220" height="30" rx="15" fill="#FFFFFF" fill-opacity="0.18" stroke="#FFFFFF" stroke-opacity="0.3"/>
        <text x="166" y="28" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="700" font-size="12" fill="#E0F2FE" text-anchor="middle" letter-spacing="1">LOCAL 1 · EDIFICIO CENTRAL</text>
      </g>

      <text x="50" y="145" font-family="'Outfit', sans-serif" font-weight="800" font-size="38" fill="#FFFFFF">Hospital y Centro de</text>
      <text x="50" y="195" font-family="'Outfit', sans-serif" font-weight="900" font-size="46" fill="#A7F3D0">Conservación De Plantas</text>

      <text x="50" y="245" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="700" font-size="14" fill="#F1F5F9" letter-spacing="0.5">INSTITUTO MEXICANO DE FAUNA FLORA Y SUSTENTABILIDAD SOCIAL A.C.</text>
      <text x="50" y="275" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="600" font-size="14" fill="#E2E8F0">Talleres de Capacitación · Rescate Fitosanitario · Jorge Pereda Cuemanco</text>

      <rect x="50" y="315" width="290" height="42" rx="21" fill="#047857" stroke="#34D399" stroke-width="2"/>
      <text x="195" y="342" font-family="'Outfit', sans-serif" font-weight="700" font-size="14" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.5">🩺 DIAGNÓSTICO &amp; CAPACITACIÓN</text>
    </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  // 3. D'raiz CDMX: Estudio botánico y macetas de diseño
  if (id === 'loc-draiz') {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="800" height="420">
      <defs>
        <linearGradient id="bg-dr" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1E293B"/>
          <stop offset="60%" stop-color="#334155"/>
          <stop offset="100%" stop-color="#9A3412"/>
        </linearGradient>
        <linearGradient id="pot-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#F59E0B"/>
          <stop offset="100%" stop-color="#D97706"/>
        </linearGradient>
      </defs>
      <rect width="800" height="420" fill="url(#bg-dr)"/>
      <circle cx="650" cy="180" r="170" fill="#F59E0B" fill-opacity="0.12"/>

      <g transform="translate(620, 240)">
        <rect x="-80" y="20" width="90" height="120" rx="6" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="3"/>
        <ellipse cx="60" cy="40" rx="55" ry="18" fill="#FBBF24"/>
        <path d="M5 40 L20 140 L100 140 L115 40 Z" fill="url(#pot-grad)"/>
        <path d="M-35 20 Q-40 -60 10 -120 Q50 -150 70 -190" stroke="#10B981" stroke-width="5" fill="none" stroke-linecap="round"/>
        <ellipse cx="0" cy="-60" rx="35" ry="20" transform="rotate(-30 0 -60)" fill="#34D399"/>
        <ellipse cx="45" cy="-120" rx="40" ry="24" transform="rotate(25 45 -120)" fill="#059669"/>
        <ellipse cx="65" cy="-185" rx="30" ry="18" transform="rotate(-15 65 -185)" fill="#10B981"/>
      </g>

      <rect x="50" y="45" width="200" height="30" rx="15" fill="#FFFFFF" fill-opacity="0.2" stroke="#FFFFFF" stroke-opacity="0.3"/>
      <text x="150" y="65" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="700" font-size="12" fill="#FEF3C7" text-anchor="middle" letter-spacing="1">MANZANA 4 · LOCAL 24 Y 27</text>

      <text x="50" y="150" font-family="'Outfit', sans-serif" font-weight="900" font-size="64" fill="#FFFFFF">D'raiz CDMX</text>
      <text x="50" y="200" font-family="'Outfit', sans-serif" font-weight="700" font-size="28" fill="#FBBF24">Macetas de Diseño &amp; Paisajismo</text>
      <text x="50" y="245" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="600" font-size="15" fill="#CBD5E1">Fibra de Vidrio Exclusiva · Cerámica de Alta Temperatura · Proyectos</text>

      <rect x="50" y="300" width="260" height="42" rx="21" fill="#D97706"/>
      <text x="180" y="327" font-family="'Outfit', sans-serif" font-weight="700" font-size="14" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.5">🏺 ESTUDIO BOTÁNICO &amp; DISEÑO</text>
    </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  // 4. Tacos de costilla y pollo, el Jarocho
  if (id === 'loc-jarocho') {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="800" height="420">
      <defs>
        <linearGradient id="bg-tj" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#7C2D12"/>
          <stop offset="60%" stop-color="#C2410C"/>
          <stop offset="100%" stop-color="#EA580C"/>
        </linearGradient>
      </defs>
      <rect width="800" height="420" fill="url(#bg-tj)"/>
      <circle cx="650" cy="180" r="180" fill="#FDE047" fill-opacity="0.15"/>

      <g transform="translate(620, 240)">
        <ellipse cx="0" cy="50" rx="130" ry="40" fill="#1C1917" stroke="#44403C" stroke-width="4"/>
        <path d="M-60 30 Q-30 0 0 30 Z" fill="#FBBF24" stroke="#D97706" stroke-width="3"/>
        <path d="M0 25 Q30 -5 60 25 Z" fill="#FDE047" stroke="#D97706" stroke-width="3"/>
        <ellipse cx="-30" cy="22" rx="16" ry="6" fill="#78350F"/>
        <circle cx="-25" cy="20" r="3" fill="#16A34A"/>
        <ellipse cx="30" cy="17" rx="16" ry="6" fill="#78350F"/>
        <circle cx="35" cy="15" r="3" fill="#16A34A"/>
        <circle cx="80" cy="45" r="18" fill="#84CC16"/>
        <circle cx="80" cy="45" r="14" fill="#BEF264"/>
      </g>

      <rect x="50" y="45" width="230" height="30" rx="15" fill="#FFFFFF" fill-opacity="0.2" stroke="#FFFFFF" stroke-opacity="0.3"/>
      <text x="165" y="65" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="700" font-size="12" fill="#FEF3C7" text-anchor="middle" letter-spacing="1">ZONA GASTRONÓMICA CUEMANCO</text>

      <text x="50" y="145" font-family="'Outfit', sans-serif" font-weight="900" font-size="52" fill="#FFFFFF">Tacos el Jarocho</text>
      <text x="50" y="195" font-family="'Outfit', sans-serif" font-weight="800" font-size="34" fill="#FDE047">Costilla &amp; Pollo Tradicional</text>
      <text x="50" y="240" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="600" font-size="15" fill="#FED7AA">Salsa Roja de Molcajete · Porciones Generosas · Viernes a Domingo</text>

      <rect x="50" y="295" width="260" height="42" rx="21" fill="#7C2D12" stroke="#F97316" stroke-width="2"/>
      <text x="180" y="322" font-family="'Outfit', sans-serif" font-weight="700" font-size="14" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.5">🌮 SABOR TRADICIONAL</text>
    </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  // 5. Macetas De Fibra De Vidrio
  if (id === 'loc-macetas-fibra') {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="800" height="420">
      <defs>
        <linearGradient id="bg-mf" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0F172A"/>
          <stop offset="60%" stop-color="#1E293B"/>
          <stop offset="100%" stop-color="#D97706"/>
        </linearGradient>
      </defs>
      <rect width="800" height="420" fill="url(#bg-mf)"/>
      <g transform="translate(620, 240)">
        <rect x="-90" y="10" width="80" height="130" rx="4" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="3"/>
        <path d="M20 140 L45 20 L115 20 L140 140 Z" fill="#D97706"/>
      </g>
      <rect x="50" y="45" width="200" height="30" rx="15" fill="#FFFFFF" fill-opacity="0.2"/>
      <text x="150" y="65" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="700" font-size="12" fill="#E2E8F0" text-anchor="middle">CORREDOR SUR · LATERAL 12</text>
      <text x="50" y="150" font-family="'Outfit', sans-serif" font-weight="900" font-size="52" fill="#FFFFFF">Macetas De</text>
      <text x="50" y="205" font-family="'Outfit', sans-serif" font-weight="900" font-size="52" fill="#FBBF24">Fibra De Vidrio</text>
      <text x="50" y="250" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="600" font-size="15" fill="#CBD5E1">Cilindros, Conos y Jardineras · Alta Resistencia e Intemperie</text>
      <rect x="50" y="300" width="240" height="42" rx="21" fill="#B45309"/>
      <text x="170" y="327" font-family="'Outfit', sans-serif" font-weight="700" font-size="14" fill="#FFFFFF" text-anchor="middle">🏺 USO RUDO Y MAYOREO</text>
    </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  // 6. Jardín del Mercado de Cuemanco
  if (id === 'loc-jardin') {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="800" height="420">
      <defs>
        <linearGradient id="bg-jc" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#064E3B"/>
          <stop offset="60%" stop-color="#047857"/>
          <stop offset="100%" stop-color="#0284C7"/>
        </linearGradient>
      </defs>
      <rect width="800" height="420" fill="url(#bg-jc)"/>
      <g transform="translate(620, 240)">
        <path d="M0 80 Q20 -40 -10 -150 Q10 -210 0 -240" stroke="#78350F" stroke-width="12" fill="none" stroke-linecap="round"/>
        <path d="M0 -150 Q-60 -90 -80 0 M0 -170 Q60 -100 80 10 M-10 -200 Q-80 -130 -100 -20 M-10 -210 Q80 -140 100 -30" stroke="#34D399" stroke-width="4" fill="none" stroke-linecap="round"/>
      </g>
      <rect x="50" y="45" width="180" height="30" rx="15" fill="#FFFFFF" fill-opacity="0.2"/>
      <text x="140" y="65" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="700" font-size="12" fill="#E2E8F0" text-anchor="middle">ÁREA VERDE CUEMANCO</text>
      <text x="50" y="150" font-family="'Outfit', sans-serif" font-weight="900" font-size="52" fill="#FFFFFF">Jardín del Mercado</text>
      <text x="50" y="205" font-family="'Outfit', sans-serif" font-weight="900" font-size="52" fill="#67E8F9">de Cuemanco</text>
      <text x="50" y="250" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="600" font-size="15" fill="#E2E8F0">Exhibición Botánica al Aire Libre · Flora de Xochimilco · Pet Friendly</text>
      <rect x="50" y="300" width="240" height="42" rx="21" fill="#0284C7"/>
      <text x="170" y="327" font-family="'Outfit', sans-serif" font-weight="700" font-size="14" fill="#FFFFFF" text-anchor="middle">🌳 ESPACIO NATURAL</text>
    </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  // Generador botánico por defecto elegante
  const themes = {
    flores: { bg1: '#831843', bg2: '#E4007C', accent: '#FDE047', badge: 'FLORES Y ORNATO', icon: '🌸' },
    interior: { bg1: '#064E3B', bg2: '#059669', accent: '#A7F3D0', badge: 'PLANTAS DE INTERIOR', icon: '🌿' },
    orquideas: { bg1: '#581C87', bg2: '#9333EA', accent: '#F5D0FE', badge: 'ORQUÍDEAS & EXÓTICAS', icon: '🪴' },
    suculentas: { bg1: '#14532D', bg2: '#16A34A', accent: '#BBF7D0', badge: 'CACTUS Y SUCULENTAS', icon: '🌵' },
    macetas: { bg1: '#78350F', bg2: '#D97706', accent: '#FDE68A', badge: 'MACETAS ARTESANALES', icon: '🏺' },
    tierra: { bg1: '#78350F', bg2: '#B45309', accent: '#FED7AA', badge: 'TIERRA Y ABONOS', icon: '🌾' },
    arboles: { bg1: '#064E3B', bg2: '#047857', accent: '#86EFAC', badge: 'ÁRBOLES Y FRUTALES', icon: '🌳' },
    servicios: { bg1: '#0F172A', bg2: '#334155', accent: '#93C5FD', badge: 'SERVICIOS & ATENCIÓN', icon: '🩺' }
  };
  const t = themes[theme] || themes.flores;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="800" height="420">
    <defs>
      <linearGradient id="bg-def" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${t.bg1}"/>
        <stop offset="100%" stop-color="${t.bg2}"/>
      </linearGradient>
    </defs>
    <rect width="800" height="420" fill="url(#bg-def)"/>
    <circle cx="680" cy="180" r="160" fill="#FFFFFF" fill-opacity="0.1"/>
    <text x="680" y="230" font-size="120" text-anchor="middle">${t.icon}</text>
    <rect x="50" y="45" width="200" height="30" rx="15" fill="#FFFFFF" fill-opacity="0.2"/>
    <text x="150" y="65" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="700" font-size="12" fill="#FFFFFF" text-anchor="middle">${numeroDisplay}</text>
    <text x="50" y="160" font-family="'Outfit', sans-serif" font-weight="900" font-size="52" fill="#FFFFFF">${title}</text>
    <text x="50" y="210" font-family="'Outfit', sans-serif" font-weight="700" font-size="28" fill="${t.accent}">${t.badge}</text>
    <rect x="50" y="300" width="260" height="42" rx="21" fill="#FFFFFF" fill-opacity="0.25"/>
    <text x="180" y="327" font-family="'Outfit', sans-serif" font-weight="700" font-size="14" fill="#FFFFFF" text-anchor="middle">MERCADO DE CUEMANCO</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// Catálogo de puntos y negocios verificados con datos de Google Maps
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
    svgCoords: [340, 380],
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
      { id: 'im-p3', nombre: 'Plantas Suculentas', tag: 'Colección', desc: 'Variedades protegidas y de bajo consumo hídrico.' },
      { id: 'im-p4', nombre: 'Orquídeas', tag: 'Conservación', desc: 'Especies cultivadas con trazabilidad y asesoría técnica.' },
      { id: 'im-p5', nombre: 'Cactus', tag: 'Cactáceas', desc: 'Ejemplares de vivero certificado.' },
      { id: 'im-p6', nombre: 'Marimos', tag: 'Acuático', desc: 'Algas vivas ornamentales en agua dulce.' },
      { id: 'im-p7', nombre: 'Monsteras', tag: 'Follaje', desc: 'Monstera deliciosa sana y frondosa.' },
      { id: 'im-p8', nombre: 'Monsteras Variegadas', tag: 'Colección Especial', desc: 'Ejemplares exclusivos con variegación crema/blanca.' },
      { id: 'im-p9', nombre: 'Biofertilizantes', tag: 'Agroecológico', desc: 'Lixiviados y bioinsumos orgánicos formulados por el Instituto.' },
      { id: 'im-p10', nombre: 'Fertilizantes', tag: 'Nutrición', desc: 'Fórmulas balanceadas para floración y enraizamiento.' }
    ],
    servicios: [
      'Hospital de Plantas',
      'Talleres de Capacitación',
      'Diagnóstico Fitosanitario',
      'Venta de Especies de Conservación',
      'Biofertilizantes Orgánicos',
      'Contacto directo con Jorge Pereda Cuemanco'
    ]
  },
  {
    id: 'loc-draiz',
    numero: '24-27',
    numeroDisplay: 'Manzana 4 · Locales 24 y 27',
    pasillo: 'Manzana 4, Locales 24 y 27 · Mercado Cuemanco',
    pasilloNum: 4,
    manzana: '4',
    nombre: "D'raiz CDMX",
    nombreCorto: "D'raiz CDMX",
    categoriaId: 'macetas',
    categoriaNombre: 'Macetas de Diseño y Paisajismo',
    categoriasAdicionales: ['interior', 'arboles'],
    rating: 4.9,
    reviews: 64,
    estado: 'Abierto ahora',
    horario: 'Lunes a Domingo: 8:30 AM - 6:00 PM',
    telefono: '+52 55 5678 4024',
    website: 'https://draizcdmx.com',
    websiteDisplay: 'draizcdmx.com',
    googleMapsUrl: 'https://maps.app.goo.gl/J6EHY1PZEToeJkuV7',
    coordsGps: { lat: 19.2992313, lng: -99.0963174 },
    svgCoords: [580, 330],
    descripcion: "Estudio botánico y tienda de paisajismo en Cuemanco. Especialistas en macetas exclusivas de fibra de vidrio y cerámica de alta temperatura, plantas arquitectónicas para diseño interior/exterior, sistemas de riego automatizado y proyectos de iluminación escénica.",
    badges: ['Manzana 4', 'Macetas de Diseño', 'Paisajismo', 'Fibra y Cerámica'],
    redes: {
      instagram: 'https://www.instagram.com/draiz.cdmx',
      instagramName: 'draiz.cdmx',
      website: 'https://draizcdmx.com'
    },
    servicios: [
      'Macetas de Fibra de Vidrio de Diseño',
      'Cerámica de Alta Temperatura',
      'Proyectos de Paisajismo Residencial',
      'Plantas Arquitectónicas',
      'Riego Automatizado e Iluminación'
    ],
    productos: [
      { id: 'dr-p1', nombre: 'Macetas de Fibra de Vidrio Modelo Minimalista', precio: 'Diseño Exclusivo', tag: 'Fibra', desc: 'Acabados satinados en blanco, negro y gris oxford para residencias y oficinas.' },
      { id: 'dr-p2', nombre: 'Cerámica de Alta Temperatura Artesanal', precio: 'Alta Calidad', tag: 'Cerámica', desc: 'Piezas únicas esmaltadas al horno con texturas orgánicas.' },
      { id: 'dr-p3', nombre: 'Jardineras Geométricas para Terraza', precio: 'Resistente a Intemperie', tag: 'Jardineras', desc: 'Medidas especiales para balcones, azoteas verdes y restaurantes.' },
      { id: 'dr-p4', nombre: 'Plantas Arquitectónicas de Interior', precio: 'Selección', tag: 'Plantas', desc: 'Ficus Lyrata, Olivos de interior, Sansevierias monumentales y Monsteras.' },
      { id: 'dr-p5', nombre: 'Proyecto Integral de Paisajismo', precio: 'Cotización personalizada', tag: 'Servicio', desc: 'Diseño botánico 3D, selección de especies y colocación en sitio.' }
    ]
  },
  {
    id: 'loc-jarocho',
    numero: 'Jarocho',
    numeroDisplay: 'Zona de Alimentos · El Jarocho',
    pasillo: 'Corredor Gastronómico Suroeste · Acceso Periférico',
    pasilloNum: 1,
    nombre: 'Tacos de costilla y pollo, el Jarocho',
    nombreCorto: 'Tacos el Jarocho',
    categoriaId: 'servicios',
    categoriaNombre: 'Comida y Antojitos Tradicionales',
    rating: 4.8,
    reviews: 156,
    estado: 'Abierto en fin de semana',
    horario: 'Viernes a Domingo: 7:00 AM - 4:00 PM',
    googleMapsUrl: 'https://maps.app.goo.gl/QhmzNtYX4azd3dyP8',
    coordsGps: { lat: 19.2979878, lng: -99.1001506 },
    svgCoords: [180, 470],
    descripcion: 'Puesto emblemático de comida tradicional mexicana dentro del mercado de Cuemanco. Reconocido por sus famosos tacos de costilla suave, pollo deshebrado, cecina adobada y su tradicional salsa roja de molcajete.',
    badges: ['Comida Típica', 'Tacos de Costilla', 'Salsa Roja Clásica', 'Fin de Semana'],
    servicios: [
      'Tacos de Costilla',
      'Tacos de Pollo y Cecina',
      'Salsas Tradicionales de Molcajete',
      'Refrescos y Aguas Frescas',
      'Para Consumir en el Lugar y Para Llevar'
    ],
    productos: [
      { id: 'tj-p1', nombre: 'Taco de Costilla Especial', precio: 'Generoso', tag: 'Favorito del Mercado', desc: 'Carne de costilla jugosa y suave con cebolla, cilantro y limón.' },
      { id: 'tj-p2', nombre: 'Taco de Pollo Adobado', precio: 'Especialidad', tag: 'Clásico', desc: 'Pechuga deshebrada marinada con adobo casero y especias.' },
      { id: 'tj-p3', nombre: 'Taco de Cecina de Yecapixtla', precio: 'Tradicional', tag: 'Recomendado', desc: 'Cecina salada al comal con nopales tiernos asados.' },
      { id: 'tj-p4', nombre: 'Agua Fresca de Frutas de Temporada', precio: 'Refrescante', tag: 'Bebida', desc: 'Horchata, jamaica y frutas frescas de mercado.' }
    ]
  },
  {
    id: 'loc-macetas-fibra',
    numero: 'Fibra',
    numeroDisplay: 'Zona Sur · Macetas de Fibra',
    pasillo: 'Corredor Sur · Lateral 12 / Periférico',
    pasilloNum: 10,
    nombre: 'Macetas De Fibra De Vidrio',
    nombreCorto: 'Macetas De Fibra De Vidrio',
    categoriaId: 'macetas',
    categoriaNombre: 'Macetas y Jardineras',
    rating: 4.7,
    reviews: 38,
    estado: 'Abierto ahora',
    horario: 'Lunes a Domingo: 8:00 AM - 6:00 PM',
    googleMapsUrl: 'https://maps.app.goo.gl/U3hDXaprrBgsw2oBA',
    coordsGps: { lat: 19.2982058, lng: -99.0971827 },
    svgCoords: [460, 450],
    descripcion: 'Taller y punto de venta especializado en macetas y jardineras de fibra de vidrio de uso rudo y decorativo. Modelos cilindro, cono, cubo y silueta para exteriorismo y arquitectura de paisaje.',
    badges: ['Fibra de Vidrio', 'Uso Rudo', 'Directo de Fábrica'],
    servicios: [
      'Macetas Cilíndricas y Cónicas',
      'Jardineras Rectangulares de Gran Formato',
      'Acabados Mate, Brillante y Texturizado',
      'Venta por Menudeo y Mayoreo'
    ],
    productos: [
      { id: 'mf-p1', nombre: 'Maceta Cilindro Fibra de Vidrio 80cm', precio: 'Mayoreo y menudeo', tag: 'Cilindro', desc: 'Ideal para palmas, ficus y árboles de interior o fachada.' },
      { id: 'mf-p2', nombre: 'Jardinera Rectangular 1m x 40cm', precio: 'Gran Formato', tag: 'Jardinera', desc: 'Excelente para división de terrazas, balcones y restaurantes.' },
      { id: 'mf-p3', nombre: 'Maceta Cono Invertido Moderna', precio: 'Vanguardia', tag: 'Cono', desc: 'Diseño moderno para entradas principales y vestíbulos.' }
    ]
  },
  {
    id: 'loc-jardin',
    numero: 'Jardín',
    numeroDisplay: 'Área Verde Central',
    pasillo: 'Sector Suroeste · Viveros Cuemanco',
    pasilloNum: 16,
    nombre: 'Jardín del Mercado de Cuemanco',
    nombreCorto: 'Jardín de Cuemanco',
    categoriaId: 'flores',
    categoriaNombre: 'Área Verde y Exhibición Botánica',
    rating: 4.9,
    reviews: 112,
    estado: 'Abierto al público',
    horario: 'Lunes a Domingo: 8:00 AM - 6:00 PM',
    googleMapsUrl: 'https://maps.app.goo.gl/CS1iWRp4Sujf93XMA',
    coordsGps: { lat: 19.298631, lng: -99.098406 },
    svgCoords: [290, 410],
    descripcion: 'Espacio ajardinado y área de exhibición botánica al aire libre en el sector suroeste del Mercado de Cuemanco. Punto de encuentro emblemático rodeado de viveros de árboles, plantas de ornato y áreas sombreadas.',
    badges: ['Área Verde', 'Exhibición Botánica', 'Pet Friendly'],
    servicios: [
      'Paseo Botánico y Áreas Verdes',
      'Punto de Encuentro y Orientación',
      'Zona Familiar y Pet Friendly',
      'Exhibición de Especies Maduras'
    ],
    productos: [
      { id: 'jc-p1', nombre: 'Recorrido Botánico al Aire Libre', precio: 'Entrada Libre', tag: 'Público', desc: 'Espacio para admirar la flora de los productores de Xochimilco.' },
      { id: 'jc-p2', nombre: 'Zona de Árboles Frondosos', precio: 'Descanso', tag: 'Sombra', desc: 'Área arbolada para descanso entre compras de viveros.' }
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
    svgCoords: [340, 380],
    servicios: ['Oficinas del Mercado', 'Hospital de Plantas IMFFSS', 'Capacitación y Talleres']
  },
  {
    id: 'poi-manzana4',
    numeroDisplay: 'Manzana 4',
    pasillo: 'Pasillo Noreste',
    nombre: "Manzana 4 (D'raiz CDMX)",
    categoriaId: 'macetas',
    categoriaNombre: 'Macetas y Talavera',
    icon: '🏺',
    descripcion: "Ubicación de D'raiz CDMX (Locales 24 y 27). Macetas exclusivas de fibra de vidrio y cerámica de alta temperatura.",
    horario: '8:30 AM - 6:00 PM',
    svgCoords: [580, 330],
    servicios: ['Locales 24 y 27', 'Macetas de Diseño', 'Paisajismo']
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
    id: 'poi-gastronomia',
    numeroDisplay: 'Comida',
    pasillo: 'Corredor Suroeste',
    nombre: 'Zona Gastronómica (Tacos el Jarocho)',
    categoriaId: 'servicios',
    categoriaNombre: 'Servicios',
    icon: '🌮',
    descripcion: 'Puestos de tacos de costilla, pollo, antojitos y bebidas mexicanas tradicionales.',
    horario: '7:00 AM - 4:00 PM',
    svgCoords: [180, 470],
    servicios: ['Tacos de Costilla', 'Comida Tradicional', 'Bebidas']
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
