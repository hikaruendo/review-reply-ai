import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const maxDuration = 30;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20" as Stripe.LatestApiVersion,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`Webhook signature verification failed: ${message}`);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const email = session.customer_details?.email;
        if (!email) {
          console.error("checkout.session.completed: no customer email");
          break;
        }

        const subscriptionId =
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription?.id;

        const { error } = await supabase
          .from("users")
          .update({
            plan: "pro",
            stripe_customer_id:
              typeof session.customer === "string"
                ? session.customer
                : session.customer?.id ?? null,
            stripe_subscription_id: subscriptionId ?? null,
          })
          .eq("email", email);

        if (error) {
          console.error("checkout.session.completed DB error:", error);
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId =
          typeof subscription.customer === "string"
            ? subscription.customer
            : subscription.customer.id;

        const plan =
          subscription.status === "active" ||
          subscription.status === "past_due"
            ? "pro"
            : "free";

        // current_period_end may be on the raw object even if not in TS types
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rawSub = subscription as any;
        const currentPeriodEnd =
          typeof rawSub.current_period_end === "number"
            ? new Date(rawSub.current_period_end * 1000).toISOString()
            : null;

        const { error } = await supabase
          .from("users")
          .update({
            plan,
            stripe_subscription_id: subscription.id,
            stripe_current_period_end: currentPeriodEnd,
          })
          .eq("stripe_customer_id", customerId);

        if (error) {
          console.error("subscription.updated DB error:", error);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId =
          typeof subscription.customer === "string"
            ? subscription.customer
            : subscription.customer.id;

        const { error } = await supabase
          .from("users")
          .update({
            plan: "free",
            stripe_subscription_id: null,
            stripe_current_period_end: null,
          })
          .eq("stripe_customer_id", customerId);

        if (error) {
          console.error("subscription.deleted DB error:", error);
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        console.warn(
          `Payment failed for customer ${invoice.customer}, invoice ${invoice.id}`
        );
        break;
      }

      default:
        // Unhandled event type — ignore
        break;
    }
  } catch (err) {
    console.error(`Webhook handler error for ${event.type}:`, err);
  }

  // Always return 200 to acknowledge receipt
  return NextResponse.json({ received: true });
}
