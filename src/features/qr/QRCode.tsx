import { useEffect, useState } from 'react';
import { Spinner } from '@/components/ui/Spinner';
import { renderQrSvg } from '@/services/qrService';
import styles from './QRCode.module.css';

interface QRCodeProps {
  value: string;
  /** Descrição textual do destino (o QR em si é decorativo para leitores). */
  label: string;
  onError?: () => void;
}

/**
 * Renderiza o QR como SVG (nítido em qualquer tamanho de tela).
 * A "quiet zone" e o contraste são responsabilidade deste componente:
 * fundo branco sólido + margem generosa, sem nada sobreposto.
 *
 * Observação: o componente é montado com `key={value}` pelo painel, então o
 * estado sempre começa limpo quando o destino muda.
 */
export function QRCode({ value, label, onError }: QRCodeProps) {
  const [svg, setSvg] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    renderQrSvg(value)
      .then((markup) => {
        if (!cancelled) setSvg(markup);
      })
      .catch(() => {
        if (cancelled) return;
        setFailed(true);
        onError?.();
      });

    return () => {
      cancelled = true;
    };
  }, [value, onError]);

  if (failed) return null;

  return (
    <div className={styles.frame} role="img" aria-label={label}>
      {svg ? (
        <div className={styles.code} dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <div className={styles.loading}>
          <Spinner size="2.5rem" />
        </div>
      )}
    </div>
  );
}
