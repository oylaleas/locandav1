import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { ActionCard } from '@/components/cards/ActionCard';
import { KioskLayout } from '@/components/layout/KioskLayout';
import { ROUTES } from '@/config/kiosk';
import { useKioskNavigation } from '@/app/navigation';
import { useI18n } from '@/features/i18n/useI18n';
import styles from './HomePage.module.css';

const AMBIENT_VIDEO_QUERY = '(min-width: 60.0625rem) and (min-height: 52.0625rem)';

type LowMemoryNavigator = Navigator & { deviceMemory?: number };

function canRenderAmbientVideo(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  const memory = (navigator as LowMemoryNavigator).deviceMemory;
  return (memory === undefined || memory > 1) && window.matchMedia(AMBIENT_VIDEO_QUERY).matches;
}

/**
 * O vídeo da Home é puramente ambiental. Não vale competir por CPU/RAM com a
 * navegação em tablets Go de 1 GB ou em viewports onde a própria composição o
 * oculta. A checagem também evita baixar o iframe do Vimeo sem necessidade.
 */
function useAmbientVideoEnabled() {
  const [enabled, setEnabled] = useState(canRenderAmbientVideo);

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const query = window.matchMedia(AMBIENT_VIDEO_QUERY);
    const update = () => setEnabled(canRenderAmbientVideo());
    update();

    // Chrome antigo usa addListener; browsers modernos usam addEventListener.
    if (query.addEventListener) {
      query.addEventListener('change', update);
      return () => query.removeEventListener('change', update);
    }

    query.addListener(update);
    return () => query.removeListener(update);
  }, []);

  return enabled;
}

/**
 * Vídeo institucional em destaque (embed Vimeo) — tocando sozinho, sem
 * bordas nem cabeçalho, ocupando a coluna própria ao lado do grid.
 */
function HomeVideoCard() {
  const { t } = useI18n();
  return (
    <div className={styles.videoWrapper} aria-label={t.home.videoCardTitle}>
      <iframe
        src="https://player.vimeo.com/video/1218674025?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&controls=0&keyboard=0&title=0&byline=0&portrait=0&dnt=1"
        title={t.home.videoCardTitle}
        loading="lazy"
        allow="autoplay; encrypted-media; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        tabIndex={-1}
      />
      {/*
        Escudo invisível sobre o player: nenhum toque/clique chega ao
        Vimeo — impossível pausar, dar play, ligar o som ou abrir tela
        cheia. O vídeo é ambiente de apresentação, não conteúdo interativo.
      */}
      <span className={styles.videoShield} aria-hidden="true" />
    </div>
  );
}

/**
 * HOME — menu de navegação do totem ("Locanda Experience").
 *
 * PÁGINA ESTÁTICA: o vídeo institucional de apresentação em destaque ao
 * lado (coluna própria) e o hub com as seis áreas principais. Centralizado
 * e sem rolagem.
 */
export default function HomePage() {
  const { t } = useI18n();
  const navigation = useKioskNavigation();
  const ambientVideoEnabled = useAmbientVideoEnabled();

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
        onSelect: () => navigation.push(ROUTES.wellnessPartner('espaco-onoda')),
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

          <div className={styles.homeMain}>
            {/* Em tablets Go/viewport compacto não montamos o iframe ambiental:
                a navegação permanece o primeiro trabalho do hardware. */}
            {ambientVideoEnabled && (
              <div className={styles.videoColumn}>
                <HomeVideoCard />
              </div>
            )}

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
          </div>
        </section>
      </div>
    </KioskLayout>
  );
}
