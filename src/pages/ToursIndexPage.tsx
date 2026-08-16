import { TourCard } from '@/components/tours/TourCard';
import { KioskLayout } from '@/components/layout/KioskLayout';
import { EmptyState } from '@/components/states/StateMessage';
import { ROUTES } from '@/config/kiosk';
import { useKioskNavigation } from '@/app/navigation';
import { useI18n } from '@/features/i18n/useI18n';
import { getTours } from '@/services/toursService';
import styles from './ToursIndexPage.module.css';

/**
 * EXPERIÊNCIAS E PASSEIOS — listagem de roteiros.
 * Cards grandes, visuais e touch-first. O detalhe fica em TourDetailPage.
 */
export default function ToursIndexPage() {
  const { t } = useI18n();
  const navigation = useKioskNavigation();
  const tours = getTours();

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
          <ul className={styles.list}>
            {tours.map((tour) => (
              <li key={tour.id}>
                <TourCard
                  tour={tour}
                  onSelect={() => navigation.push(ROUTES.tourDetail(tour.slug))}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </KioskLayout>
  );
}
