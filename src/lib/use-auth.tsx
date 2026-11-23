"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session } from "@supabase/supabase-js";
import {
  AVATAR_BUCKET,
  MAX_AVATAR_BYTES,
  getSupabase,
  loadAuthProviders,
  supabaseConfigured,
  type AuthProviders,
} from "./supabase";
import { prepareUpload } from "./custom-assets";
import { friendlyAuthError } from "./auth-errors";

/**
 * Optional accounts.
 *
 * The site is local-first, and this must not change that: if Supabase is not
 * configured, nothing here runs and every surface says the feature is off. If it
 * is configured, signing in is still a choice, and the things you sync are named
 * individually rather than swept up as "your data".
 *
 * Sign-in is a one-time code, emailed or texted — **there is no password field
 * anywhere in this app**, so there is no password for a student to reuse, leak,
 * or type into a lookalike page. The Supabase project decides whether email,
 * phone, or both are enabled; this code simply reports what happened.
 */

export type AuthStatus = "unconfigured" | "loading" | "signed-out" | "signed-in";
export type ContactKind = "email" | "phone";

export interface AccountProfile {
  displayName: string;
  avatarUrl: string;
  contactKind: "email" | "phone" | "none";
  /** A masked version of the address or number, never the full value. */
  contactHint: string;
}

export interface CloudStats {
  cardsReviewed: number;
  questionsAnswered: number;
  minutes: number;
  streak: number;
  lastActive: string | null;
  affinity: { slug: string; score: number }[];
}

export interface StatsPayload {
  cardsReviewed: number;
  questionsAnswered: number;
  minutes: number;
  streak: number;
  affinity: { slug: string; score: number }[];
}

export interface AuthResult {
  ok: boolean;
  message: string;
}

interface AuthContextValue {
  configured: boolean;
  status: AuthStatus;
  session: Session | null;
  userId: string | null;
  /** How this session was created: "google", "email", "phone", or null. Used by
   *  the permissions card, which must not claim Google access that never
   *  happened. */
  provider: string | null;
  /** The best identifier we can show without printing the whole address. */
  maskedContact: string;
  profile: AccountProfile | null;
  cloudStats: CloudStats | null;
  requestCode: (kind: ContactKind, value: string) => Promise<AuthResult>;
  /** Which methods the Supabase project has switched on (email, phone, Google). */
  providers: AuthProviders;
  /** Start the Google OAuth round trip. Resolves with an error message on failure. */
  signInWithGoogle: (next?: string) => Promise<AuthResult>;
  verifyCode: (kind: ContactKind, value: string, token: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  saveProfile: (displayName: string) => Promise<AuthResult>;
  uploadAvatar: (file: File) => Promise<AuthResult>;
  removeAvatar: () => Promise<AuthResult>;
  pushStats: (stats: StatsPayload) => Promise<AuthResult>;
  reload: () => Promise<void>;
  deleteCloudData: () => Promise<AuthResult>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const TABLE_PROFILES = "profiles";
const TABLE_STATS = "study_stats";

function mask(value: string, kind: ContactKind): string {
  if (kind === "email") {
    const [name, domain] = value.split("@");
    if (!domain) return value.slice(0, 3);
    const head = name.slice(0, 2);
    return `${head}${"•".repeat(Math.max(2, name.length - 2))}@${domain}`;
  }
  const digits = value.replace(/\D/g, "");
  return digits.length > 4 ? `••• ••• ${digits.slice(-4)}` : digits;
}

function messageOf(error: unknown, fallback: string): string {
  if (error && typeof error === "object" && "message" in error) {
    const text = String((error as { message: unknown }).message ?? "");
    if (text) return text;
  }
  return fallback;
}

/** A masked identifier for whichever contact the account actually uses. */
function contactFor(session: Session | null): { kind: AccountProfile["contactKind"]; masked: string } {
  const user = session?.user;
  if (!user) return { kind: "none", masked: "" };
  if (user.phone) return { kind: "phone", masked: mask(user.phone, "phone") };
  if (user.email) return { kind: "email", masked: mask(user.email, "email") };
  return { kind: "none", masked: "" };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // The client is a module singleton, so asking for it during the first render
  // is a lookup, not a side effect. Without one, the status is decided before
  // any effect runs and nothing below can flash a spinner.
  const client = getSupabase();
  const [status, setStatus] = useState<AuthStatus>(() =>
    supabaseConfigured ? "loading" : "unconfigured",
  );
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<AccountProfile | null>(null);
  const [cloudStats, setCloudStats] = useState<CloudStats | null>(null);
  // Starts as "email only, unknown" so the first paint never flashes a Google
  // button that this project cannot honour; the real answer arrives from
  // `/auth/v1/settings` a moment later.
  const [providers, setProviders] = useState<AuthProviders>({
    email: supabaseConfigured,
    phone: false,
    google: false,
    known: !supabaseConfigured,
  });

  const userId = session?.user?.id ?? null;
  const contact = contactFor(session);

  useEffect(() => {
    if (!client) return;
    let alive = true;

    void client.auth
      .getSession()
      .then(({ data }) => {
        if (!alive) return;
        setSession(data.session);
        setStatus(data.session ? "signed-in" : "signed-out");
      })
      .catch(() => {
        if (alive) setStatus("signed-out");
      });

    const { data } = client.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setStatus(next ? "signed-in" : "signed-out");
    });

    return () => {
      alive = false;
      data.subscription.unsubscribe();
    };
  }, [client]);

  /** Read the profile row (and the synced stats snapshot) for the signed-in user. */
  const load = useCallback(async () => {
    if (!client || !userId) return;
    const [profileRow, statsRow] = await Promise.all([
      client
        .from(TABLE_PROFILES)
        .select("display_name, avatar_url, updated_at")
        .eq("id", userId)
        .maybeSingle(),
      client
        .from(TABLE_STATS)
        .select("cards_reviewed, questions_answered, minutes, streak, last_active, affinity")
        .eq("user_id", userId)
        .maybeSingle(),
    ]);

    setProfile((current) => ({
      displayName: profileRow.data?.display_name ?? current?.displayName ?? "",
      avatarUrl: profileRow.data?.avatar_url ?? current?.avatarUrl ?? "",
      contactKind: contact.kind,
      contactHint: contact.masked,
    }));

    if (statsRow.data) {
      const affinity = Array.isArray(statsRow.data.affinity)
        ? (statsRow.data.affinity as { slug: string; score: number }[]).slice(0, 6)
        : [];
      setCloudStats({
        cardsReviewed: Number(statsRow.data.cards_reviewed ?? 0),
        questionsAnswered: Number(statsRow.data.questions_answered ?? 0),
        minutes: Number(statsRow.data.minutes ?? 0),
        streak: Number(statsRow.data.streak ?? 0),
        lastActive: (statsRow.data.last_active as string | null) ?? null,
        affinity,
      });
    } else {
      setCloudStats(null);
    }
  }, [client, userId, contact.kind, contact.masked]);

  useEffect(() => {
    if (!userId) return;
    // Reading the row is a network round-trip, so it is scheduled after paint
    // rather than folded into the effect body: the profile card renders its
    // signed-in shell immediately and fills in when the row arrives.
    let alive = true;
    const timer = setTimeout(() => {
      if (!alive) return;
      void load().catch(() => undefined);
    }, 0);
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [userId, load]);

  useEffect(() => {
    if (!supabaseConfigured) return;
    let alive = true;
    void loadAuthProviders().then((next) => {
      if (alive) setProviders(next);
    });
    return () => {
      alive = false;
    };
  }, []);

  /**
   * Google sign-in.
   *
   * Supabase runs the OAuth dance and returns to `redirectTo`, where the client
   * (PKCE, detectSessionInUrl) finishes the exchange. `next` is carried through
   * as a query value so the login page can put the visitor back where they
   * started. There is no password anywhere in this flow either.
   */
  const signInWithGoogle = useCallback(
    async (next?: string): Promise<AuthResult> => {
      if (!client) return { ok: false, message: "Sign-in is not configured on this deployment." };
      if (!providers.google) {
        return {
          ok: false,
          message: "Google sign-in is not switched on for this project yet.",
        };
      }
      try {
        const origin = typeof window === "undefined" ? "" : window.location.origin;
        const target = new URL(`${origin}/login`);
        if (next && next.startsWith("/") && !next.startsWith("//")) target.searchParams.set("next", next);
        const { error } = await client.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: target.toString(),
            // Supabase asks Google for `openid email profile` and nothing more.
            // `select_account` keeps a shared laptop from silently reusing
            // someone else's Google session; `online` means no refresh token is
            // issued, because this site never calls a Google API after sign-in.
            queryParams: { prompt: "select_account", access_type: "online" },
          },
        });
        if (error) return { ok: false, message: friendlyAuthError(error.message) };
        // The browser is navigating away; nothing after this runs in practice.
        return { ok: true, message: "Opening Google…" };
      } catch (error) {
        return { ok: false, message: messageOf(error, "Google sign-in could not start.") };
      }
    },
    [client, providers.google],
  );

  const requestCode = useCallback(
    async (kind: ContactKind, value: string): Promise<AuthResult> => {
      if (!client) return { ok: false, message: "Sign-in is not configured on this deployment." };
      const trimmed = value.trim();
      if (!trimmed) return { ok: false, message: "Enter an address or a phone number first." };
      try {
        // The link returns to the page the request came from, errors stripped,
        // so a visitor who started at /login?next=/settings lands back there
        // signed in instead of being dropped on /account.
        const returnTo = (() => {
          if (typeof window === "undefined") return undefined;
          const here = new URL(window.location.href);
          here.hash = "";
          for (const key of ["error", "error_code", "error_description"]) {
            here.searchParams.delete(key);
          }
          return here.toString();
        })();

        const { error } =
          kind === "email"
            ? await client.auth.signInWithOtp({
                email: trimmed,
                options: {
                  shouldCreateUser: true,
                  emailRedirectTo: returnTo,
                },
              })
            : await client.auth.signInWithOtp({ phone: trimmed });
        if (error) return { ok: false, message: friendlyAuthError(error.message) };
        return {
          ok: true,
          message:
            kind === "email"
              ? "If that address can receive mail, a sign-in link is on its way — and a code too, if this project's email template includes one. Either works here."
              : "If that number can receive texts, a one-time code is on its way. It expires shortly.",
        };
      } catch (error) {
        return { ok: false, message: friendlyAuthError(messageOf(error, "The code could not be sent.")) };
      }
    },
    [client],
  );

  const verifyCode = useCallback(
    async (kind: ContactKind, value: string, token: string): Promise<AuthResult> => {
      if (!client) return { ok: false, message: "Sign-in is not configured on this deployment." };
      // Supabase's code length is project configuration (6–10 digits); accept
      // whatever arrives rather than hard-coding today's length.
      const clean = token.replace(/\D/g, "").slice(0, 10);
      if (clean.length < 4) return { ok: false, message: "That code looks too short." };
      try {
        const { error } =
          kind === "email"
            ? await client.auth.verifyOtp({ email: value.trim(), token: clean, type: "email" })
            : await client.auth.verifyOtp({ phone: value.trim(), token: clean, type: "sms" });
        if (error) {
          // "Token has expired or is invalid" is the single most common failure
          // here, and the useful half of the answer is "ask for a new one".
          const friendly = /expired|invalid/i.test(error.message)
            ? "That code has expired or was already used. Send a fresh one — codes work once and last an hour."
            : friendlyAuthError(error.message);
          return { ok: false, message: friendly };
        }
        return { ok: true, message: "Signed in. Your local study record has not moved." };
      } catch (error) {
        return { ok: false, message: messageOf(error, "That code was not accepted.") };
      }
    },
    [client],
  );

  const signOut = useCallback(async () => {
    if (!client) return;
    await client.auth.signOut().catch(() => undefined);
    setProfile(null);
    setCloudStats(null);
  }, [client]);

  const saveProfile = useCallback(
    async (displayName: string): Promise<AuthResult> => {
      if (!client || !userId) return { ok: false, message: "Sign in first." };
      const name = displayName.trim().slice(0, 60);
      try {
        const { error } = await client
          .from(TABLE_PROFILES)
          .upsert({ id: userId, display_name: name }, { onConflict: "id" });
        if (error) return { ok: false, message: error.message };
        setProfile((current) => ({
          displayName: name,
          avatarUrl: current?.avatarUrl ?? "",
          contactKind: contact.kind,
          contactHint: contact.masked,
        }));
        return { ok: true, message: "Name saved." };
      } catch (error) {
        return { ok: false, message: messageOf(error, "The name could not be saved.") };
      }
    },
    [client, userId, contact.kind, contact.masked],
  );

  const uploadAvatar = useCallback(
    async (file: File): Promise<AuthResult> => {
      if (!client || !userId) return { ok: false, message: "Sign in first." };
      // The same pipeline the wallpaper uses: an iPhone HEIC is decoded and
      // re-encoded as JPEG here, so the picker failing on Safari is not a thing
      // that only happens to backgrounds.
      const prepared = await prepareUpload(file);
      if (!prepared.ok) {
        return {
          ok: false,
          message:
            prepared.reason === "too-large"
              ? "Avatars must be under 2 MB, even after re-sizing."
              : prepared.reason === "undecodable"
                ? "That picture could not be decoded on this device. Try exporting it as JPEG."
                : "That is not a picture this site can store.",
        };
      }
      if (prepared.prepared.kind !== "image") {
        return { ok: false, message: "A profile photo has to be a still image, not a video." };
      }
      if (prepared.prepared.blob.size > MAX_AVATAR_BYTES) {
        return { ok: false, message: "Avatars must be under 2 MB, even after re-sizing." };
      }
      const sniffed = prepared.prepared.type;
      try {
        const ext = sniffed.split("/")[1] ?? "jpeg";
        const path = `${userId}/avatar.${ext}`;
        const { error } = await client.storage
          .from(AVATAR_BUCKET)
          .upload(path, prepared.prepared.blob, { upsert: true, contentType: sniffed, cacheControl: "3600" });
        if (error) return { ok: false, message: error.message };
        const { data } = client.storage.from(AVATAR_BUCKET).getPublicUrl(path);
        const url = `${data.publicUrl}?v=${Date.now()}`;
        const { error: saveError } = await client
          .from(TABLE_PROFILES)
          .upsert({ id: userId, avatar_url: url }, { onConflict: "id" });
        if (saveError) return { ok: false, message: saveError.message };
        setProfile((current) => ({
          displayName: current?.displayName ?? "",
          avatarUrl: url,
          contactKind: contact.kind,
          contactHint: contact.masked,
        }));
        return { ok: true, message: "Photo updated." };
      } catch (error) {
        return { ok: false, message: messageOf(error, "The photo could not be uploaded.") };
      }
    },
    [client, userId, contact.kind, contact.masked],
  );

  const removeAvatar = useCallback(async (): Promise<AuthResult> => {
    if (!client || !userId) return { ok: false, message: "Sign in first." };
    try {
      const { data: listed } = await client.storage.from(AVATAR_BUCKET).list(userId);
      const paths = (listed ?? []).map((entry) => `${userId}/${entry.name}`);
      if (paths.length) await client.storage.from(AVATAR_BUCKET).remove(paths);
      const { error } = await client
        .from(TABLE_PROFILES)
        .upsert({ id: userId, avatar_url: "" }, { onConflict: "id" });
      if (error) return { ok: false, message: error.message };
      setProfile((current) => ({
        displayName: current?.displayName ?? "",
        avatarUrl: "",
        contactKind: contact.kind,
        contactHint: contact.masked,
      }));
      return { ok: true, message: "Photo removed." };
    } catch (error) {
      return { ok: false, message: messageOf(error, "The photo could not be removed.") };
    }
  }, [client, userId, contact.kind, contact.masked]);

  const pushStats = useCallback(
    async (stats: StatsPayload): Promise<AuthResult> => {
      if (!client || !userId) return { ok: false, message: "Sign in first." };
      try {
        const payload = {
          user_id: userId,
          cards_reviewed: Math.max(0, Math.round(stats.cardsReviewed)),
          questions_answered: Math.max(0, Math.round(stats.questionsAnswered)),
          minutes: Math.max(0, Math.round(stats.minutes)),
          streak: Math.max(0, Math.round(stats.streak)),
          affinity: stats.affinity.slice(0, 12),
          last_active: new Date().toISOString(),
        };
        const { error } = await client
          .from(TABLE_STATS)
          .upsert(payload, { onConflict: "user_id" });
        if (error) return { ok: false, message: error.message };
        setCloudStats({
          cardsReviewed: payload.cards_reviewed,
          questionsAnswered: payload.questions_answered,
          minutes: payload.minutes,
          streak: payload.streak,
          lastActive: payload.last_active,
          affinity: payload.affinity,
        });
        return { ok: true, message: "Today's counts saved to your account." };
      } catch (error) {
        return { ok: false, message: messageOf(error, "The counts could not be saved.") };
      }
    },
    [client, userId],
  );

  const deleteCloudData = useCallback(async (): Promise<AuthResult> => {
    if (!client || !userId) return { ok: false, message: "Sign in first." };
    try {
      await client.storage.from(AVATAR_BUCKET).remove([`${userId}/avatar.png`]);
      const { data: listed } = await client.storage.from(AVATAR_BUCKET).list(userId);
      const paths = (listed ?? []).map((entry) => `${userId}/${entry.name}`);
      if (paths.length) await client.storage.from(AVATAR_BUCKET).remove(paths);
      const { error: statsError } = await client
        .from(TABLE_STATS)
        .delete()
        .eq("user_id", userId);
      if (statsError) return { ok: false, message: statsError.message };
      const { error: profileError } = await client
        .from(TABLE_PROFILES)
        .delete()
        .eq("id", userId);
      if (profileError) return { ok: false, message: profileError.message };
      setProfile(null);
      setCloudStats(null);
      return { ok: true, message: "The account's cloud rows and photo are gone. Your local work is untouched." };
    } catch (error) {
      return { ok: false, message: messageOf(error, "The cloud copy could not be deleted.") };
    }
  }, [client, userId]);

  // The provider that actually created the session. Supabase records it on the
  // user, so an email one-time-code sign-in cannot be mistaken for Google.
  const provider = useMemo(() => {
    const fromMeta = session?.user?.app_metadata?.provider;
    if (typeof fromMeta === "string" && fromMeta) return fromMeta;
    const identity = session?.user?.identities?.[0]?.provider;
    return typeof identity === "string" && identity ? identity : null;
  }, [session]);

  const value = useMemo<AuthContextValue>(
    () => ({
      configured: supabaseConfigured,
      status,
      session,
      userId,
      maskedContact: contact.masked,
      profile,
      cloudStats,
      requestCode,
      providers,
      provider,
      signInWithGoogle,
      verifyCode,
      signOut,
      saveProfile,
      uploadAvatar,
      removeAvatar,
      pushStats,
      reload: load,
      deleteCloudData,
    }),
    [
      status,
      session,
      userId,
      contact.masked,
      profile,
      cloudStats,
      requestCode,
      providers,
      provider,
      signInWithGoogle,
      verifyCode,
      signOut,
      saveProfile,
      uploadAvatar,
      removeAvatar,
      pushStats,
      load,
      deleteCloudData,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/** Read the account state. Throws outside the provider, by design. */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside <AuthProvider> (see app/layout.tsx).");
  }
  return context;
}
