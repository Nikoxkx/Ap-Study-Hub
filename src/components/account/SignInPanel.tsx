"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/use-auth";
import type { ContactKind } from "@/lib/use-auth";

/**
 * The sign-in window.
 *
 * One component serves two places: the standalone `/login` page (where it is the
 * whole point of the screen) and `/account` (where it sits inside the account
 * card for anyone who arrives there first). The markup is identical so the copy
 * can never drift between the two.
 *
 * Three rules shape it:
 *
 *  1. **Google first.** If the project has the provider switched on, the Google
 *     button is the primary action and the email form is the fallback. If it is
 *     not switched on, the button stays on the page, visibly inactive, and opens the steps
 *     and the owner gets a collapsible list of the exact steps instead.
 *  2. **Every step is described before it happens.** The visitor is told what
 *     the email will look like, how long the code lasts, and that the link alone
 *     is enough, so nobody has to guess what to do when it arrives.
 *  3. **Nothing here is required.** There is no password, no name, no phone
 *     number demand — and a visitor can close the page and keep studying.
 */

const RESEND_SECONDS = 45;

/** The public values the owner has to paste into Google's console and Supabase. */
const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").replace(/\/+$/, "");
const PROJECT_REF = SUPABASE_URL.match(/^https:\/\/([a-z0-9]+)\.supabase\.co/)?.[1] ?? "";
const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ap-study-hub-five.vercel.app").replace(/\/+$/, "");
const CALLBACK_URL = SUPABASE_URL ? `${SUPABASE_URL}/auth/v1/callback` : "";
const SUPABASE_PROVIDERS_URL = PROJECT_REF
  ? `https://supabase.com/dashboard/project/${PROJECT_REF}/auth/providers`
  : "";

function CopyValue({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <span className="signin-copy">
      <code>{value}</code>
      <button
        type="button"
        className="pref-mini"
        onClick={() => {
          const clipboard = typeof navigator === "undefined" ? undefined : navigator.clipboard;
          if (!clipboard) return;
          void clipboard.writeText(value).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          });
        }}
      >
        {copied ? "Copied" : `Copy ${label}`}
      </button>
    </span>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59A14.5 14.5 0 0 1 9.77 24c0-1.6.28-3.14.76-4.59l-7.97-6.19A23.94 23.94 0 0 0 0 24c0 3.88.93 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.46-9.91l-7.97 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

export function SignInPanel({
  next,
  variant = "inline",
  providersHint,
}: {
  /** A path to return to after sign-in; only same-site paths are honoured. */
  next?: string;
  variant?: "page" | "inline";
  /** What the server already knows about this deployment's providers. */
  providersHint?: { email: boolean; phone: boolean; google: boolean; known: boolean };
}) {
  const auth = useAuth();
  // The browser's answer wins once it arrives (it is the fresh one); the
  // server's answer fills the first paint, so an inactive Google button never
  // flashes on a deployment that has Google switched on.
  const providers = auth.providers.known || !providersHint ? auth.providers : providersHint;

  const [kind, setKind] = useState<ContactKind>("email");
  const [value, setValue] = useState("");
  const [token, setToken] = useState("");
  const [stage, setStage] = useState<"identify" | "code">("identify");
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const codeRef = useRef<HTMLInputElement | null>(null);
  const setupRef = useRef<HTMLDetailsElement | null>(null);

  const phoneEnabled = providers.phone;
  const googleEnabled = providers.google;
  // `known` is false until /auth/v1/settings answers. Treating that as "off"
  // would flash an inactive button on every load, so only a confirmed answer
  // changes the state.
  const googleOff = providers.known && !googleEnabled;
  const emailEnabled = providers.email;
  const target = next && next.startsWith("/") && !next.startsWith("//") ? next : "/account";

  // A cooldown, not a lockout: it stops a double-tap from burning one of the
  // project's two-per-hour emails and gives the visitor a number to watch.
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((seconds) => Math.max(0, seconds - 1)), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  useEffect(() => {
    if (stage === "code") codeRef.current?.focus();
  }, [stage]);

  const masked = useMemo(() => {
    const trimmed = value.trim();
    if (!trimmed) return "";
    if (kind === "phone") {
      const digits = trimmed.replace(/\D/g, "");
      return digits.length > 4 ? `••• ••• ${digits.slice(-4)}` : digits;
    }
    const [name, domain] = trimmed.split("@");
    if (!domain) return trimmed.slice(0, 3);
    return `${name.slice(0, 2)}${"•".repeat(Math.max(2, name.length - 2))}@${domain}`;
  }, [kind, value]);

  async function sendCode() {
    setBusy(true);
    setFeedback(null);
    const result = await auth.requestCode(kind, value);
    setFeedback({ ok: result.ok, text: result.message });
    if (result.ok) {
      setStage("code");
      setCooldown(RESEND_SECONDS);
    }
    setBusy(false);
  }

  async function verify() {
    setBusy(true);
    setFeedback(null);
    const result = await auth.verifyCode(kind, value, token);
    setFeedback({ ok: result.ok, text: result.message });
    if (result.ok) setToken("");
    setBusy(false);
  }

  async function google() {
    setBusy(true);
    setFeedback(null);
    const result = await auth.signInWithGoogle(target);
    if (!result.ok) setFeedback({ ok: false, text: result.message });
    setBusy(false);
  }

  function reset() {
    setStage("identify");
    setToken("");
    setFeedback(null);
    setValue("");
  }

  if (!auth.configured) {
    return (
      <div className={`signin-body${variant === "page" ? " signin-body-page" : ""}`}>
        <p className="settings-note settings-note-warn">
          Sign-in is not configured on this deployment: the two public Supabase values are absent,
          so this page can only explain. Everything else on the site already works.
        </p>
        <p className="settings-note">
          Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to
          switch accounts on. Nothing else changes.
        </p>
      </div>
    );
  }

  return (
    <div className={`signin-body${variant === "page" ? " signin-body-page" : ""}`}>
      {auth.configured ? (
        <div className={`signin-google${googleOff ? " is-off" : ""}`}>
          <button
            type="button"
            className={`google-button${googleOff ? " is-off" : ""}`}
            aria-disabled={googleOff || busy}
            aria-describedby={googleOff ? "google-status" : undefined}
            onClick={() => {
              if (!googleOff) {
                void google();
                return;
              }
              // An inactive control that does nothing is the bug that made this
              // look missing. It opens the instructions instead.
              const details = setupRef.current;
              if (!details) return;
              details.open = true;
              details.scrollIntoView({ block: "nearest", behavior: "smooth" });
            }}
          >
            <GoogleMark />
            <span>{googleEnabled ? (busy ? "Opening Google…" : "Continue with Google") : "Continue with Google"}</span>
          </button>

          {googleOff ? (
            <>
              <p className="signin-fineprint" id="google-status">
                <strong>Not switched on for this deployment yet.</strong> The button above starts
                working the moment this project has a Google client — nothing here needs a redeploy.
                The one-time link below works today.
              </p>
              <details className="signin-setup" ref={setupRef}>
                <summary>Owner? Switch Google on — four fields, three minutes</summary>
                <ol>
                  <li>
                    <a
                      className="link-underlined"
                      href="https://console.cloud.google.com/apis/credentials/consent"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Google Cloud → OAuth consent screen
                    </a>
                    : choose <em>External</em>, name it <em>AP Study Hub</em>, add your support email,
                    save. Publishing status may stay <em>Testing</em> while you add yourself under
                    Test users.
                  </li>
                  <li>
                    <a
                      className="link-underlined"
                      href="https://console.cloud.google.com/apis/credentials"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Credentials → Create credentials → OAuth client ID → Web application
                    </a>
                    . Paste these two values exactly:
                    <br />
                    <CopyValue label="origin" value={SITE_ORIGIN} />
                    <br />
                    <CopyValue label="redirect URI" value={CALLBACK_URL} />
                  </li>
                  <li>
                    {SUPABASE_PROVIDERS_URL ? (
                      <a
                        className="link-underlined"
                        href={SUPABASE_PROVIDERS_URL}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Supabase → Authentication → Providers → Google
                      </a>
                    ) : (
                      <>Supabase → Authentication → Providers → Google</>
                    )}
                    : paste the client ID and client secret, enable, save.
                  </li>
                  <li>
                    Reload this page. The button turns live by itself — the site reads the enabled
                    providers from Supabase on every load.
                  </li>
                </ol>
                <p className="signin-fineprint">
                  The full walkthrough, including the email sender and the SMS notes, is in{" "}
                  <code>SUPABASE_AUTH.md</code>. Verify from a terminal with{" "}
                  <code>pnpm check:auth https://ap-study-hub-five.vercel.app</code>.
                </p>
              </details>
            </>
          ) : (
            <p className="signin-fineprint">
              Google asks for three scopes and nothing else: <code>openid</code>, <code>email</code>,
              and <code>profile</code>. That is your name, address, and photo — no mail, no files, no
              contacts, no calendar. Nothing is written to your Google account.
            </p>
          )}
        </div>
      ) : null}

      {(emailEnabled || phoneEnabled) && googleEnabled ? (
        <p className="signin-divider">
          <span>or use a one-time code</span>
        </p>
      ) : null}

      {emailEnabled || phoneEnabled ? (
        <div className="signin-code">
          {/* The steps describe what this project will actually send. The
              default email template carries a link and no code, so promising a
              code would be a lie the visitor discovers two minutes later. */}
          <ol className="signin-steps">
            <li>
              {stage === "identify"
                ? `Enter the ${phoneEnabled ? "address or number" : "address"} you want to use.`
                : `We sent a message to ${masked || value}.`}
            </li>
            <li>
              {stage === "identify" ? (
                kind === "email" ? (
                  <>Press <strong>Send link</strong>. The message arrives in a few seconds.</>
                ) : (
                  <>Press <strong>Send code</strong>. It arrives in a few seconds.</>
                )
              ) : kind === "email" ? (
                <>Open the <strong>link</strong> in that message. It signs you in here, or on any other device.</>
              ) : (
                <>Type the code from the message below.</>
              )}
            </li>
            <li>
              {kind === "phone"
                ? "Codes last a few minutes and work once. Nothing to remember afterwards."
                : stage === "identify"
                  ? "If the message also shows a numeric code, it works in the box below as well."
                  : "The link works once, and the code under it (when there is one) is a second way in."}
            </li>
          </ol>

          {phoneEnabled ? (
            <div className="segmented" role="group" aria-label="Contact method">
              {(["email", "phone"] as ContactKind[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={kind === option}
                  onClick={() => {
                    setKind(option);
                    setStage("identify");
                    setFeedback(null);
                  }}
                >
                  {option === "email" ? "Email" : "Phone"}
                </button>
              ))}
            </div>
          ) : null}

          <label className="account-field">
            <span className="sr-only">
              {kind === "email" ? "Email address" : "Phone number in international format"}
            </span>
            <input
              className="field"
              type={kind === "email" ? "email" : "tel"}
              inputMode={kind === "email" ? "email" : "tel"}
              autoComplete={kind === "email" ? "email" : "tel"}
              placeholder={kind === "email" ? "you@example.com" : "+1 617 555 0100"}
              value={value}
              maxLength={120}
              onChange={(event) => setValue(event.target.value)}
              disabled={stage === "code" || busy}
            />
          </label>

          {stage === "code" ? (
            <label className="account-field">
              <span className="sr-only">Code from the message</span>
              <input
                ref={codeRef}
                className="field account-code"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="12345678"
                value={token}
                maxLength={10}
                onChange={(event) => setToken(event.target.value.replace(/\D/g, "").slice(0, 10))}
              />
            </label>
          ) : null}

          <div className="account-actions">
            {stage === "identify" ? (
              <button
                type="button"
                className="btn"
                onClick={() => void sendCode()}
                disabled={busy || !value.trim()}
              >
                {busy ? "Sending…" : kind === "email" ? "Send link" : "Send code"}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="btn"
                  onClick={() => void verify()}
                  disabled={busy || token.length < 4}
                >
                  {busy ? "Checking…" : "Sign in"}
                </button>
                <button
                  type="button"
                  className="pref-mini"
                  onClick={() => void sendCode()}
                  disabled={busy || cooldown > 0}
                >
                  {cooldown > 0 ? `Resend in ${cooldown}s` : "Send it again"}
                </button>
                <button type="button" className="pref-mini" onClick={reset}>
                  Different {kind === "email" ? "address" : "number"}
                </button>
              </>
            )}
          </div>

          {feedback ? (
            <p
              className={`settings-note ${feedback.ok ? "settings-note-good" : "settings-note-warn"}`}
              role="status"
            >
              {feedback.text}
            </p>
          ) : null}

          {stage === "code" ? (
            <div className="signin-arrived">
              <p className="signin-arrived-title">What the message looks like</p>
              <ul>
                <li>
                  <strong>Subject:</strong> “Your sign-in link” (email) or a short code text.
                </li>
                <li>
                  <strong>In it:</strong> a <em>Sign in</em> button that returns you here, and — when
                  the project’s template includes it — an 8-digit code you can type above.
                </li>
                <li>
                  <strong>If nothing arrives:</strong> check spam for the next minute, confirm the
                  spelling, then send again. Email is limited to two messages an hour per address,
                  which is Supabase’s default, not this site’s idea of security.
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

      <p className="signin-fineprint">
        No password exists on this site, so there is nothing to reuse or leak. Supabase is the only
        server involved; <Link href="/privacy" className="link-underlined">the privacy page</Link>{" "}
        lists every request. Studying stays local either way —{" "}
        <Link href="/" className="link-underlined">keep reading without an account</Link>.
      </p>
    </div>
  );
}
