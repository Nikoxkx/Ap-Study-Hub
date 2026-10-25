"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { subjects } from "@/lib/subjects";
import { SubjectMark } from "./SubjectMark";
import { SiteSearch } from "./SiteSearch";
import { ThemeControl } from "./ThemeControl";
import { HamburgerButton } from "./ui/HamburgerButton";

/**
 * Unified Menu & Settings Popover.
 *
 * Houses Search, Study Desk, the compact Sun/Moon ThemeSwitch, Study & Pages,
 * and AP Classes. Smoothly reveals on hover (desktop mouse) or tap (mobile)
 * and fades away cleanly when the pointer leaves.
 */
export function MobileNav() {
  const triggerRef = useRef<HTMLLabelElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  // Close menu whenever route changes
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  // Support pressing "/" anywhere on the page to open the menu and focus search
  useEffect(() => {
    function onSlash(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        setOpen(true);
        requestAnimationFrame(() => {
          const input = panelRef.current?.querySelector<HTMLInputElement>('input[type="search"]');
          input?.focus();
        });
      }
    }
    window.addEventListener("keydown", onSlash);
    return () => window.removeEventListener("keydown", onSlash);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.querySelector("input")?.focus();
    }
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  function handlePointerEnter(event: React.PointerEvent<HTMLDivElement>) {
    clearCloseTimer();
    if (event.pointerType === "mouse") {
      setOpen(true);
    }
  }

  function handlePointerLeave(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      const active = document.activeElement;
      const searchFocused =
        active instanceof HTMLInputElement &&
        active.type === "search" &&
        panelRef.current?.contains(active) &&
        active.value.trim().length > 0;
      if (!searchFocused) {
        setOpen(false);
      }
    }, 220);
  }

  return (
    <div
      ref={rootRef}
      className="relative flex items-center"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <HamburgerButton
        buttonRef={triggerRef}
        open={open}
        onToggle={(next) => {
          clearCloseTimer();
          setOpen(next);
        }}
        ariaControls="site-settings-menu"
        label={open ? "Close menu and settings" : "Open menu and settings"}
      />

      <div
        id="site-settings-menu"
        ref={panelRef}
        aria-hidden={!open}
        data-open={open ? "true" : "false"}
        className="menu-popover glass-box absolute right-0 top-[calc(100%+0.6rem)] z-50 w-[min(23.5rem,calc(100vw-1.5rem))] p-4"
      >
        {/* Search inside the menu on all viewports */}
        <div className="mb-3.5">
          <SiteSearch label="Search notes & cards" />
        </div>

        {/* Study Desk action + compact Sun/Moon Theme Switch */}
        <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-white/65 bg-white/25 px-3.5 py-2.5 dark:border-white/20 dark:bg-white/5">
          <Link
            href="/study"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            className="btn btn-sm"
          >
            Study Desk
          </Link>
          <ThemeControl />
        </div>

        <p className="label mb-1.5">Study & Pages</p>
        <ul className="mb-3.5 grid grid-cols-2 gap-1">
          {[
            { href: "/study", label: "Study Desk" },
            { href: "/videos", label: "Unit Videos" },
            { href: "/guides", label: "Study Guides" },
            { href: "/integrations", label: "Integrations" },
            { href: "/search", label: "Full Search" },
            { href: "/about", label: "About" },
            { href: "/ai-disclosure", label: "AI Disclosure" },
            { href: "/colophon", label: "Colophon" },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-2.5 py-1.5 text-[0.84rem] font-medium no-underline transition-colors hover:bg-white/45 dark:hover:bg-white/10"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="label mb-1.5">AP Classes</p>
        <ul className="grid grid-cols-2 gap-1">
          {subjects.map((subject) => (
            <li key={subject.slug}>
              <Link
                href={`/course/${subject.slug}`}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className="group flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-[0.84rem] font-medium no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/55 dark:hover:bg-white/12"
              >
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/75 bg-white/45 transition-transform duration-200 group-hover:scale-110 dark:border-white/20 dark:bg-white/10">
                  <SubjectMark
                    subject={subject.mark}
                    size={15}
                    label={subject.symbolLabel}
                    className="shrink-0"
                  />
                </span>
                <span className="truncate">{subject.familiar}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
