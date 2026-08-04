import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { useI18n } from '@/features/i18n/useI18n';
import { useTapGuard } from '@/hooks/useTapGuard';
import type { WellnessService } from '@/types/wellness';
import { cn } from '@/utils/cn';
import styles from './ServiceCard.module.css';

interface ServiceCardProps {
  service: WellnessService;
  onSelect: () => void;
  className?: string;
}

/**
 * Card touch-first de serviço de bem-estar (nome, duração, resumo).
 * O card inteiro é o alvo de toque — sem botões concorrentes dentro.
 */
export function ServiceCard({ service, onSelect, className }: ServiceCardProps) {
  const { t, tx } = useI18n();
  const handleSelect = useTapGuard(onSelect);

  return (
    <button
      type="button"
      className={cn(styles.card, className)}
      onClick={handleSelect}
      aria-label={`${tx(service.name)}${service.duration ? ` — ${tx(service.duration)}` : ''}`}
    >
      <span className={styles.head}>
        <span className={styles.name}>{tx(service.name)}</span>
        {service.duration && (
          <Badge tone="neutral" icon="clock" className={styles.duration}>
            {tx(service.duration)}
          </Badge>
        )}
      </span>
      <span className={styles.summary}>{tx(service.summary)}</span>
      <span className={styles.cta} aria-hidden="true">
        {t.wellness.open}
        <Icon name="arrow-right" size="1.25rem" />
      </span>
    </button>
  );
}
