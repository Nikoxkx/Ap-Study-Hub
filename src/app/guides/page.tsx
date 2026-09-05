import type { Metadata } from "next";
import Link from "next/link";
import { channels, channelUrl } from "@/lib/channels";
import { subjects } from "@/lib/subjects";
import { Breadcrumbs, SectionHead, ExternalLink } from "@/components/Furniture";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "How to revise for an AP exam",
  description:
    "Study methods that survive contact with a real AP exam: spacing, self-testing, reading a stimulus, the last fortnight, and what a score is actually worth.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "How to revise for an AP exam · AP Study Hub",
    description:
      "Spacing, self-testing, reading a stimulus, the last fortnight, and where AP credit actually gets accepted.",
    url: absoluteUrl("/guides"),
  },
};

/**
 * Study guides.
 *
 * Rewritten from the version that shipped with this repo, which recommended two
 * YouTube channels that do not exist (@heimaborstudies, @baborananscience). The
 * channel list here is generated from src/lib/channels.ts, where every handle
 * has been opened and dated.
 */

const method = [
  {
    heading: "Space it out, even badly",
    body: "Four thirty-minute sessions across four days beat one two-hour session, and it is not close. The effect holds even when the spaced sessions are worse quality — the gap is doing the work, not the intensity. If you have left it late, space what is left across the days you have rather than stacking it.",
  },
  {
    heading: "Test, do not review",
    body: "Rereading notes produces a strong feeling of knowing and almost no retention. Closing the book and writing down what you remember feels worse and works better. That is why the cards on this site put the answer on the back rather than beside the term — the retrieval is the point, and making it easy defeats it.",
  },
  {
    heading: "Do full questions, not fragments",
    body: "Knowing every term in Unit 4 and never having written a paragraph is the most common way to be surprised in May. The exam does not ask you to define; it asks you to use. Every unit you finish, do three questions on it under something like time pressure.",
  },
  {
    heading: "Mark your own work honestly",
    body: "Get the published rubric, put it beside what you wrote, and be mean. Almost everyone awards themselves the evidence point for a quotation they never explained. If you cannot point at the sentence that earned a row, you did not earn it.",
  },
  {
    heading: "Track what you get wrong, not what you cover",
    body: "A list of units you have 'done' tells you nothing. A list of the six things you keep getting wrong is a revision plan. Keep it somewhere you will look at it — the back page of the notebook, a pinned note, anywhere.",
  },
];

const reading = [
  {
    heading: "Read the question before the passage",
    body: "Knowing what you are looking for turns a five-minute read into a two-minute one. On stimulus-based multiple choice, the question tells you which forty words of the source actually matter.",
  },
  {
    heading: "Annotate for structure, not for beauty",
    body: "Three marks are enough: a bracket around the claim, a circle around the shift word (but, however, yet), and a line down the margin of anything you might quote. Highlighting a whole paragraph yellow tells you nothing when you come back to it.",
  },
  {
    heading: "Name the move, not the device",
    body: "Saying a writer uses anaphora earns nothing. Saying they repeat the opening clause to make an accumulating list feel inevitable is the same observation doing actual work. Devices are the vocabulary; the argument is what gets marked.",
  },
  {
    heading: "Attribute before you use",
    body: "In any synthesis or DBQ, introduce a source before you lean on it. 'Pew found that…' beats a bare parenthetical, because it shows you know whose claim it is and how much weight it can carry.",
  },
];

const lastTwoWeeks = [
  {
    when: "14 days out",
    what: "Sit one full timed paper. Not to score well — to find out what breaks. Almost always it is pacing on the written section.",
  },
  {
    when: "10 days out",
    what: "Take the three weakest units from that paper and only work on those. Resist the urge to start again from Unit 1; you do not have time and you do not need to.",
  },
  {
    when: "7 days out",
    what: "Write one essay of each type you will face, timed, and mark them against the rubric. This is the highest-return week there is.",
  },
  {
    when: "3 days out",
    what: "Cards only, plus anything with a fixed list — required documents, required cases, formulas, named experiments. Short sessions.",
  },
  {
    when: "1 day out",
    what: "Read through your own notes once, gently, then stop. Find your admission ticket and check the start time. Sleep is worth more than the ninth hour of revision, and this is not motivational — it is just true.",
  },
];

const examDay = [
  {
    heading: "Answer every multiple-choice question",
    body: "There is no penalty for a wrong answer on any current AP exam. A blank is a guaranteed zero and a guess is not. Eliminate what you can and commit.",
  },
  {
    heading: "Spend the first minutes planning, not writing",
    body: "Two or three minutes of planning on a forty-minute essay is not lost time. A response with a clear line of reasoning written in thirty-seven minutes beats a sprawling one written in forty.",
  },
  {
    heading: "Write the thesis you can defend",
    body: "The clever thesis you cannot evidence scores below the plain thesis you can. Readers are marking against rows, not judging originality.",
  },
  {
    heading: "If you run out of time, outline",
    body: "A visible, structured outline of the final paragraph can pick up evidence credit. A blank half-page cannot.",
  },
];

const creditBands = [
  {
    score: "5",
    meaning: "Extremely well qualified",
    reality:
      "Credit or placement at most institutions that grant it at all. Highly selective schools more often give placement than credit.",
  },
  {
    score: "4",
    meaning: "Well qualified",
    reality: "Credit at most public universities; placement at many private ones.",
  },
  {
    score: "3",
    meaning: "Qualified",
    reality:
      "The official passing mark. Accepted widely at state schools, frequently not at selective ones. Check the specific department, not just the university.",
  },
  {
    score: "1–2",
    meaning: "No recommendation",
    reality: "No credit anywhere. Scores can be withheld or cancelled if you would rather they were not sent.",
  },
];

export default function GuidesPage() {
  const trail = [
    { name: "Home", href: "/" },
    { name: "Study guides", href: "/guides" },
  ];

  return (
    <>
      <JsonLd schema={breadcrumbSchema(trail)} />

      <div className="wrap py-12 md:py-16">
        <div className="max-w-[68ch]">
          <Breadcrumbs trail={trail} />
          <p className="label mb-3">General method · applies to all seven courses</p>
          <h1 className="text-[clamp(1.9rem,1.5rem+1.8vw,2.9rem)]" style={{ letterSpacing: "-0.028em" }}>
            How to revise for an AP exam
          </h1>
          <p className="lede mt-5">
            Course-specific advice lives on each course page. This is the part that does not change:
            how to space the work, how to read a stimulus, and what to do in the fortnight when it
            actually counts.
          </p>
        </div>

        <section className="mt-16" aria-labelledby="method-heading">
          <SectionHead folio="01" title="Method" id="method-heading">
            Five things that are worth doing. Everything else is a variation on them.
          </SectionHead>
          <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
            {method.map((item) => (
              <article key={item.heading} className="rule-top pt-4">
                <h3 className="text-[1.0625rem] font-semibold">{item.heading}</h3>
                <p className="mt-2 text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16" aria-labelledby="reading-heading">
          <SectionHead folio="02" title="Reading and annotating" id="reading-heading">
            Most AP exams are reading exams with a writing exam attached. These four apply whether
            the stimulus is a political cartoon, a scatter plot or a paragraph of Baldwin.
          </SectionHead>
          <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
            {reading.map((item) => (
              <article key={item.heading} className="rule-top pt-4">
                <h3 className="text-[1.0625rem] font-semibold">{item.heading}</h3>
                <p className="mt-2 text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16" aria-labelledby="fortnight-heading">
          <SectionHead folio="03" title="The last fortnight" id="fortnight-heading">
            A schedule, because at that point the hard part is deciding what not to do.
          </SectionHead>
          <ol className="rule-top">
            {lastTwoWeeks.map((item) => (
              <li key={item.when} className="grid gap-x-8 gap-y-1 rule-bottom py-4 sm:grid-cols-[7rem_minmax(0,1fr)]">
                <span
                  className="text-[0.8125rem]"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--mark)" }}
                >
                  {item.when}
                </span>
                <span className="text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
                  {item.what}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16" aria-labelledby="exam-day-heading">
          <SectionHead folio="04" title="In the room" id="exam-day-heading" />
          <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
            {examDay.map((item) => (
              <article key={item.heading} className="rule-top pt-4">
                <h3 className="text-[1.0625rem] font-semibold">{item.heading}</h3>
                <p className="mt-2 text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16" aria-labelledby="credit-heading">
          <SectionHead folio="05" title="What a score is actually worth" id="credit-heading">
            Credit policy is set per institution and often per department, so the only authoritative
            answer is your target school&rsquo;s own policy page. This is the shape of it.
          </SectionHead>

          <div className="table-scroll">
            <table className="data-table">
              <caption className="sr-only">AP score bands and what they typically mean for college credit</caption>
              <thead>
                <tr>
                  <th scope="col">Score</th>
                  <th scope="col">College Board label</th>
                  <th scope="col">In practice</th>
                </tr>
              </thead>
              <tbody>
                {creditBands.map((band) => (
                  <tr key={band.score}>
                    <th scope="row" style={{ fontFamily: "var(--font-mono)" }}>
                      {band.score}
                    </th>
                    <td>{band.meaning}</td>
                    <td style={{ color: "var(--ink-soft)" }}>{band.reality}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-[0.875rem]" style={{ color: "var(--ink-soft)" }}>
            Look yours up in{" "}
            <ExternalLink
              href="https://apstudents.collegeboard.org/getting-credit-placement/search-policies"
              className="link-underlined"
            >
              College Board&rsquo;s AP credit policy search
            </ExternalLink>
            .
          </p>
        </section>

        <section className="mt-16" aria-labelledby="channels-heading">
          <SectionHead folio="06" title="Teachers worth watching" id="channels-heading">
            Listed as channels, with who runs each one, because knowing whether the person
            explaining federalism is a teacher or an animation studio changes how much weight to
            give it. Every handle below was opened before it was listed.
          </SectionHead>

          <ul>
            {channels.map((channel) => (
              <li key={channel.handle} className="rule-top py-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-[1.0625rem] font-semibold">
                    <ExternalLink href={channelUrl(channel)} className="link-draw">
                      {channel.name}
                    </ExternalLink>
                  </h3>
                  <p className="text-[0.6875rem]" style={{ fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}>
                    @{channel.handle} · checked {channel.checked}
                  </p>
                </div>
                <p className="mt-1 text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
                  {channel.who}.
                </p>
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {channel.covers.map((slug) => {
                    const subject = subjects.find((s) => s.slug === slug);
                    if (!subject) return null;
                    return (
                      <li key={slug}>
                        <Link href={`/course/${slug}`} className="tag">
                          {subject.familiar}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <aside className="sunk mt-16 max-w-[62ch] p-5">
          <h2 className="label mb-2">One more thing</h2>
          <p className="text-[0.9375rem]" style={{ color: "var(--ink-soft)" }}>
            An AP score is one number on an application that has a lot of numbers on it. It is worth
            working for and it is not worth wrecking yourself over. If revision has stopped being
            hard and started being miserable, that is information — take the evening off and come
            back to it.
          </p>
        </aside>
      </div>
    </>
  );
}
