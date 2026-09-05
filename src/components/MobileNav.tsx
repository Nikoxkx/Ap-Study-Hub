"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { subjects } from "@/lib/subjects";
import { SiteSearch } from "./SiteSearch";
import { ThemeControl } from "./ThemeControl";

/**
 * Mobile navigation.
 *
 * A disclosure, not a modal: it pushes the page down rather than trapping focus
 * over it, which is the lighter and less breakable of the two patterns at this
 * size. Escape closes it, focus returns to the trigger, and the panel closes on
 * navigation — the three things this kind of menu usually forgets.
 */

export function MobileNav() {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Rather than holding a boolean and closing it from an effect that watches
  // the route, hold the route the menu was opened on and derive "open" from
  // whether that is still where we are. Following a link changes the pathname,
  // which closes the menu during the same render — no effect, no flash of the
  // panel still being open over the new page.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt !== null && openedAt === pathname;

  const setOpen = (next: boolean) => setOpenedAt(next ? pathname : null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      // setOpenedAt rather than the setOpen wrapper: the wrapper closes over
      // `pathname` and would make this effect re-subscribe on every navigation
      // for no reason. Closing is unconditional, so it needs neither.
      setOpenedAt(null);
      triggerRef.current?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Move focus into the panel when it opens so keyboard users are not left
  // behind the trigger.
  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLElement>("input, a")?.focus();
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        className="btn btn-outline btn-sm"
      >
        <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14">
          <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            {open ? (
              <>
                <path d="M3.5 3.5l9 9" />
                <path d="M12.5 3.5l-9 9" />
              </>
            ) : (
              <>
                <path d="M2 4.5h12" />
                <path d="M2 8h12" />
                <path d="M2 11.5h12" />
              </>
            )}
          </g>
        </svg>
        {open ? "Close" : "Menu"}
      </button>

      {open ? (
        <div
          id="mobile-nav-panel"
          ref={panelRef}
          className="absolute left-0 right-0 top-full rule-bottom enter-fade"
          style={{ background: "var(--paper-raised)", borderTop: "1px solid var(--rule)" }}
        >
          <div className="wrap py-4">
            <div className="mb-4">
              <SiteSearch />
            </div>

            <p className="label mb-2">Courses</p>
            <ul className="mb-4 grid grid-cols-2 gap-x-4">
              {subjects.map((subject) => (
                <li key={subject.slug} style={{ borderBottom: "1px solid var(--rule)" }}>
                  <Link
                    href={`/course/${subject.slug}`}
                    className="flex items-center gap-2 py-2.5 text-[0.875rem] font-medium no-underline"
                  >
                    <span
                      aria-hidden="true"
                      className="h-[7px] w-[7px] shrink-0"
                      style={{ background: subject.ink, borderRadius: 1 }}
                    />
                    {subject.familiar}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="label mb-2">Elsewhere</p>
            <ul className="mb-4 grid grid-cols-2 gap-x-4">
              {[
                { href: "/guides", label: "Study guides" },
                { href: "/about", label: "About" },
                { href: "/search", label: "Search" },
                { href: "/colophon", label: "Colophon" },
              ].map((item) => (
                <li key={item.href} style={{ borderBottom: "1px solid var(--rule)" }}>
                  <Link href={item.href} className="block py-2.5 text-[0.875rem] font-medium no-underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ThemeControl />
          </div>
        </div>
      ) : null}
    </div>
  );
}
