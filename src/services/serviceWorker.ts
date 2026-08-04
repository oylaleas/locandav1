/* ==========================================================================
   REGISTRO DO SERVICE WORKER
   --------------------------------------------------------------------------
   Estratégia (implementada em public/sw.js):
     app shell   → network-first com fallback em cache (+ offline.html)
     static      → stale-while-revalidate
     imagens     → cache-first com limite de entradas
     vídeos      → SEM cache por padrão (evita estourar armazenamento)
   Atualizações: nunca recarregamos a página no meio de uma visita.
   O app aplica a atualização quando a sessão volta ao Attract Mode.
   ========================================================================== */

import { FEATURE_FLAGS } from '@/config/kiosk';

type UpdateListener = (apply: () => void) => void;

let waitingWorker: ServiceWorker | null = null;
let updateListener: UpdateListener | null = null;
let refreshing = false;

function notifyUpdate() {
  if (!waitingWorker || !updateListener) return;
  updateListener(applyUpdate);
}

export function applyUpdate(): void {
  if (!waitingWorker || refreshing) return;
  refreshing = true;
  waitingWorker.postMessage({ type: 'SKIP_WAITING' });
}

export function onServiceWorkerUpdate(listener: UpdateListener): void {
  updateListener = listener;
  notifyUpdate();
}

export function registerServiceWorker(): void {
  if (!FEATURE_FLAGS.enableServiceWorker) return;
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((registration) => {
        if (registration.waiting) {
          waitingWorker = registration.waiting;
          notifyUpdate();
        }

        registration.addEventListener('updatefound', () => {
          const installing = registration.installing;
          if (!installing) return;
          installing.addEventListener('statechange', () => {
            if (installing.state === 'installed' && navigator.serviceWorker.controller) {
              waitingWorker = installing;
              notifyUpdate();
            }
          });
        });
      })
      .catch(() => {
        // Falha no SW não pode impedir o funcionamento do totem.
      });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) return;
      window.location.reload();
    });
  });
}
