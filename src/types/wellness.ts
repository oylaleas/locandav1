import type { LocalizedText } from './i18n';
import type { QrTarget } from './content';

/**
 * Serviço de bem-estar (ex.: massagens, terapias do Espaço Onoda).
 * Conteúdo 100% data-driven — nenhum texto comercial nos componentes.
 */
export interface WellnessService {
  id: string;
  name: LocalizedText;
  /** Duração apenas quando informada (ex.: '55 min'). */
  duration?: LocalizedText;
  /** Descrição curta exibida no card. */
  summary: LocalizedText;
  /** Descrição completa exibida no detalhe (modal). */
  description?: LocalizedText;
  /** Itens incluídos, quando informados (ex.: Wellness Day). */
  includes?: LocalizedText[];
}

/**
 * Estabelecimento/parceiro de bem-estar (ex.: Espaço Onoda).
 * A relação comercial com a Locanda NÃO é afirmada — apenas apresentada
 * no contexto da experiência do totem (ver `notes` para validação).
 */
export interface WellnessPartner {
  id: string;
  name: LocalizedText;
  /** Frase curta sob o nome (ex.: 'Massagem & Acupuntura'). */
  tagline: LocalizedText;
  description: LocalizedText;
  services: WellnessService[];
  /**
   * Contato exibido e destinos QR derivados com segurança dos dados
   * fornecidos (wa.me / instagram.com a partir do número e do handle).
   */
  contact: {
    whatsapp: string;
    whatsappUrl: string;
    instagram: string;
    instagramUrl: string;
  };
  /** QR Codes de handoff totem → smartphone (destinos reais). */
  qrTargets: QrTarget[];
  /** Observações internas para validação (não renderizadas). */
  notes?: string;
}
