"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  clearAuthFragment,
  explainHashAuthError,
  hashAuthErrorSnapshot,
  friendlyAuthError,
  subscribeHashAuthError,
} from "@/lib/auth-errors";

/**
 * "Why did sign-in stop?"
 *
 * A refused Google consent, an expired link, or a redirect the project will not
 * allow comes back in the URL fragment, which no server component can read. This
 * is the one place that reads it, on every page a sign-in can return to
 * (`/login` and `/account`), and the one place that strips it afterwards so the
 * address bar does not keep a spent token.
 *
 * `serverMessage` is the query-string case (`?error=access_denied`), which the
 * login page has already read on the server and passed down.
 */
export function AuthReturnNotice({ serverMessage = "" }: { serverMessage?: string }) {
  const hashError = useSyncExternalStore(subscribeHashAuthError, hashAuthErrorSnapshot, () => null);

  useEffect(() => {
    if (hashError || serverMessage) clearAuthFragment();
  }, [hashError, serverMessage]);

  const text = hashError
    ? explainHashAuthError(hashError)
    : serverMessage
      ? friendlyAuthError(serverMessage)
      : "";

  if (!text) return null;

  return (
    <p className="settings-note settings-note-warn signin-return" role="alert">
      <strong>Sign-in did not finish.</strong> {text}
    </p>
  );
}

export default AuthReturnNotice;
