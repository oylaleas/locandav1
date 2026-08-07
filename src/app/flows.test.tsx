import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AppShell } from '@/app/AppShell';
import { renderWithProviders } from '@/test/renderApp';

// Tempos curtos para validar o ciclo de inatividade sem esperar 90 s.
vi.mock('@/config/kiosk', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/config/kiosk')>();
  return {
    ...original,
    INACTIVITY_TIMEOUT_MS: 400,
    WARNING_DURATION_MS: 600,
    INACTIVITY_TICK_MS: 100,
    TAP_GUARD_MS: 0,
  };
});

async function enterFromAttract() {
  const { user } = renderWithProviders(<AppShell />, '/home');
  const activate = await screen.findByTestId('attract-activate');
  await user.click(activate);
  await screen.findByRole('heading', { name: 'Bem-vindo' });
  return { user };
}

describe('jornada principal do totem', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/home');
  });

  it('ATTRACT → primeiro toque → HOME', async () => {
    expect.hasAssertions();
    const { user } = renderWithProviders(<AppShell />, '/home');

    expect(await screen.findByTestId('attract-mode')).toBeInTheDocument();

    await user.click(screen.getByTestId('attract-activate'));

    expect(await screen.findByRole('heading', { name: 'Bem-vindo' })).toBeVisible();
    expect(screen.queryByTestId('attract-mode')).not.toBeInTheDocument();
  });

  it('HOME → conteúdo → detalhe → VOLTAR volta para a Home', async () => {
    const { user } = await enterFromAttract();

    // A Home é um menu: navega-se via "Todos os conteúdos" até o detalhe.
    await user.click(screen.getByRole('button', { name: /Ver todos os conteúdos/i }));
    await screen.findByRole('heading', { level: 1, name: 'Conteúdos' });

    await user.click(screen.getByRole('button', { name: /Quem somos/i }));
    expect(await screen.findByRole('heading', { level: 1, name: 'A Locanda' })).toBeVisible();

    // Voltar retorna ao contexto anterior (índice) e depois à Home.
    await user.click(screen.getByRole('button', { name: 'Voltar' }));
    expect(await screen.findByRole('heading', { level: 1, name: 'Conteúdos' })).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Voltar' }));
    expect(await screen.findByRole('heading', { name: 'Bem-vindo' })).toBeVisible();
  });

  it('abre e fecha o painel de QR Code sem deixar dead end', async () => {
    const { user } = await enterFromAttract();

    await user.click(screen.getByRole('button', { name: /Leve a Locanda com você/i }));

    const dialog = await screen.findByRole('dialog');
    expect(within(dialog).getByText(/Destino/i)).toBeVisible();

    await user.click(within(dialog).getAllByRole('button', { name: 'Fechar' })[0]);
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('HOME → conteúdo → VÍDEO → fim do vídeo → QR Code', async () => {
    const { user } = await enterFromAttract();

    await user.click(screen.getByRole('button', { name: /Ver todos os conteúdos/i }));
    await screen.findByRole('heading', { level: 1, name: 'Conteúdos' });
    await user.click(screen.getByRole('button', { name: /Quem somos/i }));
    await screen.findByRole('heading', { level: 1, name: 'A Locanda' });

    await user.click(screen.getByRole('button', { name: /Assistir ao vídeo/ }));
    expect(screen.getByTestId('video-player')).toHaveAttribute('data-state', 'playing');

    // Fim do vídeo → o visitante recebe ações, incluindo o handoff por QR.
    fireEvent.ended(document.querySelector('video')!);
    const endedQrButtons = await screen.findAllByRole('button', { name: 'Abrir QR Code' });
    await user.click(endedQrButtons[0]);

    const dialog = await screen.findByRole('dialog');
    expect(within(dialog).getByRole('img', { name: /Site oficial/i })).toBeInTheDocument();

    await user.click(within(dialog).getAllByRole('button', { name: 'Fechar' })[0]);
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());

    // Voltar ao Início interrompe a mídia e limpa o contexto.
    await user.click(screen.getByRole('button', { name: 'Início' }));
    expect(await screen.findByRole('heading', { name: 'Bem-vindo' })).toBeVisible();
  });

  it('HOME → índice de conteúdos → detalhe', async () => {
    const { user } = await enterFromAttract();

    await user.click(screen.getByRole('button', { name: /Ver todos os conteúdos/i }));
    expect(await screen.findByRole('heading', { level: 1, name: 'Conteúdos' })).toBeVisible();

    await user.click(screen.getByRole('button', { name: /Onde descansar/i }));
    expect(await screen.findByRole('heading', { level: 1, name: 'Acomodações' })).toBeVisible();
  });

  it('HOME → galeria → VOLTAR volta para a Home', async () => {
    const { user } = await enterFromAttract();

    await user.click(screen.getByRole('button', { name: /Ver galeria de fotos/i }));
    expect(await screen.findByRole('heading', { level: 1, name: 'Galeria' })).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Voltar' }));
    expect(await screen.findByRole('heading', { name: 'Bem-vindo' })).toBeVisible();
  });

  it('rota inexistente oferece saída para a Home', async () => {
    const { user } = renderWithProviders(<AppShell />, '/rota-inexistente');
    await user.click(await screen.findByTestId('attract-activate'));

    await user.click(await screen.findByRole('button', { name: 'Início' }));
    expect(await screen.findByRole('heading', { name: 'Bem-vindo' })).toBeVisible();
  });

  it('troca de idioma mantém o visitante na mesma tela', async () => {
    const { user } = await enterFromAttract();

    await user.click(screen.getByRole('button', { name: /PT/ }));
    await user.click(await screen.findByRole('button', { name: 'English' }));

    expect(await screen.findByRole('heading', { name: 'Welcome' })).toBeVisible();
    expect(document.documentElement.lang).toBe('en');
  });

  it('INATIVIDADE → AVISO → sem resposta → RESET → ATTRACT', async () => {
    await enterFromAttract();

    const warning = await screen.findByRole('heading', { name: 'Você ainda está aí?' }, { timeout: 3000 });
    expect(warning).toBeVisible();

    expect(await screen.findByTestId('attract-mode', undefined, { timeout: 3000 })).toBeVisible();
  });

  it('AVISO → "Continuar navegando" mantém a sessão ativa', async () => {
    const { user } = await enterFromAttract();

    await screen.findByRole('heading', { name: 'Você ainda está aí?' }, { timeout: 3000 });
    await user.click(screen.getByRole('button', { name: 'Continuar navegando' }));

    expect(screen.queryByRole('heading', { name: 'Você ainda está aí?' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Bem-vindo' })).toBeVisible();
  });
});
