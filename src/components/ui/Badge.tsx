import type { ReactNode } from 'react';
import { Icon } from './Icon';
import type { IconName } from '@/types/content';
import { cn } from '@/utils/cn';
import styles from './Badge.module.css';

interface BadgeProps {
  children: ReactNode;
  icon?: IconName;
  tone?: 'neutral' | 'warning' | 'inverse' | 'accent';
  className?: string;
}

export function Badge({ children, icon, tone = 'neutral', className }: BadgeProps) {
  return (
    <span className={cn(styles.badge, styles[tone], className)}>
      {icon && <Icon name={icon} size="1.1em" />}
      {children}
    </span>
  );
}
