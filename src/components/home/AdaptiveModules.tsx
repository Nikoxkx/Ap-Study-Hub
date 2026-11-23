"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePrefs } from "@/lib/use-prefs";
import { track, useAdaptiveProfile } from "@/lib/use-adaptive";
import { chooseQuiz, chooseSpotlight, nextStepFor } from "@/lib/adaptive";
import { GlassCard } from "@/components/ui/GlassCard";
import { PrefText } from "./PrefText";
import type { SettingsSubject, SettingsTotals } from "@/components/settings/types";

export interface QuizPoolItem {
  id: string;
  subject: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  unitNumber: number;
}

/**
 * The adaptive strip under the hero: "for you", the daily question, and the
 * week's spotlight.
 *
 * Every module is individually switchable, and the whole strip disappears with
 * the adaptive layer. Nothing here fetches, and nothing is randomised per
 * render: the question and the spotlight are chosen from (day, profile), so
 * refreshing the page does not reshuffle the page under your cursor.
 */
export function AdaptiveModules({
  subjects,
  totals,
  quizPool,
}: {
  subjects: SettingsSubject[];
  totals: SettingsTotals;
  quizPool: QuizPoolItem[];
}) {
  const { prefs, hydrated } = usePrefs();
  const { profile } = useAdaptiveProfile();
  const { adaptive } = prefs;

  // The answer is stored with the day it belongs to, so "answered" resets by
  // derivation at midnight instead of by an effect clearing state.
  const [answer, setAnswer] = useState<{ dayKey: string; index: number } | null>(null);

  const familiarOf = useMemo(() => {
    const map = new Map(subjects.map((subject) => [subject.slug, subject.familiar]));
    return (slug: string) => map.get(slug) ?? slug;
  }, [subjects]);

  const answered = answer && answer.dayKey === profile.dayKey ? answer.index : null;

  // Both dates come from the profile, so this is a pure subtraction: the
  // profile has already decided what "today" is for this browser. Only shown
  // after hydration, so the server never guesses the visitor's clock.
  const daysToExam = useMemo(() => {
    if (!adaptive.examGoal || !profile.dayKey) return null;
    const target = Date.parse(`${adaptive.examGoal}T00:00:00Z`);
    const today = Date.parse(`${profile.dayKey}T00:00:00Z`);
    if (Number.isNaN(target) || Number.isNaN(today)) return null;
    return Math.round((target - today) / 86_400_000);
  }, [adaptive.examGoal, profile.dayKey]);

  const quiz = useMemo(
    () => (adaptive.popQuiz ? chooseQuiz(profile, quizPool) : null),
    [adaptive.popQuiz, profile, quizPool],
  );
  const spotlight = useMemo(() => chooseSpotlight(profile, { prefs }), [profile, prefs]);
  const nextStep = useMemo(
    () => nextStepFor(profile, { familiarOf, dailyGoalCards: adaptive.dailyGoalCards }),
    [profile, familiarOf, adaptive.dailyGoalCards],
  );

  if (!adaptive.enabled) return null;

  const showForYou = adaptive.forYou && adaptive.intensity !== "subtle";
  const showQuiz = Boolean(quiz) && adaptive.intensity !== "subtle";
  const showSpotlight = Boolean(spotlight) && adaptive.intensity === "eager";
  const showCountdown = hydrated && daysToExam !== null;
  const showAnything = showForYou || showQuiz || showSpotlight || showCountdown;

  if (!showAnything) return null;

  const answering = answered !== null;

  return (
    <section className="wrap pb-4" data-home-module="adaptive" aria-labelledby="adaptive-heading">
      <div className="adaptive-head">
        <h2 id="adaptive-heading" className="label">
          <PrefText prefKey="adaptive" fallback="For you, today" />
        </h2>
        {prefs.privacy.showProfileBadge && profile.events > 0 ? (
          <p className="adaptive-badge">
            Personalised from {profile.events} local actions ·{" "}
            <Link href="/settings?tab=adaptive">see the profile</Link>
          </p>
        ) : null}
      </div>

      <div className={`adaptive-grid${showSpotlight ? " has-spotlight" : ""}`}>
        {showForYou ? (
          <GlassCard as="article" padding="md" className="adaptive-card">
            <p className="label mb-1.5">{familiarOf(profile.topSubject ?? "") ?? "Your desk"}</p>
            <h3 className="adaptive-card-title">
              {adaptive.displayName ? `${adaptive.displayName}, ` : ""}
              {profile.streak >= 2
                ? `${profile.streak} days running`
                : profile.events === 0
                  ? "Start here"
                  : "Pick up where you left off"}
            </h3>
            <p className="adaptive-card-body">{nextStep.why}</p>
            <div className="adaptive-card-foot">
              <Link className="btn" href={nextStep.href}>
                {nextStep.label}
              </Link>
              <span className="adaptive-meta">
                {profile.signals} signals · {totals.flashcards} cards in the library
              </span>
            </div>
          </GlassCard>
        ) : null}

        {showQuiz && quiz ? (
          <GlassCard as="article" padding="md" className="adaptive-card">
            <p className="label mb-1.5">
              Today&apos;s question · {familiarOf(quiz.subject)} · Unit {quiz.unitNumber}
            </p>
            <h3 className="adaptive-card-title adaptive-quiz-question">{quiz.question}</h3>
            <ul className="adaptive-quiz-options">
              {quiz.options.map((option, index) => {
                const isCorrect = index === quiz.correctIndex;
                const state = !answering
                  ? ""
                  : isCorrect
                    ? " is-correct"
                    : index === answered
                      ? " is-wrong"
                      : " is-muted";
                return (
                  <li key={option}>
                    <button
                      type="button"
                      className={`adaptive-quiz-option${state}`}
                      disabled={answering}
                      onClick={() => {
                        setAnswer({ dayKey: profile.dayKey, index });
                        track.quiz(quiz.subject, quiz.id);
                      }}
                    >
                      <span aria-hidden="true">{String.fromCharCode(65 + index)}</span>
                      {option}
                    </button>
                  </li>
                );
              })}
            </ul>
            {answering ? (
              <div className="adaptive-quiz-explain">
                <p>
                  <strong>{answered === quiz.correctIndex ? "Correct." : "Not quite."}</strong>{" "}
                  {quiz.explanation}
                </p>
                <Link href={`/course/${quiz.subject}/notes#unit-${quiz.unitNumber}`}>
                  Read the exact paragraph →
                </Link>
              </div>
            ) : (
              <p className="adaptive-meta">One question a day. No score is kept.</p>
            )}
          </GlassCard>
        ) : null}

        {showSpotlight && spotlight ? (
          <GlassCard as="article" padding="md" className="adaptive-card adaptive-card-spotlight">
            <p className="label mb-1.5">
              This week · closes in {spotlight.daysLeft} {spotlight.daysLeft === 1 ? "day" : "days"}
            </p>
            <h3 className="adaptive-card-title">{spotlight.title}</h3>
            <p className="adaptive-card-body">{spotlight.body}</p>
            <div className="adaptive-card-foot">
              <Link className="btn" href={spotlight.href}>
                {spotlight.cta}
              </Link>
            </div>
          </GlassCard>
        ) : null}

        {showCountdown && daysToExam !== null ? (
          <div className="adaptive-countdown">
            <span className="adaptive-countdown-number">{Math.max(0, daysToExam)}</span>
            <span>
              days until your target exam
              {daysToExam < 0 ? " — that date has passed" : ""}
            </span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
