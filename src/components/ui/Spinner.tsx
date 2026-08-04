import styles from './Spinner.module.css';

interface SpinnerProps {
  size?: string;
  /** Rótulo para leitores de tela; omitido quando há texto ao lado. */
  label?: string;
}

export function Spinner({ size = '2rem', label }: SpinnerProps) {
  return (
    <span
      className={styles.spinner}
      style={{ width: size, height: size }}
      role={label ? 'status' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
