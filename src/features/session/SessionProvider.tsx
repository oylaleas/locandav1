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
import {
  ABSOLUTE_SESSION_MAX_MS,
  INACTIVITY_TICK_MS,
  INACTIVITY_TIMEOUT_MS,
  WARNING_DURATION_MS,
} from '@/config/kiosk';
import { useMedia } from '@/features/media/MediaProvider';
import { emitSessionReset } from '@/features/session/resetBus';
import { track } from '@/services/analytics';
import type { SessionPhase, SessionResetReason, SessionState } from '@/types/session';

export interface SessionContextValue extends SessionState {
  beginSession: () => void;
  /** Encerra a sessão, limpa tudo e volta ao Attract Mode. */
  resetSession: (reason?: SessionResetReason) => void;
  /** Resposta ao aviso de inatividade. */
  continueSession: () => void;
  /** Registra interação relevante (usado por gestos que não geram eventos DOM). */
  noteActivity: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

const ACTIVITY_EVENTS: Array<keyof DocumentEventMap> = [
  'pointerdown',
  'pointermove',
  'keydown',
  'wheel',
  'touchstart',
  'scroll',
];

export function SessionProvider({ children }: { children: ReactNode }) {
  const media = useMedia();
  const [phase, setPhase] = useState<SessionPhase>('attract');
  const [sessionId, setSessionId] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [warningSecondsLeft, setWarningSecondsLeft] = useState(
    Math.ceil(WARNING_DURATION_MS / 1000),
  );

  // Refs evitam re-render a cada toque: só o "tick" lê estes valores.
  const lastActivityRef = useRef(0);
  const warningStartedRef = useRef<number | null>(null);
  const phaseRef = useRef<SessionPhase>('attract');
  const startedAtRef = useRef<number | null>(null);
  const sessionIdRef = useRef(0);
  const mediaPlayingRef = useRef(false);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    startedAtRef.current = startedAt;
  }, [startedAt]);

  useEffect(() => {
    sessionIdRef.current = sessionId;
  }, [sessionId]);

  useEffect(() => {
    mediaPlayingRef.current = media.isPlaying;
    // Mídia ativa conta como uso: zera o relógio de inatividade.
    if (media.isPlaying) lastActivityRef.current = Date.now();
  }, [media.isPlaying]);

  const noteActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
  }, []);

  const beginSession = useCallback(() => {
    lastActivityRef.current = Date.now();
    warningStartedRef.current = null;
    setPhase((current) => {
      if (current === 'active') return current;
      return 'active';
    });
    setStartedAt((current) => current ?? Date.now());
    setSessionId((current) => {
      const next = current + 1;
      track({ name: 'session_start', sessionId: next });
      return next;
    });
  }, []);

  const resetSession = useCallback((reason: SessionResetReason = 'manual') => {
    const started = startedAtRef.current;
    track({
      name: 'session_reset',
      sessionId: sessionIdRef.current,
      reason,
      durationMs: started ? Date.now() - started : 0,
    });

    // Ordem importa: primeiro as features limpam (mídia, idioma, overlays),
    // depois voltamos à fase de Attract.
    emitSessionReset(reason);

    warningStartedRef.current = null;
    lastActivityRef.current = Date.now();
    setWarningSecondsLeft(Math.ceil(WARNING_DURATION_MS / 1000));
    setStartedAt(null);
    setPhase('attract');
  }, []);

  const continueSession = useCallback(() => {
    warningStartedRef.current = null;
    lastActivityRef.current = Date.now();
    setWarningSecondsLeft(Math.ceil(WARNING_DURATION_MS / 1000));
    setPhase((current) => (current === 'warning' ? 'active' : current));
  }, []);

  // Escuta de interações — passiva e sem re-render.
  useEffect(() => {
    lastActivityRef.current = Date.now();
    const handler = () => {
      lastActivityRef.current = Date.now();
      if (phaseRef.current === 'warning') {
        // Qualquer interação durante o aviso significa "ainda estou aqui".
        continueSession();
      }
    };
    ACTIVITY_EVENTS.forEach((eventName) =>
      document.addEventListener(eventName, handler, { passive: true, capture: true }),
    );
    return () => {
      ACTIVITY_EVENTS.forEach((eventName) =>
        document.removeEventListener(eventName, handler, { capture: true }),
      );
    };
  }, [continueSession]);

  /**
   * Gerenciador central de inatividade (um único timer na aplicação).
   *
   * Regras:
   *  - ATIVO + sem interação por INACTIVITY_TIMEOUT_MS → AVISO
   *  - Vídeo em reprodução escolhido pelo visitante NÃO é ausência passiva:
   *    o relógio fica suspenso enquanto houver mídia ativa…
   *  - …mas existe um teto absoluto (ABSOLUTE_SESSION_MAX_MS) para o caso de
   *    alguém deixar um vídeo rodando e ir embora.
   *  - AVISO sem resposta por WARNING_DURATION_MS → RESET → ATTRACT
   */
  useEffect(() => {
    if (phase === 'attract') return;

    const interval = window.setInterval(() => {
      const now = Date.now();

      if (phaseRef.current === 'warning') {
        const warningStart = warningStartedRef.current ?? now;
        const remainingMs = WARNING_DURATION_MS - (now - warningStart);
        const remainingSeconds = Math.max(0, Math.ceil(remainingMs / 1000));
        setWarningSecondsLeft(remainingSeconds);
        if (remainingMs <= 0) resetSession('inactivity-timeout');
        return;
      }

      const sessionAge = startedAtRef.current ? now - startedAtRef.current : 0;
      const hitAbsoluteCap = sessionAge >= ABSOLUTE_SESSION_MAX_MS;

      if (mediaPlayingRef.current && !hitAbsoluteCap) {
        lastActivityRef.current = now;
        return;
      }

      const idleFor = now - lastActivityRef.current;
      if (idleFor >= INACTIVITY_TIMEOUT_MS || hitAbsoluteCap) {
        warningStartedRef.current = now;
        setWarningSecondsLeft(Math.ceil(WARNING_DURATION_MS / 1000));
        setPhase('warning');
      }
    }, INACTIVITY_TICK_MS);

    return () => window.clearInterval(interval);
  }, [phase, resetSession]);

  const value = useMemo<SessionContextValue>(
    () => ({
      phase,
      sessionId,
      startedAt,
      warningSecondsLeft,
      beginSession,
      resetSession,
      continueSession,
      noteActivity,
    }),
    [
      phase,
      sessionId,
      startedAt,
      warningSecondsLeft,
      beginSession,
      resetSession,
      continueSession,
      noteActivity,
    ],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionContextValue {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession precisa estar dentro de <SessionProvider>.');
  }
  return context;
}
