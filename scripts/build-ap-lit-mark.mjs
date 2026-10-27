import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

/**
 * Build the AP Literature course mark.
 *
 * Drawn here as geometry, not traced from a picture. The other nine marks are
 * solid silhouettes that read at 15–32px — a flag, an open book, a stack of
 * sources, a capitol, a helix, a triangle, a magnifier, a rising graph, a leaf.
 * Two supplied drawings were tried first and both failed that test: an engraved
 * rose (fine grey hatching, turns to mush) and an open book (thin ink lines,
 * disappears at icon size, and duplicates AP Language's book).
 *
 * The mark is therefore a quill rising out of an inkwell — literature and the
 * writing about it — built as two solid masses with a light well punched out of
 * the pot and three barbs cut from the feather. That is the same construction
 * as the other marks: filled shape, a few negative-space details, no hairlines.
 *
 * Outputs (256×256, sRGB, truecolour + alpha):
 *   ap-lit.png / ap-lit-dark.png — ink, for day surfaces
 *   ap-lit-white.png             — pure white, for permanently dark surfaces
 *
 * Requires ImageMagick's `convert` (or `magick` via MAGICK_BIN).
 */

const OUT_DIR = "public/icons/courses";
const CANVAS = 256;
const ART = 244;
const SOURCE = 340;

const INK = "#121212";
const WHITE = "#ffffff";

function run(args) {
  execFileSync(process.env.MAGICK_BIN ?? "convert", args, { stdio: ["ignore", "inherit", "inherit"] });
}

/**
 * The drawing, at its own scale.
 *
 * White is ink; black is a hole. Keeping it as a single mask means the shape can
 * be adjusted by editing one path rather than re-deriving a colour composite.
 */
function buildMask(target) {
  run([
    "-size", `${SOURCE}x${SOURCE}`, "xc:black",
    "-fill", "white", "-stroke", "none",
    // Feather: a filled blade curving up to the right from the pot.
    "-draw", "path 'M 150,236 C 156,176 176,128 214,88 C 236,64 258,52 274,50 C 268,74 254,104 232,132 C 206,164 178,204 162,244 Z'",
    // Inkwell rim and body.
    "-draw", "roundrectangle 96,238 244,262 10,10",
    "-draw", "path 'M 108,268 L 232,268 L 214,318 L 126,318 Z'",
    // Negative space: the ink window in the pot.
    "-fill", "black",
    "-draw", "path 'M 140,284 L 202,284 L 196,302 L 146,302 Z'",
    // Negative space: three barbs, cut rather than drawn.
    "-stroke", "black", "-strokewidth", "11",
    "-draw", "stroke-linecap round line 172,220 142,216",
    "-draw", "stroke-linecap round line 188,194 164,180",
    "-draw", "stroke-linecap round line 206,164 188,146",
    target,
  ]);
}

/**
 * Paint the mask a single colour.
 *
 * NB: the obvious `xc:colour mask -alpha off -compose CopyOpacity -composite`
 * silently drops the colour and writes a pure black image — it did exactly that
 * for a while, which is why the white build was invisible on the night header.
 * Building alpha from the mask first and then colorizing the RGB keeps the
 * painted colour intact.
 */
function finish(mask, colour, target) {
  run([
    mask,
    "-alpha", "off",
    "-colorspace", "Gray",
    "-alpha", "copy",
    "-trim", "+repage",
    "-resize", `${ART}x${ART}`,
    "-fill", colour,
    "-colorize", "100",
    "-background", "none",
    "-gravity", "center",
    "-extent", `${CANVAS}x${CANVAS}`,
    "-colorspace", "sRGB",
    "-depth", "8",
    `PNG32:${target}`,
  ]);
}

const work = mkdtempSync(join(tmpdir(), "ap-lit-mask-"));
try {
  const mask = join(work, "mask.png");
  buildMask(mask);

  finish(mask, INK, join(OUT_DIR, "ap-lit.png"));
  finish(mask, INK, join(OUT_DIR, "ap-lit-dark.png"));
  finish(mask, WHITE, join(OUT_DIR, "ap-lit-white.png"));

  for (const file of ["ap-lit.png", "ap-lit-dark.png", "ap-lit-white.png"]) {
    console.log(`wrote ${join(OUT_DIR, file)}`);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}
