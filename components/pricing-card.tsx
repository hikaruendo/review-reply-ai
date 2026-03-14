"use client";

type PricingCardProps = {
  name: string;
  price: string;
  description: string;
  ctaLabel: string;
  featured?: boolean;
  note?: string;
  onClick?: () => void;
};

export function PricingCard({
  ctaLabel,
  description,
  featured = false,
  name,
  note,
  onClick,
  price
}: PricingCardProps) {
  return (
    <div
      className={`card-surface flex h-full flex-col justify-between p-6 ${
        featured ? "border-amber-300/80 shadow-soft" : ""
      }`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-ink">{name}</h3>
          {featured ? (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-900">
              Popular
            </span>
          ) : null}
        </div>
        <div className="text-4xl font-semibold text-ink">{price}</div>
        <p className="text-sm leading-6 text-slate-600">{description}</p>
      </div>

      <div className="mt-6 space-y-3">
        <button
          type="button"
          onClick={onClick}
          className={`inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
            featured
              ? "bg-ink text-white hover:bg-slate-900"
              : "border border-slate-300 bg-white text-slate-800 hover:border-slate-400"
          }`}
        >
          {ctaLabel}
        </button>
        {note ? <p className="text-xs text-slate-500">{note}</p> : null}
      </div>
    </div>
  );
}
