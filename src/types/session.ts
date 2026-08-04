/**
 * Ciclo de vida da sessão do totem.
 *
 * attract  → ninguém interagindo; Attract Mode em tela cheia
 * active   → visitante navegando
 * warning  → inatividade detectada; aviso com contagem regressiva
 */
export type SessionPhase = 'attract' | 'active' | 'warning';

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
