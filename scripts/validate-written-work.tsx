/**
 * Written-work and defense validation.
 *
 * The claim this repository makes is now specific: *every* lesson has one
 * written answer and one spoken defense, the answer sits on the right paper,
 * the math compiles, and the words a student is told to say are actually the
 * words on the page. That is a claim a script can check, so it is checked here
 * rather than trusted.
 *
 * Two kinds of check:
 *   1. Structural — coverage, uniqueness, and the paper rule (squared paper if
 *      and only if the answer contains arithmetic).
 *   2. Rendered — every course's defense page and one full lesson body are
 *      rendered through React's server renderer, so a broken prop or a missing
 *      unit fails here instead of in front of a student.
 *
 * Run with: npx tsx scripts/validate-written-work.tsx
 */

import { renderToString } from "react-dom/server";
import { lessonLibrary } from "../src/content/lessons";
import {
  courseDefenses,
  getCourseDefense,
  getUnitDefense,
  getWrittenWork,
  usesMathematics,
  writtenWork,
} from "../src/content/written-work";
import { defenseTasks, plainTerms } from "../src/content/plain-language";
import { defenseScript, voiceRules } from "../src/content/humanize";
import { getCatalog } from "../src/lib/catalog";
import { mathHtml } from "../src/lib/math";
import { DefensePanel } from "../src/components/DefensePanel";
import { WrittenExample } from "../src/components/WrittenExample";

const errors: string[] = [];
let checks = 0;
let mathExpressions = 0;

function fail(message: string) {
  errors.push(message);
}

function ok(condition: boolean, message: string) {
  checks += 1;
  if (!condition) fail(message);
}

function checkInlineMath(label: string, source: string) {
  const pattern = /\\\(([\s\S]+?)\\\)|\$\$([\s\S]+?)\$\$/g;
  for (const match of source.matchAll(pattern)) {
    try {
      mathHtml(match[1] ?? match[2], match[0].startsWith("$$"));
      mathExpressions += 1;
    } catch (error) {
      fail(`${label}: KaTeX could not render ${JSON.stringify(match[0])} — ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  const openings = (source.match(/\\\(/g) ?? []).length;
  const closings = (source.match(/\\\)/g) ?? []).length;
  if (openings !== closings) fail(`${label}: unmatched inline math delimiters`);
}

const courses = getCatalog();

// ── 1. Coverage --------------------------------------------------------------
ok(courses.length === 10, `expected ten courses, found ${courses.length}`);

for (const course of courses) {
  const { subject } = course;
  const lessons = lessonLibrary[subject.slug as keyof typeof lessonLibrary] ?? [];
  const defense = getCourseDefense(subject.slug);
  ok(Boolean(defense), `${subject.slug}: no course-level defense`);
  ok(Boolean(defenseTasks.find((task) => task.courseSlug === subject.slug)), `${subject.slug}: no defense task`);

  for (const lesson of lessons) {
    const work = getWrittenWork(subject.slug, lesson.unitNumber);
    ok(work.length === 1, `${subject.slug} unit ${lesson.unitNumber}: expected exactly one written example, found ${work.length}`);
    const unitDefense = getUnitDefense(subject.slug, lesson.unitNumber);
    ok(Boolean(unitDefense), `${subject.slug} unit ${lesson.unitNumber}: no unit defense`);
  }

  if (defense) {
    ok(defense.units.length === lessons.length, `${subject.slug}: ${defense.units.length} defenses for ${lessons.length} lessons`);
    ok(defense.frames.length >= 4, `${subject.slug}: needs at least four sentence frames`);
    ok(defense.markedOn.length >= 3, `${subject.slug}: needs at least three marking criteria`);
    ok(defense.claim.length > 40, `${subject.slug}: course claim is too thin to defend`);
  }
}

// ── 2. Shape and the paper rule ---------------------------------------------
const ids = new Set<string>();
for (const work of writtenWork) {
  ok(!ids.has(work.id), `duplicate written example id ${work.id}`);
  ids.add(work.id);

  ok(work.plan.length >= 2, `${work.id}: needs two planning decisions before writing`);
  ok(work.example.length >= 2, `${work.id}: a one-line answer is not an example`);
  ok(work.say.length >= 3, `${work.id}: needs at least three things to say out loud`);
  ok(Boolean(work.because) && Boolean(work.trap), `${work.id}: missing why-it-earns-the-mark or trap`);

  const math = usesMathematics(work.example);
  ok(
    math === work.example.some((line) => line.includes("\\(") || line.startsWith("\\[")),
    `${work.id}: arithmetic and TeX delimiters disagree, so the paper choice would be wrong`,
  );

  work.example.forEach((line, index) => checkInlineMath(`${work.id} example line ${index + 1}`, line));
  work.say.forEach((line, index) => checkInlineMath(`${work.id} say line ${index + 1}`, line));
  checkInlineMath(`${work.id} prompt`, work.prompt);

  // A defense line that is really an essay sentence is a defense nobody says.
  for (const line of work.say) {
    const words = line.trim().split(/\s+/).filter(Boolean).length;
    ok(words <= 60, `${work.id}: a spoken line runs to ${words} words; a student cannot say that in one breath`);
  }
  ok(
    /\bI\b|\byou\b|my\b/i.test(work.say.join(" ")),
    `${work.id}: the spoken lines never use the first or second person, so they are not spoken lines`,
  );
}

// ── 3. Course pages render ---------------------------------------------------
let renders = 0;
for (const course of courses) {
  const { subject } = course;
  const defense = getCourseDefense(subject.slug);
  try {
    const html = renderToString(
      <DefensePanel subject={subject} courseDefense={defense} unitDefense={getUnitDefense(subject.slug, 1)} />,
    );
    ok(html.includes("Defend it out loud"), `${subject.slug}: defense panel rendered without its heading`);
    ok(
      html.length > 1200,
      `${subject.slug}: defense panel rendered only ${html.length} characters, which suggests a missing unit`,
    );
    renders += 1;
  } catch (error) {
    fail(`${subject.slug}: defense panel threw — ${error instanceof Error ? error.message : String(error)}`);
  }

  const work = getWrittenWork(subject.slug, 1)[0];
  if (work) {
    try {
      const html = renderToString(<WrittenExample work={work} />);
      // Compare on letters only: the first line may start with TeX, which
      // renders to markup rather than to the characters that were authored.
      const plain = html.replace(/<[^>]*>/g, " ").replace(/[^A-Za-z ]/g, " ").replace(/\s+/g, " ");
      const probe = work.example[0].replace(/\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/g, " ").replace(/[^A-Za-z ]/g, " ").replace(/\s+/g, " ").trim().slice(0, 14).trim();
      ok(probe.length < 8 || plain.includes(probe), `${work.id}: rendered example does not contain its first line ("${probe}")`);
      renders += 1;
    } catch (error) {
      fail(`${work.id}: written example threw — ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

// ── 3b. The defense is spoken by a person --------------------------------
// A defense is not an essay read out loud, and the single most common way this
// content could rot is a line that drifts into the impersonal register
// ("the test is...", "it can be shown that..."). Every unit has to contain at
// least one line the student says about themselves, and no line may open with
// the impersonal constructions that make a spoken answer sound read.
const firstPerson = /\b(i|i'm|i've|i'd|my|me|we|our)\b/i;
const essayOpening = /^(the (test|reason|evidence|answer|point|key|rule|limit|finding|distinction|weakness|assumption)|it (is|was|can|would|may|turns|appears)|there (is|are|was|were))\b/i;
let spokenLines = 0;
for (const defense of courseDefenses) {
  for (const unit of defense.units) {
    ok(unit.keep.length >= 2, `${defense.courseSlug} unit ${unit.unitNumber}: needs at least two pieces of evidence to point at`);
    ok(
      unit.question.replace(/["'”]+$/, "").trim().endsWith("?"),
      `${defense.courseSlug} unit ${unit.unitNumber}: the asked question is not a question`,
    );
    ok(unit.answer.length >= 2, `${defense.courseSlug} unit ${unit.unitNumber}: a one-line defense is a claim, not a defense`);
    ok(
      unit.answer.some((line) => firstPerson.test(line)),
      `${defense.courseSlug} unit ${unit.unitNumber}: no line is said in the first person, so the student has nothing to say as themselves`,
    );
    for (const line of unit.answer) {
      spokenLines += 1;
      const words = line.trim().split(/\s+/).length;
      ok(words <= 45, `${defense.courseSlug} unit ${unit.unitNumber}: a spoken line runs to ${words} words — too long to say in one go`);
      ok(
        !essayOpening.test(line.trim()) || firstPerson.test(line),
        `${defense.courseSlug} unit ${unit.unitNumber}: "${line.slice(0, 48)}…" opens like an essay, not like speech`,
      );
    }
  }
}

// ── 4. The shared voice assets ----------------------------------------------
ok(voiceRules.length >= 4, "voice rules: fewer than four rules");
ok(plainTerms.length >= 6, "plain terms: the glossary is too short to be useful");
for (const [group, lines] of Object.entries(defenseScript)) {
  ok(lines.length >= 3, `defense script ${group}: fewer than three sentence starters`);
  for (const line of lines) {
    ok(line.trim().split(/\s+/).length <= 45, `defense script ${group}: a starter is long enough to be an essay`);
  }
}

console.log(
  `${courses.length} courses · ${writtenWork.length} written answers · ${courseDefenses.length} course defenses · ` +
    `${courseDefenses.reduce((sum, defense) => sum + defense.units.length, 0)} unit defenses`,
);
console.log(
  `${checks} checks · ${spokenLines} spoken lines · ${mathExpressions} KaTeX expressions compiled · ${renders} panels rendered server-side`,
);

if (errors.length) {
  console.error(`\nWritten-work validation failed with ${errors.length} issue${errors.length === 1 ? "" : "s"}:`);
  for (const error of errors) console.error(`  · ${error}`);
  process.exit(1);
}

console.log("✓ Every lesson has a written answer, a defense, and the right paper.");
