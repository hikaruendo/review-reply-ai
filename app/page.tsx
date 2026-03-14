import Link from "next/link";

import { PricingSection } from "@/components/pricing-section";
import { ReviewGenerator } from "@/components/review-generator";
import { SiteHeader } from "@/components/site-header";
import { GUEST_GENERATION_LIMIT, HERO_HEADLINE } from "@/lib/constants";

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getCurrentUser } from "@/lib/supabase/server";

export default async function HomePage() {
  const user = await getCurrentUser();
  const authConfigured = isSupabaseConfigured();

  return (
    <main className="pb-16">
      <SiteHeader authConfigured={authConfigured} userEmail={user?.email} />

      <section className="section-shell pt-8 sm:pt-12">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 shadow-soft">
              Dental clinics first
            </div>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-balance text-5xl font-semibold leading-[1.02] text-ink sm:text-6xl">
                {HERO_HEADLINE}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Give your front desk or practice manager an instant starting point
                for thoughtful, on-brand review responses. Start with dental
                clinics now, then expand into every local service category.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#generator"
                className="inline-flex h-14 items-center justify-center rounded-full bg-coral px-7 text-sm font-semibold text-white transition hover:bg-[#dd5b41]"
              >
                Try Free — No signup required
              </Link>
              <Link
                href="/#pricing"
                className="inline-flex h-14 items-center justify-center rounded-full border border-slate-300 bg-white/85 px-7 text-sm font-semibold text-slate-800 transition hover:border-slate-400"
              >
                See pricing
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="card-surface p-4">
                <p className="text-3xl font-semibold text-ink">3</p>
                <p className="mt-1 text-sm text-slate-600">
                  distinct replies per generation
                </p>
              </div>
              <div className="card-surface p-4">
                <p className="text-3xl font-semibold text-ink">{GUEST_GENERATION_LIMIT}/mo</p>
                <p className="mt-1 text-sm text-slate-600">
                  free guest generations in localStorage
                </p>
              </div>
              <div className="card-surface p-4">
                <p className="text-3xl font-semibold text-ink">$19</p>
                <p className="mt-1 text-sm text-slate-600">
                  planned Pro monthly tier
                </p>
              </div>
            </div>
          </div>

          <div className="card-surface relative overflow-hidden p-6 shadow-soft sm:p-8">
            <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <div className="rounded-[2rem] bg-ink p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
                Sample workflow
              </p>
              <div className="mt-4 space-y-4">
                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="text-sm font-semibold text-peach">
                    Incoming review
                  </p>
                  <p className="mt-2 text-sm leading-7 text-white/80">
                    &quot;The hygienist was so kind and the office felt calm. Dr.
                    Patel explained everything clearly. Best dental visit I have
                    had in years.&quot;
                  </p>
                </div>
                <div className="rounded-3xl bg-white p-4 text-slate-800">
                  <p className="text-sm font-semibold text-slate-500">
                    AI drafts three options
                  </p>
                  <p className="mt-2 text-sm leading-7">
                    Warm thank-you, premium brand voice, or a friendlier reply
                    for Google Reviews. Copy the one that fits your clinic.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white/80 p-5">
                <p className="text-sm font-semibold text-ink">Fast team handoff</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Anyone on the team can paste a review and leave with a usable
                  reply in one step.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white/80 p-5">
                <p className="text-sm font-semibold text-ink">Future-ready data</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Auth, persistence, and plan fields are scaffolded so the MVP
                  can grow without a rewrite.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="generator" className="section-shell pt-16">
        <ReviewGenerator isSignedIn={Boolean(user)} />
      </section>

      <section className="section-shell pt-16">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="card-surface p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
              01
            </p>
            <h2 className="mt-3 text-xl font-semibold text-ink">
              Tailored input for each review
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Review text, industry, star rating, and tone guide every generation.
            </p>
          </div>
          <div className="card-surface p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
              02
            </p>
            <h2 className="mt-3 text-xl font-semibold text-ink">
              Claude-generated reply variants
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Three response patterns come back from an Anthropic-powered route
              so teams can pick the strongest one fast.
            </p>
          </div>
          <div className="card-surface p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
              03
            </p>
            <h2 className="mt-3 text-xl font-semibold text-ink">
              Guest mode that still nudges signup
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Local monthly usage tracking keeps the Phase 0 MVP frictionless
              while setting up the next conversion step.
            </p>
          </div>
        </div>
      </section>

      <section id="pricing" className="section-shell pt-16">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
              Pricing
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-ink">
              Start free, then upgrade when the workflow sticks
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-600">
            Start with 5 free generations per month. Upgrade to Pro for
            unlimited replies and saved history.
          </p>
        </div>

        <PricingSection />
      </section>
    </main>
  );
}
