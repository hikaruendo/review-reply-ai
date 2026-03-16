import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import "@/app/globals.css";

import {
  signInWithGoogleAction,
  signInWithPasswordAction,
  signUpAction
} from "@/app/auth/actions";
import { getCurrentUser } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Sign in",
  robots: {
    index: false,
    follow: false,
  },
};

type AuthPageProps = {
  searchParams?: {
    message?: string;
  };
};

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const user = await getCurrentUser();

  if (user) {
    redirect("/ja");
  }

  const authConfigured = isSupabaseConfigured();
  const message = searchParams?.message;

  return (
    <html lang="ja">
    <body>
    <main className="min-h-screen">
      <div className="section-shell flex min-h-screen items-center py-12">
        <div className="grid w-full gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="card-surface p-8 sm:p-10">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                Future-ready auth
              </p>
              <h1 className="text-4xl font-semibold text-ink">
                Create an account to save generations and unlock Pro later
              </h1>
              <p className="max-w-xl text-sm leading-7 text-slate-600">
                Email/password and Google OAuth are scaffolded for Supabase.
                Add your Supabase project env vars to activate the flow.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white/80 p-5">
                <p className="text-sm font-semibold text-ink">Save every reply</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Signed-in generations are wired to persist in Supabase-ready
                  tables.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white/80 p-5">
                <p className="text-sm font-semibold text-ink">Prep for billing</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Free and Pro plans are modeled now so Stripe can be connected
                  later.
                </p>
              </div>
            </div>

            <Link
              href="/ja"
              className="mt-8 inline-flex text-sm font-semibold text-slate-600 transition hover:text-ink"
            >
              ← Back to generator
            </Link>
          </section>

          <section className="card-surface p-8 sm:p-10">
            {!authConfigured ? (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                Supabase is not configured yet. Add env vars from `.env.example`
                to enable auth.
              </div>
            ) : null}

            {message ? (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {message}
              </div>
            ) : null}

            <div className={`${message || !authConfigured ? "mt-6" : ""} space-y-6`}>
              <div>
                <h2 className="text-2xl font-semibold text-ink">Sign in or sign up</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Use one form for both actions. Google OAuth requires a Google
                  provider to be enabled in Supabase Auth.
                </p>
              </div>

              <form className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="owner@clinic.com"
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-coral"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    minLength={8}
                    placeholder="At least 8 characters"
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-coral"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    formAction={signInWithPasswordAction}
                    className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-slate-900"
                  >
                    Sign in
                  </button>
                  <button
                    formAction={signUpAction}
                    className="inline-flex h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:border-slate-400"
                  >
                    Create account
                  </button>
                </div>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <form action={signInWithGoogleAction}>
                <button
                  type="submit"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:border-slate-400"
                >
                  Google
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
    </body>
    </html>
  );
}
