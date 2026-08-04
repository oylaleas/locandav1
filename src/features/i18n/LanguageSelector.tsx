import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useI18n } from '@/features/i18n/useI18n';
import styles from './LanguageSelector.module.css';

/**
 * Seletor de idioma.
 * Usa os NOMES dos idiomas (não bandeiras) e mantém o visitante exatamente na
 * mesma tela após a troca — o contexto é preservado.
 */
export function LanguageSelector({ compact = false }: { compact?: boolean }) {
  const { t, language, languages, setLanguage } = useI18n();
  const [open, setOpen] = useState(false);
  const current = languages.find((item) => item.code === language);

  return (
    <>
      <Button
        variant="quiet"
        size={compact ? 'sm' : 'md'}
        icon="globe"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        {current?.shortLabel ?? t.nav.language}
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={t.language.panelTitle}
        description={t.language.hint}
      >
        <ul className={styles.list}>
          {languages.map((item) => {
            const selected = item.code === language;
            return (
              <li key={item.code}>
                <Button
                  variant={selected ? 'primary' : 'secondary'}
                  size="lg"
                  fullWidth
                  selected={selected}
                  icon={selected ? 'check' : undefined}
                  onClick={() => {
                    setLanguage(item.code);
                    setOpen(false);
                  }}
                  aria-current={selected || undefined}
                  lang={item.htmlLang}
                >
                  {item.nativeName}
                </Button>
              </li>
            );
          })}
        </ul>
      </Modal>
    </>
  );
}
