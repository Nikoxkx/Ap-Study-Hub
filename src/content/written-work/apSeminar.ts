import type { CourseDefense, WrittenWork } from "./types";

/**
 * AP Seminar written work and defense.
 *
 * Seminar is assessed by a team project, an individual paper and a defense,
 * so the examples here are the two things students actually have to write —
 * a research question that is narrow enough to answer, and an argument that
 * takes its sources apart — plus the spoken defense of both.
 */
export const apSeminarWrittenWork: WrittenWork[] = [
  {
    id: "ap-seminar-1",
    courseSlug: "ap-seminar",
    unitNumber: 1,
    prompt:
      "Research question: Your team wants to write about social media and teenagers. Narrow this into a question that could actually be answered in a 2,000-word paper.",
    plan: [
      "Name a population, a place, and a timeframe. A question with all three is answerable.",
      "Check the question is not already answered. If the answer is obviously yes, it is not a question.",
    ],
    example: [
      "Too broad: Is social media bad for teenagers?",
      "Narrower: How did the shift from public feeds to private group chats between 2018 and 2024 change the way 14–16-year-olds in the United States report feeling left out?",
      "Why it works: it names a group, a country, a period and a specific mechanism (the shift from feeds to group chats). It can be answered with survey data, platform research, and interviews, and it could come out either way — which is the test of a real question.",
    ],
    because:
      "The narrowed question has all four parts an assessor looks for: a defined population, a bounded time, a mechanism rather than a topic, and a possible answer in both directions. 'Bad for teenagers' cannot be researched; 'changed the way a specific age group reports a specific feeling' can.",
    say: [
      "I started with a question our teacher could have answered from memory, which is usually a sign it is too broad.",
      "We narrowed by adding three things: who, when, and what actually changed.",
      "The mechanism is the shift from feeds to group chats, because that is the part that is new and the part we could find evidence about.",
      "The honest risk is that 'feeling left out' is hard to measure. We would need self-report data and we would have to say that is a limitation.",
    ],
    trap:
      "Narrowing by adding words instead of adding limits. 'The impact of social media on teenage mental health in the modern era' is a longer sentence with the same unanswerable question inside it.",
  },
  {
    id: "ap-seminar-2",
    courseSlug: "ap-seminar",
    unitNumber: 2,
    prompt:
      "Argument analysis: A university press release says a study proves that students who take notes by hand learn better. Write one paragraph evaluating the claim.",
    plan: [
      "Separate what the study measured from what the press release claims.",
      "Say what the study would need to show for the claim to be true.",
    ],
    example: [
      "The press release uses the word 'proves', and the study it describes cannot do that. If the study compared the test scores of students who took notes by hand with those who typed, it shows a difference between two groups in one setting — usually one lecture, one topic, one group of students at one university. That is a useful finding, and it does not establish that handwriting causes better learning in general, because the students who chose to write by hand may already differ from the ones who chose to type.",
      "What would move the claim closer: random assignment to note-taking method, across several topics and weeks, with a delayed test rather than one straight after the lecture. Until then the accurate sentence is 'handwriting was associated with higher scores in this study', which is a smaller sentence and a defensible one.",
    ],
    because:
      "The paragraph separates measurement from claim, names the alternative explanation, and describes the design change that would support the stronger claim. Those three moves are what 'evaluate an argument' means, and they are more useful than saying the source is biased.",
    say: [
      "I looked for the gap between the verb the press release used and the design the study could support.",
      "My alternative explanation is self-selection — the students who chose handwriting may already be different.",
      "I said what would change my mind: random assignment, several topics, a delayed test.",
      "The limit of my paragraph is that I have not read the study, and I said 'if the study compared' rather than pretending otherwise.",
    ],
    trap:
      "Dismissing the finding because it is not perfect. A single study can support a modest claim; the error is in the word 'proves', not in the research.",
  },
  {
    id: "ap-seminar-3",
    courseSlug: "ap-seminar",
    unitNumber: 3,
    prompt:
      "Multiple perspectives: Two sources disagree about whether a city should charge for street parking. Write one paragraph that uses both without pretending they agree.",
    plan: [
      "Give each perspective its strongest form, then name the value each one is protecting.",
      "The disagreement is usually about a value, not a fact.",
    ],
    example: [
      "The two sources are not really arguing about parking; they are arguing about what a street is for. The transport economist treats parking space as a scarce resource that is currently given away, so pricing it is the way to stop drivers circling for fifteen minutes and to pay for the buses that carry the people who cannot drive. The shop owner treats the same space as access, and from that position a meter is a tax on the people who keep the business alive.",
      "Naming the value each source protects does not resolve the disagreement, but it makes the argument productive. The economist would have to show that the buses actually arrive; the shop owner would have to show that drivers really stop coming. Those are checkable claims, which is more than the two positions could manage on their own.",
    ],
    because:
      "Each perspective is stated in its own strongest terms, and the paragraph identifies the underlying value rather than scoring points. Turning a value disagreement into two checkable claims is the move that earns the higher rows on the rubric.",
    say: [
      "I stopped trying to decide who is right and asked what each one is protecting.",
      "The economist is protecting scarcity; the shop owner is protecting access.",
      "Then I turned each into a claim that could be checked, because otherwise the paper just reports a fight.",
      "I would defend the sentence about checkable claims, because that is where my analysis actually starts.",
    ],
    trap:
      "Writing 'source A thinks this, source B thinks that, the truth is in the middle'. The middle is not an analysis; naming what each side values is.",
  },
  {
    id: "ap-seminar-4",
    courseSlug: "ap-seminar",
    unitNumber: 4,
    prompt:
      "Individual written argument, body paragraph: Connect your evidence to your claim about remote work and city centers. Write one paragraph that does real synthesis.",
    plan: [
      "Synthesis means your claim changes because of the evidence — say where it changed.",
      "Two sources that point the same way is one source's worth of argument.",
    ],
    example: [
      "The foot-traffic data and the office-vacancy data only become an argument when you notice they disagree about timing. Foot traffic in city centers recovered to roughly its pre-2020 level, which on its own suggests the concern about empty downtowns was overstated. Office vacancy rose and stayed high, which suggests the opposite. The reconciliation is that the same buildings are being used by fewer people while the pavements are used by more, so the footfall has changed kind rather than amount: fewer commuters buying lunch on a schedule, more residents and visitors buying at other hours.",
      "That changes my claim. I started by asking whether city centers had recovered; the evidence says the question is which use recovered, not whether recovery happened, and the businesses that depended on the commuter pattern are the ones still in trouble.",
    ],
    because:
      "The paragraph synthesizes rather than lists — two sources are put in tension, a reconciliation is offered, and the writer's claim is explicitly revised as a result. Saying 'that changes my claim' is the most valuable sentence a Seminar paper can contain.",
    say: [
      "I put the two sources side by side and found they disagreed about timing, which is the interesting part.",
      "My reconciliation is about kind versus amount — the same street, differently used.",
      "The sentence that matters is 'that changes my claim', because it shows the evidence did work on my thinking.",
      "I would want hourly data before I pushed this further, and I said so rather than implying the reconciliation is proven.",
    ],
    trap:
      "Using two sources as two examples of the same point. That is not synthesis; it is repetition with citations attached.",
  },
  {
    id: "ap-seminar-5",
    courseSlug: "ap-seminar",
    unitNumber: 5,
    prompt:
      "Oral defense: A panel member asks, \"Your solution assumes students will use the app. What if they do not?\" Write the first four sentences of your answer.",
    plan: [
      "Answer in the first sentence. Justify afterward.",
      "Name the assumption honestly, then say what happens if it fails.",
    ],
    example: [
      "Sentence 1 — concede and answer at once:",
      "\"You are right that adoption is the assumption under everything else, and if students do not open it, the intervention does nothing.\"",
      "Sentence 2 — the mechanism that shows you planned for it:",
      "\"That is why the pilot measures daily use before it measures outcomes, and why there is a threshold: under a third of students opening it twice a week means the trial stops.\"",
      "Sentence 3 — the honest limit, offered before it is asked for:",
      "\"What I have not solved is what to do if use is high, but only among students who were already organized.\"",
    ],
    because:
      "The first sentence concedes and answers at the same time, and the answer contains a specific threshold rather than a promise. The final sentence names a second problem the panel has not raised yet, which is what a strong defense sounds like — it is not a wall, it is a person thinking.",
    say: [
      "I answered in the first sentence instead of saying 'that is a great question'.",
      "The threshold — a third of students, twice a week — is there so the answer is not a hope.",
      "The last sentence is me being honest about what I have not solved.",
      "If they push on the threshold, I would say it is a judgment call and I would take a different number with a reason.",
    ],
    trap:
      "Defending the plan as though it has no assumptions. A panel is asking because they want to see you think, not because they want you to win.",
  },
];

export const apSeminarDefense: CourseDefense = {
  courseSlug: "ap-seminar",
  claim:
    "That your question, your sources and your conclusion fit together, and that you can name the weakest joint yourself.",
  frames: [
    "Our question was…, and we narrowed it from… because…",
    "This source is credible for… and limited for…, and I used it only for the first.",
    "The evidence changed our claim here — we started thinking… and ended up arguing…",
    "The strongest objection to our solution is…, and it would win if…",
    "What we could not resolve is…, and that is a limit on the conclusion.",
  ],
  markedOn: [
    "Whether the question is answerable and yours",
    "Whether sources are evaluated rather than collected",
    "Whether the argument changes because of evidence",
    "Whether you can answer a hostile question in one sentence",
  ],
  units: [
    {
      unitNumber: 1,
      keep: ["Your narrowed question", "The three limits you added: who, when, what changed"],
      question: "\"Why did you narrow it that far?\"",
      answer: [
        "I narrowed it because the broad version could not be answered in 2,000 words, and a question I cannot answer is not a research question.",
        "What my team and I added was a population, a period and a mechanism — three things the broad version left open.",
        "The narrowing cost us breadth and bought us evidence, and at this length I would make that trade again.",
      ],
    },
    {
      unitNumber: 2,
      keep: ["The word in the claim that overreaches", "The design change that would support it"],
      question: "\"Are you saying the study is wrong?\"",
      answer: [
        "No. The study is fine; the word 'proves' is the problem.",
        "I think it can show a difference in one setting, and that is worth something.",
        "I would need random assignment and a delayed test before I called it proof.",
      ],
    },
    {
      unitNumber: 3,
      keep: ["What each source values, in one phrase", "One claim from each that could be checked"],
      question: "\"Which perspective do you find more convincing?\"",
      answer: [
        "I find the economist's mechanism stronger and the shop owner's stakes more concrete, which is not a fence-sitting answer.",
        "They disagree about what a street is for, so neither one's facts settle it.",
        "The way to settle part of it is to check bus reliability and whether drivers really stop coming.",
      ],
    },
    {
      unitNumber: 4,
      keep: ["Two sources in tension", "The sentence where your claim changed"],
      question: "\"Which source did the most damage to your original argument?\"",
      answer: [
        "The vacancy data, because it refused to agree with the footfall data.",
        "It forced me to change the question from whether centers recovered to which use recovered.",
        "That revision is the strongest thing in the paper, and it came from being contradicted.",
      ],
    },
    {
      unitNumber: 5,
      keep: ["Your assumption, named in one sentence", "What you would do if it failed"],
      question: "\"Why should we believe your solution works?\"",
      answer: [
        "You should not yet. The pilot exists to test adoption before it tests outcomes.",
        "I set a threshold so the trial can fail cleanly.",
        "If use is high only among organized students, the result is confounded and I would say so in the report.",
      ],
    },
  ],
};
