import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { SmartImage } from '@/components/ui/SmartImage';
import { FEATURE_FLAGS } from '@/config/kiosk';
import { useI18n } from '@/features/i18n/useI18n';
import { useTapGuard } from '@/hooks/useTapGuard';
import type { IconName } from '@/types/content';
import type { ImageAsset } from '@/types/media';
import { cn } from '@/utils/cn';
import styles from './ContentCard.module.css';

interface ContentCardProps {
  title: string;
  description?: string;
  eyebrow?: string;
  image?: ImageAsset;
  icon?: IconName;
  hasVideo?: boolean;
  photoCount?: number;
  pendingContent?: boolean;
  onSelect: () => void;
  /** Destaque visual (primeiro item da Home). */
  featured?: boolean;
  layout?: 'vertical' | 'horizontal';
  priority?: boolean;
}

/**
 * Card totalmente tocável — sem botões concorrentes dentro dele.
 * O alvo de toque é o card inteiro, o que é o padrão mais confiável em totem.
 */
export function ContentCard({
  title,
  description,
  eyebrow,
  image,
  icon,
  hasVideo = false,
  photoCount,
  pendingContent = false,
  onSelect,
  featured = false,
  layout = 'vertical',
  priority = false,
}: ContentCardProps) {
  const { t, fmt } = useI18n();
  const handleSelect = useTapGuard(onSelect);

  return (
    <button
      type="button"
      className={cn(
        styles.card,
        featured && styles.featured,
        layout === 'horizontal' && styles.horizontal,
      )}
      onClick={handleSelect}
    >
      <span className={styles.media}>
        <SmartImage
          asset={image}
          useThumb={!featured}
          priority={priority}
          aspectRatio={featured ? '16 / 10' : layout === 'horizontal' ? '1 / 1' : '4 / 3'}
          decorative
          className={styles.image}
        />
        <span className={styles.mediaBadges}>
          {hasVideo && (
            <Badge tone="inverse" icon="play">
              {t.content.videoBadge}
            </Badge>
          )}
          {typeof photoCount === 'number' && photoCount > 0 && (
            <Badge tone="inverse" icon="gallery">
              {fmt(t.content.photoCount, { count: photoCount })}
            </Badge>
          )}
          {FEATURE_FLAGS.showPlaceholderBadges && image?.isPlaceholder && (
            <Badge tone="warning">{t.badges.placeholderMedia}</Badge>
          )}
        </span>
      </span>

      <span className={styles.body}>
        {(eyebrow || icon) && (
          <span className={styles.eyebrow}>
            {icon && <Icon name={icon} size="1.15rem" />}
            {eyebrow}
          </span>
        )}
        <span className={styles.title}>{title}</span>
        {description && <span className={styles.description}>{description}</span>}
        {FEATURE_FLAGS.showPendingContentBadges && pendingContent && (
          <span className={styles.pending}>
            <Badge tone="warning">{t.badges.pendingContent}</Badge>
          </span>
        )}
        <span className={styles.cta} aria-hidden="true">
          {t.content.open}
          <Icon name="arrow-right" size="1.25rem" />
        </span>
      </span>
    </button>
  );
}
