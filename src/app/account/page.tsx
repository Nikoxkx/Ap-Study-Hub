import type { Metadata } from "next";
import Link from "next/link";
import { getCatalog } from "@/lib/catalog";
import { AccountClient } from "@/components/account/AccountClient";
import { absoluteUrl, socialImages } from "@/lib/site";
import { ACCOUNTS_ENABLED } from "@/lib/accounts";
import { AccountsPaused } from "@/components/account/AccountsPaused";

export const metadata: Metadata = ACCOUNTS_ENABLED
  ? {
  title: "Account — optional sign-in",
  description:
    "Sign in with an email address or phone number if you want your photo, name, and a handful of study counts to follow you between devices. Everything on AP Study Hub works without an account.",
  alternates: { canonical: "/account" },
  openGraph: {
    images: socialImages,
    title: "Optional account · AP Study Hub",
    description:
      "One-time code, no password, five synced counts. The rest of the site stays local-first.",
    url: absoluteUrl("/account"),
  },
  twitter: { card: "summary_large_image", images: socialImages },
  robots: { index: true, follow: true },
    }
  : {
      title: "Accounts are paused · AP Study Hub",
      description:
        "The optional account is switched off for now. Nothing on AP Study Hub requires one, and your work stays in this browser.",
      robots: { index: false, follow: false },
    };

export default function AccountPage() {
  if (!ACCOUNTS_ENABLED) return <AccountsPaused heading="The optional account is resting." />;

  const subjects = getCatalog().map((course) => ({
    slug: course.subject.slug,
    familiar: course.subject.familiar,
    official: course.subject.official,
    units: course.units.length,
  }));

  return (
    <div className="wrap py-8 md:py-12">
      <AccountClient subjects={subjects} />
      <p className="mt-8 text-[0.8125rem]" style={{ color: "var(--ink-faint)" }}>
        Not sure? <Link href="/privacy" className="link-underlined">The privacy page</Link> lists every
        key this site writes and every request it can make, including the ones behind this page.
      </p>
    </div>
  );
}
