import { lessonLibrary } from "../src/content/lessons";
import { courseConnections } from "../src/content/connections";
import { courseLabs } from "../src/content/labs";
import { workedExamples } from "../src/content/worked";
import { generateVariants } from "../src/content/variants";
import { getStudioTasks } from "../src/lib/studio-data";
import { getCourse } from "../src/lib/catalog";
import { mathHtml } from "../src/lib/math";
import {
  DAILY_NEW_ITEMS_PER_COURSE,
  DEFAULT_STUDY_STATE,
  getReviewQueue,
  reviveStudyState,
  scheduleReview,
  type StudyItem,
} from "../src/lib/study-model";
import { getStudyCourses, getStudyItems } from "../src/lib/study-data";
import { generateStudyPlan, studyPlanToCalendar } from "../src/lib/study-plan";

const errors: string[] = [];
const courses = getStudyCourses();
const items = getStudyItems();
const courseMap = new Map(courses.map((course) => [course.slug, course]));
let mathExpressions = 0;

function fail(message: string) {
  errors.push(message);
}

function checkMath(label: string, source: string, displayMode = false) {
  try {
    mathHtml(source, displayMode);
    mathExpressions += 1;
  } catch (error) {
    fail(`${label}: KaTeX could not render ${JSON.stringify(source)} — ${error instanceof Error ? error.message : String(error)}`);
  }
}

function checkInlineMath(label: string, source: string) {
  const pattern = /\\\(([\s\S]+?)\\\)|\$\$([\s\S]+?)\$\$/g;
  for (const match of source.matchAll(pattern)) {
    checkMath(label, match[1] ?? match[2], match[0].startsWith("$$"));
  }
  const openings = (source.match(/\\\(/g) ?? []).length;
  const closings = (source.match(/\\\)/g) ?? []).length;
  if (openings !== closings) fail(`${label}: unmatched inline math delimiters`);
  const displays = (source.match(/\$\$/g) ?? []).length;
  if (displays % 2 !== 0) fail(`${label}: unmatched display math delimiters`);
}

function unique(label: string, ids: string[]) {
  const seen = new Set<string>();
  for (const id of ids) {
    if (!id) fail(`${label}: empty ID`);
    if (seen.has(id)) fail(`${label}: duplicate ID ${id}`);
    seen.add(id);
  }
}

function checkUnit(label: string, courseSlug: string, unitNumber: number) {
  const course = courseMap.get(courseSlug as (typeof courses)[number]["slug"]);
  if (!course) fail(`${label}: unknown course ${courseSlug}`);
  else if (!course.units.some((unit) => unit.unitNumber === unitNumber)) {
    fail(`${label}: ${courseSlug} has no lesson ${unitNumber}`);
  }
}

if (courses.length !== 7) fail(`Expected seven study courses; found ${courses.length}`);
unique("study item", items.map((item) => item.id));

for (const item of items) {
  checkUnit(`study item ${item.id}`, item.courseSlug, item.unitNumber ?? 1);
  if (!item.prompt || !item.answer || !item.href) fail(`study item ${item.id}: incomplete prompt, answer, or link`);
  if (item.unitNumber !== undefined && (!item.lessonHref || !item.lessonHref.endsWith(`#unit-${item.unitNumber}`))) {
    fail(`study item ${item.id}: lesson link does not match unit ${item.unitNumber}`);
  }
  checkInlineMath(`study item ${item.id} prompt`, item.prompt);
  checkInlineMath(`study item ${item.id} answer`, item.answer);
  if (item.explanation) checkInlineMath(`study item ${item.id} explanation`, item.explanation);
}

for (const [courseSlug, lessons] of Object.entries(lessonLibrary)) {
  for (const lesson of lessons) {
    for (const section of lesson.sections) {
      section.paragraphs.forEach((paragraph, index) => checkInlineMath(`${courseSlug} lesson ${lesson.unitNumber}/${section.heading} paragraph ${index + 1}`, paragraph));
    }
    lesson.objectives.forEach((objective) => checkInlineMath(`${courseSlug} lesson ${lesson.unitNumber} objective`, objective));
    lesson.glossary.forEach((entry) => {
      checkInlineMath(`${courseSlug} lesson ${lesson.unitNumber} glossary ${entry.term}`, entry.term);
      checkInlineMath(`${courseSlug} lesson ${lesson.unitNumber} glossary ${entry.term}`, entry.definition);
    });
    lesson.examAlignment.criteria.forEach((criterion) => checkInlineMath(`${courseSlug} lesson ${lesson.unitNumber} exam criterion`, criterion));
  }
}

unique("worked example", workedExamples.map((example) => example.id));
for (const example of workedExamples) {
  checkUnit(`worked example ${example.id}`, example.courseSlug, example.unitNumber);
  if (!example.steps.length) fail(`worked example ${example.id}: no steps`);
  checkInlineMath(`worked example ${example.id} problem`, example.problem);
  checkInlineMath(`worked example ${example.id} check`, example.check);
  example.steps.forEach((step, index) => {
    if (!step.note) fail(`worked example ${example.id} step ${index + 1}: no reason`);
    checkMath(`worked example ${example.id} step ${index + 1}`, step.math, true);
  });
  checkMath(`worked example ${example.id} answer`, example.answer, true);
}

unique("course lab", courseLabs.map((lab) => lab.id));
for (const lab of courseLabs) {
  checkUnit(`course lab ${lab.id}`, lab.courseSlug, lab.unitNumber);
  if (!lab.title || !lab.instructions) fail(`course lab ${lab.id}: missing title or instructions`);
  if (lab.kind === "data") {
    if (lab.correctIndex < 0 || lab.correctIndex >= lab.choices.length) fail(`course lab ${lab.id}: invalid correct choice`);
    if (lab.rows.some((row) => row.length !== lab.columns.length)) fail(`course lab ${lab.id}: table row/column mismatch`);
    checkMath(`course lab ${lab.id} calculation`, lab.calculation);
  }
  if (lab.kind === "annotation" && !lab.segments.length) fail(`course lab ${lab.id}: no source segments`);
  if (lab.kind === "match") {
    for (const item of lab.cases) if (!lab.principles.includes(item.principle)) fail(`course lab ${lab.id}: unknown principle ${item.principle}`);
  }
  if (lab.kind === "matrix" && lab.sources.length < 2) fail(`course lab ${lab.id}: synthesis needs at least two sources`);
  if (lab.kind === "research") {
    for (const field of lab.fields) if (!lab.questionTemplate.includes(`{${field.id}}`)) fail(`course lab ${lab.id}: template omits ${field.id}`);
  }
}

unique("connection", courseConnections.map((connection) => connection.id));
for (const connection of courseConnections) {
  checkUnit(`connection ${connection.id} source`, connection.from.courseSlug, connection.from.unitNumber);
  checkUnit(`connection ${connection.id} destination`, connection.to.courseSlug, connection.to.unitNumber);
}

const studioIds: string[] = [];
for (const course of courses) {
  const bundle = getCourse(course.slug);
  if (!bundle) { fail(`Missing catalog bundle for ${course.slug}`); continue; }
  for (const task of getStudioTasks(bundle)) {
    studioIds.push(task.id);
    if (!task.prompt || task.minutes <= 0 || task.criteria.length < 3) fail(`studio task ${task.id}: incomplete prompt, timing, or criteria`);
    checkInlineMath(`studio task ${task.id} prompt`, task.prompt);
    task.criteria.forEach((criterion) => checkInlineMath(`studio task ${task.id} criterion`, criterion));
    if (task.exemplar) checkInlineMath(`studio task ${task.id} exemplar`, task.exemplar);
  }
}
unique("studio task", studioIds);

const variantSeeds = ["0", "1", "2", "3", "4", "5", "42", "2027"];
const variantIds: string[] = [];
const variantTemplates = new Map<string, Set<string>>();
for (const seed of variantSeeds) {
  for (const courseSlug of ["ap-calc", "ap-bio"] as const) {
    const first = generateVariants(courseSlug, seed);
    const second = generateVariants(courseSlug, seed);
    if (JSON.stringify(first) !== JSON.stringify(second)) fail(`variants ${courseSlug}/${seed}: generation is not deterministic`);
    for (const variant of first) {
      variantIds.push(variant.id);
      const forms = variantTemplates.get(variant.templateId) ?? new Set<string>();
      forms.add(JSON.stringify([variant.prompt, variant.options, variant.correctIndex]));
      variantTemplates.set(variant.templateId, forms);
      checkUnit(`variant ${variant.id}`, variant.courseSlug, variant.unitNumber);
      if (variant.options.length !== 4 || new Set(variant.options).size !== 4) fail(`variant ${variant.id}: four distinct options required`);
      if (variant.correctIndex < 0 || variant.correctIndex >= variant.options.length) fail(`variant ${variant.id}: invalid correctIndex`);
      checkInlineMath(`variant ${variant.id} prompt`, variant.prompt);
      checkInlineMath(`variant ${variant.id} explanation`, variant.explanation);
    }
  }
}
unique("generated variant", variantIds);
for (const [templateId, forms] of variantTemplates) {
  if (forms.size < 2) fail(`variant template ${templateId}: tested seeds produced no variation`);
}

// Queue behavior: new work is bounded and stable; due work is never hidden by it.
const now = Date.parse("2026-10-24T16:00:00Z");
for (const course of courses) {
  const first = getReviewQueue(items, DEFAULT_STUDY_STATE, now, course.slug);
  const second = getReviewQueue(items, DEFAULT_STUDY_STATE, now, course.slug);
  if (first.map((item) => item.id).join("|") !== second.map((item) => item.id).join("|")) fail(`queue ${course.slug}: daily order is not deterministic`);
  if (first.length !== DAILY_NEW_ITEMS_PER_COURSE) fail(`queue ${course.slug}: expected ${DAILY_NEW_ITEMS_PER_COURSE} new items, found ${first.length}`);
}
const sample = items[0];
const missed = scheduleReview(DEFAULT_STUDY_STATE, { itemId: sample.id, item: sample, grade: "again", correct: false, chosen: "test miss" }, now);
if (!missed.mistakes[sample.id] || missed.reviews[sample.id].due !== now + 600_000) fail("scheduling: missed item did not create a ten-minute review and mistake");
const resolved = scheduleReview(missed, { itemId: sample.id, item: sample, grade: "good", correct: true }, now + 600_000);
if (!resolved.mistakes[sample.id].resolvedAt) fail("scheduling: correct retrieval did not resolve the existing mistake");
if (reviveStudyState({ version: 2 }) !== null) fail("backup revival accepted an unsupported version");
if (!reviveStudyState(resolved)) fail("backup revival rejected a valid study state");

const planIds: string[] = [];
for (const course of courses) {
  const settings = { courseSlug: course.slug, minutes: 40 as const, days: [1, 3, 6], createdAt: now };
  const days = generateStudyPlan(course, settings, 12, now);
  if (!days.length || days.length > 14) fail(`plan ${course.slug}: invalid active-day count ${days.length}`);
  for (const day of days) {
    if (Date.parse(`${day.date}T23:59:59`) > Date.parse(`${course.examDate}T23:59:59`)) fail(`plan ${course.slug}: task after deadline`);
    const minutes = day.tasks.reduce((sum, task) => sum + task.minutes, 0);
    if (minutes !== settings.minutes) fail(`plan ${course.slug}/${day.date}: ${minutes} minutes does not equal available time`);
    planIds.push(...day.tasks.map((task) => task.id));
  }
  const calendar = studyPlanToCalendar(course, days);
  const eventCount = (calendar.match(/BEGIN:VEVENT/g) ?? []).length;
  if (eventCount !== days.length * 3) fail(`calendar ${course.slug}: task/event mismatch`);
}
unique("study plan task", planIds);
const expired = { ...courses[0], examDate: "2020-01-01" };
if (generateStudyPlan(expired, { courseSlug: expired.slug, minutes: 25, days: [1, 2, 3, 4, 5], createdAt: now }, 0, now).length) {
  fail("plan generator produced work after an expired deadline");
}

const kindCounts = items.reduce<Record<string, number>>((counts, item: StudyItem) => {
  counts[item.kind] = (counts[item.kind] ?? 0) + 1;
  return counts;
}, {});
console.log(`${courses.length} courses · ${items.length} shared study items (${Object.entries(kindCounts).map(([kind, count]) => `${count} ${kind}`).join(", ")})`);
console.log(`${workedExamples.length} worked examples · ${courseLabs.length} interactive labs · ${studioIds.length} writing tasks · ${courseConnections.length} connections`);
console.log(`${variantIds.length} deterministic generated variants checked · ${mathExpressions.toLocaleString()} KaTeX expressions compiled`);

if (errors.length) {
  console.error(`\nStudy-system validation failed with ${errors.length} issue${errors.length === 1 ? "" : "s"}:`);
  errors.forEach((error) => console.error(`  • ${error}`));
  process.exit(1);
}
console.log("✓ Catalog joins, math, variants, scheduling, backups, plans, and calendar validation passed.");
