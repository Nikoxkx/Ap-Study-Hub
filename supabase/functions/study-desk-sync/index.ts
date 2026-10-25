// Supabase Edge Function: Study Desk Sync
//
// Deploy with:
//   supabase functions deploy study-desk-sync --no-verify-jwt
//
// Required secrets (already created through the Supabase connector):
//   STUDY_SYNC_PEPPER
//   STUDY_SYNC_ALLOWED_ORIGIN
//
// Built-in edge-function env vars used here:
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
//
// The browser sends only a high-entropy sync code and the version-1 study
// state. The code is never stored: a SHA-256 digest of pepper + code is the
// table key. No service-role key or pepper is ever sent to the client.

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const PEPPER = Deno.env.get("STUDY_SYNC_PEPPER") ?? "";
const ALLOWED_ORIGINS = (Deno.env.get("STUDY_SYNC_ALLOWED_ORIGIN") ?? "*")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const MAX_BYTES = 1_500_000;

interface SyncRequest {
  action?: string;
  syncCode?: string;
  state?: unknown;
}

function json(body: unknown, status = 200, origin?: string | null): Response {
  const allowed = ALLOWED_ORIGINS.includes("*") || (origin && ALLOWED_ORIGINS.includes(origin));
  const headers: Record<string, string> = {
    "Access-Control-Allow-Origin": allowed ? (origin ?? "*") : (ALLOWED_ORIGINS[0] ?? "null"),
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    "Vary": "Origin",
  };
  return new Response(JSON.stringify(body), { status, headers });
}

async function hashKey(code: string): Promise<string> {
  const data = new TextEncoder().encode(`${PEPPER}:${code}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStudyState(value: unknown): value is Record<string, unknown> {
  if (!isObject(value) || value.version !== 1) return false;
  return isObject(value.reviews) && Array.isArray(value.events);
}

async function rest(path: string, init: RequestInit = {}): Promise<Response> {
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
}

Deno.serve(async (request: Request) => {
  const origin = request.headers.get("origin");
  if (request.method === "OPTIONS") return json(null, 204, origin);
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, origin);
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !PEPPER) {
    return json({ error: "Sync service is not configured" }, 503, origin);
  }

  try {
    const raw = await request.text();
    if (raw.length > MAX_BYTES) return json({ error: "Snapshot is too large" }, 413, origin);
    const body = JSON.parse(raw) as SyncRequest;
    const code = (body.syncCode ?? "").trim();
    if (code.length < 12 || code.length > 200) {
      return json({ error: "Sync code must be 12–200 characters" }, 400, origin);
    }

    const key = await hashKey(code);
    if (body.action === "load") {
      const response = await rest(`study_desk_snapshots?sync_key=eq.${key}&select=state,updated_at`);
      if (!response.ok) return json({ error: "Could not load snapshot" }, 502, origin);
      const rows = await response.json() as Array<{ state: unknown; updated_at: string }>;
      return json({ state: rows[0]?.state ?? null, updatedAt: rows[0]?.updated_at ?? null }, 200, origin);
    }

    if (body.action === "save") {
      if (!isStudyState(body.state)) return json({ error: "Invalid study state" }, 400, origin);
      const response = await rest("study_desk_snapshots?on_conflict=sync_key", {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
        body: JSON.stringify([{
          sync_key: key,
          state: body.state,
          version: 1,
          updated_at: new Date().toISOString(),
        }]),
      });
      if (!response.ok) return json({ error: "Could not save snapshot" }, 502, origin);
      return json({ ok: true, updatedAt: new Date().toISOString() }, 200, origin);
    }

    if (body.action === "delete") {
      const response = await rest(`study_desk_snapshots?sync_key=eq.${key}`, { method: "DELETE" });
      if (!response.ok) return json({ error: "Could not delete snapshot" }, 502, origin);
      return json({ ok: true }, 200, origin);
    }

    return json({ error: "Unknown action" }, 400, origin);
  } catch {
    return json({ error: "Invalid request" }, 400, origin);
  }
});
