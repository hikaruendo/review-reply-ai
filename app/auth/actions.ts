"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server";

function toAuthMessage(message: string) {
  return `/auth?message=${encodeURIComponent(message)}`;
}

function getRedirectBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_APP_URL ||
    headers().get("origin") ||
    "http://localhost:3000"
  );
}

export async function signInWithPasswordAction(formData: FormData) {
  const supabase = createServerSupabaseClient();

  if (!supabase) {
    redirect(toAuthMessage("Add Supabase env vars to enable sign-in."));
  }

  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();

  if (!email || !password) {
    redirect(toAuthMessage("Email and password are required."));
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(toAuthMessage(error.message));
  }

  redirect("/");
}

export async function signUpAction(formData: FormData) {
  const supabase = createServerSupabaseClient();

  if (!supabase) {
    redirect(toAuthMessage("Add Supabase env vars to enable sign-up."));
  }

  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();

  if (!email || !password) {
    redirect(toAuthMessage("Email and password are required."));
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${getRedirectBaseUrl()}/auth/callback`
    }
  });

  if (error) {
    redirect(toAuthMessage(error.message));
  }

  redirect(toAuthMessage("Check your inbox to confirm your account."));
}

export async function signInWithGoogleAction() {
  const supabase = createServerSupabaseClient();

  if (!supabase) {
    redirect(toAuthMessage("Add Supabase env vars to enable Google OAuth."));
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${getRedirectBaseUrl()}/auth/callback`
    }
  });

  if (error || !data.url) {
    redirect(toAuthMessage(error?.message || "Unable to start Google OAuth."));
  }

  redirect(data.url);
}

export async function signOutAction() {
  const supabase = createServerSupabaseClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  redirect("/");
}
