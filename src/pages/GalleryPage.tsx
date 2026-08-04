import { useState } from 'react';
import { KioskLayout } from '@/components/layout/KioskLayout';
import { EmptyState } from '@/components/states/StateMessage';
import { Button } from '@/components/ui/Button';
import { useKioskNavigation } from '@/app/navigation';
import { GalleryGrid } from '@/features/gallery/GalleryGrid';
import { GalleryViewer } from '@/features/gallery/GalleryViewer';
import { useI18n } from '@/features/i18n/useI18n';
import { QRCodePanel } from '@/features/qr/QRCodePanel';
import { getImages, getMainGallery, getQrTarget } from '@/services/contentService';
import styles from './GalleryPage.module.css';

export default function GalleryPage() {
  const { t, tx } = useI18n();
  const navigation = useKioskNavigation();
  const gallery = getMainGallery();
  const images = gallery ? getImages(gallery.imageIds) : [];
  const qrTarget = getQrTarget('qr-galeria');
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [qrOpen, setQrOpen] = useState(false);

  return (
    <KioskLayout title={t.gallery.title} eyebrow={t.nav.youAreHere}>
      <div className={styles.page}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>{gallery ? tx(gallery.title) : t.gallery.title}</h1>
            <p className={styles.intro}>{gallery ? tx(gallery.description) : t.gallery.intro}</p>
          </div>
          {qrTarget && (
            <Button variant="secondary" size="lg" icon="qr" onClick={() => setQrOpen(true)}>
              {t.content.qrCta}
            </Button>
          )}
        </header>

        {images.length === 0 ? (
          <EmptyState message={t.gallery.empty} onAction={navigation.home} />
        ) : (
          <GalleryGrid images={images} columns={3} onSelect={(index) => setViewerIndex(index)} />
        )}
      </div>

      {viewerIndex !== null && gallery && (
        <GalleryViewer
          images={images}
          startIndex={viewerIndex}
          galleryId={gallery.id}
          onClose={() => setViewerIndex(null)}
        />
      )}

      {qrTarget && (
        <QRCodePanel target={qrTarget} open={qrOpen} onClose={() => setQrOpen(false)} />
      )}
    </KioskLayout>
  );
}
