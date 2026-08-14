import { useCallback, useEffect, useRef, useState } from 'react';
import { Brandmark } from '@/components/layout/Brandmark';
import { SmartImage } from '@/components/ui/SmartImage';
import { WindRose } from '@/components/ui/WindRose';
import { FEATURE_FLAGS } from '@/config/kiosk';
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
 * ATTRACT MODE — tela ociosa do totem.
 *
 * Composição ancorada na REALIDADE da Locanda: a fotografia aérea real do
 * hotel (baía flat water) serve de fundo, sob um scrim azul profundo da
 * marca que garante legibilidade. Sobre ela: o vento riscando a cena, a
 * localização em mono, o lockup branco, o subhead e o orbe de toque
 * dourado.
 *
 * Quando o vídeo institucional oficial chegar, FEATURE_FLAGS.attractUsesMedia
 * + attractUsesVideo trocam a foto pelo vídeo autoplay (fallback: foto).
 *
 * O primeiro toque NUNCA depende de mídia: a camada de ativação cobre a
 * tela inteira desde o primeiro frame.
 */
export function AttractMode({ onActivate }: AttractModeProps) {
  const { t, tx } = useI18n();
  const { motionReduced } = useAccessibility();
  const identity = getSiteIdentity();
  const video = getAttractVideo();
  const [attractImage] = getAttractImages();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [pressed, setPressed] = useState(false);

  const useVideo =
    FEATURE_FLAGS.attractUsesMedia &&
    FEATURE_FLAGS.attractUsesVideo &&
    Boolean(video) &&
    !videoFailed &&
    !motionReduced;

  useEffect(() => {
    const element = videoRef.current;
    if (!element || !useVideo) return;

    element.muted = true; // autoplay só é permitido sem áudio
    const attempt = element.play();
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(() => {
        // Autoplay bloqueado: cai para a fotografia, sem travar nada.
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
          attractImage && (
            <SmartImage
              asset={attractImage}
              aspectRatio="auto"
              priority
              decorative
              className={styles.backdropImage}
            />
          )
        )}
        <div className={styles.scrim} />
      </div>

      <span className={styles.windLines} aria-hidden="true">
        <span className={styles.windLine} />
        <span className={styles.windLine} />
        <span className={styles.windLine} />
      </span>

      <div className={cn(styles.content, pressed && styles.contentPressed)}>
        <div className={styles.brandBlock}>
          <p className={styles.eyebrow}>{t.home.homeEyebrow}</p>
          <Brandmark tone="dark" size="lg" withDescriptor />
          <p className={styles.subhead}>{tx(identity.attractSubhead)}</p>
        </div>

        <div className={styles.ctaBlock}>
          <span className={styles.touchRing} aria-hidden="true">
            <span className={styles.touchPulse} />
            <WindRose className={styles.ctaRose} />
          </span>
          <p className={styles.cta}>{tx(identity.attractCallToAction)}</p>
          <p className={styles.languages}>{t.attract.languagesAvailable}</p>
          {useVideo && videoFailed && (
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
