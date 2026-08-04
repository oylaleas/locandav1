import { ActionCard } from '@/components/cards/ActionCard';
import { KioskLayout } from '@/components/layout/KioskLayout';
import { EmptyState } from '@/components/states/StateMessage';
import { ROUTES } from '@/config/kiosk';
import { useKioskNavigation } from '@/app/navigation';
import { useI18n } from '@/features/i18n/useI18n';
import { getWellnessPartners } from '@/services/wellnessService';
import styles from './WellnessIndexPage.module.css';

/**
 * BEM-ESTAR — listagem de espaços (hoje: Espaço Onoda).
 * A Home oferece apenas o acesso; o conteúdo completo vive aqui.
 */
export default function WellnessIndexPage() {
  const { t, tx } = useI18n();
  const navigation = useKioskNavigation();
  const partners = getWellnessPartners();

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
