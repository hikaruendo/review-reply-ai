import { NextResponse } from "next/server";

import { createServerSupabaseClient, getCurrentUser } from "@/lib/supabase/server";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  let plan: string | null = null;
  const supabase = createServerSupabaseClient();
  if (supabase) {
    const { data } = await supabase
      .from("users")
      .select("plan")
      .eq("id", user.id)
      .single();
    plan = data?.plan ?? null;
  }

  return NextResponse.json({
    authenticated: true,
    email: user.email,
    id: user.id,
    plan,
  });
}
