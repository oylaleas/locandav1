import { useCallback, useEffect, useRef, useState } from 'react';
import { Brandmark } from '@/components/layout/Brandmark';
import { SmartImage } from '@/components/ui/SmartImage';
import { WindRose } from '@/components/ui/WindRose';
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
 * Tela ociosa do totem — composição LIMPA, sem fotografias:
 * identidade oficial (logo branca) + rosa dos ventos decorativa + chamada
 * de toque ampla e elegante.
 *
 * A camada de mídia (vídeo autoplay com poster / carrossel de fotos) segue
 * preparada no código e é reativada via FEATURE_FLAGS.attractUsesMedia
 * quando o material oficial chegar.
 *
 * O primeiro toque NUNCA depende de mídia: a camada de ativação cobre a
 * tela inteira desde o primeiro frame.
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
  const [pressed, setPressed] = useState(false);

  const useMedia = FEATURE_FLAGS.attractUsesMedia;
  const useVideo =
    useMedia && FEATURE_FLAGS.attractUsesVideo && Boolean(video) && !videoFailed && !motionReduced;

  // Carrossel de imagens (apenas no modo com mídia): fallback do vídeo e
  // opção quando o movimento é reduzido.
  useEffect(() => {
    if (!useMedia || useVideo || images.length <= 1) return;
    const interval = window.setInterval(() => {
      setSlide((current) => (current + 1) % images.length);
    }, ATTRACT_SLIDE_DURATION_MS);
    return () => window.clearInterval(interval);
  }, [useMedia, useVideo, images.length]);

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
      {useMedia && (
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
      )}

      <div className={cn(styles.content, pressed && styles.contentPressed)}>
        <div className={styles.brandBlock}>
          {/* Gráfico decorativo de interação inspirado na rosa dos ventos
              da logo — NUNCA substitui o logotipo oficial (ao lado). */}
          <WindRose size="clamp(16rem, 56vh, 30rem)" className={styles.windRose} />
          <Brandmark tone="dark" size="lg" withDescriptor />
          <p className={styles.subhead}>{tx(identity.attractSubhead)}</p>
        </div>

        <div className={styles.ctaBlock}>
          <span className={styles.touchRing} aria-hidden="true">
            <span className={styles.touchPulse} />
            <WindRose size="3.4rem" className={styles.ctaRose} />
          </span>
          <p className={styles.cta}>{tx(identity.attractCallToAction)}</p>
          <p className={styles.languages}>{t.attract.languagesAvailable}</p>
          {useMedia && videoFailed && FEATURE_FLAGS.attractUsesVideo && (
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
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
        data-testid="attract-activate"
      >
        <span className="visually-hidden">{tx(identity.attractCallToAction)}</span>
      </button>
    </div>
  );
}
