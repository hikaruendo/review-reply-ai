"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";

import { CopyButton } from "@/components/copy-button";
import {
  GUEST_GENERATION_LIMIT,
  GUEST_USAGE_STORAGE_KEY,
  INDUSTRIES,
  TONES,
  type GeneratedReply,
  type Industry,
  type ReplyTone
} from "@/lib/constants";
import { type Locale, getDictionary } from "@/lib/i18n/dictionaries";

const INDUSTRY_LABELS: Record<Industry, Record<Locale, string>> = {
  Dental: { ja: "歯科医院", en: "Dental" },
  Restaurant: { ja: "レストラン", en: "Restaurant" },
  Salon: { ja: "美容院・サロン", en: "Salon" },
  "Auto Repair": { ja: "自動車整備", en: "Auto Repair" },
  Other: { ja: "その他", en: "Other" },
};

const TONE_LABELS: Record<ReplyTone, Record<Locale, string>> = {
  Professional: { ja: "プロフェッショナル", en: "Professional" },
  Friendly: { ja: "フレンドリー", en: "Friendly" },
  Empathetic: { ja: "共感的", en: "Empathetic" },
};

type ReviewGeneratorProps = {
  isSignedIn: boolean;
  lang: Locale;
};

type GuestUsageState = {
  count: number;
  month: string;
};

function getMonthKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function readGuestUsage(): GuestUsageState {
  if (typeof window === "undefined") {
    return {
      count: 0,
      month: getMonthKey()
    };
  }

  const rawValue = window.localStorage.getItem(GUEST_USAGE_STORAGE_KEY);

  if (!rawValue) {
    return {
      count: 0,
      month: getMonthKey()
    };
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<GuestUsageState>;
    const currentMonth = getMonthKey();

    if (parsed.month !== currentMonth) {
      const resetState = { count: 0, month: currentMonth };
      window.localStorage.setItem(
        GUEST_USAGE_STORAGE_KEY,
        JSON.stringify(resetState)
      );
      return resetState;
    }

    return {
      count: typeof parsed.count === "number" ? parsed.count : 0,
      month: currentMonth
    };
  } catch {
    return {
      count: 0,
      month: getMonthKey()
    };
  }
}

function incrementGuestUsage() {
  const nextUsage = readGuestUsage();
  const updated = {
    month: nextUsage.month,
    count: nextUsage.count + 1
  };

  window.localStorage.setItem(GUEST_USAGE_STORAGE_KEY, JSON.stringify(updated));

  return updated.count;
}

export function ReviewGenerator({ isSignedIn, lang }: ReviewGeneratorProps) {
  const dict = getDictionary(lang);
  const [reviewText, setReviewText] = useState("");
  const [industry, setIndustry] = useState<Industry>("Dental");
  const [starRating, setStarRating] = useState(5);
  const [tone, setTone] = useState<ReplyTone>("Professional");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [replies, setReplies] = useState<GeneratedReply[]>([]);
  const [guestCount, setGuestCount] = useState(0);

  useEffect(() => {
    if (isSignedIn) {
      return;
    }

    setGuestCount(readGuestUsage().count);
  }, [isSignedIn]);

  const remainingGuestGenerations = isSignedIn
    ? null
    : Math.max(0, GUEST_GENERATION_LIMIT - guestCount);
  const limitReached = !isSignedIn && remainingGuestGenerations === 0;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!reviewText.trim()) {
      setError(dict.errors.emptyReview);
      return;
    }

    if (limitReached) {
      setError(dict.errors.limitReached);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          reviewText,
          industry,
          starRating,
          tone
        })
      });

      const data = (await response.json()) as {
        error?: string;
        replies?: GeneratedReply[];
      };

      if (!response.ok || !data.replies) {
        throw new Error(data.error || dict.errors.generationFailed);
      }

      setReplies(data.replies);

      if (!isSignedIn) {
        setGuestCount(incrementGuestUsage());
      }
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : dict.errors.generationFailed
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
      <form
        onSubmit={handleSubmit}
        className="card-surface space-y-6 p-6 shadow-soft sm:p-8"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-900">
            {dict.generator.badge}
          </div>
          <h2 className="text-2xl font-semibold text-ink">
            {dict.generator.title}
          </h2>
          <p className="text-sm leading-6 text-slate-600">
            {dict.generator.description}
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="review-text"
            className="text-sm font-semibold text-slate-700"
          >
            {dict.generator.reviewTextLabel}
          </label>
          <textarea
            id="review-text"
            value={reviewText}
            onChange={(event) => setReviewText(event.target.value)}
            placeholder={dict.generator.reviewTextPlaceholder}
            rows={7}
            className="min-h-[180px] w-full rounded-3xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-coral"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="industry"
              className="text-sm font-semibold text-slate-700"
            >
              {dict.generator.industryLabel}
            </label>
            <select
              id="industry"
              value={industry}
              onChange={(event) => setIndustry(event.target.value as Industry)}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-coral"
            >
              {INDUSTRIES.map((option) => (
                <option key={option} value={option}>
                  {INDUSTRY_LABELS[option]?.[lang] ?? option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="tone" className="text-sm font-semibold text-slate-700">
              {dict.generator.toneLabel}
            </label>
            <select
              id="tone"
              value={tone}
              onChange={(event) => setTone(event.target.value as ReplyTone)}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-coral"
            >
              {TONES.map((option) => (
                <option key={option} value={option}>
                  {TONE_LABELS[option]?.[lang] ?? option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-700">{dict.generator.starRatingLabel}</p>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setStarRating(value)}
                className={`rounded-2xl px-3 py-3 text-sm font-semibold transition ${
                  starRating === value
                    ? "bg-ink text-white"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                {value}★
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/70 p-4 text-sm text-slate-600">
          {isSignedIn ? (
            <p>{dict.generator.signedInNote}</p>
          ) : (
            <p>
              {dict.generator.guestUsageNote.replace(
                "{{count}}",
                String(remainingGuestGenerations)
              )}
            </p>
          )}
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex h-14 w-full items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? dict.generator.generatingButton : dict.generator.generateButton}
        </button>

        {limitReached ? (
          <div className="rounded-3xl border border-coral/20 bg-coral/5 p-5">
            <p className="text-sm font-semibold text-ink">
              {dict.generator.guestLimitTitle}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {dict.generator.guestLimitDescription}
            </p>
            <Link
              href="/auth"
              className="mt-4 inline-flex rounded-full bg-coral px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#dd5b41]"
            >
              {dict.generator.createAccountButton}
            </Link>
          </div>
        ) : null}
      </form>

      <div className="card-surface flex min-h-[580px] flex-col p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              {dict.generator.generatedRepliesLabel}
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-ink">
              {dict.generator.generatedRepliesTitle}
            </h3>
          </div>
          <div className="rounded-full bg-mint px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-900">
            Claude API
          </div>
        </div>

        <div className="mt-6 flex flex-1 flex-col gap-4">
          {isLoading
            ? [1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-3xl border border-slate-200 bg-white/70 p-5"
                >
                  <div className="h-4 w-28 rounded bg-slate-200" />
                  <div className="mt-4 h-3 w-full rounded bg-slate-100" />
                  <div className="mt-2 h-3 w-[92%] rounded bg-slate-100" />
                  <div className="mt-2 h-3 w-[80%] rounded bg-slate-100" />
                </div>
              ))
            : null}

          {!isLoading && replies.length === 0 ? (
            <div className="flex flex-1 flex-col justify-center rounded-3xl border border-dashed border-slate-200 bg-white/60 px-6 py-10 text-center">
              <p className="text-lg font-semibold text-ink">
                {dict.generator.emptyStateTitle}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {dict.generator.emptyStateDescription}
              </p>
            </div>
          ) : null}

          {!isLoading
            ? replies.map((reply, index) => (
                <article
                  key={`${reply.title}-${index}`}
                  className="rounded-3xl border border-slate-200 bg-white/90 p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                        {lang === "ja" ? `バリエーション ${index + 1}` : `Variant ${index + 1}`}
                      </p>
                      <h4 className="mt-2 text-lg font-semibold text-ink">
                        {reply.title}
                      </h4>
                    </div>
                    <CopyButton text={reply.reply} />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-700">
                    {reply.reply}
                  </p>
                </article>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
