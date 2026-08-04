import { useCallback, useEffect, useState } from 'react';
import { QRCode } from './QRCode';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { StateMessage } from '@/components/states/StateMessage';
import { FEATURE_FLAGS } from '@/config/kiosk';
import { useI18n } from '@/features/i18n/useI18n';
import { subscribeToSessionReset } from '@/features/session/resetBus';
import { track } from '@/services/analytics';
import type { QrTarget } from '@/types/content';
import styles from './QRCodePanel.module.css';

interface QRCodePanelProps {
  target: QrTarget;
  open: boolean;
  onClose: () => void;
}

/**
 * Painel de handoff totem → smartphone.
 * Estrutura: TÍTULO · INSTRUÇÃO · QR · DESTINO · FECHAR.
 * O totem nunca abre URLs externas: o visitante leva o link no próprio celular.
 */
export function QRCodePanel({ target, open, onClose }: QRCodePanelProps) {
  const { t, tx } = useI18n();
  const [failed, setFailed] = useState(false);

  // Telemetria de abertura (efeito puro: apenas notifica sistema externo).
  useEffect(() => {
    if (!open) return;
    track({ name: 'qr_open', targetId: target.id });
  }, [open, target.id]);

  const handleClose = useCallback(() => {
    setFailed(false);
    onClose();
  }, [onClose]);

  // Reset da sessão fecha qualquer painel aberto.
  useEffect(() => subscribeToSessionReset(() => handleClose()), [handleClose]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={tx(target.title) || t.qr.defaultTitle}
      description={tx(target.instruction) || t.qr.defaultInstruction}
      footer={
        <Button variant="primary" size="lg" icon="close" onClick={handleClose}>
          {t.qr.close}
        </Button>
      }
    >
      {failed ? (
        <StateMessage
          icon="alert"
          title={t.qr.errorTitle}
          message={t.qr.errorMessage}
          compact
          actions={[{ label: t.qr.close, onClick: handleClose, variant: 'secondary' }]}
        />
      ) : (
        <div className={styles.content}>
          <QRCode
            key={target.url}
            value={target.url}
            label={tx(target.destinationLabel)}
            onError={() => setFailed(true)}
          />

          <div className={styles.destination}>
            <span className={styles.destinationLabel}>{t.qr.destination}</span>
            <span className={styles.destinationValue}>{tx(target.destinationLabel)}</span>
            {FEATURE_FLAGS.showPlaceholderBadges && target.isPlaceholder && (
              <Badge tone="warning" icon="alert">
                {t.qr.placeholderWarning}
              </Badge>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
