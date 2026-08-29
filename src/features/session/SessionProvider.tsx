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
import { useLocation } from 'react-router-dom';
import {
  ABSOLUTE_SESSION_MAX_MS,
  INACTIVITY_TICK_MS,
  INACTIVITY_TIMEOUT_MS,
  WARNING_DURATION_MS,
  ROUTES,
} from '@/config/kiosk';
import { useMedia } from '@/features/media/MediaProvider';
import { emitSessionReset } from '@/features/session/resetBus';
import { track } from '@/services/analytics';
import type { SessionPhase, SessionResetReason, SessionState } from '@/types/session';

export interface SessionContextValue extends SessionState {
  /** Encerra a sessão, limpa tudo e volta à Home (menu inicial). */
  resetSession: (reason?: SessionResetReason) => void;
  /** Resposta ao aviso de inatividade. */
  continueSession: () => void;
  /** Registra interação relevante (usado por gestos que não geram eventos DOM). */
  noteActivity: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

const ACTIVITY_EVENTS: Array<keyof DocumentEventMap> = [
  // pointerdown/touchstart já cobrem interação humana. pointermove disparava
  // dezenas de vezes por segundo durante um arrasto sem acrescentar sinal útil.
  'pointerdown',
  'keydown',
  'wheel',
  'touchstart',
  'scroll',
];

export function SessionProvider({ children }: { children: ReactNode }) {
  const media = useMedia();
  const location = useLocation();
  // Sem Attract Mode: o totem abre direto com a sessão ativa (na Home).
  const [phase, setPhase] = useState<SessionPhase>('active');
  const [sessionId, setSessionId] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [warningSecondsLeft, setWarningSecondsLeft] = useState(
    Math.ceil(WARNING_DURATION_MS / 1000),
  );

  // Refs evitam re-render a cada toque: só o "tick" lê estes valores.
  const lastActivityRef = useRef(0);
  const warningStartedRef = useRef<number | null>(null);
  const phaseRef = useRef<SessionPhase>('active');
  const startedAtRef = useRef<number | null>(null);
  const sessionIdRef = useRef(0);
  const mediaPlayingRef = useRef(false);
  const isHomeRef = useRef(location.pathname === ROUTES.home);

  // Início da sessão (marcado após a montagem — mantém o render puro).
  useEffect(() => {
    startedAtRef.current = startedAtRef.current ?? Date.now();
    lastActivityRef.current = Date.now();
  }, []);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    isHomeRef.current = location.pathname === ROUTES.home;
  }, [location.pathname]);

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

  const resetSession = useCallback((reason: SessionResetReason = 'manual') => {
    const started = startedAtRef.current;
    track({
      name: 'session_reset',
      sessionId: sessionIdRef.current,
      reason,
      durationMs: started ? Date.now() - started : 0,
    });

    // Ordem importa: primeiro as features limpam (mídia, idioma, overlays),
    // depois a árvore é remontada (sessionId++) e a sessão recomeça na Home.
    emitSessionReset(reason);

    warningStartedRef.current = null;
    lastActivityRef.current = Date.now();
    setWarningSecondsLeft(Math.ceil(WARNING_DURATION_MS / 1000));
    setStartedAt(Date.now());
    setSessionId((current) => current + 1);
    setPhase('active');
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
   *  - HOME + sem interação por INACTIVITY_TIMEOUT_MS → reset silencioso:
   *    ela já é a tela de descanso, então não interrompemos a recepção com um aviso;
   *  - outras telas + sem interação por INACTIVITY_TIMEOUT_MS → AVISO;
   *  - Vídeo em reprodução escolhido pelo visitante NÃO é ausência passiva:
   *    o relógio fica suspenso enquanto houver mídia ativa…
   *  - …mas existe um teto absoluto (ABSOLUTE_SESSION_MAX_MS) para o caso de
   *    alguém deixar um vídeo rodando e ir embora.
   *  - AVISO sem resposta por WARNING_DURATION_MS → RESET → ATTRACT
   */
  useEffect(() => {
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
        if (isHomeRef.current) {
          // A Home já é o destino de reset. Reiniciamos idioma, escala e mídia
          // silenciosamente, sem exibir uma mensagem operacional ao visitante.
          resetSession('inactivity-timeout');
          return;
        }

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
      resetSession,
      continueSession,
      noteActivity,
    }),
    [phase, sessionId, startedAt, warningSecondsLeft, resetSession, continueSession, noteActivity],
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
