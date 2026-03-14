"use client";

import { useState } from "react";
import { PricingCard } from "@/components/pricing-card";

export function PricingSection() {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ returnUrl: window.location.origin }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Checkout failed.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <PricingCard
        name="Free"
        price="5/mo"
        description="Perfect for solo operators testing the workflow in one browser with no signup required."
        ctaLabel="Try guest mode"
        note="Guest usage resets monthly in localStorage."
        onClick={() => {
          document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" });
        }}
      />
      <PricingCard
        name="Pro"
        price="$19/mo"
        description="Unlimited AI-generated review replies for your team. Saved history, auth, and priority support."
        ctaLabel={loading ? "Redirecting..." : "Subscribe — $19/mo"}
        featured
        note="Secure checkout via Stripe."
        onClick={handleCheckout}
      />
    </div>
  );
}
