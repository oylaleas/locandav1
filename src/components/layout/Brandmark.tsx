import { BRAND_ASSETS } from '@/data/media';
import { SITE_IDENTITY } from '@/data/content';
import { useI18n } from '@/features/i18n/useI18n';
import { cn } from '@/utils/cn';
import styles from './Brandmark.module.css';

interface BrandmarkProps {
  tone?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  /** Mostra o descritor sob o nome (Attract Mode / Home). */
  withDescriptor?: boolean;
  className?: string;
}

/**
 * Marca da Locanda dei Venti.
 *
 * [A VALIDAR] O logotipo oficial ainda não foi disponibilizado no repositório.
 * Assim que o arquivo existir, basta apontar BRAND_ASSETS.logoSrc em
 * src/data/media.ts — este componente passa a exibir a imagem e o fallback
 * tipográfico deixa de ser usado, sem alterações em nenhuma tela.
 */
export function Brandmark({
  tone = 'light',
  size = 'md',
  withDescriptor = false,
  className,
}: BrandmarkProps) {
  const { tx } = useI18n();

  if (BRAND_ASSETS.logoSrc) {
    return (
      <img
        src={BRAND_ASSETS.logoSrc}
        alt={BRAND_ASSETS.logoAlt}
        className={cn(styles.logo, styles[size], className)}
      />
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
