"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Props {
  onClose: () => void;
  onAuth?: () => void;
}

export function AuthModal({ onClose, onAuth }: Props) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const supabase = createClient();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          setError(error.message);
          return;
        }
        onAuth?.();
        onClose();
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo:
              process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
              `${window.location.origin}/auth/callback`,
            data: {
              display_name: name || email.split("@")[0],
            },
          },
        });
        if (error) {
          setError(error.message);
          return;
        }
        setSuccess(true);
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onClose}>
        <div className="absolute inset-0 bg-black/50 animate-in" style={{ animationDuration: "0.15s" }} />
        <div className="relative bg-background rounded-xl border border-border shadow-xl w-full max-w-sm mx-4 animate-scale p-6 text-center" onClick={e => e.stopPropagation()}>
          <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-semibold text-lg mb-2">Check your email</h2>
          <p className="text-sm text-muted-foreground mb-4">
            We sent a confirmation link to <span className="font-medium text-foreground">{email}</span>. Click the link to activate your account.
          </p>
          <button onClick={onClose} className="btn btn-primary w-full">
            Got it
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 animate-in" style={{ animationDuration: "0.15s" }} />

      {/* Modal */}
      <div className="relative bg-background rounded-xl border border-border shadow-xl w-full max-w-sm mx-4 animate-scale" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-semibold text-base">{mode === "login" ? "Sign in" : "Create account"}</h2>
          <button onClick={onClose} className="btn btn-ghost p-1 rounded-md">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={submit} className="p-4 space-y-3">
          {error && <div className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">{error}</div>}
          {mode === "register" && (
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="input" placeholder="Your name" />
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="input" placeholder="you@example.com" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} className="input" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary w-full h-9">
            {loading ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
          </button>
          <p className="text-center text-sm text-muted-foreground">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button type="button" onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
              className="text-foreground font-medium hover:underline underline-offset-4">
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
