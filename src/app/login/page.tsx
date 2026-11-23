import type { Metadata } from "next";
import { LoginClient } from "@/components/account/LoginClient";
import { absoluteUrl, socialImages } from "@/lib/site";
import { serverAuthProviders } from "@/lib/auth-providers-server";
import { ACCOUNTS_ENABLED } from "@/lib/accounts";
import { AccountsPaused } from "@/components/account/AccountsPaused";

export const metadata: Metadata = ACCOUNTS_ENABLED
  ? {
  title: "Sign in — optional account",
  description:
    "Sign in with Google in one tap, or with a one-time code by email. No password exists on AP Study Hub, and every lesson works without an account.",
  alternates: { canonical: "/login" },
  openGraph: {
    images: socialImages,
    title: "Sign in · AP Study Hub",
    description: "One tap with Google, or a one-time code. No password, no paywall, no requirement.",
    url: absoluteUrl("/login"),
  },
  twitter: { card: "summary_large_image", images: socialImages },
  robots: { index: true, follow: true },
    }
  : {
      title: "Accounts are paused · AP Study Hub",
      description:
        "Signing in is switched off for now. Every lesson, question, paper, video, and printable on AP Study Hub works without an account.",
      // Nothing here for a crawler to keep: the page cannot sign anyone in.
      robots: { index: false, follow: false },
    };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{
    next?: string | string[];
    error?: string | string[];
    error_description?: string | string[];
  }>;
}) {
  if (!ACCOUNTS_ENABLED) return <AccountsPaused />;

  const params = await searchParams;
  const first = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

  const raw = first(params.next);
  const next = raw && raw.startsWith("/") && !raw.startsWith("//") ? raw : undefined;
  // Supabase puts a refused or cancelled provider on the query string. Reading it
  // here, on the server, keeps the client free of a setState-in-effect and means
  // the message is in the first paint rather than appearing a frame later.
  const error = (first(params.error_description) ?? first(params.error) ?? "")
    .replaceAll("+", " ")
    .slice(0, 300);

  // Asked here, not in the browser, so the first paint already knows whether
  // Google is available on this deployment.
  const providers = await serverAuthProviders();

  return <LoginClient next={next} providerError={error} providers={providers} />;
}
