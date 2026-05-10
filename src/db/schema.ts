import {
  pgTable, serial, text, integer, boolean, timestamp, varchar, jsonb, real,
} from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 50 }).notNull().unique(),
  name: varchar("name", { length: 200 }).notNull(),
  shortName: varchar("short_name", { length: 50 }).notNull(),
  description: text("description").notNull(),
  color: varchar("color", { length: 20 }).notNull(),
  icon: varchar("icon", { length: 10 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const units = pgTable("units", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").references(() => courses.id).notNull(),
  unitNumber: integer("unit_number").notNull(),
  title: varchar("title", { length: 300 }).notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  keyTerms: jsonb("key_terms").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const flashcards = pgTable("flashcards", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").references(() => courses.id).notNull(),
  unitId: integer("unit_id").references(() => units.id),
  front: text("front").notNull(),
  back: text("back").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const quizQuestions = pgTable("quiz_questions", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").references(() => courses.id).notNull(),
  unitId: integer("unit_id").references(() => units.id),
  question: text("question").notNull(),
  stimulus: text("stimulus"),
  options: jsonb("options").$type<string[]>().notNull(),
  correctIndex: integer("correct_index").notNull(),
  explanation: text("explanation").notNull(),
  skill: varchar("skill", { length: 200 }),
  difficulty: varchar("difficulty", { length: 20 }).default("medium"),
  source: varchar("source", { length: 300 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const studyTips = pgTable("study_tips", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").references(() => courses.id).notNull(),
  title: varchar("title", { length: 300 }).notNull(),
  content: text("content").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const essayExamples = pgTable("essay_examples", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").references(() => courses.id).notNull(),
  essayType: varchar("essay_type", { length: 100 }).notNull(),
  prompt: text("prompt").notNull(),
  essayText: text("essay_text").notNull(),
  score: integer("score").notNull(),
  maxScore: integer("max_score").notNull(),
  rubric: jsonb("rubric").$type<{ category: string; points: number; maxPoints: number; explanation: string }[]>().notNull(),
  analysis: jsonb("analysis").$type<{ section: string; commentary: string; highlighted: string }[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const mockExams = pgTable("mock_exams", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").references(() => courses.id).notNull(),
  title: varchar("title", { length: 300 }).notNull(),
  description: text("description").notNull(),
  sections: jsonb("sections").$type<{
    name: string; timeMinutes: number; type: "mcq" | "frq";
    instructions: string;
    questionIds?: number[];
    frqPrompts?: { id: string; prompt: string; type: string; points: number; rubric: string[] }[];
  }[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 200 }).notNull(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  courseId: integer("course_id").references(() => courses.id).notNull(),
  questionId: integer("question_id").references(() => quizQuestions.id).notNull(),
  correct: boolean("correct").notNull(),
  answeredAt: timestamp("answered_at").defaultNow().notNull(),
});

export const userMockResults = pgTable("user_mock_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  mockExamId: integer("mock_exam_id").references(() => mockExams.id).notNull(),
  mcqScore: integer("mcq_score"),
  mcqTotal: integer("mcq_total"),
  frqResponses: jsonb("frq_responses").$type<{ promptId: string; response: string; score: number; maxScore: number; feedback: string }[]>(),
  totalScore: real("total_score"),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

export const userSkillScores = pgTable("user_skill_scores", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  courseId: integer("course_id").references(() => courses.id).notNull(),
  skill: varchar("skill", { length: 200 }).notNull(),
  correct: integer("correct").notNull().default(0),
  total: integer("total").notNull().default(0),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});
