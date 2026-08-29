/* ==========================================================================
   SERVICE WORKER — TOTEM LOCANDA DEI VENTI
   --------------------------------------------------------------------------
   Escrito à mão (sem Workbox) para manter o bundle e as dependências enxutos
   e para tornar explícitas as políticas por categoria de asset.

   CATEGORIAS
     app shell (navegações)  → network-first, fallback: cache → offline.html
     estáticos (js/css)      → stale-while-revalidate
     imagens                 → cache-first com teto de entradas
     legendas (.vtt)         → stale-while-revalidate
     vídeos (.mp4/.webm)     → NÃO cacheados por padrão
         Motivo: vídeos são grandes, usam Range requests e podem estourar a
         cota do dispositivo. Se um vídeo curto precisar ficar offline,
         adicione a URL em VIDEO_PRECACHE_ALLOWLIST.
   ========================================================================== */

// v3 invalida o shell anterior para entregar escala da interface, espanhol e
// a política de inatividade silenciosa da Home em PWAs já instalados.
const VERSION = 'v3';
const SHELL_CACHE = `ldv-shell-${VERSION}`;
const STATIC_CACHE = `ldv-static-${VERSION}`;
const IMAGE_CACHE = `ldv-images-${VERSION}`;
const MEDIA_CACHE = `ldv-media-${VERSION}`;

const OFFLINE_URL = '/offline.html';
const SHELL_URLS = ['/', OFFLINE_URL, '/manifest.webmanifest', '/icons/icon-192.png'];

const IMAGE_CACHE_MAX_ENTRIES = 80;

/** URLs de vídeo autorizadas a ficarem em cache (deixe vazio por padrão). */
const VIDEO_PRECACHE_ALLOWLIST = [];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL_URLS))
      .catch(() => undefined),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key.startsWith('ldv-') && !key.endsWith(VERSION))
          .map((key) => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length <= maxEntries) return;
  await Promise.all(keys.slice(0, keys.length - maxEntries).map((key) => cache.delete(key)));
}

async function networkFirst(request) {
  const cache = await caches.open(SHELL_CACHE);
  try {
    const response = await fetch(request);
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;
    const offline = await cache.match(OFFLINE_URL);
    if (offline) return offline;
    throw error;
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response && response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => undefined);
  return cached || (await network) || fetch(request);
}

async function cacheFirst(request, cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response && response.ok) {
    await cache.put(request, response.clone());
    if (maxEntries) trimCache(cacheName, maxEntries);
  }
  return response;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Requisições parciais (Range) — típicas de vídeo — nunca passam pelo cache.
  if (request.headers.has('range')) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  const path = url.pathname;

  if (/\.(mp4|webm|m4v|mov)$/i.test(path)) {
    if (VIDEO_PRECACHE_ALLOWLIST.includes(path)) {
      event.respondWith(cacheFirst(request, MEDIA_CACHE));
    }
    return; // demais vídeos: direto da rede
  }

  if (/\.(png|jpe?g|webp|avif|gif|svg|ico)$/i.test(path)) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE, IMAGE_CACHE_MAX_ENTRIES));
    return;
  }

  if (/\.(js|css|woff2?|vtt|webmanifest|json)$/i.test(path)) {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
  }
});
