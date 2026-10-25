import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { getCourse } from "../src/lib/catalog";
import { getSubject } from "../src/lib/subjects";
import { unitVideos, videoSearchUrl, videoWatchUrl } from "../src/lib/video-lessons";

/** The committed CSV/JSON is the portable source used by Drive, Sheets, and the website. */
const columns = [
  "Course",
  "Slug",
  "Unit",
  "Unit title",
  "YouTube ID",
  "Video title",
  "Creator",
  "Role",
  "Why this unit",
  "Watch URL",
  "Replacement search",
  "Checked",
] as const;

function cell(value: string | number): string {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

const rows = unitVideos.map((video) => {
  const subject = getSubject(video.courseSlug);
  const unit = getCourse(video.courseSlug)?.units.find((item) => item.unitNumber === video.unit);
  return [
    subject?.familiar ?? video.courseSlug,
    video.courseSlug,
    video.unit,
    unit?.title ?? `Unit ${video.unit}`,
    video.id,
    video.title,
    video.creator,
    video.role,
    video.focus,
    videoWatchUrl(video),
    videoSearchUrl(video),
    video.checked,
  ];
});

const csv = [columns.map(cell).join(","), ...rows.map((row) => row.map(cell).join(","))].join("\n") + "\n";
const json = JSON.stringify({
  generatedFrom: "src/lib/video-lessons.ts",
  checked: "2026-10-24",
  columns,
  rows: rows.map((row) => Object.fromEntries(columns.map((column, index) => [column, row[index]]))),
}, null, 2) + "\n";

mkdirSync("data", { recursive: true });
mkdirSync("public", { recursive: true });
writeFileSync(join("data", "unit-video-registry.csv"), csv, "utf8");
writeFileSync(join("public", "unit-video-registry.csv"), csv, "utf8");
writeFileSync(join("public", "unit-video-registry.json"), json, "utf8");
console.log(`Wrote ${rows.length} video rows to data/unit-video-registry.csv, public/unit-video-registry.csv, and public/unit-video-registry.json`);
