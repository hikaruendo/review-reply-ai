"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/dictionaries";

type AuthNavProps = {
  lang: Locale;
  labels: {
    signIn: string;
    signOut: string;
    proBadge: string;
    manageSubscription: string;
  };
};

export function AuthNav({ lang, labels }: AuthNavProps) {
  const [user, setUser] = useState<{ email?: string; plan?: string; id?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.email) setUser(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Link
        href="/auth"
        className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-slate-900"
      >
        {labels.signIn}
      </Link>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="hidden items-center gap-2 text-sm text-slate-500 md:inline-flex">
          {user.email}
          {user.plan === "pro" && (
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
              {labels.proBadge}
            </span>
          )}
        </span>
        <form action="/auth/signout" method="POST">
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white"
          >
            {labels.signOut}
          </button>
        </form>
      </div>
    );
  }

  return (
    <Link
      href="/auth"
      className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-slate-900"
    >
      {labels.signIn}
    </Link>
  );
}
