import { execFileSync } from "node:child_process";
import { join } from "node:path";

/**
 * Build the AP Literature course mark from the supplied rose engraving.
 *
 * The artwork in `assets/marks/ap-lit-rose.png` is the authoritative logo: a
 * black-ink engraved rose on a white ground. It is used everywhere the site
 * shows an AP Literature symbol — the header chip, the course hero, the study
 * desk, the exam briefing and the print sheets — so this script is the single
 * source of truth for all three PNG variants.
 *
 * Turning the scan into an icon is a four-step job:
 *   1. flatten to greyscale and negate, so ink is light and paper is black;
 *   2. lift the mid-tones (`-level 20%,66%`) so the hatching survives as line
 *      weight instead of dissolving into grey haze at 15px;
 *   3. use that grey as the alpha channel and paint the RGB a flat colour;
 *   4. trim, fit to a 244px art box, and centre on a 256px canvas.
 *
 * NB: the obvious `xc:colour mask -alpha off -compose CopyOpacity -composite`
 * silently drops the colour and writes a pure black image — it shipped once,
 * which is why the white variant was invisible on the night header. Building
 * alpha first and colorizing the RGB afterwards avoids that entirely.
 *
 * Outputs (256×256, sRGB, truecolour + alpha):
 *   ap-lit.png / ap-lit-dark.png — ink, for day surfaces
 *   ap-lit-white.png             — pure white, for permanently dark surfaces
 *
 * Requires ImageMagick's `convert` (or `magick` via MAGICK_BIN).
 */

const SOURCE = "assets/marks/ap-lit-rose.png";
const OUT_DIR = "public/icons/courses";
const CANVAS = 256;
const ART = 244;

const INK = "#121212";
const WHITE = "#ffffff";

/** Mid-tone lift: enough to hold the engraving at 15px without flooding it. */
const LEVEL = "20%,66%";

function run(args) {
  execFileSync(process.env.MAGICK_BIN ?? "convert", args, { stdio: ["ignore", "inherit", "inherit"] });
}

/**
 * Paint one variant.
 *
 * Alpha comes from the negated luminance of the engraving, so the paper is
 * transparent and the ink is opaque; the RGB is then flood-colorized, which
 * leaves the alpha untouched.
 */
function paint(target, colour) {
  run([
    SOURCE,
    "-colorspace", "Gray",
    "-negate",
    "-level", LEVEL,
    "-trim", "+repage",
    "-resize", `${ART}x${ART}`,
    "-alpha", "copy",
    "-fill", colour,
    "-colorize", "100",
    "-background", "none",
    "-gravity", "center",
    "-extent", `${CANVAS}x${CANVAS}`,
    "-colorspace", "sRGB",
    "-type", "TrueColorAlpha",
    "-define", "png:color-type=6",
    "-depth", "8",
    `PNG32:${join(OUT_DIR, target)}`,
  ]);
  console.log(`wrote ${join(OUT_DIR, target)}`);
}

paint("ap-lit.png", INK);
paint("ap-lit-dark.png", INK);
paint("ap-lit-white.png", WHITE);
