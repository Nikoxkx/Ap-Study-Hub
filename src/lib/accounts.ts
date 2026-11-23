/**
 * Accounts, switched off for now.
 *
 * The optional account — Google, one-time codes, the synced photo, the five
 * counts, the permissions card — is built and working, but it is not offered on
 * the site at the moment. One constant decides, and everything that could
 * mention it asks this constant rather than repeating the decision:
 *
 *  - `SiteHeader` / `SiteFooter` / the search palette drop their links
 *  - Settings drops the Account tab
 *  - `/login` and `/account` explain the pause instead of drawing a form
 *  - the sitemap leaves both pages out, and they are `noindex`
 *  - `AuthProvider` makes no request and reads no stored session
 *  - the privacy page stops describing a session that cannot exist
 *
 * Flip this to `true` and all of it comes back in one commit; nothing was
 * deleted. The provider work underneath (implicit flow, fragment errors,
 * cross-device returns, `serverAuthProviders`) is untouched and still tested by
 * `validate:auth` — it simply has no door on the site while this is false.
 */
export const ACCOUNTS_ENABLED = false;

/**
 * Why the pause is shown to visitors, in one sentence, so the copy on the two
 * paused pages and in the privacy page cannot drift apart.
 */
export const ACCOUNTS_PAUSED_REASON =
  "the optional account is being finished, and nothing on this site needs one";
