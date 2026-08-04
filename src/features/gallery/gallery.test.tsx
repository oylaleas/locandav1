import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import GalleryPage from '@/pages/GalleryPage';
import { renderWithProviders } from '@/test/renderApp';

describe('Galeria', () => {
  it('abre a imagem em tela cheia, navega e fecha sem dead end', async () => {
    const { user } = renderWithProviders(<GalleryPage />, '/galeria');

    const thumbs = await screen.findAllByRole('button', { name: /Ampliar imagem/ });
    await user.click(thumbs[0]);

    const viewer = await screen.findByTestId('gallery-viewer');
    expect(viewer).toBeVisible();
    expect(screen.getByText(/^1 de \d+$/)).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Próxima imagem' }));
    expect(screen.getByText(/^2 de \d+$/)).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Imagem anterior' }));
    expect(screen.getByText(/^1 de \d+$/)).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Fechar galeria' }));
    await waitFor(() => expect(screen.queryByTestId('gallery-viewer')).not.toBeInTheDocument());
  });
});
