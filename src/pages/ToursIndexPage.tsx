import type { CSSProperties } from 'react';
import { KioskLayout } from '@/components/layout/KioskLayout';
import { EmptyState } from '@/components/states/StateMessage';
import { TourCard } from '@/components/tours/TourCard';
import { ROUTES } from '@/config/kiosk';
import { useKioskNavigation } from '@/app/navigation';
import { useI18n } from '@/features/i18n/useI18n';
import { getShowcaseTours } from '@/services/toursService';
import styles from './ToursIndexPage.module.css';

/**
 * EXPERIÊNCIAS E PASSEIOS — vitrine 3×2 das seis experiências.
 * Sem rolagem na área útil do totem: título + seis cards + barra inferior.
 * Toque no card abre o detalhe (preço, duração, reserva — só o que estiver cadastrado).
 */
export default function ToursIndexPage() {
  const { t } = useI18n();
  const navigation = useKioskNavigation();
  const tours = getShowcaseTours();

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
          <ul className={styles.grid} aria-label={t.tours.indexTitle}>
            {tours.map((tour, index) => (
              <li key={tour.id} className={styles.item} style={{ '--i': index } as CSSProperties}>
                <TourCard
                  tour={tour}
                  priority={index < 3}
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
