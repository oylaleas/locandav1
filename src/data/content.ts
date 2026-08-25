/* ==========================================================================
   CONTEÚDO INSTITUCIONAL — LOCANDA DEI VENTI
   --------------------------------------------------------------------------
   Conteúdo compilado a partir do site oficial (locandadeiventi.com.br),
   fornecido pelo responsável. Textos, contatos, estrutura, acomodações e
   valores são os publicados oficialmente.

   🔤  EN/IT: traduções do conteúdo original em pt-BR, preservando os fatos.
       Nomes próprios (Chef Léo Parente, Isla Kite Center, Nau Rooftop Lounge, nomes
       de praias/locais) são mantidos em todos os idiomas.
   📌  Pontos marcados [A CONFIRMAR] / [A VALIDAR] não foram inventados.

   Este arquivo é lido exclusivamente por services/contentService.ts.
   Quando existir CMS/API, apenas o service muda — a UI não.
   ========================================================================== */

import type { ContentSection, QrTarget, SiteIdentity } from '@/types/content';

export const SITE_IDENTITY: SiteIdentity = {
  name: 'Locanda dei Venti',
  descriptor: {
    'pt-BR': 'Hotel na Ilha do Guajiru',
    en: 'Hotel on Ilha do Guajiru',
    it: "Hotel sull'Ilha do Guajiru",
  },
  attractHeadline: {
    'pt-BR': 'Locanda dei Venti',
    en: 'Locanda dei Venti',
    it: 'Locanda dei Venti',
  },
  attractSubhead: {
    'pt-BR': 'Hotel e experiências na Ilha do Guajiru, Itarema — Ceará.',
    en: 'Hotel and experiences on Ilha do Guajiru, Itarema — Ceará.',
    it: "Hotel ed esperienze sull'Ilha do Guajiru, Itarema — Ceará.",
  },
  attractCallToAction: {
    'pt-BR': 'Toque na tela para começar',
    en: 'Touch the screen to begin',
    it: 'Tocca lo schermo per iniziare',
  },
  homeWelcome: {
    'pt-BR': 'Bem-vindo',
    en: 'Welcome',
    it: 'Benvenuto',
  },
  homeIntro: {
    'pt-BR': 'Escolha por onde deseja começar.',
    en: 'Choose where you would like to begin.',
    it: 'Scegli da dove vuoi iniziare.',
  },
  contact: {
    addressLine: {
      'pt-BR': 'Av. Costeira, S/N — Ilha do Guajiru, Itarema, CE — CEP 62590-000, Brasil',
      en: 'Av. Costeira, S/N — Ilha do Guajiru, Itarema, CE — CEP 62590-000, Brazil',
      it: 'Av. Costeira, S/N — Ilha do Guajiru, Itarema, CE — CEP 62590-000, Brasile',
    },
    phone: {
      'pt-BR': '+55 88 99219-1175',
      en: '+55 88 99219-1175',
      it: '+55 88 99219-1175',
    },
    email: {
      'pt-BR': 'locanda@locandadeiventi.com.br',
      en: 'locanda@locandadeiventi.com.br',
      it: 'locanda@locandadeiventi.com.br',
    },
    website: {
      'pt-BR': 'locandadeiventi.com.br',
      en: 'locandadeiventi.com.br',
      it: 'locandadeiventi.com.br',
    },
    hasRealData: true,
  },
};

/**
 * QR Codes de handoff totem → smartphone.
 * URLs reais fornecidas pelo responsável (site, WhatsApp, Instagram,
 * reservas CloudBeds). Nenhuma URL foi inventada.
 */
export const QR_TARGETS: QrTarget[] = [
  {
    id: 'qr-site',
    url: 'https://locandadeiventi.com.br',
    isPlaceholder: false,
    title: {
      'pt-BR': 'Leve a Locanda com você',
      en: 'Take the Locanda with you',
      it: 'Porta con te la Locanda',
    },
    instruction: {
      'pt-BR': 'Aponte a câmera do seu celular para o código.',
      en: 'Point your phone camera at the code.',
      it: 'Inquadra il codice con la fotocamera del telefono.',
    },
    destinationLabel: {
      'pt-BR': 'Site oficial da Locanda dei Venti',
      en: 'Locanda dei Venti official website',
      it: 'Sito ufficiale della Locanda dei Venti',
    },
  },
  {
    id: 'qr-contato',
    url: 'https://wa.me/55889921175',
    isPlaceholder: false,
    title: {
      'pt-BR': 'Fale com a Locanda',
      en: 'Contact the Locanda',
      it: 'Contatta la Locanda',
    },
    instruction: {
      'pt-BR': 'Aponte a câmera do seu celular para abrir o WhatsApp.',
      en: 'Point your phone camera to open WhatsApp.',
      it: 'Inquadra con la fotocamera per aprire WhatsApp.',
    },
    destinationLabel: {
      'pt-BR': 'WhatsApp — +55 88 99219-1175',
      en: 'WhatsApp — +55 88 99219-1175',
      it: 'WhatsApp — +55 88 99219-1175',
    },
  },
  {
    id: 'qr-galeria',
    url: 'https://instagram.com/locandadeiventi',
    isPlaceholder: false,
    title: {
      'pt-BR': 'Galeria no seu celular',
      en: 'Gallery on your phone',
      it: 'Galleria sul tuo telefono',
    },
    instruction: {
      'pt-BR': 'Aponte a câmera do seu celular para continuar vendo as fotos.',
      en: 'Point your phone camera to keep browsing the photos.',
      it: 'Inquadra con la fotocamera per continuare a vedere le foto.',
    },
    destinationLabel: {
      'pt-BR': 'Instagram — @locandadeiventi',
      en: 'Instagram — @locandadeiventi',
      it: 'Instagram — @locandadeiventi',
    },
  },
  {
    id: 'qr-reservas',
    url: 'https://hotels.cloudbeds.com/pt-br/reservas/1qdfuA',
    isPlaceholder: false,
    title: {
      'pt-BR': 'Reserve sua estadia',
      en: 'Book your stay',
      it: 'Prenota il tuo soggiorno',
    },
    instruction: {
      'pt-BR': 'Aponte a câmera do seu celular para abrir as reservas.',
      en: 'Point your phone camera to open the booking page.',
      it: 'Inquadra con la fotocamera per aprire le prenotazioni.',
    },
    destinationLabel: {
      'pt-BR': 'Reservas online — CloudBeds',
      en: 'Online booking — CloudBeds',
      it: 'Prenotazioni online — CloudBeds',
    },
  },
];

/**
 * Seções institucionais.
 * A ordem define a navegação da Home.
 */
export const CONTENT_SECTIONS: ContentSection[] = [
  {
    slug: 'a-locanda',
    order: 1,
    icon: 'info',
    title: { 'pt-BR': 'A Locanda', en: 'The Locanda', it: 'La Locanda' },
    tagline: {
      'pt-BR': 'Quem somos',
      en: 'Who we are',
      it: 'Chi siamo',
    },
    summary: {
      'pt-BR':
        'Hotel de frente para uma baía de águas calmas ("flat water"), ideal para esportes aquáticos e contato com a natureza. Arquitetura moderna com detalhes rústicos.',
      en: 'Hotel facing a calm-water bay ("flat water"), ideal for water sports and contact with nature. Modern architecture with rustic details.',
      it: 'Hotel affacciato su una baia dalle acque calme ("flat water"), ideale per sport acquatici e contatto con la natura. Architettura moderna con dettagli rustici.',
    },
    heroImageId: 'img-01',
    contentPending: false,
    blocks: [
      {
        type: 'paragraph',
        text: {
          'pt-BR':
            'A Locanda dei Venti é um hotel de frente para uma baía de águas calmas ("flat water"), ideal para esportes aquáticos e contato com a natureza. A arquitetura moderna combina-se a detalhes rústicos, em uma estrutura com 20 suítes completas, restaurante, bar e piscina.',
          en: 'Locanda dei Venti is a hotel facing a calm-water bay ("flat water"), ideal for water sports and contact with nature. Modern architecture blends with rustic details, in a property with 20 full suites, restaurant, bar and pool.',
          it: 'La Locanda dei Venti è un hotel affacciato su una baia dalle acque calme ("flat water"), ideale per sport acquatici e contatto con la natura. L’architettura moderna si unisce a dettagli rustici, in una struttura con 20 suite complete, ristorante, bar e piscina.',
        },
      },
      {
        type: 'paragraph',
        text: {
          'pt-BR':
            'Missão — atender clientes com excelência, solicitude e bom humor, garantindo uma estadia confortável e livre de preocupações, contribuindo também para o turismo local e a preservação ambiental.',
          en: 'Mission — to serve guests with excellence, care and good humour, ensuring a comfortable, worry-free stay, while also contributing to local tourism and environmental preservation.',
          it: 'Mission — servire gli ospiti con eccellenza, premura e buon umore, garantendo un soggiorno confortevole e senza pensieri, contribuendo anche al turismo locale e alla preservazione ambientale.',
        },
      },
      {
        type: 'paragraph',
        text: {
          'pt-BR':
            'Visão — ser referência em bom atendimento e estrutura, buscando modernização constante e boas relações humanas.',
          en: 'Vision — to be a benchmark in service and facilities, constantly seeking modernization and good human relations.',
          it: 'Vision — essere un punto di riferimento per servizio e struttura, cercando una costante modernizzazione e buone relazioni umane.',
        },
      },
      {
        type: 'paragraph',
        text: {
          'pt-BR':
            'Valores — comprometimento, excelência de qualidade, profissionalismo, otimismo, ética, inovação, responsabilidade social e ambiental e valorização dos recursos humanos.',
          en: 'Values — commitment, quality excellence, professionalism, optimism, ethics, innovation, social and environmental responsibility, and appreciation of human resources.',
          it: 'Valori — impegno, eccellenza della qualità, professionalità, ottimismo, etica, innovazione, responsabilità sociale e ambientale e valorizzazione delle risorse umane.',
        },
      },
    ],
    facts: [
      {
        id: 'fact-locanda-suites',
        icon: 'bed',
        label: { 'pt-BR': 'Suítes', en: 'Suites', it: 'Suite' },
        value: { 'pt-BR': '20 suítes completas', en: '20 full suites', it: '20 suite complete' },
      },
      {
        id: 'fact-locanda-terreno',
        icon: 'map-pin',
        label: { 'pt-BR': 'Terreno', en: 'Land', it: 'Terreno' },
        value: { 'pt-BR': '2.500 m²', en: '2,500 m²', it: '2.500 m²' },
      },
      {
        id: 'fact-locanda-construido',
        icon: 'info',
        label: { 'pt-BR': 'Área construída', en: 'Built area', it: 'Superficie costruita' },
        value: { 'pt-BR': '1.300 m²', en: '1,300 m²', it: '1.300 m²' },
      },
      {
        id: 'fact-locanda-distancias',
        icon: 'compass',
        label: { 'pt-BR': 'Localização', en: 'Location', it: 'Posizione' },
        value: {
          'pt-BR': '~210 km de Fortaleza · ~60 km de Jericoacoara',
          en: '~210 km from Fortaleza · ~60 km from Jericoacoara',
          it: '~210 km da Fortaleza · ~60 km da Jericoacoara',
        },
      },
    ],
    galleryImageIds: ['img-01', 'img-05', 'img-02'],
    videoIds: ['video-institucional'],
    qrTargetId: 'qr-site',
    relatedSlugs: ['acomodacoes'],
  },
  {
    slug: 'acomodacoes',
    order: 2,
    icon: 'bed',
    title: { 'pt-BR': 'Acomodações', en: 'Accommodation', it: 'Camere' },
    tagline: {
      'pt-BR': 'Onde descansar',
      en: 'Where to rest',
      it: 'Dove riposare',
    },
    summary: {
      'pt-BR':
        '20 suítes climatizadas em quatro categorias — Frente Mar e Frente Jardim, em andar superior e térreo.',
      en: '20 air-conditioned suites in four categories — Sea Front and Garden Front, upper and ground floor.',
      it: '20 suite climatizzate in quattro categorie — fronte mare e fronte giardino, piano superiore e terreno.',
    },
    heroImageId: 'img-05',
    contentPending: false,
    blocks: [
      {
        type: 'paragraph',
        text: {
          'pt-BR':
            'São 20 suítes climatizadas, com capacidade para até 3 pessoas cada, divididas em quatro categorias: Suíte Superior Frente Mar, Suíte Inferior Frente Mar, Suíte Superior Frente Jardim e Suíte Inferior Frente Jardim.',
          en: 'There are 20 air-conditioned suites, sleeping up to 3 people each, in four categories: Upper Sea Front Suite, Ground Sea Front Suite, Upper Garden Front Suite and Ground Garden Front Suite.',
          it: 'Ci sono 20 suite climatizzate, con capacità fino a 3 persone ciascuna, in quattro categorie: Suite Superior fronte mare, Suite Inferior fronte mare, Suite Superior fronte giardino e Suite Inferior fronte giardino.',
        },
      },
      {
        type: 'paragraph',
        text: {
          'pt-BR': 'Suíte Superior Frente Mar — 6 unidades, andar superior, com vista total para a barra/mar.',
          en: 'Upper Sea Front Suite — 6 units, upper floor, full view of the bar/mouth of the sea.',
          it: 'Suite Superior fronte mare — 6 unità, piano superiore, vista totale sulla barra/mare.',
        },
      },
      {
        type: 'list',
        title: { 'pt-BR': 'Destaques da suíte', en: 'Suite highlights', it: 'Punti salienti della suite' },
        items: [
          {
            'pt-BR': '23 m²',
            en: '23 m²',
            it: '23 m²',
          },
          {
            'pt-BR': 'Aquecimento solar',
            en: 'Solar heating',
            it: 'Riscaldamento solare',
          },
          {
            'pt-BR': 'Ar-condicionado 12.000 BTUs',
            en: '12,000 BTU air conditioning',
            it: 'Aria condizionata 12.000 BTU',
          },
          {
            'pt-BR': 'Até 3 pessoas',
            en: 'Up to 3 people',
            it: 'Fino a 3 persone',
          },
          {
            'pt-BR': 'Cama queen',
            en: 'Queen bed',
            it: 'Letto queen',
          },
          {
            'pt-BR': 'Frigobar',
            en: 'Mini bar',
            it: 'Frigobar',
          },
          {
            'pt-BR': 'TV LCD 32" (Sky)',
            en: '32" LCD TV (Sky)',
            it: 'TV LCD 32" (Sky)',
          },
          {
            'pt-BR': 'Banheiro tamanho família',
            en: 'Family-size bathroom',
            it: 'Bagno di dimensioni familiari',
          },
          {
            'pt-BR': 'Varanda',
            en: 'Balcony',
            it: 'Balcone',
          },
        ],
      },
      {
        type: 'paragraph',
        text: {
          'pt-BR': 'Suíte Inferior Frente Mar — 6 unidades, térreo, com vista total para a barra/mar.',
          en: 'Ground Sea Front Suite — 6 units, ground floor, full view of the bar/mouth of the sea.',
          it: 'Suite Inferior fronte mare — 6 unità, piano terra, vista totale sulla barra/mare.',
        },
      },
      {
        type: 'list',
        title: { 'pt-BR': 'Destaques da suíte', en: 'Suite highlights', it: 'Punti salienti della suite' },
        items: [
          {
            'pt-BR': '21 m²',
            en: '21 m²',
            it: '21 m²',
          },
          {
            'pt-BR': 'Aquecimento solar',
            en: 'Solar heating',
            it: 'Riscaldamento solare',
          },
          {
            'pt-BR': 'Ar-condicionado 12.000 BTUs',
            en: '12,000 BTU air conditioning',
            it: 'Aria condizionata 12.000 BTU',
          },
          {
            'pt-BR': 'Até 3 pessoas',
            en: 'Up to 3 people',
            it: 'Fino a 3 persone',
          },
          {
            'pt-BR': 'Cama queen',
            en: 'Queen bed',
            it: 'Letto queen',
          },
          {
            'pt-BR': 'Frigobar',
            en: 'Mini bar',
            it: 'Frigobar',
          },
          {
            'pt-BR': 'TV LCD 32" (Sky)',
            en: '32" LCD TV (Sky)',
            it: 'TV LCD 32" (Sky)',
          },
          {
            'pt-BR': 'Jardim exclusivo',
            en: 'Private garden',
            it: 'Giardino esclusivo',
          },
          {
            'pt-BR': 'Varanda',
            en: 'Balcony',
            it: 'Balcone',
          },
        ],
      },
      {
        type: 'paragraph',
        text: {
          'pt-BR':
            'Os detalhes das suítes Frente Jardim (Superior e Inferior) ainda não foram publicados no site oficial. [A CONFIRMAR COM A GESTÃO DA LOCANDA]',
          en: 'The details of the Garden Front suites (Upper and Ground) have not yet been published on the official website. [TO BE CONFIRMED WITH LOCANDA MANAGEMENT]',
          it: 'I dettagli delle suite fronte giardino (Superior e Inferior) non sono ancora stati pubblicati sul sito ufficiale. [DA CONFERMARE CON LA GESTIONE DELLA LOCANDA]',
        },
      },
    ],
    facts: [
      {
        id: 'fact-acomodacoes-total',
        icon: 'bed',
        label: { 'pt-BR': 'Suítes', en: 'Suites', it: 'Suite' },
        value: {
          'pt-BR': '20 climatizadas · até 3 pessoas',
          en: '20 air-conditioned · up to 3 people',
          it: '20 climatizzate · fino a 3 persone',
        },
      },
      {
        id: 'fact-acomodacoes-categorias',
        icon: 'info',
        label: { 'pt-BR': 'Categorias', en: 'Categories', it: 'Categorie' },
        value: { 'pt-BR': '4 — Frente Mar e Frente Jardim', en: '4 — Sea Front and Garden Front', it: '4 — fronte mare e fronte giardino' },
      },
      {
        id: 'fact-acomodacoes-superior',
        icon: 'info',
        label: { 'pt-BR': 'Superior Frente Mar', en: 'Upper Sea Front', it: 'Superior fronte mare' },
        value: { 'pt-BR': '6 unidades · 23 m²', en: '6 units · 23 m²', it: '6 unità · 23 m²' },
      },
      {
        id: 'fact-acomodacoes-inferior',
        icon: 'info',
        label: { 'pt-BR': 'Inferior Frente Mar', en: 'Ground Sea Front', it: 'Inferior fronte mare' },
        value: { 'pt-BR': '6 unidades · 21 m²', en: '6 units · 21 m²', it: '6 unità · 21 m²' },
      },
    ],
    galleryImageIds: ['img-05', 'img-01', 'img-04'],
    videoIds: [],
    qrTargetId: 'qr-reservas',
    relatedSlugs: ['a-locanda', 'experiencias'],
  },
  {
    slug: 'gastronomia',
    order: 3,
    icon: 'dining',
    title: { 'pt-BR': 'Gastronomia', en: 'Dining', it: 'Ristorazione' },
    tagline: {
      'pt-BR': 'À mesa',
      en: 'At the table',
      it: 'A tavola',
    },
    summary: {
      'pt-BR':
        'Restaurante à la carte com cardápio assinado pelo Chef Léo Parente, especializado em frutos do mar — e o Nau Rooftop Lounge para o fim de tarde.',
      en: 'À la carte restaurant with a menu signed by Chef Léo Parente, specialising in seafood — plus the Nau Rooftop Lounge for the end of the day.',
      it: 'Ristorante à la carte con menu firmato dallo Chef Léo Parente, specializzato in frutti di mare — e il Nau Rooftop Lounge per il fine giornata.',
    },
    heroImageId: 'img-06',
    contentPending: false,
    blocks: [
      {
        type: 'paragraph',
        text: {
          'pt-BR':
            'O restaurante da Locanda é à la carte, com cardápio assinado pelo Chef Léo Parente e especializado em frutos do mar.',
          en: 'The Locanda restaurant is à la carte, with a menu signed by Chef Léo Parente and specialising in seafood.',
          it: 'Il ristorante della Locanda è à la carte, con un menu firmato dallo Chef Léo Parente e specializzato in frutti di mare.',
        },
      },
      {
        type: 'paragraph',
        text: {
          'pt-BR':
            'O bar reúne bebidas variadas, e o Nau Rooftop Lounge é o novo espaço de "fim de tarde" da Locanda, unindo boa música, conforto e sofisticação na Ilha do Guajiru.',
          en: 'The bar offers a variety of drinks, and the Nau Rooftop Lounge is the Locanda’s new "end of day" space, combining good music, comfort and sophistication on Ilha do Guajiru.',
          it: 'Il bar offre una varietà di bevande, e il Nau Rooftop Lounge è il nuovo spazio "fine giornata" della Locanda, unendo buona musica, comfort e raffinatezza sull’Ilha do Guajiru.',
        },
      },
      {
        type: 'paragraph',
        text: {
          'pt-BR': 'O café da manhã está incluso na diária.',
          en: 'Breakfast is included in the rate.',
          it: 'La colazione è inclusa nella tariffa.',
        },
      },
    ],
    facts: [
      {
        id: 'fact-gastronomia-chef',
        icon: 'dining',
        label: { 'pt-BR': 'Chef', en: 'Chef', it: 'Chef' },
        value: { 'pt-BR': 'Léo Parente', en: 'Léo Parente', it: 'Léo Parente' },
      },
      {
        id: 'fact-gastronomia-cardapio',
        icon: 'dining',
        label: { 'pt-BR': 'Especialidade', en: 'Specialty', it: 'Specialità' },
        value: { 'pt-BR': 'Frutos do mar', en: 'Seafood', it: 'Frutti di mare' },
      },
      {
        id: 'fact-gastronomia-cafe',
        icon: 'check',
        label: { 'pt-BR': 'Café da manhã', en: 'Breakfast', it: 'Colazione' },
        value: { 'pt-BR': 'Incluso na diária', en: 'Included in the rate', it: 'Inclusa nella tariffa' },
      },
      {
        id: 'fact-gastronomia-rooftop',
        icon: 'sun',
        label: { 'pt-BR': 'Nau Rooftop Lounge', en: 'Nau Rooftop Lounge', it: 'Nau Rooftop Lounge' },
        value: {
          'pt-BR': 'Espaço de fim de tarde',
          en: 'End-of-day space',
          it: 'Spazio fine giornata',
        },
      },
    ],
    galleryImageIds: ['img-06', 'img-02'],
    videoIds: [],
    relatedSlugs: ['a-locanda', 'experiencias'],
  },
  {
    slug: 'experiencias',
    order: 4,
    icon: 'compass',
    title: { 'pt-BR': 'Experiências', en: 'Experiences', it: 'Esperienze' },
    tagline: {
      'pt-BR': 'O que viver por aqui',
      en: 'What to live here',
      it: 'Cosa vivere qui',
    },
    summary: {
      'pt-BR':
        'Esportes aquáticos favorecidos pela baía de águas calmas: kitesurf, wakeboard, windsurf, SUP e canoagem.',
      en: 'Water sports favoured by the calm-water bay: kitesurf, wakeboard, windsurf, SUP and canoeing.',
      it: 'Sport acquatici favoriti dalla baia dalle acque calme: kitesurf, wakeboard, windsurf, SUP e canoa.',
    },
    heroImageId: 'img-03',
    contentPending: false,
    blocks: [
      {
        type: 'paragraph',
        text: {
          'pt-BR':
            'A baía de águas calmas ("flat water") em frente à Locanda favorece a prática de esportes aquáticos como kitesurf, wakeboard, windsurf, SUP e canoagem.',
          en: 'The calm-water bay ("flat water") in front of the Locanda favours water sports such as kitesurf, wakeboard, windsurf, SUP and canoeing.',
          it: 'La baia dalle acque calme ("flat water") davanti alla Locanda favorisce sport acquatici come kitesurf, wakeboard, windsurf, SUP e canoa.',
        },
      },
      {
        type: 'paragraph',
        text: {
          'pt-BR':
            'A Locanda mantém parceria com o Isla Kite Center para aulas de kitesurf e oferece espaço para guarda de equipamentos de kite e esportes aquáticos.',
          en: 'The Locanda has a partnership with Isla Kite Center for kitesurf lessons and offers storage space for kite and water sports equipment.',
          it: 'La Locanda ha una partnership con Isla Kite Center per lezioni di kitesurf e offre spazio per custodire attrezzature di kite e sport acquatici.',
        },
      },
      {
        type: 'list',
        title: { 'pt-BR': 'Esportes aquáticos', en: 'Water sports', it: 'Sport acquatici' },
        items: [
          { 'pt-BR': 'Kitesurf', en: 'Kitesurf', it: 'Kitesurf' },
          { 'pt-BR': 'Wakeboard', en: 'Wakeboard', it: 'Wakeboard' },
          { 'pt-BR': 'Windsurf', en: 'Windsurf', it: 'Windsurf' },
          { 'pt-BR': 'SUP', en: 'SUP', it: 'SUP' },
          { 'pt-BR': 'Canoagem', en: 'Canoeing', it: 'Canoa' },
        ],
      },
      {
        type: 'paragraph',
        text: {
          'pt-BR':
            'Passeios e roteiros pela região (Pôr do Sol, Moitas de Icaraí, Almofala e Ilha do Guajiru) estão na área "Experiências e passeios" deste totem.',
          en: 'Tours and routes through the region (Sunset, Moitas de Icaraí, Almofala and Ilha do Guajiru) are in the "Experiences and tours" area of this kiosk.',
          it: 'Tour e itinerari nella regione (Tramonto, Moitas de Icaraí, Almofala e Ilha do Guajiru) si trovano nell’area "Esperienze e tour" di questo totem.',
        },
      },
    ],
    facts: [
      {
        id: 'fact-experiencias-esportes',
        icon: 'compass',
        label: { 'pt-BR': 'Esportes', en: 'Sports', it: 'Sport' },
        value: {
          'pt-BR': 'Kitesurf · Wakeboard · Windsurf · SUP · Canoagem',
          en: 'Kitesurf · Wakeboard · Windsurf · SUP · Canoeing',
          it: 'Kitesurf · Wakeboard · Windsurf · SUP · Canoa',
        },
      },
      {
        id: 'fact-experiencias-soulkite',
        icon: 'info',
        label: { 'pt-BR': 'Aulas de kitesurf', en: 'Kitesurf lessons', it: 'Lezioni di kitesurf' },
        value: { 'pt-BR': 'Isla Kite Center', en: 'Isla Kite Center', it: 'Isla Kite Center' },
      },
    ],
    galleryImageIds: ['img-03', 'img-04'],
    videoIds: ['video-experiencia'],
    qrTargetId: 'qr-site',
    relatedSlugs: ['arredores', 'acomodacoes'],
  },
  {
    slug: 'arredores',
    order: 5,
    icon: 'leaf',
    title: { 'pt-BR': 'Arredores', en: 'Surroundings', it: 'Dintorni' },
    tagline: {
      'pt-BR': 'O território',
      en: 'The territory',
      it: 'Il territorio',
    },
    summary: {
      'pt-BR':
        'A Ilha do Guajiru fica em Itarema, no litoral oeste do Ceará — cerca de 210 km de Fortaleza e 60 km de Jericoacoara.',
      en: 'Ilha do Guajiru is in Itarema, on the west coast of Ceará — about 210 km from Fortaleza and 60 km from Jericoacoara.',
      it: 'L’Ilha do Guajiru si trova a Itarema, sulla costa occidentale del Ceará — circa 210 km da Fortaleza e 60 km da Jericoacoara.',
    },
    heroImageId: 'img-04',
    contentPending: false,
    blocks: [
      {
        type: 'paragraph',
        text: {
          'pt-BR':
            'A Locanda está na Ilha do Guajiru, em Itarema, no litoral oeste do Ceará: cerca de 210 km de Fortaleza e 60 km de Jericoacoara.',
          en: 'The Locanda is on Ilha do Guajiru, in Itarema, on the west coast of Ceará: about 210 km from Fortaleza and 60 km from Jericoacoara.',
          it: 'La Locanda si trova sull’Ilha do Guajiru, a Itarema, sulla costa occidentale del Ceará: circa 210 km da Fortaleza e 60 km da Jericoacoara.',
        },
      },
      {
        type: 'paragraph',
        text: {
          'pt-BR':
            'Os pontos de interesse e os passeios da região estão reunidos na área "Experiências e passeios" deste totem.',
          en: 'Points of interest and tours in the region are gathered in the "Experiences and tours" area of this kiosk.',
          it: 'I punti di interesse e i tour della regione sono raccolti nell’area "Esperienze e tour" di questo totem.',
        },
      },
    ],
    facts: [
      {
        id: 'fact-arredores-fortaleza',
        icon: 'map-pin',
        label: { 'pt-BR': 'Fortaleza', en: 'Fortaleza', it: 'Fortaleza' },
        value: { 'pt-BR': '~210 km', en: '~210 km', it: '~210 km' },
      },
      {
        id: 'fact-arredores-jeri',
        icon: 'map-pin',
        label: { 'pt-BR': 'Jericoacoara', en: 'Jericoacoara', it: 'Jericoacoara' },
        value: { 'pt-BR': '~60 km', en: '~60 km', it: '~60 km' },
      },
      {
        id: 'fact-arredores-regiao',
        icon: 'leaf',
        label: { 'pt-BR': 'Região', en: 'Region', it: 'Regione' },
        value: {
          'pt-BR': 'Itarema · Litoral Oeste do Ceará',
          en: 'Itarema · West Coast of Ceará',
          it: 'Itarema · Costa occidentale del Ceará',
        },
      },
    ],
    galleryImageIds: ['img-04', 'img-03', 'img-02', 'img-07'],
    videoIds: [],
    relatedSlugs: ['experiencias', 'como-chegar'],
  },
  {
    slug: 'como-chegar',
    order: 6,
    icon: 'map-pin',
    title: { 'pt-BR': 'Como chegar', en: 'Getting here', it: 'Come arrivare' },
    tagline: {
      'pt-BR': 'Localização e contato',
      en: 'Location and contact',
      it: 'Posizione e contatti',
    },
    summary: {
      'pt-BR':
        'Av. Costeira, S/N — Ilha do Guajiru, Itarema, CE — CEP 62590-000. Cerca de 210 km de Fortaleza e 60 km de Jericoacoara.',
      en: 'Av. Costeira, S/N — Ilha do Guajiru, Itarema, CE — CEP 62590-000. About 210 km from Fortaleza and 60 km from Jericoacoara.',
      it: 'Av. Costeira, S/N — Ilha do Guajiru, Itarema, CE — CEP 62590-000. Circa 210 km da Fortaleza e 60 km da Jericoacoara.',
    },
    heroImageId: 'img-02',
    contentPending: false,
    blocks: [
      {
        type: 'paragraph',
        text: {
          'pt-BR':
            'Endereço: Av. Costeira, S/N — Ilha do Guajiru, Itarema, CE — CEP 62590-000, Brasil.',
          en: 'Address: Av. Costeira, S/N — Ilha do Guajiru, Itarema, CE — CEP 62590-000, Brazil.',
          it: 'Indirizzo: Av. Costeira, S/N — Ilha do Guajiru, Itarema, CE — CEP 62590-000, Brasile.',
        },
      },
      {
        type: 'paragraph',
        text: {
          'pt-BR': 'A Locanda fica a cerca de 210 km de Fortaleza e 60 km de Jericoacoara.',
          en: 'The Locanda is about 210 km from Fortaleza and 60 km from Jericoacoara.',
          it: 'La Locanda si trova a circa 210 km da Fortaleza e 60 km da Jericoacoara.',
        },
      },
      {
        type: 'paragraph',
        text: {
          'pt-BR': 'Telefone/WhatsApp: +55 88 99219-1175 · E-mail: locanda@locandadeiventi.com.br',
          en: 'Phone/WhatsApp: +55 88 99219-1175 · E-mail: locanda@locandadeiventi.com.br',
          it: 'Telefono/WhatsApp: +55 88 99219-1175 · E-mail: locanda@locandadeiventi.com.br',
        },
      },
    ],
    facts: [
      {
        id: 'fact-endereco',
        icon: 'map-pin',
        label: { 'pt-BR': 'Endereço', en: 'Address', it: 'Indirizzo' },
        value: {
          'pt-BR': 'Av. Costeira, S/N — Ilha do Guajiru, Itarema/CE',
          en: 'Av. Costeira, S/N — Ilha do Guajiru, Itarema/CE',
          it: 'Av. Costeira, S/N — Ilha do Guajiru, Itarema/CE',
        },
      },
      {
        id: 'fact-cep',
        icon: 'info',
        label: { 'pt-BR': 'CEP', en: 'Postal code', it: 'CAP' },
        value: { 'pt-BR': '62590-000', en: '62590-000', it: '62590-000' },
      },
      {
        id: 'fact-telefone',
        icon: 'chat',
        label: { 'pt-BR': 'Telefone/WhatsApp', en: 'Phone/WhatsApp', it: 'Telefono/WhatsApp' },
        value: { 'pt-BR': '+55 88 99219-1175', en: '+55 88 99219-1175', it: '+55 88 99219-1175' },
      },
      {
        id: 'fact-email',
        icon: 'globe',
        label: { 'pt-BR': 'E-mail', en: 'E-mail', it: 'E-mail' },
        value: {
          'pt-BR': 'locanda@locandadeiventi.com.br',
          en: 'locanda@locandadeiventi.com.br',
          it: 'locanda@locandadeiventi.com.br',
        },
      },
    ],
    galleryImageIds: [],
    videoIds: [],
    qrTargetId: 'qr-contato',
    relatedSlugs: ['a-locanda'],
  },
  {
    slug: 'comodidades',
    order: 7,
    icon: 'wifi',
    title: {
      'pt-BR': 'Comodidades de nossos hóspedes',
      en: 'Amenities for our guests',
      it: 'Servizi per i nostri ospiti',
    },
    tagline: {
      'pt-BR': 'Facilidades',
      en: 'Facilities',
      it: 'Strutture',
    },
    summary: {
      'pt-BR': 'Wi-Fi, estacionamento, bar & restaurante, beach tennis, fitness, yoga e muito mais.',
      en: 'Free Wi-Fi, parking, bar & restaurant, beach tennis, fitness, yoga and more.',
      it: 'Wi-Fi, parcheggio, bar & ristorante, beach tennis, fitness, yoga e molto altro.',
    },
    heroImageId: 'img-01',
    contentPending: false,
    blocks: [
      {
        type: 'list',
        title: {
          'pt-BR': 'Comodidades de nossos hóspedes',
          en: 'Amenities for our guests',
          it: 'Servizi per i nostri ospiti',
        },
        items: [
          { 'pt-BR': 'Wi-Fi gratuito', en: 'Free Wi-Fi', it: 'Wi-Fi gratuito' },
          {
            'pt-BR': 'Estacionamento gratuito',
            en: 'Free Parking',
            it: 'Parcheggio gratuito',
          },
          { 'pt-BR': 'Bar & Restaurante', en: 'Bar & Restaurant', it: 'Bar & Ristorante' },
          {
            'pt-BR': 'Quadra de Beach Tennis',
            en: 'Beach Tennis Court',
            it: 'Campo di beach tennis',
          },
          { 'pt-BR': 'Espaço Fitness', en: 'Fitness Space', it: 'Spazio fitness' },
          {
            'pt-BR': 'Yoga e Funcional*',
            en: 'Yoga & Functional Training*',
            it: 'Yoga e functional training*',
          },
          {
            'pt-BR': 'Noites Cinemáticas',
            en: 'Cinematic Nights',
            it: 'Notti cinematografiche',
          },
          { 'pt-BR': 'Piquenique*', en: 'Picnic*', it: 'Picnic*' },
          {
            'pt-BR': 'Auxílio Beach Boy Gratuito',
            en: 'Free Beach Boy Services',
            it: 'Assistenza beach boy gratuita',
          },
          { 'pt-BR': 'Berço Gratuito', en: 'Free Baby Crib', it: 'Culla gratuita' },
          { 'pt-BR': 'Violão', en: 'Acoustic Guitar', it: 'Chitarra acustica' },
          {
            'pt-BR': 'Desenhos para Colorir para Crianças',
            en: 'Drawings for Children',
            it: 'Disegni da colorare per bambini',
          },
        ],
      },
      {
        type: 'paragraph',
        text: {
          'pt-BR':
            '*Atenção, alguns dos serviços descritos não são gratuitos, e têm taxas próprias definidas pelo prestador de serviço. Consulte disponibilidade e valores na recepção.',
          en: '*Please note that some of the services above are not free. Fees are determined by each service provider. Please check availability and rates at the front desk.',
          it: '*Attenzione: alcuni dei servizi descritti non sono gratuiti e hanno tariffe proprie definite dal fornitore del servizio. Consulta disponibilità e valori alla reception.',
        },
      },
    ],
    facts: [],
    galleryImageIds: ['img-01', 'img-05', 'img-03'],
    videoIds: [],
    relatedSlugs: ['experiencias'],
  },
  {
    slug: 'happy-hour',
    order: 8,
    icon: 'cocktail',
    title: { 'pt-BR': 'Happy Hour', en: 'Happy Hour', it: 'Happy Hour' },
    tagline: {
      'pt-BR': 'Fim de tarde na Locanda',
      en: 'Late afternoon at the Locanda',
      it: 'Fine giornata alla Locanda',
    },
    summary: {
      'pt-BR':
        'Happy Hour na Locanda: sextas das 18h às 21h e sábados das 16h às 20h.',
      en: 'Happy Hour at the Locanda: Fridays 6 pm to 9 pm and Saturdays 4 pm to 8 pm.',
      it: 'Happy Hour alla Locanda: venerdì dalle 18 alle 21 e sabato dalle 16 alle 20.',
    },
    heroImageId: 'img-06',
    contentPending: false,
    blocks: [
      {
        type: 'list',
        title: { 'pt-BR': 'Sexta-feira · 18h às 21h', en: 'Friday · 6 pm to 9 pm', it: 'Venerdì · 18-21' },
        items: [
          { 'pt-BR': 'Balde de Heineken 330ml — R$ 48', en: 'Heineken bucket 330ml — R$ 48', it: 'Secchiello Heineken 330ml — R$ 48' },
          { 'pt-BR': 'Balde de Stella Artois 330ml — R$ 48', en: 'Stella Artois bucket 330ml — R$ 48', it: 'Secchiello Stella Artois 330ml — R$ 48' },
        ],
      },
      {
        type: 'list',
        title: { 'pt-BR': 'Sábado · 16h às 20h', en: 'Saturday · 4 pm to 8 pm', it: 'Sabato · 16-20' },
        items: [
          { 'pt-BR': 'Caipirinha Ypióca (1 sabor) — R$ 11', en: 'Ypióca caipirinha (1 flavour) — R$ 11', it: 'Caipirinha Ypióca (1 gusto) — R$ 11' },
          { 'pt-BR': 'Taça de espumante — R$ 17', en: 'Glass of sparkling wine — R$ 17', it: 'Calice di spumante — R$ 17' },
          { 'pt-BR': 'Bons Ventos — R$ 20', en: 'Bons Ventos — R$ 20', it: 'Bons Ventos — R$ 20' },
          { 'pt-BR': 'Croquetes de arraia — R$ 25', en: 'Stingray croquettes — R$ 25', it: 'Crocchette di razza — R$ 25' },
          { 'pt-BR': 'Toasts de carne de sol — R$ 25', en: 'Sun-dried beef toasts — R$ 25', it: 'Toast di carne secca — R$ 25' },
        ],
      },
    ],
    facts: [],
    galleryImageIds: ['img-06', 'img-03'],
    videoIds: [],
    relatedSlugs: ['a-locanda'],
  },
  {
    slug: 'servicos-on-demand',
    order: 9,
    icon: 'bell',
    title: {
      'pt-BR': 'Serviços On Demand',
      en: 'Services On Demand',
      it: 'Servizi On Demand',
    },
    tagline: {
      'pt-BR': 'Sob medida',
      en: 'Tailored',
      it: 'Su misura',
    },
    summary: {
      'pt-BR':
        'Transfer, babá, jantar romântico, piquenique, serviços de beleza e eventos privativos.',
      en: 'Transfer, babysitting, romantic dinner, picnic, beauty services and private events.',
      it: 'Transfer, babysitter, cena romantica, picnic, servizi di bellezza ed eventi privati.',
    },
    heroImageId: 'img-07',
    contentPending: false,
    blocks: [
      {
        type: 'list',
        title: { 'pt-BR': 'Serviços', en: 'Services', it: 'Servizi' },
        items: [
          { 'pt-BR': 'Transfer', en: 'Transfer', it: 'Transfer' },
          { 'pt-BR': 'Babá', en: 'Babysitting', it: 'Babysitter' },
          { 'pt-BR': 'Jantar Romântico', en: 'Romantic Dinner', it: 'Cena romantica' },
          { 'pt-BR': 'Piquenique', en: 'Picnic', it: 'Picnic' },
          {
            'pt-BR': 'Serviços de beleza — Manicure, cabeleireiro, maquiador',
            en: 'Beauty services — Manicure, hair stylist, makeup artist',
            it: 'Servizi di bellezza — Manicure, parrucchiere, truccatore',
          },
          { 'pt-BR': 'Eventos privativos', en: 'Private events', it: 'Eventi privati' },
        ],
      },
      {
        type: 'paragraph',
        text: {
          'pt-BR': 'Todos os serviços acima possuem tarifa definida pelo prestador de serviço.',
          en: 'All services above are charged extra. Consult the prices at the front desk.',
          it: 'Tutti i servizi sopra hanno una tariffa definita dal fornitore del servizio.',
        },
      },
    ],
    facts: [
      {
        id: 'fact-on-demand-tarifa',
        icon: 'info',
        label: { 'pt-BR': 'Tarifas', en: 'Rates', it: 'Tariffe' },
        value: {
          'pt-BR': 'Definidas pelo prestador de serviço — consulte a recepção',
          en: 'Set by each service provider — ask at the front desk',
          it: 'Definite dal fornitore del servizio — chiedere alla reception',
        },
      },
    ],
    galleryImageIds: ['img-07', 'img-01'],
    videoIds: [],
    relatedSlugs: ['a-locanda'],
  },
  {
    slug: 'kite-center',
    order: 10,
    icon: 'kite',
    title: { 'pt-BR': 'Isla Kite Center', en: 'Isla Kite Center', it: 'Isla Kite Center' },
    tagline: {
      'pt-BR': 'Kitesurf na baía',
      en: 'Kitesurf on the bay',
      it: 'Kitesurf sulla baia',
    },
    summary: {
      'pt-BR':
        'Aulas de kitesurf e wingfoil, aluguel de equipamento, supervisão, downwinds e loja — com o Isla Kite Center.',
      en: 'Kitesurf and wingfoil lessons, equipment rental, supervision, downwinds and shop — with Isla Kite Center.',
      it: 'Lezioni di kitesurf e wingfoil, noleggio attrezzature, supervisione, downwinds e negozio — con Isla Kite Center.',
    },
    heroImageId: 'img-03',
    contentPending: false,
    blocks: [
      {
        type: 'paragraph',
        text: {
          'pt-BR':
            'A baía de águas calmas ("flat water") em frente à Locanda favorece a prática de kitesurf e wingfoil. A Locanda mantém parceria com o Isla Kite Center, que oferece:',
          en: 'The calm-water bay ("flat water") in front of the Locanda favours kitesurfing and wingfoiling. The Locanda has a partnership with Isla Kite Center, which offers:',
          it: 'La baia dalle acque calme ("flat water") davanti alla Locanda favorisce kitesurf e wingfoil. La Locanda ha una partnership con Isla Kite Center, che offre:',
        },
      },
      {
        type: 'list',
        title: { 'pt-BR': 'Serviços', en: 'Services', it: 'Servizi' },
        items: [
          {
            'pt-BR': 'Aulas de Kitesurf e Wingfoil',
            en: 'Kitesurf and Wingfoil lessons',
            it: 'Lezioni di kitesurf e wingfoil',
          },
          {
            'pt-BR': 'Aluguel de equipamento',
            en: 'Equipment rental',
            it: 'Noleggio attrezzature',
          },
          {
            'pt-BR': 'Supervisão',
            en: 'Supervision',
            it: 'Supervisione',
          },
          {
            'pt-BR': 'Downwinds',
            en: 'Downwinds',
            it: 'Downwinds',
          },
          {
            'pt-BR': 'Loja de equipamentos e roupas',
            en: 'Equipment and clothing shop',
            it: 'Negozio di attrezzature e abbigliamento',
          },
        ],
      },
      {
        type: 'paragraph',
        text: {
          'pt-BR':
            'Horários, valores, instrutores e contatos do Isla Kite Center: [CONTEÚDO DO KITE CENTER A DEFINIR]',
          en: 'Hours, rates, instructors and contacts of Isla Kite Center: [KITE CENTER CONTENT TO BE DEFINED]',
          it: 'Orari, tariffe, istruttori e contatti di Isla Kite Center: [CONTENUTO DEL KITE CENTER DA DEFINIRE]',
        },
      },
    ],
    facts: [
      {
        id: 'fact-kite-soulkite',
        icon: 'kite',
        label: { 'pt-BR': 'Aulas de kitesurf', en: 'Kitesurf lessons', it: 'Lezioni di kitesurf' },
        value: { 'pt-BR': 'Isla Kite Center', en: 'Isla Kite Center', it: 'Isla Kite Center' },
      },
      {
        id: 'fact-kite-guarda',
        icon: 'check',
        label: { 'pt-BR': 'Equipamentos', en: 'Equipment', it: 'Attrezzature' },
        value: {
          'pt-BR': 'Espaço para guarda de kites e equipamentos',
          en: 'Storage for kites and equipment',
          it: 'Spazio per custodire kite e attrezzature',
        },
      },
    ],
    galleryImageIds: ['img-03', 'img-04'],
    videoIds: [],
    relatedSlugs: ['experiencias', 'a-locanda'],
  },
];

