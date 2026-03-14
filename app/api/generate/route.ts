import { NextResponse } from "next/server";

import {
  isIndustry,
  isReplyTone,
  type ReviewGenerationInput
} from "@/lib/constants";
import { generateReviewReplies } from "@/lib/anthropic";
import { persistSignedInGeneration } from "@/lib/persistence";

export const runtime = "nodejs";
export const maxDuration = 30;

function validatePayload(payload: Record<string, unknown>): ReviewGenerationInput {
  const reviewText =
    typeof payload.reviewText === "string" ? payload.reviewText.trim() : "";
  const industry = typeof payload.industry === "string" ? payload.industry : "";
  const tone = typeof payload.tone === "string" ? payload.tone : "";
  const starRating = Number(payload.starRating);

  if (reviewText.length < 10) {
    throw new Error("Review text should be at least 10 characters.");
  }

  if (!isIndustry(industry)) {
    throw new Error("Select a supported industry.");
  }

  if (!isReplyTone(tone)) {
    throw new Error("Select a supported tone.");
  }

  if (!Number.isInteger(starRating) || starRating < 1 || starRating > 5) {
    throw new Error("Star rating must be a whole number from 1 to 5.");
  }

  return {
    reviewText,
    industry,
    tone,
    starRating
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const input = validatePayload(body);
    const replies = await generateReviewReplies(input);

    await persistSignedInGeneration({
      ...input,
      generatedReplies: replies
    });

    return NextResponse.json({ replies });
  } catch (error) {
    console.error("Generate error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "The reply generator failed unexpectedly.";

    const status = (error as { status?: number })?.status || 500;
    return NextResponse.json({ error: message }, { status });
  }
}
