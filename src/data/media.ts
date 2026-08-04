/* ==========================================================================
   REGISTRO CENTRAL DE ASSETS
   --------------------------------------------------------------------------
   NENHUM caminho de imagem/vídeo deve aparecer solto em componentes.
   Tudo passa por aqui (e é resolvido pelo bundler, o que garante hash de
   cache correto e falha de build caso um arquivo não exista).

   ✅ FOTOGRAFIAS REAIS recebidas em 3f3fc2c ("Add files via upload"):
      8 fotos da Locanda (aéreas de drone, praia e foto institucional),
      redimensionadas para o kiosk em src/assets/images/ (+ thumbs/).

   ⚠️  VÍDEOS ainda são PLACEHOLDER (clipes técnicos de demonstração) e as
       legendas .vtt seguem provisórias. Trocar: src/assets/videos + /public/captions.
   ========================================================================== */

import type { ImageAsset, VideoAsset } from '@/types/media';

import attractFull from '@/assets/images/attract-locanda.jpg';
import attractThumb from '@/assets/images/thumbs/attract-locanda.jpg';
import img01Full from '@/assets/images/locanda-principal.jpg';
import img01Thumb from '@/assets/images/thumbs/locanda-principal.jpg';
import img02Full from '@/assets/images/drone-01.jpg';
import img02Thumb from '@/assets/images/thumbs/drone-01.jpg';
import img03Full from '@/assets/images/praia-05.jpg';
import img03Thumb from '@/assets/images/thumbs/praia-05.jpg';
import img04Full from '@/assets/images/drone-03.jpg';
import img04Thumb from '@/assets/images/thumbs/drone-03.jpg';
import img05Full from '@/assets/images/drone-panorama.jpg';
import img05Thumb from '@/assets/images/thumbs/drone-panorama.jpg';
import img06Full from '@/assets/images/praia-02.jpg';
import img06Thumb from '@/assets/images/thumbs/praia-02.jpg';
import img07Full from '@/assets/images/praia-03.jpg';
import img07Thumb from '@/assets/images/thumbs/praia-03.jpg';
import videoPosterFull from '@/assets/images/locanda-video-poster.jpg';
import videoPosterThumb from '@/assets/images/thumbs/locanda-video-poster.jpg';

import attractVideo from '@/assets/videos/placeholder-attract.mp4';
import institutionalVideo from '@/assets/videos/placeholder-institucional.mp4';
import experienceVideo from '@/assets/videos/placeholder-experiencia.mp4';

export const IMAGE_ASSETS = {
  'img-attract': {
    id: 'img-attract',
    kind: 'image',
    src: attractFull,
    thumbSrc: attractThumb,
    width: 1920,
    height: 1080,
    dominantColor: '#ACB3A7',
    isPlaceholder: false,
    replaceWith: 'Vista aérea da propriedade (Attract Mode). [MAPPING A CONFIRMAR]',
    alt: {
      'pt-BR': 'Vista aérea da propriedade da Locanda dei Venti.',
      en: 'Aerial view of the Locanda dei Venti property.',
      it: "Veduta aerea della proprietà della Locanda dei Venti.",
    },
  },
  'img-01': {
    id: 'img-01',
    kind: 'image',
    src: img01Full,
    thumbSrc: img01Thumb,
    width: 1920,
    height: 1281,
    dominantColor: '#C0C39D',
    isPlaceholder: false,
    replaceWith: 'Fotografia institucional principal — seção "A Locanda".',
    alt: {
      'pt-BR': 'Área externa da Locanda dei Venti.',
      en: 'Outdoor area of the Locanda dei Venti.',
      it: "Area esterna della Locanda dei Venti.",
    },
  },
  'img-02': {
    id: 'img-02',
    kind: 'image',
    src: img02Full,
    thumbSrc: img02Thumb,
    width: 1614,
    height: 766,
    dominantColor: '#A2A48F',
    isPlaceholder: false,
    replaceWith: 'Vista aérea — seção "Como chegar". [MAPPING A CONFIRMAR]',
    alt: {
      'pt-BR': 'Vista aérea dos arredores da Locanda dei Venti.',
      en: 'Aerial view of the surroundings of the Locanda dei Venti.',
      it: "Veduta aerea dei dintorni della Locanda dei Venti.",
    },
  },
  'img-03': {
    id: 'img-03',
    kind: 'image',
    src: img03Full,
    thumbSrc: img03Thumb,
    width: 1920,
    height: 700,
    dominantColor: '#7495A4',
    isPlaceholder: false,
    replaceWith: 'Praia/mar — seção "Experiências".',
    alt: {
      'pt-BR': 'Praia e mar na região da Locanda dei Venti.',
      en: 'Beach and sea in the Locanda dei Venti region.',
      it: "Spiaggia e mare nella regione della Locanda dei Venti.",
    },
  },
  'img-04': {
    id: 'img-04',
    kind: 'image',
    src: img04Full,
    thumbSrc: img04Thumb,
    width: 1920,
    height: 1080,
    dominantColor: '#92978B',
    isPlaceholder: false,
    replaceWith: 'Vista aérea — seção "Arredores".',
    alt: {
      'pt-BR': 'Vista aérea do entorno da Locanda dei Venti.',
      en: 'Aerial view of the area around the Locanda dei Venti.',
      it: "Veduta aerea dell'area intorno alla Locanda dei Venti.",
    },
  },
  'img-05': {
    id: 'img-05',
    kind: 'image',
    src: img05Full,
    thumbSrc: img05Thumb,
    width: 1920,
    height: 700,
    dominantColor: '#80897C',
    isPlaceholder: false,
    replaceWith: 'Panorâmica da propriedade — seção "Acomodações". [MAPPING A CONFIRMAR]',
    alt: {
      'pt-BR': 'Vista panorâmica aérea da propriedade da Locanda dei Venti.',
      en: 'Panoramic aerial view of the Locanda dei Venti property.',
      it: "Veduta aerea panoramica della proprietà della Locanda dei Venti.",
    },
  },
  'img-06': {
    id: 'img-06',
    kind: 'image',
    src: img06Full,
    thumbSrc: img06Thumb,
    width: 1920,
    height: 700,
    dominantColor: '#796E5F',
    isPlaceholder: false,
    replaceWith:
      'Foto de praia da região usada provisoriamente — fotografia real de gastronomia ainda pendente. [MAPPING A CONFIRMAR]',
    alt: {
      'pt-BR': 'Praia na região da Locanda dei Venti.',
      en: 'Beach in the Locanda dei Venti region.',
      it: "Spiaggia nella regione della Locanda dei Venti.",
    },
  },
  'img-07': {
    id: 'img-07',
    kind: 'image',
    src: img07Full,
    thumbSrc: img07Thumb,
    width: 1920,
    height: 700,
    dominantColor: '#5C594A',
    isPlaceholder: false,
    replaceWith: 'Foto extra de paisagem (dunas/vegetação) para a galeria.',
    alt: {
      'pt-BR': 'Dunas e vegetação na região da Locanda dei Venti.',
      en: 'Dunes and vegetation in the Locanda dei Venti region.',
      it: "Dune e vegetazione nella regione della Locanda dei Venti.",
    },
  },
  'img-video-poster': {
    id: 'img-video-poster',
    kind: 'image',
    src: videoPosterFull,
    thumbSrc: videoPosterThumb,
    width: 1920,
    height: 1080,
    dominantColor: '#C2C4A2',
    isPlaceholder: false,
    replaceWith: 'Poster do vídeo institucional (corte 16:9 da foto principal).',
    alt: {
      'pt-BR': 'Abertura do vídeo institucional — área externa da Locanda dei Venti.',
      en: 'Opening frame of the institutional video — outdoor area of the Locanda dei Venti.',
      it: "Apertura del video istituzionale — area esterna della Locanda dei Venti.",
    },
  },
} as const satisfies Record<string, ImageAsset>;

export type ImageAssetId = keyof typeof IMAGE_ASSETS;

/**
 * Legendas: os arquivos .vtt vivem em /public/captions para poderem ser
 * substituídos sem rebuild (o hardware pode receber legendas revisadas).
 */
const captionsFor = (base: string) => [
  {
    language: 'pt-BR' as const,
    label: 'Português (Brasil)',
    src: `/captions/${base}.pt-BR.vtt`,
    isPlaceholder: true,
  },
  { language: 'en' as const, label: 'English', src: `/captions/${base}.en.vtt`, isPlaceholder: true },
  { language: 'it' as const, label: 'Italiano', src: `/captions/${base}.it.vtt`, isPlaceholder: true },
];

export const VIDEO_ASSETS = {
  'video-attract': {
    id: 'video-attract',
    kind: 'video',
    src: attractVideo,
    poster: attractFull,
    width: 720,
    height: 1280,
    durationSeconds: 16,
    isPlaceholder: true,
    replaceWith: 'Vídeo vertical de ambientação para o Attract Mode.',
    title: {
      'pt-BR': 'Ambientação — Locanda dei Venti',
      en: 'Ambience — Locanda dei Venti',
      it: 'Atmosfera — Locanda dei Venti',
    },
    captions: [],
    /**
     * O vídeo do Attract Mode é o único com preload mais agressivo: é curto,
     * usado com altíssima frequência e nunca deve travar o primeiro toque.
     */
    preload: 'metadata',
  },
  'video-institucional': {
    id: 'video-institucional',
    kind: 'video',
    src: institutionalVideo,
    poster: videoPosterFull,
    width: 1280,
    height: 720,
    durationSeconds: 14,
    isPlaceholder: true,
    replaceWith: 'Vídeo institucional oficial da Locanda dei Venti.',
    title: {
      'pt-BR': 'Vídeo institucional [VÍDEO A DEFINIR]',
      en: 'Institutional video [VIDEO TO BE DEFINED]',
      it: 'Video istituzionale [VIDEO DA DEFINIRE]',
    },
    description: {
      'pt-BR': 'Clipe técnico de demonstração usado enquanto o vídeo oficial não é fornecido.',
      en: 'Technical demo clip used until the official video is provided.',
      it: 'Clip tecnica di prova usata finché il video ufficiale non sarà fornito.',
    },
    captions: captionsFor('placeholder-institucional'),
    preload: 'none',
  },
  'video-experiencia': {
    id: 'video-experiencia',
    kind: 'video',
    src: experienceVideo,
    poster: img03Full,
    width: 1280,
    height: 720,
    durationSeconds: 12,
    isPlaceholder: true,
    replaceWith: 'Vídeo de experiências/entorno.',
    title: {
      'pt-BR': 'Experiências [VÍDEO A DEFINIR]',
      en: 'Experiences [VIDEO TO BE DEFINED]',
      it: 'Esperienze [VIDEO DA DEFINIRE]',
    },
    captions: captionsFor('placeholder-experiencia'),
    preload: 'none',
  },
} as const satisfies Record<string, VideoAsset>;

export type VideoAssetId = keyof typeof VIDEO_ASSETS;

/* ==========================================================================
   ASSETS DE MARCA — logotipos oficiais da Locanda dei Venti
   --------------------------------------------------------------------------
   Recebidos em e95d8f2 ("Add files via upload"): quatro variações em PNG.

   Uso oficial de cada variação (apenas logos oficiais em exibição):
   - logo-colorido.png (180×146)  lockup horizontal (rosa dos ventos dourada
                                 #f1b100 + wordmark branco) — usado pelo
                                 <Brandmark/> em superfícies CLARAS, dentro
                                 da placa escura (Home, cabeçalho).
   - logo-branco.png (195×159)    lockup monocromático branco — usado pelo
                                 <Brandmark/> em superfícies ESCURAS (Attract
                                 Mode), direto sobre o scrim.
   - logo-1.png (170×169)         emblema circular (azul #065895 + dourado) —
                                 ícones PWA / favicon / apple-touch / offline.
   - logo.png (125×101)           exportação menor do lockup colorido
                                 (mantida no repositório; não usada em tela).
   ========================================================================== */

import logoLockup from '@/assets/brand/logo-colorido.png';
import logoLockupWhite from '@/assets/brand/logo-branco.png';
import logoEmblem from '@/assets/brand/logo-1.png';

export const BRAND_ASSETS = {
  /** Lockup colorido — superfícies claras (com placa escura). */
  logoSrc: logoLockup,
  logoAlt: 'Locanda dei Venti',
  logoWidth: 180,
  logoHeight: 146,

  /** Lockup monocromático branco — superfícies escuras (Attract Mode). */
  logoSrcWhite: logoLockupWhite,
  logoAltWhite: 'Locanda dei Venti',
  logoWidthWhite: 195,
  logoHeightWhite: 159,

  /** Emblema circular (azul + dourado) — ícones do aplicativo/PWA. */
  emblemSrc: logoEmblem,
  emblemAlt: 'Emblema da Locanda dei Venti',
  emblemWidth: 170,
  emblemHeight: 169,
} as const;
