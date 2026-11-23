"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePrefs } from "@/lib/use-prefs";
import { GlassCard } from "@/components/ui/GlassCard";
import { AppearancePanel } from "./AppearancePanel";
import { LayoutPanel } from "./LayoutPanel";
import { ContentPanel } from "./ContentPanel";
import { SourcesPanel } from "./SourcesPanel";
import { AdaptivePanel } from "./AdaptivePanel";
import { PrivacyPanel } from "./PrivacyPanel";
import { AdvancedPanel } from "./AdvancedPanel";
import { AccountPanel } from "./AccountPanel";
import type { PanelProps } from "./types";

const TABS = [
  { id: "appearance", label: "Appearance", note: "Theme, wallpaper, colours, type" },
  { id: "layout", label: "Layout", note: "Sections, order, headings" },
  { id: "content", label: "Text & elements", note: "Hero, footer, custom blocks" },
  { id: "sources", label: "Sources", note: "Your links, filed by course" },
  { id: "adaptive", label: "Adaptive", note: "What the site learns, and why" },
  { id: "account", label: "Account", note: "Optional sign-in and sync" },
  { id: "privacy", label: "Privacy & data", note: "Export, restore, erase" },
  { id: "advanced", label: "Advanced", note: "Custom CSS, reset" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function isTab(value: string | null): value is TabId {
  return TABS.some((tab) => tab.id === value);
}

function subscribeNothing() {
  return () => undefined;
}

/**
 * The tab named by the URL, if any: `?tab=sources`, or the bare `#sources`
 * anchor the site used in older links.
 *
 * Read as an external store rather than assigned from an effect so the first
 * paint is already the right panel — and so the server snapshot ("appearance")
 * stays the one everyone hydrates against.
 */
function tabFromUrl(): TabId {
  try {
    const fromQuery = new URLSearchParams(window.location.search).get("tab");
    if (isTab(fromQuery)) return fromQuery;
    const fromHash = window.location.hash.replace("#", "");
    if (isTab(fromHash)) return fromHash;
  } catch {
    // No URL access; the default tab is fine.
  }
  return "appearance";
}

/**
 * The settings shell.
 *
 * One rule shapes it: nothing is behind a "save" button. Every control writes
 * through `update`, which clones, validates, persists, and re-renders — so the
 * page you are looking at *is* the saved state, and "it did not stick" cannot
 * happen. The only explicit actions are the destructive ones (reset, erase) and
 * the custom CSS box, which is applied deliberately.
 */
export function SettingsClient({ subjects, totals }: Omit<PanelProps, "prefs" | "update">) {
  const { prefs, update, reset, hydrated, safeMode } = usePrefs();
  const urlTab = useSyncExternalStore(subscribeNothing, tabFromUrl, () => "appearance" as TabId);
  // A click wins over the URL for the rest of the visit; the URL is kept in step
  // so the address bar still describes what you are looking at.
  const [picked, setPicked] = useState<TabId | null>(null);
  const tab = picked ?? urlTab;

  // A time is only meaningful once this browser knows the time zone, so it is
  // derived rather than stored: it changes exactly when the settings do.
  // Recomputed whenever the record changes — that is the only time it is worth
  // saying anything — and deliberately not on every render.
  const savedAt = useMemo(
    () => (hydrated ? new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- prefs is the trigger, not an input
    [prefs, hydrated],
  );

  function selectTab(next: TabId) {
    setPicked(next);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", next);
      url.hash = "";
      window.history.replaceState(null, "", url);
    } catch {
      // History is a nicety; the tab still changes.
    }
  }

  const panels: Record<TabId, React.ReactNode> = {
    appearance: <AppearancePanel />,
    layout: <LayoutPanel />,
    content: <ContentPanel prefs={prefs} update={update} subjects={subjects} totals={totals} />,
    sources: <SourcesPanel prefs={prefs} update={update} subjects={subjects} totals={totals} />,
    adaptive: <AdaptivePanel prefs={prefs} update={update} subjects={subjects} totals={totals} />,
    account: <AccountPanel />,
    privacy: <PrivacyPanel />,
    advanced: <AdvancedPanel />,
  };

  return (
    <div className="settings-shell">
      <GlassCard as="header" padding="lg">
        <p className="label mb-2">Settings · stored on this device</p>
        <h1 className="settings-title">Make the hub yours.</h1>
        <p className="lede mt-3" style={{ maxWidth: "60ch" }}>
          Every colour, the wallpaper, the order of the home page, the words at the top of it, your own
          sources, and how much the site is allowed to learn from you. Changes apply as you make them —
          there is nothing to submit, and nothing leaves this browser.
        </p>
        <div className="settings-meta">
          <span>{hydrated ? (savedAt ? `Saved ${savedAt}` : "Ready") : "Loading your settings…"}</span>
          <span aria-hidden="true">·</span>
          <Link href="/settings?safe=1">Safe mode</Link>
          <span aria-hidden="true">·</span>
          <button type="button" className="pref-mini" onClick={reset}>
            Reset settings
          </button>
        </div>
        {safeMode ? (
          <p className="settings-note settings-note-warn">
            Safe mode is on for this page: your stored preferences are not being applied. Remove
            <code> ?safe=1 </code> from the URL to see them again.
          </p>
        ) : null}
      </GlassCard>

      <div className="settings-layout">
        <nav className="settings-tabs" aria-label="Settings sections">
          {TABS.map((entry) => (
            <button
              key={entry.id}
              type="button"
              aria-current={tab === entry.id ? "true" : undefined}
              className={`settings-tab${tab === entry.id ? " is-active" : ""}`}
              onClick={() => selectTab(entry.id)}
            >
              <span>{entry.label}</span>
              <small>{entry.note}</small>
            </button>
          ))}
        </nav>

        <div className="settings-panels" role="tabpanel" aria-label={TABS.find((entry) => entry.id === tab)?.label}>
          {panels[tab]}
        </div>
      </div>
    </div>
  );
}
