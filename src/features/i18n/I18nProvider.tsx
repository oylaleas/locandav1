import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { DEFAULT_LANGUAGE } from '@/config/kiosk';
import { DICTIONARIES, LANGUAGES, type Dictionary } from '@/data/locales';
import { subscribeToSessionReset } from '@/features/session/resetBus';
import { track } from '@/services/analytics';
import type { LanguageCode, LanguageDefinition, PartialLocalizedText } from '@/types/i18n';
import { format } from '@/utils/format';

export interface I18nContextValue {
  language: LanguageCode;
  languages: LanguageDefinition[];
  setLanguage: (code: LanguageCode) => void;
  /** Dicionário de UI do idioma atual (totalmente tipado). */
  t: Dictionary;
  /** Resolve um texto de conteúdo multilíngue com fallback para o padrão. */
  tx: (value: PartialLocalizedText | undefined) => string;
  /** Interpolação: fmt(t.gallery.counter, { current, total }). */
  fmt: (template: string, values: Record<string, string | number>) => string;
}

export const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(DEFAULT_LANGUAGE);

  const setLanguage = useCallback((code: LanguageCode) => {
    setLanguageState((current) => {
      if (current === code) return current;
      track({ name: 'language_change', from: current, to: code });
      return code;
    });
  }, []);

  // O idioma é uma preferência temporária da sessão: volta ao padrão no reset.
  useEffect(
    () =>
      subscribeToSessionReset(() => {
        setLanguageState(DEFAULT_LANGUAGE);
      }),
    [],
  );

  useEffect(() => {
    const definition = LANGUAGES.find((item) => item.code === language);
    document.documentElement.lang = definition?.htmlLang ?? 'pt-BR';
  }, [language]);

  const value = useMemo<I18nContextValue>(() => {
    const dictionary = DICTIONARIES[language];
    return {
      language,
      languages: LANGUAGES,
      setLanguage,
      t: dictionary,
      tx: (localized) => {
        if (!localized) return '';
        return localized[language] ?? localized[DEFAULT_LANGUAGE] ?? '';
      },
      fmt: format,
    };
  }, [language, setLanguage]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
