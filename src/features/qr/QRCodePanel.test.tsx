import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { QRCodePanel } from '@/features/qr/QRCodePanel';
import { getQrTarget } from '@/services/contentService';
import { renderWithProviders } from '@/test/renderApp';

const target = getQrTarget('qr-site')!;

describe('QRCodePanel', () => {
  it('renderiza o código, a instrução, o destino e permite fechar', async () => {
    const onClose = vi.fn();
    const { user } = renderWithProviders(
      <QRCodePanel target={target} open onClose={onClose} />,
    );

    expect(screen.getByRole('dialog')).toBeVisible();
    expect(screen.getByText(/Aponte a câmera/i)).toBeVisible();

    // O QR é gerado de forma assíncrona (import dinâmico da lib).
    const code = await screen.findByRole('img', { name: /Site oficial/i });
    await waitFor(() => expect(code.querySelector('svg')).toBeTruthy());

    // Sinaliza claramente que a URL ainda é placeholder de desenvolvimento.
    expect(screen.getByText(/URL real a definir/i)).toBeVisible();

    await user.click(screen.getAllByRole('button', { name: 'Fechar' })[0]);
    expect(onClose).toHaveBeenCalled();
  });

  it('não renderiza nada quando fechado', () => {
    renderWithProviders(<QRCodePanel target={target} open={false} onClose={() => undefined} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
