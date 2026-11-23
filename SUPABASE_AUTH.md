# Optional accounts

The site is local-first and stays that way. Accounts are a convenience, not a gate: with no
configuration there is no sign-in, no upload, and no server call, and every lesson, card, question,
paper, and video still works.

Sign-in is a **one-time code** sent by email or text. There is no password field anywhere in the
app, so there is no password to reuse, leak, or type into a lookalike page.

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
2. **Enable the providers you want** in Authentication → Providers:
   - **Email** — enabled by default. For the smoothest experience, edit the *Magic Link* template to
     show `{{ .Token }}` as well as the link; the site accepts the six-digit code.
   - **Phone** — requires an SMS provider (Twilio, MessageBird, Vonage, or Textlocal) configured in
     Authentication → Providers → Phone. Without one, the phone tab will return a provider error and
     the site will show it verbatim; email keeps working.
3. **Set the two public values** in Vercel → Settings → Environment Variables (and in `.env.local`
   for local work), then redeploy:
   ```text
   NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<publishable / anon key>
   ```
   The anon key is public by design — Row Level Security is what protects the rows. **Never** put a
   service-role key in a `NEXT_PUBLIC_` variable.
4. **Add your origins** in Authentication → URL Configuration: site URL plus
   `https://<your-domain>/account` in the redirect allow-list.

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
