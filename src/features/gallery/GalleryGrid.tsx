import { Badge } from '@/components/ui/Badge';
import { SmartImage } from '@/components/ui/SmartImage';
import { FEATURE_FLAGS } from '@/config/kiosk';
import { useI18n } from '@/features/i18n/useI18n';
import { useTapGuard } from '@/hooks/useTapGuard';
import type { ImageAsset } from '@/types/media';
import { cn } from '@/utils/cn';
import styles from './GalleryGrid.module.css';

interface GalleryGridProps {
  images: ImageAsset[];
  onSelect: (index: number) => void;
  columns?: 2 | 3;
  className?: string;
}

export function GalleryGrid({ images, onSelect, columns = 2, className }: GalleryGridProps) {
  const { t, tx, fmt } = useI18n();
  const handleSelect = useTapGuard((index: number) => onSelect(index));

  return (
    <ul
      className={cn(styles.grid, columns === 3 && styles.threeColumns, className)}
      aria-label={t.gallery.title}
    >
      {images.map((image, index) => (
        <li key={image.id} className={styles.item}>
          <button
            type="button"
            className={styles.thumb}
            onClick={() => handleSelect(index)}
            aria-label={`${t.gallery.open} — ${fmt(t.gallery.counter, {
              current: index + 1,
              total: images.length,
            })}`}
          >
            <SmartImage
              asset={image}
              useThumb
              aspectRatio="4 / 3"
              decorative
              priority={index < 2}
            />
            {FEATURE_FLAGS.showPlaceholderBadges && image.isPlaceholder && (
              <Badge tone="inverse" className={styles.badge}>
                {t.badges.placeholderMedia}
              </Badge>
            )}
            {image.caption && <span className={styles.caption}>{tx(image.caption)}</span>}
          </button>
        </li>
      ))}
    </ul>
  );
}
