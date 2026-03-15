import { type Locale } from "./dictionaries";

export type ScenarioSlug =
  | "negative-review"
  | "positive-review"
  | "complaint-handling"
  | "return-visit";

export type ScenarioData = {
  slug: ScenarioSlug;
  name: {
    ja: string;
    en: string;
  };
};

export const scenarios: ScenarioData[] = [
  {
    slug: "negative-review",
    name: {
      ja: "低評価レビューへの返信",
      en: "Responding to Negative Reviews",
    },
  },
  {
    slug: "positive-review",
    name: {
      ja: "高評価レビューへのお礼",
      en: "Thanking Positive Reviews",
    },
  },
  {
    slug: "complaint-handling",
    name: {
      ja: "クレーム対応の返信",
      en: "Handling Complaints",
    },
  },
  {
    slug: "return-visit",
    name: {
      ja: "再来店を促す返信",
      en: "Encouraging Return Visits",
    },
  },
];

export function getScenarioName(slug: ScenarioSlug, locale: Locale): string {
  const scenario = scenarios.find((sc) => sc.slug === slug);
  return scenario ? scenario.name[locale] : "";
}

export function getAllScenarios() {
  return scenarios;
}
