import { act, fireEvent, screen, waitFor, within } from '@testing-library/react';
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
  // Sem tela inicial: o totem abre direto no menu (Home).
  const { user } = renderWithProviders(<AppShell />, '/home');
  await screen.findByRole('heading', { name: 'Locanda Experience' });
  return { user };
}

describe('jornada principal do totem', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/home');
  });

  it('abre direto na HOME (sem tela inicial)', async () => {
    const { user } = renderWithProviders(<AppShell />, '/home');

    // Sem Attract Mode: o totem já nasce no menu inicial.
    expect(await screen.findByRole('heading', { name: 'Locanda Experience' })).toBeVisible();
    expect(screen.queryByTestId('attract-mode')).not.toBeInTheDocument();
    void user;
  });

  it('HOME → hub → detalhe → VOLTAR volta para a Home', async () => {
    const { user } = await enterFromAttract();

    // A Home é o hub: um card leva direto ao detalhe da categoria.
    await user.click(screen.getByRole('button', { name: /Comodidades/i }));
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Comodidades de nossos hóspedes' }),
    ).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Voltar' }));
    expect(await screen.findByRole('heading', { name: 'Locanda Experience' })).toBeVisible();
  });

  it('abre e fecha o painel de QR Code (via menu fullscreen) sem dead end', async () => {
    const { user } = await enterFromAttract();

    // O QR agora é acessado pelo rodapé do menu fullscreen (handoff).
    await user.click(screen.getByRole('button', { name: /Abrir menu/i }));
    const menu = await screen.findByRole('dialog', { name: 'Navegação principal' });
    await user.click(within(menu).getByRole('link', { name: /WhatsApp/ }));

    const dialog = await screen.findByRole('dialog', { name: /Fale com a Locanda/ });
    expect(within(dialog).getByText(/Destino/i)).toBeVisible();

    await user.click(within(dialog).getAllByRole('button', { name: 'Fechar' })[0]);
    await waitFor(() => expect(screen.queryByRole('dialog', { name: /Fale com a Locanda/ })).not.toBeInTheDocument());
  });

  it('DETALHE (com vídeo) → fim do vídeo → QR Code', async () => {
    // Seção com vídeo: Experiências (acessível pelo hub e relacionadas).
    const { user } = renderWithProviders(<AppShell />, '/conteudos/experiencias');
    await screen.findByRole('heading', { level: 1, name: 'Experiências' });

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
    expect(await screen.findByRole('heading', { name: 'Locanda Experience' })).toBeVisible();
  });

  it('rota inexistente oferece saída para a Home', async () => {
    const { user } = renderWithProviders(<AppShell />, '/rota-inexistente');

    await user.click(await screen.findByRole('button', { name: 'Início' }));
    expect(await screen.findByRole('heading', { name: 'Locanda Experience' })).toBeVisible();
  });

  it('troca de idioma mantém o visitante na mesma tela', async () => {
    const { user } = await enterFromAttract();

    await user.click(screen.getByRole('button', { name: /PT/ }));
    await user.click(await screen.findByRole('button', { name: 'English' }));

    expect(await screen.findByRole('heading', { name: 'Locanda Experience' })).toBeVisible();
    expect(document.documentElement.lang).toBe('en');
  });

  it('INATIVIDADE NA HOME → reset silencioso, sem aviso operacional', async () => {
    await enterFromAttract();

    // A Home já é a tela de descanso do kiosk: após o timeout ela é
    // reiniciada silenciosamente, sem interromper quem está diante do totem.
    await act(async () => {
      await new Promise((resolve) => window.setTimeout(resolve, 1_100));
    });

    expect(screen.queryByRole('heading', { name: 'Você ainda está aí?' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Locanda Experience' })).toBeVisible();
    expect(screen.queryByTestId('attract-mode')).not.toBeInTheDocument();
  });

  it('FORA DA HOME → aviso de inatividade → "Continuar navegando" mantém o contexto', async () => {
    const { user } = await enterFromAttract();

    await user.click(screen.getByRole('button', { name: /Comodidades/i }));
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Comodidades de nossos hóspedes' }),
    ).toBeVisible();

    const warning = await screen.findByRole('heading', { name: 'Você ainda está aí?' }, { timeout: 3000 });
    expect(warning).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Continuar navegando' }));

    expect(screen.queryByRole('heading', { name: 'Você ainda está aí?' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Comodidades de nossos hóspedes' })).toBeVisible();
  });
});
