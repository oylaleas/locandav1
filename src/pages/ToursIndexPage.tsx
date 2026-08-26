import { useId, useRef } from 'react';
import { KioskLayout } from '@/components/layout/KioskLayout';
import { EmptyState } from '@/components/states/StateMessage';
import { Icon } from '@/components/ui/Icon';
import { ROUTES } from '@/config/kiosk';
import { useKioskNavigation } from '@/app/navigation';
import { useAccessibility } from '@/features/a11y/AccessibilityProvider';
import { useI18n } from '@/features/i18n/useI18n';
import { getTours } from '@/services/toursService';
import type { Tour } from '@/types/tours';
import { cn } from '@/utils/cn';
import styles from './ToursIndexPage.module.css';

/** Card de atividade (sem roteiro/valor ainda — só nome + descrição). */
function ActivityCard({ tour, onOpen }: { tour: Tour; onOpen: () => void }) {
  const { tx } = useI18n();
  return (
    <button type="button" className={styles.activityCard} onClick={onOpen}>
      <span className={styles.activityText}>
        <span className={styles.activityName}>{tx(tour.title)}</span>
        <span className={styles.activityDesc}>{tx(tour.shortDescription)}</span>
      </span>
      <Icon name="arrow-right" size="1.3rem" className={styles.activityArrow} />
    </button>
  );
}

/** Carrossel de atividades com navegação por setas. */
function ActivitiesCarousel({ activities, onOpen }: { activities: Tour[]; onOpen: (tour: Tour) => void }) {
  const { t } = useI18n();
  const { motionReduced } = useAccessibility();
  const scrollRef = useRef<HTMLDivElement>(null);
  const carouselId = useId();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: motionReduced ? 'auto' : 'smooth',
      });
    }
  };

  return (
    <div className={styles.carousel}>
      <button
        type="button"
        className={cn(styles.carouselBtn, styles.carouselBtnLeft)}
        onClick={() => scroll('left')}
        aria-controls={carouselId}
        aria-label={t.tours.carouselPrev}
      >
        <Icon name="arrow-left" size="1.5rem" />
      </button>

      <div
        id={carouselId}
        className={styles.carouselTrack}
        ref={scrollRef}
        role="region"
        aria-label={t.tours.indexTitle}
      >
        {activities.map((tour) => (
          <ActivityCard
            key={tour.id}
            tour={tour}
            onOpen={() => onOpen(tour)}
          />
        ))}
      </div>

      <button
        type="button"
        className={cn(styles.carouselBtn, styles.carouselBtnRight)}
        onClick={() => scroll('right')}
        aria-controls={carouselId}
        aria-label={t.tours.carouselNext}
      >
        <Icon name="arrow-right" size="1.5rem" />
      </button>
    </div>
  );
}

export default function ToursIndexPage() {
  const { t } = useI18n();
  const navigation = useKioskNavigation();
  const tours = getTours();
  const activities = tours.filter((tour) => !tour.route && !tour.options);

  return (
    <KioskLayout title={t.tours.indexTitle} eyebrow={t.nav.youAreHere}>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t.tours.indexTitle}</h1>
          <p className={styles.intro}>{t.tours.indexIntro}</p>
        </header>

        {tours.length === 0 ? (
          <EmptyState message={t.tours.empty} onAction={navigation.home} />
        ) : (
          <>
            {activities.length > 0 && (
              <section className={styles.activities} aria-label={t.tours.indexTitle}>
                <ActivitiesCarousel
                  activities={activities}
                  onOpen={(tour) => navigation.push(ROUTES.tourDetail(tour.slug))}
                />
              </section>
            )}
            <p className={styles.priceNote}>
              <Icon name="info" size="1.1rem" />
              {t.tours.priceNote}
            </p>
          </>
        )}
      </div>
    </KioskLayout>
  );
}
