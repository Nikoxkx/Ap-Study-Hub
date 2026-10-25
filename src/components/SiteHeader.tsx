import Link from "next/link";
import { SiteMark } from "./SubjectMark";
import { MobileNav } from "./MobileNav";
import { CommandPalette } from "./CommandPalette";
import { TopClassBar } from "./TopClassBar";
import { SiteHeaderShell } from "./SiteHeaderShell";
import { getNavigationCommands } from "@/lib/navigation";

/**
 * Single-row Floating Transparent Masthead.
 *
 * Keeps the AP Study Hub logo pill, the hover-reveal AP Classes bar, Jump to ⌘K,
 * and the compact Hamburger Menu button on one strictly leveled horizontal line.
 * Search and Study Desk live cleanly inside the Menu popover.
 */
export function SiteHeader() {
  const commands = getNavigationCommands();

  return (
    <SiteHeaderShell>
      <div className="wrap flex min-h-[2.375rem] items-center justify-between gap-2.5">
        {/* Left: Universal animated square logo + site title */}
        <Link
          href="/"
          className="header-brand-pill glass-box inline-flex h-[2.375rem] shrink-0 items-center gap-2 px-3.5 no-underline"
          style={{ borderRadius: "999px" }}
          aria-label="AP Study Hub — home"
        >
          <SiteMark size={22} />
          <span
            className="text-[0.95rem] font-semibold leading-none tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            AP&nbsp;Study&nbsp;Hub
          </span>
        </Link>

        {/* Center: Leveled AP Classes bar (hover-reveal on desktop, tap sheet on mobile) */}
        <div className="flex min-w-0 flex-1 items-center justify-center">
          <TopClassBar />
        </div>

        {/* Right: Leveled CommandPalette trigger + compact Hamburger Menu */}
        <div className="flex shrink-0 items-center gap-2">
          <CommandPalette commands={commands} />
          <MobileNav />
        </div>
      </div>
    </SiteHeaderShell>
  );
}
