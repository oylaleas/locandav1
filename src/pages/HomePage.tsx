import { useMemo, type CSSProperties } from 'react';
import { ActionCard } from '@/components/cards/ActionCard';
import { Badge } from '@/components/ui/Badge';
import { KioskLayout } from '@/components/layout/KioskLayout';
import { ROUTES } from '@/config/kiosk';
import { useKioskNavigation } from '@/app/navigation';
import { useI18n } from '@/features/i18n/useI18n';
import styles from './HomePage.module.css';

/**
 * Vídeo institucional da Home (embed Vimeo).
 *
 * Considerações responsáveis:
 * - é um iframe de terceiros (Vimeo) — única exceção de requisição externa
 *   do totem, pedida explicitamente; o fundo do card usa a identidade da
 *   marca para manter a coerência visual mesmo se o player não carregar
 *   (offline);
 * - o player se adapta ao container (o vídeo original é vertical 9:16);
 * - acessível: `title` + `aria-label` no container; `loading="lazy"` para
 *   não carregar antes da Home ser vista.
 */
function HomeVideoCard() {
  const { t } = useI18n();
  return (
    <div className={styles.videoCard}>
      <header className={styles.videoHead}>
        <Badge tone="inverse" icon="play">
          {t.home.videoCardBadge}
        </Badge>
        <span className={styles.videoTitle}>{t.home.videoCardTitle}</span>
      </header>
      <div className={styles.videoWrapper} aria-label={t.home.videoCardTitle}>
        <iframe
          src="https://player.vimeo.com/video/1218674025?badge=0&autopause=0&player_id=0&app_id=58479"
          title={t.home.videoCardTitle}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}

/**
 * HOME — menu de navegação do totem ("Locanda Experience").
 *
 * PÁGINA ESTÁTICA: hub com as seis áreas principais + o vídeo institucional
 * (ordem visual: Comodidades → Vídeo → Bem-estar → …), centralizado e sem
 * rolagem.
 */
export default function HomePage() {
  const { t } = useI18n();
  const navigation = useKioskNavigation();

  /* LOCANDA EXPERIENCE — as seis áreas principais do totem.
     Ordem ajustada: Comodidades e Bem-estar ficam adjacentes (com o vídeo
     entre eles no grid), depois Happy Hour, On Demand, Tours e Kite. */
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
        key: 'wellness',
        icon: 'spa' as const,
        title: t.home.wellnessCta,
        description: t.home.wellnessCtaDesc,
        onSelect: () => navigation.push(ROUTES.wellnessIndex),
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
            {hubItems.slice(0, 1).map((item, index) => (
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
            {/* Vídeo institucional — ordem visual: Comodidades → Vídeo → Bem-estar.
                O card ocupa 2 linhas do grid (proporção vertical 9:16). */}
            <li key="video" className={styles.videoItem} style={{ '--i': 1 } as CSSProperties}>
              <HomeVideoCard />
            </li>
            {hubItems.slice(1).map((item, index) => (
              <li key={item.key} className={styles.hubItem} style={{ '--i': index + 2 } as CSSProperties}>
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
