/* ==========================================================================
   REGISTRO CENTRAL DE ASSETS
   --------------------------------------------------------------------------
   NENHUM caminho de imagem/vídeo deve aparecer solto em componentes.
   Tudo passa por aqui (e é resolvido pelo bundler, o que garante hash de
   cache correto e falha de build caso um arquivo não exista).

   ⚠️  TODA a mídia abaixo é PLACEHOLDER gerado para desenvolvimento.
       Ao receber o material real da Locanda dei Venti:
         1. coloque os arquivos em src/assets/images e src/assets/videos
         2. atualize os campos src/thumbSrc/poster/width/height/alt
         3. troque isPlaceholder para false
       Nenhum componente precisa ser alterado.
   ========================================================================== */

import type { ImageAsset, VideoAsset } from '@/types/media';

import attractFull from '@/assets/images/placeholder-attract.jpg';
import attractThumb from '@/assets/images/thumbs/placeholder-attract.jpg';
import img01Full from '@/assets/images/placeholder-01.jpg';
import img01Thumb from '@/assets/images/thumbs/placeholder-01.jpg';
import img02Full from '@/assets/images/placeholder-02.jpg';
import img02Thumb from '@/assets/images/thumbs/placeholder-02.jpg';
import img03Full from '@/assets/images/placeholder-03.jpg';
import img03Thumb from '@/assets/images/thumbs/placeholder-03.jpg';
import img04Full from '@/assets/images/placeholder-04.jpg';
import img04Thumb from '@/assets/images/thumbs/placeholder-04.jpg';
import img05Full from '@/assets/images/placeholder-05.jpg';
import img05Thumb from '@/assets/images/thumbs/placeholder-05.jpg';
import img06Full from '@/assets/images/placeholder-06.jpg';
import img06Thumb from '@/assets/images/thumbs/placeholder-06.jpg';
import videoPosterFull from '@/assets/images/placeholder-video-poster.jpg';
import videoPosterThumb from '@/assets/images/thumbs/placeholder-video-poster.jpg';

import attractVideo from '@/assets/videos/placeholder-attract.mp4';
import institutionalVideo from '@/assets/videos/placeholder-institucional.mp4';
import experienceVideo from '@/assets/videos/placeholder-experiencia.mp4';

const PLACEHOLDER_ALT = {
  'pt-BR': 'Imagem provisória de ambientação. [FOTOGRAFIA A DEFINIR]',
  en: 'Temporary atmospheric image. [PHOTOGRAPH TO BE DEFINED]',
  it: 'Immagine provvisoria di atmosfera. [FOTOGRAFIA DA DEFINIRE]',
};

export const IMAGE_ASSETS = {
  'img-attract': {
    id: 'img-attract',
    kind: 'image',
    src: attractFull,
    thumbSrc: attractThumb,
    width: 941,
    height: 1672,
    dominantColor: '#D4B48B',
    isPlaceholder: true,
    replaceWith: 'Fotografia vertical principal da Locanda (Attract Mode).',
    alt: PLACEHOLDER_ALT,
  },
  'img-01': {
    id: 'img-01',
    kind: 'image',
    src: img01Full,
    thumbSrc: img01Thumb,
    width: 1400,
    height: 1050,
    dominantColor: '#DBC9AF',
    isPlaceholder: true,
    replaceWith: 'Fotografia institucional — ambiente/fachada.',
    alt: PLACEHOLDER_ALT,
  },
  'img-02': {
    id: 'img-02',
    kind: 'image',
    src: img02Full,
    thumbSrc: img02Thumb,
    width: 1400,
    height: 1050,
    dominantColor: '#C6632C',
    isPlaceholder: true,
    replaceWith: 'Fotografia institucional — detalhe/materialidade.',
    alt: PLACEHOLDER_ALT,
  },
  'img-03': {
    id: 'img-03',
    kind: 'image',
    src: img03Full,
    thumbSrc: img03Thumb,
    width: 1400,
    height: 1050,
    dominantColor: '#403F25',
    isPlaceholder: true,
    replaceWith: 'Fotografia institucional — área externa/entorno.',
    alt: PLACEHOLDER_ALT,
  },
  'img-04': {
    id: 'img-04',
    kind: 'image',
    src: img04Full,
    thumbSrc: img04Thumb,
    width: 1400,
    height: 1050,
    dominantColor: '#152027',
    isPlaceholder: true,
    replaceWith: 'Fotografia institucional — atmosfera noturna.',
    alt: PLACEHOLDER_ALT,
  },
  'img-05': {
    id: 'img-05',
    kind: 'image',
    src: img05Full,
    thumbSrc: img05Thumb,
    width: 1400,
    height: 1050,
    dominantColor: '#C99B6A',
    isPlaceholder: true,
    replaceWith: 'Fotografia institucional — acomodações.',
    alt: PLACEHOLDER_ALT,
  },
  'img-06': {
    id: 'img-06',
    kind: 'image',
    src: img06Full,
    thumbSrc: img06Thumb,
    width: 1400,
    height: 1050,
    dominantColor: '#4A3620',
    isPlaceholder: true,
    replaceWith: 'Fotografia institucional — gastronomia.',
    alt: PLACEHOLDER_ALT,
  },
  'img-video-poster': {
    id: 'img-video-poster',
    kind: 'image',
    src: videoPosterFull,
    thumbSrc: videoPosterThumb,
    width: 1400,
    height: 788,
    dominantColor: '#B29D7F',
    isPlaceholder: true,
    replaceWith: 'Frame de abertura do vídeo institucional.',
    alt: PLACEHOLDER_ALT,
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

/** Assets de marca. [A VALIDAR] Logotipo oficial ainda não fornecido. */
export const BRAND_ASSETS = {
  /**
   * Quando o logotipo real for entregue:
   *   import logo from '@/assets/brand/locanda-dei-venti.svg';
   *   logoSrc: logo
   * O componente <Brandmark/> passa a usar a imagem automaticamente e o
   * fallback tipográfico deixa de ser exibido.
   */
  logoSrc: null as string | null,
  logoAlt: 'Locanda dei Venti',
};
