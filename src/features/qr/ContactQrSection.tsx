import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { QRCodePanel } from '@/features/qr/QRCodePanel';
import type { IconName, QrTarget } from '@/types/content';
import styles from './ContactQrSection.module.css';

export interface ContactQrMethod {
  id: string;
  label: string;
  value: string;
  icon: Extract<IconName, 'chat' | 'instagram'>;
  target: QrTarget;
}

interface ContactQrSectionProps {
  /** ID único do título, usado para nomear a região de contato. */
  headingId: string;
  title: string;
  intro: string;
  methods: ContactQrMethod[];
}

/**
 * Cartão de contato para o fluxo totem → celular.
 *
 * Mantém os canais no totem e abre um QR por vez, sem navegar o kiosk para
 * aplicativos externos. É compartilhado pelas páginas de parceiros para que
 * WhatsApp e Instagram tenham a mesma apresentação e ergonomia.
 */
export function ContactQrSection({
  headingId,
  title,
  intro,
  methods,
}: ContactQrSectionProps) {
  const [activeTarget, setActiveTarget] = useState<QrTarget | undefined>();

  if (methods.length === 0) return null;

  return (
    <>
      <section className={styles.contact} aria-labelledby={headingId}>
        <div className={styles.contactText}>
          <h2 id={headingId} className={styles.sectionTitle}>
            {title}
          </h2>
          <p className={styles.sectionIntro}>{intro}</p>
          <dl className={styles.contactList}>
            {methods.map((method) => (
              <div key={method.id} className={styles.contactRow}>
                <dt className={styles.contactLabel}>{method.label}</dt>
                <dd className={styles.contactValue}>{method.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={styles.contactActions}>
          {methods.map((method) => (
            <Button
              key={method.id}
              variant="inverse"
              size="lg"
              icon={method.icon}
              onClick={() => setActiveTarget(method.target)}
            >
              {method.label}
            </Button>
          ))}
        </div>
      </section>

      {activeTarget && (
        <QRCodePanel
          target={activeTarget}
          open={Boolean(activeTarget)}
          onClose={() => setActiveTarget(undefined)}
        />
      )}
    </>
  );
}
