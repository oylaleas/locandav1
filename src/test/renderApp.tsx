import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AppProviders } from '@/app/AppProviders';

/** Renderiza um trecho da UI com todos os providers do totem. */
export function renderWithProviders(ui: ReactElement, initialPath = '/home') {
  const user = userEvent.setup();
  const result = render(
    <MemoryRouter initialEntries={[initialPath]}>
      <AppProviders>{ui}</AppProviders>
    </MemoryRouter>,
  );
  return { user, ...result };
}
