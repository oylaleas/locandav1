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

A Home funciona como HUB "LOCANDA EXPERIENCE" com as seis áreas principais
(todas dentro da mesma árvore de sessão, inatividade e reset):

```
HOME (LOCANDA EXPERIENCE)
├── COMODIDADES ──▶ seção institucional (12 itens + aviso de tarifas)
├── HAPPY HOUR ──▶ seção institucional (horário/menu pendentes, nada inventado)
├── SERVIÇOS ON DEMAND ──▶ seção institucional (7 itens + aviso de tarifas)
├── BEM-ESTAR (SPA & BELEZA) ──▶ ESPAÇO ONODA ──▶ SERVIÇOS ──▶ DETALHE (modal) ──▶ CONTATO QR
├── EXPERIÊNCIAS E PASSEIOS ──▶ LISTAGEM ──▶ DETALHE
│                                ├── Passeio Pôr do Sol
│                                ├── Moitas de Icaraí (Opção 1 — com barco / Opção 2 — sem barco)
│                                └── Almofala, Ilha do Guajiru e Região
└── KITE CENTER ──▶ seção institucional (conteúdo oficial parcial + pendência explícita)
```

Todas as seções novas são data-driven em `src/data/content.ts` (PT/EN/IT) e
reutilizam `ContentDetailPage`, `KioskLayout`, QR, galeria e vídeo existentes.

- **Attract Mode**: composição limpa e sem fotografias — identidade oficial
  (logo branca + rosa dos ventos decorativa) sobre fundo escuro, com orbe de
  toque amplo e chamada "Toque na tela para começar". A camada de mídia
  (vídeo autoplay com poster / carrossel de fotos) segue preparada e é
  reativada por `FEATURE_FLAGS.attractUsesMedia` quando o material oficial
  chegar. A camada de toque cobre a tela inteira e **nunca** depende de mídia.
- **Inatividade**: `90 s` → aviso com contagem de `20 s` → reset. Vídeo em reprodução suspende
  o contador (com teto absoluto de sessão de `15 min`). Valores em `src/config/kiosk.ts`.
- **`resetSession()`**: para vídeos, restaura mute/legendas, fecha modais e galerias, volta o
  idioma e a acessibilidade ao padrão, limpa a navegação e remonta a árvore da aplicação.
- **Privacidade**: nada do visitante é gravado em `localStorage`/`sessionStorage`/IndexedDB.

---

## Substituir os assets placeholder pelo material real

A **logotipia oficial** e as **fotografias reais** já foram integradas
(4 variações em `src/assets/brand/` + 8 fotos em `src/assets/images/`).
Uso das logos: lockup colorido em superfícies claras (placa escura no
`<Brandmark/>`), lockup branco direto no Attract Mode, emblema nos ícones
PWA/favicon/offline. A única imagem criada além das oficiais é o gráfico
decorativo `WindRose` (rosa dos ventos inspirada na logo), usado como marca
d'água de interação — nunca como logotipo.
Os **textos institucionais**, **contatos**, **QR Codes** e **acomodações**
foram preenchidos com o conteúdo compilado do site oficial
(locandadeiventi.com.br) em `src/data/content.ts`:

- Identidade e contato reais (endereço, WhatsApp +55 88 99219-1175, e-mail,
  site) com `hasRealData: true`
- QR Codes reais: site, WhatsApp (`wa.me/55889921175`), Instagram
  (`@locandadeiventi`) e reservas CloudBeds (`hotels.cloudbeds.com/...`)
- 6 seções institucionais com texto verdadeiro (Sobre, Acomodações com as
  2 suítes Frente Mar detalhadas, Gastronomia com Chef Léo Parente e Nau
  Rooftop Lounge, Experiências com esportes aquáticos e Soulkite, Arredores
  e Como chegar)

Ainda **placeholder** — para trocar:

1. **Vídeos** → substitua em `src/assets/videos/`, atualize `VIDEO_ASSETS` e as legendas em
   `public/captions/`.
2. **Suítes Frente Jardim** → detalhes não publicados no site; aguardando a gestão
   (`[A CONFIRMAR]` em `src/data/content.ts`).
3. **Fotos oficiais de gastronomia/acomodações e dos passeios** → substituir as
   provisórias em `src/assets/images/` e `IMAGE_ASSETS`.

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
