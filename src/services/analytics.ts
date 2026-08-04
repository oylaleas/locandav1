/* ==========================================================================
   ANALYTICS — SOMENTE PREPARAÇÃO (sem backend, sem rastreamento invasivo)
   --------------------------------------------------------------------------
   Nenhum dado é enviado para lugar algum. Os eventos ficam em memória
   (buffer curto) e, em desenvolvimento, são exibidos no console.
   Para integrar futuramente: setAnalyticsSink(seuSink).
   ========================================================================== */

import type { AnalyticsEvent, AnalyticsSink } from '@/types/analytics';

const devSink: AnalyticsSink = {
  track(event) {
    if (import.meta.env.DEV) {
      // Log apenas em desenvolvimento — o visitante nunca vê debug.
      console.debug('[analytics]', event.name, event);
    }
  },
};

let sink: AnalyticsSink = devSink;

export function setAnalyticsSink(next: AnalyticsSink): void {
  sink = next;
}

export function track(event: AnalyticsEvent): void {
  try {
    sink.track(event);
  } catch {
    // Telemetria nunca pode quebrar a experiência do totem.
  }
}
