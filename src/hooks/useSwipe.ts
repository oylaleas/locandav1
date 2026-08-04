import { useRef, type PointerEvent as ReactPointerEvent } from 'react';

interface SwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  /** Distância mínima (px) para considerar swipe. */
  threshold?: number;
}

/**
 * Swipe é COMPLEMENTO — nunca a única forma de executar uma ação
 * (a galeria sempre expõe botões visíveis de anterior/próximo).
 */
export function useSwipe({ onSwipeLeft, onSwipeRight, threshold = 60 }: SwipeOptions) {
  const start = useRef<{ x: number; y: number } | null>(null);

  const onPointerDown = (event: ReactPointerEvent) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    start.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: ReactPointerEvent) => {
    const origin = start.current;
    start.current = null;
    if (!origin) return;

    const deltaX = event.clientX - origin.x;
    const deltaY = event.clientY - origin.y;
    if (Math.abs(deltaX) < threshold) return;
    // Ignora gestos predominantemente verticais (são scroll).
    if (Math.abs(deltaY) > Math.abs(deltaX)) return;

    if (deltaX < 0) onSwipeLeft?.();
    else onSwipeRight?.();
  };

  const onPointerCancel = () => {
    start.current = null;
  };

  return { onPointerDown, onPointerUp, onPointerCancel };
}
