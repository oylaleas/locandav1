/* ==========================================================================
   CONTEÚDO LOCAL (MOCK TIPADO)
   --------------------------------------------------------------------------
   ⚠️  IMPORTANTE
   Nenhuma informação factual sobre a Locanda dei Venti foi inventada.
   Todo texto descritivo abaixo é PLACEHOLDER explícito ("[CONTEÚDO A DEFINIR]")
   descrevendo apenas o TIPO de conteúdo que deve ocupar cada espaço.

   A arquitetura de informação (seções/ordem) é uma PROPOSTA [A VALIDAR].

   Este arquivo é lido exclusivamente por services/contentService.ts.
   Quando existir CMS/API, apenas o service muda — a UI não.
   ========================================================================== */

import type { ContentSection, GalleryDefinition, QrTarget, SiteIdentity } from '@/types/content';

const TBD = {
  'pt-BR': '[CONTEÚDO A DEFINIR]',
  en: '[CONTENT TO BE DEFINED]',
  it: '[CONTENUTO DA DEFINIRE]',
};

export const SITE_IDENTITY: SiteIdentity = {
  name: 'Locanda dei Venti',
  descriptor: {
    'pt-BR': '[DESCRITOR A DEFINIR]',
    en: '[DESCRIPTOR TO BE DEFINED]',
    it: '[DESCRITTORE DA DEFINIRE]',
  },
  attractHeadline: {
    'pt-BR': 'Locanda dei Venti',
    en: 'Locanda dei Venti',
    it: 'Locanda dei Venti',
  },
  attractSubhead: {
    'pt-BR': 'Conheça a Locanda em imagens, vídeos e informações.',
    en: 'Discover the Locanda through images, videos and information.',
    it: 'Scopri la Locanda tra immagini, video e informazioni.',
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
    // Nenhum dado de contato foi fornecido — nada é inventado aqui.
    addressLine: TBD,
    phone: TBD,
    email: TBD,
    website: TBD,
    hasRealData: false,
  },
};

export const QR_TARGETS: QrTarget[] = [
  {
    id: 'qr-site',
    // URL de desenvolvimento explicitamente marcada — NÃO é o site real.
    url: 'https://exemplo.invalid/locanda-dei-venti?utm_source=totem#URL-A-DEFINIR',
    isPlaceholder: true,
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
      'pt-BR': 'Site oficial da Locanda dei Venti [URL A DEFINIR]',
      en: 'Locanda dei Venti official website [URL TO BE DEFINED]',
      it: 'Sito ufficiale della Locanda dei Venti [URL DA DEFINIRE]',
    },
  },
  {
    id: 'qr-contato',
    url: 'https://exemplo.invalid/locanda-dei-venti/contato#URL-A-DEFINIR',
    isPlaceholder: true,
    title: {
      'pt-BR': 'Fale com a Locanda',
      en: 'Contact the Locanda',
      it: 'Contatta la Locanda',
    },
    instruction: {
      'pt-BR': 'Aponte a câmera do seu celular para abrir os contatos.',
      en: 'Point your phone camera to open the contact details.',
      it: 'Inquadra con la fotocamera per aprire i contatti.',
    },
    destinationLabel: {
      'pt-BR': 'Página de contato [URL A DEFINIR]',
      en: 'Contact page [URL TO BE DEFINED]',
      it: 'Pagina contatti [URL DA DEFINIRE]',
    },
  },
  {
    id: 'qr-galeria',
    url: 'https://exemplo.invalid/locanda-dei-venti/galeria#URL-A-DEFINIR',
    isPlaceholder: true,
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
      'pt-BR': 'Galeria completa [URL A DEFINIR]',
      en: 'Full gallery [URL TO BE DEFINED]',
      it: 'Galleria completa [URL DA DEFINIRE]',
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
      'pt-BR': 'Apresentação institucional da Locanda dei Venti. [CONTEÚDO A DEFINIR]',
      en: 'Institutional presentation of Locanda dei Venti. [CONTENT TO BE DEFINED]',
      it: 'Presentazione istituzionale della Locanda dei Venti. [CONTENUTO DA DEFINIRE]',
    },
    heroImageId: 'img-01',
    contentPending: true,
    blocks: [
      {
        type: 'paragraph',
        text: {
          'pt-BR':
            'Espaço reservado ao texto institucional de apresentação da Locanda dei Venti. [CONTEÚDO A DEFINIR — fornecer texto oficial]',
          en: 'Reserved space for the institutional presentation text. [CONTENT TO BE DEFINED — official copy required]',
          it: 'Spazio riservato al testo istituzionale di presentazione. [CONTENUTO DA DEFINIRE — testo ufficiale]',
        },
      },
      {
        type: 'paragraph',
        text: {
          'pt-BR':
            'Segundo parágrafo do texto institucional (história, proposta, filosofia de hospitalidade). [CONTEÚDO A DEFINIR]',
          en: 'Second paragraph of the institutional text (history, purpose, hospitality philosophy). [CONTENT TO BE DEFINED]',
          it: 'Secondo paragrafo del testo istituzionale (storia, proposta, filosofia). [CONTENUTO DA DEFINIRE]',
        },
      },
    ],
    facts: [
      {
        id: 'fact-locanda-1',
        icon: 'info',
        label: { 'pt-BR': 'Destaque', en: 'Highlight', it: 'In evidenza' },
        value: TBD,
      },
    ],
    galleryImageIds: ['img-01', 'img-05', 'img-02'],
    videoIds: ['video-institucional'],
    qrTargetId: 'qr-site',
    relatedSlugs: ['acomodacoes', 'gastronomia'],
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
        'Apresentação das acomodações. Tipos, quantidade e características ainda não informados. [CONTEÚDO A DEFINIR]',
      en: 'Accommodation overview. Types, quantity and features not provided yet. [CONTENT TO BE DEFINED]',
      it: 'Panoramica delle camere. Tipologie e caratteristiche non ancora fornite. [CONTENUTO DA DEFINIRE]',
    },
    heroImageId: 'img-05',
    contentPending: true,
    blocks: [
      {
        type: 'paragraph',
        text: {
          'pt-BR':
            'Descrição das acomodações. Nenhuma característica, capacidade, comodidade ou preço foi informado — este espaço aguarda o conteúdo oficial. [CONTEÚDO A DEFINIR]',
          en: 'Accommodation description. No feature, capacity, amenity or price was provided — awaiting official content. [CONTENT TO BE DEFINED]',
          it: 'Descrizione delle camere. Nessuna caratteristica o prezzo è stato fornito — in attesa dei contenuti ufficiali. [CONTENUTO DA DEFINIRE]',
        },
      },
      {
        type: 'list',
        title: {
          'pt-BR': 'Itens a confirmar com a Locanda',
          en: 'Items to confirm with the Locanda',
          it: 'Elementi da confermare con la Locanda',
        },
        items: [
          {
            'pt-BR': 'Tipos de acomodação [A DEFINIR]',
            en: 'Room types [TO BE DEFINED]',
            it: 'Tipologie di camera [DA DEFINIRE]',
          },
          {
            'pt-BR': 'Comodidades [A DEFINIR]',
            en: 'Amenities [TO BE DEFINED]',
            it: 'Servizi [DA DEFINIRE]',
          },
          {
            'pt-BR': 'Política de reservas [A DEFINIR]',
            en: 'Booking policy [TO BE DEFINED]',
            it: 'Politica di prenotazione [DA DEFINIRE]',
          },
        ],
      },
    ],
    facts: [
      {
        id: 'fact-acomodacoes-1',
        icon: 'bed',
        label: { 'pt-BR': 'Tipos', en: 'Types', it: 'Tipologie' },
        value: TBD,
      },
      {
        id: 'fact-acomodacoes-2',
        icon: 'info',
        label: { 'pt-BR': 'Capacidade', en: 'Capacity', it: 'Capienza' },
        value: TBD,
      },
    ],
    galleryImageIds: ['img-05', 'img-01', 'img-04'],
    videoIds: [],
    qrTargetId: 'qr-contato',
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
        'Espaço para a proposta gastronômica. Serviços, horários e cardápio não informados. [CONTEÚDO A DEFINIR]',
      en: 'Space for the dining proposal. Services, hours and menu not provided. [CONTENT TO BE DEFINED]',
      it: 'Spazio per la proposta gastronomica. Servizi e orari non forniti. [CONTENUTO DA DEFINIRE]',
    },
    heroImageId: 'img-06',
    contentPending: true,
    blocks: [
      {
        type: 'paragraph',
        text: {
          'pt-BR':
            'Descrição da experiência gastronômica. Não há informação oficial sobre serviços, horários ou cardápio. [CONTEÚDO A DEFINIR]',
          en: 'Dining experience description. No official information about services, hours or menu. [CONTENT TO BE DEFINED]',
          it: 'Descrizione dell’esperienza gastronomica. Nessuna informazione ufficiale. [CONTENUTO DA DEFINIRE]',
        },
      },
      {
        type: 'quote',
        text: {
          'pt-BR': 'Citação institucional opcional. [CONTEÚDO A DEFINIR]',
          en: 'Optional institutional quote. [CONTENT TO BE DEFINED]',
          it: 'Citazione istituzionale opzionale. [CONTENUTO DA DEFINIRE]',
        },
      },
    ],
    facts: [
      {
        id: 'fact-gastronomia-1',
        icon: 'dining',
        label: { 'pt-BR': 'Serviços', en: 'Services', it: 'Servizi' },
        value: TBD,
      },
      {
        id: 'fact-gastronomia-2',
        icon: 'info',
        label: { 'pt-BR': 'Horários', en: 'Hours', it: 'Orari' },
        value: TBD,
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
      'pt-BR': 'Experiências oferecidas ou sugeridas. [CONTEÚDO A DEFINIR]',
      en: 'Offered or suggested experiences. [CONTENT TO BE DEFINED]',
      it: 'Esperienze offerte o suggerite. [CONTENUTO DA DEFINIRE]',
    },
    heroImageId: 'img-03',
    contentPending: true,
    blocks: [
      {
        type: 'paragraph',
        text: {
          'pt-BR':
            'Descrição das experiências. Nenhuma atividade, parceria ou roteiro foi informado. [CONTEÚDO A DEFINIR]',
          en: 'Experiences description. No activity or itinerary was provided. [CONTENT TO BE DEFINED]',
          it: 'Descrizione delle esperienze. Nessuna attività fornita. [CONTENUTO DA DEFINIRE]',
        },
      },
    ],
    facts: [],
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
      'pt-BR': 'Território, paisagem e pontos de interesse próximos. [CONTEÚDO A DEFINIR]',
      en: 'Territory, landscape and nearby points of interest. [CONTENT TO BE DEFINED]',
      it: 'Territorio, paesaggio e punti di interesse. [CONTENUTO DA DEFINIRE]',
    },
    heroImageId: 'img-04',
    contentPending: true,
    blocks: [
      {
        type: 'paragraph',
        text: {
          'pt-BR':
            'Descrição do entorno. Nenhum ponto de interesse, distância ou parceria foi informado. [CONTEÚDO A DEFINIR]',
          en: 'Surroundings description. No point of interest or distance was provided. [CONTENT TO BE DEFINED]',
          it: 'Descrizione dei dintorni. Nessun punto di interesse fornito. [CONTENUTO DA DEFINIRE]',
        },
      },
    ],
    facts: [],
    galleryImageIds: ['img-04', 'img-03', 'img-02'],
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
        'Endereço, acessos e contatos. Nenhum dado real foi fornecido. [CONTEÚDO A DEFINIR]',
      en: 'Address, access and contacts. No real data provided. [CONTENT TO BE DEFINED]',
      it: 'Indirizzo, accessi e contatti. Nessun dato reale fornito. [CONTENUTO DA DEFINIRE]',
    },
    heroImageId: 'img-02',
    contentPending: true,
    blocks: [
      {
        type: 'paragraph',
        text: {
          'pt-BR':
            'Instruções de acesso à Locanda. Endereço, telefone e coordenadas serão exibidos aqui quando fornecidos oficialmente. [CONTEÚDO A DEFINIR]',
          en: 'Access instructions. Address, phone and coordinates will appear here once officially provided. [CONTENT TO BE DEFINED]',
          it: 'Istruzioni di accesso. Indirizzo e contatti appariranno qui una volta forniti. [CONTENUTO DA DEFINIRE]',
        },
      },
    ],
    facts: [
      {
        id: 'fact-endereco',
        icon: 'map-pin',
        label: { 'pt-BR': 'Endereço', en: 'Address', it: 'Indirizzo' },
        value: TBD,
      },
      {
        id: 'fact-telefone',
        icon: 'info',
        label: { 'pt-BR': 'Telefone', en: 'Phone', it: 'Telefono' },
        value: TBD,
      },
      {
        id: 'fact-email',
        icon: 'info',
        label: { 'pt-BR': 'E-mail', en: 'E-mail', it: 'E-mail' },
        value: TBD,
      },
    ],
    galleryImageIds: [],
    videoIds: [],
    qrTargetId: 'qr-contato',
    relatedSlugs: ['a-locanda'],
  },
];

export const GALLERIES: GalleryDefinition[] = [
  {
    id: 'gallery-principal',
    title: { 'pt-BR': 'Galeria', en: 'Gallery', it: 'Galleria' },
    description: {
      'pt-BR': 'Imagens da Locanda dei Venti. [FOTOGRAFIAS REAIS A DEFINIR]',
      en: 'Images of Locanda dei Venti. [REAL PHOTOGRAPHS TO BE DEFINED]',
      it: 'Immagini della Locanda dei Venti. [FOTOGRAFIE REALI DA DEFINIRE]',
    },
    imageIds: ['img-01', 'img-05', 'img-02', 'img-06', 'img-03', 'img-04', 'img-attract'],
  },
];
