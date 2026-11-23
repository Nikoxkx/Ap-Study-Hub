"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAuth } from "@/lib/use-auth";
import { useStudyState } from "@/lib/use-study-state";
import { useAdaptiveProfile } from "@/lib/use-adaptive";
import { localStats } from "@/lib/account-stats";
import { MAX_AVATAR_BYTES } from "@/lib/supabase";
import { SignInPanel } from "@/components/account/SignInPanel";
import { PermissionsCard } from "@/components/account/PermissionsCard";
import { AuthReturnNotice } from "@/components/account/AuthReturnNotice";

export interface AccountSubject {
  slug: string;
  familiar: string;
  official: string;
  units: number;
}

/**
 * `/account` — the optional half of the site.
 *
 * The rule for this page is that a visitor who does not want an account should
 * never be asked twice: the sign-in form is one card, it says what it stores,
 * and every other panel keeps working without it.
 *
 * Signed in, it shows the four synced counts beside the local ones — the point
 * of this feature is per-user stats, so the page has to be honest about which
 * numbers are local and which are on a server.
 */
export function AccountClient({ subjects }: { subjects: AccountSubject[] }) {
  const auth = useAuth();
  const [study] = useStudyState();
  const { profile: adaptive } = useAdaptiveProfile();
  const local = useMemo(() => localStats(study, adaptive), [study, adaptive]);

  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);

  const [name, setName] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState("");

  const displayName = auth.profile?.displayName ?? "";
  const nameValue = name ?? displayName;

  const tailored = useMemo(() => {
    const ranked = [...adaptive.affinity]
      .filter((entry) => subjects.some((subject) => subject.slug === entry.slug))
      .slice(0, 3)
      .map((entry) => {
        const subject = subjects.find((candidate) => candidate.slug === entry.slug);
        return subject ? { subject, score: entry.score } : null;
      })
      .filter((entry): entry is { subject: AccountSubject; score: number } => entry !== null);

    if (ranked.length > 0) return ranked;
    return subjects.slice(0, 3).map((subject) => ({ subject, score: 0 }));
  }, [adaptive.affinity, subjects]);

  async function saveName() {
    setBusy(true);
    const result = await auth.saveProfile(nameValue);
    setFeedback({ ok: result.ok, text: result.message });
    if (result.ok) setName(null);
    setBusy(false);
  }

  async function onAvatar(file: File) {
    setAvatarError("");
    setBusy(true);
    const result = await auth.uploadAvatar(file);
    if (!result.ok) setAvatarError(result.message);
    else setFeedback({ ok: true, text: result.message });
    setBusy(false);
  }

  async function pushStats() {
    setBusy(true);
    const result = await auth.pushStats({
      cardsReviewed: local.cardsReviewed,
      questionsAnswered: local.questionsAnswered,
      minutes: local.minutes,
      streak: local.streak,
      affinity: local.affinity,
    });
    setFeedback({ ok: result.ok, text: result.message });
    setBusy(false);
  }

  return (
    <div className="account-shell">
      <GlassCard as="header" id="account-top" padding="lg">
        <p className="label mb-2">Account · optional · never required</p>
        <h1 className="settings-title">Sign in only if it helps you.</h1>
        <p className="lede mt-3" style={{ maxWidth: "62ch" }}>
          Every lesson, card, question, paper, and video works signed out, and always will. An account
          exists for two things: your own photo and name on this page, and a copy of four study counts
          that follows you to another device. Nothing else is uploaded.
        </p>
        <div className="settings-meta">
          <span>
            {auth.configured
              ? "Email or phone · one-time code · no password"
              : "Sign-in is not configured on this deployment"}
          </span>
          <span aria-hidden="true">·</span>
          <Link href="/privacy">What leaves the browser</Link>
          <span aria-hidden="true">·</span>
          <Link href="/settings?tab=account">Account settings</Link>
        </div>
      </GlassCard>

      {/* An expired link or a refused consent often lands here rather than on
          /login, because that is where the request came from. */}
      <AuthReturnNotice />

      {!auth.configured ? <UnconfiguredCard /> : null}

      {auth.configured && auth.status === "loading" ? (
        <GlassCard padding="lg">
          <p className="label">Checking for a saved session…</p>
        </GlassCard>
      ) : null}

      {auth.configured && auth.status === "signed-out" ? (
        <GlassCard as="section" padding="lg" aria-labelledby="signin-heading">
          <p className="label mb-2">Sign in</p>
          <h2 id="signin-heading" className="settings-panel-title">
            Google in one tap, or a one-time code
          </h2>
          <p className="settings-panel-note">
            The full window lives at{" "}
            <Link href="/login" className="link-underlined">
              /login
            </Link>{" "}
            — same flow, one address you can bookmark.
          </p>
          <SignInPanel next="/account" variant="inline" />
        </GlassCard>
      ) : null}

      {auth.configured && auth.status === "signed-in" ? (
        <>
          {/* First thing after signing in: what was granted, and the one
              browser-side permission worth asking for. Both are optional. */}
          <PermissionsCard signedIn />
          <GlassCard as="section" padding="lg" aria-labelledby="profile-heading">
            <div className="account-profile">
              <div className="account-avatar">
                {auth.profile?.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- a Supabase Storage public URL you uploaded
                  <img src={auth.profile.avatarUrl} alt="" width={96} height={96} />
                ) : (
                  <span aria-hidden="true">{(displayName || "?").slice(0, 1).toUpperCase()}</span>
                )}
              </div>
              <div className="account-profile-body">
                <p className="label mb-1">Profile</p>
                <h2 id="profile-heading" className="settings-panel-title">
                  {displayName || "No name yet"}
                </h2>
                <p className="settings-panel-note">Signed in as {auth.maskedContact}</p>

                <div className="account-form-row">
                  <input
                    className="field"
                    value={nameValue}
                    maxLength={60}
                    placeholder="What should this page call you?"
                    aria-label="Display name"
                    onChange={(event) => setName(event.target.value)}
                  />
                  <button type="button" className="btn" onClick={saveName} disabled={busy}>
                    Save name
                  </button>
                </div>

                <div className="account-form-row">
                  <label className="account-file">
                    <span>{busy ? "Working…" : "Choose a photo"}</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) void onAvatar(file);
                        event.target.value = "";
                      }}
                    />
                  </label>
                  {auth.profile?.avatarUrl ? (
                    <button
                      type="button"
                      className="pref-mini"
                      onClick={() => void auth.removeAvatar()}
                      disabled={busy}
                    >
                      Remove photo
                    </button>
                  ) : null}
                  <span className="adaptive-meta">
                    PNG, JPEG, WebP, GIF or iPhone HEIC · under{" "}
                    {Math.round(MAX_AVATAR_BYTES / 1024 / 1024)} MB · converted on this device
                  </span>
                </div>
                {avatarError ? <p className="settings-error">{avatarError}</p> : null}
                {feedback ? (
                  <p className={`settings-note ${feedback.ok ? "settings-note-good" : "settings-note-warn"}`}>
                    {feedback.text}
                  </p>
                ) : null}
              </div>
            </div>
          </GlassCard>

          <GlassCard as="section" padding="lg" aria-labelledby="stats-heading">
            <div className="settings-panel-head">
              <div>
                <p className="label mb-1">Stats</p>
                <h2 id="stats-heading" className="settings-panel-title">
                  On this device, and on your account
                </h2>
                <p className="settings-panel-note">
                  Your browser counts everything. The account only ever receives the five numbers in
                  the right-hand column, when you press the button — never which card, question, or
                  answer.
                </p>
              </div>
              <button type="button" className="btn" onClick={pushStats} disabled={busy}>
                {busy ? "Saving…" : "Save today's counts"}
              </button>
            </div>

            <div className="account-stats">
              <div>
                <p className="label mb-2">This browser</p>
                <dl className="account-stat-list">
                  <div>
                    <dt>Cards reviewed</dt>
                    <dd>{local.cardsReviewed}</dd>
                  </div>
                  <div>
                    <dt>Practice answered</dt>
                    <dd>{local.questionsAnswered}</dd>
                  </div>
                  <div>
                    <dt>Focus minutes</dt>
                    <dd>{local.minutes}</dd>
                  </div>
                  <div>
                    <dt>Day streak</dt>
                    <dd>{local.streak}</dd>
                  </div>
                  <div>
                    <dt>Days active</dt>
                    <dd>{local.daysActive}</dd>
                  </div>
                </dl>
              </div>
              <div>
                <p className="label mb-2">On your account</p>
                {auth.cloudStats ? (
                  <dl className="account-stat-list">
                    <div>
                      <dt>Cards reviewed</dt>
                      <dd>{auth.cloudStats.cardsReviewed}</dd>
                    </div>
                    <div>
                      <dt>Practice answered</dt>
                      <dd>{auth.cloudStats.questionsAnswered}</dd>
                    </div>
                    <div>
                      <dt>Focus minutes</dt>
                      <dd>{auth.cloudStats.minutes}</dd>
                    </div>
                    <div>
                      <dt>Day streak</dt>
                      <dd>{auth.cloudStats.streak}</dd>
                    </div>
                    <div>
                      <dt>Last saved</dt>
                      <dd>
                        {auth.cloudStats.lastActive
                          ? new Date(auth.cloudStats.lastActive).toLocaleDateString()
                          : "—"}
                      </dd>
                    </div>
                  </dl>
                ) : (
                  <p className="settings-note">
                    Nothing has been saved to the account yet. Press <strong>Save today&rsquo;s counts</strong>{" "}
                    to start.
                  </p>
                )}
              </div>
            </div>
          </GlassCard>

          <GlassCard as="section" padding="lg" aria-labelledby="tailored-heading">
            <p className="label mb-1">Tailored</p>
            <h2 id="tailored-heading" className="settings-panel-title">
              Where to go next
            </h2>
            <p className="settings-panel-note">
              Built from what this browser has actually opened — the same local profile the home page
              uses. Signed out, this list still appears; it just does not follow you between devices.
            </p>
            <ul className="account-lessons">
              {tailored.map(({ subject, score }, index) => (
                <li key={subject.slug}>
                  <div>
                    <p className="account-lesson-title">
                      {index === 0 ? "Start here · " : ""}
                      {subject.familiar}
                    </p>
                    <p className="account-lesson-note">
                      {subject.units} lessons · {subject.official}
                      {score > 0 ? ` · affinity ${score.toFixed(1)}` : ""}
                    </p>
                  </div>
                  <div className="account-lesson-links">
                    <Link href={`/course/${subject.slug}/notes`} className="pref-mini">
                      Lessons
                    </Link>
                    <Link href={`/course/${subject.slug}/practice`} className="pref-mini">
                      Practice
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard as="section" padding="lg" aria-labelledby="session-heading">
            <p className="label mb-1">Session</p>
            <h2 id="session-heading" className="settings-panel-title">
              Leave whenever you like
            </h2>
            <div className="privacy-actions">
              <button type="button" className="btn btn-quiet" onClick={() => void auth.signOut()}>
                Sign out
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={async () => {
                  const result = await auth.deleteCloudData();
                  setFeedback({ ok: result.ok, text: result.message });
                }}
              >
                Delete the cloud copy
              </button>
              <Link href="/settings?tab=privacy" className="pref-mini">
                Export or erase local data
              </Link>
            </div>
            <p className="settings-note">
              Deleting the cloud copy removes the name, photo, and counts held by Supabase. It does not
              touch this browser — local study data is erased separately, from Settings → Privacy &amp;
              data.
            </p>
          </GlassCard>
        </>
      ) : null}
    </div>
  );
}

function UnconfiguredCard() {
  return (
    <GlassCard as="section" padding="lg" aria-labelledby="unconfigured-heading">
      <p className="label mb-2">Not configured</p>
      <h2 id="unconfigured-heading" className="settings-panel-title">
        This deployment has no account server
      </h2>
      <p className="settings-panel-note">
        Nothing here is broken and nothing is missing from your study: the whole site is local-first.
        Accounts light up when <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
        <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> are set at build time, the migration in{" "}
        <code>supabase/migrations</code> has been applied, and the <code>avatars</code> bucket exists.
        <code> SUPABASE_AUTH.md </code> has the three steps.
      </p>
      <div className="privacy-actions">
        <Link href="/settings" className="btn">
          Back to settings
        </Link>
        <Link href="/study" className="btn btn-quiet">
          Open your study desk
        </Link>
      </div>
      <p className="settings-note">
        The code is shipped and tested; the switch is deployment configuration. That is deliberate —
        a login page that pretends to work is worse than no login page.
      </p>
    </GlassCard>
  );
}
