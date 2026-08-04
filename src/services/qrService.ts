/* ==========================================================================
   QR SERVICE
   --------------------------------------------------------------------------
   Geração de QR Code em SVG.
   Dependência: `qrcode` (a codificação QR — máscaras + Reed-Solomon — não é
   algo que se deva reimplementar à mão). O import é dinâmico para manter o
   bundle inicial do totem enxuto: o código só é baixado quando um painel de
   QR é aberto pela primeira vez.
   ========================================================================== */

const svgCache = new Map<string, string>();

export interface QrRenderOptions {
  /** Correção de erro: 'M' equilibra densidade e tolerância a sujeira/reflexo. */
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  /** Quiet zone em módulos (mínimo recomendado: 4). */
  margin?: number;
  dark?: string;
  light?: string;
}

export async function renderQrSvg(
  value: string,
  options: QrRenderOptions = {},
): Promise<string> {
  const {
    errorCorrectionLevel = 'M',
    margin = 4,
    dark = '#141b18',
    light = '#ffffff',
  } = options;

  const cacheKey = `${value}|${errorCorrectionLevel}|${margin}|${dark}|${light}`;
  const cached = svgCache.get(cacheKey);
  if (cached) return cached;

  const QRCode = await import('qrcode');
  const svg = await QRCode.toString(value, {
    type: 'svg',
    errorCorrectionLevel,
    margin,
    color: { dark, light },
  });

  // Deixa o SVG responsivo dentro do painel sem depender de width/height fixos.
  const responsive = svg
    .replace(/width="[^"]*"/, 'width="100%"')
    .replace(/height="[^"]*"/, 'height="100%"');

  svgCache.set(cacheKey, responsive);
  return responsive;
}
