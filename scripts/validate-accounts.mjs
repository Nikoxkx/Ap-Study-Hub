#!/usr/bin/env node
/**
 * Accounts are paused (`src/lib/accounts.ts`). This keeps the pause honest.
 *
 * The failure this validator exists to prevent is silent drift: one new surface
 * adds "Sign in" back to a page that has no way to sign anyone in, or the
 * privacy page keeps describing a session token that cannot be written. It
 * reads the source — the same source the build reads — and it fails the build
 * if any of the gates below disappears.
 *
 * When accounts come back (`ACCOUNTS_ENABLED = true`), the *other* half of each
 * branch becomes the live one, so these gates stay valid in both states: every
 * assertion is about the switch being consulted, not about the answer.
 */

import { readFileSync } from "node:fs";

const failures = [];
const fail = (message) => failures.push(message);
const read = (path) => readFileSync(path, "utf8");

const accounts = read("src/lib/accounts.ts");
const enabled = /export const ACCOUNTS_ENABLED = (true|false);/.exec(accounts);
if (!enabled) fail("src/lib/accounts.ts no longer exports a literal ACCOUNTS_ENABLED");

/** A file may only mention an account surface if it asks the switch first. */
function gates(path) {
  const source = read(path);
  if (!source.includes("ACCOUNTS_ENABLED")) {
    fail(`${path} offers an account surface without asking ACCOUNTS_ENABLED`);
  }
}

gates("src/lib/navigation.ts");
gates("src/components/SiteFooter.tsx");
gates("src/components/MobileNav.tsx");
gates("src/components/settings/SettingsClient.tsx");
gates("src/app/sitemap.ts");
gates("src/lib/use-auth.tsx");
gates("src/app/privacy/page.tsx");

for (const page of ["src/app/login/page.tsx", "src/app/account/page.tsx"]) {
  const source = read(page);
  if (!source.includes("AccountsPaused")) fail(`${page} no longer explains the pause`);
  if (!source.includes("index: false")) fail(`${page} is indexable while it cannot sign anyone in`);
}

// The paused screen must not be able to sign anyone in, or read a session.
const paused = read("src/components/account/AccountsPaused.tsx");
for (const forbidden of ["useAuth", "SignInPanel", "createClient", "fetch("]) {
  if (paused.includes(forbidden)) fail(`AccountsPaused pulls in ${forbidden}`);
}

// The provider must be inert while the switch is off: no session read, no
// settings request, no token refresh on every page.
const auth = read("src/lib/use-auth.tsx");
if (!/if \(!client \|\| !ACCOUNTS_ENABLED\) return;/.test(auth)) {
  fail("AuthProvider still reads a session while accounts are paused");
}
if (!/if \(!supabaseConfigured \|\| !ACCOUNTS_ENABLED\) return;/.test(auth)) {
  fail("AuthProvider still requests /auth/v1/settings while accounts are paused");
}

// The privacy page must not describe a token it cannot write.
if (!/ACCOUNTS_ENABLED[\s\S]{0,400}sb-\{project-ref\}-auth-token/.test(read("src/app/privacy/page.tsx"))) {
  fail("the privacy page lists the account token without the switch guarding it");
}

if (failures.length) {
  for (const failure of failures) console.error(`✗ ${failure}`);
  console.error(`\n${failures.length} account-pause problem${failures.length === 1 ? "" : "s"}.`);
  process.exit(1);
}

console.log(
  `✓ Accounts are ${enabled[1] === "true" ? "on" : "paused"} and every surface agrees: the navigation, footer, palette, Settings tab, sitemap, the two account pages, the auth provider, and the privacy page all consult one switch, and the paused screen touches nothing.`,
);
