"use client";

import { useEffect } from "react";

/**
 * One shared, reference-counted page scroll lock.
 *
 * Locking the page by writing `document.body.style.overflow = "hidden"` looks
 * harmless and is wrong in two ways that this module exists to fix:
 *
 *   1. **It leaks.** Two components locking at once each restore "the value
 *      they found", so a lock can be written back after it was released. The
 *      exam room did exactly this with two overlapping effects: leaving a paper
 *      could leave `overflow: hidden` on <body> forever, and the page under it
 *      simply stopped scrolling — on a phone this reads as a frozen site.
 *   2. **It jumps on iOS.** Mobile Safari discards the scroll position when
 *      <body> stops scrolling, so opening a dialog scrolled halfway down a page
 *      threw the reader back to the top, and closing it left them there.
 *
 * The lock therefore pins the body in place (`position: fixed` at a negative
 * top offset) and puts the document back exactly where it was on release. The
 * scrollbar's width is reserved so the page does not shift sideways on desktop.
 * Locks nest: only the outermost one touches the DOM, and the last release
 * restores the page.
 */

type SavedStyle = {
  position: string;
  top: string;
  left: string;
  right: string;
  width: string;
  overflow: string;
  paddingRight: string;
};

let depth = 0;
let saved: SavedStyle | null = null;
let savedY = 0;

function lock(): void {
  if (typeof document === "undefined") return;
  const body = document.body;
  if (!body) return;

  const html = document.documentElement;
  savedY = window.scrollY || html.scrollTop || 0;
  saved = {
    position: body.style.position,
    top: body.style.top,
    left: body.style.left,
    right: body.style.right,
    width: body.style.width,
    overflow: body.style.overflow,
    paddingRight: body.style.paddingRight,
  };

  const scrollbar = window.innerWidth - html.clientWidth;
  if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

  body.style.position = "fixed";
  body.style.top = `-${savedY}px`;
  body.style.left = "0";
  body.style.right = "0";
  body.style.width = "100%";
  body.style.overflow = "hidden";
}

function unlock(): void {
  if (typeof document === "undefined") return;
  const body = document.body;
  const previous = saved;
  const y = savedY;
  saved = null;
  if (!body || !previous) return;

  body.style.position = previous.position;
  body.style.top = previous.top;
  body.style.left = previous.left;
  body.style.right = previous.right;
  body.style.width = previous.width;
  body.style.overflow = previous.overflow;
  body.style.paddingRight = previous.paddingRight;

  // Put the reader back exactly where they were. `scrollTo` is deliberately
  // instant: a smooth scroll here would read as the page drifting on its own.
  window.scrollTo(0, y);
}

/** Takes the lock; the returned release function is safe to call more than once. */
export function lockScroll(): () => void {
  depth += 1;
  if (depth === 1) lock();
  let released = false;
  return () => {
    if (released) return;
    released = true;
    depth = Math.max(0, depth - 1);
    if (depth === 0) unlock();
  };
}

/**
 * Holds the page still while `active`, and releases it on unmount.
 *
 * The effect's cleanup runs even if the owning component is torn down by a
 * navigation or an error boundary, so a lock can no longer outlive the surface
 * that asked for it.
 */
export function useScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    return lockScroll();
  }, [active]);
}

/** True while the page is locked — asserted by validate:exam-flow. */
export function isScrollLocked(): boolean {
  return depth > 0;
}
