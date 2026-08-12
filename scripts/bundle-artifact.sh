#!/usr/bin/env bash
# ==========================================================================
# BUNDLE — gera o TOTEM como UM ÚNICO HTML autocontido (artifact)
# --------------------------------------------------------------------------
# Adaptação do bundle-artifact.sh do fluxo "Web Artifacts Builder" para o
# stack deste repo (npm + Vite + vite-plugin-singlefile em vez de
# pnpm + Parcel + html-inline — mesmo resultado, sem dependências novas
# de build além do plugin).
#
# Saída: bundle.html na raiz — pode ser aberto de qualquer lugar
# (file://, pen drive, e-mail), sem servidor. Usa HashRouter e não registra
# Service Worker (que exige http).
#
# Uso: bash scripts/bundle-artifact.sh
# ==========================================================================
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [ ! -f "package.json" ]; then
  echo "❌ package.json não encontrado. Rode da raiz do projeto."
  exit 1
fi

if [ ! -f "index.artifact.html" ]; then
  echo "❌ index.artifact.html não encontrado (entrada do artifact)."
  exit 1
fi

echo "📦 Empacotando a app em um único HTML (vite-plugin-singlefile)..."
npm run build:artifact

echo "🎯 Copiando para bundle.html..."
# Entrada do artifact (o dist também recebe public/ — ignorar offline.html).
HTML_OUT="dist-artifact/index.artifact.html"
if [ ! -f "$HTML_OUT" ]; then
  HTML_OUT="$(find dist-artifact -maxdepth 1 -name '*.html' ! -name 'offline.html' | head -1)"
fi
if [ -z "$HTML_OUT" ]; then
  echo "❌ Nenhum HTML gerado em dist-artifact/."
  exit 1
fi
cp "$HTML_OUT" bundle.html

SIZE=$(du -h bundle.html | cut -f1)
echo ""
echo "✅ Bundle completo!"
echo "📄 Saída: bundle.html ($SIZE)"
echo "   Abra em qualquer navegador — funciona offline, sem servidor."
