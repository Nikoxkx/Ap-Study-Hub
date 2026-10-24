-- Optional Study Desk sync.
--
-- The table is intentionally inaccessible to anon and authenticated roles.
-- Only the study-desk-sync edge function, using the service-role key held by
-- Supabase, reads or writes it. The sync code is never stored; a peppered
-- SHA-256 digest is the primary key.

CREATE TABLE IF NOT EXISTS public.study_desk_snapshots (
  sync_key text PRIMARY KEY,
  state jsonb NOT NULL,
  version integer NOT NULL DEFAULT 1,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.study_desk_snapshots ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.study_desk_snapshots FROM anon, authenticated;

CREATE INDEX IF NOT EXISTS study_desk_snapshots_updated_at_idx
  ON public.study_desk_snapshots (updated_at DESC);

COMMENT ON TABLE public.study_desk_snapshots IS
  'Opt-in Study Desk snapshots keyed by a peppered sync-code hash. No public policies.';
