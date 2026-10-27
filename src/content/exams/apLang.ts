import type { ExamQuestion, Stimulus } from "./types";

/**
 * AP English Language and Composition — Section I passage sets.
 *
 * The real Section I is entirely passage-based: five nonfiction sets of roughly
 * 450–550 words, each followed by eight or nine questions on the writer's
 * choices. This file replaces the discrete knowledge items the paper used to
 * draw from the lesson bank, so a student sitting the interim paper meets the
 * same task the May exam sets: read a piece of prose and account for how it
 * works.
 *
 * Every passage is an original piece written for this site in a recognisable
 * register — a school-board address, a clinical memoir, an op-ed, a science
 * essay, and an 1891 public letter. Each carries an attribution saying so. None
 * is a reproduction of a real text, and no question is a released College Board
 * item. Questions follow the published task descriptions: reading, rhetorical
 * analysis, and argument.
 *
 * Five sets × nine questions = the published 45 items.
 */

interface LangItem {
  /** What the question asks the reader to do. */
  q: string;
  options: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  explanation: string;
  /** One line per option, so a wrong choice teaches rather than stings. */
  why: [string, string, string, string];
  skill: string;
  unit: number;
}

function build(stimulusId: string, items: LangItem[]): ExamQuestion[] {
  return items.map((item, index) => ({
    key: `${stimulusId}-q${index + 1}`,
    stimulusId,
    question: item.q,
    options: item.options,
    correctIndex: item.correct,
    explanation: item.explanation,
    optionExplanations: item.why,
    skill: item.skill,
    unitNumber: item.unit,
  }));
}

/* ------------------------------------------------------------------ */
/* Set 1 · Speech                                                      */
/* ------------------------------------------------------------------ */

const boardAddress = `Members of the board, I want to begin with a concession, because I have watched enough of these meetings to know what you are expecting. You are expecting a student to stand here and tell you that a name is only a name. I am here to agree with you — and then to explain why I am still asking you to change it.

Names are only names, in the way that foundations are only stones. Nobody who has ever lived in a house has been persuaded to stay in it by the stones. They stay because of what the stones make possible: shelter, a place to put the table, a door that opens. A name works the same way. It does not teach chemistry or coach the debate team. It does something quieter and more durable, which is that it tells every student who walks past the front office what this institution has decided to be proud of.

For nineteen years this building has been called after a man whose name I will not repeat, because repeating it is what he would want and what you have already heard. What I will say is that a school is a sentence, and its name is the first word. We have been beginning that sentence with a name that celebrates a decision to keep certain children out. We can argue about how much that word matters to a fifteen-year-old who has never read the man's speeches. But the fifteen-year-old does not need to read the speeches. She only needs to notice that every adult who was asked to change the word chose, year after year, not to.

I have heard three arguments against this proposal, and I take two of them seriously. The first is cost: signage, letterhead, the athletic uniforms, an estimated forty thousand dollars. That is real money, and it is also, spread across the eight thousand students who will pass through these doors in the next decade, five dollars a student. I would like the board to consider what else we have spent five dollars a student on this year.

The second argument is that renaming erases history. I would answer that a name is not a record; it is an endorsement. The record is in the archives, in the yearbooks, in the minutes of the meetings where the decision was made. Nobody proposes burning those. What we propose is that the building stop making the endorsement.

The third argument I do not take seriously, and I will say so plainly: that we should wait until the community is ready, because a community is never ready, and the waiting is the policy.

So I am asking for one vote, and then I am asking for something harder. Vote to rename the building. Then put the old name — with the date, the minutes, and a paragraph explaining what the man did — on a plaque in the main hallway, where students have to walk past it on the way to chemistry. Give them the record and the argument, not the endorsement. That is what an institution does when it decides to teach instead of merely to commemorate.`;

export const apLangBoardAddress: Stimulus = {
  id: "lang-set1-address",
  title: "Speech to a school board on renaming a building",
  kind: "prose",
  attribution:
    "Original speech written for this site to model the AP English Language rhetorical-analysis register. It is not a transcript of a real address and quotes no real person.",
  note: "Read the speech carefully. Then answer the questions that follow.",
  text: boardAddress,
};

const set1 = build("lang-set1-address", [
  {
    q: "The speaker opens by naming what the audience expects in order to",
    options: [
      "establish common ground before making a request the audience may resist",
      "apologise for the length of the remarks that follow",
      "distance himself from other students who have addressed the board",
      "concede that the proposal has no chance of passing",
    ],
    correct: 0,
    explanation:
      "The first two sentences meet the board where it already is — sceptical and braced for a familiar speech — and then use that shared expectation as the hinge for the argument. Conceding a point early is a way of buying the audience's attention for the claim that follows.",
    why: [
      "Conceding the audience's likely objection, then turning it, is a standard opening move for a persuasive address.",
      "The speaker never mentions length or apologises for speaking.",
      "He distinguishes his position from a stock student position, not from particular students.",
      "He treats passage as achievable — that is the point of ending on a specific ask.",
    ],
    skill: "Rhetorical situation",
    unit: 1,
  },
  {
    q: "In the second paragraph, the comparison of a name to a foundation mainly serves to",
    options: [
      "prove that old buildings are more valuable than new ones",
      "make an abstract claim about names concrete by treating them as structures that enable action",
      "suggest that the building itself should be replaced",
      "introduce a technical vocabulary the board will recognise",
    ],
    correct: 1,
    explanation:
      "The analogy gives the abstract claim (a name shapes what a community values) a physical form: stones are worthless in themselves and indispensable in what they allow. That is exactly the relationship the speaker wants the board to see in a name.",
    why: [
      "The analogy compares function, not age or monetary value.",
      "This is what the analogy does: it converts an abstraction into a structure whose use is obvious.",
      "The speaker argues about the name, never about demolishing the building.",
      "No technical or professional vocabulary is introduced; the image is deliberately plain.",
    ],
    skill: "Figurative language",
    unit: 8,
  },
  {
    q: "The sentence “a school is a sentence, and its name is the first word” is best understood as",
    options: [
      "a literal claim about how schools teach grammar",
      "an admission that the argument is mainly verbal rather than substantive",
      "a compressed restatement of the speech's claim about names shaping meaning",
      "a hostile comparison between the building and a written document",
    ],
    correct: 2,
    explanation:
      "The play on “sentence” carries the argument in miniature: a name is not decoration but the beginning that governs what follows. It is a metaphor doing argumentative work, not a comment on curriculum.",
    why: [
      "The sentence is figurative; the school does not literally teach grammar by being named.",
      "It claims the opposite — that words have substantive force.",
      "The equation of institution and sentence restates the claim that naming orders meaning.",
      "The comparison is not hostile; it elevates the name's importance.",
    ],
    skill: "Rhetorical strategy",
    unit: 4,
  },
  {
    q: "The speaker's reference to “the fifteen-year-old [who] does not need to read the speeches” functions primarily to",
    options: [
      "shift the argument from abstract history to a specific student's daily experience",
      "concede that students are uninformed about the building's namesake",
      "establish the speaker's own age relative to the board",
      "introduce new evidence about the man's speeches",
    ],
    correct: 0,
    explanation:
      "The imagined student moves the claim out of the archive and into a hallway: the harm is not what a student reads but what she infers from adults' repeated refusal. The figure also previews the plaque proposal at the end.",
    why: [
      "The hypothetical student makes the consequence concrete and local.",
      "Ignorance is not conceded — the speaker says reading is unnecessary for the point to land.",
      "The speaker's age is implied throughout but not used as evidence here.",
      "The speeches are explicitly not quoted or described.",
    ],
    skill: "Line of reasoning",
    unit: 3,
  },
  {
    q: "How does the speaker handle the cost objection?",
    options: [
      "He denies that the estimate is accurate.",
      "He grants the figure and reframes it per student to make it look proportionate.",
      "He argues that cost is irrelevant to matters of principle.",
      "He proposes that students raise the money themselves.",
    ],
    correct: 1,
    explanation:
      "The move is arithmetic as rhetoric: accept the number, then divide it by the students who will benefit, and finish with a comparison that invites the board to examine its other expenditures. Reframing, not denial, is what makes the concession useful.",
    why: [
      "He calls the estimate “real money” — the number is accepted.",
      "Division by the affected population changes the frame from lump sum to per-student cost.",
      "He explicitly says the money is real, so he cannot dismiss it.",
      "Fundraising is never proposed.",
    ],
    skill: "Argumentation",
    unit: 7,
  },
  {
    q: "The distinction between a record and an endorsement is central because it",
    options: [
      "shows that the speaker has no interest in preserving historical documents",
      "separates preserving history from honouring it, which answers the “erasing history” objection",
      "proves that archives are unreliable sources of evidence",
      "suggests that the plaque should replace the archives",
    ],
    correct: 1,
    explanation:
      "The objection claims renaming erases history. The speaker concedes that history should remain available and argues that a building's name performs a different act — endorsement. The distinction lets him keep the record while withdrawing the honour, and it sets up the plaque.",
    why: [
      "He insists the archives and yearbooks stay exactly where they are.",
      "This is the function of the distinction — it preserves the objection's value while defeating its conclusion.",
      "The speaker treats archives as reliable; his worry is about what a name endorses.",
      "The plaque supplements the archives rather than replacing them.",
    ],
    skill: "Argumentation",
    unit: 7,
  },
  {
    q: "The final paragraph moves from “asking for one vote” to “something harder” because the speaker wants to",
    options: [
      "lower the stakes of the request before the board votes",
      "extend the request beyond the vote so the change becomes an act of teaching",
      "suggest that the vote is likely to fail",
      "introduce a second, unrelated proposal about the curriculum",
    ],
    correct: 1,
    explanation:
      "The two-part close matches the two-part argument that preceded it: withdrawing the endorsement is not enough unless the record is deliberately taught. The move also converts a symbolic act into a pedagogical one.",
    why: [
      "The second request raises, rather than lowers, the stakes.",
      "The plaque and its explanatory paragraph are designed to make students read the history.",
      "The speaker's confidence is not the subject; the sequence of requests is.",
      "The plaque is directly related — it is the answer to the record/endorsement distinction.",
    ],
    skill: "Structure",
    unit: 4,
  },
  {
    q: "The speaker's tone in “the third argument I do not take seriously, and I will say so plainly” is best described as",
    options: [
      "apologetic",
      "candid and deliberate",
      "mocking and sarcastic",
      "uncertain",
    ],
    correct: 1,
    explanation:
      "The line is blunt rather than sneering: it names a refusal openly and gives a reason in the next clause. The candour is itself a rhetorical choice — it signals that the speaker has been fair to the other two objections and will not pretend to be fair to a third that he thinks is a stalling device.",
    why: [
      "There is no apology; the sentence is unhedged.",
      "Directness plus a stated reason is candour, and it is chosen for effect.",
      "The speaker names his position plainly instead of ridiculing the objection.",
      "The sentence is the least uncertain sentence in the speech.",
    ],
    skill: "Tone",
    unit: 8,
  },
  {
    q: "Which statement best describes the overall structure of the speech?",
    options: [
      "A concession, an analogy, an account of the problem, three objections answered, and a two-part request",
      "A chronological narrative of the building's history followed by a summary",
      "A series of unrelated appeals arranged by emotional intensity",
      "A definition of terms followed by a refutation of the board's authority",
    ],
    correct: 0,
    explanation:
      "The movement is deliberate and visible: concede, analogise, define the harm, take the objections in order of strength, then ask for a vote and for teaching. The order is the argument — the strongest objection is answered last among those taken seriously, and the refusal is placed where it can close that sequence.",
    why: [
      "This matches the paragraph sequence exactly.",
      "The speech refers to history but never narrates it in order.",
      "The appeals are organised by objection, not by intensity.",
      "The speaker does not refute the board's authority; he addresses it.",
    ],
    skill: "Structure",
    unit: 2,
  },
]);

/* ------------------------------------------------------------------ */
/* Set 2 · Memoir                                                      */
/* ------------------------------------------------------------------ */

const clinicMemoir = `The clinic opens at eight, which is a fiction the staff maintain for the benefit of the appointment book. By seven-forty there are eleven people in the corridor, and the chairs have been arranged the way Mrs. Okafor arranges them, in a shallow arc facing the door, so that everyone can see who arrives.

I was twenty-three and had been hired to run the front desk, which in that building meant deciding, forty times a day, which of my neighbours would be seen and which would be asked to come back on Thursday. I had a laminated sheet of rules and the authority of a name badge, and for the first month I used both.

The rule that mattered was triage, and triage is a word that hides a great deal. It sounds clinical, like a procedure with a flowchart. What it actually asks is that a person with a fever and no transportation weigh herself against a man with a cough and a car, and it asks this of a twenty-three-year-old who has never had a fever in her life.

Mrs. Okafor had been the desk for nineteen years before me and had opinions about the sheet. She never argued with the rules. She simply knew, in the way that some people know the weather, which of the eleven would be back next week if they were sent home. She would look at the corridor and say, “the one in the green coat,” and I would find a reason in the sheet to move him up. For a while I believed she was breaking the rules. Then I understood she was applying a different one, which was not written down because writing it down would have required the clinic to admit it depended on her.

There is a particular shame in learning that your competence was borrowed. I had been proud of how quickly I could sort a waiting room; it turned out I had been sorting it correctly because a woman two chairs away was quietly amending my arithmetic. When she retired, the corridor did not change. The sheet did.

I am not writing this to criticise the clinic, which was understaffed in ways no one at the desk could fix, or to praise Mrs. Okafor in the manner of a tribute, which she would have found embarrassing and slightly false. I am writing because I have since worked in three hospitals with better software and worse waiting rooms, and because the laminated sheet is still the most honest document I have ever been asked to follow. It said, in effect: these are the categories, and this is the order. It did not say what to do when the categories are wrong, which is the situation the desk is in from the moment the door opens.

What I learned there was not that rules are cruel. The rules were fine. What I learned was that a rule is a sentence written by someone who is not in the room, and that the person in the room has to decide, forty times a day, how to read it aloud.`;

export const apLangClinicMemoir: Stimulus = {
  id: "lang-set2-memoir",
  title: "Memoir: the front desk of a rural clinic",
  kind: "prose",
  attribution:
    "Original memoir written for this site to model the AP English Language narrative-nonfiction register. The clinic, its staff, and its patients are invented.",
  note: "Read the passage carefully. Then answer the questions that follow.",
  text: clinicMemoir,
};

const set2 = build("lang-set2-memoir", [
  {
    q: "The first sentence establishes the narrator's perspective mainly by",
    options: [
      "explaining the clinic's appointment system in detail",
      "signalling a wry insider's view of an institution he or she knows intimately",
      "criticising the staff for dishonesty",
      "introducing Mrs. Okafor as the central figure",
    ],
    correct: 1,
    explanation:
      "“A fiction the staff maintain for the benefit of the appointment book” tells the reader two things at once: the narrator has worked here long enough to see behind the schedule, and the narrator's stance will be dry, affectionate, and unsentimental.",
    why: [
      "The sentence mentions the appointment book only to undercut it.",
      "The irony establishes both intimacy and a critical but fond viewpoint.",
      "The staff are described as collaborating in a harmless fiction, not as deceiving anyone.",
      "Mrs. Okafor is introduced later, with her chair arrangement.",
    ],
    skill: "Narrative perspective",
    unit: 1,
  },
  {
    q: "The narrator says “triage is a word that hides a great deal” in order to",
    options: [
      "define a medical term for readers unfamiliar with it",
      "expose the gap between a clinical label and the human judgement it conceals",
      "argue that the clinic should abandon triage",
      "show that the narrator had no training for the job",
    ],
    correct: 1,
    explanation:
      "The sentence is about language as much as medicine: the professional word makes an impossible comparison sound procedural. The rest of the paragraph supplies the human content the word conceals.",
    why: [
      "A glossary definition would not claim the word hides something.",
      "The claim is that abstraction conceals a moral decision — that is the analysis.",
      "The narrator accepts the need for an order; the objection is to the word's tidiness.",
      "Lack of training is implied elsewhere, not here.",
    ],
    skill: "Diction",
    unit: 8,
  },
  {
    q: "Mrs. Okafor's practice of naming “the one in the green coat” is presented as",
    options: [
      "an abuse of authority the narrator silently tolerates",
      "a practical form of knowledge that the official system could not acknowledge",
      "a sentimental gesture with no effect on who was seen",
      "evidence that the clinic's rules were ignored by everyone",
    ],
    correct: 1,
    explanation:
      "The narrator explicitly moves from suspecting rule-breaking to understanding a different rule — one unwritten precisely because admitting it would reveal the clinic's dependence on her judgement.",
    why: [
      "The narrator's suspicion is corrected within the same paragraph.",
      "The passage calls it a rule that could not be written down.",
      "It demonstrably changed the order, since the narrator found reasons to move people up.",
      "The point is that Mrs. Okafor worked within the sheet, not around it.",
    ],
    skill: "Inference",
    unit: 6,
  },
  {
    q: "The sentence “There is a particular shame in learning that your competence was borrowed” is effective because it",
    options: [
      "shifts the passage from description to a general reflection grounded in the narrator's own error",
      "accuses Mrs. Okafor of taking credit for the narrator's work",
      "introduces a new setting for the remainder of the memoir",
      "admits that the narrator was unqualified for the position",
    ],
    correct: 0,
    explanation:
      "The sentence turns outward from the corridor to a claim about competence itself, and the rest of the paragraph explains what was borrowed. That movement — scene, then reflection grounded in the scene — is the structural engine of the whole passage.",
    why: [
      "It generalises from the narrator's experience, which is what the following paragraph unpacks.",
      "Mrs. Okafor is credited, never blamed.",
      "The setting does not change; the reflection deepens.",
      "The narrator was inexperienced, but the sentence is about borrowed judgement, not credentials.",
    ],
    skill: "Line of reasoning",
    unit: 3,
  },
  {
    q: "The narrator's explanation of why the second rule was never written down reveals",
    options: [
      "the clinic's indifference to patients",
      "an institutional reluctance to admit that its functioning depended on one person's judgement",
      "Mrs. Okafor's refusal to share her methods",
      "the narrator's resentment of Mrs. Okafor",
    ],
    correct: 1,
    explanation:
      "Admitting the rule would mean admitting the clinic relied on knowledge it had never formalised. The sentence is about institutions and self-description, not about individual generosity.",
    why: [
      "The clinic is described as understaffed, not uncaring.",
      "The passage locates the reason in what the clinic would have had to admit.",
      "Mrs. Okafor is shown teaching by example throughout.",
      "The narrator's tone toward her is admiring and slightly rueful.",
    ],
    skill: "Inference",
    unit: 6,
  },
  {
    q: "The sentence beginning “I am not writing this to criticise the clinic… or to praise Mrs. Okafor…” functions primarily to",
    options: [
      "announce the memoir's purpose by ruling out two easier purposes",
      "suggest that the narrator disliked both the clinic and its manager",
      "apologise for the length of the passage",
      "introduce statistics about hospital staffing",
    ],
    correct: 0,
    explanation:
      "By refusing the complaint and the tribute, the narrator defines a third purpose: an argument about how rules work in practice. The refusal is the thesis.",
    why: [
      "The negative formulation is a way of stating the real aim.",
      "The narrator is fond of Mrs. Okafor and fair to the clinic.",
      "Length is not mentioned; the sentence turns to purpose.",
      "No statistics appear anywhere in the passage.",
    ],
    skill: "Rhetorical strategy",
    unit: 3,
  },
  {
    q: "Which detail most directly supports the narrator's claim that the laminated sheet was “the most honest document” he or she had been asked to follow?",
    options: [
      "The chairs are arranged in a shallow arc.",
      "The sheet stated its categories and order and did not pretend to resolve hard cases.",
      "The clinic opens at eight.",
      "The narrator has since worked in three hospitals.",
    ],
    correct: 1,
    explanation:
      "Honesty here means a document that admits what it is. The sheet names its categories and stops, whereas later software and procedures presumably implied judgements they could not make.",
    why: [
      "The chair arrangement characterises Mrs. Okafor, not the document.",
      "This is the claim stated directly: categories and order, nothing more.",
      "The opening hour is the fiction the passage began by exposing.",
      "Later hospitals support the comparison but do not show what makes the sheet honest.",
    ],
    skill: "Evidence",
    unit: 3,
  },
  {
    q: "The final sentence's image of a rule as “a sentence written by someone who is not in the room” depends on the reader understanding that",
    options: [
      "rules are grammatically complete statements",
      "interpretation is unavoidable because rules are made at a distance from the situations they govern",
      "the author of the sheet should be identified and questioned",
      "written language is less trustworthy than speech",
    ],
    correct: 1,
    explanation:
      "The metaphor pairs “sentence” as a written unit with “read aloud”, making the point that a rule arrives without its author and must be interpreted by whoever applies it. The pun is doing the argument.",
    why: [
      "Grammar is the vehicle of the metaphor, not its point.",
      "Distance between rule-maker and rule-applier is exactly the claim.",
      "The passage never proposes finding or confronting the author.",
      "Speech is not preferred; reading aloud is itself an act of interpretation.",
    ],
    skill: "Figurative language",
    unit: 8,
  },
  {
    q: "The overall tone of the passage can best be described as",
    options: [
      "indignant and accusatory",
      "reflective, self-critical, and quietly ironic",
      "nostalgic and sentimental",
      "detached and clinical",
    ],
    correct: 1,
    explanation:
      "The narrator admits personal shame, credits a colleague, refuses both complaint and tribute, and maintains a dry irony throughout (“which is a fiction the staff maintain”). Sentiment is deliberately held at arm's length.",
    why: [
      "The narrator explicitly declines to criticise the clinic.",
      "Self-criticism plus irony plus a refusal of sentiment matches every paragraph.",
      "The refusal to praise “in the manner of a tribute” rules out sentimentality.",
      "The vocabulary is clinical; the stance is not detached.",
    ],
    skill: "Tone",
    unit: 8,
  },
]);

/* ------------------------------------------------------------------ */
/* Set 3 · Op-ed                                                       */
/* ------------------------------------------------------------------ */

const phoneOpEd = `Every few months a school district announces that it has solved the phone problem, and every few months the announcement is the same: a new policy, a locked pouch, a stern letter home. The policies are not stupid. They are simply aimed at the wrong object. We have spent a decade trying to remove a device from students' hands, when what we should have been doing is teaching them what the device is doing to their attention.

Consider what a phone actually offers a fifteen-year-old in a classroom. It offers an interruption, but more precisely it offers an interruption with a reward attached: the possibility that someone is thinking about you. A locker and a book do not compete with that. A lecture usually does not either. So the phone wins, and it wins not because adolescents are weak-willed but because the phone was engineered, at enormous expense, by people who are very good at their jobs.

This is why the prohibition approach produces the results it does. Districts that ban phones report fewer visible distractions and, in several well-publicised cases, modest gains in test scores. What they do not report is what happens at three-fifteen, when the pouch is opened and four hours of notifications arrive at once. A ban changes the location of the problem. It does not change the problem.

The alternative is not permissiveness. It is instruction. A student who can describe the mechanism by which a feed is designed to hold her — the variable reward, the infinite scroll, the notification timed to arrive when she is most likely to look — has something a locked pouch cannot give her: a reason. Reasons outlast policies. Policies end when the principal retires.

I can already hear the objection, because it is the same one I made for years: schools do not have time for another curriculum, and the science of attention is too abstract for a ninth-grader. The first half of that objection is fair. The second half is not. Students learn the Krebs cycle. They can learn that a slot machine and a notification share a design principle, and they can learn it in two class periods.

What I am proposing is therefore smaller than a policy and harder than one. Two periods, once, in the first month of the year, taught by someone who can explain the design honestly and without moralising. Then the devices go in the pouch — not as the whole solution but as the second half of one.

There is a version of this argument that ends in scolding, and I want to avoid it. The people who build these products are not villains, and the students who use them are not addicts. What is true is narrower and more useful: attention is now a designed environment, and nobody has taught the people living in it to read the architecture. That is a curriculum problem, and curriculum problems are the ones schools are actually good at.`;

export const apLangPhoneOpEd: Stimulus = {
  id: "lang-set3-oped",
  title: "Op-ed: phones in classrooms",
  kind: "prose",
  attribution:
    "Original op-ed written for this site to model the AP English Language argument register. The policies, districts, and studies mentioned are illustrative and are not cited to real sources.",
  note: "Read the op-ed carefully. Then answer the questions that follow.",
  text: phoneOpEd,
};

const set3 = build("lang-set3-oped", [
  {
    q: "The writer's central claim is that schools should",
    options: [
      "ban phones entirely and enforce the ban consistently",
      "teach students how attention is engineered, then restrict devices",
      "replace phone policies with a voluntary code of conduct",
      "abandon the attempt to regulate phones in classrooms",
    ],
    correct: 1,
    explanation:
      "The argument is explicitly two-part at the end: instruction first, restriction as the second half of one solution. The writer rejects both the pure ban and permissiveness.",
    why: [
      "The ban is criticised for treating a symptom and relocating the problem.",
      "Instruction plus the pouch is the proposal stated in the final third.",
      "Voluntariness is never proposed; the pouch remains.",
      "The writer says the policies are aimed at the wrong object, not that regulation is pointless.",
    ],
    skill: "Main claim",
    unit: 1,
  },
  {
    q: "“We have spent a decade trying to remove a device from students' hands, when what we should have been doing is teaching them what the device is doing to their attention” is best described as",
    options: [
      "a concession followed by a counterargument",
      "a contrast that reframes the problem from removal to instruction",
      "an appeal to authority",
      "a qualified rejection of all school policy",
    ],
    correct: 1,
    explanation:
      "The “when” clause does the work: it does not merely criticise the old approach, it substitutes a different object of attention. That substitution is the essay's thesis in miniature.",
    why: [
      "No concession is made in this sentence; the concession appears later, about time.",
      "The sentence swaps one policy target for another — a reframing.",
      "No authority is cited.",
      "The writer is proposing policy, not rejecting policy as such.",
    ],
    skill: "Rhetorical strategy",
    unit: 2,
  },
  {
    q: "The writer's account of what a phone offers — “an interruption with a reward attached” — is used to",
    options: [
      "prove that adolescents are less capable of self-control than adults",
      "explain the behaviour through design rather than through character",
      "argue that phones should be banned from all public spaces",
      "criticise the engineers who build phones",
    ],
    correct: 1,
    explanation:
      "The passage explicitly rejects the willpower explanation (“not because adolescents are weak-willed but because the phone was engineered”). The mechanism replaces a moral judgement with a design explanation, which is what makes the curriculum proposal follow.",
    why: [
      "The writer says the opposite: the outcome is not a character defect.",
      "Design, not deficiency, is the stated cause.",
      "The argument is confined to classrooms.",
      "The engineers are described as very good at their jobs, not as villains.",
    ],
    skill: "Line of reasoning",
    unit: 3,
  },
  {
    q: "Which sentence most clearly acknowledges a limit in the evidence for banning phones?",
    options: [
      "“The policies are not stupid.”",
      "“What they do not report is what happens at three-fifteen, when the pouch is opened and four hours of notifications arrive at once.”",
      "“Students learn the Krebs cycle.”",
      "“Attention is now a designed environment.”",
    ],
    correct: 1,
    explanation:
      "The sentence points to what the reported results leave out — the displaced rather than eliminated problem — which is an argument about the sufficiency of the evidence, not about its accuracy.",
    why: [
      "This concedes the policies' intent, not a limit in their evidence.",
      "It names what the favourable reports omit, which is a claim about evidence.",
      "It is a comparison about curriculum capacity.",
      "It is the essay's concluding formulation of the problem.",
    ],
    skill: "Evidence",
    unit: 6,
  },
  {
    q: "The writer concedes that “schools do not have time for another curriculum” partly because",
    options: [
      "conceding a practical objection makes the remaining argument harder to dismiss",
      "the writer believes the objection defeats the proposal",
      "the writer wants to shift the argument to a different topic",
      "the objection is the writer's strongest evidence",
    ],
    correct: 0,
    explanation:
      "The concession is strategic and partial: the time objection is granted, then its second half (that the science is too abstract) is defeated with a two-period estimate. Granting the real constraint is what makes the scaled-down proposal credible.",
    why: [
      "Accepting the fair half of an objection, then limiting the proposal to fit it, strengthens the case.",
      "The writer answers the objection rather than surrendering to it.",
      "The topic does not change; the objection is answered on its own terms.",
      "A concession is not evidence for the writer's claim; it is a way of managing opposition.",
    ],
    skill: "Argumentation",
    unit: 7,
  },
  {
    q: "The phrase “taught by someone who can explain the design honestly and without moralising” reveals the writer's awareness that",
    options: [
      "teachers are generally dishonest about technology",
      "the argument's credibility depends on avoiding a scolding tone",
      "students respond only to technical experts",
      "morality has no place in a school curriculum",
    ],
    correct: 1,
    explanation:
      "The writer has already warned against the version of the argument that “ends in scolding”. The qualifier protects the proposal from reading as disapproval of students, which would undercut its persuasive appeal.",
    why: [
      "Nothing suggests teachers are dishonest.",
      "Tone is repeatedly treated as a condition of persuasiveness, and the closing paragraph repeats it.",
      "The teacher, not an outside expert, is specified.",
      "The claim is about moralising as a tone, not about ethics as a subject.",
    ],
    skill: "Tone",
    unit: 8,
  },
  {
    q: "The final paragraph's move — “The people who build these products are not villains, and the students who use them are not addicts” — chiefly serves to",
    options: [
      "introduce new evidence about product design",
      "narrow the claim so that it targets design and instruction rather than people",
      "admit that the essay's earlier argument was overstated",
      "appeal to the audience's sympathy for technology companies",
    ],
    correct: 1,
    explanation:
      "Refusing both caricatures is what allows the narrower claim about architecture and curriculum. It also protects the writer from the appearance of a moral panic, which is the cheapest way for a sceptical reader to dismiss the piece.",
    why: [
      "No new evidence is offered; the sentence removes two explanations.",
      "The sentence shifts blame from people to designed environments.",
      "It refines rather than retracts; the design argument still stands.",
      "Sympathy for companies is not the aim — the writer withdraws a charge.",
    ],
    skill: "Rhetorical strategy",
    unit: 7,
  },
  {
    q: "Which of the following best describes the writer's use of evidence throughout?",
    options: [
      "Heavy reliance on named studies and statistics",
      "Mostly illustrative and generalised, with a note that the districts and studies are illustrative",
      "Personal anecdote only",
      "Direct quotation from school officials",
    ],
    correct: 1,
    explanation:
      "The essay refers to “several well-publicised cases” without naming them, and its attribution states that the districts and studies are illustrative. A reader should notice that the argument rests on reasoning and register rather than on cited data.",
    why: [
      "No study is named and no figure is given.",
      "The references are general, and the passage's own attribution says so.",
      "The essay includes no personal narrative.",
      "No official is quoted.",
    ],
    skill: "Evidence",
    unit: 6,
  },
  {
    q: "The word “architecture” in the final paragraph is effective because it",
    options: [
      "describes the physical layout of classrooms",
      "extends the essay's design vocabulary, framing attention as something built and therefore readable",
      "refers to the school building's construction",
      "introduces a technical term from engineering",
    ],
    correct: 1,
    explanation:
      "The essay has spoken of what the device is “engineered” to do and of a “designed environment”. “Architecture” completes that vocabulary and makes the curriculum proposal follow: if attention is built, it can be studied.",
    why: [
      "Classroom layout is not at issue.",
      "The metaphor is the payoff of the essay's recurring design language.",
      "The building is not mentioned in the passage.",
      "The word is used figuratively; no engineering definition is offered.",
    ],
    skill: "Figurative language",
    unit: 8,
  },
]);

/* ------------------------------------------------------------------ */
/* Set 4 · Science essay                                               */
/* ------------------------------------------------------------------ */

const treeEssay = `A city block with mature trees can be eight degrees cooler on a July afternoon than the block next to it, and the difference is not evenly distributed. The neighbourhoods with the fewest trees are, with remarkable consistency, the neighbourhoods where people were once prevented from buying houses. That sentence is doing two jobs at once: it is a description of a physical measurement and a description of a political history, and understanding urban heat requires holding both.

The mechanism is straightforward enough to state in a paragraph. Dark surfaces — asphalt, roofing, concrete — absorb solar energy and re-emit it as heat. A city replaces vegetated ground with those surfaces, and the result is the urban heat island: a metropolitan area several degrees warmer than its rural surroundings, with the difference largest at night, when the built environment releases the heat it stored all day. Trees interrupt every part of that sequence. Their canopy reflects and absorbs radiation before it reaches the pavement. Their leaves transpire, converting absorbed energy into latent heat as water evaporates, which cools the air rather than the surface. And their shade reduces the temperature of the surfaces themselves, so there is less heat stored for the evening release.

If the mechanism is that clear, the policy should be equally clear, and it is not. Planting a tree is not the same as growing one. A sapling set into a square of compacted soil, unwatered and unshaded, will in most cities be dead within five years, and the tree that survives may be the wrong species for a street that will be hotter in twenty years than it is today. Municipal tree programmes fail for unglamorous reasons: they are funded for planting and not for maintenance, and the maintenance is where the canopy actually accumulates.

There is also a distributional problem that planting alone does not solve. Trees take decades to mature, and the residents most exposed to heat are usually the least able to wait. In the interim, the same block needs shade structures, cool roofing, drinking water, and access to air-conditioned space — interventions that are less photogenic than a planting day and considerably more effective in the short term. A serious heat plan therefore has two clocks: one measured in summers, for the people at risk now, and one measured in decades, for the canopy that will protect their grandchildren.

None of this argues against planting. It argues against treating planting as the whole of the answer, which is what a photograph of a mayor with a shovel tends to suggest. The evidence that trees cool cities is strong and the evidence that tree planting programmes reliably produce trees is weaker than most announcements imply.

What would a genuinely evidence-based approach look like? It would fund maintenance at the same rate as planting, specify species against projected rather than current temperatures, measure canopy at ten and twenty years rather than counting saplings, and pair every planting programme with short-term cooling for the blocks that have the least shade today. That is more expensive and less photographable than the alternative. It is also the only version of the plan that survives its own second summer.`;

export const apLangTreeEssay: Stimulus = {
  id: "lang-set4-trees",
  title: "Essay: urban heat and the limits of tree planting",
  kind: "prose",
  attribution:
    "Original explanatory essay written for this site to model the AP English Language science-writing register. Figures are illustrative of published ranges, not reported measurements from a named study.",
  note: "Read the essay carefully. Then answer the questions that follow.",
  text: treeEssay,
};

const set4 = build("lang-set4-trees", [
  {
    q: "The opening sentence's two jobs are best described as",
    options: [
      "reporting a measurement and identifying the social history that produced its distribution",
      "introducing the author's credentials and the essay's structure",
      "comparing two cities and two climates",
      "summarising the essay before it begins",
    ],
    correct: 0,
    explanation:
      "The writer says so directly: a physical measurement and a political history. The whole essay depends on refusing to separate them.",
    why: [
      "This is what the paragraph itself claims the sentence does.",
      "No credentials appear, and structure is not the subject.",
      "The comparison is between adjacent blocks, not cities or climates.",
      "The sentence introduces a tension rather than summarising the argument.",
    ],
    skill: "Reading comprehension",
    unit: 1,
  },
  {
    q: "The second paragraph is mainly organised as",
    options: [
      "a counterargument followed by a rebuttal",
      "a causal sequence from absorption to release, with the tree's interventions mapped onto each stage",
      "a comparison of rural and urban climates",
      "a list of policy recommendations",
    ],
    correct: 1,
    explanation:
      "The paragraph moves through mechanisms in order — absorb, re-emit, store, release — and then places three tree effects against that sequence. The structure mirrors the causal chain it describes.",
    why: [
      "No opposing position is raised in the paragraph.",
      "Mechanism first, then interventions mapped stage by stage, is the organisation.",
      "The rural comparison is a single clause, not the structure.",
      "Recommendations are confined to the final paragraph.",
    ],
    skill: "Structure",
    unit: 4,
  },
  {
    q: "The concessive sentence “If the mechanism is that clear, the policy should be equally clear, and it is not” functions to",
    options: [
      "signal a shift from explanation to complication",
      "admit that the mechanism described earlier was wrong",
      "introduce the essay's conclusion",
      "criticise policymakers personally",
    ],
    correct: 0,
    explanation:
      "The sentence marks the hinge of the essay: the science is settled enough, and the difficulty lies in implementation. Everything after it is about the gap between mechanism and outcome.",
    why: [
      "The mechanism stands; the difficulty is in translating it into outcomes.",
      "The conclusion comes several paragraphs later.",
      "The criticism is structural — planting versus maintenance — not personal.",
      "The pivot from explanation to complication is exactly what the sentence does.",
    ],
    skill: "Line of reasoning",
    unit: 2,
  },
  {
    q: "“Planting a tree is not the same as growing one” is effective because it",
    options: [
      "uses a familiar distinction to expose the gap between an announcement and an outcome",
      "defines two technical terms",
      "repeats the essay's opening claim",
      "appeals to the reader's gardening experience",
    ],
    correct: 0,
    explanation:
      "The sentence is short and depends on an everyday distinction, which makes the policy failure vivid: the event is funded, the process is not. It is also the essay's central claim compressed.",
    why: [
      "The distinction is ordinary language doing analytical work.",
      "No terms are defined; the words are used in their usual sense.",
      "It advances the argument beyond the opening.",
      "It does not address the reader's experience, but relies on a shared assumption about plants.",
    ],
    skill: "Rhetorical strategy",
    unit: 3,
  },
  {
    q: "The phrase “two clocks” refers to",
    options: [
      "seasonal versus daily temperature cycles",
      "short-term relief for people at risk now and long-term canopy growth",
      "the funding cycles of city budgets",
      "the difference between rural and urban heat timelines",
    ],
    correct: 1,
    explanation:
      "The sentence that follows spells it out: summers for people at risk now, decades for the canopy. The metaphor organises the essay's policy recommendation.",
    why: [
      "Daily cycles are discussed earlier but are not what the clocks measure.",
      "This is the explanation given in the same paragraph.",
      "Budget cycles are not mentioned.",
      "The rural–urban distinction is not the point of the metaphor.",
    ],
    skill: "Figurative language",
    unit: 8,
  },
  {
    q: "The writer's attitude toward “a photograph of a mayor with a shovel” is best described as",
    options: [
      "approving of the publicity it generates",
      "sceptical of symbolic gestures that substitute for durable policy",
      "indifferent to local politics",
      "hostile toward the mayor personally",
    ],
    correct: 1,
    explanation:
      "The photograph stands for the announcement that replaces implementation. The essay's complaint is repeatedly about the gap between the event and the outcome, not about any individual.",
    why: [
      "The photograph is used as a warning, not an example to praise.",
      "Symbolic planting days are contrasted with maintenance funding.",
      "The essay is intensely interested in municipal policy.",
      "No individual is named or attacked.",
    ],
    skill: "Tone",
    unit: 8,
  },
  {
    q: "Which statement about the essay's evidence is most accurate?",
    options: [
      "It cites named studies and precise measurements throughout.",
      "It presents illustrative figures, a mechanistic explanation, and general claims about programme outcomes without citing named research.",
      "It relies on a single interview with a city official.",
      "It is purely theoretical and offers no empirical claims.",
    ],
    correct: 1,
    explanation:
      "The attribution concedes as much: the degrees and years are illustrative of published ranges. The argument's strength lies in mechanism and in the plausibility of its account of programme failure, not in cited data.",
    why: [
      "No study is named and no source is given.",
      "Illustrative figures, mechanism, and general claims is what the essay actually offers.",
      "No interview appears.",
      "Empirical claims are made, just not sourced to a named study.",
    ],
    skill: "Evidence",
    unit: 6,
  },
  {
    q: "The final paragraph's series of specific requirements is best understood as",
    options: [
      "an emotional appeal to the reader's concern for children",
      "a testable standard that would separate a real plan from an announcement",
      "a restatement of the essay's introduction",
      "a concession that nothing can be done",
    ],
    correct: 1,
    explanation:
      "Each item — maintenance funded at the same rate, projected species, canopy measured at ten and twenty years, short-term cooling in the least shaded blocks — converts the essay's critique into criteria a reader could apply.",
    why: [
      "Grandchildren are mentioned once, but the list itself is procedural.",
      "The list is a set of operational criteria, which is what makes it persuasive.",
      "It goes beyond the introduction's tension to a policy standard.",
      "The essay is optimistic about what a better plan would look like.",
    ],
    skill: "Argumentation",
    unit: 9,
  },
  {
    q: "The essay's concluding sentence — “It is also the only version of the plan that survives its own second summer” — achieves its effect by",
    options: [
      "using a concrete, slightly wry image to state a durability claim",
      "summarising the four policy requirements",
      "introducing a new statistic",
      "appealing to the authority of the reader",
    ],
    correct: 0,
    explanation:
      "“Survives its own second summer” is a compact, faintly humorous way to say that a plan must outlast the season in which it was announced — connecting back to the saplings that die within five years.",
    why: [
      "The image is figurative and specific rather than a summary list.",
      "The requirements were listed in the previous sentence.",
      "No figure is given.",
      "No appeal to authority is made.",
    ],
    skill: "Figurative language",
    unit: 8,
  },
]);

/* ------------------------------------------------------------------ */
/* Set 5 · Period public letter                                        */
/* ------------------------------------------------------------------ */

const libraryLetter = `To the Citizens' Committee on the Free Library:

I am asked, in the plainest terms, why a town of eleven thousand persons should maintain at public expense an institution which no one is compelled to use, and which, if the returns of the last quarter are to be believed, is used chiefly by those who could afford to buy their own books. I shall answer the question as plainly as it is put, for I have found that a question plainly put is usually a question already half answered.

The first thing to be said is that a library is not a charity. A charity is a remedy for a condition which we hope will pass; a library is a provision for a condition which we know will remain. The town does not maintain its streets for the benefit of those who cannot walk, nor its lamps for those who cannot see. It maintains them because a town in which nobody can walk and nobody can see is not a town, but a collection of houses. The library belongs to the same order of provision, and the argument for it is the same argument, which is that certain things are cheaper when everybody has them than when each man buys them alone.

I am sensible that this reasoning will not satisfy those who object that the reading of novels is not improvement. I do not propose to defend the novel, having observed that the same gentlemen who condemn it are rarely observed to be reading anything else themselves. I will observe only that the young man who reads a poor novel on Saturday evening is not, on that account, in the streets; and that the librarian reports, with some pride, that the poor novel is usually the first book taken and rarely the last.

It has been said, too, that the workingman has no leisure to read. I would answer that the workingman has precisely as much leisure as he is permitted to have, and that the eight hours which he spends in the mill are not the eight hours which this institution seeks to occupy. The library opens at seven in the evening and closes at ten. The man who has finished at six may be at a table by half past.

There remains the objection which I respect most, and to which I have no complete answer: that a library may become a substitute for schooling, and that a town may congratulate itself on a shelf of books while its schools go unroofed. I will not pretend that this has never happened. I will say only that the danger of a thing being done badly is not an argument against its being done at all, and that the committee may guard against the danger by the simple expedient of funding both.

I therefore commend the appropriation to you, not as an act of generosity, in which character it has been too often presented, but as an act of ordinary municipal housekeeping, of the same kind as the lamps and the streets.

I am, gentlemen, your obedient servant,
A Member of the Committee`;

export const apLangLibraryLetter: Stimulus = {
  id: "lang-set5-letter",
  title: "Public letter on a free library appropriation (period style)",
  kind: "prose",
  attribution:
    "Original letter written for this site in a late-nineteenth-century civic register. It is not a real historical document and quotes no historical person.",
  note: "Read the letter carefully. Then answer the questions that follow.",
  text: libraryLetter,
};

const set5 = build("lang-set5-letter", [
  {
    q: "The writer's opening sentence accomplishes which of the following?",
    options: [
      "It concedes the strongest practical objection and undertakes to answer it plainly.",
      "It refuses to engage with the committee's concerns.",
      "It establishes the writer's opposition to public libraries.",
      "It reports the library's quarterly finances in detail.",
    ],
    correct: 0,
    explanation:
      "The writer states the objection at full strength — nobody is compelled to use it, and its users may not need it — and then commits to a plain answer. Stating an objection fairly is the letter's recurring method.",
    why: [
      "The objection is quoted in its own terms before being answered.",
      "The writer engages with the objection immediately.",
      "The letter ends by recommending the appropriation.",
      "The returns are mentioned only to characterise the objection.",
    ],
    skill: "Rhetorical strategy",
    unit: 2,
  },
  {
    q: "The comparison between a charity and a provision is used to argue that",
    options: [
      "the library should be funded by private donation",
      "the library is a permanent public good rather than a remedy for a temporary condition",
      "charitable institutions are always inefficient",
      "the town spends too much on streets and lamps",
    ],
    correct: 1,
    explanation:
      "The distinction turns on permanence: a charity addresses a condition hoped to pass, a provision a condition known to remain. The comparison supplies the letter's core justification.",
    why: [
      "Private donation is not proposed anywhere.",
      "Permanence versus remedy is the stated distinction.",
      "Charity is not criticised as inefficient; it is distinguished by purpose.",
      "Streets and lamps are offered as analogies, not as overspending.",
    ],
    skill: "Argumentation",
    unit: 7,
  },
  {
    q: "The analogy of streets and lamps depends on the premise that",
    options: [
      "municipal services should be limited to physical infrastructure",
      "some goods are cheaper and better supplied collectively than individually",
      "libraries and street lighting serve identical purposes",
      "taxation is justified only for safety",
    ],
    correct: 1,
    explanation:
      "The writer states it directly: “certain things are cheaper when everybody has them than when each man buys them alone.” The analogy works only if that economic premise is granted.",
    why: [
      "The letter extends infrastructure to an institution, which argues against a narrow reading.",
      "Collective provision of shared goods is the premise made explicit.",
      "The analogy is about the order of provision, not about identical purposes.",
      "Safety is not the justification offered.",
    ],
    skill: "Line of reasoning",
    unit: 7,
  },
  {
    q: "The sentence “I do not propose to defend the novel, having observed that the same gentlemen who condemn it are rarely observed to be reading anything else themselves” is an example of",
    options: [
      "a concession followed by an appeal to authority",
      "ironic ad hominem that discredits the objection without meeting its substance",
      "a statistical rebuttal",
      "a statement of the writer's indifference to literature",
    ],
    correct: 1,
    explanation:
      "The writer declines the argument and turns on the objectors instead, with a dry irony. It is effective rhetoric and it is also a deflection: the substantive question — whether fiction improves anyone — is left unanswered, which the next sentence half-admits.",
    why: [
      "No authority is cited.",
      "The move targets the objectors' credibility rather than the objection's logic.",
      "No evidence is offered.",
      "The writer is plainly invested in reading, if not in defending a particular genre.",
    ],
    skill: "Rhetorical strategy",
    unit: 6,
  },
  {
    q: "The librarian's report that “the poor novel is usually the first book taken and rarely the last” serves to",
    options: [
      "prove that novels are more valuable than serious books",
      "suggest that reading habits develop, which answers the fear of trivial reading",
      "show that the library's collection is inadequate",
      "criticise the librarian's judgement",
    ],
    correct: 1,
    explanation:
      "The sentence reframes the objection: if the first book is not the last, then reading a novel is a beginning rather than an end. The writer lets an observation do the work an argument would otherwise have to.",
    why: [
      "The claim is developmental, not comparative in value.",
      "The trajectory from first book to later books is the point.",
      "Collection adequacy is not at issue.",
      "The librarian's judgement is cited with approval (“with some pride”).",
    ],
    skill: "Inference",
    unit: 3,
  },
  {
    q: "How does the writer handle the objection that the library may displace schooling?",
    options: [
      "By denying that the danger exists",
      "By conceding the danger and arguing it can be guarded against by funding both",
      "By arguing that schools are less important than libraries",
      "By dismissing the objector as uninformed",
    ],
    correct: 1,
    explanation:
      "The writer calls it the objection he respects most and admits he has no complete answer, then limits the conclusion: the risk of doing something badly is not an argument against doing it, and the risk is manageable.",
    why: [
      "The writer says “I will not pretend that this has never happened.”",
      "Concession plus a condition for managing the risk is the paragraph's structure.",
      "Schools are described as needing funding, not as less important.",
      "Respect for this objection is stated explicitly.",
    ],
    skill: "Argumentation",
    unit: 7,
  },
  {
    q: "The letter's final recommendation reframes the appropriation as",
    options: [
      "an act of generosity by the wealthy",
      "ordinary municipal housekeeping",
      "a temporary experiment",
      "a matter for private philanthropy",
    ],
    correct: 1,
    explanation:
      "The closing deliberately strips the request of noblesse oblige: it is maintenance, like lamps and streets. That reframing answers the objection that the library is a charity by returning to the letter's central distinction.",
    why: [
      "The letter explicitly rejects the language of generosity.",
      "Housekeeping is the phrase used, and it ties back to the streets and lamps.",
      "The provision is argued to be permanent.",
      "Private philanthropy is never proposed.",
    ],
    skill: "Structure",
    unit: 2,
  },
  {
    q: "The writer's tone toward the committee can best be described as",
    options: [
      "deferential to the point of timidity",
      "courteous and measured, with flashes of dry wit",
      "openly contemptuous",
      "anxious and uncertain",
    ],
    correct: 1,
    explanation:
      "The formal address, the concession of the strongest objection, and the closing formula of respect sit alongside ironic touches such as the gentlemen who condemn novels. The register is controlled politeness used to carry a firm argument.",
    why: [
      "The writer makes a direct recommendation and does not retreat.",
      "Courtesy plus irony is the passage's consistent manner.",
      "Contempt appears only in isolated irony, never openly.",
      "The confidence of the argument contradicts anxiety.",
    ],
    skill: "Tone",
    unit: 8,
  },
  {
    q: "Which sentence best captures the letter's overall line of reasoning?",
    options: [
      "Libraries are pleasant, and pleasant things deserve public support.",
      "The library is a permanent public provision like streets and lamps; its abuses can be managed; therefore it should be funded.",
      "Because other towns have libraries, this one should as well.",
      "Novels are harmless, and the objections to them are hypocritical.",
    ],
    correct: 1,
    explanation:
      "The letter argues from the nature of the provision, answers each objection in turn including the one it respects most, and closes on that basis. The novel discussion is one objection among several, not the thesis.",
    why: [
      "Pleasantness is never the argument, and the writer rejects the frame of generosity.",
      "Provision, objections answered, conclusion — the letter's three movements.",
      "No comparison with other towns is made.",
      "The novel passage is a single paragraph and is explicitly not a defence.",
    ],
    skill: "Main claim",
    unit: 1,
  },
]);

export const apLangPassageSets: Stimulus[] = [
  apLangBoardAddress,
  apLangClinicMemoir,
  apLangPhoneOpEd,
  apLangTreeEssay,
  apLangLibraryLetter,
];

export const apLangPassageQuestions: ExamQuestion[] = [
  ...set1,
  ...set2,
  ...set3,
  ...set4,
  ...set5,
];
