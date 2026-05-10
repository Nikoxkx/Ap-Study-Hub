# AP Study Hub

**Created by Yeisbel Pena**

A comprehensive AP exam preparation website covering APUSH, AP Lang, and AP Seminar with study guides, flashcards, practice questions, scored essays, and full mock exams.

## Features

- 📖 **Study Guides** — Comprehensive unit-by-unit notes
- 🎬 **Video Lessons** — Embedded YouTube tutorials
- 🃏 **Flashcards** — Interactive flip cards
- ✅ **Practice Questions** — AP-style MCQs with explanations
- 📝 **Scored Essays** — High-scoring examples with rubric analysis
- 📋 **Mock Exams** — Full timed exams with MCQ and FRQ sections
- 🌙 **Dark Mode** — Light/Dark/System theme toggle
- 🔐 **User Accounts** — Progress tracking and adaptive recommendations

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** PostgreSQL with Drizzle ORM
- **Styling:** Tailwind CSS
- **Authentication:** JWT with bcrypt

## Deployment to Vercel

### Step 1: Create a PostgreSQL Database

Use one of these free options:
- [Neon](https://neon.tech) (Recommended - free tier)
- [Supabase](https://supabase.com)
- [Vercel Postgres](https://vercel.com/storage/postgres)

Copy your database connection string (looks like `postgresql://user:password@host/database`)

### Step 2: Deploy to Vercel

1. Push this code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" and import your repository
4. Add these environment variables:
   - `DATABASE_URL` = your PostgreSQL connection string
   - `JWT_SECRET` = any random string (e.g., `my-super-secret-key-2024`)
5. Click "Deploy"

### Step 3: Initialize Database

After deployment, run the database setup:
```bash
npx drizzle-kit push
npm run db:seed
```

Or use Vercel's CLI:
```bash
vercel env pull
npx drizzle-kit push
```

## Local Development

```bash
npm install
npm run dev
```

## License

MIT — Free to use for educational purposes.
