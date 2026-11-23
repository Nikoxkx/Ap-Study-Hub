"use client";

import { useMemo } from "react";
import { SiteMark } from "@/components/SubjectMark";
import { usePrefs } from "@/lib/use-prefs";
import { useAdaptiveProfile } from "@/lib/use-adaptive";
import { chooseHero } from "@/lib/adaptive";
import type { SettingsSubject, SettingsTotals } from "@/components/settings/types";

/**
 * The headline block.
 *
 * Precedence is explicit and boring, which is what makes it trustworthy:
 *
 *   1. Words the visitor typed in /settings.
 *   2. An adaptive line, if they left the switch on and there is enough activity
 *      for the line to be true (the module refuses to guess from one click).
 *   3. The shipped headline.
 *
 * The server renders (3); this component upgrades to (2) or (1) after mount. That
 * is one small re-render rather than a hydration mismatch, and it means the
 * static HTML stays identical for crawlers and for anyone who never signs in to
 * their own browser.
 */
export function AdaptiveHero({
  defaults,
  totals,
  subjects,
}: {
  defaults: { badge: string; title: string; subtitle: string };
  totals: SettingsTotals;
  subjects: SettingsSubject[];
}) {
  const { prefs } = usePrefs();
  const { profile } = useAdaptiveProfile();

  const familiarOf = useMemo(() => {
    const map = new Map(subjects.map((subject) => [subject.slug, subject.familiar]));
    return (slug: string) => map.get(slug) ?? slug;
  }, [subjects]);

  const adaptiveCopy = useMemo(
    () => chooseHero(profile, { prefs, totals, familiarOf }),
    [profile, prefs, totals, familiarOf],
  );

  const badge = prefs.content.heroBadge || adaptiveCopy.badge || defaults.badge;
  const title = prefs.content.heroTitle || adaptiveCopy.title || defaults.title;
  const subtitle = prefs.content.heroSubtitle || adaptiveCopy.subtitle || defaults.subtitle;

  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
      <div className="tag mb-6 px-3.5 py-1.5">
        <SiteMark size={18} />
        <span>{badge}</span>
      </div>

      <h1
        className="canvas-heading text-[clamp(2.25rem,1.5rem+3.4vw,4.25rem)] font-semibold"
        style={{ letterSpacing: "-0.032em", lineHeight: 1.04 }}
      >
        {title}
      </h1>

      <p className="canvas-subtext mt-6 max-w-2xl text-[clamp(1.05rem,0.96rem+0.45vw,1.25rem)] leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}
