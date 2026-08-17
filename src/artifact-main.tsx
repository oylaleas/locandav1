/* ==========================================================================
   ENTRADA DO ARTIFACT (arquivo único autocontido)
   --------------------------------------------------------------------------
   Mesma aplicação do totem, com duas diferenças para funcionar como um
   único HTML (file://, sem servidor):

   1. HashRouter em vez de BrowserRouter — o arquivo pode ser aberto de
      qualquer lugar (file://, pen drive, e-mail) sem servidor;
   2. Sem registro de Service Worker (não existe em file://).

   Nada do build de produção (src/main.tsx + BrowserRouter + SW) muda.
   ========================================================================== */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { AppProviders } from '@/app/AppProviders';
import { AppShell } from '@/app/AppShell';
import '@/styles/tokens.css';
import '@/styles/base.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Elemento #root não encontrado no index.artifact.html.');
}

createRoot(container).render(
  <StrictMode>
    <HashRouter>
      <AppProviders>
        <AppShell />
      </AppProviders>
    </HashRouter>
  </StrictMode>,
);
