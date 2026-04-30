# Ruya - Dream Interpretation Web App

## Overview
Ruya is a minimal MVP web application that allows users to submit their dreams and receive two structured insights:
1. **Islamic dream interpretation** (based on traditional scholars)
2. **Scientific / psychological explanation**

The application is built with a focus on a clean, modern UI, using Next.js (App Router), TypeScript, and Tailwind CSS. It is designed to be lightweight, requiring no user authentication (using `device_id` for rate limiting) and relies on an AI provider for real-time analysis.

---

## What Has Been Completed So Far

### Step 1: Project & Database Setup
- Initialized a Next.js App Router project with TypeScript and Tailwind CSS.
- Set up a clean `src/` directory structure (`app`, `components`, `lib`).
- Configured database connectivity using `mysql2` in `src/lib/db.ts`.
- Created necessary database schemas for `dream_requests`, `dream_results`, and `request_limits` (documented in `schema.sql`).
- Implemented rate limiting logic (`src/lib/rateLimit.ts`) using the database.
- Created the foundational API route at `POST /api/dreams` to handle incoming dream submissions.

### Step 2: Landing Page UI
- Created a modern, premium landing page (`src/app/page.tsx`).
- Implemented a warm, minimal design system using CSS variables and Tailwind v4.
- Built reusable components: `Navbar` and `Footer`.
- Designed sections: Hero (with gradient text), Explanation Cards (Islamic & Scientific), "How It Works" steps, and a Disclaimer.

### Step 3: Dream Input Page
- Built the `/analyze` route (`src/app/analyze/page.tsx`) using a React Client Component.
- Implemented a clean textarea form with a 1000-character limit and character counter.
- Added automatic `device_id` generation using UUID v4, stored in `localStorage` for anonymous session tracking.
- Created UI states for loading, error handling, and displaying the dual-lens insights side-by-side.

### Step 4: AI Integration
- Created the AI processing utility (`src/lib/ai.ts`) using standard `fetch` to call the OpenAI API.
- Designed a strict system prompt to ensure the AI returns dual analysis in a strict JSON format, avoiding definitive claims or fake religious rulings.
- Updated the `POST /api/dreams` route to sanitize inputs, call the AI function, and store the structured response directly into the MySQL database.
- Included a fallback mock response if the `OPENAI_API_KEY` is missing to ensure local development doesn't break.

---

## Configuration Needed to Run the App

To get the application fully working locally, you need to configure your environment variables and set up the database.

### 1. Database Setup
Ensure you have a MySQL server running locally or remotely (e.g., PlanetScale).
Run the queries found in `schema.sql` to create the required tables:
- `dream_requests`
- `dream_results`
- `request_limits`

### 2. Environment Variables (`.env`)
Create a `.env` file in the root directory (`d:\node-web-projects\Ruya-dream\.env`) and populate it with your database credentials and OpenAI API key.

```env
# Database Configuration
DB_HOST="localhost"
DB_USER="root"
DB_PASSWORD="your_db_password"
DB_NAME="ruya"

# AI Configuration
OPENAI_API_KEY="sk-your-openai-api-key"
```

### 3. Running the App
1. Install dependencies: `npm install`
2. Run the development server: `npm run dev`
3. Access the app at: `http://localhost:3000`

### Important Notes
- **Rate Limiting:** The app currently restricts users to 2 requests per day based on their browser's `localStorage` device ID and a database record.
- **AI Fallback:** If you start the app without setting `OPENAI_API_KEY`, the application will use a hardcoded mock response so you can still test the UI flow without incurring API costs.
