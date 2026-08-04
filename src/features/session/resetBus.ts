/* ==========================================================================
   RESET BUS
   --------------------------------------------------------------------------
   Canal mínimo para que features independentes (idioma, acessibilidade,
   mídia, overlays) limpem o próprio estado quando a sessão é reiniciada,
   sem criar dependência circular entre providers e sem estado global externo.
   ========================================================================== */

import type { SessionResetHandler, SessionResetReason } from '@/types/session';

const handlers = new Set<SessionResetHandler>();

export function subscribeToSessionReset(handler: SessionResetHandler): () => void {
  handlers.add(handler);
  return () => {
    handlers.delete(handler);
  };
}

export function emitSessionReset(reason: SessionResetReason): void {
  handlers.forEach((handler) => {
    try {
      handler(reason);
    } catch {
      // Um handler com problema não pode impedir os demais de limpar.
    }
  });
}
