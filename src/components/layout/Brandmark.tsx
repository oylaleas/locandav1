import { BRAND_ASSETS } from '@/data/media';
import { SITE_IDENTITY } from '@/data/content';
import { useI18n } from '@/features/i18n/useI18n';
import { cn } from '@/utils/cn';
import styles from './Brandmark.module.css';

interface BrandmarkProps {
  /**
   * Superfície onde a marca é exibida:
   * - `light` — fundo claro (Home, cabeçalho): o lockup tem wordmark BRANCO,
   *   então é exibido dentro de uma placa escura para manter a legibilidade.
   * - `dark` — fundo escuro (Attract Mode): o lockup é exibido diretamente.
   */
  tone?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  /** Mostra o descritor sob o nome (Attract Mode / Home). */
  withDescriptor?: boolean;
  className?: string;
}

/**
 * Marca da Locanda dei Venti.
 *
 * Logotipo oficial integrado (src/assets/brand/). O lockup tem texto branco
 * e por isso é sempre exibido sobre fundo escuro: direto no Attract Mode ou
 * dentro da placa escura em superfícies claras. O fallback tipográfico abaixo
 * só existe caso BRAND_ASSETS.logoSrc seja removido no futuro.
 */
export function Brandmark({
  tone = 'light',
  size = 'md',
  withDescriptor = false,
  className,
}: BrandmarkProps) {
  const { tx } = useI18n();

  if (BRAND_ASSETS.logoSrc) {
    const onDarkSurface = tone === 'dark';
    return (
      <span
        className={cn(
          styles.brand,
          styles[size],
          !onDarkSurface && styles.plate,
          className,
        )}
      >
        <img
          src={BRAND_ASSETS.logoSrc}
          alt={BRAND_ASSETS.logoAlt}
          width={BRAND_ASSETS.logoWidth}
          height={BRAND_ASSETS.logoHeight}
          className={styles.logo}
        />
        {withDescriptor && (
          <span
            className={cn(
              styles.descriptor,
              styles[size],
              onDarkSurface && styles.descriptorOnDark,
            )}
          >
            {tx(SITE_IDENTITY.descriptor)}
          </span>
        )}
      </span>
    );
  }

  return (
    <span className={cn(styles.wordmark, styles[size], styles[tone], className)}>
      <span className={styles.line1}>Locanda</span>
      <span className={styles.line2}>dei Venti</span>
      {withDescriptor && (
        <span className={styles.descriptor}>{tx(SITE_IDENTITY.descriptor)}</span>
      )}
    </span>
  );
}
