/**
 * Build the AP English Literature course mark.
 *
 * The other nine marks are line art on a transparent 256px canvas: a single
 * stroke colour (#121212 for the light scheme, #FFFFFF for night mode), round
 * caps, and enough weight to survive being drawn at 32px in the top bar. The
 * rose is drawn here rather than shipped as a photograph, because the mark has
 * to sit in that same set — one stroke weight, one canvas, no halftone.
 *
 * Run with: node scripts/build-ap-lit-mark.mjs
 */

import { writeFileSync } from "node:fs";
import { Resvg } from "@resvg/resvg-js";

const SIZE = 256;
const CENTER = { x: 128, y: 108 };

/** Archimedean spiral, sampled so the curve stays smooth at 256px. */
function spiral({ turns = 1.9, inner = 6, outer = 30, step = 0.04 }) {
  const points = [];
  const total = turns * 2 * Math.PI;
  for (let theta = 0; theta <= total; theta += step) {
    const radius = inner + ((outer - inner) * theta) / total;
    const angle = theta - Math.PI / 2;
    points.push([
      CENTER.x + radius * Math.cos(angle),
      CENTER.y + radius * Math.sin(angle),
    ]);
  }
  return points
    .map(([x, y], index) => `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");
}

/** A five-petal silhouette: a circle whose radius dips between the petals. */
function bloom({ radius = 66, petals = 5, depth = 0.11, step = 0.04 }) {
  const points = [];
  for (let theta = 0; theta <= 2 * Math.PI + step; theta += step) {
    const r = radius * (1 - depth + depth * Math.cos(petals * (theta - Math.PI / 2)));
    points.push([
      CENTER.x + r * Math.cos(theta),
      CENTER.y + r * Math.sin(theta),
    ]);
  }
  return points
    .map(([x, y], index) => `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ") + " Z";
}

function svg(stroke) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <g fill="none" stroke="${stroke}" stroke-linecap="round" stroke-linejoin="round">
    <path d="${bloom({})}" stroke-width="13" />
    <path d="${spiral({})}" stroke-width="8" />
    <path d="M128 172 V 248" stroke-width="13" />
    <path d="M128 200 C 108 200, 94 188, 92 168 C 112 166, 128 180, 128 200 Z" stroke-width="10" />
    <path d="M128 224 C 150 224, 164 212, 166 192 C 146 190, 130 204, 128 224 Z" stroke-width="10" />
  </g>
</svg>
`;
}

function render(stroke, path) {
  const png = new Resvg(svg(stroke), {
    fitTo: { mode: "width", value: SIZE },
    background: "rgba(0,0,0,0)",
  })
    .render()
    .asPng();
  writeFileSync(path, png);
  console.log(`${path} · ${png.length.toLocaleString()} bytes · stroke ${stroke}`);
}

render("#121212", "public/icons/courses/ap-lit.png");
render("#121212", "public/icons/courses/ap-lit-dark.png");
render("#FFFFFF", "public/icons/courses/ap-lit-white.png");
