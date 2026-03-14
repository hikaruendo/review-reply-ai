export const APP_NAME = "AI Review Reply Generator";
export const GUEST_GENERATION_LIMIT = 5;
export const GUEST_USAGE_STORAGE_KEY = "review-reply-ai-guest-usage";
export const DEFAULT_ANTHROPIC_MODEL = "claude-3-5-haiku-latest";

export const INDUSTRIES = [
  "Dental",
  "Restaurant",
  "Salon",
  "Auto Repair",
  "Other"
] as const;

export const TONES = ["Professional", "Friendly", "Empathetic"] as const;

export type Industry = (typeof INDUSTRIES)[number];
export type ReplyTone = (typeof TONES)[number];
export type Plan = "free" | "pro";

export type GeneratedReply = {
  title: string;
  reply: string;
};

export type ReviewGenerationInput = {
  reviewText: string;
  industry: Industry;
  starRating: number;
  tone: ReplyTone;
};

export const HERO_HEADLINE =
  "Stop struggling with review replies. AI writes them in seconds.";

export function isIndustry(value: string): value is Industry {
  return INDUSTRIES.includes(value as Industry);
}

export function isReplyTone(value: string): value is ReplyTone {
  return TONES.includes(value as ReplyTone);
}
