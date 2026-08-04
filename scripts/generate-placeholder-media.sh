#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# GERADOR DE MÍDIA PLACEHOLDER — LOCANDA DEI VENTI (TOTEM)
# ---------------------------------------------------------------------------
# Este script NÃO faz parte do runtime da aplicação.
# Ele apenas (re)cria os arquivos de mídia PLACEHOLDER usados enquanto o
# material real (fotografias/vídeos da Locanda) não é fornecido.
#
# Requisitos: ffmpeg no PATH (ou variável FFMPEG apontando para o binário)
# Uso:        bash scripts/generate-placeholder-media.sh
#
# Ao receber o material real:
#   1. substitua os arquivos em src/assets/images e src/assets/videos
#   2. atualize src/data/media.ts (registro central de assets)
#   3. este script pode ser removido
# ---------------------------------------------------------------------------
set -euo pipefail

FFMPEG="${FFMPEG:-ffmpeg}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IMG="$ROOT/src/assets/images"
VID="$ROOT/src/assets/videos"
mkdir -p "$VID"

# Trilha de áudio ambiente sintética (ruído filtrado ~ "vento").
# Serve para validar os estados COM SOM / SEM SOM do player.
WIND_AUDIO='anoisesrc=color=brown:amplitude=0.6:r=44100'

echo "→ vídeo vertical do Attract Mode (720x1280)"
"$FFMPEG" -y -loglevel error \
  -loop 1 -i "$IMG/placeholder-attract.jpg" \
  -f lavfi -t 16 -i "$WIND_AUDIO" \
  -filter_complex "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='min(zoom+0.00035,1.14)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=480:s=720x1280:fps=30,fade=t=in:st=0:d=1.2,fade=t=out:st=14.8:d=1.2,format=yuv420p[v]; \
                   [1:a]lowpass=f=420,volume=0.22,afade=t=in:st=0:d=2,afade=t=out:st=14:d=2[a]" \
  -map "[v]" -map "[a]" -t 16 \
  -c:v libx264 -profile:v main -preset slow -crf 30 -pix_fmt yuv420p -movflags +faststart -g 60 \
  -c:a aac -b:a 64k -ar 44100 -ac 2 \
  "$VID/placeholder-attract.mp4"

echo "→ vídeo institucional horizontal (1280x720)"
"$FFMPEG" -y -loglevel error \
  -loop 1 -i "$IMG/placeholder-video-poster.jpg" \
  -f lavfi -t 14 -i "$WIND_AUDIO" \
  -filter_complex "[0:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0004,1.16)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=420:s=1280x720:fps=30,fade=t=in:st=0:d=1,fade=t=out:st=13:d=1,format=yuv420p[v]; \
                   [1:a]lowpass=f=380,volume=0.25,afade=t=in:st=0:d=1.5,afade=t=out:st=12.5:d=1.5[a]" \
  -map "[v]" -map "[a]" -t 14 \
  -c:v libx264 -profile:v main -preset slow -crf 30 -pix_fmt yuv420p -movflags +faststart -g 60 \
  -c:a aac -b:a 64k -ar 44100 -ac 2 \
  "$VID/placeholder-institucional.mp4"

echo "→ segundo vídeo de conteúdo (1280x720)"
"$FFMPEG" -y -loglevel error \
  -loop 1 -i "$IMG/placeholder-03.jpg" \
  -f lavfi -t 12 -i "$WIND_AUDIO" \
  -filter_complex "[0:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0005,1.18)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=360:s=1280x720:fps=30,fade=t=in:st=0:d=1,fade=t=out:st=11:d=1,format=yuv420p[v]; \
                   [1:a]lowpass=f=500,volume=0.2,afade=t=in:st=0:d=1.5,afade=t=out:st=10.5:d=1.5[a]" \
  -map "[v]" -map "[a]" -t 12 \
  -c:v libx264 -profile:v main -preset slow -crf 30 -pix_fmt yuv420p -movflags +faststart -g 60 \
  -c:a aac -b:a 64k -ar 44100 -ac 2 \
  "$VID/placeholder-experiencia.mp4"

echo "✓ mídia placeholder gerada em $VID"
ls -lh "$VID"
