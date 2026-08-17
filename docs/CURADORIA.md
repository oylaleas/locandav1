# Curadoria Fotográfica — Totem Locanda dei Venti

> Framework de curadoria e organização das fotografias para o totem.
> **Status: aguardando o envio das 49 fotos** (anexos do chat não persistem
> no ambiente; o envio confirmado é via GitHub ou link público).

Este documento define o SISTEMA VISUAL da fotografia do totem — não uma
galeria genérica. Cada foto tem uma função; cada posição tem uma razão.

---

## 1. Onde as fotos vivem no totem (funções reais)

| Função | Onde | Tamanho/Formato | Importância |
| --- | --- | --- | --- |
| **HERO (entrada)** | Attract Mode (fundo) | fullscreen, cover, paisagem | Crítica — define o lugar |
| **HERO Home** | Horizonte da Home (foto de fundo) | faixa larga | Crítica |
| **Capas de seção** | ContentDetailPage (hero 16:9) | paisagem, 16:9 | Alta |
| **Cards do hub/índice** | ContentCard (thumb 4:3 / 1:1) | 4:3, 1:1 | Alta |
| **Covers de passeio** | TourCard / TourDetailPage (16:9) | paisagem, 16:9 | Alta |
| **Galeria principal** | GalleryPage (grid + viewer) | mista | Média/Alta |
| **Galeria de seção** | ContentDetailPage (grid) | 4:3 | Média |
| **Detalhes/fechos** | fim de páginas, seções curtas | variada | Média |

---

## 2. Classificação de qualidade (A–E)

| Classe | Critério | Uso no totem |
| --- | --- | --- |
| **A — Hero** | Nitidez alta, exposição perfeita, composição forte, ponto focal claro, alto impacto | Attract, hero da Home, covers, FEATURE |
| **B — Forte** | Muito boa, ótima composição; pequenos ajustes | Capas de seção, cards, destaques da galeria |
| **C — Apoio** | Boa; funciona no conjunto, não sozinha | Galerias, pares, trípticos |
| **D — Repetitiva** | Semelhante a outra (mesmo enquadramento/assunto) | Usar só a melhor do grupo; o resto descarta ou vira variação |
| **E — Fraca** | Desfoque, sub/sobreexposição, recorte ruim | **Não usar** (salvar apenas se única do assunto) |

> **Regra do projeto:** nunca inventar fotos nem buscar na internet. O que
> não passar na curadoria simplesmente não entra.

---

## 3. Narrativa (a história do lugar)

Sequência editorial proposta (começo → desenvolvimento → clímax → fecho):

```
IMPACTO (a baía — plano aéreo amplo)
↓
CONTEXTO (a Locanda — estrutura, piscina, jardim)
↓
DETALHE (arquitetura, materialidade, ambientes)
↓
VARIAÇÃO (experiências — kitesurf, SUP, vento, água)
↓
IMPACTO (pôr do sol sobre a baía — clímax)
↓
ENCERRAMENTO (céu/fim de tarde — respiro final)
```

A narrativa nasce do lugar real: baía flat water → kitesurf → pôr do sol
na Praia da Espraiada (produto do totem). Não force — se as fotos não
sustentarem uma etapa, o marco vira espaço de respiro.

---

## 4. Ritmo e hierarquia

- **Alternância de escala**: 1 full-width → 2 colunas → 1 destaque → 3
  colunas → 1 full-width de fecho.
- **Alternância de orientação**: paisagem ↔ retrato (sem forçar crop).
- **Contraste cromático**: quente (pôr do sol) ↔ frio (mar/azul) ↔ neutro
  (areia); evitar duas fotos de mesma cor em sequência.
- **Transições**: entre duas fotos muito diferentes, usar uma intermediária
  (ex.: arquitetura → detalhe → pessoa; nunca arquitetura → pessoa direto).

---

## 5. Grid editorial (implementação no totem)

Base atual: `GalleryGrid` (2/3 colunas, thumbs 4:3) + `GalleryViewer`.

Para as 49 fotos, o grid ganha **ritmo**:

| Bloco | Desktop | Mobile |
| --- | --- | --- |
| HERO | full-width (Attract/Home) | full-width |
| Destaque (Feature) | 1 card grande (2 colunas de largura) | 1 coluna |
| Par/Tríptico | 2–3 cards | 1 coluna (empilhado) |
| Galeria corrida | 3 colunas, thumbs 4:3 | 2 colunas |
| Fecho | full-width (pôr do sol) | full-width |

- Proporções preservadas por foto (`object-fit: cover` + `object-position`
  por imagem quando necessário).
- Gap consistente com o design system (`--space-sm/md`).

---

## 6. Tratamento de imagem (mínimo, consistente)

- **Nada de tratamento automático** que destrua a identidade.
- Correções só quando detectadas: exposição (±0.5 EV), temperatura
  (consistência de branco entre fotos do mesmo grupo), nitidez leve,
  crop apenas para enquadrar ponto focal (nunca cortar o assunto).
- **Pipeline de exportação** (igual ao das fotos atuais):
  - Full: máx. 1920px, JPEG q82, progressivo
  - Thumb: máx. 640px, JPEG q72
  - `dominantColor` calculado (anti layout-shift)

---

## 7. Performance e acessibilidade

- **Nunca preload das 49**: `priority` só no Attract, hero da Home e
  primeira capa visível; o resto lazy.
- Dimensões explícitas + `aspect-ratio` (sem CLS).
- `alt` descritivo por foto (PT/EN/IT), nunca `alt="photo"`; decorativas
  com `alt=""`.
- Nomes de arquivo semânticos (`locanda-piscina.jpg`, `kitesurf-baia.jpg`).

---

## 8. Mapeamento esperado por área (a preencher quando as fotos chegarem)

| Área | Quantidade alvo | Tipo de foto |
| --- | --- | --- |
| Attract + Home hero | 1–2 | A — baía/vista aérea ampla |
| A Locanda | 3–4 | Estrutura, piscina, jardim, fachada |
| Acomodações | 3–4 | Suítes, varanda, interior |
| Gastronomia | 3–4 | Restaurante, comida, bar, rooftop |
| Experiências | 3–4 | Kitesurf, SUP, água, vento |
| Arredores | 3–4 | Praia, dunas, rio, farol |
| Como chegar | 1–2 | Aérea/vista do entorno |
| Passeios (covers) | 3 | Pôr do sol, barco/ilha, trilha |
| Galeria principal | 8–12 | As melhores A/B em sequência editorial |

---

## 9. Ferramenta de análise (pronta)

`scripts/analyze-photos.py` — roda quando os arquivos chegarem:

1. Mede nitidez (variância do Laplaciano), exposição (luminância média),
   orientação e dimensões de cada foto;
2. Calcula hash perceptual (agrupa fotos quase idênticas → classe D);
3. Gera a classificação A–E preliminar (A = nítida + bem exposta + grande);
4. Emite a tabela de curadoria (Parte 1 do prompt) para revisão humana.

**Uso:** `python3 scripts/analyze-photos.py <pasta-com-as-fotos>`

---

## Próximo passo

Envie as fotos (GitHub: `Add file → Upload files` no repo, ou link público
Drive/Dropbox/WeTransfer). Assim que chegarem, eu:

1. Rodo o analisador técnico (seleção objetiva A/B);
2. Aplico a narrativa/ritmo deste documento;
3. Gero full + thumb otimizados e registro em `IMAGE_ASSETS`;
4. Apresento a **folha de contato final** com a seleção e a ordem proposta
   para sua aprovação ANTES de integrar.
