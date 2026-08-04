import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useI18n } from '@/features/i18n/useI18n';
import { useSession } from '@/features/session/SessionProvider';
import styles from './TimeoutModal.module.css';

/**
 * Aviso de inatividade.
 * Não é dispensável por toque fora: exige uma decisão explícita OU expira.
 * Qualquer interação com a tela também conta como "continuar" (ver
 * SessionProvider) — o visitante nunca fica preso.
 */
export function TimeoutModal() {
  const { t, fmt } = useI18n();
  const { phase, warningSecondsLeft, continueSession, resetSession } = useSession();

  return (
    <Modal
      open={phase === 'warning'}
      onClose={continueSession}
      title={t.session.warningTitle}
      dismissible={false}
      showCloseButton={false}
      footer={
        <>
          <Button variant="secondary" size="lg" onClick={() => resetSession('visitor-ended')}>
            {t.session.endNow}
          </Button>
          <Button variant="primary" size="lg" icon="check" onClick={continueSession}>
            {t.session.continue}
          </Button>
        </>
      }
    >
      <div className={styles.content}>
        <p className={styles.message} role="status" aria-live="assertive">
          {fmt(t.session.warningMessage, { seconds: warningSecondsLeft })}
        </p>
        <div
          className={styles.countdown}
          role="timer"
          aria-label={fmt(t.session.warningMessage, { seconds: warningSecondsLeft })}
        >
          <span className={styles.countdownValue}>{warningSecondsLeft}</span>
        </div>
      </div>
    </Modal>
  );
}
