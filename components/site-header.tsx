import Link from "next/link";

import { ManageSubscriptionLink } from "@/components/manage-subscription-link";
import { signOutAction } from "@/app/auth/actions";
import { type Locale, getDictionary } from "@/lib/i18n/dictionaries";

type SiteHeaderProps = {
  authConfigured: boolean;
  userEmail?: string | null;
  userPlan?: "free" | "pro" | null;
  userId?: string | null;
  lang: Locale;
};

export function SiteHeader({ authConfigured, userEmail, userPlan, userId, lang }: SiteHeaderProps) {
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

          {userEmail ? (
            <div className="flex items-center gap-3">
              <span className="hidden items-center gap-2 text-sm text-slate-500 md:inline-flex">
                {userEmail}
                {userPlan === "pro" && (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
                    {dict.header.proBadge}
                  </span>
                )}
              </span>
              {userPlan === "pro" && userId && (
                <ManageSubscriptionLink userId={userId} label={dict.header.manageSubscription} />
              )}
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white"
                >
                  {dict.header.signOut}
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/auth"
              className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-slate-900"
            >
              {authConfigured ? dict.header.signIn : dict.header.authSetup}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
