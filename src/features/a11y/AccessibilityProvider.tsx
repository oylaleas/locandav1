import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { DEFAULT_ACCESSIBILITY } from '@/config/kiosk';
import { subscribeToSessionReset } from '@/features/session/resetBus';
import { track } from '@/services/analytics';

export type TextScale = 'md' | 'lg' | 'xl';

export interface AccessibilityState {
  textScale: TextScale;
  highContrast: boolean;
  /** Preferência explícita do visitante (soma-se ao prefers-reduced-motion). */
  reducedMotion: boolean;
}

interface AccessibilityContextValue extends AccessibilityState {
  /** true quando o sistema OU o visitante pedem menos movimento. */
  motionReduced: boolean;
  setTextScale: (scale: TextScale) => void;
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
  reset: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

function usePrefersReducedMotion(): boolean {
  const [prefers, setPrefers] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (event: MediaQueryListEvent) => setPrefers(event.matches);
    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }, []);

  return prefers;
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AccessibilityState>({ ...DEFAULT_ACCESSIBILITY });
  const systemReducedMotion = usePrefersReducedMotion();
  const motionReduced = systemReducedMotion || state.reducedMotion;

  const reset = useCallback(() => setState({ ...DEFAULT_ACCESSIBILITY }), []);

  // Preferências de acessibilidade são temporárias (totem compartilhado).
  useEffect(() => subscribeToSessionReset(() => reset()), [reset]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.textScale = state.textScale;
    root.dataset.contrast = state.highContrast ? 'high' : 'normal';
    root.dataset.reducedMotion = state.reducedMotion ? 'true' : 'false';
  }, [state]);

  const value = useMemo<AccessibilityContextValue>(
    () => ({
      ...state,
      motionReduced,
      setTextScale: (textScale) => {
        setState((current) => ({ ...current, textScale }));
        track({ name: 'accessibility_change', setting: 'text-scale', value: textScale });
      },
      toggleHighContrast: () =>
        setState((current) => {
          const next = !current.highContrast;
          track({
            name: 'accessibility_change',
            setting: 'high-contrast',
            value: String(next),
          });
          return { ...current, highContrast: next };
        }),
      toggleReducedMotion: () =>
        setState((current) => {
          const next = !current.reducedMotion;
          track({ name: 'accessibility_change', setting: 'reduced-motion', value: String(next) });
          return { ...current, reducedMotion: next };
        }),
      reset,
    }),
    [state, motionReduced, reset],
  );

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}

export function useAccessibility(): AccessibilityContextValue {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility precisa estar dentro de <AccessibilityProvider>.');
  }
  return context;
}
