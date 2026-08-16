import { ContentCard } from '@/components/cards/ContentCard';
import { KioskLayout } from '@/components/layout/KioskLayout';
import { EmptyState } from '@/components/states/StateMessage';
import { ROUTES } from '@/config/kiosk';
import { useKioskNavigation } from '@/app/navigation';
import { useI18n } from '@/features/i18n/useI18n';
import { getSections } from '@/services/contentService';
import styles from './ContentIndexPage.module.css';

export default function ContentIndexPage() {
  const { t, tx } = useI18n();
  const navigation = useKioskNavigation();
  const sections = getSections();

  return (
    <KioskLayout title={t.content.indexTitle} eyebrow={t.nav.youAreHere}>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t.content.indexTitle}</h1>
          <p className={styles.intro}>{t.content.indexIntro}</p>
        </header>

        {sections.length === 0 ? (
          <EmptyState onAction={navigation.home} />
        ) : (
          <ul className={styles.list}>
            {sections.map((section) => (
              <li key={section.slug}>
                <ContentCard
                  layout="horizontal"
                  title={tx(section.title)}
                  eyebrow={tx(section.tagline)}
                  icon={section.icon}
                  description={tx(section.summary)}
                  hasVideo={section.videoIds.length > 0}
                  pendingContent={section.contentPending}
                  onSelect={() => navigation.push(ROUTES.contentDetail(section.slug))}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </KioskLayout>
  );
}
