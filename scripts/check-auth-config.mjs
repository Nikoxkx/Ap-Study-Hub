#!/usr/bin/env node
/**
 * Is sign-in switched on for this deployment?
 *
 * Reads only public information: `/auth/v1/settings` (provider booleans) and one
 * `GET /auth/v1/authorize` with no interaction, which is exactly what the
 * "Continue with Google" button does when you press it. Nothing is sent to any
 * address and no message is delivered.
 *
 *   corepack pnpm check:auth
 *   corepack pnpm check:auth https://ap-study-hub-five.vercel.app
 *
 * It exits non-zero only when the *site* is misconfigured (no Supabase URL or
 * key). A provider that the owner has not switched on is reported as
 * "waiting on you", because that is a configuration decision, not a bug.
 */

const site = (process.argv[2] || process.env.NEXT_PUBLIC_SITE_URL || "https://ap-study-hub-five.vercel.app").replace(/\/+$/, "");
const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/+$/, "");
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const bold = (text) => `\u001b[1m${text}\u001b[0m`;
const green = (text) => `\u001b[32m${text}\u001b[0m`;
const amber = (text) => `\u001b[33m${text}\u001b[0m`;
const red = (text) => `\u001b[31m${text}\u001b[0m`;

if (!url || !key) {
  console.error(red("Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY."));
  console.error("Run this from the repository root with those two public values in the environment,");
  console.error("or copy them from the Vercel project settings (they are public, by design).");
  process.exit(1);
}

const missAt = `${url}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(`${site}/login`)}`;

async function settings() {
  const response = await fetch(`${url}/auth/v1/settings`, { headers: { apikey: key } });
  if (!response.ok) throw new Error(`/auth/v1/settings answered ${response.status}`);
  return response.json();
}

async function googleHandoff() {
  // `redirect: "manual"` keeps the 302 that would otherwise take us to Google.
  const response = await fetch(missAt, { headers: { apikey: key }, redirect: "manual" });
  let body = "";
  try {
    body = await response.text();
  } catch {
    // A 302 has no readable body in manual mode; that is the good outcome.
  }
  return { status: response.status, location: response.headers.get("location") || "", body: body.slice(0, 200) };
}

const report = [];
let waiting = 0;

try {
  const config = await settings();

  report.push(bold(`Deployment  ${site}`));
  report.push(bold(`Account server  ${url}`));
  report.push("");

  const email = config.external_email_enabled === true;
  report.push(`${email ? green("on ") : red("off")}  email one-time link / code`);

  const google = config.external_google_enabled === true;
  if (google) {
    report.push(`${green("on ")}  Google`);
  } else {
    waiting += 1;
    report.push(`${amber("off")}  Google — needs a client ID and secret in Supabase → Authentication → Providers → Google`);
  }

  const phone = config.external_phone_enabled === true;
  report.push(`${phone ? green("on ") : amber("off")}  phone code${phone ? "" : " — needs an SMS provider; the tab is hidden while it is off"}`);

  report.push("");
  const handoff = await googleHandoff();
  if (handoff.status === 0 || handoff.status === 302 || handoff.status === 303) {
    report.push(`${green("✓")} The Google hand-off answers with a redirect (${handoff.location.split("?")[0] || "302"})`);
  } else if (/provider is not enabled|unsupported provider/i.test(handoff.body)) {
    report.push(`${amber("•")} The Google hand-off is refused: ${`(HTTP ${handoff.status})`} provider not enabled — the button is correctly hidden.`);
  } else {
    report.push(`${red("✗")} The Google hand-off failed: HTTP ${handoff.status} ${handoff.body.replace(/\s+/g, " ").trim()}`);
  }

  report.push("");
  report.push(bold("What the site does with that"));
  report.push("  • /login renders Google only when this endpoint reports it.");
  report.push("  • /login renders the email form whenever email is on; the message carries a link.");
  report.push("  • Both return to ?next=, read the fragment for refusals, and say what went wrong.");

  console.log(report.join("\n"));

  if (waiting > 0) {
    console.log("");
    console.log(amber(`Waiting on the owner: ${waiting} provider${waiting === 1 ? "" : "s"}. See SUPABASE_AUTH.md → "Switching Google on".`));
  }
} catch (error) {
  console.error(red(`Could not read the account server: ${error instanceof Error ? error.message : String(error)}`));
  process.exit(1);
}
