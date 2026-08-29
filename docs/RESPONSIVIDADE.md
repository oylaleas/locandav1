# Auditoria de responsividade — PWA do Totem

Data da auditoria: 25/08/2026

## Escopo e método

Esta revisão foi feita sobre a versão atual do PWA, com foco em operação
**touch-first** de um totem, mas preservando um fallback utilizável em browser,
PWA instalado, portrait e landscape.

Foram inspecionados o app shell, páginas, CSS Modules, componentes reutilizáveis,
modais, menu fullscreen, players, carrosséis, manifest, Service Worker, viewport,
safe areas e scripts de build/qualidade. A validação automatizada foi executada
com TypeScript, build de produção, ESLint e Vitest.

> **Limite importante:** não há navegador gráfico/automação de screenshots nem
> hardware de totem disponível neste ambiente. As conclusões sobre dimensões são
> baseadas na implementação, nos limites fluidos e na matriz de cenários abaixo;
> elas não substituem a validação visual no painel final.

## Arquitetura observada

| Área | Implementação |
| --- | --- |
| Framework | React 19 + TypeScript estrito |
| Build/PWA | Vite 7, manifest manual e Service Worker manual |
| Roteamento | React Router 7 |
| Estilos | CSS Modules + tokens CSS globais (`src/styles/tokens.css`) |
| Estado de sessão | Providers locais para idioma, acessibilidade, mídia e inatividade |
| Componentes principais | `KioskLayout`, `Button`, `Modal`, cards, carrosséis, player, QR handoff |
| Orientação instalada | `landscape` no manifest (prioridade operacional do totem) |
| Container queries | Avaliadas; não necessárias nesta etapa, pois os componentes críticos já conhecem a região de layout e refluem por largura/altura do viewport |

O manifest passa a priorizar landscape para que a instalação PWA do tablet não
trave a experiência em retrato. As correções mantêm um fallback responsivo em
portrait quando o app é aberto em browser, WebView ou preview.

## Problemas encontrados e priorização

### P0 — críticos

Nenhum bloqueio de build, TypeScript ou fluxo automatizado foi encontrado na
baseline auditada.

### P1 — alto impacto

| Problema | Causa | Impacto | Correção |
| --- | --- | --- | --- |
| Viewport podia depender de `height: 100%` | App shell não usava unidade dinâmica centralizada | Área útil errada com browser chrome/standalone | Shell, root e overlays passam a usar `100dvh` com fallback para `100vh` |
| Home podia exigir scroll excessivo em telas estreitas ou landscape baixo | Vídeo vertical decorativo permanecia na composição antes dos cards | Destinos interativos eram empurrados abaixo da dobra | Em landscape baixo o vídeo vertical é mantido em 9:16 com altura compacta, sem barras laterais; em portrait estreito o hub segue prioritário |
| Barra de ações inferior podia reflowar sem previsibilidade | Flex sem trilhas e grupos sem `min-width: 0` | Risco de botões cortados ou overflow em 320 px | Layout por grid, grupos refluíveis, controles utilitários compactos em telas estreitas |
| Carrosséis podiam propagar overflow para a página | Tracks flexíveis não declaravam `min-width: 0`; cards têm largura mínima | Possível scroll horizontal global e área de swipe ruim | Tracks isolam o scroll horizontal, usam `touch-action: pan-x pan-y` e responsividade própria |
| Modal usava `92vh` e não considerava as quatro safe areas | Altura estática e padding parcial | Conteúdo/rodapé podia ficar escondido em WebViews | Overlay e painel usam viewport dinâmico, safe areas laterais e rodapé adaptável |
| Rótulos longos podiam ser elipsados | Labels de botões usavam `nowrap` + `text-overflow` | Perda de significado em idiomas/textos grandes | Labels e títulos importantes quebram linha quando necessário |

### P2 — consistência e usabilidade

- Cards de conteúdo, serviço e opções de passeio receberam limites de largura e
  quebra de texto para evitar que nomes longos ampliem o layout.
- Cards horizontais passam para pilha em handoff estreito, evitando coluna de
  texto espremida ao lado de mídia.
- Menu fullscreen, player expandido e tela offline respeitam safe areas.
- Carrosséis respeitam a preferência de reduzir movimento também no
  `scrollBy()` programático.
- Títulos de cabeçalho deixam de depender de elipse para não ocultar o contexto
  da tela atual.

### P3 — qualidade de manutenção

- Corrigido o script `typecheck` para não sobrescrever `noEmit` dos tsconfigs.
- Corrigidos dois erros preexistentes do ESLint em helpers legados de carousel e toast.

## Alterações implementadas

### Viewport, safe areas e PWA

- Criado `--kiosk-viewport-height` com fallback `100vh` e valor moderno `100dvh`.
- Adicionados tokens para safe area esquerda/direita e insetos inline seguros.
- `html`, `body`, `#root` e `KioskLayout` agora usam o viewport dinâmico; a
  rolagem fica no `<main>` da tela, não no documento inteiro.
- A tela offline ganhou `100dvh`, `box-sizing: border-box`, safe areas e
  `touch-action: manipulation` no botão.
- O manifest e a estratégia do Service Worker foram preservados. Não houve
  mudança de política de cache ou de orientação instalada.

### Estrutura de layout

- `KioskLayout` foi reforçado como grid de três áreas: cabeçalho, conteúdo
  rolável e barra de ações. A barra nunca sobrepõe o conteúdo.
- A barra inferior usa duas trilhas em telas amplas e duas linhas centralizadas
  em handoff estreito.
- Em alturas baixas, cabeçalho e barra reduzem apenas o espaçamento vertical;
  os alvos de toque principais continuam confortáveis.

### Home e grids

- A Home mantém vídeo + grid em painéis amplos e em toda a composição landscape.
- Em `max-height: 52rem` com orientação landscape, o vídeo continua visível em
  9:16 e altura compacta, ao lado do grid 2 × 3, sem barras laterais azuis.
- Em portrait estreito, o vídeo vertical sai da primeira dobra para não criar
  múltiplas dobras de scroll; os destinos mantêm prioridade.
- Cards horizontais passam para pilha em `max-width: 34rem`.

### Touchscreen e carrosséis

- Tracks de passeios e serviços isolam o overflow horizontal, não deixam o
  conteúdo forçar a largura da página e mantêm `scroll-snap`.
- Setas declaram `aria-controls`; as regiões roláveis recebem nome acessível.
- O deslocamento deixa de ser suave quando a preferência de reduzir movimento
  está ativada.
- Em telas estreitas, setas e cards reduzem de forma controlada sem reduzir
  controles essenciais a tamanhos de mouse.

### Modais, mídia e tipografia

- Modais limitam sua altura pela área interna segura do viewport; o corpo mantém
  scroll próprio e o rodapé empilha ações quando necessário.
- Player expandido protege controles contra safe areas inferiores/laterais.
- Títulos, labels, valores e descrições usam `min-width: 0` e/ou
  `overflow-wrap` nos pontos em que texto dinâmico poderia romper cards.
- A escala tipográfica existente com `clamp()` foi preservada, pois já mantém
  raiz entre 16 px e 26 px sem depender de pixels físicos do painel.

### Escala e legibilidade da interface no PWA

- O painel **Acessibilidade** agora inclui `Compacta · 85%`, `Padrão · 100%`
  e `Ampliada · 115%`.
- O ajuste troca o tamanho base em `rem`; logo, cards, botões, espaçamentos,
  ícones e textos se recompõem pelo layout normal.
- Não há `zoom` de browser nem `transform: scale()`, evitando coordenadas de
  toque incorretas, corte de conteúdo e overflow.
- A escolha dura apenas a sessão atual e volta ao padrão no reset do totem.
- Textos de leitura, descrições e títulos receberam pesos mais fortes e maior
  contraste secundário; títulos e CTAs usam semibold, enquanto parágrafos usam
  medium para manter legibilidade sem transformar blocos longos em peso 700.

### Idioma espanhol e sessão de descanso

- Espanhol foi incluído no seletor de idiomas, com interface integralmente
  traduzida e fallback seguro em pt-BR para conteúdo editorial ainda não revisado.
- A Home faz reset silencioso por inatividade, pois já é a tela de descanso do
  totem; o aviso de reinício permanece nas telas internas, onde evita perda de
  contexto durante uma visita.

## Matriz de cenários revisada

A implementação foi analisada para as seguintes famílias de viewport:

| Família | Exemplos | Estratégia aplicada |
| --- | --- | --- |
| Handoff estreito | 320×568, 360×640, 390×844, 414×896 | Barra em duas linhas, utilidades compactas, cards em pilha, modal adaptável |
| Tablet/portrait (fallback) | 600×800, 768×1024, 800×1280, 1080×1920, 1200×1920 | Grid fluido e conteúdo rolável; não é a orientação operacional prioritária |
| Landscape prioritário | 1024×600, 1024×768, 1280×720, 1280×800, 1366×768 | Vídeo vertical 9:16 mantido sem barras laterais, ao lado do grid 2×3; espaçamentos verticais reduzidos |
| Desktop amplo | 1440×900, 1600×900, 1920×1080, 1920×1200 | Vídeo + grid, largura máxima de leitura e cards preservada |
| Painéis grandes | 2160×1920, 2160×3840 | Tokens fluidos com limite superior, grids com `minmax`, sem dependência de pixel físico |

## Componentes auditados

| Componente/área | Situação após a revisão | Risco residual |
| --- | --- | --- |
| `KioskLayout` | Viewport dinâmico, ação inferior responsiva, safe areas | Validar alcance físico no totem real |
| `Modal` / QR / timeout | Altura segura, scroll interno e rodapé adaptável | Validar com acessibilidade XL em hardware real |
| Home | Vídeo priorizado em landscape e grid preservado; portrait estreito prioriza navegação | Validar a reprodução do Vimeo no navegador real do tablet |
| Carrosséis | Swipe isolado, setas acessíveis, reduced motion | Validar sensibilidade de swipe no painel final |
| Menu fullscreen | Safe areas, lista rolável, quebra de títulos | Validar animação GSAP em GPU do totem |
| Player | Controles seguros no fullscreen e reflow em mobile | Vídeos reais ainda dependem de material/codec final |
| Cards e opções | Quebra de texto, `min-width: 0`, stack em espaço estreito | Revisar conteúdo real muito longo quando disponível |
| Inputs/formulários | Não há formulários de entrada no fluxo atual; somente range do player | Teclado virtual não é aplicável hoje |

## Arquivos principais alterados

- `src/styles/tokens.css`, `src/styles/base.css` e `src/app/AppShell.module.css`
  — viewport dinâmico, safe areas e raiz do app.
- `src/components/layout/KioskLayout.*`, `src/components/ui/Button.module.css` e
  `src/components/ui/Modal.module.css` — estrutura de tela, área de ações,
  labels e modais.
- `src/features/a11y/*`, `src/features/i18n/*`, `src/data/locales/*` e
  `src/features/session/SessionProvider.tsx` — escala estrutural, espanhol e
  política de inatividade por contexto.
- `src/pages/HomePage.*`, `src/pages/ToursIndexPage.*` e
  `src/pages/WellnessPartnerPage.*` — reflow por largura/altura e carrosséis.
- `src/pages/ContentDetailPage.module.css`, `src/pages/TourDetailPage.module.css`
  e CSS dos cards — conteúdo longo, cards e safe areas.
- `src/features/navigation/FullScreenMenu.css`,
  `src/features/media/VideoPlayer.module.css`, `src/components/ui/SmartImage.*`
  e `public/offline.html` — overlays, mídia e fallback PWA.
- `vite.config.ts`, `vite.artifact.config.ts`, `index*.html`, `public/sw.js`,
  `vercel.json`, `src/app/App.tsx` e `package.json` — baseline Android/Chromium
  antigo, bundle legacy, HashRouter e atualização do app shell.
- `carousel.tsx` e `use-toast.ts` — qualidade de lint.
- `docs/RESPONSIVIDADE.md` — este relatório.

## Validação executada

- `npm run build` — aprovado (`tsc -b` + Vite build).
- `npm run typecheck` — aprovado.
- `npm run lint` — aprovado.
- `npx vitest run --maxWorkers=1 --minWorkers=1` — aprovado (40 testes).
- Revisão estática de todas as regras de `@media`, `position: fixed/absolute`,
  `overflow`, `vh/vw`, safe areas, modais e carrosséis.

## Compatibilidade adicional — Multilaser M7 3G Plus

Além da responsividade, foi incluído um caminho de compatibilidade para tablets
Android Go/Chromium antigos:

- build moderno com baseline de Chromium 64 e CSS direcionado a Chrome 64;
- `@vitejs/plugin-legacy` gera um bundle `nomodule` com polyfills para WebViews
  ainda mais antigos (Chrome 49 / Android 4.4+);
- fallback visual orienta a atualizar o navegador se nem o bundle legacy puder
  iniciar;
- imagens e player têm fallback de proporção quando `aspect-ratio` não existe;
- o iframe ambiental do Vimeo é priorizado em orientação landscape; em portrait
  compacto ele não é montado para preservar a navegação acima da dobra;
- o Service Worker foi versionado para `v2`, forçando a renovação do app shell
  em instalações existentes.

> Ainda é necessário confirmar no próprio aparelho se ele usa Chrome,
> Android System WebView ou o navegador legado do fabricante, e registrar a
> versão exibida em `chrome://version` / configurações do navegador.

## Riscos residuais e recomendações

1. **Hardware real:** testar leitura, tamanho físico de toque, brilho/reflexo e
   alcance em landscape, especialmente no M7 3G Plus (1024×600) e em 1920×1080.
2. **Viewport real:** validar Chrome kiosk, Edge kiosk e WebView do fornecedor;
   este ambiente não oferece esses navegadores em modo gráfico.
3. **PWA instalado:** validar a atualização do Service Worker e as safe areas
   no SO efetivamente usado pelo totem.
4. **Conteúdo variável:** testar traduções finais e textos comerciais longos
   com a escala de texto XL ativada.
5. **Mídia:** testar os vídeos oficiais em rede lenta e o comportamento offline
   no dispositivo, pois os vídeos não são cacheados por decisão de capacidade.
