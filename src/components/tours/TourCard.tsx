import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { SmartImage } from '@/components/ui/SmartImage';
import { useI18n } from '@/features/i18n/useI18n';
import { useTapGuard } from '@/hooks/useTapGuard';
import { getImage } from '@/services/contentService';
import { formatTourPrice } from '@/services/toursService';
import type { Tour } from '@/types/tours';
import { cn } from '@/utils/cn';
import styles from './TourCard.module.css';

interface TourCardProps {
  tour: Tour;
  onSelect: () => void;
  className?: string;
  /** Imagens fora da dobra carregam sob demanda. */
  priority?: boolean;
}

/**
 * Card grande e visual de passeio — o card inteiro é o alvo de toque.
 * Exibe: foto de capa, título, resumo, horário/valor (quando únicos) ou
 * contagem de opções (quando o passeio possui opções).
 */
export function TourCard({ tour, onSelect, className, priority = false }: TourCardProps) {
  const { t, tx, fmt } = useI18n();
  const handleSelect = useTapGuard(onSelect);
  const cover = getImage(tour.coverImageId);
  const hasOptions = Boolean(tour.options && tour.options.length > 0);

  return (
    <button
      type="button"
      className={cn(styles.card, className)}
      onClick={handleSelect}
    >
      <span className={styles.media}>
        <SmartImage
          asset={cover}
          useThumb={false}
          priority={priority}
          aspectRatio="16 / 9"
          decorative
          className={styles.image}
        />
        {hasOptions && (
          <Badge tone="inverse" icon="compass" className={styles.optionsBadge}>
            {fmt(t.tours.optionsBadge, { count: tour.options!.length })}
          </Badge>
        )}
      </span>

      <span className={styles.body}>
        <span className={styles.title}>{tx(tour.title)}</span>
        <span className={styles.description}>{tx(tour.shortDescription)}</span>

        <span className={styles.meta}>
          {tour.schedule && !hasOptions && (
            <span className={styles.metaItem}>
              <Icon name="clock" size="1.15rem" />
              {fmt(t.tours.scheduleRange, {
                start: tour.schedule.start,
                end: tour.schedule.end,
              })}
            </span>
          )}
          {tour.price !== undefined && !hasOptions && (
            <span className={cn(styles.metaItem, styles.price)}>
              {formatTourPrice(tour.price, tour.currency ?? 'BRL')}
            </span>
          )}
          {hasOptions && tour.options!.length === 2 && (
            <span className={styles.metaItem}>
              <Icon name="boat" size="1.15rem" />
              {tx(tour.options![0].label)} · {tx(tour.options![1].label)}
            </span>
          )}
        </span>

        <span className={styles.cta} aria-hidden="true">
          {t.tours.open}
          <Icon name="arrow-right" size="1.25rem" />
        </span>
      </span>
    </button>
  );
}
