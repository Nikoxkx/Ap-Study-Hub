#!/usr/bin/env python3
"""
Builds the repository social-preview card:

  public/github-banner.png  1280 × 640  GitHub → Settings → Social preview

The link preview (public/og-image.png) has its own generator,
`scripts/build-social-image.ts` (`pnpm build:social`), because it prints numbers
measured from the catalogue. This card is the shape GitHub asks for — 2:1, with
the headline, the painting, and the three claims that fit at thumbnail size.

It is composed from the real classroom painting in public/ and the real web fonts
in public/fonts (Newsreader, Public Sans, JetBrains Mono) — no AI imagery, so the
preview looks like the page it links to.

The fonts are shipped as woff2, which Pillow cannot open; this script converts
them with fontTools first. Requirement, once:

    pip install pillow fonttools brotli

Then, from the repository root:

    python3 scripts/social-image.py
"""

from __future__ import annotations

import io
import math
import os
import tempfile

from PIL import Image, ImageDraw, ImageFilter, ImageFont
from fontTools.ttLib import TTFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, "public")
FONTS = os.path.join(PUBLIC, "fonts")

INK = (247, 247, 247)
INK_SOFT = (216, 216, 216)
INK_FAINT = (168, 168, 168)
HIGHLIGHT = (255, 224, 138)  # --aps-highlight, the shipped day accent

SOURCE_IMAGE = os.path.join(PUBLIC, "bg-music-class.jpg")


def font(family: str, weight: int, size: int) -> ImageFont.FreeTypeFont:
    """A variable font at a chosen weight, converted from woff2 once per run."""
    cache = os.path.join(tempfile.gettempdir(), f"aps-{family}.ttf")
    if not os.path.exists(cache):
        source = TTFont(os.path.join(FONTS, family))
        source.flavor = None
        source.save(cache)
    loaded = ImageFont.truetype(cache, size)
    try:
        loaded.set_variation_by_axes([weight])
    except Exception:  # pragma: no cover - a static build has no axes
        pass
    return loaded


def cover(image: Image.Image, width: int, height: int) -> Image.Image:
    scale = max(width / image.width, height / image.height)
    resized = image.resize((math.ceil(image.width * scale), math.ceil(image.height * scale)), Image.LANCZOS)
    left = (resized.width - width) // 2
    top = (resized.height - height) // 3
    return resized.crop((left, top, left + width, top + height))


def rounded_mask(size: tuple[int, int], radius: int) -> Image.Image:
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size[0] - 1, size[1] - 1), radius=radius, fill=255)
    return mask


def draw_tracked(draw: ImageDraw.ImageDraw, xy, text, fnt, fill, tracking: float = 0.0):
    """Letter-spaced text — the site's mono eyebrows are widely tracked."""
    x, y = xy
    for char in text:
        draw.text((x, y), char, font=fnt, fill=fill)
        x += draw.textlength(char, font=fnt) + tracking
    return x


def soft_text(blob: Image.Image, position, text, fnt, fill, shadow=(0, 0, 0, 140), offset=2):
    """A one-pixel-offset shadow. Over a photo, white type needs the separation."""
    layer = Image.new("RGBA", blob.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.text((position[0] + offset, position[1] + offset), text, font=fnt, fill=shadow)
    layer = layer.filter(ImageFilter.GaussianBlur(1.2))
    blob.alpha_composite(layer)
    ImageDraw.Draw(blob).text(position, text, font=fnt, fill=fill)


def wrap(draw: ImageDraw.ImageDraw, text: str, fnt, max_width: int) -> list[str]:
    words = text.split()
    lines, current = [], ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if draw.textlength(candidate, font=fnt) <= max_width or not current:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def compose(width: int, height: int, *, scale: float = 1.0, with_url: bool = True) -> Image.Image:
    base = cover(Image.open(SOURCE_IMAGE).convert("RGB"), width, height)

    # The painting is warm and busy; a gentle desaturation and darkening keep
    # the type the subject of the picture instead of the classroom.
    grey = base.convert("L").convert("RGB")
    base = Image.blend(base, grey, 0.1)
    base = Image.eval(base, lambda channel: int(channel * 0.94))

    canvas = base.convert("RGBA")

    # Directional scrim so the left column is calm and the right keeps the room.
    scrim = Image.new("L", (width, 1))
    for x in range(width):
        t = x / width
        scrim.putpixel((x, 0), int(255 * max(0.0, 0.82 - 1.25 * max(0.0, t - 0.06))))
    scrim = scrim.resize((width, height))
    canvas.alpha_composite(Image.merge("RGBA", (Image.new("L", (width, height), 8),
                                                Image.new("L", (width, height), 8),
                                                Image.new("L", (width, height), 8),
                                                scrim)))

    # A glass card, built the way the page builds one: blurred copy of what is
    # behind it, a thin light border, a soft shadow.
    pad = int(56 * scale)
    card = (pad, int(64 * scale), int(width * 0.60), int(height - 152 * scale))
    card_size = (card[2] - card[0], card[3] - card[1])
    radius = int(22 * scale)

    blurred = canvas.filter(ImageFilter.GaussianBlur(int(16 * scale) or 1)).crop(card)
    tint = Image.new("RGBA", card_size, (16, 16, 16, 196))
    blurred = Image.alpha_composite(blurred, tint)

    shadow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle(
        (card[0] + 3, card[1] + 10, card[2] + 3, card[3] + 10), radius=radius, fill=(0, 0, 0, 120)
    )
    canvas.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(int(18 * scale) or 1)))

    mask = rounded_mask(card_size, radius)
    canvas.paste(blurred, card[:2], mask)
    border = ImageDraw.Draw(canvas)
    border.rounded_rectangle(card, radius=radius, outline=(255, 255, 255, 76), width=max(1, int(1.4 * scale)))

    draw = ImageDraw.Draw(canvas)

    inner_w_guess = card_size[0] - int(88 * scale)
    title_lines = ["Learn it properly.", "Remember it longer."]
    # Fit the headline to the card instead of trusting a number: the display
    # face at a fixed size clipped the second line on the 1200 px canvas.
    title_size = int(68 * scale)
    probe = ImageDraw.Draw(Image.new("RGBA", (10, 10)))
    while title_size > int(34 * scale):
        candidate = font("newsreader-latin-var.woff2", 620, title_size)
        if all(probe.textlength(line, font=candidate) <= inner_w_guess for line in title_lines):
            break
        title_size -= 2

    eyebrow = font("jetbrains-mono-latin-var.woff2", 500, int(15 * scale))
    display = font("newsreader-latin-var.woff2", 620, title_size)
    lede = font("public-sans-latin-var.woff2", 400, int(20 * scale))
    mono_small = font("jetbrains-mono-latin-var.woff2", 400, int(13 * scale))
    stats = font("public-sans-latin-var.woff2", 600, int(15 * scale))

    inner_x = card[0] + int(44 * scale)
    inner_w = card_size[0] - int(88 * scale)
    y = card[1] + int(42 * scale)

    draw.rounded_rectangle(
        (inner_x, y + int(3 * scale), inner_x + int(30 * scale), y + int(6 * scale)),
        radius=2,
        fill=HIGHLIGHT,
    )
    y += int(24 * scale)
    draw_tracked(draw, (inner_x, y), "AP STUDY HUB  ·  TEN SUBJECTS", eyebrow, HIGHLIGHT, tracking=2.6 * scale)
    y += int(44 * scale)

    line_step = int(title_size * 1.12)
    for line in title_lines:
        draw.text((inner_x, y), line, font=display, fill=INK)
        y += line_step

    y += int(14 * scale)
    for line in wrap(draw, "Seventy-five deep lessons, active recall, original practice, marked essays, timed papers and unit videos.", lede, inner_w):
        draw.text((inner_x, y), line, font=lede, fill=INK_SOFT)
        y += int(29 * scale)

    footer_y = card[3] - int(56 * scale)
    draw.text((inner_x, footer_y), "75 lessons · 568 cards · 447 questions · 10 subjects", font=stats, fill=INK)
    if with_url:
        draw_tracked(
            draw,
            (inner_x, footer_y + int(24 * scale)),
            "AP-STUDY-HUB-FIVE.VERCEL.APP",
            mono_small,
            INK_FAINT,
            tracking=1.6 * scale,
        )

    # The right side keeps the painting and one quiet line, so the thumbnail is
    # not a wall of text at 200 pixels wide.
    if width > 1100:
        right = font("newsreader-latin-var.woff2", 420, int(26 * scale))
        for index, line in enumerate(["Free.", "Private.", "No account needed."]):
            soft_text(
                canvas,
                (int(width * 0.685), int(height * 0.56) + index * int(40 * scale)),
                line,
                right,
                (255, 255, 255, 236) if index < 2 else HIGHLIGHT,
            )

    return canvas.convert("RGB")


def main() -> None:
    banner = compose(1280, 640, scale=1.06)
    banner.save(os.path.join(PUBLIC, "github-banner.png"), optimize=True)
    print("public/github-banner.png", banner.size)


if __name__ == "__main__":
    main()
