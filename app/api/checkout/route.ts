import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const maxDuration = 15;

const PRICE_ID = "price_1TAjVMJjB9qblcuNrYbVFFAy";

export async function POST(request: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { error: "Stripe is not configured." },
        { status: 500 }
      );
    }

    const stripe = new Stripe(secretKey, {
      apiVersion: "2024-06-20" as Stripe.LatestApiVersion,
    });

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const body = (await request.json()) as {
      returnUrl?: string;
      email?: string;
      userId?: string;
    };

    const returnUrl =
      body.returnUrl ||
      process.env.APP_URL ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "https://review-reply.kando1.com";

    // Check if user already has a Stripe customer ID
    let stripeCustomerId: string | undefined;
    if (body.userId) {
      const { data: user } = await supabase
        .from("users")
        .select("stripe_customer_id")
        .eq("id", body.userId)
        .single();

      if (user?.stripe_customer_id) {
        stripeCustomerId = user.stripe_customer_id;
      }
    }

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "subscription",
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      success_url: `${returnUrl}?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${returnUrl}?checkout=cancel`,
      metadata: body.userId ? { userId: body.userId } : undefined,
      subscription_data: body.userId
        ? { metadata: { userId: body.userId } }
        : undefined,
    };

    if (stripeCustomerId) {
      sessionParams.customer = stripeCustomerId;
    } else if (body.email) {
      sessionParams.customer_email = body.email;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Checkout failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
