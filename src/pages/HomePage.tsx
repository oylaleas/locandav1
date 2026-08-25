import { useMemo, type CSSProperties } from 'react';
import { ActionCard } from '@/components/cards/ActionCard';
import { KioskLayout } from '@/components/layout/KioskLayout';
import { ROUTES } from '@/config/kiosk';
import { useKioskNavigation } from '@/app/navigation';
import { useI18n } from '@/features/i18n/useI18n';
import { Icon } from '@/components/ui/Icon';
import styles from './HomePage.module.css';

/**
 * Vídeo institucional em destaque (embed Vimeo) — tocando sozinho, sem
 * bordas nem cabeçalho, ocupando a coluna própria ao lado do grid.
 *
 * Considerações responsáveis:
 * - iframe de terceiros (Vimeo), única exceção externa pedida; `loading="lazy"`
 *   para não carregar antes da Home ser vista;
 * - acessível: `title` no iframe + `aria-label` no container.
 */
function HomeVideoCard() {
  const { t } = useI18n();
  return (
    <div className={styles.videoWrapper} aria-label={t.home.videoCardTitle}>
      <iframe
        src="https://player.vimeo.com/video/1218674025?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&controls=0&keyboard=0&title=0&byline=0&portrait=0&dnt=1"
        title={t.home.videoCardTitle}
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

/** Card especial para Isla Kite Center com contatos visíveis. */
function KiteCard({ onSelect }: { onSelect: () => void }) {
  const { t } = useI18n();
  const handleSelect = (e: React.MouseEvent) => {
    e.preventDefault();
    onSelect();
  };
  return (
    <button type="button" className={styles.kiteCard} onClick={handleSelect}>
      <span className={styles.kiteIcon}>
        <Icon name="kite" size="2rem" />
      </span>
      <span className={styles.kiteText}>
        <span className={styles.kiteTitle}>{t.home.kiteCta}</span>
        <span className={styles.kiteContacts}>
          <span className={styles.kiteContact}>
            <Icon name="chat" size="1rem" />
            {t.home.kiteCtaDesc}
          </span>
        </span>
        <span className={styles.kiteContactHint}>{t.home.kiteCtaContact}</span>
      </span>
      <Icon name="arrow-right" size="1.5rem" className={styles.kiteArrow} />
    </button>
  );
}
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
        onSelect: () => navigation.push(ROUTES.wellnessPartner('espaco-onoda')),
      },
      {
        key: 'tours',
        icon: 'compass' as const,
        title: t.home.toursCta,
        description: t.home.toursCtaDesc,
        onSelect: () => navigation.push(ROUTES.toursIndex),
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
            {/* Vídeo institucional em destaque — coluna própria ao lado. */}
            <div className={styles.videoColumn}>
              <HomeVideoCard />
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
              <li className={styles.hubItem} style={{ '--i': hubItems.length } as CSSProperties}>
                <KiteCard onSelect={() => navigation.push(ROUTES.contentDetail('kite-center'))} />
              </li>
            </ul>
          </div>
        </section>
      </div>
    </KioskLayout>
  );
}
