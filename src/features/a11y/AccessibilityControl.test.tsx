import { screen, waitFor, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { AccessibilityControl } from '@/features/a11y/AccessibilityControl';
import { renderWithProviders } from '@/test/renderApp';

describe('escala da interface', () => {
  afterEach(() => {
    delete document.documentElement.dataset.interfaceScale;
    delete document.documentElement.dataset.textScale;
  });

  it('altera a escala estrutural sem recorrer ao zoom do navegador', async () => {
    const { user } = renderWithProviders(<AccessibilityControl />);

    await user.click(screen.getByRole('button', { name: 'Acessibilidade' }));
    const dialog = await screen.findByRole('dialog', { name: 'Acessibilidade' });

    await user.click(within(dialog).getByRole('button', { name: 'Compacta · 85%' }));
    await waitFor(() => {
      expect(document.documentElement.dataset.interfaceScale).toBe('compact');
    });

    await user.click(within(dialog).getByRole('button', { name: 'Ampliada · 115%' }));
    await waitFor(() => {
      expect(document.documentElement.dataset.interfaceScale).toBe('large');
    });
  });
});
