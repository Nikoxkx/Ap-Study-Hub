import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, SectionHead } from "@/components/Furniture";
import { GlassCard } from "@/components/ui/GlassCard";
import { site, absoluteUrl, formatDate, socialImages } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Privacy · your study stays yours",
  description:
    "No cookies, analytics, or trackers. Real YouTube thumbnails are static images; video frames and optional Study Desk sync are opt-in.",
  alternates: { canonical: "/privacy" },
  openGraph: { images: socialImages,
    title: "Your study stays yours · AP Study Hub",
    description: "No cookies, no analytics, no trackers. Static YouTube thumbnails appear on video pages; players and sync are opt-in.",
    url: absoluteUrl("/privacy"),
  },
  twitter: { card: "summary_large_image", images: socialImages },
};

/**
 * Privacy.
 *
 * Short because there is genuinely not much to say, and specific because a
 * privacy page that describes "your data" in the abstract is worthless. Every
 * storage key the site writes is named here.
 */

const storageKeys = [
  {
    key: "aps.theme",
    what: "Whether you chose light, dark, or system.",
    when: "Written when you use the theme control in the header. Absent until then.",
  },
  {
    key: "sb-{project-ref}-auth-token",
    what: "Your optional account session: an access token and a refresh token issued by Supabase after a one-time code. Written only if you sign in on /account, and removed when you sign out.",
    when: "Written at sign-in. Not a cookie, and not present for anyone who never signs in.",
  },
  {
    key: "aps.prefs.v1",
    what: "Your settings: wallpaper, colours, type, density, home-page order and headings, hero copy, custom blocks, and the adaptive switches.",
    when: "Written the first time you change anything in Settings. Absent until then, which is why a fresh browser looks exactly like the shipped site.",
  },
  {
    key: "aps.adaptive.v1",
    what: "A capped list of at most 400 recent actions (searches, cards, videos, practice, quizzes, lessons, labs) used to build the local profile on Settings → Adaptive. No identifiers, no free text beyond the searches you type.",
    when: "Written as you use the site, and only for the kinds you leave switched on. Cleared by Forget everything.",
  },
  {
    key: "aps.sources.v1",
    what: "The sources you add yourself: link, title, course, type, and your note. Curated sources are not stored this way.",
    when: "Written when you press Add in Settings → Sources or remove one.",
  },
  {
    key: "aps.cards.v2.{course}",
    what: "Which flashcards you marked as known and which you marked to see again, per course.",
    when: "Written as you work through a card deck.",
  },
  {
    key: "aps.assessment.{course}.drafts",
    what: "Every written response you type into the interim assessment, section by section, so a refresh does not destroy an essay.",
    when: "Autosaved on each keystroke while you are sitting a paper.",
  },
  {
    key: "aps.assessment.{course}.answers / .flags / .frq",
    what: "Which multiple-choice option you chose, which questions you flagged, and any rubric points you recorded yourself.",
    when: "Written as you answer, flag, or self-mark.",
  },
  {
    key: "aps.grade.{course}.{task}",
    what: "The last rubric feedback returned for one written task, so the report survives a reload.",
    when: "Written after you press Grade or Grade locally.",
  },
  {
    key: "aps.attempts.{course}",
    what: "Up to eight saved score summaries (date, multiple-choice score, rubric points, estimated AP score) that you choose to keep.",
    when: "Written only when you press Save this attempt.",
  },
  {
    key: "aps.ai.keys",
    what: "If you choose model grading: the provider, model name, and API key you paste. The key is stored only in this browser and sent only with your own grading requests.",
    when: "Written when you save a key in the grading panel; Forget removes it.",
  },
  {
    key: "aps.study.v1",
    what: "Review schedules, confidence, mistakes, plans, objective evidence, writing tasks, focus minutes, and weekly history.",
    when: "Updated as you use the shared study tools.",
  },
  {
    key: "aps.video-progress.v1",
    what: "Which unit videos you marked watched and the retrieval notes you wrote beside them.",
    when: "Updated when you use a unit player or the Advanced Study Desk watchlist.",
  },
  {
    key: "aps.goals.v1",
    what: "Weekly retrieval, minutes, and accuracy targets for the Advanced Study Desk.",
    when: "Written when you change a goal. Absent until then.",
  },
  {
    key: "aps.sync.v1",
    what: "The optional Supabase endpoint and sync code you entered, plus the last sync time.",
    when: "Written only if you use Advanced → opt-in sync. Forget code removes the code from this browser.",
  },
  {
    key: "aps.frq.v1.{course}",
    what: "Your FRQ drafts, self-assessment marks, and rubric reflections.",
    when: "Saved when you leave the FRQ Studio.",
  },
  {
    key: "aps.frq-marks.v1.{course}",
    what: "Your self-assessment marks for marked essay and writing examples.",
    when: "Saved as you work through a rubric.",
  },
  {
    key: "aps.lab.v1.{activity}",
    what: "Your annotations or data-analysis notes for a course activity.",
    when: "Autosaved while you use an interactive lab.",
  },
  {
    key: "aps.matrix.v1.{activity}",
    what: "Your synthesis-matrix entries and source notes.",
    when: "Autosaved while you use the Seminar matrix.",
  },
  {
    key: "aps.research.v1.{activity}",
    what: "Your Research question or oral-defense rehearsal notes.",
    when: "Autosaved while you use a Research lab.",
  },
];

export default function PrivacyPage() {
  const trail = [
    { name: "Home", href: "/" },
    { name: "Privacy", href: "/privacy" },
  ];

  return (
    <>
      <JsonLd schema={breadcrumbSchema(trail)} />

      <div className="wrap py-10 md:py-14">
        <GlassCard padding="lg">
        <div className="max-w-[68ch]">
          <Breadcrumbs trail={trail} />
          <p className="label mb-3">Last checked {formatDate(site.policyUpdated)}</p>
          <h1 className="text-[clamp(1.9rem,1.5rem+1.8vw,2.9rem)]" style={{ letterSpacing: "-0.028em" }}>
            Your work stays yours. You choose what leaves.
          </h1>
          <p className="lede mt-5">
            No cookies, no analytics, no advertising, no trackers, and no fonts loaded from someone
            else&rsquo;s server. An account is optional: it exists only if you create one, it is
            passwordless, and nothing on the site is behind it. Video players, Study Desk sync, and
            an uploaded background video are all opt-in; real YouTube thumbnails are the one
            automatic third-party image. This page explains exactly when a request can leave the
            site, and every permission the site can ask your browser for.
          </p>
        </div>

        <section className="mt-14" aria-labelledby="collect-heading">
          <SectionHead folio="01" title="What this site knows about you" id="collect-heading" />
          <div className="prose">
            <p>
              Nothing by default. There is no contact form, no newsletter, no comment section and no
              analytics product. An account is available and entirely optional: signed out, every
              lesson, card, question, paper, and video works, and nothing on the site is gated behind
              sign-in. If you do create one, the only things that can reach Supabase are the four
              counts described in section 03, a display name you type, and a photo you choose.
            </p>
            <p>
              Pages are static files. Loading one requires no database query about you and creates
              no record I can read. The first-party search API receives your query string, matches
              it against an in-memory index, returns results, and writes nothing anywhere. The social
              preview is a static image, not a tracking pixel.
            </p>
            <p>
              The adaptive layer is a local record, not a server one. It counts actions in this
              browser and stores them under <code>aps.adaptive.v1</code> so the home page can offer
              a sensible next step, a daily question, and a weekly spotlight. Nothing is sent
              anywhere to compute it, no identifier is attached, the list is capped at 400 entries,
              and every kind of signal can be switched off individually. Settings → Adaptive shows
              the whole derived profile — signals, streak, subject affinity, recent searches — and a
              single button erases it. Settings is also where each piece of the layer is turned off.
            </p>
            <p>
              A video page automatically fetches the creator&rsquo;s real thumbnail image from
              <code>i.ytimg.com</code> when the player appears. That is a static image, not a player
              or script. Two further requests still require an explicit action: pressing play loads a
              privacy-enhanced <code>youtube-nocookie.com</code> frame, and enabling sync in Advanced
              sends your version-1 study state to the Supabase endpoint you configured, keyed by a
              peppered hash of a code you hold. Neither the player nor sync is requested on page load.
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="storage-heading">
          <SectionHead folio="02" title="What your browser keeps for you" id="storage-heading">
            The localStorage keys below hold your own study state. They stay on your machine unless
            you explicitly save a snapshot through Advanced → opt-in sync. Course and paper
            placeholders are replaced by the relevant subject or activity ID.
          </SectionHead>

          <div className="table-scroll">
            <table className="data-table">
              <caption className="sr-only">Local storage keys written by this site</caption>
              <thead>
                <tr>
                  <th scope="col">Key</th>
                  <th scope="col">What it holds</th>
                  <th scope="col">When it is written</th>
                </tr>
              </thead>
              <tbody>
                {storageKeys.map((row) => (
                  <tr key={row.key}>
                    <th scope="row" style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", whiteSpace: "nowrap" }}>
                      {row.key}
                    </th>
                    <td>{row.what}</td>
                    <td style={{ color: "var(--ink-soft)" }}>{row.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 max-w-[62ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
            Uploaded wallpapers, background videos, and block images live in the browser&rsquo;s
            IndexedDB database <code>aps-assets</code> (object store <code>assets</code>), not in the
            key table above. They are read back as local object URLs and are never uploaded
            anywhere; deleting the file in Settings removes the stored blob. Every file is checked by
            its leading bytes before it is stored, not by its name: SVG is refused outright, and a
            picture the browser cannot display directly — an iPhone HEIC, for instance — is decoded
            and re-encoded as JPEG in this browser first. That conversion happens on your device and
            the original is discarded; if the picture cannot be decoded, the upload is refused and
            the reason is printed next to the picker. Videos are stored as they are, up to 12 MB, and
            are muted unless you switch the sound on.
          </p>

          <p className="mt-4 max-w-[62ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
            To clear them, use Settings → Privacy &amp; data (export first, if you want a copy), clear
            site data for this domain in your browser settings, use Reset local study data on the
            Study page, or open a private window. Offline course packs also use
            this browser’s Cache Storage for pages and assets. Nothing on the site breaks without
            local data — you just lose your place and saved work.
          </p>
        </section>

        <section className="mt-14" aria-labelledby="permissions-heading" id="permissions">
          <SectionHead folio="02b" title="Every permission this site can ask for" id="permissions-heading" />
          <div className="prose">
            <p>
              One, and it is optional. On{" "}
              <Link href="/account" className="link-underlined" style={{ color: "var(--ink)" }}>
                /account
              </Link>{" "}
              there is a button that calls <code>navigator.storage.persist()</code>, which asks the
              browser to stop evicting this origin&rsquo;s data to free space. Accept it and an
              uploaded wallpaper or a year of study state is much less likely to disappear; decline it
              and everything still works exactly the same until the disk fills or you clear site data.
              Chrome and Firefox usually answer from a heuristic without showing anything at all;
              Safari answers no for every site that is not added to the Home Screen, and the card says
              so rather than pretending otherwise.
            </p>
            <p>
              Nothing else is requested. There is no camera, microphone, geolocation, notification,
              contact, calendar, clipboard, Bluetooth, USB, serial, MIDI, wake-lock, or motion-sensor
              code in this app. A browser only shows those prompts if a site calls them, and this one
              does not — so if you see one on this domain, it is not from here.
            </p>
            <p>
              Sound on a background video is not a permission, but it behaves like one: browsers
              refuse to start audible playback before you interact with the page. The video therefore
              starts muted, and a small pill appears in the corner offering one tap to turn the sound
              on. The switch in Settings → Appearance does the same thing deliberately; the volume
              slider next to it only ever changes that one video.
            </p>
            <p>
              Google access is a separate consent, stored in your Google account rather than in your
              browser. It is covered in section 03, and it can be revoked at Google → Security →
              Third-party apps without affecting anything you have saved here.
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="third-heading">
          <SectionHead folio="03" title="Who else might hear from your browser" id="third-heading" />
          <div className="prose">
            <p>
              The site loads no third-party scripts, fonts, analytics, tag managers, or social
              widgets. Video pages do load the creator&rsquo;s real thumbnail from YouTube&rsquo;s
              static image host automatically; it is an image, not a player or script. The embedded
              video frame is still opt-in: until you press play, no YouTube player is requested.
              After you press play, YouTube receives the request for the video and its own policy
              applies. Use “Open on YouTube” if you prefer that boundary to be explicit.
            </p>
            <p>
              Written responses are the one place where your own words can leave the browser, and
              only when you ask them to. Pressing <strong>Grade locally</strong> runs the rubric
              analyser inside this page and sends nothing anywhere. Pressing <strong>Grade this
              response</strong> sends the response, the printed prompt, and the published rubric rows
              to <code>/api/grade</code> on this site; if you have added a model key, that route
              forwards them to the provider you chose (OpenAI, Anthropic, or Google) using your key.
              The route keeps no copy, writes no log line containing your text, and has no database.
              Without a key it returns the same local analysis, computed on the server.
            </p>
            <p>
              Signing in is optional and is the only feature that talks to a second server. The window
              is <code>/login</code>. If this deployment has Supabase configured, it can send you a
              one-time code by email or text, or hand you to Google&rsquo;s own sign-in screen; either
              route creates a session in this browser. Choosing Google sends Google the fact that you
              are signing in here and asks for exactly three scopes — <code>openid</code>,
              <code>email</code>, and <code>profile</code> — so what comes back is your name, address,
              and photo. No Drive, Gmail, Calendar, or Contacts scope is requested, no refresh token
              is issued, and nothing is ever written to your Google account. Supabase stores that
              identity, and you can revoke it from your Google account at any time. From then on
              Supabase holds
              a display name, a photo you chose, and five coarse counts (cards reviewed, practice
              answered, focus minutes, streak, last active) — only when you press{" "}
              <strong>Save today&rsquo;s counts</strong>. No lesson, answer, draft, essay, or search is
              ever sent. There is no password field anywhere in this app, so there is no password to
              lose. Delete the cloud copy removes those rows and photos; it does not touch this
              browser.
            </p>
            <p>
              Scanning a link is the one other action that reaches the network, and it never happens
              on its own. Pressing <strong>Scan link</strong> in Settings → Sources sends the URL you
              pasted to <code>/api/link-preview</code> on this site, which fetches that page once to
              read its title and description. The target site therefore sees a request from this
              site&rsquo;s server, not from your browser, and the body is discarded after the title is
              read. The route refuses non-http links, embedded credentials, loopback, private,
              link-local and metadata addresses (re-checked on every redirect), caps the response at
              512 KB, and times out after five seconds. If you would rather not involve this site at
              all, type the title yourself — the form works without the scan.
            </p>
            <p>
              Optional sync uses the Supabase edge function you configure in Advanced. The browser
              sends only the sync code and the study-state snapshot; the function stores a peppered
              hash of the code, never the code itself. No service-role key or pepper is present in
              the website bundle. Delete remote removes that snapshot; it does not erase local data.
            </p>
            <p>
              A backup is created only when you choose Export backup; it downloads as a JSON file
              on your device. Reports, video CSV, and the HTML report are also generated locally.
              Restoring reads only the file you explicitly choose in the file picker.
            </p>
            <p>
              There are outbound links to the College Board, reference archives, YouTube, a public
              Google Sheet, Google Drive, Google Docs, Linear, and GitHub. Following one takes you to
              a site with its own policy. Nothing about your local study record is passed in those
              links. The site is hosted on Vercel, which like any host keeps short-lived operational
              server logs containing IP addresses and user agents.
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="rights-heading">
          <SectionHead folio="04" title="Your choices, and younger students" id="rights-heading" />
          <div className="prose">
            <p>
            Regimes like the GDPR and the CCPA give you rights of access, correction and erasure
            over personal data a site holds about you. By default this site holds none, so there is
            nothing to request beyond data in your own browser, which you can delete yourself. If
            you enable optional sync, the remote snapshot is addressable only through the peppered
            hash of your sync code; use that same code in Advanced → Delete remote to erase it.
            </p>
            <p>
              The audience here is largely high-school students, and some readers will be under 13.
              That is precisely why there is no account system, no data collection and no
              advertising: the compliant design for a site aimed at minors is not to collect
              anything in the first place.
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="changes-heading">
          <SectionHead folio="05" title="If this ever changes" id="changes-heading" />
          <div className="prose">
            <p>
              If the site ever starts collecting anything — it will not, but if it did — this page
              changes first, with the date at the top updated and the change described here rather
              than folded silently into a longer document. The{" "}
              <a href={`${site.repo}/commits/main/src/app/privacy/page.tsx`} target="_blank" rel="noopener noreferrer">
                commit history for this page
              </a>{" "}
              is public, so you do not have to take my word for what it said last month.
            </p>
            <p>
              Questions go to{" "}
              <a href={`${site.repo}/issues`} target="_blank" rel="noopener noreferrer">
                the issue tracker
              </a>
              .
            </p>
          </div>
        </section>

        <p className="mt-14 max-w-[62ch] text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
          See also:{" "}
          <Link href="/accessibility" className="link-underlined" style={{ color: "var(--ink)" }}>
            accessibility
          </Link>
          ,{" "}
          <Link href="/settings?tab=privacy" className="link-underlined" style={{ color: "var(--ink)" }}>
            the controls themselves
          </Link>
          ,{" "}
          <Link href="/account" className="link-underlined" style={{ color: "var(--ink)" }}>
            the optional account
          </Link>{" "}
          and{" "}
          <Link href="/about" className="link-underlined" style={{ color: "var(--ink)" }}>
            how the content is made
          </Link>
          .
        </p>
        </GlassCard>
      </div>
    </>
  );
}
