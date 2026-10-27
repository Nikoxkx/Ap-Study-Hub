/**
 * Scroll-lock test.
 *
 * The site's page lock used to be `document.body.style.overflow = "hidden"`,
 * written and restored ad hoc by every overlay. Two overlays at once restored
 * each other's saved value, so a paper or a dialog could leave the page unable
 * to scroll until a reload — and on a phone the lock threw the reader back to
 * the top of the page. This asserts the replacement contract:
 *
 *   1. locking pins <body> at the current scroll offset and never discards it,
 *   2. the lock nests — two holders, one DOM lock,
 *   3. releasing restores the body's own styles and the scroll position,
 *   4. an extra release (a double-unmount) cannot unlock a live holder.
 *
 * Run with: npx tsx scripts/validate-scroll-lock.ts
 */

import { JSDOM } from "jsdom";

const failures: string[] = [];
const check = (ok: boolean, message: string) => {
  if (!ok) failures.push(message);
};

async function main() {
  const dom = new JSDOM("<!doctype html><html><body><main>content</main></body></html>", {
    url: "https://example.com/",
    pretendToBeVisual: true,
  });

  const { window } = dom;
  const globals = globalThis as unknown as Record<string, unknown>;
  globals.window = window;
  globals.document = window.document;

  // jsdom has no layout engine: pin a scroll offset and record every scrollTo.
  let scrollY = 0;
  Object.defineProperty(window, "scrollY", { get: () => scrollY, configurable: true });
  Object.defineProperty(window, "innerWidth", { value: 1200, configurable: true });
  Object.defineProperty(window.document.documentElement, "clientWidth", {
    value: 1180,
    configurable: true,
  });
  const scrollCalls: [number, number][] = [];
  window.scrollTo = ((x: number, y: number) => {
    scrollCalls.push([x, y]);
    scrollY = y;
  }) as typeof window.scrollTo;

  const { isScrollLocked, lockScroll } = await import("../src/lib/scroll-lock");

  const body = window.document.body;
  const initialStyle = body.getAttribute("style") ?? "";
  check(initialStyle === "", `body started with inline styles: ${initialStyle}`);

  // 1. Locking pins the body where the reader is.
  scrollY = 1480;
  const release = lockScroll();
  check(isScrollLocked(), "the lock does not report itself as held");
  check(body.style.position === "fixed", `body was not pinned: position=${body.style.position}`);
  check(body.style.top === "-1480px", `body top is ${body.style.top}, expected -1480px`);
  check(body.style.overflow === "hidden", "body overflow was not hidden while locked");
  check(
    body.style.paddingRight === "20px",
    `scrollbar gap not reserved: ${body.style.paddingRight}`,
  );

  // 2. A second holder takes a nested lock without touching the DOM again.
  const releaseNested = lockScroll();
  check(body.style.top === "-1480px", "the nested lock moved the pinned offset");
  releaseNested();
  check(isScrollLocked(), "the nested release dropped the outer lock");
  check(body.style.position === "fixed", "the nested release unpinned a still-locked body");

  // 3. Releasing restores the page and the reader's place.
  release();
  check(!isScrollLocked(), "the lock was not released");
  check(body.style.position === "", `body position was not restored: ${body.style.position}`);
  check(body.style.top === "", `body top was not restored: ${body.style.top}`);
  check(body.style.overflow === "", `body overflow was not restored: ${body.style.overflow}`);
  check(body.style.paddingRight === "", "the reserved scrollbar gap was left behind");
  check(
    scrollCalls.some(([, y]) => y === 1480),
    `the scroll position was not restored: ${JSON.stringify(scrollCalls)}`,
  );

  // 4. A late extra release cannot unlock somebody else's lock.
  const again = lockScroll();
  release(); // the already-released first token must be a no-op
  check(isScrollLocked(), "a stale release unlocked a live holder");
  again();
  check(!isScrollLocked(), "the lock stayed held after its real owner released it");

  if (failures.length) {
    console.error(`Scroll lock failed with ${failures.length} issue${failures.length === 1 ? "" : "s"}:`);
    for (const failure of failures) console.error(`  • ${failure}`);
    process.exit(1);
  }
  console.log("✓ Scroll lock pins the page, nests, restores the reader's position, and cannot leak.");
}

void main();
