import Link from "next/link";

import { signOutAction } from "@/app/auth/actions";

type SiteHeaderProps = {
  authConfigured: boolean;
  userEmail?: string | null;
};

export function SiteHeader({ authConfigured, userEmail }: SiteHeaderProps) {
  return (
    <header className="section-shell pt-6">
      <div className="card-surface flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-sm font-semibold text-peach">
            AI
          </span>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              Review Reply
            </div>
            <div className="text-base font-semibold text-ink">
              Generator for local businesses
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-3">
          <Link
            href="/#pricing"
            className="hidden text-sm font-medium text-slate-600 transition hover:text-ink sm:inline-flex"
          >
            Pricing
          </Link>

          {userEmail ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-slate-500 md:inline">
                {userEmail}
              </span>
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white"
                >
                  Sign out
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/auth"
              className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-slate-900"
            >
              {authConfigured ? "Sign in" : "Auth setup"}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
