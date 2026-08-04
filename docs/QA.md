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

## Vídeo

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
- [x] URL placeholder claramente sinalizada na UI
- [ ] URL real de produção (pendente)

## PWA

- [x] `manifest.webmanifest` (nome, ícones, display `fullscreen`, orientação, theme color)
- [x] Ícones 64/180/192/512 + maskable 512 (regenerados a partir do emblema oficial azul/dourado)
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

## Qualidade de código

- [x] TypeScript strict sem `any`
- [x] ESLint (typescript-eslint + react-hooks) sem erros
- [x] 24 testes automatizados (fluxos, player, galeria, QR, sessão, offline, utils)
- [x] Sem `console` visível ao visitante (apenas `import.meta.env.DEV`)
