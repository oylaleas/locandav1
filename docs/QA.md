# QA — Totem Locanda dei Venti

Legenda: `[x]` verificado nesta entrega · `[~]` verificado por código/teste, requer confirmação
no hardware real · `[ ]` depende de material/hardware ainda não disponível.

## Funcionalidade / jornada (critério de pronto)

- [x] ATTRACT → toque → HOME (`flows.test.tsx`)
- [x] HOME → conteúdo → detalhe → VOLTAR → HOME
- [x] HOME → índice de conteúdos → detalhe
- [x] Detalhe → vídeo → fim do vídeo → QR → fechar → Início
- [x] HOME → galeria → VOLTAR → HOME (rota lazy)
- [x] Galeria → visualizador → próximo/anterior → fechar
- [x] Inatividade → aviso → sem resposta → reset → Attract
- [x] Aviso → "Continuar navegando" mantém a sessão
- [x] Rota inexistente → tela 404 com saída para a Home
- [x] Nenhuma tela sem saída (todas têm Voltar + Início na barra inferior)
- [x] Conteúdo institucional REAL (compilado do site oficial) — identidade, contato, acomodações, gastronomia, experiências, arredores, como chegar
- [x] QR Codes reais no handoff (site, WhatsApp, Instagram, reservas CloudBeds) — sem aviso de placeholder

## Vídeo

- [x] Attract Mode limpo sem fotos (decisão do responsável) — identidade + chamada de toque; mídia reativável via `FEATURE_FLAGS.attractUsesMedia`
- [x] Poster sempre presente (nunca área preta)
- [x] Play / Pause
- [x] Estado de áudio textual ("Sem som"/"Com som"), não só ícone
- [x] Mute/unmute com preferência global entre players
- [x] Legendas (toggle + faixa por idioma da interface)
- [x] Loading e buffering com contexto do vídeo mantido
- [x] Erro → poster + mensagem + "Tentar novamente" (+ fechar quando aplicável)
- [x] Offline → mensagem específica no lugar da mensagem genérica
- [x] Ended → "Reproduzir novamente" + ações (QR/fechar), sem autoplay do próximo
- [x] Replay e Close
- [x] Somente um player ativo por vez (teste automatizado)
- [x] Reset da sessão para o vídeo e restaura mute/legendas
- [x] `preload="none"` nos vídeos de conteúdo (`metadata` só no Attract)
- [~] Fullscreen (implementado por CSS, sem Fullscreen API) — validar no navegador do totem

## QR Code

- [x] Renderiza corretamente (SVG, geração sob demanda)
- [x] Quiet zone (margem 4 módulos) + fundo branco sólido
- [x] Contraste alto (tinta `#141b18` sobre branco)
- [x] Título + instrução + destino descrito em texto
- [x] Destino configurável por item (`QR_TARGETS`)
- [x] Painel fecha por botão, toque fora e Esc
- [x] Timeout não cria dead end (reset fecha o painel)
- [x] **URLs reais de produção** — site (locandadeiventi.com.br), WhatsApp (+55 88 99219-1175), Instagram (@locandadeiventi) e reservas CloudBeds
- [x] Sem aviso de placeholder quando `isPlaceholder: false` (teste atualizado)

## PWA

- [x] `manifest.webmanifest` (nome, ícones, display `fullscreen`, orientação, theme color)
- [x] Ícones 64/180/192/512 + maskable 512 (emblema oficial azul/dourado sobre fundo branco, fiel à logo)
- [x] Service Worker com políticas separadas (shell / estáticos / imagens / vídeos)
- [x] Fallback offline (`offline.html`)
- [x] Atualização aplicada apenas no Attract Mode
- [x] Registro somente em produção
- [x] Ícones definitivos com o logotipo oficial (emblema em `src/assets/brand/logo-1.png`)
- [~] Instalação/startup no dispositivo real

## Sessão

- [x] Timer único e centralizado (`SessionProvider`)
- [x] `INACTIVITY_TIMEOUT` e `WARNING_DURATION` centralizados em config
- [x] Aviso com contagem regressiva acessível (`role="timer"`/`status`)
- [x] Continuar / Encerrar agora
- [x] Mídia ativa suspende a inatividade, com teto absoluto de sessão
- [x] `resetSession()`: mídia, áudio, modais, galerias, idioma, acessibilidade, navegação
- [x] Árvore remontada por `sessionId` (sem estado residual entre visitantes)
- [x] Zero persistência (localStorage/sessionStorage/IndexedDB)

## Acessibilidade

- [x] HTML semântico (`header`/`main`/`nav`/`article`/`section`/`dl`/`blockquote`)
- [x] Um `h1` por tela e hierarquia de títulos consistente
- [x] Foco visível (`:focus-visible`) e focus trap em overlays
- [x] Skip link para o conteúdo principal
- [x] Alvos de toque ≥ 72 px (`--size-touch-min`), separação generosa
- [x] Estados por texto + ícone (nunca só cor/ícone)
- [x] `prefers-reduced-motion` + controle manual de "reduzir animações"
- [x] Controle de tamanho de texto (100% / 115% / 132%) e alto contraste
- [x] Legendas preparadas e legíveis sobre vídeo claro/escuro (`::cue`)
- [x] Seletor de idioma por nome, com `lang` correto
- [x] Sem dependência de hover; sem ação exclusiva por gesto
- [~] Contraste medido em bancada — revalidar no vidro/brilho reais

## Touch

- [x] Card inteiro tocável, sem botões concorrentes dentro
- [x] Feedback de pressed (escala + cor) sem hover
- [x] Proteção contra toque repetido (`useTapGuard`, 400 ms)
- [x] `touch-action: manipulation` (sem delay de 300 ms / duplo-toque-zoom)
- [x] Scroll natural com `overscroll-behavior` contido
- [x] Swipe apenas como complemento na galeria
- [x] Seleção de texto desabilitada só em superfícies interativas

## Performance

- [x] Build de produção sem erros (`tsc -b` + `vite build`)
- [x] Code splitting por rota + chunks separados de React e Router
- [x] `qrcode` carregado sob demanda (import dinâmico)
- [x] Zero fontes remotas / zero requisições de terceiros
- [x] Lazy loading de imagens fora da dobra; `priority` nas críticas
- [x] Dimensões e `aspect-ratio` reservados (sem layout shift)
- [x] Thumbnails separados das imagens grandes
- [x] Vídeos nunca pré-carregados em bloco
- [x] Listeners de inatividade passivos e sem re-render
- [ ] Medição de LCP/INP/CLS no hardware real

## Bem-estar (Espaço Onoda)

- [x] HOME → Bem-estar → Espaço Onoda → serviços → detalhe → fechar (teste automatizado)
- [x] 8 serviços: Massagem Relaxante (55 min), Desportiva (55 min), Terapêutica (55 min), Ventosas, Acupuntura (50 min), Dry Needling, Quiropraxia, Wellness Day (1h30)
- [x] Wellness Day lista itens incluídos (escalda-pés + massagem relaxante corporal)
- [x] Detalhe em modal (não em tela dedicada) — fecha no session reset
- [x] Contato WhatsApp (+55 88 99630-9247) e Instagram (@espaco_onoda) por QR real (wa.me/instagram.com)
- [x] Totem nunca abre app externo — handoff via QR
- [x] Sem alegações médicas ou vínculo comercial inventado (texto neutro)
- [ ] Foto do Espaço Onoda (asset pendente)
- [ ] Tradução EN/IT dos serviços validada pelo responsável

## Experiências e passeios

- [x] HOME → Experiências e passeios → listagem → detalhe → voltar (teste automatizado)
- [x] Passeio Pôr do Sol — 15:30 às 18:30 · R$ 370 · roteiro completo (trilha do mangue, praias do Guajiru, farol, volta pelo rio, pôr do sol na Praia da Espraiada)
- [x] Moitas de Icaraí — Opção 1: 09:00–16:00 · R$ 800 · **com** passeio de barco (Rio Aracati Açu, Túnel do Amor, Ilha das Ostras, almoço) · buggy até 4 pessoas
- [x] Moitas de Icaraí — Opção 2: 09:00–14:30 · R$ 650 · **sem** passeio de barco
- [x] Diferenciação das opções por TEXTO explícito (nunca apenas por cor) + listas Inclui/Não inclui
- [x] Almofala, Ilha do Guajiru e Região — 09:00–13:30 · R$ 500 · roteiro com Porto dos Barcos, Praia da Tijuca, Almofala, Torrões, Guajiru, Farol, Volta do Rio
- [x] Valores exatos preservados (R$ 370 / 800 / 650 / 500) — sem "a partir de", taxas ou descontos
- [x] Sem CTA de compra/reserva (institucional)
- [x] Dados 100% centralizados em `src/data/tours.ts` (preço, horário, roteiro editáveis sem tocar na UI)
- [x] Estrutura reutilizável: `TourCard`, `TourOptionCard`, `TourDetailPage` (cobrem foto, roteiro, opções, galeria, vídeo via `VideoPlayer` quando existir)
- [x] Galeria integrada ao `GalleryViewer` existente; vídeo pronto para `VideoPlayer` quando fornecido
- [x] QR dos passeios NÃO exibido (sem destino real) — nada inventado
- [ ] Fotos/vídeo oficiais dos passeios (usando fotos reais da região provisoriamente)
- [ ] Grafia de locais validada (Guajiru/Icaraí/Aracati/Espraiada/Torrões/Batedeira)

## Hub Locanda Experience (menu principal)

- [x] HOME é hub com as 6 áreas: Comodidades · Happy Hour · Serviços On Demand · Bem-estar (SPA & Beleza) · Experiências e passeios (Passeios) · Kite Center
- [x] Cada categoria abre sua tela (TOQUE → CATEGORIA → CONTEÚDO); nada de conteúdo na Home
- [x] Comodidades: 12 itens + aviso com asteriscos preservados (Yoga e Funcional*, Piquenique*) — PT/EN/IT
- [x] Happy Hour: frase oficial com horários marcados `[HORÁRIO DO HAPPY HOUR A DEFINIR]` + ação do menu `[MENU DO HAPPY HOUR A DEFINIR]` — nada inventado
- [x] Serviços On Demand: 7 itens + aviso "tarifa definida pelo prestador" — PT/EN/IT
- [x] Kite Center: conteúdo oficial parcial (flat water, Soulkite, guarda de equipamentos) + `[CONTEÚDO DO KITE CENTER A DEFINIR]`
- [x] Seletor PT/EN altera hub E conteúdo (testado), não só títulos
- [x] Novas seções reutilizam ContentDetailPage/KioskLayout (Voltar + Início, timeout/reset herdados)
- [x] 7 testes automatizados do hub (navegação das 6 áreas, PT→EN e EN→PT)

## Identidade visual (cores da marca)

- [x] Paleta extraída das logos: azul `#065895` + dourado `#f1b100` em `src/styles/tokens.css`
- [x] Botões primários e títulos de destaque em azul da marca; accent/detalhes em dourado
- [x] Fundos inversos (placa da marca, QR, contato) em azul profundo `#042b47`
- [x] Attract Mode com gradiente azul profundo + brilho dourado; orbe de toque em dourado da marca
- [x] Home com rosa dos ventos dourada ao fundo da marca; ícones de cards em azul suave
- [x] Overlays de mídia (Modal dark, VideoPlayer) em azul profundo
- [x] offline.html na paleta da marca
- [x] Contraste verificado: botão azul+branco 7.4:1 · welcome 7.3:1 · accent dourado 5.3:1 · inverso 13:1 · dourado sobre azul profundo 7.7:1

## Direção de design — "Pousada dos Ventos"

- [x] **Assinatura (risco assumido)**: herói da Home é um HORIZONTE de pôr do sol sobre a baía — sol dourado (rosa dos ventos) nascendo recortado sobre o mar azul profundo, com o vento riscando a cena em linhas à deriva. As duas cores da marca viram elementos do lugar (o pôr do sol da Praia da Espraiada é produto real do totem)
- [x] Cards do hub com "tick" dourado no topo (marcador de instrumento de vento/água); risco dourado sob o título do hub (linha do horizonte)
- [x] **Tipografia de dados**: `--font-data` (mono) para horas, valores, contatos e rumos — leitura de instrumento náutico, coerente com destino de vento/água
- [x] Vento à deriva também no Attract Mode (coesão entre as duas telas de marca)
- [x] Uma única assinatura; o resto quieto e disciplinado; reduced motion neutraliza tudo

## Menu fullscreen (GSAP + SplitText — reconstrução profissional)

- [x] Menu FULLSCREEN premium reconstruído do zero (substituiu o antigo pill expandível — uma única implementação, sem código antigo coexistindo)
- [x] Timeline GSAP única pausada; abrir = `tl.play()`, fechar = `tl.reverse()` (sequência inversa elegante: links → painel → camadas)
- [x] Coreografia: hamburger→X → camadas de fundo `scaleY` (3 tons de azul da marca, stagger) → painel revela por `clip-path` → links primários sobem linha a linha (SplitText) → rodapé em mono
- [x] SplitText com máscara de linhas, criado UMA vez, recriado no resize sem acumular transforms; GSAP+SplitText em chunk lazy separado
- [x] Estado robusto: trava de cliques rápidos (`isAnimating`), fallback imediato se o GSAP ainda carrega (sem dead state), timeline nasce aberta se o toque veio antes
- [x] Fecha por: botão, `Esc` (devolve foco), clique em link, session reset; body scroll bloqueado enquanto aberto; pointer-events e z-index lógicos
- [x] Acessível: `aria-expanded`, `aria-controls`, `role="dialog"`, `aria-modal`, focus trap, `prefers-reduced-motion` → tudo instantâneo
- [x] Responsivo: links com `clamp()` (serif display), rodapé mono, 100dvh, sem overflow; mobile adaptado
- [x] 3 testes automatizados (abrir→navegar, Esc fecha, QR do WhatsApp)

## Qualidade de código

- [x] TypeScript strict sem `any`
- [x] ESLint (typescript-eslint + react-hooks) sem erros
- [x] 43 testes automatizados (24 anteriores + 9 bem-estar/passeios + 7 hub + 3 menu)
- [x] Sem `console` visível ao visitante (apenas `import.meta.env.DEV`)
