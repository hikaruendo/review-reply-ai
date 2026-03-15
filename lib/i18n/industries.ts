import { type Locale } from "./dictionaries";

export type IndustrySlug =
  | "dental"
  | "restaurant"
  | "beauty-salon"
  | "hotel"
  | "chiropractic"
  | "medical-clinic"
  | "real-estate"
  | "fitness-gym"
  | "auto-repair"
  | "pet-grooming";

export type IndustryData = {
  slug: IndustrySlug;
  name: {
    ja: string;
    en: string;
  };
};

export const industries: IndustryData[] = [
  {
    slug: "dental",
    name: {
      ja: "歯科医院",
      en: "Dental Clinic",
    },
  },
  {
    slug: "restaurant",
    name: {
      ja: "レストラン",
      en: "Restaurant",
    },
  },
  {
    slug: "beauty-salon",
    name: {
      ja: "美容院・サロン",
      en: "Beauty Salon",
    },
  },
  {
    slug: "hotel",
    name: {
      ja: "ホテル・旅館",
      en: "Hotel",
    },
  },
  {
    slug: "chiropractic",
    name: {
      ja: "整体・整骨院",
      en: "Chiropractic",
    },
  },
  {
    slug: "medical-clinic",
    name: {
      ja: "クリニック（内科等）",
      en: "Medical Clinic",
    },
  },
  {
    slug: "real-estate",
    name: {
      ja: "不動産",
      en: "Real Estate",
    },
  },
  {
    slug: "fitness-gym",
    name: {
      ja: "フィットネスジム",
      en: "Fitness Gym",
    },
  },
  {
    slug: "auto-repair",
    name: {
      ja: "自動車整備",
      en: "Auto Repair",
    },
  },
  {
    slug: "pet-grooming",
    name: {
      ja: "ペットサロン",
      en: "Pet Grooming",
    },
  },
];

export function getIndustryName(slug: IndustrySlug, locale: Locale): string {
  const industry = industries.find((ind) => ind.slug === slug);
  return industry ? industry.name[locale] : "";
}

export function getAllIndustries() {
  return industries;
}
