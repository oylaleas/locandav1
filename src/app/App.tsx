import { HashRouter } from 'react-router-dom';
import { AppProviders } from './AppProviders';
import { AppShell } from './AppShell';

/**
 * O totem pode ser servido por hospedagens estáticas, WebViews e redes locais
 * sem regra de rewrite para SPA. HashRouter mantém a rota no fragmento e faz
 * refresh funcionar em qualquer uma delas (/#/home, /#/conteudos/...).
 */
export function App() {
  return (
    <HashRouter>
      <AppProviders>
        <AppShell />
      </AppProviders>
    </HashRouter>
  );
}
