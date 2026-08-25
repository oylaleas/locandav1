# Pendências — Totem Locanda dei Venti

Status: **front-end completo e funcional**. Nada abaixo bloqueia a execução da aplicação;
todos os pontos têm placeholder claramente identificado ou abstração pronta para troca.

---

## 1. Depende de CONTEÚDO REAL da Locanda

| Item | Onde trocar | Situação |
| --- | --- | --- |
| Logotipo oficial (PNG, 4 variações) | `src/assets/brand/` + `BRAND_ASSETS` | **✅ Recebido e integrado** — lockup dourado/branco no `<Brandmark/>` (placa escura em fundos claros, direto no Attract), emblema nos ícones PWA. Vetor SVG original continua bem-vindo para nitidez máxima em telas grandes |
| Fotografias reais | `src/assets/images/` + `IMAGE_ASSETS` | **✅ 8 fotos integradas** — aéreas de drone, praia e foto institucional. **49 fotos novas aguardando envio** (anexos não persistem no sandbox; enviar via GitHub ou link) — curadoria definida em `docs/CURADORIA.md` + `scripts/analyze-photos.py` || Vídeo institucional e de experiências | `src/assets/videos/` + `VIDEO_ASSETS` | 3 clipes técnicos gerados apenas para validar o player |
| Legendas (.vtt) revisadas nos 3 idiomas | `public/captions/` | Placeholders `[LEGENDA A DEFINIR]` |
| Textos institucionais (todas as seções) | `src/data/content.ts` | **✅ Compilados do site oficial** (locandadeiventi.com.br) — Sobre, estrutura, acomodações (2 suítes Frente Mar), gastronomia (Chef Léo Parente, Nau Rooftop), experiências (esportes aquáticos, Isla Kite Center), arredores e como chegar |
| Endereço, telefone, e-mail, site | `SITE_IDENTITY.contact` | **✅ Reais** — Av. Costeira S/N, Ilha do Guajiru/CE; +55 88 99219-1175; locanda@locandadeiventi.com.br; locandadeiventi.com.br (`hasRealData: true`) |
| Acomodações — suítes Frente Jardim (detalhes) | `CONTENT_SECTIONS` | **Não publicados no site** — marcado `[A CONFIRMAR COM A GESTÃO]`; suítes Frente Mar (Superior/Inferior) completas |
| Arquitetura de informação (6 seções propostas) | `CONTENT_SECTIONS` | **[A VALIDAR]** — estrutura é proposta, não especificação recebida |
| Descritor da marca (linha sob o nome) | `SITE_IDENTITY.descriptor` | **✅ "Hotel na Ilha do Guajiru"** (factual) |
| URLs de destino dos QR Codes | `QR_TARGETS` | **✅ Reais** — site, WhatsApp (wa.me/55889921175), Instagram (@locandadeiventi) e reservas CloudBeds |
| Tradução revisada EN/IT dos textos de conteúdo | `src/data/content.ts` | Traduções feitas a partir do conteúdo oficial **[A VALIDAR PELO RESPONSÁVEL]** |
| Tipografia institucional | `src/styles/tokens.css` → `--font-display` / `--font-body` | Stacks do sistema **[A VALIDAR]** |
| Paleta oficial | `src/styles/tokens.css` | **✅ Integrada** — cores extraídas das logos: azul `#065895` (ações primárias, títulos, fundos inversos) e dourado `#f1b100` (accent, orbe do Attract, detalhes); contraste verificado (≥ 4.5:1) |

### 1a. BEM-ESTAR (Espaço Onoda) — recebido, pontos a validar

| Item | Onde trocar | Situação |
| --- | --- | --- |
| Serviços (8) e descrições | `src/data/wellness.ts` | **✅ Integrados** (Massagem Relaxante/Desportiva/Terapêutica, Ventosas, Acupuntura, Dry Needling, Quiropraxia, Wellness Day) |
| WhatsApp +55 (88) 99630-9247 | `WELLNESS_PARTNERS[0].contact` | **✅ Integrado** — QR real `wa.me/5588996309247` (derivado do número) |
| Instagram @espaco_onoda | `WELLNESS_PARTNERS[0].contact` | **✅ Integrado** — QR real `instagram.com/espaco_onoda` (derivado do handle) |
| Relação comercial Espaço Onoda × Locanda | `WELLNESS_PARTNERS[0].notes` | **[A VALIDAR]** — texto mantido neutro, sem vínculo inventado |
| Tradução EN/IT dos serviços | `src/data/wellness.ts` | **[TRADUÇÃO A VALIDAR PELO RESPONSÁVEL]** |
| Foto do Espaço Onoda | `tour.coverImageId` (ou imagem dedicada) | **[ASSET A DEFINIR]** — sem imagem por enquanto (sem inventar) |

### 1c. LOCANDA EXPERIENCE (hub) — implementado, pendências explícitas

| Item | Onde trocar | Situação |
| --- | --- | --- |
| Comodidades (12 itens + aviso `*`) | `src/data/content.ts` → `comodidades` | **✅ Integrado** — PT/EN/IT; asteriscos preservados em Yoga e Funcional* e Piquenique* |
| Serviços On Demand (6 itens + aviso) | `src/data/content.ts` → `servicos-on-demand` | **✅ Atualizado com a lista real recebida** — Transfer, Babá, Jantar Romântico, Piquenique, Serviços de beleza (manicure/cabeleireiro/maquiador), Eventos privativos; tarifas não inventadas |
| Happy Hour | `src/data/content.ts` → `happy-hour` | **✅ Conteúdo real recebido** — Sexta 18h–21h (Balde Heineken/Stella R$ 48) · Sábado 16h–20h (Caipirinha R$ 11, Espumante R$ 17, Bons Ventos R$ 20, Croquetes R$ 25, Toasts R$ 25) |
| Kite Center | `src/data/content.ts` → `kite-center` | **✅ Serviços e contatos integrados** — Isla Kite Center: aulas de Kitesurf/Wingfoil, aluguel, supervisão, downwinds e loja; QR reais para WhatsApp (+55 88 99987-7973) e Instagram (@islakitecenter) |
| Cardápio impresso/foto do Happy Hour | `src/data/content.ts` | **[MENU DO HAPPY HOUR A DEFINIR]** — os itens e preços já estão no totem; asset visual opcional |
| Horários do Happy Hour | `src/data/content.ts` | **✅ Sexta 18h–21h · Sábado 16h–20h** (recebidos) |
| Detalhes do Kite Center (horários/valores/instrutores) | `src/data/content.ts` | **[A VALIDAR]** — o visitante é direcionado pelos QR reais para confirmação e agendamento; a página não replica esses detalhes |

### 1b. EXPERIÊNCIAS E PASSEIOS — recebido, pontos a validar

| Item | Onde trocar | Situação |
| --- | --- | --- |
| Pôr do Sol (15:30–18:30 · R$ 370) | `src/data/tours.ts` | **✅ Integrado** |
| Moitas de Icaraí — Opção 1 (09:00–16:00 · R$ 800 · barco · buggy 4p) | `src/data/tours.ts` | **✅ Integrado** — Rio Aracati Açu, Túnel do Amor, Ilha das Ostras, parada para almoço |
| Moitas de Icaraí — Opção 2 (09:00–14:30 · R$ 650 · sem barco) | `src/data/tours.ts` | **✅ Integrado** — diferenciação explícita por texto |
| Almofala, Ilha do Guajiru e Região (09:00–13:30 · R$ 500) | `src/data/tours.ts` | **✅ Integrado** |
| Fotografias/vídeo oficiais dos passeios | `coverImageId`/`galleryImageIds`/`videoId` | **Usando fotos reais da região provisoriamente** — `[ASSET DO PASSEIO A DEFINIR]` |
| Grafia de locais (Guajiru, Icaraí, Aracati Mirim/Açu, Espraiada, Torrões, Batedeira) | `src/data/tours.ts` | **[VALIDAR GRAFIA]** — forma "Guajiru" adotada (original citava "Guagirú") |
| URLs de QR/contato dos passeios | `TourDetailPage` (não exibido sem destino real) | **[A DEFINIR]** — nenhum destino inventado |
| Tradução EN/IT dos roteiros | `src/data/tours.ts` | **[TRADUÇÃO A VALIDAR PELO RESPONSÁVEL]** |
| Capacidade da Opção 2 / ponto de encontro / operador | — | **Não informados — não inventados** |

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
