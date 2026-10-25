"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Scroll-aware floating header shell.
 *
 * Uses directional scroll hysteresis so small trackpad movements never cause
 * abrupt toggling, while steady downward scrolling melts the floating masthead
 * away smoothly and upward scrolling (or top-edge hover) fades it back in.
 */
export function SiteHeaderShell({ children }: { children: React.ReactNode }) {
  const headerRef = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);
  const hoveredRef = useRef(false);

  useEffect(() => {
    let lastY = window.scrollY || 0;
    let downTravel = 0;
    let upTravel = 0;
    let rafId = 0;

    const hasOpenPopover = () => {
      const el = headerRef.current;
      if (!el) return false;
      return Boolean(
        el.querySelector('[data-open="true"], [aria-expanded="true"], .command-backdrop'),
      );
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        const y = window.scrollY || 0;
        const delta = y - lastY;
        lastY = y;

        if (y <= 44 || hoveredRef.current || hasOpenPopover()) {
          downTravel = 0;
          upTravel = 0;
          setHidden(false);
          return;
        }

        if (delta > 0) {
          downTravel += delta;
          upTravel = 0;
          if (downTravel > 34) {
            setHidden(true);
          }
        } else if (delta < 0) {
          upTravel += -delta;
          downTravel = 0;
          if (upTravel > 16) {
            setHidden(false);
          }
        }
      });
    };

    const onKeyReveal = (event: KeyboardEvent) => {
      if (
        (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) ||
        (event.key === "/" && !event.metaKey && !event.ctrlKey)
      ) {
        setHidden(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyReveal);
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyReveal);
    };
  }, []);

  return (
    <>
      {hidden ? (
        <div
          aria-hidden="true"
          className="fixed inset-x-0 top-0 z-50 h-5"
          onPointerEnter={() => {
            hoveredRef.current = true;
            setHidden(false);
          }}
        />
      ) : null}

      <header
        ref={headerRef}
        data-site-header
        data-hidden={hidden ? "true" : "false"}
        onPointerEnter={() => {
          hoveredRef.current = true;
          if (hidden) setHidden(false);
        }}
        onPointerLeave={() => {
          hoveredRef.current = false;
        }}
        className="site-header sticky top-0 z-50 py-2.5"
      >
        {children}
      </header>
    </>
  );
}
