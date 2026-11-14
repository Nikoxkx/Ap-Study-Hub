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
            Your work is yours. Here is everything that leaves this page.
          </h1>
          <p className="lede mt-5">
            No account, no cookies, no analytics, no ads, no trackers, and no fonts fetched from
            anyone else. Pressing play on a video and turning on sync are the only two things that
            send anything anywhere, and both wait for you. The rest of this page is the exact list,
            including the one image that loads on its own.
          </p>
        </div>

        <section className="mt-14" aria-labelledby="collect-heading">
          <SectionHead folio="01" title="What this site knows about you" id="collect-heading" />
          <div className="prose">
            <p>
              Nothing, unless you do something. There is no account, no contact form, no newsletter,
              no comment section, and no analytics product. I genuinely cannot see how many people
              use this site. That is annoying for me and better for you, so it stays.
            </p>
            <p>
              Every page is a pre-built file. Loading one runs no query about you and leaves no
              record I can read. Search is the one thing that sends your typing anywhere: it goes to
              this site&rsquo;s own search route, gets matched against a list held in memory, and is
              written down nowhere.
            </p>
            <p>
              A video page does fetch the real thumbnail from <code>i.ytimg.com</code>, because a grey
              box is useless when you are deciding what to watch. It is one image, not a player and
              not a script. Two other things need a real click: pressing play loads a
              privacy-enhanced <code>youtube-nocookie.com</code> frame, and turning on sync in
              Advanced sends your study state to the server you configured, filed under a scrambled
              code that only you hold. Neither happens on page load.
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="storage-heading">
          <SectionHead folio="02" title="What your browser keeps for you" id="storage-heading">
            These are the keys this site writes into your browser. They are plain text, they are
            only yours, and they stay on this device unless you press something that sends a copy.
            Anything in braces is replaced by the course or activity it belongs to.
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
            To wipe them, clear site data for this domain in your browser, press Reset local study
            data on the Study page, or use a private window. Downloaded course packs live in this
            browser&rsquo;s cache as well, and nothing breaks if you clear those — you lose your
            place and your saved work, and the pages still load.
          </p>
        </section>

        <section className="mt-14" aria-labelledby="third-heading">
          <SectionHead folio="03" title="Who else might hear from your browser" id="third-heading" />
          <div className="prose">
            <p>
              There are no third-party scripts, fonts, analytics, tag managers, or social widgets on
              any page. The thumbnail is the only automatic request to another company, and it is an
              image fetched from YouTube&rsquo;s static host — the same one your browser makes for any
              embedded video anywhere. Once you press play, YouTube sees the request and its own
              policy takes over. If you would rather keep that boundary explicit, use “Open on
              YouTube” and watch it there.
            </p>
            <p>
              Your own writing is the only thing that could ever leave with your words in it, and it
              only moves when you ask. <strong>Grade locally</strong> runs the whole rubric check in
              the page and sends nothing. <strong>Grade this response</strong> sends the response, the
              prompt, and the rubric rows to <code>/api/grade</code> on this site; if you have saved a
              model key, that route passes them to the provider you picked (OpenAI, Anthropic, or
              Google) and uses your key. The route keeps no copy, logs no line with your text in it,
              and has no database. With no key, you get the same local marking, computed on the
              server instead of in the tab.
            </p>
            <p>
              Optional sync uses the Supabase function you point it at from Advanced. Two things
              travel: your sync code and your study state. The server keeps a salted hash of the
              code, never the code, and the website bundle contains no service key and no salt.
              Delete remote removes the snapshot on the server and touches nothing on your device.
            </p>
            <p>
              A backup exists only if you press Export backup, and it arrives as a file on your own
              disk. Reports, the video CSV, and the printable HTML report are all built in the tab.
              Restoring reads one file: the one you pick.
            </p>
            <p>
              Some links leave: the College Board, archive.org, YouTube, one public Google Sheet,
              Google Drive, Google Docs, Linear, and GitHub. Each has its own policy, and none of
              them are handed anything about your progress. The site runs on Vercel, which — like any
              host — keeps short-lived server logs with IP addresses and browser names in them.
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="rights-heading">
          <SectionHead folio="04" title="Your choices, and younger students" id="rights-heading" />
          <div className="prose">
            <p>
              Laws such as the GDPR and the CCPA give you the right to see, correct, and delete what a
              site holds about you. This one holds nothing, so the only copy to delete is the one in
              your own browser, and you can delete it without asking me. If you did turn on sync, the
              saved snapshot is reachable only with your sync code — paste the same code into
              Advanced → Delete remote and it is gone.
            </p>
            <p>
              Most people here are in high school and some are under 13. That is the reason there is
              no account, no collection, and no advertising. A site for minors should not be looking
              for a lawful way to collect data; it should be designed so there is none.
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="changes-heading">
          <SectionHead folio="05" title="If this ever changes" id="changes-heading" />
          <div className="prose">
            <p>
              If collecting ever starts — it is not planned, but if it were — this page changes in
              the same commit, with a new date at the top and the change spelled out here rather than
              buried in a longer document. The{" "}
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
