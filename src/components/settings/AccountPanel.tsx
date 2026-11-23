"use client";

import Link from "next/link";
import { useAuth } from "@/lib/use-auth";
import { Note, Panel, Row } from "./controls";

/**
 * The account tab in settings.
 *
 * It is an explanation first and a control second. The only things worth doing
 * here are reading what is synced, signing out, and removing the cloud copy —
 * the profile itself is edited on `/account`, where the photo and the stats can
 * be seen side by side.
 */
export function AccountPanel() {
  const auth = useAuth();

  if (!auth.configured) {
    return (
      <Panel
        title="Account"
        description="Optional, and switched off on this deployment."
        aside={<span className="pref-badge">off</span>}
      >
        <Note>
          This build has no Supabase URL and key, so there is no sign-in, no photo upload, and no
          server-side stats. Every other setting on this page works, and the site stays entirely
          local. To turn accounts on, follow <code>SUPABASE_AUTH.md</code>.
        </Note>
        <p className="settings-note">
          There is deliberately no password field anywhere in this app: sign-in is a one-time code by
          email or text, so a lookalike page has nothing useful to steal.
        </p>
      </Panel>
    );
  }

  if (auth.status === "loading") {
    return (
      <Panel title="Account" description="Optional sign-in">
        <Note>Checking for a saved session…</Note>
      </Panel>
    );
  }

  if (auth.status === "signed-out") {
    return (
      <Panel
        title="Account"
        description="You are not signed in — which changes nothing about the site."
        aside={<span className="pref-badge">signed out</span>}
      >
        <Row label="Sign in" hint="Google in one tap, or a one-time code. No password exists.">
          <Link href="/login" className="btn">
            Open the sign-in window
          </Link>
        </Row>
        <Note>
          An account stores a display name, a photo, and five coarse study counts (cards reviewed,
          practice answered, focus minutes, streak, last active). No lesson, answer, or draft is ever
          uploaded.
        </Note>
      </Panel>
    );
  }

  return (
    <>
      <Panel
        title="Account"
        description={`Signed in as ${auth.maskedContact}.`}
        aside={<span className="pref-badge">signed in</span>}
      >
        <Row label="Profile" hint="Display name, photo, and the counts saved to your account.">
          <Link href="/account" className="btn">
            Open the account page
          </Link>
        </Row>
        <Row label="Session" hint="Signing out clears this browser's copy of the session.">
          <button type="button" className="pref-mini" onClick={() => void auth.signOut()}>
            Sign out
          </button>
        </Row>
      </Panel>

      <Panel
        title="Cloud copy"
        description="The rows Supabase holds for this account."
        aside={
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => void auth.deleteCloudData()}
          >
            Delete cloud copy
          </button>
        }
      >
        <Row label="Name" hint="Shown on /account only.">
          <span className="pref-count">{auth.profile?.displayName || "not set"}</span>
        </Row>
        <Row label="Photo" hint="Stored in the avatars bucket, public URL.">
          <span className="pref-count">{auth.profile?.avatarUrl ? "set" : "not set"}</span>
        </Row>
        <Row label="Counts" hint="Cards, practice, minutes, streak, last active.">
          <span className="pref-count">
            {auth.cloudStats ? `${auth.cloudStats.cardsReviewed} cards · ${auth.cloudStats.questionsAnswered} practice` : "none saved"}
          </span>
        </Row>
        <Note>
          Deleting the cloud copy leaves this browser untouched. Local study data is erased from the
          Privacy &amp; data tab.
        </Note>
      </Panel>
    </>
  );
}
