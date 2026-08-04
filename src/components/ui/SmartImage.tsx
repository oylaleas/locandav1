import { useState } from 'react';
import { Icon } from './Icon';
import { useI18n } from '@/features/i18n/useI18n';
import type { ImageAsset } from '@/types/media';
import { cn } from '@/utils/cn';
import styles from './SmartImage.module.css';

interface SmartImageProps {
  asset: ImageAsset | undefined;
  /** Usa a versão reduzida (grades, thumbs, cards pequenos). */
  useThumb?: boolean;
  /** Proporção reservada — evita layout shift. */
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain';
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  /** Sobrescreve o alt do asset (ex.: imagem decorativa → alt=""). */
  alt?: string;
  decorative?: boolean;
}

interface ImageLayerProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  objectFit: 'cover' | 'contain';
  priority: boolean;
  decorative: boolean;
  fallbackLabel: string;
  className?: string;
}

/**
 * Camada interna montada por `src` (key): garante que o estado de
 * carregamento reinicie sem efeitos colaterais quando a imagem muda.
 */
function ImageLayer({
  src,
  alt,
  width,
  height,
  objectFit,
  priority,
  decorative,
  fallbackLabel,
  className,
}: ImageLayerProps) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  if (status === 'error') {
    return (
      <div className={styles.errorLayer}>
        <Icon name="gallery" size="2rem" />
        <span>{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={decorative ? '' : alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      draggable={false}
      onLoad={() => setStatus('ready')}
      onError={() => setStatus('error')}
      className={cn(
        styles.image,
        objectFit === 'contain' ? styles.contain : styles.cover,
        status === 'ready' && styles.ready,
        className,
      )}
      aria-hidden={decorative || undefined}
    />
  );
}

/**
 * Imagem com espaço reservado, cor média enquanto carrega, lazy loading e
 * fallback visível em caso de erro (nunca deixamos um buraco sem explicação).
 */
export function SmartImage({
  asset,
  useThumb = false,
  aspectRatio,
  objectFit = 'cover',
  priority = false,
  className,
  imageClassName,
  alt,
  decorative = false,
}: SmartImageProps) {
  const { tx, t } = useI18n();
  const src = asset ? (useThumb ? asset.thumbSrc : asset.src) : undefined;
  const ratio = aspectRatio ?? (asset ? `${asset.width} / ${asset.height}` : '4 / 3');

  if (!asset || !src) {
    return (
      <div
        className={cn(styles.wrapper, styles.fallback, className)}
        style={{ aspectRatio: ratio }}
        role="img"
        aria-label={t.errors.imageFallback}
      >
        <Icon name="gallery" size="2.5rem" />
      </div>
    );
  }

  return (
    <div
      className={cn(styles.wrapper, className)}
      style={{ aspectRatio: ratio, backgroundColor: asset.dominantColor }}
    >
      <ImageLayer
        key={src}
        src={src}
        alt={alt ?? tx(asset.alt)}
        width={asset.width}
        height={asset.height}
        objectFit={objectFit}
        priority={priority}
        decorative={decorative}
        fallbackLabel={t.errors.imageFallback}
        className={imageClassName}
      />
    </div>
  );
}
