import Link from "next/link";
import { type Locale, getDictionary } from "@/lib/i18n/dictionaries";
import { getAllIndustries } from "@/lib/i18n/industries";
import { getAllScenarios } from "@/lib/i18n/scenarios";

type FooterProps = {
  lang: Locale;
};

export function Footer({ lang }: FooterProps) {
  const dict = getDictionary(lang);
  const industries = getAllIndustries();
  const scenarios = getAllScenarios();

  return (
    <footer className="section-shell mt-24 border-t border-slate-200 pt-12 pb-8">
      <div className="grid gap-8 md:grid-cols-4">
        {/* Company Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-sm font-semibold text-peach">
              AI
            </span>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Review Reply
              </div>
            </div>
          </div>
          <p className="text-xs leading-6 text-slate-500">
            {dict.footer.copyright}
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-sm font-semibold text-ink mb-3">
            {lang === "ja" ? "リンク" : "Links"}
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href={`/${lang}`}
                className="text-sm text-slate-600 hover:text-ink transition"
              >
                {lang === "ja" ? "ホーム" : "Home"}
              </Link>
            </li>
            <li>
              <Link
                href={`/${lang}#pricing`}
                className="text-sm text-slate-600 hover:text-ink transition"
              >
                {dict.header.pricingLink}
              </Link>
            </li>
            <li>
              <Link
                href={`/${lang}/privacy`}
                className="text-sm text-slate-600 hover:text-ink transition"
              >
                {dict.footer.privacy}
              </Link>
            </li>
            <li>
              <Link
                href={`/${lang}/terms`}
                className="text-sm text-slate-600 hover:text-ink transition"
              >
                {dict.footer.terms}
              </Link>
            </li>
            <li>
              <Link
                href={`/${lang}/contact`}
                className="text-sm text-slate-600 hover:text-ink transition"
              >
                {dict.footer.contact}
              </Link>
            </li>
          </ul>
        </div>

        {/* Industry Links - Sample */}
        <div>
          <h3 className="text-sm font-semibold text-ink mb-3">
            {dict.footer.industriesTitle}
          </h3>
          <ul className="space-y-2">
            {industries.slice(0, 5).map((industry) => (
              <li key={industry.slug}>
                <Link
                  href={`/${lang}/reviews/${industry.slug}/positive-review`}
                  className="text-sm text-slate-600 hover:text-ink transition"
                >
                  {industry.name[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* More Industries */}
        <div>
          <h3 className="text-sm font-semibold text-ink mb-3">
            {lang === "ja" ? "その他の業種" : "More Industries"}
          </h3>
          <ul className="space-y-2">
            {industries.slice(5).map((industry) => (
              <li key={industry.slug}>
                <Link
                  href={`/${lang}/reviews/${industry.slug}/positive-review`}
                  className="text-sm text-slate-600 hover:text-ink transition"
                >
                  {industry.name[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Language Switcher */}
      <div className="mt-8 pt-8 border-t border-slate-200 flex items-center justify-between">
        <p className="text-xs text-slate-500">
          © 2026 kando1{lang === "ja" ? "合同会社" : " LLC"}. All rights reserved.
        </p>
        <div className="flex gap-3">
          <Link
            href="/ja"
            className={`text-sm font-medium transition ${
              lang === "ja"
                ? "text-ink"
                : "text-slate-500 hover:text-ink"
            }`}
          >
            日本語
          </Link>
          <span className="text-slate-300">|</span>
          <Link
            href="/en"
            className={`text-sm font-medium transition ${
              lang === "en"
                ? "text-ink"
                : "text-slate-500 hover:text-ink"
            }`}
          >
            English
          </Link>
        </div>
      </div>
    </footer>
  );
}
