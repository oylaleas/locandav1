# Pendências — Totem Locanda dei Venti

Status: **front-end completo e funcional**. Nada abaixo bloqueia a execução da aplicação;
todos os pontos têm placeholder claramente identificado ou abstração pronta para troca.

---

## 1. Depende de CONTEÚDO REAL da Locanda

| Item | Onde trocar | Situação |
| --- | --- | --- |
| Logotipo oficial (PNG, 4 variações) | `src/assets/brand/` + `BRAND_ASSETS` | **✅ Recebido e integrado** — lockup dourado/branco no `<Brandmark/>` (placa escura em fundos claros, direto no Attract), emblema nos ícones PWA. Vetor SVG original continua bem-vindo para nitidez máxima em telas grandes |
| Fotografias reais | `src/assets/images/` + `IMAGE_ASSETS` | **✅ 8 fotos recebidas (3f3fc2c) e integradas** — aéreas de drone, praia e foto institucional. Mapeamento foto→seção proposto e marcado `[MAPPING A CONFIRMAR]`; faltam fotos específicas de gastronomia e acomodações |
| Vídeo institucional e de experiências | `src/assets/videos/` + `VIDEO_ASSETS` | 3 clipes técnicos gerados apenas para validar o player |
| Legendas (.vtt) revisadas nos 3 idiomas | `public/captions/` | Placeholders `[LEGENDA A DEFINIR]` |
| Textos institucionais (todas as seções) | `src/data/content.ts` | `[CONTEÚDO A DEFINIR]` — **nada foi inventado** |
| Endereço, telefone, e-mail, site | `SITE_IDENTITY.contact` | `[CONTEÚDO A DEFINIR]` |
| Acomodações, gastronomia, comodidades, horários, preços | `CONTENT_SECTIONS` | `[CONTEÚDO A DEFINIR]` |
| Arquitetura de informação (6 seções propostas) | `CONTENT_SECTIONS` | **[A VALIDAR]** — estrutura é proposta, não especificação recebida |
| Descritor da marca (linha sob o nome) | `SITE_IDENTITY.descriptor` | `[DESCRITOR A DEFINIR]` |
| URLs de destino dos QR Codes | `QR_TARGETS` | `https://exemplo.invalid/...#URL-A-DEFINIR` (marcado na UI) |
| Tradução revisada EN/IT dos textos de conteúdo | `src/data/content.ts` | Placeholders traduzidos; UI já 100% traduzida |
| Tipografia institucional | `src/styles/tokens.css` → `--font-display` / `--font-body` | Stacks do sistema **[A VALIDAR]** |
| Paleta oficial | `src/styles/tokens.css` | Paleta neutra reversível **[A VALIDAR]** |

## 2. Depende do HARDWARE REAL

| Item | Onde | Observação |
| --- | --- | --- |
| Resolução/orientação do totem | `src/config/kiosk.ts` → `KIOSK_VIEWPORT` | Assumido 1080×1920 retrato **[VALIDAR NO HARDWARE REAL]** |
| Altura física / alcance do usuário | `KioskLayout` (barra de ações inferior) | Decisão ergonômica a confirmar in loco |
| Escala tipográfica (`--font-root`) | `src/styles/tokens.css` | Ajustar após teste de leitura à distância real |
| Autoplay de vídeo com áudio | `AttractMode` / `VideoPlayer` | Depende da política do navegador do kiosk; já há fallback |
| Suporte a `fullscreen`/`inert`/`webkit` | Navegador do totem | Player usa "tela cheia por CSS" para não depender da Fullscreen API |
| Modo quiosque do SO (sem barra de navegador) | Fora do escopo do front-end | A UI já evita URLs externas e overscroll |
| Brilho/reflexo e distância de leitura | Design tokens + alto contraste | Validar contraste no vidro real |
| Sensor/temporização operacional (90 s / 20 s / 15 min) | `src/config/kiosk.ts` | **[A VALIDAR]** com a operação da Locanda |

## 3. Depende de BACKEND / integração futura (fora do escopo atual)

Todos os pontos abaixo já possuem **abstração pronta** — a UI não muda quando forem integrados.

| Necessidade futura | Abstração existente hoje |
| --- | --- |
| CMS/API de conteúdo | `src/services/contentService.ts` (mesmas assinaturas, hoje lendo `src/data`) |
| Gestão de mídia remota | `src/data/media.ts` (registro central) + `SmartImage`/`VideoPlayer` por props |
| Telemetria/analytics real | `src/services/analytics.ts` + `setAnalyticsSink()` (sem envio hoje) |
| Links reais de handoff (site, reservas, contato) | `QR_TARGETS` (URL configurável por item) |
| Disponibilidade/reservas em tempo real | Não implementado — exigiria backend; nada foi simulado |
| Multi-idioma vindo do CMS | `src/data/locales/*` tipados por `Dictionary` |
| Atualização remota de conteúdo do totem | Service Worker já aplica updates ao voltar para o Attract Mode |

## 4. Decisões reversíveis tomadas para não bloquear o desenvolvimento — **[A VALIDAR]**

1. **6 seções institucionais** (A Locanda, Acomodações, Gastronomia, Experiências, Arredores,
   Como chegar) como esqueleto de IA.
2. **Idiomas**: pt-BR (padrão), EN, IT — com nomes por extenso, sem bandeiras.
3. **Barra de ações na base da tela** (Voltar · Início · Idioma · Acessibilidade).
4. **Controle de acessibilidade próprio** (tamanho de texto, alto contraste, reduzir animações)
   em vez de zoom por pinça, que fica desativado no kiosk.
5. **Tema claro** (ivory/areia) para reduzir reflexo em tela pública, com superfícies escuras
   apenas em mídia, Attract Mode e overlays.
6. **Vídeos fora do cache do Service Worker** por padrão (allowlist disponível no `sw.js`).
7. **Sem persistência entre sessões** — nada em localStorage/sessionStorage/IndexedDB.

## 5. Fora do escopo desta entrega (por decisão explícita do briefing)

- Backend, banco de dados, CMS, painel administrativo, autenticação.
- Testes E2E em navegador real (Playwright): o ambiente não permite baixar browsers.
  A cobertura equivalente dos fluxos críticos está em `src/app/flows.test.tsx`
  (attract → home → conteúdo → vídeo → QR → voltar → timeout → reset → attract).
- Geração de formatos modernos (AVIF/WebP) das fotos: será feita quando o material real
  chegar, no pipeline de build de imagens.
