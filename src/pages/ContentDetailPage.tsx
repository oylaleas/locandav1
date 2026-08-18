import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { KioskLayout } from '@/components/layout/KioskLayout';
import { StateMessage } from '@/components/states/StateMessage';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { WindRose } from '@/components/ui/WindRose';
import { FEATURE_FLAGS } from '@/config/kiosk';
import { useKioskNavigation } from '@/app/navigation';
import { useI18n } from '@/features/i18n/useI18n';
import { VideoPlayer } from '@/features/media/VideoPlayer';
import { QRCodePanel } from '@/features/qr/QRCodePanel';
import { getQrTarget, getSectionBySlug, getVideos } from '@/services/contentService';
import type { ContentBlock } from '@/types/content';
import type { PartialLocalizedText } from '@/types/i18n';
import styles from './ContentDetailPage.module.css';

interface BlockRendererProps {
  block: ContentBlock;
  tx: (value: PartialLocalizedText | undefined) => string;
}

function BlockRenderer({ block, tx }: BlockRendererProps) {
  if (block.type === 'paragraph') {
    return <p className={styles.paragraph}>{tx(block.text)}</p>;
  }

  if (block.type === 'quote') {
    return (
      <blockquote className={styles.quote}>
        <p>{tx(block.text)}</p>
        {block.attribution && <cite className={styles.cite}>{tx(block.attribution)}</cite>}
      </blockquote>
    );
  }

  return (
    <div className={styles.listBlock}>
      {block.title && <h3 className={styles.listTitle}>{tx(block.title)}</h3>}
      <ul className={styles.list}>
        {block.items.map((item, index) => (
          <li key={index} className={styles.listItem}>
            <Icon name="check" size="1.1rem" />
            <span>{tx(item)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ContentDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, tx } = useI18n();
  const navigation = useKioskNavigation();
  const [qrOpen, setQrOpen] = useState(false);

  const section = getSectionBySlug(slug);

  if (!section) {
    return (
      <KioskLayout title={t.errors.notFoundTitle}>
        <StateMessage
          icon="alert"
          title={t.errors.notFoundTitle}
          message={t.errors.notFoundMessage}
          actions={[
            { label: t.nav.back, onClick: navigation.back, variant: 'secondary', icon: 'arrow-left' },
            { label: t.errors.backHome, onClick: navigation.home, icon: 'home' },
          ]}
        />
      </KioskLayout>
    );
  }

  const videos = getVideos(section.videoIds);
  const qrTarget = getQrTarget(section.qrTargetId);

  return (
    <KioskLayout
      title={tx(section.title)}
      eyebrow={tx(section.tagline)}
      bleed
      contextActions={
        qrTarget ? (
          <Button variant="inverse" size="lg" icon="qr" wrapLabel onClick={() => setQrOpen(true)}>
            {t.content.qrCta}
          </Button>
        ) : undefined
      }
    >
      <article className={styles.page}>
        <header className={styles.hero}>
          {/* Identidade de marca no topo — sem fotografias (decisão do
              responsável). A rosa dos ventos é a assinatura visual. */}
          <WindRose className={styles.heroRose} aria-hidden="true" />
          <p className={styles.eyebrow}>{tx(section.tagline)}</p>
          <h1 className={styles.title}>{tx(section.title)}</h1>
          {FEATURE_FLAGS.showPendingContentBadges && section.contentPending && (
            <Badge tone="warning" icon="alert">
              {t.badges.pendingContent}
            </Badge>
          )}
        </header>

        <div className={styles.body}>
          <section className={styles.textBlock} aria-label={t.content.about}>
            <p className={styles.summary}>{tx(section.summary)}</p>
            {section.blocks.map((block, index) => (
              <BlockRenderer key={index} block={block} tx={tx} />
            ))}
          </section>

          {videos.length > 0 && (
            <section className={styles.videos} aria-labelledby={`videos-${section.slug}`}>
              <h2 id={`videos-${section.slug}`} className={styles.sectionTitle}>
                {t.content.videos}
              </h2>
              {videos.map((video) => (
                <VideoPlayer
                  key={video.id}
                  video={video}
                  endedActions={
                    qrTarget
                      ? [{ label: t.content.qrCta, icon: 'qr', onClick: () => setQrOpen(true) }]
                      : []
                  }
                />
              ))}
            </section>
          )}


        </div>
      </article>

      {qrTarget && (
        <QRCodePanel target={qrTarget} open={qrOpen} onClose={() => setQrOpen(false)} />
      )}
    </KioskLayout>
  );
}
