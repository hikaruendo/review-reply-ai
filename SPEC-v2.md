# Review Reply AI v2 - Autonomous Sales Spec

## Goal
Transform from "outbound sales needed" to "self-selling via organic search."

## Architecture Changes

### 1. i18n Routing (Japanese + English)
- Default language: `ja` (Japanese market is primary)
- English as secondary
- Route structure:
  - `/` → Japanese LP (redirect or render JP)
  - `/en` → English LP
  - `/reviews/[industry]/[scenario]` → Japanese SEO pages
  - `/en/reviews/[industry]/[scenario]` → English SEO pages

### 2. Programmatic SEO Pages

Generate static pages for every combination of:

**Industries (JP / EN):**
- 歯科医院 / Dental Clinic
- レストラン / Restaurant
- 美容院・サロン / Beauty Salon
- ホテル・旅館 / Hotel
- 整体・整骨院 / Chiropractic
- クリニック（内科等）/ Medical Clinic
- 不動産 / Real Estate
- フィットネスジム / Fitness Gym
- 自動車整備 / Auto Repair
- ペットサロン / Pet Grooming

**Scenarios (JP / EN):**
- 低評価レビューへの返信 / Responding to Negative Reviews
- 高評価レビューへのお礼 / Thanking Positive Reviews
- クレーム対応の返信 / Handling Complaints
- 再来店を促す返信 / Encouraging Return Visits

That's 10 × 4 = 40 pages per language = **80 SEO pages total.**

Each page should have:
- Unique H1 with industry + scenario
- 300-400 words of unique explanatory content (tips for that specific industry/scenario)
- Embedded ReviewGenerator component with industry pre-selected
- 2-3 example review/reply pairs specific to the industry
- CTA to sign up for Pro
- Proper meta title, description, OG tags
- Schema.org structured data (SoftwareApplication)
- Internal links to related pages

Use `generateStaticParams()` and `generateMetadata()` for Next.js static generation.

### 3. Japanese LP (Main Landing Page)

Translate the entire landing page to Japanese:
- Hero headline: 「口コミ返信、もう悩まない。AIが数秒で作成します。」
- All feature descriptions, pricing, CTAs in Japanese
- Keep the same visual design and component structure
- `<html lang="ja">` for Japanese pages

### 4. UI Translation

All components need JP/EN variants:
- ReviewGenerator labels and placeholders
- PricingSection text
- SiteHeader navigation
- Error messages
- Industry/Tone select options (Japanese labels for JP pages)

### 5. Improved Conversion Flow

- After generation, show a "この返信は満足ですか？" satisfaction prompt
- Add email capture: "メールアドレスを入力すると、生成した返信を保存できます"
- Social proof section: "〇〇件の返信を生成済み" (counter, can be hardcoded initially)
- Trust badges: "データは保存されません" "30秒で完了"

### 6. SEO Improvements

- Comprehensive sitemap including all SEO pages
- robots.txt allowing all crawlers
- Structured data (JSON-LD) on every page
- Canonical URLs
- hreflang tags (ja/en)
- Internal linking between related industry pages

### 7. Footer

Add a proper footer with:
- kando1合同会社 copyright
- Links: プライバシーポリシー, 利用規約, お問い合わせ
- Link to all industry pages (for crawlability)

## Technical Constraints

- Keep Next.js 14 App Router
- Keep existing Stripe checkout working (price_1TAjVMJjB9qblcuNrYbVFFAy)
- Keep Anthropic API integration unchanged
- Keep Supabase scaffolding
- Keep Tailwind CSS with existing design tokens
- All new content should be statically generated where possible
- Keep existing color scheme and visual identity

## File Organization

```
app/
├── [lang]/
│   ├── page.tsx              (LP - uses lang param)
│   ├── layout.tsx            (sets html lang)
│   └── reviews/
│       └── [industry]/
│           └── [scenario]/
│               └── page.tsx  (SEO landing page)
├── api/                      (keep existing)
│   ├── generate/route.ts
│   └── checkout/route.ts
├── auth/                     (keep existing)
├── globals.css
├── layout.tsx                (root layout, redirects / to /ja)
├── icon.svg
├── robots.ts
└── sitemap.ts

lib/
├── i18n/
│   ├── dictionaries.ts       (JP/EN translations)
│   ├── industries.ts         (industry data with slugs)
│   └── scenarios.ts          (scenario data with slugs)
├── seo/
│   └── content.ts            (per-industry, per-scenario unique content)
└── (keep existing files)
```

## Priority Order
1. i18n dictionary + routing
2. Japanese LP translation
3. Programmatic SEO pages with content
4. Footer + internal linking
5. Sitemap + robots + structured data
6. Email capture improvement
