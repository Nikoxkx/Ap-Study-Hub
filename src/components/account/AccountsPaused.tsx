import Link from "next/link";
import { ACCOUNTS_PAUSED_REASON } from "@/lib/accounts";

/**
 * What `/login` and `/account` show while accounts are switched off.
 *
 * It is deliberately not a 404: someone arriving from an old link, a bookmark,
 * or a card in the readme should learn what happened and where to go, in one
 * screen. It also makes no request and reads no stored session — the page is
 * plain HTML.
 */
export function AccountsPaused({ heading = "Signing in is switched off for now." }: { heading?: string }) {
  return (
    <div className="wrap py-8 md:py-12">
      <div className="settings-shell">
        <header>
          <p className="label mb-2">Accounts paused</p>
          <h1 className="settings-title">{heading}</h1>
          <p className="lede mt-3" style={{ maxWidth: "62ch" }}>
            The optional account — Google, one-time codes, the synced photo, and the five study
            counts — is off while it is finished, because {ACCOUNTS_PAUSED_REASON}. There is no
            lesson, question, paper, video, printable, or study tool here that asks you to sign in.
          </p>
          <p className="settings-note">
            Nothing was deleted. Your settings, progress, cards, mistakes, and uploads stay in this
            browser exactly as before, and nothing new is sent anywhere.
          </p>
          <div className="settings-meta">
            <Link className="btn" href="/">
              Back to studying
            </Link>
            <Link href="/study">The study desk</Link>
            <span aria-hidden="true">·</span>
            <Link href="/privacy">What this site stores</Link>
          </div>
        </header>
      </div>
    </div>
  );
}
