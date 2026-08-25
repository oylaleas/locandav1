import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useAccessibility, type TextScale } from '@/features/a11y/AccessibilityProvider';
import { useI18n } from '@/features/i18n/useI18n';
import styles from './AccessibilityControl.module.css';

interface AccessibilityControlProps {
  compact?: boolean;
  className?: string;
}

export function AccessibilityControl({ compact = false, className }: AccessibilityControlProps) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const {
    textScale,
    setTextScale,
    highContrast,
    toggleHighContrast,
    reducedMotion,
    toggleReducedMotion,
  } = useAccessibility();

  const scales: Array<{ value: TextScale; label: string }> = [
    { value: 'md', label: t.a11y.textSizeNormal },
    { value: 'lg', label: t.a11y.textSizeLarge },
    { value: 'xl', label: t.a11y.textSizeExtraLarge },
  ];

  return (
    <>
      <Button
        className={className}
        variant="quiet"
        size={compact ? 'sm' : 'md'}
        icon="accessibility"
        iconOnly={compact}
        onClick={() => setOpen(true)}
        aria-label={t.nav.accessibility}
        aria-haspopup="dialog"
      >
        {compact ? t.nav.accessibility : t.nav.accessibility}
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={t.a11y.panelTitle}
        description={t.a11y.hint}
      >
        <div className={styles.groups}>
          <fieldset className={styles.group}>
            <legend className={styles.legend}>{t.a11y.textSize}</legend>
            <div className={styles.row}>
              {scales.map((scale) => (
                <Button
                  key={scale.value}
                  variant={textScale === scale.value ? 'primary' : 'secondary'}
                  size="lg"
                  selected={textScale === scale.value}
                  onClick={() => setTextScale(scale.value)}
                  aria-pressed={textScale === scale.value}
                >
                  {scale.label}
                </Button>
              ))}
            </div>
          </fieldset>

          <div className={styles.group}>
            <Button
              variant={highContrast ? 'primary' : 'secondary'}
              size="lg"
              fullWidth
              icon={highContrast ? 'check' : undefined}
              onClick={toggleHighContrast}
              aria-pressed={highContrast}
            >
              {`${t.a11y.contrast} — ${highContrast ? t.a11y.on : t.a11y.off}`}
            </Button>
          </div>

          <div className={styles.group}>
            <Button
              variant={reducedMotion ? 'primary' : 'secondary'}
              size="lg"
              fullWidth
              icon={reducedMotion ? 'check' : undefined}
              onClick={toggleReducedMotion}
              aria-pressed={reducedMotion}
            >
              {`${t.a11y.reduceMotion} — ${reducedMotion ? t.a11y.on : t.a11y.off}`}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
