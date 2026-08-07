import { useState, type CSSProperties } from 'react';
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
 * Projetada como PÁGINA ESTÁTICA: todo o conteúdo cabe na tela, sem rolagem.
 * A Home é um HUB — apenas botões de navegação (TOQUE → CATEGORIA → CONTEÚDO).
 * Os conteúdos institucionais completos ficam nas próprias seções.
 */
export default function HomePage() {
  const { t, tx } = useI18n();
  const navigation = useKioskNavigation();
  const identity = getSiteIdentity();
  const qrTarget = getQrTarget('qr-site');
  const reservationsTarget = getQrTarget('qr-reservas');
  const [qrOpen, setQrOpen] = useState(false);
  const [reservationsOpen, setReservationsOpen] = useState(false);

  const hubItems = [
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
  ];

  const quickItems = [
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
            onSelect: () => setQrOpen(true),
          },
        ]
      : []),
    ...(reservationsTarget
      ? [
          {
            key: 'reservas',
            icon: 'bed' as const,
            title: tx(reservationsTarget.title),
            onSelect: () => setReservationsOpen(true),
          },
        ]
      : []),
  ];

  return (
    <KioskLayout showBack={false} showBrand={false}>
      <div className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroBrand}>
            <WindRose size="clamp(11rem, 30vw, 20rem)" className={styles.heroRose} />
            <Brandmark size="md" withDescriptor />
          </div>
          <h1 className={styles.welcome}>{tx(identity.homeWelcome)}</h1>
          <p className={styles.intro}>{tx(identity.homeIntro)}</p>
        </header>

        {/* LOCANDA EXPERIENCE — as seis áreas principais do totem. */}
        <section
          className={styles.hub}
          aria-labelledby="locanda-experience-titulo"
        >
          <div className={styles.hubHeader}>
            <h2 id="locanda-experience-titulo" className={styles.hubTitle}>
              {t.home.experienceHubTitle}
            </h2>
          </div>
          <ul className={styles.hubGrid}>
            {hubItems.map((item, index) => (
              <li
                key={item.key}
                className={styles.hubItem}
                style={{ '--i': index } as CSSProperties}
              >
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

        {/* Acessos rápidos — sem rolagem, tudo na mesma tela. */}
        <nav className={styles.quick} aria-label={t.home.experienceHubIntro}>
          <ul className={styles.quickGrid}>
            {quickItems.map((item, index) => (
              <li
                key={item.key}
                className={styles.quickItem}
                style={{ '--i': index } as CSSProperties}
              >
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
        <QRCodePanel target={qrTarget} open={qrOpen} onClose={() => setQrOpen(false)} />
      )}
      {reservationsTarget && (
        <QRCodePanel
          target={reservationsTarget}
          open={reservationsOpen}
          onClose={() => setReservationsOpen(false)}
        />
      )}
    </KioskLayout>
  );
}
