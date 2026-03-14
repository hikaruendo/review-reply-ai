import "server-only";

import type { GeneratedReply, ReviewGenerationInput } from "@/lib/constants";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type PersistGenerationArgs = ReviewGenerationInput & {
  generatedReplies: GeneratedReply[];
};

export async function persistSignedInGeneration({
  generatedReplies,
  industry,
  reviewText,
  starRating,
  tone
}: PersistGenerationArgs) {
  const supabase = createServerSupabaseClient();

  if (!supabase) {
    return;
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user?.id) {
    return;
  }

  await supabase.from("users").upsert(
    {
      id: user.id,
      email: user.email,
      plan: "free"
    },
    {
      onConflict: "id"
    }
  );

  await supabase.from("generations").insert({
    user_id: user.id,
    review_text: reviewText,
    star_rating: starRating,
    industry,
    tone,
    generated_replies: generatedReplies
  });
}
