/**
 * Which sign-in methods this deployment actually has — read on the server.
 *
 * `/login` would otherwise have to wait for the browser to fetch
 * `/auth/v1/settings` before it could decide what to draw, which meant a frame
 * where the Google button looked inactive on a deployment that has it switched
 * on. Reading it here puts the truth in the first paint: the Right button, and
 * the right note when the provider is missing.
 *
 * Only public values are used, the result is cached for a minute, and a failed
 * request is reported as "unknown" rather than as "nothing is available" — an
 * account server that is briefly unreachable must not look like a broken site.
 */

export interface ServerAuthProviders {
  email: boolean;
  phone: boolean;
  google: boolean;
  known: boolean;
}

const UNKNOWN: ServerAuthProviders = { email: true, phone: false, google: false, known: false };

export async function serverAuthProviders(): Promise<ServerAuthProviders> {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").replace(/\/+$/, "");
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  if (!url || !key) return { ...UNKNOWN, email: false, known: true };

  try {
    const response = await fetch(`${url}/auth/v1/settings`, {
      headers: { apikey: key },
      // Enabling a provider is a rare event; a minute of staleness is a fair
      // trade for keeping this off the request's critical path.
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(2500),
    });
    if (!response.ok) return UNKNOWN;
    const data = (await response.json()) as {
      external_email_enabled?: boolean;
      external_phone_enabled?: boolean;
      external_google_enabled?: boolean;
    };
    return {
      email: data.external_email_enabled !== false,
      phone: data.external_phone_enabled === true,
      google: data.external_google_enabled === true,
      known: true,
    };
  } catch {
    return UNKNOWN;
  }
}
