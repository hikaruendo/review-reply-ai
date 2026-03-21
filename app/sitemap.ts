import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";
import { locales } from "@/lib/i18n/dictionaries";
import { getAllIndustries } from "@/lib/i18n/industries";
import { getAllScenarios } from "@/lib/i18n/scenarios";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const baseUrl = siteConfig.url;

  const entries: MetadataRoute.Sitemap = [];

  // Add language home pages (use /ja and /en, not root / which redirects)
  for (const lang of locales) {
    entries.push({
      url: `${baseUrl}/${lang}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    });
  }

  // Add all SEO pages (10 industries × 4 scenarios × 2 languages = 80 pages)
  for (const lang of locales) {
    for (const industry of getAllIndustries()) {
      for (const scenario of getAllScenarios()) {
        entries.push({
          url: `${baseUrl}/${lang}/reviews/${industry.slug}/${scenario.slug}`,
          lastModified,
          changeFrequency: "monthly",
          priority: 0.8,
        });
      }
    }
  }

  // Auth page excluded from sitemap (noindex, Supabase not configured yet)

  return entries;
}
