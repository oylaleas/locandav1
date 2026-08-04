import type { ReactElement } from 'react';

import type { IconName } from '@/types/content';

/**
 * Conjunto de ícones desenhado internamente (sem dependência externa).
 * Traço de 1.6 para boa leitura à distância de totem.
 * Ícones são decorativos por padrão (aria-hidden): o rótulo textual sempre
 * acompanha o controle.
 */
const PATHS: Record<IconName, ReactElement> = {
  'arrow-left': <path d="M15 5 8 12l7 7" />,
  'arrow-right': <path d="m9 5 7 7-7 7" />,
  home: (
    <>
      <path d="M4 11.2 12 4.5l8 6.7" />
      <path d="M6.5 10.5V19a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-8.5" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
  play: <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" stroke="none" />,
  pause: (
    <>
      <path d="M9 5v14" />
      <path d="M15 5v14" />
    </>
  ),
  replay: (
    <>
      <path d="M20 12a8 8 0 1 1-2.6-5.9" />
      <path d="M20 4v4.5h-4.5" />
    </>
  ),
  'sound-on': (
    <>
      <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" />
      <path d="M16 9.2a4 4 0 0 1 0 5.6" />
      <path d="M18.6 6.6a7.5 7.5 0 0 1 0 10.8" />
    </>
  ),
  'sound-off': (
    <>
      <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" />
      <path d="m16.5 9.5 5 5" />
      <path d="m21.5 9.5-5 5" />
    </>
  ),
  captions: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M9.5 10.8a2.2 2.2 0 1 0 0 2.4" />
      <path d="M16.5 10.8a2.2 2.2 0 1 0 0 2.4" />
    </>
  ),
  expand: (
    <>
      <path d="M4 9V4.5h4.5" />
      <path d="M20 15v4.5h-4.5" />
      <path d="M4.5 4.5 10 10" />
      <path d="M19.5 19.5 14 14" />
    </>
  ),
  collapse: (
    <>
      <path d="M9.5 4.5V9H5" />
      <path d="M14.5 19.5V15H19" />
      <path d="M4.5 4.5 9 9" />
      <path d="M19.5 19.5 15 15" />
    </>
  ),
  qr: (
    <>
      <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1.2" />
      <rect x="14" y="3.5" width="6.5" height="6.5" rx="1.2" />
      <rect x="3.5" y="14" width="6.5" height="6.5" rx="1.2" />
      <path d="M14 14h3v3h-3z" />
      <path d="M20.5 14v3.5M17.5 20.5h3M14 20.5h.01" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.4 2.6 3.6 5.4 3.6 8.5s-1.2 5.9-3.6 8.5c-2.4-2.6-3.6-5.4-3.6-8.5S9.6 6.1 12 3.5Z" />
    </>
  ),
  accessibility: (
    <>
      <circle cx="12" cy="5" r="1.8" />
      <path d="M4.5 9h15" />
      <path d="M12 9v5" />
      <path d="m8.5 20 3.5-6 3.5 6" />
    </>
  ),
  gallery: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m5 17 4.5-4.2 3.5 3 2.6-2.3L19.5 17" />
    </>
  ),
  bed: (
    <>
      <path d="M3.5 18v-9" />
      <path d="M3.5 12.5h17V18" />
      <path d="M7.5 12.5v-2.2A1.3 1.3 0 0 1 8.8 9h8.4a3.3 3.3 0 0 1 3.3 3.3v.2" />
      <circle cx="7.2" cy="10.4" r="1.4" />
    </>
  ),
  dining: (
    <>
      <path d="M7 3.5v8.2a2 2 0 0 0 2 2h.2v7" />
      <path d="M9.4 3.5v5" />
      <path d="M4.6 3.5v5a2.4 2.4 0 0 0 2.4 2.4" />
      <path d="M17.5 3.5c-1.7 1.6-2.4 3.4-2.4 5.4 0 1.6.8 2.7 2.4 3v8.8" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m14.8 9.2-1.7 4.1-4.1 1.7 1.7-4.1z" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-7 4.5-11.5 14-11.5C19 15 15 19.5 8 19.5H5Z" />
      <path d="M5 19c3.5-3 6.5-5 9.5-6.2" />
    </>
  ),
  'map-pin': (
    <>
      <path d="M12 21s6.5-5.6 6.5-10.4A6.5 6.5 0 0 0 5.5 10.6C5.5 15.4 12 21 12 21Z" />
      <circle cx="12" cy="10.4" r="2.4" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5" />
      <path d="M12 7.8h.01" />
    </>
  ),
  offline: (
    <>
      <path d="M3 4.5 21 20" />
      <path d="M5.2 10.3a11 11 0 0 1 3.6-2.2" />
      <path d="M8.4 13.7a6.5 6.5 0 0 1 2.2-1.3" />
      <path d="M12 17.8h.01" />
      <path d="M15.6 13.9a6.6 6.6 0 0 0-1.4-1" />
      <path d="M18.9 10.4a11 11 0 0 0-3.4-2.2" />
    </>
  ),
  touch: (
    <>
      <path d="M9.5 11V6.2a1.8 1.8 0 1 1 3.6 0V13" />
      <path d="M13.1 11.4a1.7 1.7 0 0 1 3.4 0v1" />
      <path d="M16.5 12.6a1.7 1.7 0 0 1 3.4 0v3.1c0 3-2.4 5.3-5.4 5.3h-1.4c-2 0-3.4-.8-4.4-2.4l-3-4.7a1.8 1.8 0 0 1 2.9-2.1l1 1.3" />
    </>
  ),
  'chevron-down': <path d="m6 9.5 6 6 6-6" />,
  alert: (
    <>
      <path d="M12 4.5 21 19.5H3z" />
      <path d="M12 10v4" />
      <path d="M12 17h.01" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  spa: (
    <>
      <path d="M12 21c-4.4 0-7.5-3-7.5-7.2C9 13.8 12 16.6 12 21Z" />
      <path d="M12 21c0-4.4 3.1-7.2 7.5-7.2 0 4.2-3.1 7.2-7.5 7.2Z" />
      <path d="M12 21c-1.6-3.2-1.6-6.4 0-9.6 1.6 3.2 1.6 6.4 0 9.6Z" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3.5v2.5M12 18v2.5M3.5 12H6M18 12h2.5M5.8 5.8l1.8 1.8M16.4 16.4l1.8 1.8M18.2 5.8l-1.8 1.8M7.6 16.4l-1.8 1.8" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  boat: (
    <>
      <path d="M3.5 16.5h17" />
      <path d="M5.5 16.5 8 9h8l2.5 7.5" />
      <path d="M12 9V4.5" />
      <path d="m12 9-3.5-2.5h7L12 9Z" />
    </>
  ),
  chat: (
    <>
      <path d="M12 3.5a8 8 0 0 0-6.9 12L4 20.5l5.1-1.3A8 8 0 1 0 12 3.5Z" />
      <path d="M9.3 8.3c-.4 0-.7.6-.9 1 0 .6.3 2.2 2 3.8 1.6 1.6 3.2 2 3.8 2 .4 0 1-.5 1-.9l-.3-1.6-1.6-.4-.7.7c-.7-.4-1.6-1.3-2-2l.7-.7-.4-1.6-1.6-.3Z" />
    </>
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <path d="M17 7.2h.01" />
    </>
  ),
};

interface IconProps {
  name: IconName;
  size?: number | string;
  className?: string;
  /** Quando o ícone carrega significado sozinho (raro), forneça um título. */
  title?: string;
}

export function Icon({ name, size = '1.75rem', className, title }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
