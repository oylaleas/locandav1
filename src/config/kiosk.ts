/* ==========================================================================
   CONFIGURAÇÃO CENTRAL DO TOTEM
   --------------------------------------------------------------------------
   Todos os tempos, limites e flags de comportamento do kiosk vivem aqui.
   Nenhum timer/limite deve ser espalhado por componentes.
   ========================================================================== */

import type { LanguageCode } from '@/types/i18n';

/** Resolução de referência usada no design. [VALIDAR NO HARDWARE REAL] */
export const KIOSK_VIEWPORT = {
  width: 1080,
  height: 1920,
  orientation: 'portrait' as const,
  note: '[VALIDAR NO HARDWARE REAL] — hardware definitivo ainda não especificado.',
};

/**
 * Inatividade
 * -------------------------------------------------------------------------
 * ATIVO → (INACTIVITY_TIMEOUT_MS sem interação) → AVISO
 * AVISO → "Continuar" → ATIVO
 * AVISO → (WARNING_DURATION_MS sem resposta) → RESET → ATTRACT
 *
 * [A VALIDAR] Valores operacionais devem ser confirmados com a Locanda.
 */
export const INACTIVITY_TIMEOUT_MS = 90_000;
export const WARNING_DURATION_MS = 20_000;

/**
 * Enquanto um vídeo escolhido ativamente pelo visitante está em reprodução,
 * a ausência de toques NÃO é ausência de uso: o contador de inatividade fica
 * suspenso. Para não travar o totem caso alguém se afaste, existe um teto
 * absoluto de sessão que dispara o aviso mesmo com mídia ativa.
 */
export const ABSOLUTE_SESSION_MAX_MS = 15 * 60_000;

/** Intervalo do "tick" do gerenciador de inatividade (custo desprezível). */
export const INACTIVITY_TICK_MS = 1_000;

/** Anti toque-repetido: ignora reentradas da mesma ação nesta janela. */
export const TAP_GUARD_MS = 400;

/** Duração de cada slide do Attract Mode quando não há vídeo disponível. */
export const ATTRACT_SLIDE_DURATION_MS = 9_000;

/** Idioma padrão restaurado a cada nova sessão. */
export const DEFAULT_LANGUAGE: LanguageCode = 'pt-BR';

/** Preferências de acessibilidade padrão (restauradas no reset). */
export const DEFAULT_ACCESSIBILITY = {
  textScale: 'md' as 'md' | 'lg' | 'xl',
  highContrast: false,
  reducedMotion: false,
};

/** Estado padrão de áudio do player (restaurado no reset da sessão). */
export const DEFAULT_MEDIA_STATE = {
  muted: true,
  volume: 1,
  captionsEnabled: false,
};

export const FEATURE_FLAGS = {
  /**
   * Exibe o selo "PLACEHOLDER" sobre mídia provisória.
   * Desligar quando o material real da Locanda for integrado.
   */
  showPlaceholderBadges: true,
  /** Selo "[CONTEÚDO A DEFINIR]" em textos ainda não fornecidos. */
  showPendingContentBadges: true,
  /** Registra o Service Worker (apenas em produção). */
  enableServiceWorker: import.meta.env.PROD,
  /** Attract Mode tenta reproduzir vídeo; cai para imagem se falhar. */
  attractUsesVideo: true,
};

/**
 * Rotas nomeadas — evita strings soltas pela aplicação.
 */
export const ROUTES = {
  home: '/home',
  contentIndex: '/conteudos',
  contentDetail: (slug: string) => `/conteudos/${slug}`,
  gallery: '/galeria',
} as const;
