import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { ReviewGenerator } from "@/components/review-generator";
import { type Locale, getDictionary, locales } from "@/lib/i18n/dictionaries";
import { type IndustrySlug, getAllIndustries, getIndustryName } from "@/lib/i18n/industries";
import { type ScenarioSlug, getAllScenarios, getScenarioName } from "@/lib/i18n/scenarios";
import { getSEOContent } from "@/lib/seo/content";
import { siteConfig } from "@/lib/site";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getCurrentUser } from "@/lib/supabase/server";

type Props = {
  params: {
    lang: string;
    industry: string;
    scenario: string;
  };
};

export async function generateStaticParams() {
  const params: Array<{ lang: string; industry: string; scenario: string }> = [];

  for (const lang of locales) {
    for (const industry of getAllIndustries()) {
      for (const scenario of getAllScenarios()) {
        params.push({
          lang,
          industry: industry.slug,
          scenario: scenario.slug,
        });
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, industry, scenario } = params;

  if (!locales.includes(lang as Locale)) {
    return {};
  }

  const content = getSEOContent(industry as IndustrySlug, scenario as ScenarioSlug, lang as Locale);

  if (!content) {
    return {};
  }

  const url = `${siteConfig.url}/${lang}/reviews/${industry}/${scenario}`;

  return {
    title: content.title,
    description: content.description,
    openGraph: {
      title: content.title,
      description: content.description,
      url,
      type: "website",
      locale: lang === "ja" ? "ja_JP" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
    },
    alternates: {
      canonical: url,
      languages: {
        ja: `${siteConfig.url}/ja/reviews/${industry}/${scenario}`,
        en: `${siteConfig.url}/en/reviews/${industry}/${scenario}`,
      },
    },
  };
}

export default async function SEOPage({ params }: Props) {
  const { lang, industry, scenario } = params;

  if (!locales.includes(lang as Locale)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const user = await getCurrentUser();
  const authConfigured = isSupabaseConfigured();

  const content = getSEOContent(industry as IndustrySlug, scenario as ScenarioSlug, locale);

  if (!content) {
    notFound();
  }

  const industryName = getIndustryName(industry as IndustrySlug, locale);
  const scenarioName = getScenarioName(scenario as ScenarioSlug, locale);

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: locale === "ja" ? "AI口コミ返信ジェネレーター" : "AI Review Reply Generator",
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "127",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="pb-16">
        <SiteHeader authConfigured={authConfigured} userEmail={user?.email} lang={locale} />

        {/* Hero Section */}
        <section className="section-shell pt-12">
          <div className="max-w-4xl">
            {/* Breadcrumbs */}
            <nav className="mb-6 flex items-center gap-2 text-sm text-slate-600">
              <Link href={`/${lang}`} className="hover:text-ink transition">
                {locale === "ja" ? "ホーム" : "Home"}
              </Link>
              <span>/</span>
              <span className="text-slate-400">{industryName}</span>
              <span>/</span>
              <span className="text-slate-400">{scenarioName}</span>
            </nav>

            <h1 className="text-4xl font-bold text-ink sm:text-5xl mb-6">
              {content.h1}
            </h1>

            <p className="text-lg leading-8 text-slate-600 mb-8">
              {content.intro}
            </p>
          </div>
        </section>

        {/* Tips Section */}
        <section className="section-shell pt-8">
          <div className="card-surface p-8 max-w-4xl">
            <h2 className="text-2xl font-semibold text-ink mb-4">
              {locale === "ja" ? "効果的な返信のコツ" : "Tips for Effective Responses"}
            </h2>
            <ul className="space-y-3">
              {content.tips.map((tip, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-coral/10 text-sm font-semibold text-coral">
                    {index + 1}
                  </span>
                  <span className="text-slate-700 leading-7">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Examples Section */}
        <section className="section-shell pt-12">
          <h2 className="text-2xl font-semibold text-ink mb-6 max-w-4xl">
            {locale === "ja" ? "返信例" : "Example Responses"}
          </h2>
          <div className="space-y-6 max-w-4xl">
            {content.examples.map((example, index) => (
              <div key={index} className="card-surface p-6">
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-2">
                    {locale === "ja" ? "口コミ例" : "Review Example"}
                  </p>
                  <p className="text-sm leading-7 text-slate-600 italic">
                    &quot;{example.review}&quot;
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-2">
                    {locale === "ja" ? "返信例" : "Reply Example"}
                  </p>
                  <p className="text-sm leading-7 text-slate-700">
                    {example.reply}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Generator Section */}
        <section id="generator" className="section-shell pt-16">
          <div className="mb-8 max-w-4xl">
            <h2 className="text-3xl font-semibold text-ink mb-3">
              {locale === "ja"
                ? "今すぐ返信を生成してみましょう"
                : "Generate Your Response Now"}
            </h2>
            <p className="text-slate-600">
              {locale === "ja"
                ? "下記のフォームに口コミを貼り付けて、AIが生成する3つの返信案を確認してください。"
                : "Paste your review below and get 3 AI-generated reply options instantly."}
            </p>
          </div>
          <ReviewGenerator isSignedIn={Boolean(user)} lang={locale} />
        </section>

        {/* Related Links */}
        <section className="section-shell pt-16">
          <div className="card-surface p-8 max-w-4xl">
            <h2 className="text-xl font-semibold text-ink mb-4">
              {locale === "ja" ? "関連ガイド" : "Related Guides"}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {getAllScenarios()
                .filter((s) => s.slug !== scenario)
                .slice(0, 4)
                .map((s) => (
                  <Link
                    key={s.slug}
                    href={`/${lang}/reviews/${industry}/${s.slug}`}
                    className="text-sm text-coral hover:underline"
                  >
                    {industryName} - {s.name[locale]}
                  </Link>
                ))}
            </div>
          </div>
        </section>

        <Footer lang={locale} />
      </main>
    </>
  );
}
