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
import { DEFAULT_MEDIA_STATE } from '@/config/kiosk';
import { subscribeToSessionReset } from '@/features/session/resetBus';

export interface RegisteredPlayer {
  id: string;
  pause: () => void;
  /** Volta ao estado inicial (poster + tempo zerado). */
  reset: () => void;
}

interface MediaContextValue {
  /** Preferência global de áudio — compartilhada por todos os players. */
  muted: boolean;
  setMuted: (muted: boolean) => void;
  captionsEnabled: boolean;
  setCaptionsEnabled: (enabled: boolean) => void;
  /** Player que detém a reprodução no momento (no máximo um). */
  activePlayerId: string | null;
  /** Há mídia em reprodução? Usado pelo gerenciador de inatividade. */
  isPlaying: boolean;
  registerPlayer: (player: RegisteredPlayer) => () => void;
  /** Pede o "foco de mídia": pausa qualquer outro player ativo. */
  requestPlayback: (id: string) => void;
  notifyStopped: (id: string) => void;
  stopAll: () => void;
}

const MediaContext = createContext<MediaContextValue | null>(null);

export function MediaProvider({ children }: { children: ReactNode }) {
  const playersRef = useRef(new Map<string, RegisteredPlayer>());
  const [activePlayerId, setActivePlayerId] = useState<string | null>(null);
  const [muted, setMuted] = useState(DEFAULT_MEDIA_STATE.muted);
  const [captionsEnabled, setCaptionsEnabled] = useState(DEFAULT_MEDIA_STATE.captionsEnabled);

  const registerPlayer = useCallback((player: RegisteredPlayer) => {
    playersRef.current.set(player.id, player);
    return () => {
      playersRef.current.delete(player.id);
      setActivePlayerId((current) => (current === player.id ? null : current));
    };
  }, []);

  /**
   * Regra: nunca dois players com áudio ao mesmo tempo.
   * Ao iniciar um vídeo, todos os outros são pausados.
   */
  const requestPlayback = useCallback((id: string) => {
    playersRef.current.forEach((player, playerId) => {
      if (playerId !== id) player.pause();
    });
    setActivePlayerId(id);
  }, []);

  const notifyStopped = useCallback((id: string) => {
    setActivePlayerId((current) => (current === id ? null : current));
  }, []);

  const stopAll = useCallback(() => {
    playersRef.current.forEach((player) => {
      player.pause();
      player.reset();
    });
    setActivePlayerId(null);
  }, []);

  // Reset da sessão: parar mídia e restaurar o estado padrão de áudio/legendas.
  useEffect(
    () =>
      subscribeToSessionReset(() => {
        stopAll();
        setMuted(DEFAULT_MEDIA_STATE.muted);
        setCaptionsEnabled(DEFAULT_MEDIA_STATE.captionsEnabled);
      }),
    [stopAll],
  );

  const value = useMemo<MediaContextValue>(
    () => ({
      muted,
      setMuted,
      captionsEnabled,
      setCaptionsEnabled,
      activePlayerId,
      isPlaying: activePlayerId !== null,
      registerPlayer,
      requestPlayback,
      notifyStopped,
      stopAll,
    }),
    [
      muted,
      captionsEnabled,
      activePlayerId,
      registerPlayer,
      requestPlayback,
      notifyStopped,
      stopAll,
    ],
  );

  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>;
}

export function useMedia(): MediaContextValue {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia precisa estar dentro de <MediaProvider>.');
  }
  return context;
}
