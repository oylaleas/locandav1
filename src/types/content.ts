import type { LocalizedText, PartialLocalizedText } from './i18n';

/** Ícones desenhados internamente (src/components/ui/Icon.tsx). */
export type IconName =
  | 'arrow-left'
  | 'arrow-right'
  | 'home'
  | 'close'
  | 'play'
  | 'pause'
  | 'replay'
  | 'sound-on'
  | 'sound-off'
  | 'captions'
  | 'expand'
  | 'collapse'
  | 'qr'
  | 'globe'
  | 'accessibility'
  | 'gallery'
  | 'bed'
  | 'dining'
  | 'compass'
  | 'leaf'
  | 'map-pin'
  | 'info'
  | 'offline'
  | 'touch'
  | 'chevron-down'
  | 'alert'
  | 'check'
  | 'spa'
  | 'sun'
  | 'clock'
  | 'boat'
  | 'chat'
  | 'instagram'
  | 'wifi'
  | 'cocktail'
  | 'bell'
  | 'kite'
  | 'menu'
  | 'buggy'
  | 'atv'
  | 'horse'
  | 'kayak'
  | 'bike';

export interface QrTarget {
  id: string;
  /**
   * URL de destino. Enquanto a URL real não for fornecida, usamos um
   * placeholder explícito e sinalizamos na UI (isPlaceholder).
   */
  url: string;
  isPlaceholder: boolean;
  title: LocalizedText;
  instruction: LocalizedText;
  /** Texto que descreve para onde o QR leva (não é a URL crua). */
  destinationLabel: LocalizedText;
}

export interface FactItem {
  id: string;
  label: LocalizedText;
  value: LocalizedText;
  icon?: IconName;
}

export interface ContentBlockParagraph {
  type: 'paragraph';
  text: LocalizedText;
}

export interface ContentBlockList {
  type: 'list';
  title?: LocalizedText;
  items: LocalizedText[];
}

export interface ContentBlockQuote {
  type: 'quote';
  text: LocalizedText;
  attribution?: PartialLocalizedText;
}

export type ContentBlock = ContentBlockParagraph | ContentBlockList | ContentBlockQuote;

export interface ContentSection {
  slug: string;
  order: number;
  icon: IconName;
  title: LocalizedText;
  /** Frase curta exibida nos cards da Home. */
  tagline: LocalizedText;
  summary: LocalizedText;
  /** Imagem principal (id em data/media.ts). */
  heroImageId: string;
  blocks: ContentBlock[];
  facts: FactItem[];
  galleryImageIds: string[];
  videoIds: string[];
  qrTargetId?: string;
  relatedSlugs: string[];
  /** Conteúdo textual ainda não fornecido pela Locanda. */
  contentPending: boolean;
}

export interface GalleryDefinition {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  imageIds: string[];
}

export interface SiteIdentity {
  name: string;
  /** Complemento tipográfico do wordmark. */
  descriptor: LocalizedText;
  attractHeadline: LocalizedText;
  attractSubhead: LocalizedText;
  attractCallToAction: LocalizedText;
  homeWelcome: LocalizedText;
  homeIntro: LocalizedText;
  /** Dados factuais: preenchidos apenas quando fornecidos oficialmente. */
  contact: {
    addressLine: LocalizedText;
    phone: LocalizedText;
    email: LocalizedText;
    website: LocalizedText;
    hasRealData: boolean;
  };
}
