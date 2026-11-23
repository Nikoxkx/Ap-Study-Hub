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

## Why the project may be paused

The Supabase project connected to this repository (`unfplzqqotubcfcswnlo`) is currently **inactive**,
so the migration can be committed but not applied until it is restored. Restoring resumes compute on
that project; nothing in this repository assumes it is running.
