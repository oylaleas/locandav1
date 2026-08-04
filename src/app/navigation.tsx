import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/config/kiosk';
import { useMedia } from '@/features/media/MediaProvider';
import { subscribeToSessionReset } from '@/features/session/resetBus';

interface KioskNavigationValue {
  /** Avança para uma nova tela mantendo histórico coerente. */
  push: (to: string) => void;
  /** Volta ao contexto anterior; da raiz da sessão, volta para a Home. */
  back: () => void;
  /** Retorna à Home e interrompe qualquer mídia em reprodução. */
  home: () => void;
  /** Profundidade dentro da sessão atual (0 = está na Home). */
  canGoBack: boolean;
}

const KioskNavigationContext = createContext<KioskNavigationValue | null>(null);

/**
 * Navegação do totem.
 * O histórico do navegador é usado, mas SEMPRE limitado à sessão atual:
 * o visitante nunca "sai" da aplicação nem encontra telas de outra sessão.
 */
export function KioskNavigationProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const media = useMedia();
  const depthRef = useRef(0);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(
    () =>
      subscribeToSessionReset(() => {
        depthRef.current = 0;
        setCanGoBack(false);
        navigate(ROUTES.home, { replace: true });
      }),
    [navigate],
  );

  const push = useCallback(
    (to: string) => {
      depthRef.current += 1;
      setCanGoBack(true);
      navigate(to);
    },
    [navigate],
  );

  const back = useCallback(() => {
    if (depthRef.current > 0) {
      depthRef.current -= 1;
      setCanGoBack(depthRef.current > 0);
      navigate(-1);
      return;
    }
    navigate(ROUTES.home, { replace: true });
  }, [navigate]);

  const home = useCallback(() => {
    media.stopAll();
    depthRef.current = 0;
    setCanGoBack(false);
    navigate(ROUTES.home, { replace: true });
  }, [media, navigate]);

  const value = useMemo<KioskNavigationValue>(
    () => ({ push, back, home, canGoBack }),
    [push, back, home, canGoBack],
  );

  return (
    <KioskNavigationContext.Provider value={value}>{children}</KioskNavigationContext.Provider>
  );
}

export function useKioskNavigation(): KioskNavigationValue {
  const context = useContext(KioskNavigationContext);
  if (!context) {
    throw new Error('useKioskNavigation precisa estar dentro de <KioskNavigationProvider>.');
  }
  return context;
}
