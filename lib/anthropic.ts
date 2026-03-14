import "server-only";

import Anthropic from "@anthropic-ai/sdk";

import {
  DEFAULT_ANTHROPIC_MODEL,
  type GeneratedReply,
  type ReviewGenerationInput
} from "@/lib/constants";

function extractJsonPayload(raw: string) {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");

  if (start === -1 || end === -1 || end < start) {
    throw new Error("Claude returned an invalid JSON payload.");
  }

  return raw.slice(start, end + 1);
}

function toReplyObject(value: unknown, fallbackIndex: number): GeneratedReply | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Record<string, unknown>;
  const title = typeof candidate.title === "string" ? candidate.title.trim() : "";
  const reply = typeof candidate.reply === "string" ? candidate.reply.trim() : "";

  if (!reply) {
    return null;
  }

  return {
    title: title || `Variant ${fallbackIndex + 1}`,
    reply
  };
}

function fallbackRepliesFromText(raw: string): GeneratedReply[] {
  const segments = raw
    .split(/\n{2,}/)
    .map((segment) => segment.trim())
    .filter(Boolean);

  return segments.slice(0, 3).map((segment, index) => {
    const lines = segment
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length > 1 && lines[0].length <= 36) {
      return {
        title: lines[0].replace(/^[-*#\d.\s]+/, "") || `Variant ${index + 1}`,
        reply: lines.slice(1).join(" ")
      };
    }

    return {
      title: `Variant ${index + 1}`,
      reply: segment.replace(/^[-*#\d.\s]+/, "")
    };
  });
}

function normalizeReplies(raw: string) {
  try {
    const payload = JSON.parse(extractJsonPayload(raw)) as {
      replies?: unknown[];
    };

    const replies = Array.isArray(payload.replies)
      ? payload.replies
          .map((reply, index) => toReplyObject(reply, index))
          .filter((reply): reply is GeneratedReply => Boolean(reply))
      : [];

    if (replies.length >= 3) {
      return replies.slice(0, 3);
    }
  } catch {
    // Fall through to paragraph parsing.
  }

  const fallback = fallbackRepliesFromText(raw);

  if (fallback.length >= 3) {
    return fallback.slice(0, 3);
  }

  throw new Error("Claude did not return three usable replies.");
}

function buildPrompt({
  reviewText,
  industry,
  starRating,
  tone
}: ReviewGenerationInput) {
  return [
    "Generate exactly three polished owner replies to the customer review below.",
    "Return valid JSON only using this shape:",
    '{"replies":[{"title":"Short label","reply":"Full reply text"}]}',
    "Requirements:",
    "- Reply in the SAME LANGUAGE as the review text. If the review is in Japanese, reply in Japanese. If in English, reply in English.",
    "- Replies should feel distinct from each other, not slight rephrasings.",
    "- Keep each reply around 60 to 120 words.",
    "- Match the requested tone.",
    "- Sound appropriate for a local business owner responding publicly.",
    "- Avoid making up discounts, refunds, treatments, or facts not present in the review.",
    "- If the review is negative, acknowledge the experience and invite an offline follow-up.",
    "- If the industry is Dental, do not mention protected health details or specific patient records.",
    "",
    `Industry: ${industry}`,
    `Star rating: ${starRating}/5`,
    `Tone: ${tone}`,
    "Review text:",
    reviewText
  ].join("\n");
}

export async function generateReviewReplies(input: ReviewGenerationInput) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is missing.");
  }

  const anthropic = new Anthropic({ apiKey });
  const response = await anthropic.messages.create({
    model: process.env.ANTHROPIC_MODEL || DEFAULT_ANTHROPIC_MODEL,
    max_tokens: 900,
    temperature: 0.7,
    system:
      "You write concise, natural review replies for local businesses. Return JSON only and never wrap it in markdown.",
    messages: [
      {
        role: "user",
        content: buildPrompt(input)
      }
    ]
  });

  const rawText = response.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim();

  return normalizeReplies(rawText);
}
