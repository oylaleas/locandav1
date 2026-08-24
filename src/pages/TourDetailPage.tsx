import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { WindRose } from '@/components/ui/WindRose';
import { TourOptionCard } from '@/components/tours/TourOptionCard';
import { KioskLayout } from '@/components/layout/KioskLayout';
import { ErrorState } from '@/components/states/StateMessage';
import { VideoPlayer } from '@/features/media/VideoPlayer';
import { QRCodePanel } from '@/features/qr/QRCodePanel';
import { useI18n } from '@/features/i18n/useI18n';
import { useKioskNavigation } from '@/app/navigation';
import { getQrTarget, getVideo } from '@/services/contentService';
import { formatTourPrice, getTourBySlug } from '@/services/toursService';
import type { IconName } from '@/types/content';
import { cn } from '@/utils/cn';
import styles from './TourDetailPage.module.css';

interface Fact {
  key: string;
  icon?: IconName;
  label: string;
  value: string;
  emphasize?: boolean;
}

/**
 * DETALHE DO PASSEIO — hierarquia:
 * NOME → RESUMO → LOCAL / DURAÇÃO / DISPONIBILIDADE / VALOR →
 * ROTEIRO → INCLUI → INFORMAÇÕES IMPORTANTES → VÍDEO (se houver) → RESERVA.
 *
 * Campos sem dado cadastrado simplesmente não aparecem — nada é inventado.
 * O bloco de vídeo só monta quando `videoId` existir (pronto para o futuro).
 */
export default function TourDetailPage() {
  const { t, tx, fmt } = useI18n();
  const navigation = useKioskNavigation();
  const { slug } = useParams();
  const tour = getTourBySlug(slug);
  const [reserveOpen, setReserveOpen] = useState(false);

  if (!tour) {
    return (
      <KioskLayout title={t.tours.indexTitle}>
        <ErrorState onHome={navigation.home} />
      </KioskLayout>
    );
  }

  const video = getVideo(tour.videoId);
  const reservation = getQrTarget(tour.reservationQrId ?? 'qr-contato');
  const hasOptions = Boolean(tour.options && tour.options.length > 0);

  const facts: Fact[] = [];
  if (tour.location) {
    facts.push({
      key: 'location',
      icon: 'map-pin',
      label: t.tours.location,
      value: tx(tour.location),
    });
  }
  if (tour.duration) {
    facts.push({ key: 'duration', icon: 'clock', label: t.tours.duration, value: tx(tour.duration) });
  }
  if (!hasOptions && tour.schedule) {
    facts.push({
      key: 'schedule',
      icon: 'clock',
      label: t.tours.schedule,
      value: fmt(t.tours.scheduleRange, { start: tour.schedule.start, end: tour.schedule.end }),
    });
  }
  if (tour.availability) {
    facts.push({
      key: 'availability',
      icon: 'clock',
      label: t.tours.availability,
      value: tx(tour.availability),
    });
  }
  if (!hasOptions && tour.price !== undefined) {
    facts.push({
      key: 'price',
      label: t.tours.price,
      value: formatTourPrice(tour.price, tour.currency ?? 'BRL'),
      emphasize: true,
    });
  }
  if (!hasOptions && tour.capacity) {
    facts.push({ key: 'capacity', label: t.tours.capacity, value: tx(tour.capacity) });
  }

  return (
    <KioskLayout
      title={tx(tour.title)}
      eyebrow={t.nav.youAreHere}
      bleed
      contextActions={
        reservation ? (
          <Button variant="inverse" size="lg" icon="chat" wrapLabel onClick={() => setReserveOpen(true)}>
            {t.tours.requestReservation}
          </Button>
        ) : undefined
      }
    >
      <article className={styles.page}>
        <header className={styles.hero}>
          <WindRose className={styles.heroRose} aria-hidden="true" />
          <p className={styles.eyebrow}>{t.tours.indexTitle}</p>
          <h1 className={styles.title}>{tx(tour.title)}</h1>
        </header>

        <div className={styles.body}>
          <p className={styles.summary}>{tx(tour.description ?? tour.shortDescription)}</p>

          {facts.length > 0 && (
            <section className={styles.info} aria-label={t.content.details}>
              <dl className={styles.infoList}>
                {facts.map((fact) => (
                  <div key={fact.key} className={styles.infoItem}>
                    <dt className={styles.infoLabel}>
                      {fact.icon && <Icon name={fact.icon} size="1.15rem" />}
                      {fact.label}
                    </dt>
                    <dd className={cn(styles.infoValue, fact.emphasize && styles.price)}>
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {hasOptions && tour.options && (
            <section className={styles.options} aria-labelledby="opcoes-titulo">
              <h2 id="opcoes-titulo" className={styles.sectionTitle}>
                {t.tours.optionsTitle}
              </h2>
              <p className={styles.sectionIntro}>{t.tours.optionsIntro}</p>
              <div className={styles.optionsList}>
                {tour.options.map((option) => (
                  <TourOptionCard key={option.id} option={option} />
                ))}
              </div>
            </section>
          )}

          {!hasOptions && tour.route && (
            <section className={styles.route} aria-labelledby="roteiro-titulo">
              <h2 id="roteiro-titulo" className={styles.sectionTitle}>
                {t.tours.routeTitle}
              </h2>
              {tour.routeIntro && <p className={styles.sectionIntro}>{tx(tour.routeIntro)}</p>}
              <ol className={styles.routeList}>
                {tour.route.map((stop) => (
                  <li key={tx(stop)} className={styles.routeItem}>
                    {tx(stop)}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {!hasOptions && (tour.includes || tour.excludes) && (
            <div className={styles.lists}>
              {tour.includes && tour.includes.length > 0 && (
                <section aria-label={t.tours.includesTitle}>
                  <h3 className={styles.sectionTitle}>
                    <Icon name="check" size="1.15rem" className={styles.titleIcon} />
                    {t.tours.includesTitle}
                  </h3>
                  <ul className={styles.plainList}>
                    {tour.includes.map((item) => (
                      <li key={tx(item)} className={cn(styles.listItem, styles.included)}>
                        <Icon name="check" size="1.1rem" className={styles.check} />
                        {tx(item)}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {tour.excludes && tour.excludes.length > 0 && (
                <section aria-label={t.tours.excludesTitle}>
                  <h3 className={styles.sectionTitle}>
                    <Icon name="close" size="1.15rem" className={styles.titleIcon} />
                    {t.tours.excludesTitle}
                  </h3>
                  <ul className={styles.plainList}>
                    {tour.excludes.map((item) => (
                      <li key={tx(item)} className={cn(styles.listItem, styles.excluded)}>
                        <Icon name="close" size="1.1rem" className={styles.close} />
                        {tx(item)}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          )}

          {tour.importantInfo && tour.importantInfo.length > 0 && (
            <section className={styles.important} aria-labelledby="info-importante-titulo">
              <h2 id="info-importante-titulo" className={styles.sectionTitle}>
                <Icon name="info" size="1.15rem" className={styles.titleIcon} />
                {t.tours.importantInfo}
              </h2>
              <ul className={styles.plainList}>
                {tour.importantInfo.map((item) => (
                  <li key={tx(item)} className={styles.listItem}>
                    <Icon name="alert" size="1.1rem" className={styles.alert} />
                    {tx(item)}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {video && (
            <section className={styles.videos} aria-labelledby="videos-titulo">
              <h2 id="videos-titulo" className={styles.sectionTitle}>
                {t.content.videos}
              </h2>
              <VideoPlayer video={video} />
            </section>
          )}

          {reservation && (
            <p className={styles.reserveHint}>{t.tours.reserveIntro}</p>
          )}
        </div>
      </article>

      {reservation && (
        <QRCodePanel
          target={reservation}
          open={reserveOpen}
          onClose={() => setReserveOpen(false)}
        />
      )}
    </KioskLayout>
  );
}
