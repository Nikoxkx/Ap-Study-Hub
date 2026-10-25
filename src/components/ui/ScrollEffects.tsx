"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SELECTOR = [
  "#main > section > .wrap > *",
  "#main > section > *",
  "#main > .wrap > *",
  "#main > .wrap-narrow > *",
  "#main .subject-scope > .wrap > *",
  "#main .study-dashboard > *",
  "footer[data-site-footer] .glass-box",
].join(", ");

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

function smoothstep(value: number): number {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
}

/**
 * Smooth, interpolated bidirectional scroll fade controller.
 *
 * Uses progressive viewport exit/entrance bands combined with frame-rate-
 * independent exponential smoothing (`lerp`) so discrete mouse-wheel ticks,
 * trackpads, and touch flicks all fade elements in and out gradually without
 * ever snapping or disappearing abruptly.
 */
export function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let targets: HTMLElement[] = [];
    const currentAlpha = new WeakMap<HTMLElement, number>();
    let rafId = 0;
    let lastTime = 0;

    function collectTargets() {
      const main = document.getElementById("main");
      if (!main) {
        targets = [];
        return;
      }

      const raw = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter(
        (el) => !el.classList.contains("wrap") && !el.hasAttribute("data-no-scroll-fade"),
      );

      // Only target leaf-most structural blocks so parent & child opacities never multiply.
      targets = raw.filter(
        (el) => !raw.some((other) => other !== el && el.contains(other)),
      );
    }

    function computeTargetAlpha(
      rect: DOMRect,
      vh: number,
      scrollY: number,
      remainingBottomScroll: number,
    ): number {
      // Top exit/re-entry zone: only fade as the element's bottom scrolls out the top
      let topAlpha = 1;
      if (scrollY > 8) {
        const topGone = 36;
        // Scale fade span nicely to element height (130px for headings up to 230px for cards)
        const fadeSpan = Math.min(230, Math.max(130, rect.height * 0.72));
        const topSolid = topGone + fadeSpan;

        if (rect.bottom <= topGone) {
          topAlpha = 0;
        } else if (rect.bottom < topSolid && rect.top < 76) {
          topAlpha = smoothstep((rect.bottom - topGone) / (topSolid - topGone));
        }
      }

      // Bottom entrance/exit zone: smooth 210px band, relaxed near page bottom so footer hits 1.0
      let bottomAlpha = 1;
      const effectiveBand = Math.min(210, Math.max(0, remainingBottomScroll + 24));
      if (effectiveBand > 8) {
        const bottomGone = vh + 16;
        const bottomSolid = vh - effectiveBand;
        if (rect.top >= bottomGone) {
          bottomAlpha = 0;
        } else if (rect.top > bottomSolid) {
          bottomAlpha = smoothstep((bottomGone - rect.top) / (bottomGone - bottomSolid));
        }
      }

      return Math.min(topAlpha, bottomAlpha);
    }

    function tick(now: number) {
      rafId = 0;
      const dt = lastTime ? Math.min(0.064, (now - lastTime) / 1000) : 0.016;
      lastTime = now;

      // Exponential smoothing factor (~220ms silky decay even on notched wheel jumps)
      const factor = 1 - Math.exp(-dt * 10.5);

      const vh = window.innerHeight || 1;
      const scrollY = window.scrollY || 0;
      const docHeight = document.documentElement.scrollHeight || vh;
      const maxScroll = Math.max(0, docHeight - vh);
      const remainingBottomScroll = Math.max(0, maxScroll - scrollY);

      let needsNextFrame = false;

      const hasFullscreen = Boolean(
        document.fullscreenElement ||
          document.querySelector('.unit-video-frame[data-expanded="true"]'),
      );

      for (let i = 0; i < targets.length; i++) {
        const el = targets[i];
        if (
          hasFullscreen ||
          el.querySelector('.unit-video-frame[data-expanded="true"], :fullscreen')
        ) {
          currentAlpha.set(el, 1);
          if (el.style.opacity !== "") el.style.opacity = "";
          continue;
        }
        const rect = el.getBoundingClientRect();
        const target = computeTargetAlpha(rect, vh, scrollY, remainingBottomScroll);
        const prev = currentAlpha.get(el);

        let next: number;
        if (prev === undefined) {
          next = target;
        } else {
          const diff = target - prev;
          if (Math.abs(diff) < 0.004) {
            next = target;
          } else {
            next = prev + diff * factor;
            needsNextFrame = true;
          }
        }

        currentAlpha.set(el, next);

        if (next >= 0.995) {
          if (el.style.opacity !== "") el.style.opacity = "";
        } else {
          el.style.opacity = next.toFixed(3);
        }
      }

      if (needsNextFrame) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        lastTime = 0;
      }
    }

    function schedule() {
      if (targets.length === 0) collectTargets();
      if (rafId === 0) {
        rafId = window.requestAnimationFrame(tick);
      }
    }

    let activated = false;

    function activateAndSchedule() {
      activated = true;
      schedule();
    }

    const initTimer = window.setTimeout(() => {
      activated = true;
      collectTargets();
      if ((window.scrollY || 0) > 2) {
        schedule();
      }
    }, 350);

    const mainEl = document.getElementById("main");
    let mutationTimer: ReturnType<typeof setTimeout> | null = null;
    const observer = mainEl
      ? new MutationObserver(() => {
          if (!activated) return;
          if (mutationTimer) clearTimeout(mutationTimer);
          mutationTimer = setTimeout(() => {
            collectTargets();
            if ((window.scrollY || 0) > 2) schedule();
          }, 80);
        })
      : null;

    if (mainEl && observer) {
      observer.observe(mainEl, { childList: true, subtree: true });
    }

    window.addEventListener("scroll", activateAndSchedule, { passive: true });
    window.addEventListener("resize", activateAndSchedule, { passive: true });

    return () => {
      window.clearTimeout(initTimer);
      if (rafId) window.cancelAnimationFrame(rafId);
      if (mutationTimer) clearTimeout(mutationTimer);
      observer?.disconnect();
      window.removeEventListener("scroll", activateAndSchedule);
      window.removeEventListener("resize", activateAndSchedule);
      for (const el of targets) {
        el.style.opacity = "";
      }
    };
  }, [pathname]);

  return null;
}

export default ScrollEffects;
