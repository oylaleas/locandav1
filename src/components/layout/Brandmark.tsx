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
 * Apenas as LOGOS OFICIAIS (src/assets/brand/) são usadas:
 * - superfície clara (Home, cabeçalho) → lockup colorido dentro da placa
 *   escura (o wordmark é branco e exige fundo escuro para leitura);
 * - superfície escura (Attract Mode) → lockup monocromático branco, direto.
 * O fallback tipográfico abaixo só existe caso BRAND_ASSETS seja removido.
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
    // Logo oficial para a superfície: branca em fundos escuros, colorida em
    // fundos claros (sobre a placa). Nunca inventamos uma variação nova.
    const logo = onDarkSurface ? BRAND_ASSETS.logoSrcWhite : BRAND_ASSETS.logoSrc;
    const width = onDarkSurface ? BRAND_ASSETS.logoWidthWhite : BRAND_ASSETS.logoWidth;
    const height = onDarkSurface ? BRAND_ASSETS.logoHeightWhite : BRAND_ASSETS.logoHeight;
    const alt = onDarkSurface ? BRAND_ASSETS.logoAltWhite : BRAND_ASSETS.logoAlt;

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
          src={logo}
          alt={alt}
          width={width}
          height={height}
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
