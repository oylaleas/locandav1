import { useCallback, useEffect, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Modal } from '@/components/ui/Modal';
import { useI18n } from '@/features/i18n/useI18n';
import { subscribeToSessionReset } from '@/features/session/resetBus';
import type { WellnessService } from '@/types/wellness';
import styles from './ServiceDetailModal.module.css';

interface ServiceDetailModalProps {
  service: WellnessService | undefined;
  onClose: () => void;
}

/**
 * Detalhe de um serviço de bem-estar (modal leve — evita tela dedicada por
 * serviço, já que cada serviço tem um parágrafo de descrição).
 * Fecha automaticamente no reset da sessão (nunca cria dead end).
 */
export function ServiceDetailModal({ service, onClose }: ServiceDetailModalProps) {
  const { t, tx } = useI18n();
  const [dismissed, setDismissed] = useState(false);

  const handleClose = useCallback(() => {
    setDismissed(false);
    onClose();
  }, [onClose]);

  // Reset da sessão fecha o detalhe de qualquer serviço aberto.
  useEffect(() => subscribeToSessionReset(() => handleClose()), [handleClose]);

  const open = Boolean(service) && !dismissed;
  if (!service) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={tx(service.name)}
      description={service.duration ? tx(service.duration) : undefined}
      footer={
        <Button variant="primary" size="lg" icon="close" onClick={handleClose}>
          {t.nav.close}
        </Button>
      }
    >
      <div className={styles.content}>
        {service.duration && (
          <Badge tone="neutral" icon="clock" className={styles.durationBadge}>
            {t.wellness.duration}: {tx(service.duration)}
          </Badge>
        )}

        {service.description && <p className={styles.description}>{tx(service.description)}</p>}

        {service.includes && service.includes.length > 0 && (
          <section className={styles.includes} aria-label={t.wellness.includes}>
            <h3 className={styles.includesTitle}>
              <Icon name="check" size="1.15rem" />
              {t.wellness.includes}
            </h3>
            <ul className={styles.includesList}>
              {service.includes.map((item) => (
                <li key={tx(item)} className={styles.includesItem}>
                  <Icon name="check" size="1.1rem" className={styles.check} />
                  {tx(item)}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </Modal>
  );
}
