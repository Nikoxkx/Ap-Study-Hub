import { lessonLibrary, lessonSources, type Lesson, type SourceId } from "../src/content/lessons";
import { countWords } from "../src/content/lessons/text";

const expectedUnits: Record<string, number> = {
  apush: 9,
  "ap-lang": 9,
  "ap-seminar": 5,
  "ap-gov": 5,
  "ap-bio": 8,
  "ap-calc": 10,
  "ap-research": 5,
};

const errors: string[] = [];
const seenParagraphs = new Map<string, string>();
const sourceIds = new Set<string>(Object.keys(lessonSources));

function report(slug: string, unit: Lesson, message: string) {
  errors.push(`${slug} unit ${unit.unitNumber}: ${message}`);
}

let totalLessons = 0;
let totalParagraphs = 0;
let totalWords = 0;
let totalQuestions = 0;
const usedSources = new Set<SourceId>();

for (const [slug, lessons] of Object.entries(lessonLibrary)) {
  const expected = expectedUnits[slug];
  if (lessons.length !== expected) {
    errors.push(`${slug}: expected ${expected} lessons, found ${lessons.length}`);
  }

  const numbers = lessons.map((lesson) => lesson.unitNumber).sort((a, b) => a - b);
  numbers.forEach((number, index) => {
    if (number !== index + 1) errors.push(`${slug}: unit sequence is not 1…${expected}`);
  });

  let courseWords = 0;
  let courseParagraphs = 0;

  for (const lesson of lessons) {
    totalLessons += 1;
    const paragraphs = lesson.sections.flatMap((section) => section.paragraphs);
    const lessonWords = paragraphs.reduce((sum, paragraph) => sum + countWords(paragraph), 0);
    courseWords += lessonWords;
    courseParagraphs += paragraphs.length;
    totalParagraphs += paragraphs.length;
    totalWords += lessonWords;
    totalQuestions += lesson.practice.length;

    if (paragraphs.length < 10) report(slug, lesson, `only ${paragraphs.length} teaching paragraphs; 10 required`);
    // Ten developed paragraphs are the product requirement. These baselines catch
    // accidental stubs without mistaking a longer word count for better teaching.
    if (lessonWords < 500) report(slug, lesson, `only ${lessonWords} teaching words; 500 minimum`);
    if (lesson.objectives.length < 3) report(slug, lesson, "at least three learning objectives required");
    if (lesson.glossary.length < 4) report(slug, lesson, "at least four glossary entries required");
    if (lesson.practice.length < 2) report(slug, lesson, "at least two original practice questions required");
    if (lesson.sections.length < 5) report(slug, lesson, "at least five named teaching sections required");
    if (!lesson.examWeight || !lesson.description || !lesson.title) report(slug, lesson, "missing title, description, or exam-weight label");
    if (lesson.examAlignment.criteria.length < 3) report(slug, lesson, "at least three exam-alignment criteria required");

    paragraphs.forEach((paragraph, index) => {
      const count = countWords(paragraph);
      if (count < 35) report(slug, lesson, `paragraph ${index + 1} has only ${count} words; 35 minimum`);
      const normalized = paragraph.toLowerCase().replace(/\s+/g, " ").trim();
      const previous = seenParagraphs.get(normalized);
      if (previous) report(slug, lesson, `duplicate teaching paragraph also used in ${previous}`);
      else seenParagraphs.set(normalized, `${slug} unit ${lesson.unitNumber}`);
    });

    for (const section of lesson.sections) {
      if (!section.heading || section.sources.length === 0) report(slug, lesson, `section “${section.heading}” needs a heading and citation`);
      for (const sourceId of section.sources) {
        if (!sourceIds.has(sourceId)) report(slug, lesson, `unknown source ID “${sourceId}”`);
        usedSources.add(sourceId);
      }
    }

    for (const sourceId of lesson.examAlignment.sources) {
      if (!sourceIds.has(sourceId)) report(slug, lesson, `unknown exam-alignment source ID “${sourceId}”`);
      usedSources.add(sourceId);
    }

    if (!lesson.sections.some((section) => section.sources.some((id) => lessonSources[id].kind.startsWith("Official")))) {
      report(slug, lesson, "no official curriculum or scoring source cited in teaching sections");
    }

    for (const question of lesson.practice) {
      if (question.options.length !== 4) report(slug, lesson, `question “${question.question.slice(0, 45)}…” must have four options`);
      if (question.correctIndex < 0 || question.correctIndex >= question.options.length) report(slug, lesson, "invalid correctIndex");
      if (!question.skill || countWords(question.explanation) < 8) report(slug, lesson, "practice needs a skill and reasoned explanation");
    }
  }

  console.log(
    `${slug.padEnd(12)} ${String(lessons.length).padStart(2)} lessons  ${String(courseParagraphs).padStart(3)} paragraphs  ${String(courseWords).padStart(5)} words`,
  );
}

for (const [id, source] of Object.entries(lessonSources)) {
  if (source.id !== id) errors.push(`source ${id}: id field does not match registry key`);
  if (!source.url.startsWith("https://")) errors.push(`source ${id}: URL must use HTTPS`);
  if (!source.title || !source.publisher || !source.description || !source.checked) {
    errors.push(`source ${id}: incomplete source metadata`);
  }
}

const unused = Object.keys(lessonSources).filter((id) => !usedSources.has(id as SourceId));
if (unused.length) errors.push(`unused source IDs: ${unused.join(", ")}`);

console.log("─".repeat(64));
console.log(`${totalLessons} lessons · ${totalParagraphs} substantive paragraphs · ${totalWords.toLocaleString()} teaching words`);
console.log(`${totalQuestions} original linked practice questions · ${usedSources.size} cited sources`);

if (errors.length) {
  console.error(`\nContent validation failed with ${errors.length} issue${errors.length === 1 ? "" : "s"}:`);
  errors.forEach((error) => console.error(`  • ${error}`));
  process.exit(1);
}

console.log("✓ Depth, structure, citations, sequence, and practice validation passed.");
