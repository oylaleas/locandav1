/** Idiomas suportados pelo totem. */
export const LANGUAGE_CODES = ['pt-BR', 'en', 'it', 'es'] as const;

export type LanguageCode = (typeof LANGUAGE_CODES)[number];

export interface LanguageDefinition {
  code: LanguageCode;
  /** Nome do idioma no próprio idioma — nunca dependemos apenas de bandeiras. */
  nativeName: string;
  /** Rótulo curto para o seletor compacto (ex.: "PT"). */
  shortLabel: string;
  /** Usado em atributos lang / hreflang. */
  htmlLang: string;
}

/**
 * Texto editorial. PT/EN/IT já existem em todos os registros históricos;
 * espanhol pode ser adicionado gradualmente sem quebrar o totem e cai para
 * pt-BR enquanto aguarda revisão editorial.
 */
export type LocalizedText = Record<Exclude<LanguageCode, 'es'>, string> &
  Partial<Record<'es', string>>;

/** Texto opcionalmente traduzido (cai para o idioma padrão quando ausente). */
export type PartialLocalizedText = Partial<Record<LanguageCode, string>>;
