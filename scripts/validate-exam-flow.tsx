/**
 * Exam-flow test: click through every paper the way a student does.
 *
 * The exam room is a client component tree with a portal, three phases, and a
 * clock, so the renderer checks in `validate-exam-ui` cannot reach past the
 * briefing — which is how "Finish section" once left the student on a blank
 * screen: the room unmounted, and the break and the score report were returned
 * into the page flow under a locked scroll.
 *
 * This mounts the real component in jsdom, presses the real buttons, and
 * asserts that whatever comes next actually fills a full-screen surface with
 * content: the briefing, each section, every break, the answer sheet, and the
 * final score report — for all ten courses.
 *
 * Run with: npx tsx scripts/validate-exam-flow.tsx
 */

import { JSDOM } from "jsdom";
import { act } from "react";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { TimedPaper } from "../src/components/exam/TimedPaper";
import { getAssessment } from "../src/lib/exams";
import { subjects } from "../src/lib/subjects";

async function main() {
  const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
    url: "https://ap-study-hub.test/course/ap-lit/exam",
    pretendToBeVisual: true,
  });
  const { window } = dom;

  const globals = globalThis as unknown as Record<string, unknown>;
  globals.window = window;
  globals.self = window;
  globals.document = window.document;
  Object.defineProperty(globals, "navigator", { value: window.navigator, configurable: true });
  globals.HTMLElement = window.HTMLElement;
  globals.Element = window.Element;
  globals.Node = window.Node;
  globals.Event = window.Event;
  globals.MouseEvent = window.MouseEvent;
  globals.KeyboardEvent = window.KeyboardEvent;
  globals.localStorage = window.localStorage;
  globals.requestAnimationFrame = (callback: FrameRequestCallback) =>
    setTimeout(() => callback(Date.now()), 0) as unknown as number;
  globals.cancelAnimationFrame = (id: number) => clearTimeout(id);
  globals.IS_REACT_ACT_ENVIRONMENT = true;
  // jsdom has no layout engine; scrolling is not what this test is about.
  window.scrollTo = (() => undefined) as unknown as typeof window.scrollTo;

  const failures: string[] = [];
  const fail = (message: string) => failures.push(message);

  const text = (selector: string) =>
    (window.document.querySelector(selector)?.textContent ?? "").replace(/\s+/g, " ").trim();

  async function clickStartingWith(label: string): Promise<boolean> {
    const target = [...window.document.querySelectorAll("button")].find((button) =>
      (button.textContent ?? "").trim().toLowerCase().startsWith(label.toLowerCase()),
    );
    if (!target) return false;
    await act(async () => {
      target.dispatchEvent(new window.MouseEvent("click", { bubbles: true }));
    });
    return true;
  }

  const counts = () => ({
    room: window.document.querySelectorAll(".exam-room").length,
    stage: window.document.querySelectorAll(".exam-stage").length,
    briefing: window.document.querySelectorAll(".exam-briefing").length,
    break: window.document.querySelectorAll(".exam-break").length,
    report: window.document.querySelectorAll(".score-report").length,
  });

  let checked = 0;
  for (const subject of subjects) {
    const assessment = getAssessment(subject.slug);
    if (!assessment) continue;
    window.localStorage.clear();
    const host = window.document.getElementById("root") as HTMLElement;
    host.innerHTML = "";
    const root = createRoot(host);
    await act(async () => {
      root.render(
        createElement(TimedPaper, {
          assessment,
          courseSlug: subject.slug,
          courseLabel: subject.familiar,
        }) as never,
      );
    });

    if (!counts().briefing) fail(`${subject.slug}: the paper did not open on the briefing`);
    if (!(await clickStartingWith("Start the clock"))) fail(`${subject.slug}: no start button`);
    if (!counts().room) fail(`${subject.slug}: the room did not open`);
    else if (text(".exam-room").length < 200) fail(`${subject.slug}: the room opened empty`);

    for (let step = 0; step < 16; step += 1) {
      const state = counts();
      if (state.report) break;
      if (state.break) {
        if (!state.stage) fail(`${subject.slug}: the break is not on the full-screen stage`);
        if (text(".exam-stage").length < 100) fail(`${subject.slug}: the break rendered blank`);
        if (!(await clickStartingWith("Continue to section"))) fail(`${subject.slug}: no continue button on the break`);
        continue;
      }
      const finished = (await clickStartingWith("Finish section")) || (await clickStartingWith("Finish paper"));
      if (!finished) {
        fail(`${subject.slug}: no finish button while sitting`);
        break;
      }
    }

    const end = counts();
    if (!end.report) fail(`${subject.slug}: never reached the score report`);
    else if (!end.stage) fail(`${subject.slug}: the score report is not on the full-screen stage`);
    else if (text(".exam-stage").length < 400) fail(`${subject.slug}: the score report rendered blank`);

    checked += 1;
    await act(async () => root.unmount());
  }

  if (failures.length) {
    console.error(`Exam flow failed with ${failures.length} issue${failures.length === 1 ? "" : "s"}:`);
    for (const failure of failures) console.error(`  • ${failure}`);
    process.exit(1);
  }
  console.log(`✓ ${checked} papers run from briefing to score report, with every break and section in between.`);
}

void main();
