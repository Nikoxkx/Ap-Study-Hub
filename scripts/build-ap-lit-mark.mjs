import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

/**
 * Build the AP Literature course mark.
 *
 * Source: `assets/marks/ap-lit-book.png` — the supplied black line drawing of
 * an open book (432×337). It replaced the engraved rose because the rose's fine
 * grey hatching collapsed into a smudge at 15–32px, which is where the mark is
 * actually rendered; it read as a missing icon rather than a symbol. A line
 * drawing keeps solid strokes at those sizes, so it survives the downscale the
 * same way the flag, capitol and leaf marks do.
 *
 * Per variant:
 *   1. trim the paper margin and invert, so ink becomes high luminance;
 *   2. threshold, so ink is fully opaque and paper fully transparent
 *      (no grey halo around the strokes);
 *   3. dilate slightly, which is what stops the strokes vanishing at 15px;
 *   4. pad to a square canvas and resize to 256×256;
 *   5. paint one flat colour and write a truecolour+alpha PNG, because
 *      `validate-presentation` rejects grayscale-with-alpha icons.
 *
 * Outputs: ap-lit.png / ap-lit-dark.png (ink), ap-lit-white.png (pure white for
 * permanently dark badges). Night mode inverts the ink file in CSS, exactly as
 * it does for the other nine marks.
 *
 * Requires ImageMagick's `convert` (or `magick` via MAGICK_BIN).
 */

const SOURCE = process.env.MARK_SOURCE ?? "assets/marks/ap-lit-book.png";
const OUT_DIR = "public/icons/courses";
const CANVAS = 256;
const INNER = 240;
/** Threshold and dilation tuned together: solid at 15px, not chunky at 64px. */
const LEVEL = "20%,50%";
const DILATE = "Disk:2";

const variants = [
  { file: "ap-lit.png", colour: "#121212" },
  { file: "ap-lit-dark.png", colour: "#121212" },
  { file: "ap-lit-white.png", colour: "#FFFFFF" },
];

function magick(args) {
  execFileSync(process.env.MAGICK_BIN ?? "convert", args, { stdio: ["ignore", "inherit", "inherit"] });
}

const work = mkdtempSync(join(tmpdir(), "ap-lit-mark-"));

try {
  const mask = join(work, "mask.png");
  magick([
    SOURCE,
    "-colorspace", "Gray",
    "-trim", "+repage",
    "-negate",
    "-normalize",
    "-level", LEVEL,
    "-morphology", "Dilate", DILATE,
    "-resize", `${INNER}x${INNER}`,
    "-background", "black",
    "-gravity", "center",
    "-extent", `${CANVAS}x${CANVAS}`,
    mask,
  ]);

  for (const { file, colour } of variants) {
    const flat = join(work, "flat.png");
    const target = join(OUT_DIR, file);
    magick(["-size", `${CANVAS}x${CANVAS}`, `xc:${colour}`, "-colorspace", "sRGB", "-type", "TrueColor", flat]);
    magick([
      flat,
      mask,
      "-alpha", "off",
      "-compose", "CopyOpacity",
      "-composite",
      "-colorspace", "sRGB",
      "-type", "TrueColorAlpha",
      "-depth", "8",
      `PNG32:${target}`,
    ]);
    console.log(`wrote ${target}`);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}
