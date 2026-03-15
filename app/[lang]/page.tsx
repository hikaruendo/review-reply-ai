import Link from "next/link";

import { PricingSection } from "@/components/pricing-section";
import { ReviewGenerator } from "@/components/review-generator";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { GUEST_GENERATION_LIMIT } from "@/lib/constants";
import { getDictionary, type Locale } from "@/lib/i18n/dictionaries";

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getCurrentUser } from "@/lib/supabase/server";

type Props = {
  params: { lang: string };
};

export default async function HomePage({ params }: Props) {
  const lang = params.lang as Locale;
  const dict = getDictionary(lang);
  const user = await getCurrentUser();
  const authConfigured = isSupabaseConfigured();

  return (
    <main className="pb-16">
      <SiteHeader authConfigured={authConfigured} userEmail={user?.email} lang={lang} />

      <section className="section-shell pt-8 sm:pt-12">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 shadow-soft">
              {dict.hero.badge}
            </div>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-balance text-5xl font-semibold leading-[1.02] text-ink sm:text-6xl">
                {dict.hero.headline}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                {dict.hero.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/${lang}#generator`}
                className="inline-flex h-14 items-center justify-center rounded-full bg-coral px-7 text-sm font-semibold text-white transition hover:bg-[#dd5b41]"
              >
                {dict.hero.ctaPrimary}
              </Link>
              <Link
                href={`/${lang}#pricing`}
                className="inline-flex h-14 items-center justify-center rounded-full border border-slate-300 bg-white/85 px-7 text-sm font-semibold text-slate-800 transition hover:border-slate-400"
              >
                {dict.hero.ctaSecondary}
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="card-surface p-4">
                <p className="text-3xl font-semibold text-ink">3</p>
                <p className="mt-1 text-sm text-slate-600">
                  {dict.stats.repliesCount}
                </p>
              </div>
              <div className="card-surface p-4">
                <p className="text-3xl font-semibold text-ink">{GUEST_GENERATION_LIMIT}/mo</p>
                <p className="mt-1 text-sm text-slate-600">
                  {dict.stats.freeGenerations}
                </p>
              </div>
              <div className="card-surface p-4">
                <p className="text-3xl font-semibold text-ink">$19</p>
                <p className="mt-1 text-sm text-slate-600">
                  {dict.stats.priceLabel}
                </p>
              </div>
            </div>
          </div>

          <div className="card-surface relative overflow-hidden p-6 shadow-soft sm:p-8">
            <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <div className="rounded-[2rem] bg-ink p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
                {dict.features.sampleWorkflow}
              </p>
              <div className="mt-4 space-y-4">
                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="text-sm font-semibold text-peach">
                    {dict.features.incomingReview}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-white/80">
                    {lang === "ja"
                      ? "「歯科衛生士さんがとても丁寧で、先生の説明も分かりやすかったです。長年の歯医者嫌いが克服できそうです。」"
                      : '"The hygienist was so kind and the office felt calm. Dr. Patel explained everything clearly. Best dental visit I have had in years."'}
                  </p>
                </div>
                <div className="rounded-3xl bg-white p-4 text-slate-800">
                  <p className="text-sm font-semibold text-slate-500">
                    {dict.features.aiDrafts}
                  </p>
                  <p className="mt-2 text-sm leading-7">
                    {dict.features.aiDraftsDescription}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white/80 p-5">
                <p className="text-sm font-semibold text-ink">{dict.features.fastTeamHandoff}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {dict.features.fastTeamHandoffDescription}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white/80 p-5">
                <p className="text-sm font-semibold text-ink">{dict.features.futureReady}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {dict.features.futureReadyDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="generator" className="section-shell pt-16">
        <ReviewGenerator isSignedIn={Boolean(user)} lang={lang} />
      </section>

      <section className="section-shell pt-16">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="card-surface p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
              {dict.howItWorks.sectionLabel}
            </p>
            <h2 className="mt-3 text-xl font-semibold text-ink">
              {dict.howItWorks.step1Title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {dict.howItWorks.step1Description}
            </p>
          </div>
          <div className="card-surface p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
              02
            </p>
            <h2 className="mt-3 text-xl font-semibold text-ink">
              {dict.howItWorks.step2Title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {dict.howItWorks.step2Description}
            </p>
          </div>
          <div className="card-surface p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
              03
            </p>
            <h2 className="mt-3 text-xl font-semibold text-ink">
              {dict.howItWorks.step3Title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {dict.howItWorks.step3Description}
            </p>
          </div>
        </div>
      </section>

      <section id="pricing" className="section-shell pt-16">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
              {dict.pricing.sectionLabel}
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-ink">
              {dict.pricing.title}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-600">
            {dict.pricing.description}
          </p>
        </div>

        <PricingSection lang={lang} />
      </section>

      <Footer lang={lang} />
    </main>
  );
}
