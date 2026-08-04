import { Icon } from '@/components/ui/Icon';
import { useI18n } from '@/features/i18n/useI18n';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import styles from './OfflineIndicator.module.css';

/**
 * Sinalização discreta de ausência de conexão.
 * O totem continua utilizável: o conteúdo institucional é local.
 */
export function OfflineIndicator() {
  const online = useOnlineStatus();
  const { t } = useI18n();

  return (
    <div className={styles.slot} aria-live="polite">
      {!online && (
        <span className={styles.chip}>
          <Icon name="offline" size="1.15rem" />
          <span className={styles.label}>{t.connectivity.offlineShort}</span>
          <span className="visually-hidden">
            {t.connectivity.offlineTitle}. {t.connectivity.offlineMessage}
          </span>
        </span>
      )}
    </div>
  );
}
