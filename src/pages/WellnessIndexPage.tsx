import { Navigate } from 'react-router-dom';
import { ActionCard } from '@/components/cards/ActionCard';
import { KioskLayout } from '@/components/layout/KioskLayout';
import { EmptyState } from '@/components/states/StateMessage';
import { ROUTES } from '@/config/kiosk';
import { useKioskNavigation } from '@/app/navigation';
import { useI18n } from '@/features/i18n/useI18n';
import { getWellnessPartners } from '@/services/wellnessService';
import styles from './WellnessIndexPage.module.css';

/**
 * BEM-ESTAR — se houver um único espaço (hoje: Espaço Onoda),
 * entra direto nele. A listagem só aparece se existirem vários parceiros.
 */
export default function WellnessIndexPage() {
  const { t, tx } = useI18n();
  const navigation = useKioskNavigation();
  const partners = getWellnessPartners();

  if (partners.length === 1) {
    return <Navigate to={ROUTES.wellnessPartner(partners[0].id)} replace />;
  }

  return (
    <KioskLayout title={t.wellness.indexTitle} eyebrow={t.nav.youAreHere}>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t.wellness.indexTitle}</h1>
          <p className={styles.intro}>{t.wellness.indexIntro}</p>
        </header>

        {partners.length === 0 ? (
          <EmptyState onAction={navigation.home} />
        ) : (
          <ul className={styles.list}>
            {partners.map((partner) => (
              <li key={partner.id}>
                <ActionCard
                  icon="spa"
                  title={tx(partner.name)}
                  description={tx(partner.tagline)}
                  onSelect={() => navigation.push(ROUTES.wellnessPartner(partner.id))}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </KioskLayout>
  );
}
