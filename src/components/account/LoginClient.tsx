"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignInPanel } from "@/components/account/SignInPanel";
import { AuthReturnNotice } from "@/components/account/AuthReturnNotice";
import { useAuth } from "@/lib/use-auth";
import { clearAuthFragment } from "@/lib/auth-errors";

/**
 * `/login` — the proper window, not a card buried in another page.
 *
 * It exists so the sign-in flow has one address to link to from the header,
 * the account page, and a Google or magic-link redirect. It reads `?next=` so a
 * visitor who was heading somewhere specific lands there instead of on the
 * account page, and it forwards an OAuth failure back into the panel as text.
 */
export function LoginClient({ next, providerError = "" }: { next?: string; providerError?: string }) {
  const auth = useAuth();
  const router = useRouter();

  const target = next && next.startsWith("/") && !next.startsWith("//") ? next : "/account";

  // A returned OAuth session is detected by the Supabase client (detectSessionInUrl)
  // and surfaces here as `signed-in`, which is the moment to leave the login page.
  useEffect(() => {
    if (auth.status === "signed-in") {
      clearAuthFragment();
      router.replace(target);
    }
  }, [auth.status, router, target]);


  return (
    <main className="login-shell">
      <div className="login-window glass-box">
        <div className="login-head">
          <p className="label mb-2">AP Study Hub · optional account</p>
          <h1 className="login-title">
            {auth.status === "signed-in" ? "You are signed in." : "Sign in, or keep studying without one."}
          </h1>
          <p className="login-lede">
            Google takes one tap. If you would rather not link an account, a one-time code works
            too — and closing this window costs you nothing: every lesson, card, question, paper,
            and video stays open.
          </p>
        </div>

        <AuthReturnNotice serverMessage={providerError} />

        {auth.status === "loading" ? (
          <p className="settings-note">Checking for a saved session…</p>
        ) : auth.status === "signed-in" ? (
          <p className="settings-note settings-note-good" role="status">
            Signed in as {auth.maskedContact || "your account"}. Taking you to{" "}
            <Link href={target} className="link-underlined">
              {target}
            </Link>
            …
          </p>
        ) : (
          <SignInPanel next={target} variant="page" />
        )}

        <div className="login-foot">
          <Link href="/" className="link-underlined">
            Back to the library
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/account" className="link-underlined">
            What an account stores
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/privacy" className="link-underlined">
            Privacy
          </Link>
        </div>
      </div>
    </main>
  );
}
