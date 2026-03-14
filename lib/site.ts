import { APP_NAME, HERO_HEADLINE } from "@/lib/constants";

export const siteConfig = {
  name: APP_NAME,
  headline: HERO_HEADLINE,
  description:
    "Generate polished customer review replies for dental clinics and other local businesses in seconds with Claude-powered AI.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/opengraph-image"
};
