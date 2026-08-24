/**
 * Insere a chave `es` em todos os LocalizedText (pt-BR / en / it) dos dados.
 * Idempotente: não duplica se `es` já existir no objeto.
 */
import fs from 'node:fs';

const FILES = [
  'src/data/content.ts',
  'src/data/tours.ts',
  'src/data/wellness.ts',
  'src/data/media.ts',
];

/** Inglês → espanhol. Nomes próprios e números ficam iguais. */
const ES = {
  '*Please note that some of the services above are not free. Fees are determined by each service provider. Please check availability and rates at the front desk.':
    '*Atención: algunos de los servicios descritos no son gratuitos y tienen tarifas propias definidas por el prestador. Consulte disponibilidad y valores en recepción.',
  '+55 88 99219-1175': '+55 88 99219-1175',
  '1,300 m²': '1.300 m²',
  '12 items': '12 ítems',
  '12,000 BTU air conditioning': 'Aire acondicionado 12.000 BTU',
  '1h30': '1h30',
  '2,500 m²': '2.500 m²',
  '20 air-conditioned suites in four categories — Sea Front and Garden Front, upper and ground floor.':
    '20 suites climatizadas en cuatro categorías — Frente Mar y Frente Jardín, piso superior y planta baja.',
  '20 air-conditioned · up to 3 people': '20 climatizadas · hasta 3 personas',
  '20 full suites': '20 suites completas',
  '21 m²': '21 m²',
  '23 m²': '23 m²',
  '32" LCD TV (Sky)': 'TV LCD 32" (Sky)',
  '4 pm to 8 pm': '16h a 20h',
  '4 — Sea Front and Garden Front': '4 — Frente Mar y Frente Jardín',
  '50 min': '50 min',
  '55 min': '55 min',
  '55 min — full body': '55 min — cuerpo completo',
  '6 pm to 9 pm': '18h a 21h',
  '6 units · 21 m²': '6 unidades · 21 m²',
  '6 units · 23 m²': '6 unidades · 23 m²',
  '62590-000': '62590-000',
  Accommodation: 'Alojamiento',
  'Acoustic Guitar': 'Guitarra acústica',
  Acupuncture: 'Acupuntura',
  'Acupuncture (50 min). Treatment method to improve pain, energy balance and release of muscle tension points.':
    'Acupuntura (50 min). Método de tratamiento para aliviar dolores, equilibrio energético y liberación de puntos de tensión muscular.',
  Address: 'Dirección',
  'Address: Av. Costeira, S/N — Ilha do Guajiru, Itarema, CE — CEP 62590-000, Brazil.':
    'Dirección: Av. Costeira, S/N — Ilha do Guajiru, Itarema, CE — CEP 62590-000, Brasil.',
  'Aerial view of the Locanda dei Venti property.': 'Vista aérea de la propiedad de Locanda dei Venti.',
  'Aerial view of the area around the Locanda dei Venti.':
    'Vista aérea del entorno de Locanda dei Venti.',
  'Aerial view of the surroundings of the Locanda dei Venti.':
    'Vista aérea de los alrededores de Locanda dei Venti.',
  'All services above are charged extra. Consult the prices at the front desk.':
    'Todos los servicios anteriores tienen tarifa definida por el prestador. Consulte en recepción.',
  Almofala: 'Almofala',
  'Almofala, Ilha do Guajiru and Region': 'Almofala, Ilha do Guajiru y Región',
  'Ambience — Locanda dei Venti': 'Ambiente — Locanda dei Venti',
  Amenities: 'Comodidades',
  'Amenities for our guests': 'Comodidades para nuestros huéspedes',
  'At the table': 'A la mesa',
  'Av. Costeira, S/N — Ilha do Guajiru, Itarema, CE — CEP 62590-000, Brazil':
    'Av. Costeira, S/N — Ilha do Guajiru, Itarema, CE — CEP 62590-000, Brasil',
  'Av. Costeira, S/N — Ilha do Guajiru, Itarema, CE — CEP 62590-000. About 210 km from Fortaleza and 60 km from Jericoacoara.':
    'Av. Costeira, S/N — Ilha do Guajiru, Itarema, CE — CEP 62590-000. A unos 210 km de Fortaleza y 60 km de Jericoacoara.',
  'Av. Costeira, S/N — Ilha do Guajiru, Itarema/CE': 'Av. Costeira, S/N — Ilha do Guajiru, Itarema/CE',
  Babysitting: 'Niñera',
  Balcony: 'Varanda',
  'Bar & Restaurant': 'Bar y restaurante',
  'Beach Tennis Court': 'Cancha de beach tennis',
  'Beach and sea in the Locanda dei Venti region.': 'Playa y mar en la región de Locanda dei Venti.',
  'Beach in the Locanda dei Venti region.': 'Playa en la región de Locanda dei Venti.',
  'Beauty services — Manicure, hair stylist, makeup artist':
    'Servicios de belleza — Manicura, peluquería, maquillaje',
  'Boat around the Island': 'Barco en la Isla',
  'Boat trip': 'Paseo en barco',
  'Boat trip exploring Ilha do Guajiru and its surroundings.':
    'Paseo en barco explorando la Ilha do Guajiru y sus alrededores.',
  'Boat trip on Rio Aracati Açu': 'Paseo en barco por el Río Aracati Açu',
  'Bons Ventos — R$ 20': 'Bons Ventos — R$ 20',
  'Book your stay': 'Reserva tu estadía',
  Breakfast: 'Desayuno',
  'Breakfast is included in the rate.': 'El desayuno está incluido en la tarifa.',
  Buggy: 'Buggy',
  'Buggy for up to 4 people.': 'Buggy para hasta 4 personas.',
  'Buggy rides along the region’s beaches and trails.':
    'Paseos en buggy por las playas y senderos de la región.',
  'Built area': 'Área construida',
  Canoeing: 'Canotaje',
  Categories: 'Categorías',
  Chef: 'Chef',
  Chiropractic: 'Quiropráctica',
  'Chiropractic. Manual technique for adjusting body joints. Chiropractic combined with massage.':
    'Quiropráctica. Técnica manual de ajuste de las articulaciones. Quiropráctica asociada a masaje.',
  'Choose where you would like to begin.': 'Elige por dónde quieres empezar.',
  'Cinematic Nights': 'Noches de cine',
  'Coastal route with two options: with or without a boat trip on Rio Aracati Açu.':
    'Recorrido por la costa con dos opciones: con o sin paseo en barco por el Río Aracati Açu.',
  'Contact the Locanda': 'Habla con la Locanda',
  Cupping: 'Ventosas',
  'Cupping. Treatment method for muscle relaxation, tension release and energy balance.':
    'Ventosas. Método de tratamiento para relajación muscular, liberación de tensiones y equilibrio energético.',
  'Departure from Ilha do Guajiru': 'Salida de la Ilha do Guajiru',
  'Departure from Ilha do Guajiru, along the mangrove trail to the other side of the island, continuing through:':
    'Salida de la Ilha do Guajiru, por el sendero del manglar hasta el otro lado de la isla, continuando por:',
  'Departure from Ilha do Guajiru, mangrove trail, beaches, lighthouse and return by river, with sunset at Praia da Espraiada.':
    'Salida de la Ilha do Guajiru, sendero del manglar, playas, faro y regreso por el río, con atardecer en Praia da Espraiada.',
  Dining: 'Gastronomía',
  Downwinds: 'Downwinds',
  'Drawings for Children': 'Dibujos para colorear para niños',
  'Dry Needling': 'Dry Needling',
  'Dry Needling. Local needling technique on muscle tension points. Dry Needling combined with local massage.':
    'Dry Needling. Técnica de agujas locales en puntos de tensión muscular. Dry Needling asociada a masaje local.',
  'Dunes and vegetation in the Locanda dei Venti region.':
    'Dunas y vegetación en la región de Locanda dei Venti.',
  'E-mail': 'E-mail',
  'End-of-day space': 'Espacio de final de tarde',
  Equipment: 'Equipos',
  'Equipment and clothing shop': 'Tienda de equipos y ropa',
  'Equipment rental': 'Alquiler de equipo',
  'Espaço Onoda': 'Espaço Onoda',
  'Espaço Onoda on Instagram': 'Instagram de Espaço Onoda',
  'Espaço Onoda on WhatsApp': 'WhatsApp de Espaço Onoda',
  Experiences: 'Experiencias',
  'Experiences [VIDEO TO BE DEFINED]': 'Experiencias [VIDEO POR DEFINIR]',
  Facilities: 'Facilidades',
  'Family-size bathroom': 'Baño familiar',
  'FatBike on the Island': 'FatBike en la Isla',
  'FatBike rides across the sand and trails of Ilha do Guajiru.':
    'Paseos en FatBike por la arena y los senderos de la Ilha do Guajiru.',
  'Fitness Space': 'Espacio fitness',
  'Foot bath': 'Baño de pies',
  'Foot bath and relaxing full-body massage.': 'Baño de pies y masaje relajante corporal.',
  Fortaleza: 'Fortaleza',
  'Free Baby Crib': 'Cuna gratuita',
  'Free Beach Boy Services': 'Asistencia beach boy gratuita',
  'Free Parking': 'Estacionamiento gratuito',
  'Free Wi-Fi': 'Wi-Fi gratuito',
  'Free Wi-Fi, parking, bar & restaurant, beach tennis, fitness, yoga and more.':
    'Wi-Fi, estacionamiento, bar y restaurante, beach tennis, fitness, yoga y más.',
  'Friday · 6 pm to 9 pm': 'Viernes · 18h a 21h',
  Fridays: 'Viernes',
  'Full body. Focused on muscle release, pre- or post-sport.':
    'Cuerpo completo. Enfocada en la liberación muscular, antes o después del deporte.',
  'Full body. Helps reduce everyday stress.': 'Cuerpo completo. Ayuda a disminuir el estrés diario.',
  'Gallery on your phone': 'Galería en tu celular',
  'Getting here': 'Cómo llegar',
  'Glass of sparkling wine — R$ 17': 'Copa de espumante — R$ 17',
  'Ground Sea Front': 'Planta baja frente al mar',
  'Ground Sea Front Suite — 6 units, ground floor, full view of the bar/mouth of the sea.':
    'Suite Inferior Frente Mar — 6 unidades, planta baja, vista total a la barra/mar.',
  Guajiru: 'Guajiru',
  'Guajiru beaches': 'Playas del Guajiru',
  'Happy Hour': 'Happy Hour',
  'Happy Hour at the Locanda: Fridays 6 pm to 9 pm and Saturdays 4 pm to 8 pm.':
    'Happy Hour en la Locanda: viernes de 18h a 21h y sábados de 16h a 20h.',
  'Heineken bucket 330ml — R$ 48': 'Balde de Heineken 330ml — R$ 48',
  Horseback: 'Caballo',
  'Horseback rides across the island, beaches and regional trails.':
    'Paseos a caballo por la isla, playas y senderos de la región.',
  'Hotel and experiences on Ilha do Guajiru, Itarema — Ceará.':
    'Hotel y experiencias en la Ilha do Guajiru, Itarema — Ceará.',
  'Hotel facing a calm-water bay ("flat water"), ideal for water sports and contact with nature. Modern architecture with rustic details.':
    'Hotel frente a una bahía de aguas tranquilas ("flat water"), ideal para deportes acuáticos y contacto con la naturaleza. Arquitectura moderna con detalles rústicos.',
  'Hotel on Ilha do Guajiru': 'Hotel en la Ilha do Guajiru',
  'Hours, rates, instructors and contacts of Isla Kite Center: [KITE CENTER CONTENT TO BE DEFINED]':
    'Horarios, valores, instructores y contactos de Isla Kite Center: [CONTENIDO DEL KITE CENTER POR DEFINIR]',
  'Ilha das Ostras': 'Ilha das Ostras',
  'Ilha do Guajiru': 'Ilha do Guajiru',
  'Ilha do Guajiru and surroundings': 'Ilha do Guajiru y alrededores',
  'Ilha do Guajiru is in Itarema, on the west coast of Ceará — about 210 km from Fortaleza and 60 km from Jericoacoara.':
    'La Ilha do Guajiru está en Itarema, en el litoral oeste de Ceará — a unos 210 km de Fortaleza y 60 km de Jericoacoara.',
  'Included in the rate': 'Incluido en la tarifa',
  'Instagram — @espaco_onoda': 'Instagram — @espaco_onoda',
  'Instagram — @locandadeiventi': 'Instagram — @locandadeiventi',
  'Institutional video [VIDEO TO BE DEFINED]': 'Video institucional [VIDEO POR DEFINIR]',
  'Isla Kite Center': 'Isla Kite Center',
  'Itarema · West Coast of Ceará': 'Itarema · Litoral oeste de Ceará',
  Jericoacoara: 'Jericoacoara',
  'Kayak at Porto dos Barcos': 'Kayak en Porto dos Barcos',
  'Kayak paddle from Porto dos Barcos through the calm waters.':
    'Remada de kayak desde Porto dos Barcos por las aguas tranquilas.',
  Kitesurf: 'Kitesurf',
  'Kitesurf and Wingfoil lessons': 'Clases de kitesurf y wingfoil',
  'Kitesurf and wingfoil lessons, equipment rental, supervision, downwinds and shop — with Isla Kite Center.':
    'Clases de kitesurf y wingfoil, alquiler de equipo, supervisión, downwinds y tienda — con Isla Kite Center.',
  'Kitesurf lessons': 'Clases de kitesurf',
  'Kitesurf on the bay': 'Kitesurf en la bahía',
  'Kitesurf · Wakeboard · Windsurf · SUP · Canoeing':
    'Kitesurf · Wakeboard · Windsurf · SUP · Canotaje',
  Land: 'Terreno',
  'Late afternoon at the Locanda': 'Final de tarde en la Locanda',
  Lighthouse: 'Faro',
  'Local needling technique on muscle tension points. Dry Needling combined with local massage.':
    'Técnica de agujas locales en puntos de tensión muscular. Dry Needling asociada a masaje local.',
  'Locanda dei Venti': 'Locanda dei Venti',
  'Locanda dei Venti is a hotel facing a calm-water bay ("flat water"), ideal for water sports and contact with nature. Modern architecture blends with rustic details, in a property with 20 full suites, restaurant, bar and pool.':
    'Locanda dei Venti es un hotel frente a una bahía de aguas tranquilas ("flat water"), ideal para deportes acuáticos y contacto con la naturaleza. La arquitectura moderna se combina con detalles rústicos, en una estructura con 20 suites completas, restaurante, bar y piscina.',
  'Locanda dei Venti official website': 'Sitio oficial de Locanda dei Venti',
  Location: 'Ubicación',
  'Location and contact': 'Ubicación y contacto',
  'Lunch stop': 'Parada para el almuerzo',
  'Léo Parente': 'Léo Parente',
  'Mangrove trail to the other side of the island': 'Sendero del manglar hasta el otro lado de la isla',
  'Mangrove trail, beaches, lighthouse and river return, visiting Almofala and the Guajiru region.':
    'Sendero del manglar, playas, faro y regreso por el río, conociendo Almofala y la región del Guajiru.',
  'Manual technique for adjusting body joints. Chiropractic combined with massage.':
    'Técnica manual de ajuste de las articulaciones. Quiropráctica asociada a masaje.',
  'Massage & Acupuncture': 'Masaje y acupuntura',
  'Massages, therapies and moments of care for relaxation, tension relief and well-being.':
    'Masajes, terapias y momentos de cuidado para relajación, alivio de tensiones y bienestar.',
  'Mini bar': 'Frigobar',
  'Mission — to serve guests with excellence, care and good humour, ensuring a comfortable, worry-free stay, while also contributing to local tourism and environmental preservation.':
    'Misión — atender a los huéspedes con excelencia, solicitud y buen humor, garantizando una estadía cómoda y sin preocupaciones, contribuyendo también al turismo local y a la preservación ambiental.',
  'Moitas de Icaraí': 'Moitas de Icaraí',
  'Nau Rooftop Lounge': 'Nau Rooftop Lounge',
  'Online booking — CloudBeds': 'Reservas en línea — CloudBeds',
  'Opening frame of the institutional video — outdoor area of the Locanda dei Venti.':
    'Apertura del video institucional — área exterior de Locanda dei Venti.',
  'Outdoor area of the Locanda dei Venti.': 'Área exterior de Locanda dei Venti.',
  'Panoramic aerial view of the Locanda dei Venti property.':
    'Vista aérea panorámica de la propiedad de Locanda dei Venti.',
  'Phone/WhatsApp': 'Teléfono/WhatsApp',
  'Phone/WhatsApp: +55 88 99219-1175 · E-mail: locanda@locandadeiventi.com.br':
    'Teléfono/WhatsApp: +55 88 99219-1175 · E-mail: locanda@locandadeiventi.com.br',
  Picnic: 'Picnic',
  'Picnic*': 'Picnic*',
  'Point your phone camera at the code to open the chat.':
    'Apunta la cámara de tu celular al código para abrir la conversación.',
  'Point your phone camera at the code to open the profile.':
    'Apunta la cámara de tu celular al código para abrir el perfil.',
  'Point your phone camera at the code.': 'Apunta la cámara de tu celular al código.',
  'Point your phone camera to keep browsing the photos.':
    'Apunta la cámara de tu celular para seguir viendo las fotos.',
  'Point your phone camera to open WhatsApp.': 'Apunta la cámara de tu celular para abrir WhatsApp.',
  'Point your phone camera to open the booking page.':
    'Apunta la cámara de tu celular para abrir las reservas.',
  'Points of interest and tours in the region are gathered in the "Experiences and tours" area of this kiosk.':
    'Los puntos de interés y los paseos de la región están reunidos en el área "Experiencias y paseos" de este tótem.',
  'Porto dos Barcos': 'Porto dos Barcos',
  'Postal code': 'Código postal',
  'Praia da Batedeira': 'Praia da Batedeira',
  'Praia da Tijuca': 'Praia da Tijuca',
  'Praia de Patos': 'Praia de Patos',
  'Private events': 'Eventos privados',
  'Private garden': 'Jardín exclusivo',
  'Quad Bike & UTV': 'Cuatriciclo y UTV',
  'Quad bike and UTV trails through Ilha do Guajiru and surroundings.':
    'Senderos de cuatriciclo y UTV por la Ilha do Guajiru y alrededores.',
  'Queen bed': 'Cama queen',
  Rates: 'Tarifas',
  Region: 'Región',
  'Relaxing Massage': 'Masaje relajante',
  'Relaxing full-body massage': 'Masaje relajante corporal',
  'Relaxing massage — full body (55 min). Helps reduce everyday stress. Light touch that stimulates blood circulation and relaxation.':
    'Masaje relajante — cuerpo completo (55 min). Ayuda a disminuir el estrés diario. Toque suave que estimula la circulación y la relajación.',
  'Return by the river': 'Regreso por el río',
  'Rio Aracati Mirim crossing by ferry': 'Cruce del Río Aracati Mirim en balsa',
  'River return': 'Regreso del río',
  'Romantic Dinner': 'Cena romántica',
  SUP: 'SUP',
  'Saturday · 4 pm to 8 pm': 'Sábado · 16h a 20h',
  Saturdays: 'Sábados',
  Seafood: 'Mariscos',
  Services: 'Servicios',
  'Services On Demand': 'Servicios On Demand',
  'Set by each service provider — ask at the front desk':
    'Definidas por el prestador — consulte en recepción',
  'Solar heating': 'Calentamiento solar',
  Specialty: 'Especialidad',
  'Specific area of the body, for treating pain and tension points.':
    'Área específica del cuerpo, para el tratamiento de dolores y puntos de tensión.',
  Sports: 'Deportes',
  'Sports Massage': 'Masaje deportivo',
  'Sports massage — full body (55 min). Focused on muscle release, pre- or post-sport. Firm-pressure massage that stimulates muscle regeneration. Massage combined with stretching.':
    'Masaje deportivo — cuerpo completo (55 min). Enfocado en la liberación muscular, antes o después del deporte. Masaje con presión firme que estimula la regeneración. Masaje asociado a estiramientos.',
  'Stella Artois bucket 330ml — R$ 48': 'Balde de Stella Artois 330ml — R$ 48',
  'Stingray croquettes — R$ 25': 'Croquetas de raya — R$ 25',
  'Storage for kites and equipment': 'Espacio para guardar kites y equipos',
  'Suite highlights': 'Destacados de la suite',
  Suites: 'Suites',
  'Sun-dried beef toasts — R$ 25': 'Tostadas de carne seca — R$ 25',
  'Sunset Tour': 'Paseo Atardecer',
  'Sunset at Praia da Espraiada': 'Atardecer en Praia da Espraiada',
  Supervision: 'Supervisión',
  Surroundings: 'Alrededores',
  Tailored: 'A medida',
  'Take the Locanda with you': 'Lleva la Locanda contigo',
  'Technical demo clip used until the official video is provided.':
    'Clip técnico de demostración usado mientras no llega el video oficial.',
  'The Locanda': 'La Locanda',
  'The Locanda has a partnership with Isla Kite Center for kitesurf lessons and offers storage space for kite and water sports equipment.':
    'La Locanda mantiene una alianza con Isla Kite Center para clases de kitesurf y ofrece espacio para guardar equipos de kite y deportes acuáticos.',
  'The Locanda is about 210 km from Fortaleza and 60 km from Jericoacoara.':
    'La Locanda queda a unos 210 km de Fortaleza y 60 km de Jericoacoara.',
  'The Locanda is on Ilha do Guajiru, in Itarema, on the west coast of Ceará: about 210 km from Fortaleza and 60 km from Jericoacoara.':
    'La Locanda está en la Ilha do Guajiru, en Itarema, en el litoral oeste de Ceará: a unos 210 km de Fortaleza y 60 km de Jericoacoara.',
  'The Locanda restaurant is à la carte, with a menu signed by Chef Léo Parente and specialising in seafood.':
    'El restaurante de la Locanda es à la carte, con menú firmado por el Chef Léo Parente y especializado en mariscos.',
  'The bar offers a variety of drinks, and the Nau Rooftop Lounge is the Locanda’s new "end of day" space, combining good music, comfort and sophistication on Ilha do Guajiru.':
    'El bar reúne bebidas variadas, y el Nau Rooftop Lounge es el nuevo espacio de final de tarde de la Locanda, uniendo buena música, confort y sofisticación en la Ilha do Guajiru.',
  'The calm-water bay ("flat water") in front of the Locanda favours kitesurfing and wingfoiling. The Locanda has a partnership with Isla Kite Center, which offers:':
    'La bahía de aguas tranquilas ("flat water") frente a la Locanda favorece el kitesurf y el wingfoil. La Locanda mantiene una alianza con Isla Kite Center, que ofrece:',
  'The calm-water bay ("flat water") in front of the Locanda favours water sports such as kitesurf, wakeboard, windsurf, SUP and canoeing.':
    'La bahía de aguas tranquilas ("flat water") frente a la Locanda favorece deportes acuáticos como kitesurf, wakeboard, windsurf, SUP y canotaje.',
  'The details of the Garden Front suites (Upper and Ground) have not yet been published on the official website. [TO BE CONFIRMED WITH LOCANDA MANAGEMENT]':
    'Los detalles de las suites Frente Jardín (Superior e Inferior) aún no se publicaron en el sitio oficial. [POR CONFIRMAR CON LA GESTIÓN DE LA LOCANDA]',
  'The territory': 'El territorio',
  'Therapeutic Massage': 'Masaje terapéutico',
  'Therapeutic massage (55 min). Massage on a specific area of the body, for treating pain, tension points and local muscle release.':
    'Masaje terapéutico (55 min). Masaje en un área específica del cuerpo, para el tratamiento de dolores, puntos de tensión y liberación muscular local.',
  'There are 20 air-conditioned suites, sleeping up to 3 people each, in four categories: Upper Sea Front Suite, Ground Sea Front Suite, Upper Garden Front Suite and Ground Garden Front Suite.':
    'Son 20 suites climatizadas, con capacidad para hasta 3 personas cada una, en cuatro categorías: Suite Superior Frente Mar, Suite Inferior Frente Mar, Suite Superior Frente Jardín y Suite Inferior Frente Jardín.',
  'This option does not include a boat trip.': 'Esta opción no incluye paseo en barco.',
  'This option includes a boat trip on Rio Aracati Açu, passing through Túnel do Amor to Ilha das Ostras, with a lunch stop.':
    'Esta opción incluye paseo en barco por el Río Aracati Açu, pasando por el Túnel do Amor hasta Ilha das Ostras, con parada para el almuerzo.',
  Torrões: 'Torrões',
  'Touch the screen to begin': 'Toca la pantalla para comenzar',
  'Tours and routes through the region (Sunset, Moitas de Icaraí, Almofala and Ilha do Guajiru) are in the "Experiences and tours" area of this kiosk.':
    'Los paseos y recorridos de la región (Atardecer, Moitas de Icaraí, Almofala e Ilha do Guajiru) están en el área "Experiencias y paseos" de este tótem.',
  'Trail at Morro de Patos': 'Sendero en el Morro de Patos',
  Transfer: 'Transfer',
  'Transfer, babysitting, romantic dinner, picnic, beauty services and private events.':
    'Transfer, niñera, cena romántica, picnic, servicios de belleza y eventos privados.',
  'Treatment method for muscle relaxation, tension release and energy balance.':
    'Método de tratamiento para relajación muscular, liberación de tensiones y equilibrio energético.',
  'Treatment method to improve pain, energy balance and release of muscle tension points.':
    'Método de tratamiento para aliviar dolores, equilibrio energético y liberación de puntos de tensión muscular.',
  'Túnel do Amor': 'Túnel do Amor',
  'Up to 3 people': 'Hasta 3 personas',
  'Upper Sea Front': 'Superior frente al mar',
  'Upper Sea Front Suite — 6 units, upper floor, full view of the bar/mouth of the sea.':
    'Suite Superior Frente Mar — 6 unidades, piso superior, vista total a la barra/mar.',
  'Values — commitment, quality excellence, professionalism, optimism, ethics, innovation, social and environmental responsibility, and appreciation of human resources.':
    'Valores — compromiso, excelencia de calidad, profesionalismo, optimismo, ética, innovación, responsabilidad social y ambiental y valoración de los recursos humanos.',
  'Vision — to be a benchmark in service and facilities, constantly seeking modernization and good human relations.':
    'Visión — ser referencia en atención y estructura, buscando modernización constante y buenas relaciones humanas.',
  Wakeboard: 'Wakeboard',
  'Water sports': 'Deportes acuáticos',
  'Water sports favoured by the calm-water bay: kitesurf, wakeboard, windsurf, SUP and canoeing.':
    'Deportes acuáticos favorecidos por la bahía de aguas tranquilas: kitesurf, wakeboard, windsurf, SUP y canotaje.',
  Welcome: 'Bienvenido',
  'Wellness Day — Combo': 'Wellness Day — Combo',
  'Wellness Day — combo (1h30). A complete care experience: foot bath and relaxing full-body massage.':
    'Wellness Day — combo (1h30). Una experiencia de cuidado completa: baño de pies y masaje relajante corporal.',
  'What to live here': 'Qué vivir aquí',
  'WhatsApp — +55 (88) 99630-9247': 'WhatsApp — +55 (88) 99630-9247',
  'WhatsApp — +55 88 99219-1175': 'WhatsApp — +55 88 99219-1175',
  'Where to rest': 'Dónde descansar',
  'Who we are': 'Quiénes somos',
  Windsurf: 'Windsurf',
  'With boat trip': 'Con paseo en barco',
  'Without boat trip': 'Sin paseo en barco',
  'Yoga & Functional Training*': 'Yoga y funcional*',
  'Ypióca caipirinha (1 flavour) — R$ 11': 'Caipiriña Ypióca (1 sabor) — R$ 11',
  'locanda@locandadeiventi.com.br': 'locanda@locandadeiventi.com.br',
  'locandadeiventi.com.br': 'locandadeiventi.com.br',
  '~210 km': '~210 km',
  '~210 km from Fortaleza · ~60 km from Jericoacoara':
    '~210 km de Fortaleza · ~60 km de Jericoacoara',
  '~60 km': '~60 km',
  'À la carte restaurant with a menu signed by Chef Léo Parente, specialising in seafood — plus the Nau Rooftop Lounge for the end of the day.':
    'Restaurante à la carte con menú firmado por el Chef Léo Parente, especializado en mariscos — y el Nau Rooftop Lounge para el final de la tarde.',
};

function unescape(str, quote) {
  return str.replace(new RegExp(`\\\\${quote}`, 'g'), quote).replace(/\\\\/g, '\\');
}

function escape(str, quote) {
  return str.replace(/\\/g, '\\\\').replace(new RegExp(quote, 'g'), `\\${quote}`);
}

function transform(source) {
  const missing = new Set();
  let lastEn = '';
  const out = source.replace(
    /(\b(?:en|it):\s*)(['"])((?:\\.|(?!\2).)*)\2(\s*,?)/g,
    (full, prefix, quote, raw, tail, offset) => {
      const key = prefix.trim().startsWith('en') ? 'en' : 'it';
      const value = unescape(raw, quote);
      if (key === 'en') {
        lastEn = value;
        return full;
      }

      const after = source.slice(offset + full.length, offset + full.length + 40);
      if (/\s*es\s*:/.test(after)) return full;

      const translated = ES[lastEn] ?? ES[value];
      if (!translated) {
        missing.add(lastEn || value);
      }
      const esValue = translated ?? lastEn ?? value;
      const indentMatch = source.slice(Math.max(0, offset - 80), offset).match(/(?:\n)([ \t]*)$/);
      const indent = indentMatch ? indentMatch[1] : '      ';
      const needsComma = !tail.includes(',');
      return `${full}${needsComma ? ',' : ''}\n${indent}es: ${quote}${escape(esValue, quote)}${quote}${tail.includes(',') ? ',' : ''}`;
    },
  );

  return { out, missing };
}

let allMissing = new Set();
for (const file of FILES) {
  const src = fs.readFileSync(file, 'utf8');
  const { out, missing } = transform(src);
  missing.forEach((m) => allMissing.add(m));
  fs.writeFileSync(file, out);
  console.log('updated', file);
}

if (allMissing.size) {
  console.log('\nMISSING', allMissing.size);
  for (const m of [...allMissing].sort()) console.log(' -', JSON.stringify(m));
  process.exitCode = 1;
} else {
  console.log('all strings mapped');
}
