import { screen, waitFor, within } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { AppShell } from '@/app/AppShell';
import { renderWithProviders } from '@/test/renderApp';

async function enterFromAttract() {
  const { user } = renderWithProviders(<AppShell />, '/home');
  const activate = await screen.findByTestId('attract-activate');
  await user.click(activate);
  await screen.findByRole('heading', { name: 'Bem-vindo' });
  return { user };
}

describe('menu lateral (side menu)', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/home');
  });

  it('abre o menu a partir de qualquer tela e navega para uma categoria', async () => {
    const { user } = await enterFromAttract();

    await user.click(screen.getByRole('button', { name: 'Abrir menu' }));

    const dialog = await screen.findByRole('dialog', { name: 'Navegação principal' });
    expect(within(dialog).getByRole('heading', { name: 'Navegação principal' })).toBeVisible();

    for (const label of [
      'Comodidades',
      'Happy Hour',
      'Serviços On Demand',
      'Bem-estar',
      'Experiências e passeios',
      'Kite Center',
    ]) {
      expect(within(dialog).getByRole('button', { name: new RegExp(label) })).toBeVisible();
    }

    await user.click(within(dialog).getByRole('button', { name: /Kite Center/ }));
    expect(await screen.findByRole('heading', { level: 1, name: 'Kite Center' })).toBeVisible();
    await waitMenuClosed();
  });

  it('fecha o menu com Esc e devolve o foco', async () => {
    const { user } = await enterFromAttract();

    await user.click(screen.getByRole('button', { name: 'Abrir menu' }));
    await screen.findByRole('dialog', { name: 'Navegação principal' });

    await user.keyboard('{Escape}');
    await waitMenuClosed();
    expect(screen.getByRole('button', { name: 'Abrir menu' })).toHaveFocus();
  });

  it('footer do menu abre o QR de WhatsApp (handoff para o smartphone)', async () => {
    const { user } = await enterFromAttract();

    await user.click(screen.getByRole('button', { name: 'Abrir menu' }));
    const dialog = await screen.findByRole('dialog', { name: 'Navegação principal' });

    await user.click(within(dialog).getByRole('button', { name: /WhatsApp/ }));

    const qrDialog = await screen.findByRole('dialog');
    expect(
      within(qrDialog).getByRole('img', { name: /WhatsApp — \+55 88 99219-1175/ }),
    ).toBeVisible();
  });
});

/** O menu volta ao estado fechado (painel deixa de ser um dialog acessível). */
async function waitMenuClosed() {
  await waitFor(() => {
    expect(screen.queryByRole('dialog', { name: 'Navegação principal' })).not.toBeInTheDocument();
  });
}
