import type { IconName } from './content';
import type { LocalizedText } from './i18n';

export interface TourSchedule {
  start: string; // ex.: '15:30'
  end: string; // ex.: '18:30'
}

/**
 * Opção de passeio (ex.: Moitas de Icaraí — Opção 1 com barco / Opção 2 sem).
 * A diferenciação é SEMPRE textual explícita (label + includes/excludes),
 * nunca apenas por cor.
 */
export interface TourOption {
  id: string;
  /** 1 ou 2 — exibido como "Opção {number}". */
  number: 1 | 2;
  /** Diferenciador textual (ex.: 'Com passeio de barco'). */
  label: LocalizedText;
  /** Detalhe do que está / não está incluído nesta opção. */
  description: LocalizedText;
  schedule: TourSchedule;
  price: number;
  currency: 'BRL';
  /** Capacidade apenas quando informada (ex.: 'Buggy para até 4 pessoas.'). */
  capacity?: LocalizedText;
  route: LocalizedText[];
  includes?: LocalizedText[];
  excludes?: LocalizedText[];
}

/**
 * Passeio institucional. Cobre imagem/gradiente/vídeo via ids de
 * IMAGE_ASSETS / VIDEO_ASSETS (src/data/media.ts) — a UI nunca embute mídia.
 */
export interface Tour {
  id: string;
  slug: string;
  title: LocalizedText;
  shortDescription: LocalizedText;
  description?: LocalizedText;
  /** Ícone de identificação no card (nunca substitui o nome). */
  icon?: IconName;
  schedule?: TourSchedule;
  price?: number;
  currency?: 'BRL';
  capacity?: LocalizedText;
  /** Onde a experiência acontece — só quando informado. */
  location?: LocalizedText;
  /** Tempo estimado da atividade — só quando informado. */
  duration?: LocalizedText;
  /** Dias e horários de funcionamento — só quando informado. */
  availability?: LocalizedText;
  /** Linha de partida do roteiro (ex.: 'Saída da Ilha do Guajiru'). */
  routeIntro?: LocalizedText;
  /** Paradas/trechos em sequência. */
  route?: LocalizedText[];
  /** Opções mutuamente exclusivas (ex.: Moitas de Icaraí). */
  options?: TourOption[];
  includes?: LocalizedText[];
  excludes?: LocalizedText[];
  /** Restrições e recomendações — só quando informadas. */
  importantInfo?: LocalizedText[];
  coverImageId?: string;
  galleryImageIds?: string[];
  videoId?: string;
  /** QR de handoff para reserva (id em QR_TARGETS). Sem id, a UI usa o WhatsApp da Locanda. */
  reservationQrId?: string;
  /** true enquanto não houver fotos/vídeo oficiais do passeio. */
  mediaPending: boolean;
  /** Observações internas ([VALIDAR GRAFIA] / [INFORMAÇÃO A DEFINIR]). */
  notes?: string;
}
