import { screen, within, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AppShell } from '@/app/AppShell';
import { renderWithProviders } from '@/test/renderApp';

// Tap guard zerado para permitir cliques encadeados rápidos no seletor de
// idioma (mesma instância de botão) durante o teste.
vi.mock('@/config/kiosk', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/config/kiosk')>();
  return { ...original, TAP_GUARD_MS: 0 };
});

async function enterFromAttract() {
  // Sem tela inicial: o totem abre direto no menu (Home).
  const { user } = renderWithProviders(<AppShell />, '/home');
  await screen.findByRole('heading', { name: 'Locanda Experience' });
  return { user };
}

/** A região do hub (aria-labelledby="locanda-experience-titulo"). */
function hubRegion() {
  return screen.getByRole('region', { name: 'Locanda Experience' });
}

describe('hub Locanda Experience (6 categorias)', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/home');
  });

  it('HOME exibe o hub com as seis áreas principais', async () => {
    await enterFromAttract();

    expect(screen.getByRole('heading', { name: 'Locanda Experience' })).toBeVisible();
    const hub = hubRegion();
    expect(within(hub).getByRole('button', { name: /Comodidades/i })).toBeVisible();
    expect(within(hub).getByRole('button', { name: /Happy Hour/i })).toBeVisible();
    expect(within(hub).getByRole('button', { name: /Serviços On Demand/i })).toBeVisible();
    expect(within(hub).getByRole('button', { name: /Bem-estar/i })).toBeVisible();
    expect(within(hub).getByRole('button', { name: /Experiências e passeios/i })).toBeVisible();
    expect(within(hub).getByRole('button', { name: /Kite Center/i })).toBeVisible();
  });

  it('HOME → COMODIDADES → 12 itens + aviso de tarifas → VOLTAR', async () => {
    const { user } = await enterFromAttract();

    await user.click(within(hubRegion()).getByRole('button', { name: /Comodidades/i }));
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Comodidades de nossos hóspedes' }),
    ).toBeVisible();

    for (const item of [
      'Wi-Fi gratuito',
      'Estacionamento gratuito',
      'Bar & Restaurante',
      'Quadra de Beach Tennis',
      'Espaço Fitness',
      'Yoga e Funcional*',
      'Noites Cinemáticas',
      'Piquenique*',
      'Auxílio Beach Boy Gratuito',
      'Berço Gratuito',
      'Violão',
      'Desenhos para Colorir para Crianças',
    ]) {
      expect(screen.getByText(item)).toBeVisible();
    }

    // Aviso com o asterisco preservado nos itens.
    expect(screen.getByText(/alguns dos serviços descritos não são gratuitos/i)).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Voltar' }));
    expect(await screen.findByRole('heading', { name: 'Locanda Experience' })).toBeVisible();
  });

  it('HOME → HAPPY HOUR → horários pendentes explícitos (nada inventado) → VOLTAR', async () => {
    const { user } = await enterFromAttract();

    await user.click(within(hubRegion()).getByRole('button', { name: /Happy Hour/i }));
    expect(await screen.findByRole('heading', { level: 1, name: 'Happy Hour' })).toBeVisible();

    // Nenhum horário fictício: apenas o marcador interno de pendência.
    expect(screen.getAllByText('[HORÁRIO DO HAPPY HOUR A DEFINIR]').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/MENU DO HAPPY HOUR A DEFINIR/).length).toBeGreaterThan(0);

    await user.click(screen.getByRole('button', { name: 'Voltar' }));
    expect(await screen.findByRole('heading', { name: 'Locanda Experience' })).toBeVisible();
  });

  it('HOME → SERVIÇOS ON DEMAND → 7 itens + aviso de tarifa → VOLTAR', async () => {
    const { user } = await enterFromAttract();

    await user.click(within(hubRegion()).getByRole('button', { name: /Serviços On Demand/i }));
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Serviços On Demand' }),
    ).toBeVisible();

    for (const item of [
      'Decoração no Quarto',
      'Transfer',
      'Babá',
      'Cabeleireira',
      'Manicure',
      'Jantar Romântico',
      'Motorista Particular',
    ]) {
      expect(screen.getByText(item)).toBeVisible();
    }

    expect(screen.getByText(/tarifa definida pelo prestador de serviço/i)).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Voltar' }));
    expect(await screen.findByRole('heading', { name: 'Locanda Experience' })).toBeVisible();
  });

  it('HOME → KITE CENTER → conteúdo oficial parcial + pendência explícita → VOLTAR', async () => {
    const { user } = await enterFromAttract();

    await user.click(within(hubRegion()).getByRole('button', { name: /Kite Center/i }));
    expect(await screen.findByRole('heading', { level: 1, name: 'Kite Center' })).toBeVisible();

    // Conteúdo oficial já existente no projeto (site oficial).
    expect(screen.getAllByText(/Soulkite/i).length).toBeGreaterThan(0);
    // Pendência explícita — nada inventado (aparece no resumo e no corpo).
    expect(screen.getAllByText(/\[CONTEÚDO DO KITE CENTER A DEFINIR\]/i).length).toBeGreaterThan(0);

    await user.click(screen.getByRole('button', { name: 'Voltar' }));
    expect(await screen.findByRole('heading', { name: 'Locanda Experience' })).toBeVisible();
  });
});

describe('PT → EN', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/home');
  });

  it('a troca de idioma altera o hub e o conteúdo, não só os títulos', async () => {
    const { user } = await enterFromAttract();

    // Abre o seletor de idioma (botão com o shortLabel atual "PT").
    await user.click(screen.getByRole('button', { name: 'PT' }));
    const dialog = await screen.findByRole('dialog');
    await user.click(within(dialog).getByRole('button', { name: 'English' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());

    // Hub traduzido.
    const hub = hubRegion();
    expect(within(hub).getByRole('button', { name: /Amenities/i })).toBeVisible();
    expect(within(hub).getByRole('button', { name: /Services On Demand/i })).toBeVisible();
    expect(within(hub).getByRole('button', { name: /Kite Center/i })).toBeVisible();
    expect(within(hub).queryByRole('button', { name: /Comodidades/i })).not.toBeInTheDocument();

    // Conteúdo traduzido ao navegar.
    await user.click(within(hub).getByRole('button', { name: /Amenities/i }));
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Amenities for our guests' }),
    ).toBeVisible();
    expect(screen.getByText('Free Wi-Fi')).toBeVisible();
    expect(screen.getByText(/some of the services above are not free/i)).toBeVisible();
  });

  it('EN → PT restaura o idioma padrão', async () => {
    const { user } = await enterFromAttract();

    await user.click(screen.getByRole('button', { name: 'PT' }));
    let dialog = await screen.findByRole('dialog');
    await user.click(within(dialog).getByRole('button', { name: 'English' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(within(hubRegion()).getByRole('button', { name: /Amenities/i })).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'EN' }));
    dialog = await screen.findByRole('dialog');
    await user.click(within(dialog).getByRole('button', { name: 'Português' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());

    expect(within(hubRegion()).getByRole('button', { name: /Comodidades/i })).toBeVisible();
    expect(within(hubRegion()).queryByRole('button', { name: /Amenities/i })).not.toBeInTheDocument();
  });
});
