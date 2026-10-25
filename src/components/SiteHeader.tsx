import Link from "next/link";
import { MobileNav } from "./MobileNav";

/**
 * Site header.
 *
 * One glass strip: wordmark left, pill navigation centred, actions right.
 * No logo mark, no theme switch, no rails — matching the minimal Cirrus
 * reference. The strip blurs whatever scrolls beneath it, so the sky
 * photographs re-frost behind the bar as the page moves.
 */

const navLinks = [
  { href: "/#courses", label: "Courses" },
  { href: "/guides", label: "Guides" },
  { href: "/videos", label: "Videos" },
  { href: "/study", label: "Study desk" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header data-site-header className="site-header sticky top-0 z-40">
      <div className="wrap relative flex h-[4.25rem] items-center justify-between gap-4">
        <Link href="/" className="site-wordmark">
          AP Study Hub
        </Link>

        <nav aria-label="Primary" className="hidden md:block absolute left-1/2 -translate-x-1/2">
          <ul className="pill-nav">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <Link href="/search" className="pill-link hidden sm:inline-flex">
            Search
          </Link>
          <Link href="/study" className="pill-cta">
            Start free
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
