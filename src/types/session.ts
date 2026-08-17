/**
 * Ciclo de vida da sessão do totem.
 *
 * active   → visitante navegando (estado inicial — o totem abre direto na Home)
 * warning  → inatividade detectada; aviso com contagem regressiva
 *
 * A tela inicial (Attract Mode) foi removida por decisão do responsável:
 * o totem abre diretamente no menu/Home.
 */
export type SessionPhase = 'active' | 'warning';

export type SessionResetReason =
  | 'inactivity-timeout'
  | 'visitor-ended'
  | 'home-longpress'
  | 'app-error-recovery'
  | 'manual';

export interface SessionState {
  phase: SessionPhase;
  /** Timestamp (ms) do início da sessão atual; null em attract. */
  startedAt: number | null;
  /** Contador incremental — usado como key para remontar árvores de UI. */
  sessionId: number;
  /** Segundos restantes exibidos no aviso de inatividade. */
  warningSecondsLeft: number;
}

/** Handlers registrados por features para limpar seu próprio estado. */
export type SessionResetHandler = (reason: SessionResetReason) => void;
