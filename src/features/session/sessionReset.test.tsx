import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useI18n } from '@/features/i18n/useI18n';
import { VideoPlayer } from '@/features/media/VideoPlayer';
import { useSession } from '@/features/session/SessionProvider';
import { getVideo } from '@/services/contentService';
import { renderWithProviders } from '@/test/renderApp';

const video = getVideo('video-institucional')!;

function Harness() {
  const session = useSession();
  const { language } = useI18n();
  return (
    <div>
      <span data-testid="language">{language}</span>
      <span data-testid="phase">{session.phase}</span>
      <button type="button" onClick={() => session.resetSession('manual')}>
        encerrar
      </button>
      <VideoPlayer video={video} />
    </div>
  );
}

describe('resetSession()', () => {
  it('para o vídeo, restaura o áudio padrão, o idioma e volta à Home (sem Attract)', async () => {
    const { user } = renderWithProviders(<Harness />);

    // Sem Attract Mode: a sessão já nasce ativa.
    expect(screen.getByTestId('phase')).toHaveTextContent('active');

    // Visitante reproduz o vídeo e liga o som.
    await user.click(screen.getByRole('button', { name: /Assistir ao vídeo/ }));
    await user.click(screen.getByRole('button', { name: 'Sem som' }));
    expect(screen.getByTestId('video-player')).toHaveAttribute('data-state', 'playing');
    expect(screen.getByRole('button', { name: 'Com som' })).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'encerrar' }));

    // O reset volta ao estado ativo (a Home é o estado inicial) e limpa tudo.
    expect(screen.getByTestId('phase')).toHaveTextContent('active');
    expect(screen.getByTestId('video-player')).toHaveAttribute('data-state', 'idle');
    expect(screen.getByRole('button', { name: 'Sem som' })).toBeVisible();
    expect(screen.getByTestId('language')).toHaveTextContent('pt-BR');
  });
});
