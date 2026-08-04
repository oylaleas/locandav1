import { useCallback, useEffect, useRef } from 'react';
import { TAP_GUARD_MS } from '@/config/kiosk';

/**
 * Protege ações contra toques repetidos (double-tap acidental em totem).
 * Ignora reentradas da mesma ação dentro da janela de guarda.
 */
export function useTapGuard<Args extends unknown[]>(
  handler: (...args: Args) => void,
  guardMs: number = TAP_GUARD_MS,
): (...args: Args) => void {
  const lastCallRef = useRef(0);
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  return useCallback(
    (...args: Args) => {
      const now = Date.now();
      if (now - lastCallRef.current < guardMs) return;
      lastCallRef.current = now;
      handlerRef.current(...args);
    },
    [guardMs],
  );
}
