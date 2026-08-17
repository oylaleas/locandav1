/* ==========================================================================
   CONFIG DE BUILD DO ARTIFACT (arquivo único HTML)
   --------------------------------------------------------------------------
   Empacota a app inteira (JS, CSS e mídia em src/assets) em UM index.html
   autocontido, usando a entrada index.artifact.html (HashRouter, sem SW).

   Uso: npm run build:artifact  →  dist-artifact/index.html
        bash scripts/bundle-artifact.sh  →  bundle.html (cópia na raiz)
   ========================================================================== */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

const srcPath = new URL('./src', import.meta.url).pathname;

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  resolve: {
    alias: { '@': srcPath },
  },
  build: {
    target: 'es2022',
    cssTarget: 'chrome110',
    outDir: 'dist-artifact',
    sourcemap: false,
    // Apenas a entrada do artifact (não o PWA normal).
    rollupOptions: {
      input: 'index.artifact.html',
    },
  },
});
