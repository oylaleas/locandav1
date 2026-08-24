import { Icon } from '@/components/ui/Icon';
import { SmartImage } from '@/components/ui/SmartImage';
import { WindRose } from '@/components/ui/WindRose';
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
  /** Primeira fileira visível — carrega a capa com prioridade. */
  priority?: boolean;
}

/**
 * Card touch-first de uma experiência.
 * O card inteiro é o alvo de toque. Foto oficial quando existir;
 * senão, bloco de marca com ícone (identidade do totem — sem foto inventada).
 */
export function TourCard({ tour, onSelect, priority = false }: TourCardProps) {
  const { t, tx, fmt } = useI18n();
  const handleSelect = useTapGuard(onSelect);
  const cover = getImage(tour.coverImageId);
  const title = tx(tour.title);
  const optionCount = tour.options?.length ?? 0;

  return (
    <button
      type="button"
      className={styles.card}
      onClick={handleSelect}
      aria-label={`${title}. ${t.tours.open}`}
    >
      <span className={styles.media}>
        {cover ? (
          <SmartImage
            asset={cover}
            useThumb
            priority={priority}
            aspectRatio="16 / 10"
            decorative
            className={styles.image}
          />
        ) : (
          <span className={styles.mediaFallback} aria-hidden="true">
            <WindRose className={styles.mediaRose} />
            {tour.icon && (
              <span className={styles.mediaIcon}>
                <Icon name={tour.icon} size="2.75rem" />
              </span>
            )}
          </span>
        )}
      </span>

      <span className={styles.body}>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{tx(tour.shortDescription)}</span>

        {(tour.location || tour.schedule || tour.price !== undefined || optionCount > 1) && (
          <span className={styles.meta}>
            {tour.location && (
              <span className={styles.metaItem}>
                <Icon name="map-pin" size="1.05rem" />
                {tx(tour.location)}
              </span>
            )}
            {tour.schedule && (
              <span className={styles.metaItem}>
                <Icon name="clock" size="1.05rem" />
                {fmt(t.tours.scheduleRange, {
                  start: tour.schedule.start,
                  end: tour.schedule.end,
                })}
              </span>
            )}
            {tour.price !== undefined && (
              <span className={cn(styles.metaItem, styles.price)}>
                {formatTourPrice(tour.price, tour.currency ?? 'BRL')}
              </span>
            )}
            {optionCount > 1 && (
              <span className={styles.metaItem}>
                {fmt(t.tours.optionsBadge, { count: optionCount })}
              </span>
            )}
          </span>
        )}

        <span className={styles.cta} aria-hidden="true">
          {t.tours.open}
          <Icon name="arrow-right" size="1.25rem" />
        </span>
      </span>
    </button>
  );
}
