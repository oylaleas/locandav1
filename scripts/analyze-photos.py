#!/usr/bin/env python3
"""Curadoria técnica de fotografias para o totem Locanda dei Venti.

Classifica fotos em A–E por métricas objetivas, sem julgamento humano:

  A — HERO  : nítida (Laplaciano alto) + bem exposta + resolução alta
  B — FORTE : nítida e bem exposta (qualquer orientação)
  C — APOIO : boa, com leve desfoque ou exposição fora do ideal
  D — REPET : duplicata/semelhante a outra (hash perceptual) — mantém a melhor
  E — FRACA : desfocada ou mal exposta — não usar

Uso:  python3 scripts/analyze-photos.py <pasta> [--min-side 1200]
Saída: tabela de curadoria (stdout) + curadoria.csv na pasta.
"""
from __future__ import annotations

import argparse
import csv
import os
import sys
from pathlib import Path

try:
    from PIL import Image, ImageFilter, ImageStat, ImageOps
except ImportError:
    sys.exit("PIL não instalado. Rode: pip install pillow --break-system-packages")

GRADES = {
    "A": "HERO",
    "B": "FORTE",
    "C": "APOIO",
    "D": "REPET",
    "E": "FRACA",
}
EXT = {".jpg", ".jpeg", ".png", ".webp", ".heic", ".JPG", ".JPEG", ".PNG"}


def luminance(img: Image.Image) -> float:
    small = img.convert("RGB").resize((96, 96))
    stat = ImageStat.Stat(small)
    r, g, b = stat.mean
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def sharpness(img: Image.Image) -> float:
    gray = ImageOps.grayscale(img)
    lap = gray.filter(ImageFilter.FIND_EDGES)
    stat = ImageStat.Stat(lap)
    return stat.stddev[0]


def exposure_ok(lum: float) -> bool:
    # Luminância média razoável (0-255): nem estourada nem subexposta.
    return 40 <= lum <= 215


def perceptual_hash(img: Image.Image, size: int = 16) -> int:
    """Hash perceptual simples (aHash) para agrupar fotos quase idênticas."""
    gray = ImageOps.grayscale(img).resize((size, size), Image.LANCZOS)
    px = list(gray.getdata())
    avg = sum(px) / len(px)
    bits = 0
    for i, v in enumerate(px):
        if v >= avg:
            bits |= 1 << i
    return bits


def hamming(a: int, b: int) -> int:
    return bin(a ^ b).count("1")


def grade(sharp: float, lum: float, side: int) -> str:
    sharp_ok = sharp >= 10.0
    sharp_mid = sharp >= 5.0
    exp_ok = exposure_ok(lum)
    big = side >= 1400

    if sharp_ok and exp_ok and big:
        return "A"
    if sharp_ok and exp_ok:
        return "B"
    if sharp_mid and exp_ok:
        return "C"
    if not sharp_mid or not exp_ok:
        return "E"
    return "C"


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("folder", type=Path, help="pasta com as fotografias")
    parser.add_argument("--min-side", type=int, default=1200, help="lado mínimo (px) para considerar HERO")
    args = parser.parse_args()

    folder: Path = args.folder
    if not folder.is_dir():
        sys.exit(f"Pasta não encontrada: {folder}")

    files = sorted(p for p in folder.iterdir() if p.suffix in EXT)
    if not files:
        sys.exit("Nenhuma imagem encontrada na pasta.")

    rows: list[dict] = []
    hashes: list[tuple[int, str]] = []

    for path in files:
        try:
            with Image.open(path) as im:
                im.load()
                w, h = im.size
                orient = im.getexif().get(274, 1)
                # aplica orientação EXIF (fotos de celular)
                im = ImageOps.exif_transpose(im)
                sharp = sharpness(im)
                lum = luminance(im)
                phash = perceptual_hash(im)
                orientation = "paisagem" if w >= h else "retrato" if h > w else "quadrada"
                side = max(w, h)
                g = grade(sharp, lum, side)
                rows.append(
                    {
                        "arquivo": path.name,
                        "largura": w,
                        "altura": h,
                        "orientacao": orientation,
                        "exif": orient,
                        "nitidez": round(sharp, 1),
                        "luminancia": round(lum),
                        "lado": side,
                        "classe": g,
                        "funcao": GRADES[g],
                    }
                )
                hashes.append((phash, path.name))
        except Exception as exc:  # noqa: BLE001 — arquivo corrompido/desconhecido
            rows.append(
                {
                    "arquivo": path.name,
                    "largura": 0,
                    "altura": 0,
                    "orientacao": "-",
                    "exif": "-",
                    "nitidez": 0.0,
                    "luminancia": 0,
                    "lado": 0,
                    "classe": "E",
                    "funcao": "INVÁLIDO",
                }
            )
            print(f"  ⚠ {path.name}: não foi possível abrir ({exc})", file=sys.stderr)

    # Marca duplicatas (classe D): dentro de 6 bits de hamming, mantém a melhor.
    for i, (ha, name_a) in enumerate(hashes):
        if rows[i]["classe"] == "E":
            continue
        for j in range(i + 1, len(hashes)):
            if hamming(ha, hashes[j][0]) <= 6:
                a, b = rows[i], rows[j]
                if a["classe"] == "E" or b["classe"] == "E":
                    continue
                # mantém a melhor (comparação A>B>C>D>E)
                order = {"A": 0, "B": 1, "C": 2, "D": 3, "E": 4}
                worse = a if order[a["classe"]] > order[b["classe"]] else b
                worse["classe"] = "D"
                worse["funcao"] = "REPET — use " + (a["arquivo"] if worse is a else b["arquivo"])

    # Saída
    out_csv = folder / "curadoria.csv"
    with out_csv.open("w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)

    print(f"\n📋 Curadoria de {len(rows)} fotos → {out_csv.name}\n")
    header = f"{'ID':<3} {'ARQUIVO':<28} {'ORIENT':<9} {'LADO':<6} {'NIT':<5} {'LUM':<5} {'CLASSE':<7} FUNÇÃO"
    print(header)
    print("-" * len(header))
    for idx, row in enumerate(rows, 1):
        print(
            f"{idx:<3} {row['arquivo'][:28]:<28} {row['orientacao'][:9]:<9} "
            f"{row['lado']:<6} {row['nitidez']:<5} {row['luminancia']:<5} "
            f"{row['classe']:<7} {row['funcao']}"
        )

    counts = {c: sum(1 for r in rows if r["classe"] == c) for c in "ABCDE"}
    print("\nResumo:", ", ".join(f"{GRADES[c]}: {counts[c]}" for c in "ABCDE"))
    print("Sugestão de uso: A → Attract/Hero/Feature · B → capas/cards · "
          "C → galerias · D → descartar (repetição) · E → não usar")


if __name__ == "__main__":
    main()
