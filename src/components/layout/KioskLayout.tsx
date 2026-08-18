import { useEffect, useRef, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Brandmark } from './Brandmark';
import { Button } from '@/components/ui/Button';
import { AccessibilityControl } from '@/features/a11y/AccessibilityControl';
import { OfflineIndicator } from '@/features/connectivity/OfflineIndicator';
import { LanguageSelector } from '@/features/i18n/LanguageSelector';
import { FullScreenMenu } from '@/features/navigation/FullScreenMenu';
import { useI18n } from '@/features/i18n/useI18n';
import { useKioskNavigation } from '@/app/navigation';
import { cn } from '@/utils/cn';
import styles from './KioskLayout.module.css';

interface KioskLayoutProps {
  children: ReactNode;
  /** Título da tela — exibido no cabeçalho quando não é a Home. */
  title?: string;
  eyebrow?: string;
  showBack?: boolean;
  /**
   * Marca no cabeçalho. A Home desliga esta opção porque já exibe o lockup
   * grande (com descritor) no herói — repetir o nome duas vezes na mesma
   * dobra polui a hierarquia visual em uma tela vertical.
   */
  showBrand?: boolean;
  /** Ação de voltar customizada (ex.: fechar uma etapa interna antes). */
  onBack?: () => void;
  /** Remove o padding padrão do conteúdo (páginas com mídia sangrando). */
  bleed?: boolean;
}

/**
 * Estrutura padrão das telas do totem.
 *
 * Decisão de ergonomia: os controles de navegação ficam na BARRA INFERIOR.
 * Em uma tela vertical de ~1,9 m, o topo é inalcançável para boa parte das
 * pessoas — inclusive cadeirantes e crianças. [VALIDAR NO HARDWARE REAL]
 */
export function KioskLayout({
  children,
  title,
  eyebrow,
  showBack = true,
  showBrand = true,
  onBack,
  bleed = false,
}: KioskLayoutProps) {
  const { t } = useI18n();
  const navigation = useKioskNavigation();
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  // Sem marca e sem título o cabeçalho vira apenas o slot de conectividade:
  // some a régua inferior para não deixar uma faixa vazia no topo.
  const isHeaderBare = !showBrand && !title && !eyebrow;

  // Cada nova tela começa do topo (o totem não guarda posição de scroll).
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <div className={styles.shell}>
      <a className="skip-link" href="#conteudo-principal">
        {t.app.skipToContent}
      </a>

      <header
        className={cn(
          styles.header,
          isHeaderBare && styles.headerBare,
          !showBrand && !isHeaderBare && styles.headerCentered,
        )}
      >
        <div className={styles.headerBrand}>
          {showBrand && <Brandmark size="sm" />}
          {(eyebrow || title) && (
            <div className={cn(styles.headerTitles, !showBrand && styles.headerTitlesLead)}>
              {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
              {title && <span className={styles.title}>{title}</span>}
            </div>
          )}
        </div>
        <OfflineIndicator />
      </header>

      <main
        id="conteudo-principal"
        ref={mainRef}
        key={location.pathname}
        className={cn(styles.main, 'scroll-area', bleed && styles.bleed)}
        tabIndex={-1}
      >
        {children}
      </main>

      <nav className={styles.actionBar} aria-label={t.nav.menu}>
        <div className={styles.actionGroup}>
          {showBack && (
            <Button
              variant="secondary"
              size="lg"
              icon="arrow-left"
              wrapLabel
              onClick={onBack ?? navigation.back}
            >
              {t.nav.back}
            </Button>
          )}
          <Button variant="primary" size="lg" icon="home" wrapLabel onClick={navigation.home}>
            {t.nav.home}
          </Button>
        </div>
        <div className={styles.actionGroup}>
          <LanguageSelector />
          <AccessibilityControl />
          <FullScreenMenu />
        </div>
      </nav>
    </div>
  );
}
