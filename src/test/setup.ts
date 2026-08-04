import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

/* --------------------------------------------------------------------------
   jsdom não implementa a API de mídia. Simulamos o mínimo necessário para
   testar COMPORTAMENTO OBSERVÁVEL do player (play → playing, ended, error).
   -------------------------------------------------------------------------- */
Object.defineProperty(window.HTMLMediaElement.prototype, 'play', {
  configurable: true,
  writable: true,
  value: vi.fn(function play(this: HTMLMediaElement) {
    this.dispatchEvent(new Event('play'));
    this.dispatchEvent(new Event('playing'));
    return Promise.resolve();
  }),
});

Object.defineProperty(window.HTMLMediaElement.prototype, 'pause', {
  configurable: true,
  writable: true,
  value: vi.fn(function pause(this: HTMLMediaElement) {
    this.dispatchEvent(new Event('pause'));
  }),
});

Object.defineProperty(window.HTMLMediaElement.prototype, 'load', {
  configurable: true,
  writable: true,
  value: vi.fn(),
});

if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
    }),
  });
}

if (!Element.prototype.scrollTo) {
  Element.prototype.scrollTo = () => undefined;
}

// Silencia apenas o aviso de act() de animações CSS irrelevantes nos testes.
window.scrollTo = () => undefined;
