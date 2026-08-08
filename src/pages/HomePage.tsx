import { useCallback, useMemo, useState, type CSSProperties } from 'react';
import { ActionCard } from '@/components/cards/ActionCard';
import { Brandmark } from '@/components/layout/Brandmark';
import { KioskLayout } from '@/components/layout/KioskLayout';
import { WindRose } from '@/components/ui/WindRose';
import { ROUTES } from '@/config/kiosk';
import { useKioskNavigation } from '@/app/navigation';
import { QRCodePanel } from '@/features/qr/QRCodePanel';
import { useI18n } from '@/features/i18n/useI18n';
import { getQrTarget, getSiteIdentity } from '@/services/contentService';
import styles from './HomePage.module.css';

/**
 * HOME — menu de navegação do totem ("Locanda Experience").
 *
 * PÁGINA ESTÁTICA: todo o conteúdo cabe na tela, sem rolagem, com as três
 * seções (hero, hub, acessos) centralizadas e proporcionais.
 *
 * Otimizações de fluidez:
 * - itens e handlers memoizados (useMemo/useCallback) — a Home não recria
 *   closures nem arrays a cada render;
 * - grids com `contain: layout` (isola o layout dos cards);
 * - rosa dos ventos posicionada com `inset:0 + margin:auto` (o spin de
 *   transform não sobrescreve o posicionamento) e `will-change: transform`.
 */
export default function HomePage() {
  const { t, tx } = useI18n();
  const navigation = useKioskNavigation();
  const identity = getSiteIdentity();
  const qrTarget = getQrTarget('qr-site');
  const reservationsTarget = getQrTarget('qr-reservas');
  const [qrOpen, setQrOpen] = useState(false);
  const [reservationsOpen, setReservationsOpen] = useState(false);

  const openSiteQr = useCallback(() => setQrOpen(true), []);
  const openReservationsQr = useCallback(() => setReservationsOpen(true), []);
  const closeSiteQr = useCallback(() => setQrOpen(false), []);
  const closeReservationsQr = useCallback(() => setReservationsOpen(false), []);

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

  /* Acessos rápidos — QR de handoff quando há destino real. */
  const quickItems = useMemo(
    () => [
      {
        key: 'contents',
        icon: 'info' as const,
        title: t.home.exploreAll,
        onSelect: () => navigation.push(ROUTES.contentIndex),
      },
      {
        key: 'gallery',
        icon: 'gallery' as const,
        title: t.home.galleryCta,
        onSelect: () => navigation.push(ROUTES.gallery),
      },
      ...(qrTarget
        ? [
            {
              key: 'site',
              icon: 'qr' as const,
              title: tx(qrTarget.title),
              onSelect: openSiteQr,
            },
          ]
        : []),
      ...(reservationsTarget
        ? [
            {
              key: 'reservas',
              icon: 'bed' as const,
              title: tx(reservationsTarget.title),
              onSelect: openReservationsQr,
            },
          ]
        : []),
    ],
    [t, tx, navigation, qrTarget, reservationsTarget, openSiteQr, openReservationsQr],
  );

  return (
    <KioskLayout showBack={false} showBrand={false}>
      <div className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroBrand}>
            <WindRose className={styles.heroRose} />
            <Brandmark size="md" withDescriptor />
          </div>
          <h1 className={styles.welcome}>{tx(identity.homeWelcome)}</h1>
          <p className={styles.intro}>{tx(identity.homeIntro)}</p>
        </header>

        <section className={styles.hub} aria-labelledby="locanda-experience-titulo">
          <div className={styles.hubHeader}>
            <h2 id="locanda-experience-titulo" className={styles.hubTitle}>
              {t.home.experienceHubTitle}
            </h2>
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

        <nav className={styles.quick} aria-label={t.home.experienceHubIntro}>
          <ul className={styles.quickGrid}>
            {quickItems.map((item, index) => (
              <li key={item.key} className={styles.quickItem} style={{ '--i': index } as CSSProperties}>
                <ActionCard
                  icon={item.icon}
                  title={item.title}
                  onSelect={item.onSelect}
                  className={styles.quickCard}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {qrTarget && (
        <QRCodePanel target={qrTarget} open={qrOpen} onClose={closeSiteQr} />
      )}
      {reservationsTarget && (
        <QRCodePanel target={reservationsTarget} open={reservationsOpen} onClose={closeReservationsQr} />
      )}
    </KioskLayout>
  );
}
