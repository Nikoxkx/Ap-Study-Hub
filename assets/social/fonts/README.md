# Fonts for the generated images

`scripts/build-social-image.ts` draws the 1200×630 link preview with resvg, which
reads TrueType but **not** WOFF2. The website self-hosts variable WOFF2 faces in
`public/fonts/`; the files here are static, single-weight instances of those same
faces, produced with fontTools so the renderer can match `font-weight`:

| File | Source | Weight |
| :--- | :--- | :--- |
| `Newsreader-Bold.ttf` | `public/fonts/newsreader-latin-var.woff2` | 700 |
| `PublicSans-Regular.ttf` | `public/fonts/public-sans-latin-var.woff2` | 400 |
| `PublicSans-SemiBold.ttf` | `public/fonts/public-sans-latin-var.woff2` | 600 |
| `JetBrainsMono-Bold.ttf` | `public/fonts/jetbrains-mono-latin-var.woff2` | 700 |

`Kalam-Regular.ttf` lives one directory up in `assets/social/` and is an
unmodified TrueType download of the same OFL face.

To rebuild them (only needed if the site fonts change):

```bash
pip install fonttools brotli
python3 - <<'PY'
from fontTools.ttLib import TTFont
from fontTools.ttLib.woff2 import decompress
from fontTools.varLib.instancer import instantiateVariableFont

plan = [
    ("newsreader-latin-var", "Newsreader", "Bold", 700),
    ("public-sans-latin-var", "Public Sans", "Regular", 400),
    ("public-sans-latin-var", "Public Sans", "SemiBold", 600),
    ("jetbrains-mono-latin-var", "JetBrains Mono", "Bold", 700),
]
for src, family, style, weight in plan:
    decompress(f"public/fonts/{src}.woff2", "/tmp/font.ttf")
    font = instantiateVariableFont(TTFont("/tmp/font.ttf"), {"wght": weight})
    font.save(f"assets/social/fonts/{family.replace(' ', '')}-{style}.ttf")
PY
```

All four families are licensed under the SIL Open Font License 1.1; the license
texts ship alongside the web fonts in `public/fonts/LICENSE-*.txt`.
