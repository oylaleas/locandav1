import { act, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { OfflineIndicator } from '@/features/connectivity/OfflineIndicator';
import { renderWithProviders } from '@/test/renderApp';

function setOnline(value: boolean) {
  Object.defineProperty(window.navigator, 'onLine', { configurable: true, value });
  act(() => {
    window.dispatchEvent(new Event(value ? 'online' : 'offline'));
  });
}

describe('estado offline', () => {
  afterEach(() => setOnline(true));

  it('sinaliza a ausência de conexão sem bloquear a aplicação', () => {
    renderWithProviders(<OfflineIndicator />);

    expect(screen.queryByText('Offline')).not.toBeInTheDocument();

    setOnline(false);
    expect(screen.getByText('Offline')).toBeVisible();

    setOnline(true);
    expect(screen.queryByText('Offline')).not.toBeInTheDocument();
  });
});
