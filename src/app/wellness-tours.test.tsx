import { screen, within, waitFor } from '@testing-library/react';
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

describe('bem-estar (Espaço Onoda)', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/home');
  });

  it('HOME expõe o acesso a Bem-estar sem listar os serviços na Home', async () => {
    const { user } = await enterFromAttract();

    const wellnessCta = screen.getByRole('button', { name: /Bem-estar/i });
    expect(wellnessCta).toBeVisible();

    // Nada do conteúdo profundo na Home:
    expect(screen.queryByText('Massagem Relaxante')).not.toBeInTheDocument();

    await user.click(wellnessCta);
    expect(await screen.findByRole('heading', { level: 1, name: 'Bem-estar' })).toBeVisible();
  });

  it('BEM-ESTAR → ESPAÇO ONODA → listagem de serviços → detalhe → fechar', async () => {
    const { user } = await enterFromAttract();

    await user.click(screen.getByRole('button', { name: /Bem-estar/i }));
    await screen.findByRole('heading', { level: 1, name: 'Bem-estar' });

    await user.click(screen.getByRole('button', { name: /Espaço Onoda/i }));
    await screen.findByRole('heading', { level: 1, name: 'Espaço Onoda' });

    // Os 8 serviços estão listados como cards.
    expect(screen.getByRole('button', { name: /Massagem Relaxante/i })).toBeVisible();
    expect(screen.getByRole('button', { name: /Massagem Desportiva/i })).toBeVisible();
    expect(screen.getByRole('button', { name: /Massagem Terapêutica/i })).toBeVisible();
    expect(screen.getByRole('button', { name: /Ventosas/i })).toBeVisible();
    expect(screen.getByRole('button', { name: /Acupuntura/i })).toBeVisible();
    expect(screen.getByRole('button', { name: /Dry Needling/i })).toBeVisible();
    expect(screen.getByRole('button', { name: /Quiropraxia/i })).toBeVisible();
    expect(screen.getByRole('button', { name: /Wellness Day/i })).toBeVisible();

    // Detalhe do serviço em modal (não em tela dedicada).
    await user.click(screen.getByRole('button', { name: /Massagem Relaxante/i }));
    const dialog = await screen.findByRole('dialog');
    expect(within(dialog).getByText(/estresse diário/i)).toBeVisible();
    expect(within(dialog).getByText(/circulação sanguínea/i)).toBeVisible();

    await user.click(within(dialog).getAllByRole('button', { name: 'Fechar' })[0]);
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('Wellness Day exibe os itens incluídos (escalda-pés e massagem)', async () => {
    const { user } = await enterFromAttract();

    await user.click(screen.getByRole('button', { name: /Bem-estar/i }));
    await screen.findByRole('heading', { level: 1, name: 'Bem-estar' });
    await user.click(screen.getByRole('button', { name: /Espaço Onoda/i }));
    await screen.findByRole('heading', { level: 1, name: 'Espaço Onoda' });

    await user.click(screen.getByRole('button', { name: /Wellness Day/i }));
    const dialog = await screen.findByRole('dialog');
    expect(within(dialog).getByText('Escalda-pés')).toBeVisible();
    expect(within(dialog).getByText('Massagem relaxante corporal')).toBeVisible();
  });

  it('CONTATO → QR Code do WhatsApp → smartphone (destino real derivado)', async () => {
    const { user } = await enterFromAttract();

    await user.click(screen.getByRole('button', { name: /Bem-estar/i }));
    await screen.findByRole('heading', { level: 1, name: 'Bem-estar' });
    await user.click(screen.getByRole('button', { name: /Espaço Onoda/i }));
    await screen.findByRole('heading', { level: 1, name: 'Espaço Onoda' });

    await user.click(screen.getByRole('button', { name: 'WhatsApp' }));
    const dialog = await screen.findByRole('dialog');
    expect(within(dialog).getByRole('img', { name: /WhatsApp — \+55 \(88\) 99630-9247/ })).toBeVisible();
    expect(within(dialog).queryByText(/URL A DEFINIR/i)).not.toBeInTheDocument();
  });
});

describe('experiências e passeios', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/home');
  });

  it('HOME → EXPERIÊNCIAS → lista os três passeios', async () => {
    const { user } = await enterFromAttract();

    await user.click(screen.getByRole('button', { name: /Experiências e passeios/i }));
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Experiências e passeios' }),
    ).toBeVisible();

    expect(screen.getByRole('button', { name: /Passeio Pôr do Sol/i })).toBeVisible();
    expect(screen.getByRole('button', { name: /Moitas de Icaraí/i })).toBeVisible();
    expect(
      screen.getByRole('button', { name: /Almofala, Ilha do Guajiru e Região/i }),
    ).toBeVisible();
  });

  it('PASSEIO PÔR DO SOL → horário 15:30–18:30 e R$ 370', async () => {
    const { user } = await enterFromAttract();

    await user.click(screen.getByRole('button', { name: /Experiências e passeios/i }));
    await screen.findByRole('heading', { level: 1, name: 'Experiências e passeios' });

    await user.click(screen.getByRole('button', { name: /Passeio Pôr do Sol/i }));
    expect(await screen.findByRole('heading', { level: 1, name: 'Passeio Pôr do Sol' })).toBeVisible();

    expect(screen.getByText('15:30 às 18:30')).toBeVisible();
    expect(screen.getByText('R$ 370')).toBeVisible();
    // Aparece no resumo e no roteiro — o fato está preservado.
    expect(screen.getAllByText(/Praia da Espraiada/i).length).toBeGreaterThan(0);
  });

  it('MOITAS DE ICARAÍ → comparação clara entre Opção 1 (com barco) e Opção 2 (sem barco)', async () => {
    const { user } = await enterFromAttract();

    await user.click(screen.getByRole('button', { name: /Experiências e passeios/i }));
    await screen.findByRole('heading', { level: 1, name: 'Experiências e passeios' });

    await user.click(screen.getByRole('button', { name: /Moitas de Icaraí/i }));
    expect(await screen.findByRole('heading', { level: 1, name: 'Moitas de Icaraí' })).toBeVisible();

    // Diferenciação explícita por TEXTO (nunca apenas por cor).
    expect(screen.getByText('Opção 1 — Com passeio de barco')).toBeVisible();
    expect(screen.getByText('Opção 2 — Sem passeio de barco')).toBeVisible();

    // Horários e valores exatos.
    expect(screen.getByText('09:00 às 16:00')).toBeVisible();
    expect(screen.getByText('09:00 às 14:30')).toBeVisible();
    expect(screen.getByText('R$ 800')).toBeVisible();
    expect(screen.getByText('R$ 650')).toBeVisible();
    expect(screen.getByText('Buggy para até 4 pessoas.')).toBeVisible();

    // Detalhes factuais da Opção 1.
    expect(screen.getAllByText(/Rio Aracati Açu/i).length).toBeGreaterThan(0);
    expect(screen.getByText('Túnel do Amor')).toBeVisible();
    expect(screen.getByText('Ilha das Ostras')).toBeVisible();
    expect(screen.getByText('Parada para almoço')).toBeVisible();
    // A Opção 2 marca explicitamente o que não inclui.
    expect(screen.getByText('Não inclui: Passeio de barco')).toBeVisible();
  });

  it('ALMOFALA / ILHA DO GUAJIRU E REGIÃO → 09:00–13:30 e R$ 500', async () => {
    const { user } = await enterFromAttract();

    await user.click(screen.getByRole('button', { name: /Experiências e passeios/i }));
    await screen.findByRole('heading', { level: 1, name: 'Experiências e passeios' });

    await user.click(screen.getByRole('button', { name: /Almofala, Ilha do Guajiru e Região/i }));
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Almofala, Ilha do Guajiru e Região' }),
    ).toBeVisible();

    expect(screen.getByText('09:00 às 13:30')).toBeVisible();
    expect(screen.getByText('R$ 500')).toBeVisible();
    expect(screen.getByText('Volta do Rio')).toBeVisible();
  });

  it('detalhe do passeio → VOLTAR retorna à listagem', async () => {
    const { user } = await enterFromAttract();

    await user.click(screen.getByRole('button', { name: /Experiências e passeios/i }));
    await screen.findByRole('heading', { level: 1, name: 'Experiências e passeios' });

    await user.click(screen.getByRole('button', { name: /Passeio Pôr do Sol/i }));
    await screen.findByRole('heading', { level: 1, name: 'Passeio Pôr do Sol' });

    await user.click(screen.getByRole('button', { name: 'Voltar' }));
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Experiências e passeios' }),
    ).toBeVisible();
  });
});
