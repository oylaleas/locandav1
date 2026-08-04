import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Spinner } from '@/components/ui/Spinner';
import { FEATURE_FLAGS } from '@/config/kiosk';
import { useI18n } from '@/features/i18n/useI18n';
import { useMedia } from '@/features/media/MediaProvider';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { track } from '@/services/analytics';
import type { IconName } from '@/types/content';
import type { VideoAsset, VideoPlaybackState } from '@/types/media';
import { cn } from '@/utils/cn';
import { clamp, formatTime } from '@/utils/format';
import styles from './VideoPlayer.module.css';

interface VideoPlayerAction {
  label: string;
  onClick: () => void;
  icon?: IconName;
}

interface VideoPlayerProps {
  video: VideoAsset;
  /** Ações oferecidas ao fim do vídeo (além de "reproduzir novamente"). */
  endedActions?: VideoPlayerAction[];
  /** Quando fornecido, exibe o botão de fechar. */
  onClose?: () => void;
  className?: string;
  children?: ReactNode;
}

/**
 * PLAYER DE VÍDEO DO TOTEM
 * --------------------------------------------------------------------------
 * Estados cobertos: idle(poster) · loading · playing · paused · buffering ·
 * ended · error · offline.
 *
 * Decisões:
 *  - controles sempre visíveis (não existe hover em totem);
 *  - o estado do áudio é textual ("Com som"/"Sem som"), não apenas ícone;
 *  - somente UM player pode reproduzir por vez (MediaProvider);
 *  - preload padrão 'none': vídeo só é baixado quando o visitante pede;
 *  - erro nunca deixa área preta: volta ao poster com mensagem e recuperação.
 */
export function VideoPlayer({ video, endedActions = [], onClose, className }: VideoPlayerProps) {
  const { t, tx, language } = useI18n();
  const media = useMedia();
  const online = useOnlineStatus();
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerId = useId();

  const [state, setState] = useState<VideoPlaybackState>('idle');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(video.durationSeconds || 0);
  const [expanded, setExpanded] = useState(false);
  const [scrubbing, setScrubbing] = useState(false);

  const hasCaptions = video.captions.length > 0;
  const captionsEnabled = media.captionsEnabled && hasCaptions;

  const stopPlayback = useCallback(() => {
    const element = videoRef.current;
    if (!element) return;
    element.pause();
  }, []);

  const resetPlayback = useCallback(() => {
    const element = videoRef.current;
    if (!element) return;
    element.pause();
    try {
      element.currentTime = 0;
    } catch {
      // Alguns navegadores lançam se a mídia ainda não tem metadados.
    }
    setCurrentTime(0);
    setState('idle');
    setExpanded(false);
  }, []);

  // Registro no controlador de mídia: garante um único player ativo e permite
  // que o reset da sessão interrompa tudo de fora.
  useEffect(
    () => media.registerPlayer({ id: playerId, pause: stopPlayback, reset: resetPlayback }),
    [media, playerId, stopPlayback, resetPlayback],
  );

  // Preferência global de áudio (restaurada a cada sessão).
  useEffect(() => {
    const element = videoRef.current;
    if (element) element.muted = media.muted;
  }, [media.muted]);

  // Legendas: alternamos o modo das text tracks (o atributo `default` só vale
  // na primeira carga) e escolhemos a faixa do idioma atual da interface.
  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;
    const tracks = element.textTracks;
    for (let index = 0; index < tracks.length; index += 1) {
      const trackItem = tracks[index];
      const matchesLanguage = trackItem.language === language;
      trackItem.mode = captionsEnabled && matchesLanguage ? 'showing' : 'hidden';
    }
  }, [captionsEnabled, language, state]);

  const play = useCallback(() => {
    const element = videoRef.current;
    if (!element) return;
    media.requestPlayback(playerId);
    element.muted = media.muted;
    if (state === 'idle' || state === 'error') setState('loading');
    const attempt = element.play();
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(() => setState('error'));
    }
    track({ name: 'video_play', videoId: video.id });
  }, [media, playerId, state, video.id]);

  const pause = useCallback(() => {
    videoRef.current?.pause();
    media.notifyStopped(playerId);
  }, [media, playerId]);

  const replay = useCallback(() => {
    const element = videoRef.current;
    if (!element) return;
    element.currentTime = 0;
    setCurrentTime(0);
    play();
  }, [play]);

  const retry = useCallback(() => {
    const element = videoRef.current;
    if (!element) return;
    setState('loading');
    element.load();
    play();
  }, [play]);

  const seek = useCallback(
    (seconds: number) => {
      const element = videoRef.current;
      if (!element || !Number.isFinite(duration) || duration <= 0) return;
      const next = clamp(seconds, 0, duration);
      element.currentTime = next;
      setCurrentTime(next);
    },
    [duration],
  );

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const isBusy = state === 'loading' || state === 'buffering';
  const showPosterOverlay = state === 'idle' || state === 'error';

  const soundLabel = media.muted ? t.video.soundOff : t.video.soundOn;

  return (
    <section
      className={cn(styles.player, expanded && styles.expanded, className)}
      data-surface="inverse"
      data-state={state}
      data-testid="video-player"
      aria-label={tx(video.title)}
    >
      <div className={styles.stage}>
        <video
          ref={videoRef}
          className={styles.video}
          src={video.src}
          poster={video.poster}
          preload={video.preload}
          playsInline
          disablePictureInPicture
          controls={false}
          onLoadedMetadata={(event) => {
            const element = event.currentTarget;
            if (Number.isFinite(element.duration) && element.duration > 0) {
              setDuration(element.duration);
            }
          }}
          onTimeUpdate={(event) => {
            if (scrubbing) return;
            setCurrentTime(event.currentTarget.currentTime);
          }}
          onPlaying={() => setState('playing')}
          onPlay={() => setState('playing')}
          onPause={() => {
            // Um player que nunca foi iniciado permanece em `idle`: pausar
            // players inativos (quando outro vídeo começa) não pode fazer o
            // poster desaparecer.
            setState((current) =>
              current === 'playing' || current === 'buffering' || current === 'loading'
                ? 'paused'
                : current,
            );
            media.notifyStopped(playerId);
          }}
          onWaiting={() => setState('buffering')}
          onEnded={() => {
            setState('ended');
            media.notifyStopped(playerId);
            track({ name: 'video_complete', videoId: video.id });
          }}
          onError={() => {
            setState('error');
            media.notifyStopped(playerId);
            track({ name: 'video_error', videoId: video.id });
          }}
        >
          {video.captions.map((caption) => (
            <track
              key={caption.language}
              kind="captions"
              src={caption.src}
              srcLang={caption.language}
              label={caption.label}
            />
          ))}
        </video>

        {/* POSTER / IDLE — nunca mostramos um retângulo preto sem contexto. */}
        {showPosterOverlay && (
          <div className={styles.posterLayer}>
            <img className={styles.posterImage} src={video.poster} alt="" aria-hidden="true" />
            <div className={styles.posterScrim} />
            <div className={styles.posterContent}>
              {state === 'error' ? (
                <div className={styles.errorBlock} role="alert">
                  <Icon name="alert" size="2.5rem" />
                  <h3 className={styles.errorTitle}>{t.video.errorTitle}</h3>
                  <p className={styles.errorMessage}>
                    {online ? t.video.errorMessage : t.video.offlineMessage}
                  </p>
                  <div className={styles.errorActions}>
                    <Button variant="solidInverse" size="lg" icon="replay" onClick={retry}>
                      {t.video.retry}
                    </Button>
                    {onClose && (
                      <Button variant="inverse" size="lg" icon="close" onClick={onClose}>
                        {t.video.close}
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <button type="button" className={styles.bigPlay} onClick={play}>
                  <span className={styles.bigPlayIcon}>
                    <Icon name="play" size="3rem" />
                  </span>
                  <span className={styles.bigPlayLabel}>{t.content.watchVideo}</span>
                  <span className={styles.bigPlayMeta}>
                    {t.video.duration}: {formatTime(duration || video.durationSeconds)}
                  </span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* BUFFERING / LOADING — mantém o contexto do vídeo visível. */}
        {isBusy && (
          <div className={styles.busyLayer} role="status" aria-live="polite">
            <Spinner size="3rem" />
            <span>{state === 'loading' ? t.video.loading : t.video.buffering}</span>
          </div>
        )}

        {/* ENDED — ações coerentes, sem autoplay do próximo vídeo. */}
        {state === 'ended' && (
          <div className={styles.endedLayer}>
            <h3 className={styles.endedTitle}>{t.video.endedTitle}</h3>
            <p className={styles.endedMessage}>{t.video.endedMessage}</p>
            <div className={styles.endedActions}>
              <Button variant="solidInverse" size="lg" icon="replay" onClick={replay}>
                {t.video.replay}
              </Button>
              {endedActions.map((action) => (
                <Button
                  key={action.label}
                  variant="inverse"
                  size="lg"
                  icon={action.icon}
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              ))}
              {onClose && (
                <Button variant="inverse" size="lg" icon="close" onClick={onClose}>
                  {t.video.close}
                </Button>
              )}
            </div>
          </div>
        )}

        {FEATURE_FLAGS.showPlaceholderBadges && video.isPlaceholder && (
          <Badge tone="warning" className={styles.placeholderBadge}>
            {t.badges.placeholderVideo}
          </Badge>
        )}
      </div>

      <div className={styles.controls}>
        <div className={styles.transport}>
          <Button
            variant="solidInverse"
            size="lg"
            icon={state === 'playing' ? 'pause' : 'play'}
            onClick={state === 'playing' ? pause : state === 'ended' ? replay : play}
          >
            {state === 'playing' ? t.video.pause : state === 'ended' ? t.video.replay : t.video.play}
          </Button>

          <div className={styles.progressGroup}>
            <span className={styles.time}>{formatTime(currentTime)}</span>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
              <input
                className={styles.progressInput}
                type="range"
                min={0}
                max={Math.max(duration, 0.1)}
                step={0.1}
                value={currentTime}
                onPointerDown={() => setScrubbing(true)}
                onPointerUp={() => setScrubbing(false)}
                onChange={(event) => seek(Number(event.target.value))}
                onKeyUp={() => setScrubbing(false)}
                aria-label={t.video.progress}
                aria-valuetext={`${formatTime(currentTime)} / ${formatTime(duration)}`}
              />
            </div>
            <span className={styles.time}>{formatTime(duration)}</span>
          </div>
        </div>

        <div className={styles.secondary}>
          {/* Estado do áudio é textual — não dependemos de ícone ambíguo. */}
          <Button
            variant="inverse"
            size="md"
            icon={media.muted ? 'sound-off' : 'sound-on'}
            onClick={() => media.setMuted(!media.muted)}
            aria-pressed={!media.muted}
          >
            {soundLabel}
          </Button>

          {hasCaptions && (
            <Button
              variant={captionsEnabled ? 'solidInverse' : 'inverse'}
              size="md"
              icon="captions"
              onClick={() => media.setCaptionsEnabled(!media.captionsEnabled)}
              aria-pressed={captionsEnabled}
            >
              {captionsEnabled ? t.video.captionsOn : t.video.captionsOff}
            </Button>
          )}

          <Button
            variant="inverse"
            size="md"
            icon={expanded ? 'collapse' : 'expand'}
            iconOnly
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? t.video.exitFullscreen : t.video.fullscreen}
          </Button>

          {onClose && (
            <Button variant="inverse" size="md" icon="close" iconOnly onClick={onClose}>
              {t.video.close}
            </Button>
          )}
        </div>

        <p className={styles.status}>
          <span className="visually-hidden" role="status">
            {soundLabel}. {captionsEnabled ? t.video.captionsOn : t.video.captionsOff}
          </span>
          <span aria-hidden="true">
            {tx(video.title)}
            {video.isPlaceholder ? ` — ${t.video.placeholderNotice}` : ''}
          </span>
          {!online && <span className={styles.offlineNote}>{t.video.offlineMessage}</span>}
        </p>
      </div>
    </section>
  );
}
