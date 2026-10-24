/**
 * Regenerate the static social card from the committed SVG.
 *
 * Run: pnpm build:social
 *
 * A static PNG is used in metadata because the previous runtime ImageResponse
 * route could fail in production. The SVG remains the editable source; this
 * script uses @resvg/resvg-js and system DejaVu fonts when available.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svgPath = join(root, "assets/social/og-image.svg");
const outPath = join(root, "public/og-image.png");

const fontDir = "/usr/share/fonts/truetype/dejavu";
const fontNames = [
  "DejaVuSans.ttf",
  "DejaVuSans-Bold.ttf",
  "DejaVuSerif.ttf",
  "DejaVuSerif-Bold.ttf",
  "DejaVuSansMono.ttf",
  "DejaVuSansMono-Bold.ttf",
];
const fontFiles = existsSync(fontDir)
  ? fontNames.map((name) => join(fontDir, name)).filter(existsSync)
  : [];

const resvg = new Resvg(readFileSync(svgPath, "utf8"), {
  fitTo: { mode: "width", value: 1200 },
  font: {
    ...(fontFiles.length ? { fontFiles } : {}),
    defaultFontFamily: "DejaVu Sans",
  },
  background: "#f6f3ec",
});

const png = resvg.render().asPng();
writeFileSync(outPath, png);
writeFileSync(join(root, "public/social-preview.png"), png);
console.log(`Wrote 1200×630 PNG (${png.length.toLocaleString()} bytes) to public/og-image.png and public/social-preview.png`);
