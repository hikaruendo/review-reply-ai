import Link from "next/link";

import { AuthNav } from "@/components/auth-nav";
import { type Locale, getDictionary } from "@/lib/i18n/dictionaries";

type SiteHeaderStaticProps = {
  lang: Locale;
};

export function SiteHeaderStatic({ lang }: SiteHeaderStaticProps) {
  const dict = getDictionary(lang);

  return (
    <header className="section-shell pt-6">
      <div className="card-surface flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
        <Link href={`/${lang}`} className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-sm font-semibold text-peach">
            AI
          </span>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              Review Reply
            </div>
            <div className="text-base font-semibold text-ink">
              {lang === "ja" ? "地域ビジネス向けジェネレーター" : "Generator for local businesses"}
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-3">
          <Link
            href={`/${lang}#pricing`}
            className="hidden text-sm font-medium text-slate-600 transition hover:text-ink sm:inline-flex"
          >
            {dict.header.pricingLink}
          </Link>
          <AuthNav
            lang={lang}
            labels={{
              signIn: dict.header.signIn,
              signOut: dict.header.signOut,
              proBadge: dict.header.proBadge,
              manageSubscription: dict.header.manageSubscription,
            }}
          />
        </nav>
      </div>
    </header>
  );
}
