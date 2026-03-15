"use client";

import { useState } from "react";
import { PricingCard } from "@/components/pricing-card";
import { type Locale, getDictionary } from "@/lib/i18n/dictionaries";

type PricingSectionProps = {
  lang: Locale;
};

export function PricingSection({ lang }: PricingSectionProps) {
  const [loading, setLoading] = useState(false);
  const dict = getDictionary(lang);

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
        alert(data.error || (lang === "ja" ? "決済に失敗しました。" : "Checkout failed."));
      }
    } catch {
      alert(lang === "ja" ? "エラーが発生しました。もう一度お試しください。" : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <PricingCard
        name={dict.pricing.freeName}
        price="5/mo"
        description={dict.pricing.freeDescription}
        ctaLabel={dict.pricing.freeCta}
        note={dict.pricing.freeNote}
        onClick={() => {
          document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" });
        }}
      />
      <PricingCard
        name={dict.pricing.proName}
        price="$19/mo"
        description={dict.pricing.proDescription}
        ctaLabel={loading ? (lang === "ja" ? "リダイレクト中..." : "Redirecting...") : dict.pricing.proCta}
        featured
        note={dict.pricing.proNote}
        onClick={handleCheckout}
      />
    </div>
  );
}
