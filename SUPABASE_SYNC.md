# Optional Study Desk sync

The Study Desk is local-first. `aps.study.v1` stays in the browser unless the visitor explicitly enables sync in **Study Desk → Advanced**. This directory contains the deployment-ready Supabase side of that feature.

## Status

The Supabase project `unfplzqqotubcfcswnlo` is currently **INACTIVE**. The connector successfully stored these secrets:

- `STUDY_SYNC_PEPPER`
- `STUDY_SYNC_ALLOWED_ORIGIN`

Because the project is inactive, the connector could not reliably create the migration or deploy the edge function. Both are committed here instead. No private key is stored in this repository.

## Files

- `supabase/migrations/20261024120000_create_study_desk_snapshots.sql` — RLS-enabled table with no public policies.
- `supabase/functions/study-desk-sync/index.ts` — Deno edge function for `load`, `save`, and `delete`.
- `supabase/config.toml` — project reference and `verify_jwt = false` for the public function.
- `.env.example` — public `NEXT_PUBLIC_STUDY_SYNC_URL` setting for Vercel.

## Deploy

1. Restore the Supabase project in the dashboard.
2. Run the migration: `supabase db push` (or paste the SQL into the SQL editor).
3. Deploy the function: `supabase functions deploy study-desk-sync --no-verify-jwt`.
4. Set `STUDY_SYNC_ALLOWED_ORIGIN` to a comma-separated list of allowed origins if preview domains should also work.
5. In Vercel, set:
   ```text
   NEXT_PUBLIC_STUDY_SYNC_URL=https://unfplzqqotubcfcswnlo.functions.supabase.co/study-desk-sync
   ```
6. Reload the site and open `/study?tab=advanced`.

## Security model

- The browser generates a 128-bit sync code with `crypto.getRandomValues`.
- The edge function stores `SHA-256(pepper + ":" + code)` as the primary key. The code itself is never stored.
- The function validates a version-1 study state and caps payloads at 1.5 MB.
- Row Level Security is enabled and all privileges are revoked from `anon` and `authenticated`; only the service-role key inside the edge function can access the table.
- The service-role key and pepper are never compiled into the Next.js bundle.
- Visitors can delete their snapshot with the same sync code from the Advanced panel.

## Without Supabase

All Advanced Desk features still work locally. The sync panel simply reports that no endpoint is configured and offers a link to the deployment issue.
