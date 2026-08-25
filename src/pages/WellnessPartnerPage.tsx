import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { KioskLayout } from '@/components/layout/KioskLayout';
import { ErrorState } from '@/components/states/StateMessage';
import { ServiceCard } from '@/components/wellness/ServiceCard';
import { ServiceDetailModal } from '@/features/wellness/ServiceDetailModal';
import { QRCodePanel } from '@/features/qr/QRCodePanel';
import { useI18n } from '@/features/i18n/useI18n';
import { useKioskNavigation } from '@/app/navigation';
import { getWellnessPartner, getWellnessService } from '@/services/wellnessService';
import type { QrTarget } from '@/types/content';
import type { WellnessService } from '@/types/wellness';
import { cn } from '@/utils/cn';
import styles from './WellnessPartnerPage.module.css';

/** Carrossel de serviços com navegação por setas. */
function ServicesCarousel({
  services,
  onSelect,
}: {
  services: WellnessService[];
  onSelect: (serviceId: string) => void;
}) {
  const { t } = useI18n();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={styles.servicesCarousel}>
      <button
        type="button"
        className={cn(styles.carouselBtn, styles.carouselBtnLeft)}
        onClick={() => scroll('left')}
        aria-label={t.wellness.carouselPrev}
      >
        <Icon name="arrow-left" size="1.5rem" />
      </button>

      <div className={styles.servicesCarouselTrack} ref={scrollRef}>
        {services.map((service) => (
          <div key={service.id} className={styles.serviceCardWrapper}>
            <ServiceCard
              service={service}
              onSelect={() => onSelect(service.id)}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        className={cn(styles.carouselBtn, styles.carouselBtnRight)}
        onClick={() => scroll('right')}
        aria-label={t.wellness.carouselNext}
      >
        <Icon name="arrow-right" size="1.5rem" />
      </button>
    </div>
  );
}

/**
 * ESPAÇO ONODA — detalhe do espaço de bem-estar:
 * descrição → serviços (cards) → contato (QR WhatsApp / Instagram).
 */
export default function WellnessPartnerPage() {
  const { t, tx } = useI18n();
  const navigation = useKioskNavigation();
  const { partnerId } = useParams();
  const partner = getWellnessPartner(partnerId);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>();
  const [activeQr, setActiveQr] = useState<QrTarget | undefined>();

  if (!partner) {
    return (
      <KioskLayout title={t.wellness.indexTitle}>
        <ErrorState onHome={navigation.home} />
      </KioskLayout>
    );
  }

  const selectedService = getWellnessService(partner, selectedServiceId);

  return (
    <KioskLayout title={tx(partner.name)} eyebrow={tx(partner.tagline)}>
      <div className={styles.page}>
        <header className={styles.header}>
          <span className={styles.icon}>
            <Icon name="spa" size="2.5rem" />
          </span>
          <h1 className={styles.title}>{tx(partner.name)}</h1>
          <p className={styles.tagline}>{tx(partner.tagline)}</p>
          <p className={styles.description}>{tx(partner.description)}</p>
        </header>

        <section className={styles.services} aria-labelledby="servicos-titulo">
          <h2 id="servicos-titulo" className={styles.sectionTitle}>
            {t.wellness.servicesTitle}
          </h2>
          <p className={styles.sectionIntro}>{t.wellness.servicesIntro}</p>
          <ServicesCarousel
            services={partner.services}
            onSelect={(id) => setSelectedServiceId(id)}
          />
        </section>

        <section className={styles.contact} aria-labelledby="contato-titulo">
          <div className={styles.contactText}>
            <h2 id="contato-titulo" className={styles.sectionTitle}>
              {t.wellness.contactTitle}
            </h2>
            <p className={styles.sectionIntro}>{t.wellness.contactIntro}</p>
            <dl className={styles.contactList}>
              <div className={styles.contactRow}>
                <dt className={styles.contactLabel}>{t.wellness.whatsapp}</dt>
                <dd className={styles.contactValue}>{partner.contact.whatsapp}</dd>
              </div>
              <div className={styles.contactRow}>
                <dt className={styles.contactLabel}>{t.wellness.instagram}</dt>
                <dd className={styles.contactValue}>{partner.contact.instagram}</dd>
              </div>
            </dl>
          </div>

          <div className={styles.contactActions}>
            {partner.qrTargets.map((target) => (
              <Button
                key={target.id}
                variant="inverse"
                size="lg"
                icon={target.id.includes('instagram') ? 'instagram' : 'chat'}
                onClick={() => setActiveQr(target)}
              >
                {target.id.includes('instagram') ? t.wellness.instagram : t.wellness.whatsapp}
              </Button>
            ))}
          </div>
        </section>
      </div>

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedServiceId(undefined)}
      />

      {activeQr && (
        <QRCodePanel target={activeQr} open={Boolean(activeQr)} onClose={() => setActiveQr(undefined)} />
      )}
    </KioskLayout>
  );
}
