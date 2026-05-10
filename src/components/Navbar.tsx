"use client";
import Link from "next/link";
import { useState } from "react";
import { AuthModal } from "./AuthModal";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "./AuthProvider";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { user, loading, signOut } = useAuth();

  const displayName = user?.user_metadata?.display_name || user?.email?.split("@")[0] || "User";

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex h-14 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mr-6 group">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold transition-transform group-hover:scale-105">AP</div>
            <span className="font-semibold text-sm tracking-tight hidden sm:inline">Study Hub</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1">
            <NavItem href="/course/apush" label="APUSH" />
            <NavItem href="/course/ap-lang" label="AP Lang" />
            <NavItem href="/course/ap-seminar" label="AP Seminar" />
            {user && <NavItem href="/dashboard" label="Dashboard" />}
          </nav>

          {/* Search + Theme + Auth */}
          <div className="flex items-center gap-1.5 ml-auto">
            <div className="hidden sm:block w-48 lg:w-56">
              <SearchBar />
            </div>
            <ThemeToggle />
            {loading ? (
              <div className="w-16 h-8 skeleton rounded-md" />
            ) : user ? (
              <div className="flex items-center gap-1.5">
                <Link href="/dashboard" className="btn btn-ghost text-xs h-8 px-2 hidden md:inline-flex">
                  {displayName}
                </Link>
                <button onClick={signOut} className="btn btn-outline text-xs h-8 px-2.5">
                  Sign out
                </button>
              </div>
            ) : (
              <button onClick={() => setAuthOpen(true)} className="btn btn-primary text-xs h-8 px-3">
                Sign in
              </button>
            )}

            {/* Mobile toggle */}
            <button className="md:hidden btn btn-ghost p-1.5" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 9h16.5m-16.5 6.75h16.5" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border p-4 space-y-2 animate-slide-down bg-background">
            <div className="sm:hidden mb-3"><SearchBar /></div>
            <MobileLink href="/course/apush" label="APUSH" onClick={() => setMobileOpen(false)} />
            <MobileLink href="/course/ap-lang" label="AP Lang" onClick={() => setMobileOpen(false)} />
            <MobileLink href="/course/ap-seminar" label="AP Seminar" onClick={() => setMobileOpen(false)} />
            {user && <MobileLink href="/dashboard" label="Dashboard" onClick={() => setMobileOpen(false)} />}
          </div>
        )}
      </header>
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} onAuth={() => setAuthOpen(false)} />}
    </>
  );
}

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted">
      {label}
    </Link>
  );
}

function MobileLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-muted transition-colors">
      <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
      {label}
    </Link>
  );
}
