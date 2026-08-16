import { useParams } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { WindRose } from '@/components/ui/WindRose';
import { TourOptionCard } from '@/components/tours/TourOptionCard';
import { KioskLayout } from '@/components/layout/KioskLayout';
import { ErrorState } from '@/components/states/StateMessage';
import { VideoPlayer } from '@/features/media/VideoPlayer';
import { useI18n } from '@/features/i18n/useI18n';
import { useKioskNavigation } from '@/app/navigation';
import { getVideo } from '@/services/contentService';
import { formatTourPrice, getTourBySlug } from '@/services/toursService';
import { cn } from '@/utils/cn';
import styles from './TourDetailPage.module.css';

/**
 * DETALHE DO PASSEIO — hierarquia:
 * NOME → RESUMO → HORÁRIO → VALOR → ROTEIRO → INCLUI/NÃO INCLUI → VÍDEO.
 * Sem fotografias (decisão do responsável): o topo usa a identidade da
 * marca (rosa dos ventos) em vez de foto de capa.
 */
export default function TourDetailPage() {
  const { t, tx, fmt } = useI18n();
  const navigation = useKioskNavigation();
  const { slug } = useParams();
  const tour = getTourBySlug(slug);

  if (!tour) {
    return (
      <KioskLayout title={t.tours.indexTitle}>
        <ErrorState onHome={navigation.home} />
      </KioskLayout>
    );
  }

  const video = getVideo(tour.videoId);
  const hasOptions = Boolean(tour.options && tour.options.length > 0);

  return (
    <KioskLayout title={tx(tour.title)} eyebrow={t.nav.youAreHere} bleed>
      <article className={styles.page}>
        <header className={styles.hero}>
          <WindRose className={styles.heroRose} aria-hidden="true" />
          <p className={styles.eyebrow}>{t.tours.indexTitle}</p>
          <h1 className={styles.title}>{tx(tour.title)}</h1>
        </header>

        <div className={styles.body}>
          <p className={styles.summary}>{tx(tour.shortDescription)}</p>

          {!hasOptions && tour.schedule && (
            <section className={styles.info} aria-label={t.tours.schedule}>
              <dl className={styles.infoList}>
                <div className={styles.infoItem}>
                  <dt className={styles.infoLabel}>
                    <Icon name="clock" size="1.15rem" />
                    {t.tours.schedule}
                  </dt>
                  <dd className={styles.infoValue}>
                    {fmt(t.tours.scheduleRange, {
                      start: tour.schedule.start,
                      end: tour.schedule.end,
                    })}
                  </dd>
                </div>
                {tour.price !== undefined && (
                  <div className={styles.infoItem}>
                    <dt className={styles.infoLabel}>{t.tours.price}</dt>
                    <dd className={cn(styles.infoValue, styles.price)}>
                      {formatTourPrice(tour.price, tour.currency ?? 'BRL')}
                    </dd>
                  </div>
                )}
                {tour.capacity && (
                  <div className={styles.infoItem}>
                    <dt className={styles.infoLabel}>{t.tours.capacity}</dt>
                    <dd className={styles.infoValue}>{tx(tour.capacity)}</dd>
                  </div>
                )}
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

          {video && (
            <section className={styles.videos} aria-labelledby="videos-titulo">
              <h2 id="videos-titulo" className={styles.sectionTitle}>
                {t.content.videos}
              </h2>
              <VideoPlayer video={video} />
            </section>
          )}

        </div>
      </article>
    </KioskLayout>
  );
}
