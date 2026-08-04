import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './Button';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useI18n } from '@/features/i18n/useI18n';
import { cn } from '@/utils/cn';
import styles from './Modal.module.css';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  /** Overlays informativos podem ocupar a tela toda (galeria, vídeo). */
  size?: 'md' | 'lg' | 'full';
  /** Modais críticos (timeout) não fecham ao tocar fora. */
  dismissible?: boolean;
  showCloseButton?: boolean;
  tone?: 'light' | 'dark';
  className?: string;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  dismissible = true,
  showCloseButton = true,
  tone = 'light',
  className,
}: ModalProps) {
  const { t } = useI18n();
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useFocusTrap(panelRef, open, dismissible ? onClose : undefined);

  // Impede o scroll do conteúdo atrás do overlay (sensação de app, não de site).
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className={cn(styles.overlay, tone === 'dark' && styles.overlayDark)}
      onPointerDown={(event) => {
        if (!dismissible) return;
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={cn(
          styles.panel,
          styles[size],
          tone === 'dark' && styles.panelDark,
          className,
        )}
        data-surface={tone === 'dark' ? 'inverse' : undefined}
      >
        <header className={styles.header}>
          <div className={styles.headings}>
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
            {description && (
              <p id={descriptionId} className={styles.description}>
                {description}
              </p>
            )}
          </div>
          {showCloseButton && (
            <Button
              variant={tone === 'dark' ? 'inverse' : 'quiet'}
              icon="close"
              iconOnly
              size="md"
              onClick={onClose}
            >
              {t.nav.close}
            </Button>
          )}
        </header>

        <div className={cn(styles.body, 'scroll-area')}>{children}</div>

        {footer && <footer className={styles.footer}>{footer}</footer>}
      </div>
    </div>,
    document.body,
  );
}
