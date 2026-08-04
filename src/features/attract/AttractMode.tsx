import { useCallback, useEffect, useRef, useState } from 'react';
import { Brandmark } from '@/components/layout/Brandmark';
import { Icon } from '@/components/ui/Icon';
import { SmartImage } from '@/components/ui/SmartImage';
import { ATTRACT_SLIDE_DURATION_MS, FEATURE_FLAGS } from '@/config/kiosk';
import { useAccessibility } from '@/features/a11y/AccessibilityProvider';
import { useI18n } from '@/features/i18n/useI18n';
import { getAttractImages, getAttractVideo, getSiteIdentity } from '@/services/contentService';
import { cn } from '@/utils/cn';
import styles from './AttractMode.module.css';

interface AttractModeProps {
  /** Primeiro toque → inicia a sessão. */
  onActivate: () => void;
}

/**
 * ATTRACT MODE
 * --------------------------------------------------------------------------
 * Tela ociosa do totem. Requisitos atendidos:
 *  - vídeo com autoplay/muted/loop/playsInline e POSTER;
 *  - fallback automático para carrossel de fotografias se o vídeo falhar,
 *    estiver indisponível offline ou o autoplay for bloqueado;
 *  - o primeiro toque NUNCA depende da mídia: a camada de ativação cobre a
 *    tela inteira desde o primeiro frame.
 */
export function AttractMode({ onActivate }: AttractModeProps) {
  const { t, tx } = useI18n();
  const { motionReduced } = useAccessibility();
  const identity = getSiteIdentity();
  const video = getAttractVideo();
  const images = getAttractImages();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [slide, setSlide] = useState(0);

  const useVideo = FEATURE_FLAGS.attractUsesVideo && Boolean(video) && !videoFailed && !motionReduced;

  // Carrossel de imagens: usado como fallback e quando o movimento é reduzido
  // (nesse caso trocamos por transições longas e suaves, sem paralaxe).
  useEffect(() => {
    if (useVideo || images.length <= 1) return;
    const interval = window.setInterval(() => {
      setSlide((current) => (current + 1) % images.length);
    }, ATTRACT_SLIDE_DURATION_MS);
    return () => window.clearInterval(interval);
  }, [useVideo, images.length]);

  useEffect(() => {
    const element = videoRef.current;
    if (!element || !useVideo) return;

    element.muted = true; // autoplay só é permitido sem áudio
    const attempt = element.play();
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(() => {
        // Autoplay bloqueado: cai para as fotografias, sem travar nada.
        setVideoFailed(true);
      });
    }
  }, [useVideo]);

  const handleActivate = useCallback(() => {
    videoRef.current?.pause();
    onActivate();
  }, [onActivate]);

  return (
    <div className={styles.root} data-surface="inverse" data-testid="attract-mode">
      <div className={styles.mediaLayer} aria-hidden="true">
        {useVideo && video ? (
          <video
            ref={videoRef}
            className={styles.video}
            src={video.src}
            poster={video.poster}
            muted
            loop
            playsInline
            autoPlay
            preload={video.preload}
            disablePictureInPicture
            onError={() => setVideoFailed(true)}
            onStalled={() => setVideoFailed(true)}
          />
        ) : (
          images.map((image, index) => (
            <div
              key={image.id}
              className={cn(styles.slide, index === slide && styles.slideActive)}
            >
              <SmartImage
                asset={image}
                aspectRatio="auto"
                priority={index === 0}
                decorative
                className={styles.slideImage}
              />
            </div>
          ))
        )}
        <div className={styles.scrim} />
      </div>

      <div className={styles.content}>
        <div className={styles.brandBlock}>
          <Brandmark tone="dark" size="lg" withDescriptor />
          <p className={styles.subhead}>{tx(identity.attractSubhead)}</p>
        </div>

        <div className={styles.ctaBlock}>
          <span className={styles.touchRing} aria-hidden="true">
            <span className={styles.touchPulse} />
            <Icon name="touch" size="2.75rem" />
          </span>
          <p className={styles.cta}>{tx(identity.attractCallToAction)}</p>
          <p className={styles.languages}>{t.attract.languagesAvailable}</p>
          {videoFailed && FEATURE_FLAGS.attractUsesVideo && (
            <p className={styles.mediaNotice}>{t.attract.videoUnavailable}</p>
          )}
        </div>
      </div>

      {/*
        Camada de ativação: cobre 100% da tela e não depende de nenhuma mídia.
        Qualquer toque inicia a sessão imediatamente.
      */}
      <button
        type="button"
        className={styles.activationLayer}
        onClick={handleActivate}
        data-testid="attract-activate"
      >
        <span className="visually-hidden">{tx(identity.attractCallToAction)}</span>
      </button>
    </div>
  );
}
