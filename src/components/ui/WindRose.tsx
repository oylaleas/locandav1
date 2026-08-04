/**
 * ROSA DOS VENTOS — gráfico decorativo de interação
 * -------------------------------------------------------------------------
 * Inspirado na rosa dos ventos do logotipo oficial (estrela de 8 pontas +
 * círculo central). É uma PEÇA DECORATIVA de ambientação — não substitui e
 * não reproduz o logotipo oficial (que vive em src/assets/brand/ e é usado
 * pelo <Brandmark/> e nos ícones PWA).
 *
 * Uso: marca d'água sutil em superfícies de interação (Attract Mode, painel
 * de QR), sempre com opacidade baixa e herdando a cor via currentColor.
 */

interface WindRoseProps {
  size?: number | string;
  className?: string;
}

export function WindRose({ size = '1.5rem', className }: WindRoseProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="6.2" y="6.2" width="11.6" height="11.6" rx="1" />
      <rect x="6.2" y="6.2" width="11.6" height="11.6" rx="1" transform="rotate(45 12 12)" />
      <circle cx="12" cy="12" r="2.1" />
    </svg>
  );
}
