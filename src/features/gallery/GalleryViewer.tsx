import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SmartImage } from '@/components/ui/SmartImage';
import { FEATURE_FLAGS } from '@/config/kiosk';
import { useI18n } from '@/features/i18n/useI18n';
import { subscribeToSessionReset } from '@/features/session/resetBus';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useSwipe } from '@/hooks/useSwipe';
import { track } from '@/services/analytics';
import type { ImageAsset } from '@/types/media';
import styles from './GalleryViewer.module.css';

interface GalleryViewerProps {
  images: ImageAsset[];
  startIndex: number;
  galleryId: string;
  onClose: () => void;
}

/**
 * Visualizador em tela cheia.
 * Navegação por BOTÕES grandes (primária) + swipe (complemento) + teclado.
 * Sempre exibe contador e legenda quando houver.
 */
export function GalleryViewer({ images, startIndex, galleryId, onClose }: GalleryViewerProps) {
  const { t, tx, fmt } = useI18n();
  const [index, setIndex] = useState(startIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const total = images.length;

  useFocusTrap(containerRef, true, onClose);

  const goTo = useCallback(
    (next: number) => {
      if (total === 0) return;
      const normalized = (next + total) % total;
      setIndex(normalized);
      const image = images[normalized];
      if (image) track({ name: 'gallery_open', galleryId, imageId: image.id });
    },
    [galleryId, images, total],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const previous = useCallback(() => goTo(index - 1), [goTo, index]);

  const swipeHandlers = useSwipe({ onSwipeLeft: next, onSwipeRight: previous });

  useEffect(() => subscribeToSessionReset(() => onClose()), [onClose]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') next();
      if (event.key === 'ArrowLeft') previous();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [next, previous]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const image = images[index];
  if (!image) return null;

  return createPortal(
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={t.gallery.title}
      ref={containerRef}
      tabIndex={-1}
      data-surface="inverse"
      data-testid="gallery-viewer"
      {...swipeHandlers}
    >
      <header className={styles.header}>
        <span className={styles.counter} aria-live="polite">
          {fmt(t.gallery.counter, { current: index + 1, total })}
        </span>
        <Button variant="inverse" size="lg" icon="close" onClick={onClose}>
          {t.gallery.close}
        </Button>
      </header>

      <div className={styles.stage}>
        <SmartImage
          asset={image}
          aspectRatio="auto"
          objectFit="contain"
          priority
          className={styles.image}
        />
      </div>

      <footer className={styles.footer}>
        <div className={styles.captionBlock}>
          {image.caption ? (
            <p className={styles.caption}>{tx(image.caption)}</p>
          ) : (
            <p className={styles.captionMuted}>{tx(image.alt)}</p>
          )}
          {FEATURE_FLAGS.showPlaceholderBadges && image.isPlaceholder && (
            <Badge tone="warning">{t.badges.placeholderMedia}</Badge>
          )}
          <p className={styles.hint}>{t.gallery.swipeHint}</p>
        </div>

        <div className={styles.nav}>
          <Button
            variant="solidInverse"
            size="lg"
            icon="arrow-left"
            onClick={previous}
            disabled={total < 2}
          >
            {t.gallery.previous}
          </Button>
          <Button
            variant="solidInverse"
            size="lg"
            icon="arrow-right"
            iconPosition="end"
            onClick={next}
            disabled={total < 2}
          >
            {t.gallery.next}
          </Button>
        </div>
      </footer>
    </div>,
    document.body,
  );
}
