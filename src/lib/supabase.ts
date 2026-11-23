"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * The one Supabase browser client.
 *
 * The whole account feature is **optional**. If `NEXT_PUBLIC_SUPABASE_URL` and
 * `NEXT_PUBLIC_SUPABASE_ANON_KEY` are not set, `getSupabase()` returns null and
 * every account surface says so plainly instead of pretending to sign in. The
 * site keeps working exactly as it did: local-only, no account, no network.
 *
 * Only the two public values live here. A service-role key must never appear in
 * this bundle — the anon key is what Row Level Security is designed to police,
 * and every policy in `supabase/migrations` is written for `auth.uid()`.
 */
const URL_ENV = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const KEY_ENV = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** True when both public values were present at build time. */
export const supabaseConfigured = Boolean(URL_ENV && KEY_ENV);

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!supabaseConfigured) return null;
  if (client) return client;
  client = createClient(URL_ENV, KEY_ENV, {
    auth: {
      // The session is kept in localStorage under a `sb-` key and refreshed in
      // the background. No cookies are used, so there is nothing for a
      // third-party request to carry.
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: "pkce",
    },
    global: {
      headers: { "x-application-name": "ap-study-hub" },
    },
  });
  return client;
}

/** Where avatars live in Supabase Storage. Created by the migration's SQL. */
export const AVATAR_BUCKET = "avatars";

/** 2 MB is plenty for a 512px avatar and keeps a phone upload quick. */
export const MAX_AVATAR_BYTES = 2 * 1024 * 1024;
