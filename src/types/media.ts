import type { LanguageCode, LocalizedText, PartialLocalizedText } from './i18n';

export type MediaKind = 'image' | 'video';

interface MediaBase {
  id: string;
  kind: MediaKind;
  /**
   * true = asset provisório gerado para desenvolvimento.
   * A UI pode sinalizar visualmente (ver config.showPlaceholderBadges).
   */
  isPlaceholder: boolean;
  /** Nota interna sobre qual material real deve substituir este asset. */
  replaceWith?: string;
}

export interface ImageAsset extends MediaBase {
  kind: 'image';
  /** URL completa resolvida pelo bundler (ver data/media.ts). */
  src: string;
  /** Versão reduzida usada em grades/thumbnails. */
  thumbSrc: string;
  width: number;
  height: number;
  /** Cor média — evita "flash branco" e reserva o espaço enquanto carrega. */
  dominantColor: string;
  alt: LocalizedText;
  caption?: PartialLocalizedText;
}

export interface CaptionTrack {
  language: LanguageCode;
  label: string;
  src: string;
  isPlaceholder: boolean;
}

export interface VideoAsset extends MediaBase {
  kind: 'video';
  src: string;
  /** Poster obrigatório: nunca exibimos uma área preta sem contexto. */
  poster: string;
  width: number;
  height: number;
  durationSeconds: number;
  title: LocalizedText;
  description?: PartialLocalizedText;
  captions: CaptionTrack[];
  /** Vídeos grandes não devem ser pré-carregados no boot do totem. */
  preload: 'none' | 'metadata' | 'auto';
}

/** Estados observáveis do player — usados na UI e nos testes. */
export type VideoPlaybackState =
  | 'idle'
  | 'loading'
  | 'playing'
  | 'paused'
  | 'buffering'
  | 'ended'
  | 'error';
