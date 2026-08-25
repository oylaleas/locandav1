import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { KioskLayout } from '@/components/layout/KioskLayout';
import { ErrorState } from '@/components/states/StateMessage';
import { ServiceCard } from '@/components/wellness/ServiceCard';
import { ServiceDetailModal } from '@/features/wellness/ServiceDetailModal';
import { ContactQrSection } from '@/features/qr/ContactQrSection';
import { useI18n } from '@/features/i18n/useI18n';
import { useKioskNavigation } from '@/app/navigation';
import { getWellnessPartner, getWellnessService } from '@/services/wellnessService';
import styles from './WellnessPartnerPage.module.css';

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

  if (!partner) {
    return (
      <KioskLayout title={t.wellness.indexTitle}>
        <ErrorState onHome={navigation.home} />
      </KioskLayout>
    );
  }

  const selectedService = getWellnessService(partner, selectedServiceId);
  const contactMethods = partner.qrTargets.map((target) => {
    const isInstagram = target.id.includes('instagram');

    return {
      id: target.id,
      label: isInstagram ? t.wellness.instagram : t.wellness.whatsapp,
      value: isInstagram ? partner.contact.instagram : partner.contact.whatsapp,
      icon: isInstagram ? ('instagram' as const) : ('chat' as const),
      target,
    };
  });

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
          <ul className={styles.servicesList}>
            {partner.services.map((service) => (
              <li key={service.id}>
                <ServiceCard
                  service={service}
                  onSelect={() => setSelectedServiceId(service.id)}
                />
              </li>
            ))}
          </ul>
        </section>

        <ContactQrSection
          headingId="contato-titulo"
          title={t.wellness.contactTitle}
          intro={t.wellness.contactIntro}
          methods={contactMethods}
        />
      </div>

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedServiceId(undefined)}
      />
    </KioskLayout>
  );
}
