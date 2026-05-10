import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "AP Study Hub — APUSH · AP Lang · AP Seminar",
  description: "Free AP exam preparation: study guides, flashcards, practice questions, and video lessons.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-background">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.theme==='dark'||(!localStorage.theme&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <AuthProvider>
            <Navbar />

            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="border-t border-border bg-muted/30 py-8 mt-12">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
                <p className="font-semibold text-sm mb-1">AP Study Hub</p>
                <p className="text-xs text-muted-foreground">Created by <span className="font-medium text-foreground">Yeisbel Pena</span></p>
                <p className="text-[10px] text-muted-foreground mt-3">Not affiliated with College Board®</p>
              </div>
            </footer>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
