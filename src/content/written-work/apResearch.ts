import type { CourseDefense, WrittenWork } from "./types";

/**
 * AP Research written work and defense.
 *
 * Research is marked on the paper and then defended out loud. The written
 * examples below are the parts students find hardest to write honestly —
 * the method paragraph, the limitations paragraph, the conclusion that does
 * not overclaim — because the defense is only easy if the paper is honest.
 */
export const apResearchWrittenWork: WrittenWork[] = [
  {
    id: "ap-research-1",
    courseSlug: "ap-research",
    unitNumber: 1,
    prompt:
      "Write a research question for a project on study habits and exam performance, narrow enough to be answerable with the time and access you actually have.",
    plan: [
      "Name the population, the variable, and what you can measure in eight months.",
      "If your data would take two years to collect, the question is not feasible and you will not finish.",
    ],
    example: [
      "Too broad: How do study habits affect exam performance?",
      "Feasible: Among students in one school's AP Biology cohort, is the number of days a student spaces practice across associated with higher scores on unit tests, controlling for total study minutes?",
      "Why it works: it names the population, names the independent variable (number of separate study days), names the outcome, and adds one control. Every one of those could be measured with a survey and existing test scores, and the question can be answered either way.",
    ],
    because:
      "The feasibility test is the one assessors apply first. A question that needs a longitudinal study or a national sample is not better research, it is research that will not be finished — and the paper has to be defended, so an unfinished project cannot be defended at all.",
    say: [
      "My first question was unanswerable in the time available, and I say that openly because narrowing was part of the work.",
      "The control matters. Without total study minutes, I would not know whether spacing or just studying more was doing anything.",
      "The population is one cohort, which makes the question answerable and the conclusion modest.",
      "The limit is that I cannot generalize beyond this school, and I say so in the paper rather than in the defense only.",
    ],
    trap:
      "Choosing a question you find interesting rather than one you can answer. Interest survives eight months better than elegance does.",
  },
  {
    id: "ap-research-2",
    courseSlug: "ap-research",
    unitNumber: 2,
    prompt:
      "Write the limitations paragraph of your paper — the one that says where your method stops being trustworthy.",
    plan: [
      "Name the limitation and its consequence. A limitation without a consequence is an apology, not an analysis.",
      "Separate what would change the result from what would only change its precision.",
    ],
    example: [
      "This study has three limitations that shape what the results can support. First, participation was voluntary, so students who agreed may already be more organized than those who did not; that is a self-selection problem, and it means the association I found could be partly a description of who volunteers rather than of what spacing does. Second, study days were self-reported, so some of the variation in my independent variable is probably measurement error, which would pull the observed association toward zero rather than inflate it. Third, unit tests differ in difficulty, so comparing raw scores across units adds noise even after I convert them to z-scores within each unit.",
      "The first limitation is the serious one. If the sample is self-selected on organization, the association is partly confounded and no amount of additional data within this design would fix it; a randomized design would. The other two make my estimates less precise but are unlikely to reverse their direction, which is why I have reported the result as an association rather than as an effect.",
    ],
    because:
      "Each limitation is paired with its consequence, and the paragraph distinguishes a threat to validity from a loss of precision. That distinction is what separates a limitations section that thinks from one that lists.",
    say: [
      "I did not write 'small sample' and leave it there, because size is only a problem in a specific way.",
      "For each limitation I said which direction the bias would push the result. That is the part that shows I understood it.",
      "I distinguished the self-selection problem from the noise problems, because one needs a new design and the others do not.",
      "If a panel asks what I would change first, I would say random assignment, and then I would say it is not possible in a school.",
    ],
    trap:
      "Listing limitations you do not believe are real. Panels ask about the limitation you named, and an answer that says 'it was small but I think it was fine' is worse than having said nothing.",
  },
  {
    id: "ap-research-3",
    courseSlug: "ap-research",
    unitNumber: 3,
    prompt:
      "Write one paragraph of a literature review that puts two studies in conversation rather than summarizing them one after another.",
    plan: [
      "The review is an argument about the state of the field, not an annotated bibliography.",
      "Look for the disagreement and explain it, even if the disagreement is only about method.",
    ],
    example: [
      "The two most relevant studies agree that spacing improves retention and disagree about why, and the disagreement is more useful than the agreement. The first attributes the benefit to the effort of retrieval: material recalled after a delay is harder to retrieve, and the difficulty is what strengthens the memory. The second attributes it to context: spaced study exposes the learner to the material in more varied conditions, so the memory is less tied to one setting. Both explanations predict the same classroom result, which is why the field has not settled the question, and they diverge in exactly the situation my study is in — a single school, where contexts vary far less than in a laboratory.",
      "That divergence is the gap my question sits in. If context matters more than effort, my single-school sample should show a weaker association than the published studies do, and the size of my effect becomes a test of the two accounts rather than a repetition of them.",
    ],
    because:
      "The paragraph does four things at once: it summarizes two studies accurately, identifies what they disagree about, says why the disagreement has survived, and places the writer's own study inside that gap. That last move is what a literature review is for.",
    say: [
      "I read the two studies looking for where they disagree, because an agreement between them would not have given my project anywhere to stand.",
      "The disagreement is about mechanism, not result, which is why both survived.",
      "My study sits in the place where their predictions separate, and that is what makes it worth doing rather than repeating.",
      "The weakness is that I am inferring what my single school will show. If it shows something else, the paper is more interesting, not ruined.",
    ],
    trap:
      "Writing 'Study A found X (2019). Study B found Y (2020).' with no connection. A review with no argument is a list with citations.",
  },
  {
    id: "ap-research-4",
    courseSlug: "ap-research",
    unitNumber: 4,
    prompt:
      "Write a results paragraph reporting a survey finding honestly, including what you cannot tell from the data.",
    plan: [
      "Report the number, then the uncertainty, then the limit of the claim.",
      "Resist causal verbs. 'Associated with' is not a weaker word than 'causes', it is a different claim.",
    ],
    example: [
      "Of 84 respondents, 61 reported studying on four or more separate days before a unit test. The mean unit-test score for that group was 7.4 points higher than for the 23 who reported three or fewer, and the difference was consistent across the three units measured (gaps of 6.1, 7.8 and 8.3 points). The gap is descriptive: respondents were not assigned to a study pattern, so the difference is consistent with spacing helping, and equally consistent with more organized students both spacing their study and scoring higher.",
      "Two further limits follow from the data. Twenty-three respondents is a small group, so the second mean is imprecise; and self-reported study days are probably rounded to convenient numbers, which would blur the comparison rather than sharpen it.",
    ],
    because:
      "The number, the consistency across units, and the alternative explanation all appear in one paragraph, and the verbs stay descriptive. A results section that says 'spacing improved scores' has made a causal claim that a survey cannot support, and a panel will find it in ten seconds.",
    say: [
      "I gave the number and then immediately gave the alternative explanation, because the alternative is the honest reading of a survey.",
      "The consistency across three units is what makes me think there is something here, and it is also why I did not report one unit only.",
      "I deliberately used 'associated with'. If I had written 'improved', I would have been making a claim my design cannot support.",
      "If asked whether the result is causal, my answer is no, and here is the design that would be.",
    ],
    trap:
      "Reporting only the comparison that came out significant. If you measured three units, all three belong in the paragraph, especially the one that agrees least.",
  },
  {
    id: "ap-research-5",
    courseSlug: "ap-research",
    unitNumber: 5,
    prompt:
      "Write the opening four sentences of your oral presentation defense, answering: \"Why does this project matter?\"",
    plan: [
      "Answer in the first sentence, with the specific finding rather than the general topic.",
      "Connect outward once — to a class, a school, a decision someone could make.",
    ],
    example: [
      "1. The finding, in one sentence: \"This project matters because it is the first evidence from this school that spacing — not total study time — separates the students who do well on unit tests from those who do not.\"",
      "2. The number behind it: \"In our data, students who spread four or more sessions across a week scored about seven points higher than students who studied the same minutes in fewer sittings, and the gap held across three units.\"",
      "3. The limit, said first: \"That is a small result about one cohort, and it is the kind a school can act on precisely because it is small.\"",
      "4. The recommendation: \"The ask is not more homework. It is the same homework, spread out.\"",
    ],
    because:
      "The first sentence answers the question with a finding rather than a topic, and the last sentence turns the finding into a specific, cheap recommendation. 'It is a small result and it is the kind a school can act on' is the most defensible sentence in the paragraph, because it claims exactly as much as the design supports.",
    say: [
      "I answered 'why does it matter' with a number, because 'study habits are important' would have wasted my first ten seconds.",
      "I said small twice, on purpose. Overclaiming in a presentation is the fastest way to lose a panel.",
      "The recommendation is free to try, which is what makes it plausible rather than idealistic.",
      "If asked about generalizing, my answer is that I would not, and I would want another school's data before saying anything broader.",
    ],
    trap:
      "Opening with thanks, or with the definition of a term, or with the story of how you chose the topic. The panel has eight minutes and the first thirty seconds decide whether they listen.",
  },
];

export const apResearchDefense: CourseDefense = {
  courseSlug: "ap-research",
  claim:
    "That you designed the study, you know its limits, and you can answer a hostile question without becoming defensive.",
  frames: [
    "The gap I identified was…, and my question sits in it because…",
    "The strongest limitation is…, and it would matter if…",
    "My result is descriptive rather than causal, because…",
    "If I had another six months, I would…, and the reason is…",
    "I cannot answer that from my data, and here is what I would need.",
  ],
  markedOn: [
    "Whether the question is yours and is answerable",
    "Whether you can state a limitation before you are asked",
    "Whether your conclusion claims only what the data support",
    "Whether you answer a hard question in one sentence and then justify",
  ],
  units: [
    {
      unitNumber: 1,
      keep: ["Your narrowed question", "The constraint that forced you to narrow it"],
      question: "\"Is your question big enough to matter?\"",
      answer: [
        "I would argue it is small enough to answer, and answering it is the condition for mattering at all.",
        "I tried the broad version first, and it produced an essay with no evidence in it, so I cut it down.",
        "My finding is local, and I would say plainly that local findings can still change what a school does.",
      ],
    },
    {
      unitNumber: 2,
      keep: ["Your method in one sentence", "One alternative explanation you ruled out"],
      question: "\"How do you know the difference is not just who volunteered?\"",
      answer: [
        "I do not know it. Self-selection is the first limitation I wrote, and it is the one I would fix with random assignment.",
        "What I can say is that the pattern held across three units, which makes a pure fluke less likely but not impossible.",
        "That is why the paper says 'associated with' and not 'caused'.",
      ],
    },
    {
      unitNumber: 3,
      keep: ["The disagreement between your two main sources", "Where your study sits in it"],
      question: "\"What did the literature leave open?\"",
      answer: [
        "The mechanism. Both accounts predict the classroom result, so the field has not separated them.",
        "They separate in a single-school sample, which is where my study is.",
        "If my effect is weaker than published effects, that is evidence for the context account, and that would be a more interesting paper.",
      ],
    },
    {
      unitNumber: 4,
      keep: ["Your main number", "The alternative explanation for it"],
      question: "\"Your result is only seven points. Is that meaningful?\"",
      answer: [
        "Meaningful for a decision and not meaningful as proof. Seven points is about a grade boundary here.",
        "With 23 respondents in one group, the estimate is imprecise, and I said so.",
        "The consistent direction across three units is why I take it seriously at all.",
      ],
    },
    {
      unitNumber: 5,
      keep: ["Your finding in one sentence", "One thing you would do differently"],
      question: "\"What would you do differently if you started again?\"",
      answer: [
        "I would recruit a fixed sample rather than volunteers, because self-selection is the limitation I cannot argue away.",
        "I would also log study days through an app rather than self-report, which would cost compliance but improve measurement.",
        "I would keep the three-unit comparison, because it is what makes the result more than one number.",
      ],
    },
  ],
};
