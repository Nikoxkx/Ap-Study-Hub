-- Optional accounts: a display name, an avatar, and five coarse counts.
--
-- Everything here is additive and inert until the site is built with
-- NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY. No lesson, answer,
-- draft, or essay is ever written to these tables — the client only ever sends
-- the fields declared below.
--
-- The security model is Row Level Security keyed to auth.uid(): the anon key is
-- public by design, and these policies are what stop it from reading or writing
-- anyone else's row.

-- ---------------------------------------------------------------- profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '',
  avatar_url text not null default '',
  updated_at timestamptz not null default now(),
  constraint profiles_display_name_length check (char_length(display_name) <= 60),
  -- The URL is produced by this project's Storage, not typed by a visitor.
  constraint profiles_avatar_url_length check (char_length(avatar_url) <= 500)
);

alter table public.profiles enable row level security;

drop policy if exists "profiles read own" on public.profiles;
create policy "profiles read own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles insert own" on public.profiles;
create policy "profiles insert own" on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists "profiles update own" on public.profiles;
create policy "profiles update own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "profiles delete own" on public.profiles;
create policy "profiles delete own" on public.profiles
  for delete using (auth.uid() = id);

revoke all on public.profiles from anon;
grant select, insert, update, delete on public.profiles to authenticated;

-- ------------------------------------------------------------- study_stats
create table if not exists public.study_stats (
  user_id uuid primary key references auth.users (id) on delete cascade,
  cards_reviewed integer not null default 0 check (cards_reviewed >= 0),
  questions_answered integer not null default 0 check (questions_answered >= 0),
  minutes integer not null default 0 check (minutes >= 0),
  streak integer not null default 0 check (streak >= 0),
  -- [{"slug":"apush","score":12.4}, …] — no item IDs, no answers.
  affinity jsonb not null default '[]'::jsonb
    check (jsonb_typeof(affinity) = 'array' and jsonb_array_length(affinity) <= 12),
  last_active timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.study_stats enable row level security;

drop policy if exists "stats read own" on public.study_stats;
create policy "stats read own" on public.study_stats
  for select using (auth.uid() = user_id);

drop policy if exists "stats insert own" on public.study_stats;
create policy "stats insert own" on public.study_stats
  for insert with check (auth.uid() = user_id);

drop policy if exists "stats update own" on public.study_stats;
create policy "stats update own" on public.study_stats
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "stats delete own" on public.study_stats;
create policy "stats delete own" on public.study_stats
  for delete using (auth.uid() = user_id);

revoke all on public.study_stats from anon;
grant select, insert, update, delete on public.study_stats to authenticated;

-- ------------------------------------------------------------------ avatars
-- Public read (so an <img> can show the photo), write-only-your-own-folder.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'avatars',
  'avatars',
  true,
  2097152,
  array['image/png', 'image/jpeg', 'image/webp', 'image/gif']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "avatars public read" on storage.objects;
create policy "avatars public read" on storage.objects
  for select using (bucket_id = 'avatars');

drop policy if exists "avatars insert own folder" on storage.objects;
create policy "avatars insert own folder" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "avatars update own folder" on storage.objects;
create policy "avatars update own folder" on storage.objects
  for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "avatars delete own folder" on storage.objects;
create policy "avatars delete own folder" on storage.objects
  for delete to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

-- --------------------------------------------------------- updated_at helper
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

drop trigger if exists study_stats_touch_updated_at on public.study_stats;
create trigger study_stats_touch_updated_at
  before update on public.study_stats
  for each row execute function public.touch_updated_at();
