# Optional accounts

The site is local-first and stays that way. Accounts are a convenience, not a gate: with no
configuration there is no sign-in, no upload, and no server call, and every lesson, card, question,
paper, and video still works.

Sign-in is **Google in one tap**, or a **one-time code** by email or text. There is no password field
anywhere in the app, so there is no password to reuse, leak, or type into a lookalike page. The
window is `/login` (also reachable from `/account`, the header, and the command palette).

## What an account holds

| Table | Columns | Why |
| --- | --- | --- |
| `public.profiles` | `id` (auth user), `display_name`, `avatar_url` | Your name and photo on `/account` |
| `public.study_stats` | `user_id`, `cards_reviewed`, `questions_answered`, `minutes`, `streak`, `affinity`, `last_active` | The five coarse counts, shown beside the local ones |

`affinity` is at most twelve `{ slug, score }` pairs. There are **no lesson IDs, no answers, no
drafts, no essay text, and no per-question history** in either table, and the client never sends
them. Everything else stays in `localStorage` on the device.

Storage: a public `avatars` bucket, with write access limited to a folder named after the signed-in
user (`avatars/<uid>/avatar.<ext>`), 2 MB limit, and only PNG/JPEG/WebP/GIF — SVG is refused.

## Turn it on

1. **Apply the schema.** The migration is committed at
   `supabase/migrations/20261122120000_create_profiles_and_stats.sql`. Either push it
   (`supabase db push`) or paste it into the dashboard's SQL editor. It creates both tables, enables
   Row Level Security, adds own-row-only policies, creates the `avatars` bucket and its policies, and
   adds the `updated_at` triggers.
2. **Add Google** (the one-tap route) — this is the only step that needs a secret, and it takes about
   three minutes:
   1. Google Cloud Console → **APIs & Services → OAuth consent screen** → *External*; set the app
      name (`AP Study Hub`), the support email, and the developer contact. Publishing status can stay
      *Testing* while you add yourself under **Test users**; publish it when other students should be
      able to sign in.
   2. **Credentials → Create credentials → OAuth client ID → Web application.**
      - Authorised JavaScript origin: `https://ap-study-hub-five.vercel.app`
      - Authorised redirect URI: `https://zgkpflrddkrqldjeocsk.supabase.co/auth/v1/callback`
   3. Copy the **client ID** and **client secret** into Supabase → **Authentication → Providers →
      Google**, enable it, save.
   4. Nothing to redeploy. The login window reads `/auth/v1/settings` at runtime, so the Google
      button appears the moment the provider is on — and disappears again if it is switched off.
3. **Give GoTrue a real sender (SMTP).** Without this, a code only reaches the addresses of people
   on the Supabase project's team, and only twice an hour: the built-in sender is a testing aid, not
   a mail service. Authentication → **Emails → SMTP Settings**, then any provider (Resend, Postmark,
   SendGrid, Mailgun, Fastmail, Google Workspace — a free tier is enough for a classroom):
   ```text
   Host:     smtp.resend.com        (or your provider's)
   Port:     465  (TLS)  /  587 (STARTTLS)
   User:     resend                (your provider's SMTP user)
   Password: <the provider's SMTP key or API key>
   Sender:   no-reply@your-domain   ← must be a domain you have verified with that provider
   ```
   Save, then send yourself one link from `/login`. If it does not arrive, the Supabase logs at
   **Logs → Auth** name the refusal verbatim (`535 Authentication failed`, `550 sender not verified`),
   which is the difference between a five-minute fix and an afternoon.
4. **Paste the email templates** so the message tells the reader exactly what to do. Authentication →
   Email Templates, replace the body with the files in `supabase/templates/`:
   - **Magic Link** → `supabase/templates/magic-link.html`
   - **Confirm signup** → `supabase/templates/confirmation.html`
   - Suggested subjects: *“Your AP Study Hub sign-in code and link”* /
     *“Confirm your email for AP Study Hub”*.

   Both templates print `{{ .Token }}` **and** the `{{ .ConfirmationURL }}` button, because either
   route works in the app: the button returns signed in, the code finishes the flow in the window
   that is already open. `mailer_otp_length` for this project is **8**; the form accepts 4–10 digits,
   so a future change to 6 or 10 does not need a code change. Codes last an hour
   (`mailer_otp_exp = 3600`).
5. **Phone/SMS (optional).** Phone sign-in needs a paid SMS provider — Supabase supports Twilio,
   MessageBird, Vonage, and Textlocal. Add the credentials under Authentication → Providers → Phone,
   turn the provider on, and set the message to `supabase/templates/sms-code.txt`. Two project
   settings are worth changing at the same time: `sms_otp_exp` (default **60 seconds**, which is
   short for a text that may arrive late — 300–600 is kinder) and `sms_max_frequency`. Until a
   provider is configured, the window does not offer a phone tab at all; it does not pretend.
6. **Set the two public values** in Vercel → Settings → Environment Variables (and in `.env.local`
   for local work), then redeploy:
   ```text
   NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<publishable / anon key>
   ```
   The anon key is public by design — Row Level Security is what protects the rows. **Never** put a
   service-role key in a `NEXT_PUBLIC_` variable.
7. **Add your origins** in Authentication → URL Configuration: the site URL plus
   `https://<your-domain>/login` and `https://<your-domain>/account` in the redirect allow-list.
   Google returns to the project's `/auth/v1/callback`, which then forwards to `/login`.

## What this deployment has switched on

| Provider | State | What the window does |
| --- | --- | --- |
| Email — one-time link, plus a code when the template carries `{{ .Token }}` | **On** — but delivery is the built-in testing sender until step 3 is done (2 messages/hour, project team only) | The form is always rendered; the message carries a link, and a code too once the template is pasted |
| Google — OAuth 2.0 | **Off pending client ID/secret** (step 2 above) | The button is not rendered; a short setup card appears in its place |
| Phone — SMS | **Off** (no SMS provider) | No phone tab is shown |

The interface asks Supabase which providers exist, so this table is the only place the truth has to
be written down — the code does not hard-code it.

## How the browser finishes a sign-in

The client is created with `flowType: "implicit"` (`src/lib/supabase.ts`). That is a deliberate choice,
not a default:

- **PKCE** stores a code verifier in the browser that started the flow. An emailed link opened on a
  *different* device — request on the phone, read the mail on the laptop — then fails with
  `code verifier not found`, which reads to a student as "the login is broken".
- **Implicit** returns the session in the URL fragment. `detectSessionInUrl` consumes and strips it on
  whichever device opens the link, so a magic link works everywhere. There is no third-party script on
  the page for a fragment to leak to, and nothing is ever sent in a referrer.

Refusals arrive in that same fragment (`#error=access_denied&error_description=…`), which no server
component can see. `src/lib/auth-errors.ts` reads it in the browser, `LoginClient` prints a sentence
with a next step, and the spent fragment is removed from the address bar. `scripts/validate-auth.ts`
holds that behaviour to a jsdom test, including the rule that clearing an error must not clear
`?next=` — losing the visitor's destination would be a quieter version of the same bug.

## Check it without guessing

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co \
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key> \
corepack pnpm check:auth

# or point it at a deployment
corepack pnpm check:auth https://ap-study-hub-five.vercel.app
```

It prints which providers `/auth/v1/settings` reports, then performs the same hand-off the Google
button performs (a `GET /auth/v1/authorize`, with redirects disabled) and reports the answer: a 302 to
Google when the provider is on, `provider is not enabled` when it is not. It never sends a message to
anyone, so it is safe to run after every configuration change.

## Security model

- Every table has RLS enabled and policies keyed to `auth.uid()`; `anon` is revoked outright.
- The client can only ever touch its own row, and only the columns above.
- The anon key is a public client key. No secret is compiled into the bundle, and this repository
  contains no project key.
- The avatar policy checks the *folder* (`storage.foldername(name)[1] = auth.uid()`), so one account
  cannot overwrite another's photo even if it guesses the path.
- Signing out clears the session from the browser. **Delete the cloud copy** on `/account` removes
  the profile row, the stats row, and the photos; **forget everything** in Settings → Privacy & data
  clears the local record and is a separate action, because they are separate things.

## Without it

`supabaseConfigured` is false, `/account` explains that the deployment has no account server,
Settings → Account shows `off`, and nothing else changes. `pnpm check` runs the whole suite exactly
the same way, because the feature has no build-time dependency on a live project.

## What is provisioned

Created on 2026-11-22 for this repository and **active**:

| | |
| --- | --- |
| Project | `ap-study-hub-accounts` (`zgkpflrddkrqldjeocsk`), `us-east-1`, free plan |
| URL | `https://zgkpflrddkrqldjeocsk.supabase.co` |
| Tables | `profiles`, `study_stats` — RLS enabled, policies applied |
| Storage | `avatars` bucket (public read, 2 MB, raster only) with folder-scoped write policies |
| Auth | Email enabled, phone **disabled** (no SMS provider yet), sign-ups on, email confirmation required |
| Redirects | site URL `https://ap-study-hub-five.vercel.app`, plus the `the-ap-study-hub` / team / git and preview wildcards and `http://localhost:3000/**` |
| Vercel env | `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` set for production, preview and development |

The key in use is the project's **legacy anon JWT**. It is public by design, and swapping in the newer
`sb_publishable_…` key is a one-line change in Vercel once legacy keys are retired.

### Scopes and consent

Supabase asks Google for three scopes and nothing else: `openid`, `email`, and `profile`. That is
what produces the name, address, and photo the account card shows. No Drive, Gmail, Calendar,
Contacts, or Cloud Platform scope is requested, no refresh token is issued (`access_type=online`),
and nothing is ever written to the user's Google account — the site never calls a Google API after
sign-in.

What the user sees:

- Google's own consent screen, listing exactly those three scopes. The consent screen's *app name*,
  *support email*, and *privacy-policy link* are what make it look legitimate; fill them in before
  publishing the app, or Google shows the bare project id.
- `/login` states the three scopes above the button, and the account page repeats them under
  **Permissions** with the ability to review or revoke at Google → Security → Third-party apps.
- A one-time-code sign-in never touches Google, and the Permissions card says so rather than
  claiming access that was never granted.

If you change the requested scopes you must also change `GOOGLE_SCOPES` in
`src/lib/browser-permissions.ts`; that constant is the single copy the sign-in card, the account
card, and the docs are written from.

The browser side is separate and deliberately tiny: persistent storage
(`navigator.storage.persist()`), offered as one optional button on `/account`. There is no
notification, camera, microphone, or geolocation code in this app.

### One optional email tweak

The default *Magic Link* template sends a link and no code. Clicking that link signs you in — it
returns to `/account` and the session completes there. If you also want the typed-code path to work
(handy when a link is stripped by a school mail filter), add `{{ .Token }}` to the Magic Link
template in Authentication → Email Templates. Codes are currently 8 digits in this project; the form
accepts any 4–10 digit code, so nothing breaks either way.

### Phone sign-in later

Enable the Phone provider, add Twilio (or another) credentials in the dashboard, and flip
`external_phone_enabled`. The phone tab is already in the UI; until then it reports the provider's
error verbatim rather than pretending to send.

## The older study-sync project

The separate project used by the Study Desk's optional snapshot sync (`unfplzqqotubcfcswnlo`) is
still paused; nothing here depends on it.
