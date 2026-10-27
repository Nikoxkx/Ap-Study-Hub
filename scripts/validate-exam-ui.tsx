/**
 * Exam UI smoke test.
 *
 * The exam room is a client component tree, so a broken prop shape or an
 * undefined array does not fail the type checker — it fails in the browser, in
 * front of a student, mid-paper. This renders the hub, the guided walkthrough,
 * and an empty score report for all ten courses with React's server renderer,
 * which executes every branch that does not depend on interaction.
 *
 * It is not a substitute for clicking through the room; it is the cheapest way
 * to know that all ten papers mount without throwing.
 *
 * Run with: npx tsx scripts/validate-exam-ui.tsx
 */

import { renderToString } from "react-dom/server";
import { ExamHub } from "../src/components/exam/ExamHub";
import { ScoreReport } from "../src/components/exam/ScoreReport";
import { GuidedWalkthrough } from "../src/components/exam/GuidedWalkthrough";
import { TimedPaper } from "../src/components/exam/TimedPaper";
import { getAssessment } from "../src/lib/exams";
import { subjects } from "../src/lib/subjects";

let failures = 0;
let renders = 0;
for (const subject of subjects) {
  const assessment = getAssessment(subject.slug);
  if (!assessment) {
    console.log("no assessment", subject.slug);
    continue;
  }
  const label = subject.familiar;
  const attempts: [string, () => string][] = [
    ["hub", () => renderToString(<ExamHub assessment={assessment} courseSlug={subject.slug} courseLabel={label} />)],
    ["guided", () => renderToString(<GuidedWalkthrough assessment={assessment} courseSlug={subject.slug} courseLabel={label} />)],
    [
      // The sitting view is the one that has to open when the button is
      // clicked, so it is rendered here rather than left to a browser check.
      "room",
      () =>
        renderToString(
          <TimedPaper
            assessment={assessment}
            courseSlug={subject.slug}
            courseLabel={label}
            startInRoom
          />,
        ),
    ],
    [
      "report",
      () =>
        renderToString(
          <ScoreReport
            assessment={assessment}
            courseSlug={subject.slug}
            courseLabel={label}
            mcqAnswers={{}}
            flags={{}}
            frqScores={{}}
            drafts={{}}
            elapsedBySection={{}}
            onFrqScore={() => undefined}
            onRetake={() => undefined}
          />,
        ),
    ],
  ];
  for (const [name, run] of attempts) {
    try {
      const html = run();
      renders += 1;
      if (html.length < 400) throw new Error(`rendered only ${html.length} characters`);
      if (name === "room" && !html.includes("exam-room") && !html.includes("question")) {
        throw new Error("the sitting view rendered no exam room markup");
      }
      console.log(`  ✓ ${subject.slug.padEnd(11)} ${name.padEnd(6)} ${html.length.toLocaleString()} characters of markup`);
    } catch (error) {
      failures += 1;
      console.error(`  ✗ ${subject.slug} ${name}:`, error instanceof Error ? error.message : error);
    }
  }
}
if (failures) {
  console.error(`\n✗ ${failures} exam view${failures === 1 ? "" : "s"} failed to render.`);
  process.exit(1);
}
console.log(`\n✓ ${renders} exam views render across ten courses: hub, guided walkthrough, exam room, and score report.\n`);
