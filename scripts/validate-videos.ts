import { getCourse } from "../src/lib/catalog";
import { subjects } from "../src/lib/subjects";
import { getVideoCoverage, unitVideos, videoThumbnailUrl, VIDEO_THUMBNAIL_SIZES, YOUTUBE_ID } from "../src/lib/video-lessons";

const errors: string[] = [];
function fail(message: string) {
  errors.push(message);
}

const coverage = getVideoCoverage();
const ids = new Set<string>();

for (const video of unitVideos) {
  if (!YOUTUBE_ID.test(video.id)) fail(`${video.id}: invalid YouTube ID`);
  if (ids.has(video.id)) fail(`${video.id}: duplicate video ID`);
  ids.add(video.id);
  if (!video.title.trim() || !video.creator.trim() || !video.role.trim() || !video.focus.trim()) {
    fail(`${video.id}: incomplete title, creator, role, or rationale`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(video.checked)) fail(`${video.id}: invalid checked date`);
  for (const size of VIDEO_THUMBNAIL_SIZES) {
    const thumbnail = videoThumbnailUrl(video, size);
    if (!thumbnail.startsWith(`https://i.ytimg.com/vi/${video.id}/`)) {
      fail(`${video.id}: ${size} thumbnail is not a direct YouTube image`);
    }
  }
  const course = getCourse(video.courseSlug);
  if (!course) fail(`${video.id}: unknown course ${video.courseSlug}`);
  else if (!course.units.some((unit) => unit.unitNumber === video.unit)) {
    fail(`${video.id}: ${video.courseSlug} has no unit ${video.unit}`);
  }
}

for (const subject of subjects) {
  const units = getCourse(subject.slug)?.units ?? [];
  for (const unit of units) {
    const count = unitVideos.filter((video) => video.courseSlug === subject.slug && video.unit === unit.unitNumber).length;
    if (!count) fail(`${subject.slug} unit ${unit.unitNumber}: no video`);
  }
}

if (coverage.units !== 75) fail(`Expected 75 covered units; found ${coverage.units}`);
if (coverage.videos < 75) fail(`Expected at least 75 videos; found ${coverage.videos}`);

console.log(`${coverage.videos} videos · ${coverage.units} units · ${subjects.length} courses`);
for (const [slug, row] of Object.entries(coverage.byCourse)) {
  console.log(`  ${slug}: ${row.videos} videos / ${row.units} units`);
}

if (errors.length) {
  console.error(`\nVideo validation failed with ${errors.length} issue${errors.length === 1 ? "" : "s"}:`);
  errors.forEach((error) => console.error(`  • ${error}`));
  process.exit(1);
}
console.log("✓ Every catalog unit has a verified video with a valid ID and rationale.");
