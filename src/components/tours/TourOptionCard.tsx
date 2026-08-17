import { Icon } from '@/components/ui/Icon';
import { useI18n } from '@/features/i18n/useI18n';
import { formatTourPrice } from '@/services/toursService';
import type { TourOption } from '@/types/tours';
import { cn } from '@/utils/cn';
import styles from './TourOptionCard.module.css';

interface TourOptionCardProps {
  option: TourOption;
  className?: string;
}

/**
 * Card informativo de UMA opção de passeio.
 *
 * A diferenciação entre opções é SEMPRE textual explícita ("Opção 1 — Com
 * passeio de barco" / "Opção 2 — Sem passeio de barco") e reforçada por
 * ícone + listas Inclui/Não inclui. Nunca depende apenas de cor.
 */
export function TourOptionCard({ option, className }: TourOptionCardProps) {
  const { t, tx, fmt } = useI18n();
  const withBoat = option.number === 1;
  const optionLabel = `${fmt(t.tours.optionLabel, { number: option.number })} — ${tx(option.label)}`;

  return (
    <article
      className={cn(styles.card, withBoat ? styles.optionBoat : styles.optionLand, className)}
      aria-labelledby={`opcao-${option.id}`}
    >
      <header className={styles.header}>
        <span
          id={`opcao-${option.id}`}
          className={cn(styles.badge, withBoat ? styles.badgeBoat : styles.badgeLand)}
        >
          <Icon name={withBoat ? 'boat' : 'map-pin'} size="1.15rem" />
          {optionLabel}
        </span>
        <p className={styles.description}>{tx(option.description)}</p>
      </header>

      <dl className={styles.info}>
        <div className={styles.infoRow}>
          <dt className={styles.infoLabel}>
            <Icon name="clock" size="1.1rem" />
            {t.tours.schedule}
          </dt>
          <dd className={styles.infoValue}>
            {fmt(t.tours.scheduleRange, {
              start: option.schedule.start,
              end: option.schedule.end,
            })}
          </dd>
        </div>
        <div className={styles.infoRow}>
          <dt className={styles.infoLabel}>{t.tours.price}</dt>
          <dd className={cn(styles.infoValue, styles.price)}>
            {formatTourPrice(option.price, option.currency)}
          </dd>
        </div>
        {option.capacity && (
          <div className={styles.infoRow}>
            <dt className={styles.infoLabel}>{t.tours.capacity}</dt>
            <dd className={styles.infoValue}>{tx(option.capacity)}</dd>
          </div>
        )}
      </dl>

      <section className={styles.route} aria-label={t.tours.routeTitle}>
        <h4 className={styles.sectionLabel}>{t.tours.routeTitle}</h4>
        <ol className={styles.routeList}>
          {option.route.map((stop) => (
            <li key={tx(stop)} className={styles.routeItem}>
              {tx(stop)}
            </li>
          ))}
        </ol>
      </section>

      {(option.includes || option.excludes) && (
        <div className={styles.lists}>
          {option.includes && option.includes.length > 0 && (
            <ul className={styles.list} aria-label={t.tours.includesTitle}>
              {option.includes.map((item) => (
                <li key={tx(item)} className={cn(styles.listItem, styles.included)}>
                  <Icon name="check" size="1.1rem" className={styles.check} />
                  {tx(item)}
                </li>
              ))}
            </ul>
          )}
          {option.excludes && option.excludes.length > 0 && (
            <ul className={styles.list} aria-label={t.tours.excludesTitle}>
              {option.excludes.map((item) => (
                <li key={tx(item)} className={cn(styles.listItem, styles.excluded)}>
                  <Icon name="close" size="1.1rem" className={styles.close} />
                  {t.tours.excludesTitle}: {tx(item)}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </article>
  );
}
