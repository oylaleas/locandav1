import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const srcPath = new URL('./src', import.meta.url).pathname;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': srcPath },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    // O totem/preview roda atrás de um proxy (ambiente de preview e, futuramente,
    // possivelmente um proxy local no hardware). Liberamos os hosts para não quebrar o preview.
    allowedHosts: true,
    strictPort: false,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: true,
  },
  build: {
    target: 'es2022',
    cssTarget: 'chrome110',
    sourcemap: false,
    // Mídia pesada nunca deve virar base64 inline.
    assetsInlineLimit: 2048,
    rollupOptions: {
      output: {
        // Separa runtime (raramente muda) de rotas/feature code — melhora o
        // reaproveitamento de cache do totem entre deploys.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('react-router') || id.includes('/@remix-run/')) return 'router';
          if (id.includes('/react-dom/') || id.includes('/react/') || id.includes('/scheduler/')) {
            return 'react';
          }
          return undefined;
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    include: ['src/**/*.test.{ts,tsx}'],
    restoreMocks: true,
  },
});
