import { fireEvent, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { VideoPlayer } from '@/features/media/VideoPlayer';
import { getVideo } from '@/services/contentService';
import { renderWithProviders } from '@/test/renderApp';

const institutional = getVideo('video-institucional')!;
const experience = getVideo('video-experiencia')!;

function getPlayer() {
  return screen.getAllByTestId('video-player')[0];
}

describe('VideoPlayer', () => {
  it('começa em idle mostrando o poster e a chamada para reproduzir', () => {
    renderWithProviders(<VideoPlayer video={institutional} />);

    expect(getPlayer()).toHaveAttribute('data-state', 'idle');
    expect(screen.getByRole('button', { name: /Assistir ao vídeo/ })).toBeVisible();
  });

  it('ao tocar em Play o vídeo entra no estado de reprodução', async () => {
    const { user } = renderWithProviders(<VideoPlayer video={institutional} />);

    await user.click(screen.getByRole('button', { name: /Assistir ao vídeo/ }));

    expect(getPlayer()).toHaveAttribute('data-state', 'playing');
    expect(screen.getByRole('button', { name: 'Pausar' })).toBeVisible();
  });

  it('mostra o estado do áudio em TEXTO e alterna com um toque', async () => {
    const { user } = renderWithProviders(<VideoPlayer video={institutional} />);

    const soundButton = screen.getByRole('button', { name: 'Sem som' });
    await user.click(soundButton);

    expect(screen.getByRole('button', { name: 'Com som' })).toBeVisible();
  });

  it('erro de mídia mostra poster, mensagem e ação de recuperação', () => {
    renderWithProviders(<VideoPlayer video={institutional} />);

    const video = document.querySelector('video');
    fireEvent.error(video!);

    expect(screen.getByRole('alert')).toHaveTextContent('Não foi possível reproduzir o vídeo');
    expect(screen.getByRole('button', { name: 'Tentar novamente' })).toBeVisible();
  });

  it('ao terminar oferece reproduzir novamente e ações adicionais', () => {
    renderWithProviders(
      <VideoPlayer
        video={institutional}
        endedActions={[{ label: 'Abrir QR Code', onClick: () => undefined, icon: 'qr' }]}
      />,
    );

    fireEvent.ended(document.querySelector('video')!);

    expect(screen.getByText('Fim do vídeo')).toBeVisible();
    expect(screen.getAllByRole('button', { name: 'Reproduzir novamente' })[0]).toBeVisible();
    expect(screen.getByRole('button', { name: 'Abrir QR Code' })).toBeVisible();
  });

  it('nunca deixa dois vídeos reproduzindo ao mesmo tempo', async () => {
    const { user } = renderWithProviders(
      <>
        <VideoPlayer video={institutional} />
        <VideoPlayer video={experience} />
      </>,
    );

    const [first, second] = screen.getAllByTestId('video-player');

    await user.click(within(first).getByRole('button', { name: /Assistir ao vídeo/ }));
    expect(first).toHaveAttribute('data-state', 'playing');

    await user.click(within(second).getByRole('button', { name: /Assistir ao vídeo/ }));

    expect(second).toHaveAttribute('data-state', 'playing');
    expect(first).toHaveAttribute('data-state', 'paused');
  });
});
