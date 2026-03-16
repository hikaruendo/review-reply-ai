"use client";

import { useState } from "react";

type ManageSubscriptionLinkProps = {
  userId: string;
  label: string;
};

export function ManageSubscriptionLink({ userId, label }: ManageSubscriptionLinkProps) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/billing-portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Billing portal error:", data.error);
        alert(data.error || "Failed to open billing portal");
      }
    } catch (err) {
      console.error("Billing portal error:", err);
      alert("Failed to open billing portal");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="hidden text-sm font-medium text-slate-600 transition hover:text-ink disabled:opacity-50 sm:inline-flex"
    >
      {loading ? "..." : label}
    </button>
  );
}
