import type { LanguageCode, LanguageDefinition } from '@/types/i18n';
import { ptBR, type Dictionary } from './pt-BR';
import { en } from './en';
import { it } from './it';
import { es } from './es';

export type { Dictionary };

export const DICTIONARIES: Record<LanguageCode, Dictionary> = {
  'pt-BR': ptBR,
  en,
  it,
  es,
};

export const LANGUAGES: LanguageDefinition[] = [
  { code: 'pt-BR', nativeName: 'Português', shortLabel: 'PT', htmlLang: 'pt-BR' },
  { code: 'en', nativeName: 'English', shortLabel: 'EN', htmlLang: 'en' },
  { code: 'es', nativeName: 'Español', shortLabel: 'ES', htmlLang: 'es' },
  { code: 'it', nativeName: 'Italiano', shortLabel: 'IT', htmlLang: 'it' },
];
