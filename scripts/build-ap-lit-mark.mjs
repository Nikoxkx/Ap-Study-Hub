/**
 * Build the AP English Literature course mark from the supplied rose engraving.
 *
 * Source: assets/marks/ap-lit-rose.png — a black-ink rose drawing on white.
 * The course marks are a single flat stroke colour on a transparent 256px
 * canvas, so the drawing is converted the same way the other nine are drawn:
 * ink becomes the stroke colour, paper becomes transparency, and the alpha
 * channel carries the hatching so the engraving keeps its detail at 32px.
 *
 * Requires ImageMagick (`convert`) on PATH.
 *
 * Run with: node scripts/build-ap-lit-mark.mjs
 */

import { execFileSync } from "node:child_process";
import { statSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const SOURCE = "assets/marks/ap-lit-rose.png";
const SIZE = 256;
/** Marks sit in a square canvas; 6px of breathing room matches the SVG set. */
const INK = SIZE - 12;

function render(stroke) {
  const dir = mkdtempSync(join(tmpdir(), "ap-lit-mark-"));
  const trimmed = join(dir, "trim.png");
  const mask = join(dir, "mask.png");
  const tinted = join(dir, "tint.png");

  // 1. Flatten the paper to pure white and the ink to pure black, so the mask
  //    is a clean alpha ramp rather than a scan with a grey cast.
  execFileSync("convert", [SOURCE, "-colorspace", "Gray", "-level", "12%,92%", "-trim", "+repage", trimmed]);

  // 2. Alpha = darkness. Negating the grey image and copying it into the alpha
  //    channel leaves the ink opaque and the paper fully transparent.
  execFileSync("convert", [
    trimmed,
    "-resize", `${INK}x${INK}`,
    "-negate",
    "-alpha", "copy",
    "-alpha", "extract",
    mask,
  ]);

  // 3. Paint the stroke colour through that mask on a transparent canvas.
  execFileSync("convert", [
    "-size", `${SIZE}x${SIZE}`,
    "xc:none",
    "(", "-size", `${INK}x${INK}`, `xc:${stroke}`, ")", "-gravity", "center", "-composite",
    mask,
    "-alpha", "off",
    "-compose", "CopyOpacity", "-composite",
    "-colorspace", "sRGB",
    "-type", "TrueColorAlpha",
    "-depth", "8",
    "-define", "png:color-type=6",
    tinted,
  ]);

  return { path: tinted, dir };
}

const targets = [
  { stroke: "#121212", out: "public/icons/courses/ap-lit.png" },
  { stroke: "#121212", out: "public/icons/courses/ap-lit-dark.png" },
  { stroke: "#FFFFFF", out: "public/icons/courses/ap-lit-white.png" },
];

for (const target of targets) {
  const { path } = render(target.stroke);
  // The presentation validator reads the PNG colour-type byte (offset 25) and
  // requires 6 (truecolour + alpha), so the grayscale mask is promoted to sRGB
  // before it is written.
  const png = execFileSync(
    "convert",
    [path, "-colorspace", "sRGB", "-type", "TrueColorAlpha", "-depth", "8", "-define", "png:color-type=6", "png:-"],
    { maxBuffer: 8 * 1024 * 1024 },
  );
  writeFileSync(target.out, png);
  const size = statSync(target.out).size;
  console.log(`${target.out} · ${size.toLocaleString()} bytes · ${target.stroke}`);
}
