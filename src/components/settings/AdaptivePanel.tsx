"use client";

import { usePrefs } from "@/lib/use-prefs";
import { useAdaptiveProfile, clearAdaptive } from "@/lib/use-adaptive";
import { Note, Panel, Row, Segmented, Select, Slider, TextField, Toggle } from "./controls";
import type { PanelProps } from "./types";

const MOMENTUM_COPY: Record<string, string> = {
  new: "Nothing recorded yet — the site is showing its defaults.",
  steady: "A steady amount of activity over the past fortnight.",
  surging: "This week is well above last week.",
  returning: "Back after a break. Nothing was lost while you were away.",
  quiet: "Nothing in the last week, so personalised modules go quiet rather than inventing things.",
};

/**
 * The adaptive layer, made visible and switchable.
 *
 * The point of this panel is that a visitor can see the model. Every number the
 * site uses to personalise is printed here, in the same units the code uses, with
 * the plain-language reason next to it. If it looks wrong, the switch is right
 * there, and clearing it is one button.
 */
export function AdaptivePanel({ subjects, totals }: PanelProps) {
  const { prefs, update } = usePrefs();
  const { state, profile } = useAdaptiveProfile();
  const { adaptive } = prefs;

  const familiarOf = (slug: string | null) =>
    subjects.find((subject) => subject.slug === slug)?.familiar ?? null;

  const top = familiarOf(profile.topSubject);
  const second = familiarOf(profile.secondSubject);
  const maxScore = profile.affinity[0]?.score ?? 1;

  return (
    <>
      <Panel
        title="Adaptive layer"
        description="Small, private adjustments based on what you actually do here. Everything is computed in this browser."
        aside={
          <Toggle
            label="Adaptive layer"
            checked={adaptive.enabled}
            onChange={(checked) => update((draft) => { draft.adaptive.enabled = checked; })}
          />
        }
      >
        <Row label="Record activity" hint="Searches, videos opened, cards reviewed, practice answered.">
          <Toggle
            label="Record activity"
            checked={adaptive.recordEvents}
            disabled={!adaptive.enabled}
            onChange={(checked) => update((draft) => { draft.adaptive.recordEvents = checked; })}
          />
        </Row>
        <Row label="Personalised headline" hint="Swaps in a line about your top subject, streak, or return.">
          <Toggle
            label="Personalised headline"
            checked={adaptive.personalizedHero}
            disabled={!adaptive.enabled}
            onChange={(checked) => update((draft) => { draft.adaptive.personalizedHero = checked; })}
          />
        </Row>
        <Row label="Pop quiz" hint="One question a day, drawn from your top course.">
          <Toggle
            label="Pop quiz"
            checked={adaptive.popQuiz}
            disabled={!adaptive.enabled}
            onChange={(checked) => update((draft) => { draft.adaptive.popQuiz = checked; })}
          />
        </Row>
        <Row label="“For you” panel" hint="Streak, focus course, and the next useful step.">
          <Toggle
            label="For you panel"
            checked={adaptive.forYou}
            disabled={!adaptive.enabled}
            onChange={(checked) => update((draft) => { draft.adaptive.forYou = checked; })}
          />
        </Row>
        <Row label="This week module" hint="A rotating spotlight that closes at the end of the week.">
          <Toggle
            label="This week module"
            checked={adaptive.limitedTime}
            disabled={!adaptive.enabled}
            onChange={(checked) => update((draft) => { draft.adaptive.limitedTime = checked; })}
          />
        </Row>
        <Row label="Dynamic module order" hint="Moves the module most relevant to you towards the top.">
          <Toggle
            label="Dynamic module order"
            checked={adaptive.dynamicLayout}
            disabled={!adaptive.enabled}
            onChange={(checked) => update((draft) => { draft.adaptive.dynamicLayout = checked; })}
          />
        </Row>
        <Row label="How eager" hint="Subtle keeps personal content to one module; eager uses the whole set.">
          <Segmented
            label="Adaptive intensity"
            value={adaptive.intensity}
            onChange={(value) => update((draft) => { draft.adaptive.intensity = value; })}
            options={[
              { value: "subtle", label: "Subtle" },
              { value: "balanced", label: "Balanced" },
              { value: "eager", label: "Eager" },
            ]}
          />
        </Row>
      </Panel>

      <Panel
        title="What the model knows"
        description={`${state.events.length} events recorded on this device, out of a rolling cap of 400.`}
        aside={
          <button
            type="button"
            className="pref-mini"
            onClick={() => {
              clearAdaptive();
            }}
          >
            Forget everything
          </button>
        }
      >
        <div className="profile-grid">
          <div className="profile-stat">
            <span>{profile.signals}</span>
            <small>signals</small>
          </div>
          <div className="profile-stat">
            <span>{profile.streak}</span>
            <small>day streak</small>
          </div>
          <div className="profile-stat">
            <span>{profile.daysActive}</span>
            <small>days active</small>
          </div>
          <div className="profile-stat">
            <span>{Math.round(profile.confidence * 100)}%</span>
            <small>confidence</small>
          </div>
        </div>

        <p className="profile-line">
          <strong>Focus:</strong>{" "}
          {top ? `${top}${second ? `, then ${second}` : ""}` : "not enough activity to tell yet"}
        </p>
        <p className="profile-line">
          <strong>Momentum:</strong> {MOMENTUM_COPY[profile.momentum]}
        </p>
        <p className="profile-line">
          <strong>Usual hour:</strong>{" "}
          {profile.hour === null ? "unknown" : `${String(profile.hour).padStart(2, "0")}:00 local`}
        </p>

        {profile.affinity.length > 0 ? (
          <ul className="affinity-list">
            {profile.affinity.slice(0, 5).map((entry) => (
              <li key={entry.slug}>
                <span>{familiarOf(entry.slug) ?? entry.slug}</span>
                <span className="affinity-bar" aria-hidden="true">
                  <span style={{ width: `${Math.max(4, (entry.score / maxScore) * 100)}%` }} />
                </span>
                <span className="affinity-value">{entry.score.toFixed(1)}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {profile.recentSearches.length > 0 && prefs.privacy.rememberSearches ? (
          <p className="profile-line">
            <strong>Recent searches:</strong> {profile.recentSearches.join(" · ")}
          </p>
        ) : null}
        {profile.watchedVideos.length > 0 && prefs.privacy.rememberVideos ? (
          <p className="profile-line">
            <strong>Videos opened:</strong> {profile.watchedVideos.length} on this device
          </p>
        ) : null}

        <Note>
          Nothing here leaves the browser: no account, no endpoint, no third-party script. The profile
          is a list of counts, not a fingerprint — clearing it returns the site to defaults instantly.
        </Note>
      </Panel>

      <Panel
        title="Your details"
        description="Optional, and stored only here. Used for greetings and the daily goal — never sent anywhere."
      >
        <Row label="Name" hint="Used in a couple of adaptive lines. Leave blank to skip.">
          <TextField
            value={adaptive.displayName}
            placeholder="What should the site call you?"
            maxLength={60}
            onChange={(value) => update((draft) => { draft.adaptive.displayName = value; })}
          />
        </Row>
        <Row label="Contact" hint="Optional. A local label only — this site has no sign-in and sends nothing.">
          <div className="source-form-row">
            <Select
              value={adaptive.contactKind}
              onChange={(value) => update((draft) => { draft.adaptive.contactKind = value; })}
              options={[
                { value: "none", label: "Not set" },
                { value: "email", label: "Email" },
                { value: "phone", label: "Phone" },
              ]}
            />
            <TextField
              type={adaptive.contactKind === "phone" ? "tel" : "email"}
              value={adaptive.contact}
              placeholder={adaptive.contactKind === "phone" ? "+1 …" : "you@example.com"}
              maxLength={120}
              onChange={(value) => update((draft) => { draft.adaptive.contact = value; })}
            />
          </div>
        </Row>
        <Row label="Target exam" hint="Drives the countdown on the home page.">
          <TextField
            type="date"
            value={adaptive.examGoal}
            onChange={(value) => update((draft) => { draft.adaptive.examGoal = value; })}
          />
        </Row>
        <Row label="Daily card goal" hint={`Out of ${totals.flashcards} recall cards in the library.`}>
          <Slider
            min={5}
            max={120}
            step={5}
            value={adaptive.dailyGoalCards}
            onChange={(value) => update((draft) => { draft.adaptive.dailyGoalCards = value; })}
            format={(value) => `${value} cards`}
          />
        </Row>
        <Note>
          There is deliberately no password field here. A password you type into a page that has no
          server to verify it with would be security theatre; sign-in arrives only with a real backend
          (see the note under Privacy).
        </Note>
      </Panel>
    </>
  );
}
