import type { Metadata } from "next";
import { notFound } from "next/navigation";

import "@/app/globals.css";
import { siteConfig } from "@/lib/site";
import { locales, type Locale, getDictionary } from "@/lib/i18n/dictionaries";

type Props = {
  children: React.ReactNode;
  params: { lang: string };
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang as Locale;

  if (!locales.includes(lang as Locale)) {
    return {};
  }

  const dict = getDictionary(lang);
  const baseUrl = siteConfig.url;
  const canonicalUrl = lang === "ja" ? baseUrl : `${baseUrl}/en`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: dict.hero.headline,
      template: `%s | ${dict.hero.headline}`,
    },
    description: dict.hero.description,
    keywords: [
      lang === "ja" ? "AI 口コミ返信" : "AI review replies",
      lang === "ja" ? "レビュー返信 生成" : "review response generator",
      lang === "ja" ? "歯科医院 マーケティング" : "dental clinic marketing",
      lang === "ja" ? "顧客レビュー 返信ツール" : "customer review reply tool",
      "Anthropic Claude",
    ],
    openGraph: {
      type: "website",
      title: dict.hero.headline,
      description: dict.hero.description,
      url: canonicalUrl,
      siteName: dict.hero.headline,
      locale: lang === "ja" ? "ja_JP" : "en_US",
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: dict.hero.headline,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.hero.headline,
      description: dict.hero.description,
      images: [siteConfig.ogImage],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ja: baseUrl,
        en: `${baseUrl}/en`,
      },
    },
  };
}

export default function LangLayout({ children, params }: Props) {
  if (!locales.includes(params.lang as Locale)) {
    notFound();
  }

  const lang = params.lang as Locale;

  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
