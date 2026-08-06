import { useState } from 'react';
import { ActionCard } from '@/components/cards/ActionCard';
import { ContentCard } from '@/components/cards/ContentCard';
import { Brandmark } from '@/components/layout/Brandmark';
import { KioskLayout } from '@/components/layout/KioskLayout';
import { Icon } from '@/components/ui/Icon';
import { WindRose } from '@/components/ui/WindRose';
import { ROUTES } from '@/config/kiosk';
import { useKioskNavigation } from '@/app/navigation';
import { QRCodePanel } from '@/features/qr/QRCodePanel';
import { useI18n } from '@/features/i18n/useI18n';
import {
  getImage,
  getMainGallery,
  getQrTarget,
  getSections,
  getSiteIdentity,
} from '@/services/contentService';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { t, tx } = useI18n();
  const navigation = useKioskNavigation();
  const identity = getSiteIdentity();
  const sections = getSections();
  const gallery = getMainGallery();
  const qrTarget = getQrTarget('qr-site');
  const reservationsTarget = getQrTarget('qr-reservas');
  const [qrOpen, setQrOpen] = useState(false);
  const [reservationsOpen, setReservationsOpen] = useState(false);

  const [featured, ...rest] = sections;

  return (
    <KioskLayout showBack={false} showBrand={false}>
      <div className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroBrand}>
            {/* Rosa dos ventos dourada (eco da logo) ao fundo da marca. */}
            <WindRose size="clamp(13rem, 30vw, 22rem)" className={styles.heroRose} />
            <Brandmark size="md" withDescriptor />
          </div>
          <div className={styles.heroText}>
            <h1 className={styles.welcome}>{tx(identity.homeWelcome)}</h1>
            <p className={styles.intro}>{tx(identity.homeIntro)}</p>
          </div>
        </header>

        {/* LOCANDA EXPERIENCE — hub com as seis áreas principais do totem.
            A Home funciona como ponto de partida: TOQUE → CATEGORIA → CONTEÚDO. */}
        <section className={styles.hub} aria-labelledby="locanda-experience-titulo">
          <div className={styles.hubHeader}>
            <h2 id="locanda-experience-titulo" className={styles.hubTitle}>
              {t.home.experienceHubTitle}
            </h2>
            <p className={styles.hubIntro}>{t.home.experienceHubIntro}</p>
          </div>
          <ul className={styles.hubGrid}>
            <li>
              <ActionCard
                icon="wifi"
                title={t.home.amenitiesCta}
                description={t.home.amenitiesCtaDesc}
                onSelect={() => navigation.push(ROUTES.contentDetail('comodidades'))}
              />
            </li>
            <li>
              <ActionCard
                icon="cocktail"
                title={t.home.happyHourCta}
                description={t.home.happyHourCtaDesc}
                onSelect={() => navigation.push(ROUTES.contentDetail('happy-hour'))}
              />
            </li>
            <li>
              <ActionCard
                icon="bell"
                title={t.home.onDemandCta}
                description={t.home.onDemandCtaDesc}
                onSelect={() => navigation.push(ROUTES.contentDetail('servicos-on-demand'))}
              />
            </li>
            <li>
              <ActionCard
                icon="spa"
                title={t.home.wellnessCta}
                description={t.home.wellnessCtaDesc}
                onSelect={() => navigation.push(ROUTES.wellnessIndex)}
              />
            </li>
            <li>
              <ActionCard
                icon="compass"
                title={t.home.toursCta}
                description={t.home.toursCtaDesc}
                onSelect={() => navigation.push(ROUTES.toursIndex)}
              />
            </li>
            <li>
              <ActionCard
                icon="kite"
                title={t.home.kiteCta}
                description={t.home.kiteCtaDesc}
                onSelect={() => navigation.push(ROUTES.contentDetail('kite-center'))}
              />
            </li>
          </ul>
        </section>

        {featured && (
          <section aria-labelledby="destaque-titulo" className={styles.featuredSection}>
            <h2 id="destaque-titulo" className="visually-hidden">
              {tx(featured.title)}
            </h2>
            <ContentCard
              featured
              priority
              title={tx(featured.title)}
              eyebrow={tx(featured.tagline)}
              icon={featured.icon}
              description={tx(featured.summary)}
              image={getImage(featured.heroImageId)}
              hasVideo={featured.videoIds.length > 0}
              photoCount={featured.galleryImageIds.length}
              pendingContent={featured.contentPending}
              onSelect={() => navigation.push(ROUTES.contentDetail(featured.slug))}
            />
          </section>
        )}

        <section aria-labelledby="secoes-titulo" className={styles.gridSection}>
          <div className={styles.sectionHeader}>
            <h2 id="secoes-titulo" className={styles.sectionTitle}>
              {t.content.indexTitle}
            </h2>
            <span className={styles.scrollHint}>
              <Icon name="chevron-down" size="1.1rem" />
              {t.home.scrollHint}
            </span>
          </div>

          <ul className={styles.grid}>
            {rest.map((section) => (
              <li key={section.slug} className={styles.gridItem}>
                <ContentCard
                  title={tx(section.title)}
                  eyebrow={tx(section.tagline)}
                  icon={section.icon}
                  description={tx(section.summary)}
                  image={getImage(section.heroImageId)}
                  hasVideo={section.videoIds.length > 0}
                  photoCount={section.galleryImageIds.length}
                  pendingContent={section.contentPending}
                  onSelect={() => navigation.push(ROUTES.contentDetail(section.slug))}
                />
              </li>
            ))}
          </ul>
        </section>

        <section aria-label={t.nav.menu} className={styles.actions}>
          <ActionCard
            icon="info"
            title={t.home.exploreAll}
            description={t.content.indexIntro}
            onSelect={() => navigation.push(ROUTES.contentIndex)}
          />
          {gallery && (
            <ActionCard
              icon="gallery"
              title={t.home.galleryCta}
              description={tx(gallery.description)}
              onSelect={() => navigation.push(ROUTES.gallery)}
            />
          )}
          {qrTarget && (
            <ActionCard
              icon="qr"
              title={tx(qrTarget.title)}
              description={tx(qrTarget.instruction)}
              onSelect={() => setQrOpen(true)}
            />
          )}
          {reservationsTarget && (
            <ActionCard
              icon="bed"
              tone="accent"
              title={tx(reservationsTarget.title)}
              description={tx(reservationsTarget.instruction)}
              onSelect={() => setReservationsOpen(true)}
            />
          )}
        </section>
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
