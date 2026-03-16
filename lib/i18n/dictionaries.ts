export const locales = ["ja", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ja";

export type Dictionary = {
  // Hero section
  hero: {
    badge: string;
    headline: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  // Stats cards
  stats: {
    repliesCount: string;
    freeGenerations: string;
    priceLabel: string;
  };
  // Features
  features: {
    sampleWorkflow: string;
    incomingReview: string;
    aiDrafts: string;
    aiDraftsDescription: string;
    fastTeamHandoff: string;
    fastTeamHandoffDescription: string;
    futureReady: string;
    futureReadyDescription: string;
  };
  // Generator
  generator: {
    badge: string;
    title: string;
    description: string;
    reviewTextLabel: string;
    reviewTextPlaceholder: string;
    industryLabel: string;
    toneLabel: string;
    starRatingLabel: string;
    generateButton: string;
    generatingButton: string;
    generatedRepliesLabel: string;
    generatedRepliesTitle: string;
    emptyStateTitle: string;
    emptyStateDescription: string;
    guestUsageNote: string;
    signedInNote: string;
    guestLimitTitle: string;
    guestLimitDescription: string;
    createAccountButton: string;
    proNote: string;
  };
  // How it works
  howItWorks: {
    sectionLabel: string;
    step1Title: string;
    step1Description: string;
    step2Title: string;
    step2Description: string;
    step3Title: string;
    step3Description: string;
  };
  // Pricing
  pricing: {
    sectionLabel: string;
    title: string;
    description: string;
    freeName: string;
    freeDescription: string;
    freeNote: string;
    freeCta: string;
    proName: string;
    proDescription: string;
    proNote: string;
    proCta: string;
    currentPlan: string;
    manageSubscription: string;
  };
  // Header
  header: {
    pricingLink: string;
    signIn: string;
    signOut: string;
    authSetup: string;
    proBadge: string;
    manageSubscription: string;
  };
  // Checkout
  checkout: {
    successMessage: string;
  };
  // Footer
  footer: {
    copyright: string;
    privacy: string;
    terms: string;
    contact: string;
    industriesTitle: string;
  };
  // Errors
  errors: {
    emptyReview: string;
    limitReached: string;
    generationFailed: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  ja: {
    hero: {
      badge: "歯科医院向けに最適化",
      headline: "口コミ返信、もう悩まない。AIが数秒で作成します。",
      description:
        "受付スタッフや院長先生に、すぐに使える返信案を提供。歯科医院から始まり、レストラン、美容院など、あらゆる地域ビジネスに対応予定。",
      ctaPrimary: "無料で試す — サインアップ不要",
      ctaSecondary: "料金を見る",
    },
    stats: {
      repliesCount: "種類の返信案を毎回生成",
      freeGenerations: "まで無料で生成可能",
      priceLabel: "月額Proプラン",
    },
    features: {
      sampleWorkflow: "使い方の例",
      incomingReview: "受信した口コミ",
      aiDrafts: "AIが3つの返信案を作成",
      aiDraftsDescription:
        "丁寧な感謝、ブランドの声、フレンドリーな返信など、Googleレビューに最適な3パターンを提案。お好きなものをコピーして使えます。",
      fastTeamHandoff: "チーム全員で使える",
      fastTeamHandoffDescription:
        "口コミをペーストするだけで、誰でもすぐに使える返信案を入手。1ステップで完結します。",
      futureReady: "将来の拡張に対応",
      futureReadyDescription:
        "認証、保存機能、プランフィールドはすでに実装済み。MVPから成長しても書き直し不要です。",
    },
    generator: {
      badge: "フェーズ0 MVP",
      title: "1つの口コミから3つの返信案を生成",
      description:
        "歯科医院向けに最適化し、レストラン、サロン、自動車整備など、他の地域ビジネスにも対応予定。",
      reviewTextLabel: "口コミ本文",
      reviewTextPlaceholder: "口コミをここに貼り付けてください...",
      industryLabel: "業種",
      toneLabel: "トーン",
      starRatingLabel: "星の評価",
      generateButton: "3つの返信案を生成",
      generatingButton: "返信を生成中...",
      generatedRepliesLabel: "生成された返信",
      generatedRepliesTitle: "すぐに投稿できる返信案",
      emptyStateTitle: "3つの返信案がここに表示されます。",
      emptyStateDescription:
        "Googleレビューを貼り付け、評価とトーンを選択して生成してください。お気に入りをワンクリックでコピーできます。",
      guestUsageNote: "このブラウザで今月残り{{count}}回の無料生成が可能です。",
      signedInNote: "ログイン済みの生成は、環境変数が設定されている場合Supabaseに保存できます。",
      guestLimitTitle: "ゲスト制限に達しました",
      guestLimitDescription:
        "アカウントを作成すると、ブラウザベースの無料制限を超えて、生成した返信を保存できます。",
      createAccountButton: "アカウントを作成",
      proNote: "Proプラン: 無制限に生成可能",
    },
    howItWorks: {
      sectionLabel: "01",
      step1Title: "各口コミに合わせた入力",
      step1Description: "口コミ本文、業種、星評価、トーンが各生成をガイドします。",
      step2Title: "Claudeが生成する返信バリエーション",
      step2Description:
        "Anthropic提供のルートから3つの返信パターンが返され、チームは最適なものを素早く選べます。",
      step3Title: "サインアップを促すゲストモード",
      step3Description:
        "ローカルの月次使用量追跡により、フェーズ0 MVPは摩擦なく、次の変換ステップを設定します。",
    },
    pricing: {
      sectionLabel: "料金プラン",
      title: "まずは無料で試して、使い続けたくなったらアップグレード",
      description: "月5回まで無料生成。無制限の返信と保存履歴を利用するにはProにアップグレード。",
      freeName: "無料",
      freeDescription:
        "サインアップ不要で、1つのブラウザでワークフローをテストするソロオペレーター向け。",
      freeNote: "ゲスト使用量はローカルストレージで毎月リセットされます。",
      freeCta: "ゲストモードを試す",
      proName: "Pro",
      proDescription: "チームで無制限のAI生成口コミ返信。保存履歴、認証、優先サポート。",
      proNote: "Stripeによる安全な決済。",
      proCta: "登録 — $19/月",
      currentPlan: "現在のプラン",
      manageSubscription: "サブスク管理",
    },
    header: {
      pricingLink: "料金",
      signIn: "ログイン",
      signOut: "ログアウト",
      authSetup: "認証設定",
      proBadge: "Pro",
      manageSubscription: "サブスク管理",
    },
    checkout: {
      successMessage: "🎉 Proプランへようこそ！無制限に返信を生成できます。",
    },
    footer: {
      copyright: "© 2026 kando1合同会社. All rights reserved.",
      privacy: "プライバシーポリシー",
      terms: "利用規約",
      contact: "お問い合わせ",
      industriesTitle: "業種別ガイド",
    },
    errors: {
      emptyReview: "返信を生成する前に口コミを貼り付けてください。",
      limitReached:
        "今月のゲスト生成回数5回を使い切りました。続けるにはアカウントを作成してください。",
      generationFailed: "返信の生成中に問題が発生しました。",
    },
  },
  en: {
    hero: {
      badge: "Dental clinics first",
      headline: "Stop struggling with review replies. AI writes them in seconds.",
      description:
        "Give your front desk or practice manager an instant starting point for thoughtful, on-brand review responses. Start with dental clinics now, then expand into every local service category.",
      ctaPrimary: "Try Free — No signup required",
      ctaSecondary: "See pricing",
    },
    stats: {
      repliesCount: "distinct replies per generation",
      freeGenerations: "free guest generations in localStorage",
      priceLabel: "planned Pro monthly tier",
    },
    features: {
      sampleWorkflow: "Sample workflow",
      incomingReview: "Incoming review",
      aiDrafts: "AI drafts three options",
      aiDraftsDescription:
        "Warm thank-you, premium brand voice, or a friendlier reply for Google Reviews. Copy the one that fits your clinic.",
      fastTeamHandoff: "Fast team handoff",
      fastTeamHandoffDescription:
        "Anyone on the team can paste a review and leave with a usable reply in one step.",
      futureReady: "Future-ready data",
      futureReadyDescription:
        "Auth, persistence, and plan fields are scaffolded so the MVP can grow without a rewrite.",
    },
    generator: {
      badge: "Phase 0 MVP",
      title: "Turn one review into three polished reply options",
      description:
        "Built for dental clinics first, and ready for restaurants, salons, auto repair shops, and other local service businesses.",
      reviewTextLabel: "Review text",
      reviewTextPlaceholder: "Paste the customer review here...",
      industryLabel: "Industry",
      toneLabel: "Tone",
      starRatingLabel: "Star rating",
      generateButton: "Generate 3 replies",
      generatingButton: "Generating replies...",
      generatedRepliesLabel: "Generated replies",
      generatedRepliesTitle: "Ready-to-post response options",
      emptyStateTitle: "Your three reply options will appear here.",
      emptyStateDescription:
        "Paste a Google review, pick the rating and tone, then generate. Copy your favorite version with one click.",
      guestUsageNote: "{{count}} of 5 free guest generations left this month in this browser.",
      signedInNote: "Signed-in generations can be saved to Supabase when envs are configured.",
      guestLimitTitle: "Guest limit reached",
      guestLimitDescription:
        "Create an account to move beyond the browser-based free limit and unlock saved generations.",
      createAccountButton: "Create account",
      proNote: "Pro plan: Unlimited generations",
    },
    howItWorks: {
      sectionLabel: "01",
      step1Title: "Tailored input for each review",
      step1Description: "Review text, industry, star rating, and tone guide every generation.",
      step2Title: "Claude-generated reply variants",
      step2Description:
        "Three response patterns come back from an Anthropic-powered route so teams can pick the strongest one fast.",
      step3Title: "Guest mode that still nudges signup",
      step3Description:
        "Local monthly usage tracking keeps the Phase 0 MVP frictionless while setting up the next conversion step.",
    },
    pricing: {
      sectionLabel: "Pricing",
      title: "Start free, then upgrade when the workflow sticks",
      description:
        "Start with 5 free generations per month. Upgrade to Pro for unlimited replies and saved history.",
      freeName: "Free",
      freeDescription:
        "Perfect for solo operators testing the workflow in one browser with no signup required.",
      freeNote: "Guest usage resets monthly in localStorage.",
      freeCta: "Try guest mode",
      proName: "Pro",
      proDescription:
        "Unlimited AI-generated review replies for your team. Saved history, auth, and priority support.",
      proNote: "Secure checkout via Stripe.",
      proCta: "Subscribe — $19/mo",
      currentPlan: "Current Plan",
      manageSubscription: "Manage Subscription",
    },
    header: {
      pricingLink: "Pricing",
      signIn: "Sign in",
      signOut: "Sign out",
      authSetup: "Auth setup",
      proBadge: "Pro",
      manageSubscription: "Manage",
    },
    checkout: {
      successMessage: "🎉 Welcome to Pro! Generate unlimited replies.",
    },
    footer: {
      copyright: "© 2026 kando1 LLC. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      contact: "Contact",
      industriesTitle: "Industry Guides",
    },
    errors: {
      emptyReview: "Paste a customer review before generating replies.",
      limitReached:
        "You have used your 5 free guest generations for this month. Create an account to keep going.",
      generationFailed: "Unable to generate replies right now.",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries.ja;
}
