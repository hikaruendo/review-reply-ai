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

type ReviewGeneratorProps = {
  isSignedIn: boolean;
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

export function ReviewGenerator({ isSignedIn }: ReviewGeneratorProps) {
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
      setError("Paste a customer review before generating replies.");
      return;
    }

    if (limitReached) {
      setError(
        "You have used your 5 free guest generations for this month. Create an account to keep going."
      );
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
        throw new Error(data.error || "Unable to generate replies right now.");
      }

      setReplies(data.replies);

      if (!isSignedIn) {
        setGuestCount(incrementGuestUsage());
      }
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong while generating replies."
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
            Phase 0 MVP
          </div>
          <h2 className="text-2xl font-semibold text-ink">
            Turn one review into three polished reply options
          </h2>
          <p className="text-sm leading-6 text-slate-600">
            Built for dental clinics first, and ready for restaurants, salons,
            auto repair shops, and other local service businesses.
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="review-text"
            className="text-sm font-semibold text-slate-700"
          >
            Review text
          </label>
          <textarea
            id="review-text"
            value={reviewText}
            onChange={(event) => setReviewText(event.target.value)}
            placeholder="Paste the customer review here..."
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
              Industry
            </label>
            <select
              id="industry"
              value={industry}
              onChange={(event) => setIndustry(event.target.value as Industry)}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-coral"
            >
              {INDUSTRIES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="tone" className="text-sm font-semibold text-slate-700">
              Tone
            </label>
            <select
              id="tone"
              value={tone}
              onChange={(event) => setTone(event.target.value as ReplyTone)}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-coral"
            >
              {TONES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-700">Star rating</p>
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
            <p>Signed-in generations can be saved to Supabase when envs are configured.</p>
          ) : (
            <p>
              {remainingGuestGenerations} of {GUEST_GENERATION_LIMIT} free guest
              generations left this month in this browser.
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
          {isLoading ? "Generating replies..." : "Generate 3 replies"}
        </button>

        {limitReached ? (
          <div className="rounded-3xl border border-coral/20 bg-coral/5 p-5">
            <p className="text-sm font-semibold text-ink">
              Guest limit reached
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Create an account to move beyond the browser-based free limit and
              unlock saved generations.
            </p>
            <Link
              href="/auth"
              className="mt-4 inline-flex rounded-full bg-coral px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#dd5b41]"
            >
              Create account
            </Link>
          </div>
        ) : null}
      </form>

      <div className="card-surface flex min-h-[580px] flex-col p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Generated replies
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-ink">
              Ready-to-post response options
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
                Your three reply options will appear here.
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Paste a Google review, pick the rating and tone, then generate.
                Copy your favorite version with one click.
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
                        Variant {index + 1}
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
