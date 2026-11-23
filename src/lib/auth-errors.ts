/**
 * What Supabase says when a sign-in fails, and what a person can do about it.
 *
 * Two sources of error exist and they arrive differently:
 *
 *  • A refused provider (Google cancelled, consent denied, a redirect URI that
 *    is not on the allow-list) comes back in the URL. Supabase's default flow
 *    puts it in the **fragment**, which never reaches the server, so the login
 *    page has to read it in the browser.
 *  • A failed API call (rate limit, expired token, provider disabled) comes back
 *    as an `AuthError` from the client, with a message written for a developer.
 *
 * Both end up here so the page can say something true instead of printing
 * "AuthApiError: Email rate limit exceeded".
 */

export interface HashAuthError {
  /** A short machine code: `access_denied`, `otp_expired`, `server_error`… */
  code: string;
  /** The human sentence Supabase supplied, if any. */
  description: string;
}

function parse(hash: string): HashAuthError | null {
  const raw = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!raw) return null;
  const params = new URLSearchParams(raw);
  const code = params.get("error_code") ?? params.get("error") ?? "";
  const description = params.get("error_description") ?? "";
  if (!code && !description) return null;
  return {
    code: code.trim(),
    // Supabase URL-encodes spaces as `+` in the description.
    description: description.replaceAll("+", " ").trim().slice(0, 300),
  };
}

// Read once per hash value and memoised, so `getSnapshot` is referentially
// stable for `useSyncExternalStore` (a new object every render would loop).
let cachedHash = "";
let cachedResult: HashAuthError | null = null;

export function hashAuthErrorSnapshot(): HashAuthError | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash;
  if (hash === cachedHash) return cachedResult;
  cachedHash = hash;
  cachedResult = parse(hash);
  return cachedResult;
}

export function subscribeHashAuthError(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

/**
 * Drops a spent `#access_token=…` / `#error=…` from the address bar, and the
 * `?error=` parameters the server already read, so a reload does not replay a
 * message about something that has already been dealt with.
 */
export function clearAuthFragment(): void {
  if (typeof window === "undefined") return;
  const search = new URLSearchParams(window.location.search);
  const hadError = ["error", "error_code", "error_description"].filter((key) => search.has(key));
  for (const key of hadError) search.delete(key);
  if (!window.location.hash && hadError.length === 0) return;
  try {
    const query = search.toString();
    const url = `${window.location.pathname}${query ? `?${query}` : ""}`;
    window.history.replaceState(null, "", url);
    cachedHash = "";
    cachedResult = null;
  } catch {
    // Leaving the fragment costs nothing but privacy; never block the page.
  }
}

/**
 * Turns a provider or API message into a sentence that names the next action.
 *
 * Every branch ends with something the reader can do. "Something went wrong" is
 * not one of them.
 */
export function friendlyAuthError(message: string): string {
  const text = (message || "").toLowerCase();

  if (text.includes("rate limit") || text.includes("too many")) {
    return "Too many sign-in emails have been requested from this deployment in the last hour. Wait a little and try once more — or use Google, which has no such limit.";
  }
  if (text.includes("provider is not enabled") || text.includes("unsupported provider") || text.includes("provider not enabled")) {
    return "That sign-in method is not switched on for this project yet. The other option on this page still works.";
  }
  if (text.includes("expired") || text.includes("invalid") && text.includes("token")) {
    return "That link or code has expired, or it was already used. Ask for a fresh one — codes last an hour and work once.";
  }
  if (text.includes("redirect") && (text.includes("not allowed") || text.includes("invalid"))) {
    return "This deployment's address is not on the project's redirect allow-list, so Supabase refused to send you back. The owner needs to add it in Authentication → URL Configuration.";
  }
  if (text.includes("failed to fetch") || text.includes("networkerror") || text.includes("load failed")) {
    return "The browser could not reach the account server. Check the connection, or keep studying without an account — nothing here needs one.";
  }
  if (text.includes("email address") && text.includes("invalid")) {
    return "That address does not look like an email address to the account server. Correct it and try again.";
  }
  if (text.includes("signups not allowed") || text.includes("signup is disabled")) {
    return "New accounts are switched off on this project, so a new address cannot be added right now.";
  }
  if (text.includes("email not confirmed")) {
    return "That address has not been confirmed yet. Open the message that was sent, or request a new one.";
  }
  return message
    ? `${message} Nothing was saved; the site works exactly as before.`
    : "The sign-in did not finish. Nothing was saved; the site works exactly as before.";
}

/** Assistant copy for a refusal the provider put in the URL fragment. */
export function explainHashAuthError(error: HashAuthError): string {
  const code = error.code.toLowerCase();
  if (code.includes("access_denied")) {
    return "Google was closed, or permission was not granted. Nothing was shared and nothing was saved — try again, or use a one-time code instead.";
  }
  if (code.includes("otp_expired") || code.includes("expired")) {
    return "That link has expired, or it was already used once. Request a fresh one from this page — they last an hour.";
  }
  if (code.includes("server_error")) {
    return "The account server could not finish the request. That is usually momentary: try again in a minute, or use the other method.";
  }
  if (code.includes("provider") && code.includes("disabled")) {
    return "That sign-in method is not switched on for this project yet. The other option on this page still works.";
  }
  if (code.includes("redirect")) {
    return "This deployment's address is not on the project's redirect allow-list, so the account server refused to send you back here. The owner needs to add it in Authentication → URL Configuration.";
  }
  return friendlyAuthError(error.description || error.code);
}
