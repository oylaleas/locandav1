import { Icon } from '@/components/ui/Icon';
import { useTapGuard } from '@/hooks/useTapGuard';
import type { IconName } from '@/types/content';
import { cn } from '@/utils/cn';
import styles from './ActionCard.module.css';

interface ActionCardProps {
  icon: IconName;
  title: string;
  description?: string;
  onSelect: () => void;
  tone?: 'surface' | 'accent';
  className?: string;
}

/** Card de navegação/ação sem fotografia (galeria, QR, contato). */
export function ActionCard({
  icon,
  title,
  description,
  onSelect,
  tone = 'surface',
  className,
}: ActionCardProps) {
  const handleSelect = useTapGuard(onSelect);

  return (
    <button
      type="button"
      className={cn(styles.card, styles[tone], className)}
      onClick={handleSelect}
    >
      <span className={styles.icon}>
        <Icon name={icon} size="2rem" />
      </span>
      <span className={styles.text}>
        <span className={styles.title}>{title}</span>
        {description && <span className={styles.description}>{description}</span>}
      </span>
      <Icon name="arrow-right" size="1.5rem" />
    </button>
  );
}
