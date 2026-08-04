import type { LanguageCode } from './i18n';
import type { SessionResetReason } from './session';

/**
 * Contrato de telemetria — SEM backend neste momento.
 * Nenhum dado pessoal é coletado; eventos existem apenas para futura
 * integração (ver services/analytics.ts).
 */
export type AnalyticsEvent =
  | { name: 'session_start'; sessionId: number }
  | { name: 'session_reset'; sessionId: number; reason: SessionResetReason; durationMs: number }
  | { name: 'screen_view'; path: string; title?: string }
  | { name: 'video_play'; videoId: string }
  | { name: 'video_complete'; videoId: string }
  | { name: 'video_error'; videoId: string; code?: string }
  | { name: 'qr_open'; targetId: string }
  | { name: 'gallery_open'; galleryId: string; imageId: string }
  | { name: 'language_change'; from: LanguageCode; to: LanguageCode }
  | { name: 'accessibility_change'; setting: string; value: string }
  | { name: 'connectivity_change'; online: boolean }
  | { name: 'error'; scope: string; message: string };

export interface AnalyticsSink {
  track(event: AnalyticsEvent): void;
}
