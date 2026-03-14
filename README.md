# AI Review Reply Generator

Phase 0 MVP for generating customer review replies with Next.js App Router, TypeScript, Tailwind CSS, Anthropic Claude, and Supabase-ready persistence.

## What is included

- Landing page focused on dental clinics with a live generator embedded in the hero flow
- Review input form with review text, industry, star rating, and tone
- `POST /api/generate` route that calls Anthropic Claude and returns 3 reply variants
- Guest mode with a 5-per-month browser limit tracked in `localStorage`
- Supabase auth scaffolding for email/password and Google OAuth
- Supabase migration SQL for `users` and `generations`
- Metadata, sitemap, robots, Open Graph image, and responsive Tailwind UI
- Lightweight Stripe placeholder config for future Pro billing

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Anthropic SDK
- Supabase SSR + Supabase JS

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the example env file:

   ```bash
   cp .env.example .env.local
   ```

3. Fill in the required environment variables:

   - Required for generation:
     - `ANTHROPIC_API_KEY`
   - Optional but needed for auth and signed-in persistence:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Optional for consistent redirects/metadata:
     - `NEXT_PUBLIC_APP_URL`
   - Future billing placeholders:
     - `STRIPE_SECRET_KEY`
     - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
     - `STRIPE_WEBHOOK_SECRET`

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Build for production:

   ```bash
   npm run build
   ```

## Supabase setup

If you use the Supabase CLI, apply the migration normally. If tooling is unavailable, run the SQL file manually in the Supabase SQL editor:

- `supabase/migrations/20260313160000_init.sql`

The schema includes:

- `public.users`
- `public.generations`
- row level security policies for owner-only access
- auth trigger syncing `auth.users` into `public.users`
- `public.monthly_generation_usage` view for future signed-in quota checks

### Monthly usage note

- Guest usage resets by month inside `localStorage` using a `YYYY-MM` key.
- Signed-in usage should use `created_at` window queries for the current month rather than a mutable counter reset job.

## Auth scaffolding

- `/auth` includes:
  - email/password sign-in
  - email/password sign-up
  - Google OAuth start flow
- `/auth/callback` exchanges the Supabase auth code for a session
- `middleware.ts` refreshes sessions for App Router requests

To fully enable Google OAuth:

1. Turn on Google in Supabase Auth providers.
2. Add your local and production callback URLs in Supabase.

## Billing note

Pricing is surfaced in the UI as:

- Free: `5/mo`
- Pro: `$19/mo`

Stripe is intentionally left as a light placeholder in Phase 0 so it does not block the core guest-generation flow.

## Deploy

Vercel is the simplest deployment target for this setup:

1. Import the repository into Vercel.
2. Add the same environment variables from `.env.local`.
3. Point `NEXT_PUBLIC_APP_URL` to the deployed URL.
4. Run the Supabase migration against your production project.

## Validation checklist

- `npm install`
- `npm run build`

If `ANTHROPIC_API_KEY` is missing, the app still builds, but generation requests return a configuration error until the key is added.
