import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { App } from '@/app/App';

describe('roteamento resiliente a refresh', () => {
  beforeEach(() => {
    // Simula a URL que permanece após recarregar uma tela interna em uma
    // hospedagem estática: o servidor recebe apenas / e a rota fica no hash.
    window.history.replaceState({}, '', '/#/conteudos/kite-center');
  });

  afterEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('restaura uma rota interna a partir do hash sem depender de rewrite do servidor', async () => {
    render(<App />);

    expect(await screen.findByRole('heading', { level: 1, name: 'Isla Kite Center' })).toBeVisible();
  });
});
