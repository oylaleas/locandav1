import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Icon } from './Icon';
import { Spinner } from './Spinner';
import { useTapGuard } from '@/hooks/useTapGuard';
import type { IconName } from '@/types/content';
import { cn } from '@/utils/cn';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'quiet' | 'inverse' | 'solidInverse';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  iconPosition?: 'start' | 'end';
  /** Somente ícone: `children` vira rótulo acessível obrigatório. */
  iconOnly?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  selected?: boolean;
  wrapLabel?: boolean;
  children?: ReactNode;
  onClick?: () => void;
  /** Desliga a proteção contra toques repetidos (ex.: controles de volume). */
  disableTapGuard?: boolean;
}

/**
 * Botão touch-first: alvo mínimo generoso, feedback de pressed sem depender de
 * hover, estados de loading/disabled/selected e proteção contra toque duplo.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'start',
    iconOnly = false,
    fullWidth = false,
    loading = false,
    selected = false,
    wrapLabel = false,
    disabled,
    children,
    onClick,
    className,
    type = 'button',
    disableTapGuard = false,
    ...rest
  },
  ref,
) {
  const guarded = useTapGuard(() => onClick?.(), disableTapGuard ? 0 : undefined);

  const label = iconOnly ? undefined : children;
  const accessibleName = iconOnly && typeof children === 'string' ? children : undefined;

  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      className={cn(
        styles.button,
        styles[variant],
        styles[size],
        iconOnly && styles.iconOnly,
        fullWidth && styles.fullWidth,
        selected && styles.selected,
        loading && styles.loading,
        wrapLabel && styles.wrapLabel,
        className,
      )}
      onClick={guarded}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-label={accessibleName ?? rest['aria-label']}
      data-selected={selected || undefined}
    >
      {icon && iconPosition === 'start' && <Icon name={icon} size="1.6em" />}
      {label && <span className={styles.label}>{label}</span>}
      {icon && iconPosition === 'end' && <Icon name={icon} size="1.6em" />}
      {loading && (
        <span className={styles.spinner}>
          <Spinner size="1.5rem" />
        </span>
      )}
    </button>
  );
});
