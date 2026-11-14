import type { CourseDefense, WrittenWork } from "./types";

/**
 * AP U.S. Government and Politics written work and defense.
 *
 * The concepts are not the hard part; the mechanism is. Every example below
 * names the institution, the power it is using and the case that shows it,
 * then says the same thing in spoken words.
 */
export const apGovWrittenWork: WrittenWork[] = [
  {
    id: "ap-gov-1",
    courseSlug: "ap-gov",
    unitNumber: 1,
    prompt:
      "Concept application: Explain how the necessary and proper clause has expanded federal power. Use one example.",
    plan: [
      "Name a specific power, then the specific clause, then one thing the federal government did with it.",
      "Do not say 'the government got bigger' — say which government and through what text.",
    ],
    example: [
      "The necessary and proper clause lets Congress do more than its listed powers say, and the clearest example is the Second Bank. Congress was not given the power to charter a bank in Article I, but it was given the power to tax, borrow and regulate currency, and a bank was a means of carrying those out. In McCulloch v. Maryland (1819) the Court accepted that reading and added two rules that still matter: Congress may choose any means that is plainly adapted to a legitimate end, and a state may not tax an instrument of the federal government.",
      "The result is a clause that expands itself. Every new federal program since has been defended by pairing an enumerated power with the means of carrying it out, which is why the same sentence of the Constitution shows up in arguments about banks, health insurance and student loans.",
    ],
    because:
      "The paragraph names the clause, the mechanism, the case and the rule from the case. The final sentence connects it forward, which is what turns a definition into a concept application.",
    say: [
      "I gave the clause a mechanism first: it lets Congress choose a means for an end it already has.",
      "The bank is the example because it is the case that established the rule, not a case that just illustrates it.",
      "I put both holdings of McCulloch in, because the anti-taxation rule is a separate point and students forget it.",
      "The weak part is that I did not say where the limits are. A strong answer would name one thing the Court has refused.",
    ],
    trap:
      "Defining the clause and stopping. On a concept application question, the definition is worth a clause of your sentence, not a point on its own.",
  },
  {
    id: "ap-gov-2",
    courseSlug: "ap-gov",
    unitNumber: 2,
    prompt:
      "Argument essay: Develop an argument on whether the filibuster strengthens or weakens American democracy. Use one founding document and one Supreme Court case.",
    plan: [
      "Take a side you can defend with a mechanism, not a mood.",
      "The required evidence — a document and a case — has to do work, not sit in the introduction.",
    ],
    example: [
      "The filibuster weakens democracy less by blocking bills than by making it impossible to know who blocked them, and that is a claim about accountability rather than about outcomes.",
      "The founding argument is in Federalist No. 10, where Madison accepts that factions are inevitable and argues that a large republic makes it harder for any one of them to capture the government. A supermajority requirement does the opposite: it hands any determined minority — a faction, in Madison's terms — a veto, so the machinery designed to prevent capture becomes a tool for it.",
      "The case is West Virginia State Board of Education v. Barnette (1943), which held that the government cannot compel a student to salute the flag. The relevant part is not the flag but the reasoning: the Court treated the Bill of Rights as a limit that majorities cannot cross. A Senate rule that requires sixty votes for ordinary legislation makes it easy to protect a minority's interest and equally easy to protect a minority's convenience, and nothing in the rule distinguishes the two.",
      "That is the cost. The filibuster does protect against sudden majoritarian change, which is genuinely a Madisonian concern, but it does so without a record, and a system that cannot say who stopped a bill cannot be held responsible for stopping it.",
    ],
    because:
      "The essay uses the required document and case as arguments, not as decoration — Federalist No. 10 supplies the criterion (preventing faction capture) and Barnette supplies the limit (majority cannot cross a rights line). The concession in the last paragraph is the reasoning point.",
    say: [
      "My claim is about accountability rather than outcomes, because outcomes are arguable both ways.",
      "Federalist No. 10 gives me the standard: the system should make capture hard. I use that standard against the filibuster.",
      "Barnette is there because the essay needs a rights limit, and a supermajority requirement cannot tell a rights claim from a preference.",
      "My concession is real: the filibuster does protect against sudden change, and I say why that protection is still too blunt here.",
    ],
    trap:
      "Citing the required document and case in one sentence each and then writing a general essay about the Senate. The evidence must be the thing the argument turns on.",
  },
  {
    id: "ap-gov-3",
    courseSlug: "ap-gov",
    unitNumber: 3,
    prompt:
      "Civil liberties: Explain how the incorporation doctrine changed the effect of the Bill of Rights, using one case.",
    plan: [
      "Before and after. Say who the Bill of Rights bound in 1791 and who it binds now.",
      "One case, with the amendment it involved.",
    ],
    example: [
      "In 1791 the Bill of Rights bound the federal government and not the states, so a state could establish a religion or ban a newspaper and the First Amendment said nothing about it. The Fourteenth Amendment, ratified in 1868, said no state shall deprive any person of liberty without due process, and the Supreme Court eventually read 'liberty' to include most of the Bill of Rights. Gitlow v. New York (1925) is the case usually credited with starting that process for speech, when the Court assumed for the first time that freedom of speech was among the liberties the Fourteenth Amendment protected.",
      "Incorporation did not make the rights identical everywhere. The Court applies them to the states one at a time, with some adjustments, which is why the same First Amendment protects a newspaper from Congress and, after Gitlow, from a state legislature too — but on the Court's schedule and not the Framers'.",
    ],
    because:
      "The paragraph establishes the before and after, names the case and the amendment, and adds the part most answers miss — that incorporation happened selectively rather than all at once.",
    say: [
      "I answered it as before and after, because the doctrine changed who the rights applied to, not what they say.",
      "Gitlow is my case, and the thing to know is that the Court assumed the point rather than deciding it in a dramatic way.",
      "I added 'selective' because a student who says all the rights were applied at once is going to lose a point.",
      "The weakness is that I have not said which rights are still not incorporated. That would be my next sentence.",
    ],
    trap:
      "Treating the Bill of Rights and the Fourteenth Amendment as the same thing. They were written eighty years apart and do different work.",
  },
  {
    id: "ap-gov-4",
    courseSlug: "ap-gov",
    unitNumber: 4,
    prompt:
      "Public opinion: Explain how question wording can change what a poll appears to show, using one example.",
    plan: [
      "The example should be two versions of the same question, not two different polls.",
      "Say what the difference reveals about how people hold opinions.",
    ],
    example: [
      "Ask whether the government should 'allow' a speech and you get one answer; ask whether it should 'permit' the same speech and you usually get another, even though the two words describe the same policy. The difference is not that respondents are lying. It is that most people do not carry a fixed position on a narrow policy, so the question supplies the frame and the respondent answers the frame.",
      "That matters for how polls are used in a campaign. A survey that reports strong support for a policy has told you something real about the wording it used, and something weaker about what the public believes, which is why a poll released by an interested group should be read alongside its exact question text.",
    ],
    because:
      "The example is the same question with two words changed, which isolates the effect. The second paragraph uses that to make a claim about how to read polls, rather than complaining that polls are biased.",
    say: [
      "I used two wordings of the same policy, because comparing two different polls would not have isolated anything.",
      "My explanation is that most people do not hold a fixed position on a narrow policy, so the wording does work.",
      "That is not the same as saying people are ignorant. It is saying opinions are partly constructed by the question.",
      "The limit: I do not have a number, so my claim is about direction rather than size.",
    ],
    trap:
      "Saying 'polls can be biased' and stopping. The point is the mechanism — wording supplies a frame, and most respondents do not arrive with a fixed position.",
  },
  {
    id: "ap-gov-5",
    courseSlug: "ap-gov",
    unitNumber: 5,
    prompt:
      "Quantitative analysis: A table shows turnout by age in a midterm election: 18–29, 31%; 30–44, 42%; 45–64, 55%; 65+, 63%. Write one paragraph that describes the pattern and explains one consequence.",
    plan: [
      "Describe the pattern with the numbers, then name the largest gap.",
      "The consequence should follow from who votes, not from who is young.",
    ],
    example: [
      "Turnout rises steadily with age in the table, from 31% among 18–29-year-olds to 63% among those 65 and older, so the oldest group votes at about twice the rate of the youngest. The gap of 32 percentage points is larger than the gap between any two adjacent groups, which is why age is one of the strongest predictors in the data.",
      "The consequence is not that young people are ignored because they are young; it is that elected officials count votes. A group that votes at half the rate of another group is cheaper to ignore and more expensive to court, so spending on student debt, childcare and housing is easier to postpone than spending on pensions and health care for retirees, whatever any individual politician believes.",
    ],
    because:
      "The description uses the actual numbers and names the largest gap, which is what the quantitative-analysis point asks for. The explanation then reasons from the mechanism — officials count votes — rather than from a stereotype about young people.",
    say: [
      "I read the numbers before I interpreted them, so the paragraph starts with the pattern.",
      "I named the largest gap rather than listing four numbers, because the point is the size of the difference.",
      "My consequence reasons from incentives: politicians respond to voters, so the group that votes less has less leverage.",
      "I would not say young people do not care, because the table cannot show that. It shows turnout, not attitudes.",
    ],
    trap:
      "Explaining the pattern with an opinion about young people instead of an incentive. The data say who votes; the explanation has to say why that changes what gets passed.",
  },
];

export const apGovDefense: CourseDefense = {
  courseSlug: "ap-gov",
  claim:
    "That you can name the institution, the power and the case — and that your argument would survive a follow-up question.",
  frames: [
    "The institution with the power here is…, and the source of that power is…",
    "The case that settles it is…, and the holding is…, in its own words.",
    "This is a federalism question rather than a rights question because…",
    "The strongest objection is that…, and it would win if…",
    "My evidence is one case and one clause, and I can quote both.",
  ],
  markedOn: [
    "Whether you name a specific institution rather than 'the government'",
    "Whether the case is cited accurately and used, not just named",
    "Whether you can tell a federalism claim from a rights claim",
    "Whether your argument survives a hypothetical",
  ],
  units: [
    {
      unitNumber: 1,
      keep: ["One enumerated power", "The clause that stretches it"],
      question: "\"Which thing has Congress done that it was not explicitly given power to do, and where did that power come from?\"",
      answer: [
        "I would name the national bank. Congress was never handed a bank power; it got there by pairing the currency and tax powers with the necessary and proper clause.",
        "McCulloch upheld that reading and added a second rule I can still use: a state cannot tax a federal instrument.",
        "The limit I would admit is that the means still has to be plainly adapted to a legitimate end, which is not nothing.",
      ],
    },
    {
      unitNumber: 2,
      keep: ["One chamber rule you can describe", "One check that chamber has on another branch"],
      question: "\"Why does the Senate have a rule the House does not?\"",
      answer: [
        "Because the Senate was built with longer terms and a state-based constituency, and I think its rules reflect a body that expects to slow things down.",
        "The filibuster is a Senate rule, not a constitutional requirement, and I would point out that it has changed several times.",
        "The distinction I would keep hold of is that it is a rule and not a right — that is the part that gets lost in arguments about it.",
      ],
    },
    {
      unitNumber: 3,
      keep: ["What the Bill of Rights bound in 1791", "The case that extended it"],
      question: "\"Can a state violate your First Amendment rights?\"",
      answer: [
        "Yes, and it is because of incorporation, not because the First Amendment says so.",
        "The Fourteenth Amendment's due process clause was read to include most of the Bill of Rights, starting with Gitlow for speech.",
        "It happened right by right, which is why I said 'most' and not 'all'.",
      ],
    },
    {
      unitNumber: 4,
      keep: ["Two versions of one poll question", "What the difference shows about opinion"],
      question: "\"Does that mean polls are useless?\"",
      answer: [
        "No. It means a poll is evidence about a wording as well as about a public.",
        "Good polling reports the exact question, and I would rather read the question than the headline.",
        "Most people do not hold fixed positions on narrow policies, and that is a finding about opinion, not a complaint.",
      ],
    },
    {
      unitNumber: 5,
      keep: ["Two numbers from the table", "One incentive that follows from them"],
      question: "\"Why do politicians pay more attention to older voters?\"",
      answer: [
        "Because they vote more, and a politician's job depends on votes.",
        "The table shows 63% versus 31%, which is not a small difference.",
        "I would not explain it with 'young people do not care', because turnout is not the same thing as interest.",
      ],
    },
  ],
};
