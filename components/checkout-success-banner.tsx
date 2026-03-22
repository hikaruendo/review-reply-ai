"use client";

import { useEffect, useState } from "react";

type CheckoutSuccessBannerProps = {
  message: string;
};

export function CheckoutSuccessBanner({ message }: CheckoutSuccessBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("checkout") === "success") {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 8000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="section-shell pt-4">
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-800">
        {message}
      </div>
    </div>
  );
}
