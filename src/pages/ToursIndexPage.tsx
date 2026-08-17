import { KioskLayout } from '@/components/layout/KioskLayout';
import { EmptyState } from '@/components/states/StateMessage';
import { Icon } from '@/components/ui/Icon';
import { ROUTES } from '@/config/kiosk';
import { useKioskNavigation } from '@/app/navigation';
import { useI18n } from '@/features/i18n/useI18n';
import { formatTourPrice, getTours } from '@/services/toursService';
import type { Tour, TourOption } from '@/types/tours';
import { cn } from '@/utils/cn';
import styles from './ToursIndexPage.module.css';

/**
 * EXPERIÊNCIAS E PASSEIOS — todas as informações relevantes na própria tela.
 *
 * ROTEIROS (3): título, horário, valor, capacidade e roteiro completos já
 * visíveis — inclusive as duas opções de Moitas de Icaraí lado a lado.
 * ATIVIDADES (6): cards compactos com nome e descrição curta.
 *
 * Layout compacto: cabe na tela do totem sem rolagem (em telas menores o
 * scroll natural do kiosk assume). Clique leva ao detalhe completo.
 */

/** Meta única de horário/valor de um passeio ou opção. */
function MetaLine({
  schedule,
  price,
  currency,
  capacity,
}: {
  schedule?: { start: string; end: string };
  price?: number;
  currency?: 'BRL';
  capacity?: string;
}) {
  const { t, fmt } = useI18n();
  return (
    <div className={styles.metaLine}>
      {schedule && (
        <span className={styles.metaItem}>
          <Icon name="clock" size="1.1rem" />
          {fmt(t.tours.scheduleRange, { start: schedule.start, end: schedule.end })}
        </span>
      )}
      {price !== undefined && (
        <span className={cn(styles.metaItem, styles.price)}>
          {formatTourPrice(price, currency ?? 'BRL')}
        </span>
      )}
      {capacity && <span className={styles.metaItem}>{capacity}</span>}
    </div>
  );
}

/** Roteiro em lista compacta (2 colunas quando há espaço). */
function RouteList({ tour }: { tour: Tour }) {
  const { tx } = useI18n();
  if (!tour.route) return null;
  return (
    <ol className={styles.routeList}>
      {tour.routeIntro && <li className={styles.routeIntro}>{tx(tour.routeIntro)}</li>}
      {tour.route.map((stop) => (
        <li key={tx(stop)} className={styles.routeStop}>
          {tx(stop)}
        </li>
      ))}
    </ol>
  );
}

/** Uma opção (Moitas 1 / 2) compacta. */
function OptionCard({ option }: { option: TourOption }) {
  const { t, tx, fmt } = useI18n();
  return (
    <div className={cn(styles.option, option.number === 1 ? styles.optionBoat : styles.optionLand)}>
      <p className={styles.optionLabel}>
        {fmt(t.tours.optionLabel, { number: option.number })} — {tx(option.label)}
      </p>
      <MetaLine
        schedule={option.schedule}
        price={option.price}
        currency={option.currency}
        capacity={option.capacity ? tx(option.capacity) : undefined}
      />
      <ol className={styles.routeList}>
        {option.route.map((stop) => (
          <li key={tx(stop)} className={styles.routeStop}>
            {tx(stop)}
          </li>
        ))}
      </ol>
      {option.includes && option.includes.length > 0 && (
        <p className={styles.optionNote}>
          <Icon name="check" size="1rem" className={styles.check} />
          {option.includes.map((item) => tx(item)).join(' · ')}
        </p>
      )}
      {option.excludes && option.excludes.length > 0 && (
        <p className={styles.optionNote}>
          <Icon name="close" size="1rem" className={styles.close} />
          {t.tours.excludesTitle}: {option.excludes.map((item) => tx(item)).join(' · ')}
        </p>
      )}
    </div>
  );
}

/** Card de roteiro completo — tudo visível, clique leva ao detalhe. */
function RouteCard({ tour, onOpen }: { tour: Tour; onOpen: () => void }) {
  const { t, tx } = useI18n();
  const hasOptions = Boolean(tour.options && tour.options.length > 0);
  return (
    <article className={cn(styles.routeCard, hasOptions && styles.routeCardWide)}>
      <h2 className={styles.routeTitle}>{tx(tour.title)}</h2>

      {!hasOptions && (
        <>
          <MetaLine
            schedule={tour.schedule}
            price={tour.price}
            currency={tour.currency}
            capacity={tour.capacity ? tx(tour.capacity) : undefined}
          />
          <RouteList tour={tour} />
        </>
      )}

      {hasOptions && tour.options && (
        <div className={styles.optionsGrid}>
          {tour.options.map((option) => (
            <OptionCard key={option.id} option={option} />
          ))}
        </div>
      )}

      <button type="button" className={styles.openBtn} onClick={onOpen} aria-label={`${t.tours.open} — ${tx(tour.title)}`}>
        {t.tours.open}
        <Icon name="arrow-right" size="1.2rem" />
      </button>
    </article>
  );
}

/** Card de atividade (sem roteiro/valor ainda — só nome + descrição). */
function ActivityCard({ tour, onOpen }: { tour: Tour; onOpen: () => void }) {
  const { tx } = useI18n();
  return (
    <button type="button" className={styles.activityCard} onClick={onOpen}>
      <span className={styles.activityText}>
        <span className={styles.activityName}>{tx(tour.title)}</span>
        <span className={styles.activityDesc}>{tx(tour.shortDescription)}</span>
      </span>
      <Icon name="arrow-right" size="1.3rem" className={styles.activityArrow} />
    </button>
  );
}

export default function ToursIndexPage() {
  const { t } = useI18n();
  const navigation = useKioskNavigation();
  const tours = getTours();
  const routes = tours.filter((tour) => tour.route || tour.options);
  const activities = tours.filter((tour) => !tour.route && !tour.options);

  return (
    <KioskLayout title={t.tours.indexTitle} eyebrow={t.nav.youAreHere}>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t.tours.indexTitle}</h1>
          <p className={styles.intro}>{t.tours.indexIntro}</p>
        </header>

        {tours.length === 0 ? (
          <EmptyState message={t.tours.empty} onAction={navigation.home} />
        ) : (
          <>
            <section className={styles.routes} aria-label={t.tours.routeTitle}>
              {routes.map((tour) => (
                <RouteCard
                  key={tour.id}
                  tour={tour}
                  onOpen={() => navigation.push(ROUTES.tourDetail(tour.slug))}
                />
              ))}
            </section>

            {activities.length > 0 && (
              <section className={styles.activities} aria-label={t.tours.indexTitle}>
                <div className={styles.activitiesGrid}>
                  {activities.map((tour) => (
                    <ActivityCard
                      key={tour.id}
                      tour={tour}
                      onOpen={() => navigation.push(ROUTES.tourDetail(tour.slug))}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </KioskLayout>
  );
}
