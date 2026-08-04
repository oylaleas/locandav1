# Locanda dei Venti — PWA do Totem Interativo

Front-end completo (kiosk-first, touch-first) do totem institucional da Locanda dei Venti.
**Somente front-end**: não há backend, banco de dados, CMS nem autenticação. Todo o conteúdo
vem de dados locais tipados, prontos para serem trocados por uma API/CMS no futuro.

---

## Executar

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script            | O que faz                                              |
| ----------------- | ------------------------------------------------------ |
| `npm run dev`     | Servidor de desenvolvimento (Vite)                      |
| `npm run build`   | Type-check (`tsc -b`) + build de produção em `dist/`    |
| `npm run preview` | Serve o build de produção (com Service Worker ativo)    |
| `npm test`        | Testes (Vitest + Testing Library)                       |
| `npm run lint`    | ESLint (TypeScript + regras de hooks)                   |

> O Service Worker só é registrado em **produção** (`npm run build && npm run preview`).

---

## Stack

React 19 · TypeScript (strict) · Vite 7 · CSS Modules + CSS custom properties · PWA
(manifest + Service Worker escrito à mão).

Dependências de runtime — apenas três, todas justificadas:

| Pacote             | Por quê                                                                     |
| ------------------ | --------------------------------------------------------------------------- |
| `react`/`react-dom`| Base da aplicação                                                            |
| `react-router-dom` | Rotas reais (`/home`, `/conteudos/:slug`, `/galeria`, `/bem-estar`, `/experiencias-e-passeios`) e handoff para mobile |
| `qrcode`           | Codificação QR (Reed-Solomon/máscaras) — carregada sob demanda (import dinâmico) |

Nada de biblioteca de estado global, UI kit, ícones externos ou fontes remotas
(as fontes são stacks do sistema, o que garante funcionamento 100% offline).

---

## Estrutura

```
public/            manifest, Service Worker, offline.html, ícones, legendas .vtt
src/
  app/             App, AppShell (rotas + attract + timeout), providers, navegação, ErrorBoundary
  components/      ui/ (Button, Modal, SmartImage, Icon, Badge, Spinner)
                   layout/ (KioskLayout, Brandmark)
                   cards/ (ContentCard, ActionCard)
                   states/ (Loading, Error, Empty)
  config/kiosk.ts  ⬅ TODOS os tempos, limites e flags do totem
  data/            content.ts (conteúdo institucional), media.ts (registro de assets),
                   wellness.ts (Espaço Onoda), tours.ts (passeios), locales/
  components/      ui/ · layout/ · cards/ · states/
                   tours/ (TourCard, TourOptionCard) · wellness/ (ServiceCard)
  features/        attract · gallery · media (player) · qr · session · i18n · a11y · connectivity
                   wellness/ (ServiceDetailModal)
  pages/           Home, Conteúdos, Bem-estar, Espaço Onoda, Experiências e passeios,
                   Detalhe do passeio, Galeria, 404
  services/        contentService, wellnessService, toursService, qrService, analytics, serviceWorker
  styles/          tokens.css (design system), base.css
  types/           content, wellness, tours, media, i18n, session, analytics
```

Regras de organização:

- **UI nunca importa dados diretamente** — sempre via `services/contentService.ts`.
- **Nenhum caminho de mídia solto** — tudo em `src/data/media.ts`.
- **Nenhum timer espalhado** — inatividade é centralizada em `SessionProvider`.
- **Nenhum valor mágico de estilo** — tudo em `src/styles/tokens.css`.

---

## Jornada implementada

```
ATTRACT ──toque──▶ HOME ──▶ CONTEÚDOS ──▶ DETALHE ──▶ FOTOS / VÍDEO / QR
   ▲                                                        │
   └──── RESET (inatividade, "encerrar" ou Início) ◀────────┘
```

Áreas adicionais (mesma árvore de sessão, inatividade e reset):

```
HOME
├── BEM-ESTAR ──▶ ESPAÇO ONODA ──▶ SERVIÇOS ──▶ DETALHE (modal) ──▶ CONTATO QR
└── EXPERIÊNCIAS E PASSEIOS ──▶ LISTAGEM ──▶ DETALHE
                                    ├── Passeio Pôr do Sol
                                    ├── Moitas de Icaraí (Opção 1 — com barco / Opção 2 — sem barco)
                                    └── Almofala, Ilha do Guajiru e Região
```

- **Attract Mode**: vídeo (muted/loop/playsInline/poster) com fallback automático para
  carrossel de fotografias; a camada de toque cobre a tela inteira e **nunca** depende da mídia.
- **Inatividade**: `90 s` → aviso com contagem de `20 s` → reset. Vídeo em reprodução suspende
  o contador (com teto absoluto de sessão de `15 min`). Valores em `src/config/kiosk.ts`.
- **`resetSession()`**: para vídeos, restaura mute/legendas, fecha modais e galerias, volta o
  idioma e a acessibilidade ao padrão, limpa a navegação e remonta a árvore da aplicação.
- **Privacidade**: nada do visitante é gravado em `localStorage`/`sessionStorage`/IndexedDB.

---

## Substituir os assets placeholder pelo material real

A **logotipia oficial já foi integrada** (4 variações em `src/assets/brand/`:
lockup dourado/branco, lockup monocromático branco, emblema azul/dourado e um
export menor do lockup). O `<Brandmark/>` exibe o lockup sobre a placa escura
em superfícies claras e direto no Attract Mode; os ícones PWA/favicon foram
regenerados a partir do emblema.

As **fotografias reais** (recebidas em `3f3fc2c`) também foram integradas:
8 fotos (aéreas de drone, praia e foto institucional) redimensionadas para o
kiosk em `src/assets/images/` (+ `thumbs/`), registradas em `IMAGE_ASSETS`
com `isPlaceholder: false`. O mapeamento foto→seção é uma proposta
`[MAPPING A CONFIRMAR]` — veja `src/data/media.ts`.

Ainda **placeholder** — para trocar:

1. **Vídeos** → substitua em `src/assets/videos/`, atualize `VIDEO_ASSETS` e as legendas em
   `public/captions/`.
2. **Textos** → `src/data/content.ts` (todos os campos com `[CONTEÚDO A DEFINIR]`).
3. **URLs de QR** → `QR_TARGETS` em `src/data/content.ts` (`isPlaceholder: false`).
4. Depois de trocar tudo, desligue os selos em `FEATURE_FLAGS.showPlaceholderBadges` e
   `showPendingContentBadges` (`src/config/kiosk.ts`).

---

## PWA / cache

| Categoria         | Política                                                   |
| ----------------- | ---------------------------------------------------------- |
| App shell (HTML)  | network-first → cache → `offline.html`                     |
| JS/CSS/VTT        | stale-while-revalidate                                     |
| Imagens           | cache-first (teto de 80 entradas)                          |
| **Vídeos**        | **sem cache** (Range requests + risco de estourar a cota)  |

Atualizações do Service Worker são aplicadas **somente quando o totem volta ao Attract Mode** —
nunca no meio de uma visita.

---

## Documentos

- `docs/PENDENCIAS.md` — o que depende de conteúdo real, hardware e backend futuro.
- `docs/QA.md` — checklists de QA (vídeo, QR, PWA, sessão, acessibilidade, touch, performance).
