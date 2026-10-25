"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scroll reveal.
 *
 * Every element marked `data-reveal` in the server HTML stays visible until
 * this script runs — the class that hides it (`reveal-ready`) is only added
 * once the observer is live, so content is never trapped invisible behind a
 * failed hydration.
 *
 * Elements already inside the viewport at scan time get `reveal-ready` and
 * `is-revealed` in the same frame: there is no starting style to transition
 * from, so they simply stay put. Only content below the fold is armed for
 * the blur-and-rise as it arrives. When an element approaches the viewport
 * the observer adds `is-revealed` and lets go.
 *
 * The pathname dependency re-scans after client-side navigation: Next
 * swaps the page content without reloading, and new sections need
 * observing.
 */
export function RevealFX() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (targets.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("reveal-ready", "is-revealed"));
      return;
    }

    const pending: HTMLElement[] = [];
    for (const el of targets) {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
      el.classList.add("reveal-ready");
      // Same-frame add for visible elements → no transition, no blink.
      if (inView) el.classList.add("is-revealed");
      else pending.push(el);
    }
    if (pending.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    pending.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
