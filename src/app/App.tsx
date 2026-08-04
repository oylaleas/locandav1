import { BrowserRouter } from 'react-router-dom';
import { AppProviders } from './AppProviders';
import { AppShell } from './AppShell';

export function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <AppShell />
      </AppProviders>
    </BrowserRouter>
  );
}
