import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Spinner } from '@/components/ui/Spinner';
import { useI18n } from '@/features/i18n/useI18n';
import type { IconName } from '@/types/content';
import { cn } from '@/utils/cn';
import styles from './StateMessage.module.css';

interface StateAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'quiet';
  icon?: IconName;
}

interface StateMessageProps {
  icon?: IconName;
  title: string;
  message?: string;
  actions?: StateAction[];
  tone?: 'light' | 'dark';
  compact?: boolean;
  children?: ReactNode;
}

/** Base compartilhada por empty/error/loading — nunca uma tela sem saída. */
export function StateMessage({
  icon,
  title,
  message,
  actions = [],
  tone = 'light',
  compact = false,
  children,
}: StateMessageProps) {
  return (
    <div
      className={cn(styles.root, tone === 'dark' && styles.dark, compact && styles.compact)}
      data-surface={tone === 'dark' ? 'inverse' : undefined}
    >
      {icon && (
        <span className={styles.icon}>
          <Icon name={icon} size="2.75rem" />
        </span>
      )}
      <h2 className={styles.title}>{title}</h2>
      {message && <p className={styles.message}>{message}</p>}
      {children}
      {actions.length > 0 && (
        <div className={styles.actions}>
          {actions.map((action) => (
            <Button
              key={action.label}
              variant={action.variant ?? 'primary'}
              icon={action.icon}
              size="lg"
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

export function LoadingState({ label, tone = 'light' }: { label?: string; tone?: 'light' | 'dark' }) {
  const { t } = useI18n();
  return (
    <div
      className={cn(styles.root, styles.loading, tone === 'dark' && styles.dark)}
      role="status"
      aria-live="polite"
    >
      <Spinner size="3rem" />
      <p className={styles.message}>{label ?? t.app.loading}</p>
    </div>
  );
}

export function ErrorState({
  title,
  message,
  onRetry,
  onHome,
  tone = 'light',
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
  onHome?: () => void;
  tone?: 'light' | 'dark';
}) {
  const { t } = useI18n();
  const actions: StateAction[] = [];
  if (onRetry) actions.push({ label: t.errors.retry, onClick: onRetry, icon: 'replay' });
  if (onHome)
    actions.push({
      label: t.errors.backHome,
      onClick: onHome,
      variant: 'secondary',
      icon: 'home',
    });

  return (
    <StateMessage
      icon="alert"
      title={title ?? t.errors.genericTitle}
      message={message ?? t.errors.genericMessage}
      actions={actions}
      tone={tone}
    />
  );
}

export function EmptyState({
  title,
  message,
  actionLabel,
  onAction,
}: {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  const { t } = useI18n();
  return (
    <StateMessage
      icon="info"
      title={title ?? t.empty.title}
      message={message ?? t.empty.message}
      actions={
        onAction
          ? [{ label: actionLabel ?? t.empty.action, onClick: onAction, variant: 'secondary' }]
          : []
      }
    />
  );
}
