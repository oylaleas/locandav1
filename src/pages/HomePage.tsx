import { useMemo, type CSSProperties } from 'react';
import { ActionCard } from '@/components/cards/ActionCard';
import { KioskLayout } from '@/components/layout/KioskLayout';
import { ROUTES } from '@/config/kiosk';
import { useKioskNavigation } from '@/app/navigation';
import { useI18n } from '@/features/i18n/useI18n';
import styles from './HomePage.module.css';

/**
 * HOME — menu de navegação do totem ("Locanda Experience").
 *
 * PÁGINA ESTÁTICA: apenas o hub com as seis áreas principais do totem,
 * centralizado e sem rolagem (o bloco do topo foi removido a pedido do
 * responsável).
 *
 * Otimizações de fluidez:
 * - itens memoizados (useMemo) — a Home não recria arrays a cada render;
 * - grids com `contain: layout` (isola o layout dos cards).
 */
export default function HomePage() {
  const { t } = useI18n();
  const navigation = useKioskNavigation();

  /* LOCANDA EXPERIENCE — as seis áreas principais do totem. */
  const hubItems = useMemo(
    () => [
      {
        key: 'amenities',
        icon: 'wifi' as const,
        title: t.home.amenitiesCta,
        description: t.home.amenitiesCtaDesc,
        onSelect: () => navigation.push(ROUTES.contentDetail('comodidades')),
      },
      {
        key: 'happy-hour',
        icon: 'cocktail' as const,
        title: t.home.happyHourCta,
        description: t.home.happyHourCtaDesc,
        onSelect: () => navigation.push(ROUTES.contentDetail('happy-hour')),
      },
      {
        key: 'on-demand',
        icon: 'bell' as const,
        title: t.home.onDemandCta,
        description: t.home.onDemandCtaDesc,
        onSelect: () => navigation.push(ROUTES.contentDetail('servicos-on-demand')),
      },
      {
        key: 'wellness',
        icon: 'spa' as const,
        title: t.home.wellnessCta,
        description: t.home.wellnessCtaDesc,
        onSelect: () => navigation.push(ROUTES.wellnessIndex),
      },
      {
        key: 'tours',
        icon: 'compass' as const,
        title: t.home.toursCta,
        description: t.home.toursCtaDesc,
        onSelect: () => navigation.push(ROUTES.toursIndex),
      },
      {
        key: 'kite',
        icon: 'kite' as const,
        title: t.home.kiteCta,
        description: t.home.kiteCtaDesc,
        onSelect: () => navigation.push(ROUTES.contentDetail('kite-center')),
      },
    ],
    [t, navigation],
  );

  return (
    <KioskLayout showBack={false} showBrand={false}>
      <div className={styles.page}>
        <section className={styles.hub} aria-labelledby="locanda-experience-titulo">
          <div className={styles.hubHeader}>
            <h1 id="locanda-experience-titulo" className={styles.hubTitle}>
              {t.home.experienceHubTitle}
            </h1>
            <p className={styles.hubIntro}>{t.home.experienceHubIntro}</p>
          </div>
          <ul className={styles.hubGrid}>
            {hubItems.map((item, index) => (
              <li key={item.key} className={styles.hubItem} style={{ '--i': index } as CSSProperties}>
                <ActionCard
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  onSelect={item.onSelect}
                  className={styles.hubCard}
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </KioskLayout>
  );
}
