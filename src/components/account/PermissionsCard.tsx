"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAuth } from "@/lib/use-auth";
import {
  GOOGLE_SCOPES,
  NOT_REQUESTED,
  formatBytes,
  readStorage,
  requestPersistence,
  type PersistenceState,
  type StorageReport,
} from "@/lib/browser-permissions";

/**
 * "What have I agreed to?" — answered in one card.
 *
 * Two kinds of permission exist on this site and they are different things:
 * what Google hands over when you sign in (an account decision), and what the
 * browser is allowed to keep on this device (a browser decision). Merging them
 * into one vague "allow everything" button would be worse than showing neither.
 *
 * Everything here is optional. The account works with the defaults, the site
 * works without an account, and no row blocks another.
 */
export function PermissionsCard({ signedIn }: { signedIn: boolean }) {
  const auth = useAuth();
  const [storage, setStorage] = useState<StorageReport | null>(null);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    let cancelled = false;
    readStorage().then((report) => {
      if (!cancelled) setStorage(report);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const state: PersistenceState = storage?.state ?? "default";

  function stateCopy(): string {
    switch (state) {
      case "granted":
        return "Kept. The browser has promised not to evict this origin's data to free up space.";
      case "denied":
        return "Not kept. This browser answered no — Safari only answers yes for sites added to the Home Screen. Nothing is lost now; a full disk or “clear website data” would remove your wallpapers and preferences.";
      case "unsupported":
        return "This browser does not offer persistent storage. Your uploads and preferences still work; they are simply first in line if the disk fills.";
      default:
        return "Not asked yet. Without this, the browser may delete your uploaded wallpaper and preferences to reclaim space.";
    }
  }

  async function askForStorage() {
    setBusy(true);
    setNote("");
    try {
      const answer = await requestPersistence();
      const report = await readStorage();
      setStorage({ ...report, state: answer === "unsupported" ? "unsupported" : answer });
      setNote(
        answer === "granted"
          ? "The browser agreed to keep this site's data."
          : answer === "unsupported"
            ? "This browser has no persistent-storage request to answer."
            : "The browser declined. Your data stays until the browser decides otherwise — exporting in Settings is the durable copy.",
      );
    } finally {
      setBusy(false);
    }
  }

  const googleAccount = signedIn && auth.provider === "google";

  return (
    <GlassCard as="section" padding="lg" aria-labelledby="permissions-heading">
      <div className="settings-panel-head">
        <div>
          <p className="label mb-1">Permissions</p>
          <h2 id="permissions-heading" className="settings-panel-title">
            What this site is allowed to do
          </h2>
          <p className="settings-panel-note">
            Two separate things, and neither is required: what Google hands over when you sign in,
            and what this browser may keep on your device. Anything not listed here is not requested.
          </p>
        </div>
      </div>

      <ul className="permission-list">
        <li className="permission-row">
          <div>
            <p className="permission-title">Google account access</p>
            {googleAccount ? (
              <ul className="permission-scopes">
                {GOOGLE_SCOPES.map((entry) => (
                  <li key={entry.scope}>
                    <code>{entry.scope}</code>
                    <span>{entry.plain}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="permission-body">
                {signedIn
                  ? "You signed in with a one-time code, so no Google access was requested or granted. Nothing from Google is stored for this account."
                  : "Not granted. Signing in with Google asks for your name, email address, and photo — and nothing else."}
              </p>
            )}
            <p className="permission-body">
              {googleAccount
                ? "Google offers no calendar, Drive, or Gmail scopes to this site, so revoking access removes no studying data. The account keeps working until you sign out."
                : "Access can be reviewed at Google → Security → Third-party apps at any time."}
            </p>
          </div>
          <div className="permission-action">
            {signedIn ? (
              <button
                type="button"
                className="pref-mini"
                onClick={() => void auth.signInWithGoogle("/account")}
              >
                {googleAccount ? "Reconnect Google" : "Use Google instead"}
              </button>
            ) : (
              <Link className="pref-mini" href="/login?next=/account">
                Sign in
              </Link>
            )}
          </div>
        </li>

        <li className="permission-row">
          <div>
            <p className="permission-title">
              Persistent storage on this device
              <span className={`permission-badge is-${state}`}>
                {state === "granted" ? "kept" : state === "unsupported" ? "unavailable" : "optional"}
              </span>
            </p>
            <p className="permission-body">{stateCopy()}</p>
            {storage?.usage !== null && storage?.usage !== undefined ? (
              <p className="permission-meta">
                {formatBytes(storage.usage)} used of about {formatBytes(storage.quota)} available to this
                site.
              </p>
            ) : null}
          </div>
          <div className="permission-action">
            <button
              type="button"
              className="pref-mini"
              disabled={busy || state === "granted" || state === "unsupported"}
              onClick={() => void askForStorage()}
            >
              {busy ? "Asking…" : state === "granted" ? "Already kept" : "Ask the browser"}
            </button>
          </div>
        </li>
      </ul>

      {note ? <p className="settings-ok permission-note">{note}</p> : null}

      <div className="permission-never">
        <p className="permission-title">Never requested</p>
        <ul>
          {NOT_REQUESTED.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="permission-body">
          This site has no code that asks for any of these. If a prompt for one appears on this domain,
          it does not come from this site.
        </p>
      </div>
    </GlassCard>
  );
}

export default PermissionsCard;
