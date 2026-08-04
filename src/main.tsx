import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/app/App';
import { registerServiceWorker } from '@/services/serviceWorker';
import '@/styles/tokens.css';
import '@/styles/base.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Elemento #root não encontrado no index.html.');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

registerServiceWorker();
