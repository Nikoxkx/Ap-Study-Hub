/**
 * Regenerate the static social card from the committed SVG.
 *
 * Run: pnpm build:social
 *
 * Uses @resvg/resvg-js with bundled Kalam (handwriting) and system DejaVu
 * fonts so the notebook sheet renders in authentic natural handwriting.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svgPath = join(root, "assets/social/og-image.svg");
const outPath = join(root, "public/og-image.png");

const dejavuDir = "/usr/share/fonts/truetype/dejavu";
const dejavuNames = [
  "DejaVuSans.ttf",
  "DejaVuSans-Bold.ttf",
  "DejaVuSerif.ttf",
  "DejaVuSerif-Bold.ttf",
  "DejaVuSansMono.ttf",
  "DejaVuSansMono-Bold.ttf",
];
const fontFiles = [
  ...(existsSync(dejavuDir)
    ? dejavuNames.map((name) => join(dejavuDir, name)).filter(existsSync)
    : []),
  join(root, "assets/social/Kalam-Light.ttf"),
  join(root, "assets/social/Kalam-Regular.ttf"),
].filter(existsSync);

const resvg = new Resvg(readFileSync(svgPath, "utf8"), {
  fitTo: { mode: "width", value: 1200 },
  font: {
    ...(fontFiles.length ? { fontFiles } : {}),
    defaultFontFamily: "DejaVu Sans",
  },
  background: "#e4e8f2",
});

const png = resvg.render().asPng();
writeFileSync(outPath, png);
writeFileSync(join(root, "public/social-preview.png"), png);
console.log(`Wrote 1200×630 PNG (${png.length.toLocaleString()} bytes) to public/og-image.png and public/social-preview.png`);
