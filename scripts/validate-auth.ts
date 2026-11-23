/**
 * The sign-in return path, tested where it actually breaks.
 *
 * Supabase reports a refused provider in the URL *fragment* in the implicit
 * flow. That fragment never reaches a server component, so a login page that
 * only reads `?error` shows a blank window after someone cancels Google — which
 * is exactly the sort of "it just doesn't work" that is hard to see in a
 * screenshot. These checks run the real helpers against a real DOM.
 *
 * Run: corepack pnpm validate:auth
 */
import { JSDOM } from "jsdom";

const errors: string[] = [];
const fail = (message: string) => errors.push(message);

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "https://ap-study-hub-five.vercel.app/login?next=%2Fsettings",
});
const { window } = dom;
Object.defineProperty(globalThis, "window", { value: window, configurable: true });
Object.defineProperty(globalThis, "document", { value: window.document, configurable: true });

async function main() {
const { hashAuthErrorSnapshot, clearAuthFragment, friendlyAuthError, explainHashAuthError } =
  await import("../src/lib/auth-errors");

/* 1. A cancelled Google consent. */
window.history.replaceState(null, "", "/login?next=%2Fsettings#error=access_denied&error_description=User+cancelled");
const denied = hashAuthErrorSnapshot();
if (!denied) fail("an access_denied fragment was not read at all");
if (denied && denied.code !== "access_denied") fail(`the error code was misread as "${denied?.code}"`);
if (denied && !/cancelled/i.test(denied.description)) fail("the description lost its words (was `+` decoded?)");
const deniedCopy = denied ? explainHashAuthError(denied) : "";
if (!/closed|permission/i.test(deniedCopy)) fail("a cancelled consent did not explain itself");
if (!/nothing was (saved|shared)/i.test(deniedCopy)) fail("a cancelled consent did not say that nothing was saved");

/* 2. An expired magic link. */
window.history.replaceState(null, "", "/login#error=otp_expired&error_description=Email+link+is+invalid");
const expired = hashAuthErrorSnapshot();
if (!expired || !/expired/i.test(explainHashAuthError(expired))) {
  fail("an expired link was not explained as expiring");
}

/* 3. No fragment: no invented error. */
window.history.replaceState(null, "", "/login?next=%2Fsettings");
if (hashAuthErrorSnapshot() !== null) fail("a clean URL produced an error message");

/* 4. The fragment is consumed, and the destination survives. */
window.history.replaceState(null, "", "/login?next=%2Fsettings#error=access_denied");
hashAuthErrorSnapshot();
clearAuthFragment();
if (window.location.hash) fail("the spent fragment was left in the address bar");
if (!window.location.search.includes("next=%2Fsettings")) {
  fail("clearing the error also dropped ?next= — the visitor would lose their destination");
}

/* 5. Query-string errors from the server are cleared too. */
window.history.replaceState(null, "", "/login?next=%2Fsettings&error=access_denied&error_description=Cancelled");
clearAuthFragment();
if (/error=/.test(window.location.search)) fail("the server-side error parameters were left behind");
if (!window.location.search.includes("next=")) fail("clearing the error dropped ?next=");

/* 6. Developer messages become sentences with a next step. */
const mapped: [string, RegExp][] = [
  ["email rate limit exceeded", /too many sign-in emails/i],
  ["Token has expired or is invalid", /expired|already used/i],
  ["Provider is not enabled", /not switched on/i],
  ["failed to fetch", /could not reach/i],
  ["Email address \"x\" is invalid", /does not look like an email/i],
];
for (const [input, expected] of mapped) {
  const output = friendlyAuthError(input);
  if (!expected.test(output)) fail(`"${input}" was not translated: got "${output}"`);
}
// An unknown message still ends with what happened to their data.
if (!/nothing was saved/i.test(friendlyAuthError("Something odd happened"))) {
  fail("an unknown error did not say that nothing was saved");
}

}

if (errors.length) {
  console.error(`Auth validation failed with ${errors.length} issue${errors.length === 1 ? "" : "s"}:`);
  for (const error of errors) console.error(`  • ${error}`);
  process.exit(1);
}
console.log("✓ Sign-in returns: refused consent, expired links, rate limits and lost destinations all surface as readable text.");

void main();
