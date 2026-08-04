/* ==========================================================================
   EXPERIÊNCIAS E PASSEIOS — DADOS CENTRALIZADOS
   --------------------------------------------------------------------------
   Roteiros fornecidos pelo responsável. Valores comerciais (horário, preço,
   capacidade, roteiro) são EXATOS — não aplicar descontos, "a partir de",
   taxas ou condições inventadas. Edite aqui sem tocar na UI.

   🔤  EN/IT: traduções do conteúdo original em pt-BR. Nomes de lugares
       (Guajiru, Icaraí, Almofala, Aracati Mirim/Açu, Espraiada, Torrões,
       Batedeira, Tijuca, Ilha das Ostras, Túnel do Amor, Morro/Praia de
       Patos) são preservados em todos os idiomas.

   📌  Grafia: formas usadas conforme material estruturado recebido
       (o original citava "Guagirú" em um trecho — adotada "Guajiru").
       [VALIDAR GRAFIA] com o responsável.
   ========================================================================== */

import type { Tour } from '@/types/tours';

export const TOURS: Tour[] = [
  {
    id: 'tour-por-do-sol',
    slug: 'por-do-sol',
    title: {
      'pt-BR': 'Passeio Pôr do Sol',
      en: 'Sunset Tour',
      it: 'Tour Tramonto',
    },
    shortDescription: {
      'pt-BR':
        'Saída da Ilha do Guajiru, trilha do mangue, praias, farol e volta pelo rio, com pôr do sol na Praia da Espraiada.',
      en: 'Departure from Ilha do Guajiru, mangrove trail, beaches, lighthouse and return by river, with sunset at Praia da Espraiada.',
      it: 'Partenza dall’Ilha do Guajiru, sentiero di mangrovie, spiagge, faro e ritorno in fiume, con tramonto a Praia da Espraiada.',
    },
    schedule: { start: '15:30', end: '18:30' },
    price: 370,
    currency: 'BRL',
    routeIntro: {
      'pt-BR': 'Saída da Ilha do Guajiru',
      en: 'Departure from Ilha do Guajiru',
      it: 'Partenza dall’Ilha do Guajiru',
    },
    route: [
      {
        'pt-BR': 'Trilha do mangue até o outro lado da ilha',
        en: 'Mangrove trail to the other side of the island',
        it: 'Sentiero di mangrovie fino all’altro lato dell’isola',
      },
      {
        'pt-BR': 'Praias do Guajiru',
        en: 'Guajiru beaches',
        it: 'Spiagge del Guajiru',
      },
      {
        'pt-BR': 'Farol',
        en: 'Lighthouse',
        it: 'Faro',
      },
      {
        'pt-BR': 'Volta pelo rio',
        en: 'Return by the river',
        it: 'Ritorno lungo il fiume',
      },
      {
        'pt-BR': 'Pôr do sol na Praia da Espraiada',
        en: 'Sunset at Praia da Espraiada',
        it: 'Tramonto a Praia da Espraiada',
      },
    ],
    coverImageId: 'img-03',
    galleryImageIds: ['img-03', 'img-04', 'img-07'],
    mediaPending: true,
    notes: 'Cover/galeria: fotos reais da região usadas provisoriamente. [ASSET DO PASSEIO A DEFINIR] [VALIDAR GRAFIA: Espraiada/Guajiru]',
  },
  {
    id: 'tour-moitas-de-icarai',
    slug: 'moitas-de-icarai',
    title: {
      'pt-BR': 'Moitas de Icaraí',
      en: 'Moitas de Icaraí',
      it: 'Moitas de Icaraí',
    },
    shortDescription: {
      'pt-BR':
        'Roteiro pela costa com duas opções: com ou sem passeio de barco pelo Rio Aracati Açu.',
      en: 'Coastal route with two options: with or without a boat trip on Rio Aracati Açu.',
      it: 'Itinerario costiero con due opzioni: con o senza giro in barca sul Rio Aracati Açu.',
    },
    options: [
      {
        id: 'opcao-1-com-barco',
        number: 1,
        label: {
          'pt-BR': 'Com passeio de barco',
          en: 'With boat trip',
          it: 'Con giro in barca',
        },
        description: {
          'pt-BR':
            'Esta opção inclui passeio de barco no Rio Aracati Açu, passando pelo Túnel do Amor até a Ilha das Ostras, com parada para almoço.',
          en: 'This option includes a boat trip on Rio Aracati Açu, passing through Túnel do Amor to Ilha das Ostras, with a lunch stop.',
          it: 'Questa opzione include il giro in barca sul Rio Aracati Açu, passando dal Túnel do Amor fino a Ilha das Ostras, con sosta per il pranzo.',
        },
        schedule: { start: '09:00', end: '16:00' },
        price: 800,
        currency: 'BRL',
        capacity: {
          'pt-BR': 'Buggy para até 4 pessoas.',
          en: 'Buggy for up to 4 people.',
          it: 'Buggy fino a 4 persone.',
        },
        route: [
          { 'pt-BR': 'Porto dos Barcos', en: 'Porto dos Barcos', it: 'Porto dos Barcos' },
          { 'pt-BR': 'Praia da Tijuca', en: 'Praia da Tijuca', it: 'Praia da Tijuca' },
          { 'pt-BR': 'Almofala', en: 'Almofala', it: 'Almofala' },
          { 'pt-BR': 'Torrões', en: 'Torrões', it: 'Torrões' },
          {
            'pt-BR': 'Travessia do Rio Aracati Mirim por balsa',
            en: 'Rio Aracati Mirim crossing by ferry',
            it: 'Traversata del Rio Aracati Mirim in traghetto',
          },
          { 'pt-BR': 'Praia da Batedeira', en: 'Praia da Batedeira', it: 'Praia da Batedeira' },
          {
            'pt-BR': 'Trilha no Morro de Patos',
            en: 'Trail at Morro de Patos',
            it: 'Sentiero al Morro de Patos',
          },
          { 'pt-BR': 'Praia de Patos', en: 'Praia de Patos', it: 'Praia de Patos' },
        ],
        includes: [
          {
            'pt-BR': 'Passeio de barco no Rio Aracati Açu',
            en: 'Boat trip on Rio Aracati Açu',
            it: 'Giro in barca sul Rio Aracati Açu',
          },
          {
            'pt-BR': 'Túnel do Amor',
            en: 'Túnel do Amor',
            it: 'Túnel do Amor',
          },
          {
            'pt-BR': 'Ilha das Ostras',
            en: 'Ilha das Ostras',
            it: 'Ilha das Ostras',
          },
          {
            'pt-BR': 'Parada para almoço',
            en: 'Lunch stop',
            it: 'Sosta per il pranzo',
          },
        ],
      },
      {
        id: 'opcao-2-sem-barco',
        number: 2,
        label: {
          'pt-BR': 'Sem passeio de barco',
          en: 'Without boat trip',
          it: 'Senza giro in barca',
        },
        description: {
          'pt-BR': 'Esta opção não inclui passeio de barco.',
          en: 'This option does not include a boat trip.',
          it: 'Questa opzione non include il giro in barca.',
        },
        schedule: { start: '09:00', end: '14:30' },
        price: 650,
        currency: 'BRL',
        route: [
          { 'pt-BR': 'Porto dos Barcos', en: 'Porto dos Barcos', it: 'Porto dos Barcos' },
          { 'pt-BR': 'Praia da Tijuca', en: 'Praia da Tijuca', it: 'Praia da Tijuca' },
          { 'pt-BR': 'Almofala', en: 'Almofala', it: 'Almofala' },
          { 'pt-BR': 'Torrões', en: 'Torrões', it: 'Torrões' },
          {
            'pt-BR': 'Travessia do Rio Aracati Mirim por balsa',
            en: 'Rio Aracati Mirim crossing by ferry',
            it: 'Traversata del Rio Aracati Mirim in traghetto',
          },
          { 'pt-BR': 'Praia da Batedeira', en: 'Praia da Batedeira', it: 'Praia da Batedeira' },
          {
            'pt-BR': 'Trilha no Morro de Patos',
            en: 'Trail at Morro de Patos',
            it: 'Sentiero al Morro de Patos',
          },
          { 'pt-BR': 'Praia de Patos', en: 'Praia de Patos', it: 'Praia de Patos' },
        ],
        excludes: [
          {
            'pt-BR': 'Passeio de barco',
            en: 'Boat trip',
            it: 'Giro in barca',
          },
        ],
      },
    ],
    coverImageId: 'img-05',
    galleryImageIds: ['img-05', 'img-02', 'img-07'],
    mediaPending: true,
    notes: 'Capacidade informada apenas na Opção 1. Cover/galeria provisórias. [ASSET DO PASSEIO A DEFINIR] [VALIDAR GRAFIA: Icaraí, Aracati Mirim/Açu, Torrões, Batedeira]',
  },
  {
    id: 'tour-almofala-guajiru-regiao',
    slug: 'almofala-guajiru-regiao',
    title: {
      'pt-BR': 'Almofala, Ilha do Guajiru e Região',
      en: 'Almofala, Ilha do Guajiru and Region',
      it: 'Almofala, Ilha do Guajiru e Regione',
    },
    shortDescription: {
      'pt-BR':
        'Trilha do mangue, praias, farol e volta pelo rio, conhecendo Almofala e a região do Guajiru.',
      en: 'Mangrove trail, beaches, lighthouse and river return, visiting Almofala and the Guajiru region.',
      it: 'Sentiero di mangrovie, spiagge, faro e ritorno in fiume, visitando Almofala e la regione del Guajiru.',
    },
    schedule: { start: '09:00', end: '13:30' },
    price: 500,
    currency: 'BRL',
    routeIntro: {
      'pt-BR': 'Saída da Ilha do Guajiru, passando pela trilha do mangue até o outro lado da ilha e seguindo por:',
      en: 'Departure from Ilha do Guajiru, along the mangrove trail to the other side of the island, continuing through:',
      it: 'Partenza dall’Ilha do Guajiru, lungo il sentiero di mangrovie fino all’altro lato dell’isola, proseguendo per:',
    },
    route: [
      { 'pt-BR': 'Porto dos Barcos', en: 'Porto dos Barcos', it: 'Porto dos Barcos' },
      { 'pt-BR': 'Praia da Tijuca', en: 'Praia da Tijuca', it: 'Praia da Tijuca' },
      { 'pt-BR': 'Almofala', en: 'Almofala', it: 'Almofala' },
      { 'pt-BR': 'Torrões', en: 'Torrões', it: 'Torrões' },
      { 'pt-BR': 'Guajiru', en: 'Guajiru', it: 'Guajiru' },
      { 'pt-BR': 'Farol', en: 'Lighthouse', it: 'Faro' },
      { 'pt-BR': 'Volta do Rio', en: 'River return', it: 'Ritorno del fiume' },
    ],
    coverImageId: 'img-04',
    galleryImageIds: ['img-04', 'img-01', 'img-02'],
    mediaPending: true,
    notes: 'Cover/galeria provisórias. [ASSET DO PASSEIO A DEFINIR] [VALIDAR GRAFIA: Guajiru]',
  },
];
