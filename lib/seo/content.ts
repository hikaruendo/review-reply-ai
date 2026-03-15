import { type IndustrySlug } from "@/lib/i18n/industries";
import { type ScenarioSlug } from "@/lib/i18n/scenarios";
import { type Locale } from "@/lib/i18n/dictionaries";

export type SEOContent = {
  title: string;
  description: string;
  h1: string;
  intro: string;
  tips: string[];
  examples: Array<{
    review: string;
    reply: string;
  }>;
};

type ContentKey = `${IndustrySlug}-${ScenarioSlug}-${Locale}`;

export const seoContent: Partial<Record<ContentKey, SEOContent>> = {
  // Dental - Negative Review - JA
  "dental-negative-review-ja": {
    title: "歯科医院の低評価レビューへの返信例とコツ | AI返信ジェネレーター",
    description:
      "歯科医院の低評価レビューに適切に対応する方法。AIが生成する返信例で、患者の信頼を回復し、プロフェッショナルな対応を実現します。",
    h1: "歯科医院の低評価レビューに効果的に対応する方法",
    intro:
      "低評価レビューは歯科医院にとって大きな課題ですが、適切な対応で信頼回復のチャンスに変えられます。患者の不満に誠実に向き合い、改善への姿勢を示すことで、他の潜在患者にも好印象を与えることができます。",
    tips: [
      "24時間以内に返信することで、迅速な対応をアピール",
      "患者の気持ちに寄り添い、不快な思いをさせたことへの謝罪を明確に",
      "具体的な改善策や今後の対応を提示",
      "感情的にならず、プロフェッショナルなトーンを維持",
      "可能であれば、オフラインでの対話を提案",
    ],
    examples: [
      {
        review: "待ち時間が長すぎて、予約の意味がない。受付の対応も冷たかった。",
        reply:
          "この度は貴重なお時間をいただいたにも関わらず、長時間お待たせしてしまい、大変申し訳ございませんでした。また、受付スタッフの対応でご不快な思いをさせてしまったこと、深くお詫び申し上げます。ご指摘を真摯に受け止め、予約管理システムの見直しとスタッフ教育の強化を進めております。今後このようなことがないよう改善に努めてまいります。",
      },
    ],
  },

  // Dental - Negative Review - EN
  "dental-negative-review-en": {
    title: "How to Respond to Negative Dental Clinic Reviews | AI Reply Generator",
    description:
      "Learn how to professionally respond to negative reviews for your dental clinic. AI-generated replies help restore patient trust and demonstrate professionalism.",
    h1: "Effective Strategies for Responding to Negative Dental Reviews",
    intro:
      "Negative reviews can be challenging for dental clinics, but with the right approach, they become opportunities to rebuild trust. By addressing patient concerns with sincerity and demonstrating commitment to improvement, you can turn critics into advocates and impress potential patients.",
    tips: [
      "Respond within 24 hours to show prompt attention",
      "Empathize with the patient and offer a clear apology for their experience",
      "Provide specific steps you're taking to address the issue",
      "Maintain a professional tone without getting defensive",
      "Invite offline conversation when appropriate",
    ],
    examples: [
      {
        review:
          "The wait time was ridiculous even with an appointment. The receptionist was also quite rude.",
        reply:
          "We sincerely apologize for the extended wait time and for any discourtesy you experienced from our reception staff. This is not the standard of care we strive for. We are reviewing our appointment scheduling system and reinforcing our customer service training. Your feedback is invaluable in helping us improve. If you'd like to discuss this further, please contact us directly.",
      },
    ],
  },

  // Dental - Positive Review - JA
  "dental-positive-review-ja": {
    title: "歯科医院の高評価レビューへのお礼返信例 | AI返信ジェネレーター",
    description:
      "患者からの好意的なレビューに心温まる返信をしましょう。AIが生成する返信例で、感謝の気持ちを伝え、患者との関係を深めます。",
    h1: "歯科医院の高評価レビューに感謝を伝える返信方法",
    intro:
      "高評価レビューは歯科医院にとって貴重な財産です。患者の好意に丁寧に感謝することで、信頼関係をさらに深め、リピート来院や口コミでの新規患者獲得につながります。心のこもった返信で、患者との絆を強化しましょう。",
    tips: [
      "具体的なポイントに触れて、レビューをしっかり読んだことを示す",
      "スタッフの名前が挙がっている場合は、その貢献を認める",
      "次回来院への期待を自然に盛り込む",
      "過度に営業的にならず、温かみのあるトーンを保つ",
      "院の理念や価値観を軽く添える",
    ],
    examples: [
      {
        review:
          "歯科衛生士さんがとても丁寧で、先生の説明も分かりやすかったです。長年の歯医者嫌いが克服できそうです。",
        reply:
          "温かいお言葉をいただき、スタッフ一同大変嬉しく思っております。当院では、患者様に安心して治療を受けていただけるよう、丁寧な説明とケアを心がけております。歯科への不安を少しでも和らげることができたなら幸いです。今後とも、お口の健康をサポートさせていただければと思います。またのご来院を心よりお待ちしております。",
      },
    ],
  },

  // Dental - Positive Review - EN
  "dental-positive-review-en": {
    title: "Thank You Responses for Positive Dental Reviews | AI Reply Generator",
    description:
      "Respond warmly to positive patient reviews. AI-generated thank-you replies strengthen relationships and encourage loyalty.",
    h1: "How to Thank Patients for Positive Dental Reviews",
    intro:
      "Positive reviews are invaluable assets for dental clinics. Expressing genuine gratitude strengthens patient relationships, encourages repeat visits, and attracts new patients through word-of-mouth. A heartfelt response shows you value patient feedback and care about their experience.",
    tips: [
      "Reference specific details to show you read the review carefully",
      "Acknowledge staff members by name when mentioned",
      "Express hope for future visits naturally",
      "Keep tone warm and genuine, not overly promotional",
      "Briefly reinforce your clinic's values or mission",
    ],
    examples: [
      {
        review:
          "The hygienist was so gentle and the dentist explained everything clearly. Best dental experience I've had in years!",
        reply:
          "Thank you so much for your kind words! We're thrilled to hear that our hygienist and dentist made you feel comfortable. Providing gentle, thorough care with clear communication is exactly what we strive for. We're honored to have helped make your dental experience a positive one, and we look forward to seeing you at your next appointment!",
      },
    ],
  },

  // Restaurant - Negative Review - JA
  "restaurant-negative-review-ja": {
    title: "レストランの低評価レビューへの返信例 | AI返信ジェネレーター",
    description:
      "レストランの低評価レビューに効果的に対応。AIが生成する返信で、顧客の信頼を回復し、サービス改善の姿勢を示します。",
    h1: "レストランの低評価レビューに適切に対応する方法",
    intro:
      "飲食業では、低評価レビューへの対応が店の評判を左右します。料理やサービスへの不満に真摯に向き合い、改善への具体的な行動を示すことで、他の潜在顧客にも誠実さをアピールできます。",
    tips: [
      "料理や接客の具体的な問題点を認識していることを示す",
      "食材の品質や調理方法への配慮を伝える",
      "スタッフのトレーニングや改善計画に言及",
      "再訪問時の特典や割引を提案（適切な場合のみ）",
      "レビューを真剣に受け止めていることを明確に",
    ],
    examples: [
      {
        review: "パスタが冷めていて、ウェイターの態度も悪かった。二度と行きません。",
        reply:
          "この度はご期待に沿えず、誠に申し訳ございませんでした。料理が冷めた状態で提供されたこと、またスタッフの接客でご不快な思いをさせてしまったこと、深くお詫び申し上げます。キッチンとホールスタッフへの指導を徹底し、温かい料理と心のこもったサービスを提供できるよう改善に取り組んでおります。貴重なご意見をありがとうございました。",
      },
    ],
  },

  // Restaurant - Negative Review - EN
  "restaurant-negative-review-en": {
    title: "How to Handle Negative Restaurant Reviews | AI Reply Generator",
    description:
      "Respond professionally to negative restaurant reviews. AI-generated replies help restore customer trust and show commitment to service excellence.",
    h1: "Best Practices for Responding to Negative Restaurant Reviews",
    intro:
      "In the restaurant industry, how you handle negative reviews can make or break your reputation. By addressing food and service complaints with sincerity and outlining concrete improvements, you demonstrate accountability and care to potential diners.",
    tips: [
      "Acknowledge specific issues with food or service",
      "Emphasize your commitment to quality ingredients and preparation",
      "Mention staff training or improvement initiatives",
      "Offer a return visit incentive when appropriate",
      "Show you take feedback seriously",
    ],
    examples: [
      {
        review: "Pasta arrived cold and the waiter had a terrible attitude. Won't be back.",
        reply:
          "We sincerely apologize that your pasta was not served at the proper temperature and that our service fell short of your expectations. This is not acceptable, and we are addressing these issues with our kitchen and wait staff immediately. We're committed to serving delicious, properly prepared food with warm hospitality. Thank you for bringing this to our attention.",
      },
    ],
  },

  // Beauty Salon - Negative Review - JA
  "beauty-salon-negative-review-ja": {
    title: "美容院・サロンの低評価レビューへの返信例 | AI返信ジェネレーター",
    description:
      "美容院やサロンの低評価レビューに効果的に対応。AIが生成する返信で、顧客の信頼を回復し、技術とサービスの改善を示します。",
    h1: "美容院・サロンの低評価レビューに適切に対応する方法",
    intro:
      "美容業界では、顧客の期待に応えられなかった場合のフォローが重要です。カットやカラーの仕上がり、接客に対する不満に誠実に向き合い、技術向上とサービス改善への姿勢を示すことで、信頼を取り戻せます。",
    tips: [
      "仕上がりへの不満に対して、具体的な改善策を提示",
      "無料のお直しやカウンセリングを提案",
      "スタイリストの技術研修や教育への取り組みを伝える",
      "次回来店時の特典を提示（適切な場合）",
      "顧客の理想のスタイルへの理解と共感を示す",
    ],
    examples: [
      {
        review: "希望の長さより短く切られてしまった。カウンセリングも適当だった。",
        reply:
          "この度はご希望に沿った仕上がりをご提供できず、大変申し訳ございませんでした。カウンセリングが不十分であったこと、深くお詫び申し上げます。今後このようなことがないよう、お客様のご要望をしっかりと確認する体制を強化してまいります。もしよろしければ、無料でお直しのカウンセリングをさせていただきたく存じます。お手数ですが、サロンまでご連絡いただけますと幸いです。",
      },
    ],
  },

  // Beauty Salon - Negative Review - EN
  "beauty-salon-negative-review-en": {
    title: "Responding to Negative Beauty Salon Reviews | AI Reply Generator",
    description:
      "Handle negative beauty salon reviews professionally. AI-generated responses help restore client trust and demonstrate commitment to service excellence.",
    h1: "How to Address Negative Reviews for Beauty Salons",
    intro:
      "In the beauty industry, addressing client dissatisfaction promptly and professionally is crucial. When haircuts, colors, or services don't meet expectations, showing empathy and offering solutions demonstrates your commitment to client satisfaction.",
    tips: [
      "Acknowledge the specific styling concern",
      "Offer complimentary corrections or consultations",
      "Mention ongoing stylist training and quality assurance",
      "Provide incentive for return visit when appropriate",
      "Show understanding of the client's desired look",
    ],
    examples: [
      {
        review: "Cut my hair way shorter than I asked for. The consultation was rushed.",
        reply:
          "We're truly sorry that we didn't achieve the length you wanted and that your consultation felt rushed. This falls short of our standards. We'd love the opportunity to make this right with a complimentary styling consultation. Please contact the salon at your convenience so we can ensure you leave happy with your hair. We're committed to listening carefully and delivering exactly what our clients envision.",
      },
    ],
  },

  // Hotel - Complaint Handling - JA
  "hotel-complaint-handling-ja": {
    title: "ホテル・旅館のクレーム対応返信例 | AI返信ジェネレーター",
    description:
      "ホテルや旅館のクレームに効果的に対応。AIが生成する返信で、ゲストの信頼を回復し、サービス改善への取り組みを示します。",
    h1: "ホテル・旅館のクレームに適切に対応する返信方法",
    intro:
      "宿泊業では、クレームへの迅速で誠実な対応がリピート率や評価を大きく左右します。設備、清潔さ、スタッフ対応などへの不満に真摯に向き合い、具体的な改善策を示すことで、ゲストの信頼を取り戻せます。",
    tips: [
      "宿泊体験を損なったことへの明確な謝罪",
      "施設の具体的な改善計画や清掃強化を伝える",
      "スタッフ教育やサービス向上への取り組みを説明",
      "次回宿泊時の特典や割引を提示（適切な場合）",
      "ゲストの快適な滞在への配慮を強調",
    ],
    examples: [
      {
        review: "部屋の清掃が行き届いておらず、エアコンも壊れていた。フロントに伝えても対応が遅かった。",
        reply:
          "この度はご宿泊いただいたにも関わらず、清掃不備と設備の不具合でご不快な思いをさせてしまい、誠に申し訳ございませんでした。また、フロントスタッフの対応が遅れたこと、深くお詫び申し上げます。清掃体制の見直しと設備点検の強化、スタッフのトレーニングを徹底し、すべてのお客様に快適にお過ごしいただける環境を整えてまいります。貴重なご意見をありがとうございました。",
      },
    ],
  },

  // Auto Repair - Return Visit - EN
  "auto-repair-return-visit-en": {
    title: "Encouraging Return Visits - Auto Repair Shop Reviews | AI Reply Generator",
    description:
      "Craft compelling responses that encourage customers to return to your auto repair shop. AI-generated replies build loyalty and trust.",
    h1: "How to Encourage Repeat Business Through Review Responses",
    intro:
      "Building customer loyalty in auto repair starts with consistent quality service and genuine appreciation. When responding to reviews, express gratitude and remind customers of your ongoing commitment to their vehicle's health and safety.",
    tips: [
      "Thank customers for trusting you with their vehicle",
      "Mention seasonal maintenance or upcoming service needs",
      "Highlight your warranty or satisfaction guarantee",
      "Remind them of loyalty programs or discounts",
      "Emphasize long-term relationships over one-time transactions",
    ],
    examples: [
      {
        review: "Great service on my brake job. Fair pricing and quick turnaround.",
        reply:
          "Thank you for choosing us for your brake service! We're glad we could get you back on the road safely and quickly. As seasons change, remember we're here for all your maintenance needs - oil changes, tire rotations, and inspections. We value your trust and look forward to keeping your vehicle running smoothly for years to come!",
      },
    ],
  },

  // Fitness Gym - Positive Review - JA
  "fitness-gym-positive-review-ja": {
    title: "フィットネスジムの高評価レビューへのお礼返信例 | AI返信ジェネレーター",
    description:
      "ジム会員からの好意的なレビューに感謝を伝える返信例。AIが生成する返信で、会員との絆を深め、継続的な利用を促進します。",
    h1: "フィットネスジムの高評価レビューに感謝を伝える方法",
    intro:
      "ジム会員からの肯定的なレビューは、施設の価値と雰囲気を証明する貴重な資産です。トレーナーやスタッフへの感謝、施設への満足に丁寧に応えることで、会員のモチベーションを高め、長期的な関係を築けます。",
    tips: [
      "トレーナーやスタッフの名前が挙がっていれば、その貢献を称える",
      "会員のフィットネス目標達成を祝福",
      "コミュニティの一員であることへの感謝を表現",
      "新しいクラスやプログラムへの参加を促す",
      "健康とウェルネスへの共通の価値観を強調",
    ],
    examples: [
      {
        review: "トレーナーの指導が的確で、3ヶ月で目標体重を達成できました！施設も清潔で通いやすいです。",
        reply:
          "目標達成おめでとうございます！3ヶ月間の努力の成果ですね。トレーナーへのお褒めの言葉も、大変励みになります。当ジムでは、会員の皆様の健康目標をサポートできることを誇りに思っております。今後も、次のステージに向けて全力でサポートさせていただきます。引き続き、よろしくお願いいたします！",
      },
    ],
  },

  // Pet Grooming - Positive Review - EN
  "pet-grooming-positive-review-en": {
    title: "Thank You Responses for Positive Pet Grooming Reviews | AI Reply Generator",
    description:
      "Respond warmly to positive pet grooming reviews. AI-generated replies strengthen client relationships and show your love for their pets.",
    h1: "How to Thank Clients for Positive Pet Grooming Reviews",
    intro:
      "Positive reviews about your pet grooming service show trust in your care of beloved animals. Expressing genuine gratitude and affection for their pets strengthens the bond with pet parents and encourages loyalty.",
    tips: [
      "Mention the pet by name to personalize the response",
      "Express affection for the pet and joy in caring for them",
      "Thank the owner for trusting you with their pet",
      "Mention any specific services or treatments they enjoyed",
      "Invite them back for future grooming appointments",
    ],
    examples: [
      {
        review: "Bella looked absolutely beautiful after her grooming! The staff was so gentle with her.",
        reply:
          "Thank you so much! We absolutely adore Bella and love making her look and feel her best. She's such a sweet pup, and we're honored you trust us with her care. We can't wait to see her again for her next grooming session. Give Bella a big hug from all of us!",
      },
    ],
  },

  // Medical Clinic - Complaint Handling - EN
  "medical-clinic-complaint-handling-en": {
    title: "Medical Clinic Complaint Response Examples | AI Reply Generator",
    description:
      "Handle medical clinic complaints professionally. AI-generated responses address patient concerns with empathy and demonstrate commitment to quality care.",
    h1: "How to Address Patient Complaints in Medical Clinic Reviews",
    intro:
      "In healthcare, addressing patient complaints with empathy and professionalism is essential. Whether concerns involve wait times, staff interactions, or care quality, a thoughtful response shows your commitment to patient satisfaction and continuous improvement.",
    tips: [
      "Acknowledge the patient's experience without violating HIPAA",
      "Express genuine empathy for their frustration or concern",
      "Outline steps being taken to prevent similar issues",
      "Invite them to contact the clinic directly for resolution",
      "Maintain professional tone while showing compassion",
    ],
    examples: [
      {
        review: "Waited 90 minutes past my appointment time. Nobody even apologized or explained why.",
        reply:
          "We sincerely apologize for the extended wait time and lack of communication. We understand how valuable your time is, and this experience falls short of our standards. We're reviewing our scheduling procedures and enhancing staff communication protocols to prevent this in the future. If you'd like to discuss this further, please contact our office manager directly. Your feedback helps us improve.",
      },
    ],
  },

  // Real Estate - Return Visit - JA
  "real-estate-return-visit-ja": {
    title: "不動産の再利用を促す返信例 | AI返信ジェネレーター",
    description:
      "不動産サービス利用者に再度の相談を促す返信例。AIが生成する返信で、顧客との長期的な関係を築きます。",
    h1: "不動産レビューへの返信で再利用を促す方法",
    intro:
      "不動産業では、一度の取引で終わらず、長期的な関係を築くことが重要です。引っ越しや物件購入・売却のサポートに感謝を示し、今後のニーズにも対応できることを伝えることで、リピート利用や紹介につながります。",
    tips: [
      "物件探しや取引のサポートへの感謝を明確に",
      "今後の不動産ニーズ（賃貸更新、売却、投資など）にも対応できることを伝える",
      "紹介や口コミでの推薦を歓迎する姿勢を示す",
      "市場動向や地域情報の提供を申し出る",
      "長期的なパートナーシップを強調",
    ],
    examples: [
      {
        review: "希望通りの物件を見つけてくれて、契約もスムーズでした。親身に対応してくれて感謝しています。",
        reply:
          "この度は当社をご利用いただき、誠にありがとうございました。ご希望の物件が見つかり、スムーズにお引っ越しいただけたこと、大変嬉しく思います。今後、賃貸更新や新たな物件探し、売却のご相談など、不動産に関することがございましたら、いつでもお気軽にご連絡ください。末永くサポートさせていただければ幸いです。",
      },
    ],
  },

  // Chiropractic - Positive Review - EN
  "chiropractic-positive-review-en": {
    title: "Thank You Responses for Positive Chiropractic Reviews | AI Reply Generator",
    description:
      "Respond to positive chiropractic reviews with warmth and professionalism. AI-generated replies strengthen patient relationships and encourage continued care.",
    h1: "How to Thank Patients for Positive Chiropractic Reviews",
    intro:
      "Positive reviews from chiropractic patients validate your healing work and build trust with prospective patients. Expressing gratitude for their feedback and celebrating their progress reinforces the patient-provider relationship.",
    tips: [
      "Acknowledge their specific health improvements or pain relief",
      "Thank them for trusting you with their care",
      "Encourage continued treatment for long-term wellness",
      "Mention the importance of maintenance and prevention",
      "Express commitment to their ongoing health journey",
    ],
    examples: [
      {
        review: "After just three sessions, my back pain is almost completely gone. Dr. Smith really knows what he's doing!",
        reply:
          "We're thrilled to hear about your progress! Back pain can be debilitating, and we're honored to be part of your healing journey. Dr. Smith and our entire team are committed to your long-term wellness. Remember, regular adjustments can help prevent future issues. We look forward to continuing to support your health!",
      },
    ],
  },
};

export function getSEOContent(
  industry: IndustrySlug,
  scenario: ScenarioSlug,
  locale: Locale
): SEOContent | null {
  const key: ContentKey = `${industry}-${scenario}-${locale}`;

  // Return existing content if available
  if (seoContent[key]) {
    return seoContent[key]!;
  }

  // Generate default content for missing combinations
  const industryName = locale === "ja"
    ? (industry === "dental" ? "歯科医院" : industry === "restaurant" ? "レストラン" : "ビジネス")
    : (industry === "dental" ? "Dental Clinic" : industry === "restaurant" ? "Restaurant" : "Business");

  const scenarioName = locale === "ja"
    ? (scenario === "negative-review" ? "低評価レビューへの返信" :
       scenario === "positive-review" ? "高評価レビューへのお礼" :
       scenario === "complaint-handling" ? "クレーム対応" : "再来店促進")
    : (scenario === "negative-review" ? "Responding to Negative Reviews" :
       scenario === "positive-review" ? "Thanking Positive Reviews" :
       scenario === "complaint-handling" ? "Handling Complaints" : "Encouraging Return Visits");

  return {
    title: `${industryName}の${scenarioName} | AI返信ジェネレーター`,
    description: `${industryName}の${scenarioName}に効果的に対応する方法。AIが生成する返信例で、顧客との関係を強化します。`,
    h1: `${industryName}の${scenarioName}`,
    intro: locale === "ja"
      ? `${industryName}の${scenarioName}は、顧客満足度と信頼構築の重要な機会です。適切な対応で、ビジネスの評判を高めることができます。`
      : `${scenarioName} for ${industryName} is a crucial opportunity to build trust and customer satisfaction. Proper responses can significantly enhance your business reputation.`,
    tips: [
      locale === "ja" ? "迅速に対応することで、顧客への配慮を示す" : "Respond promptly to show customer care",
      locale === "ja" ? "誠実で具体的な内容を心がける" : "Be sincere and specific in your response",
      locale === "ja" ? "プロフェッショナルなトーンを維持" : "Maintain a professional tone",
    ],
    examples: [
      {
        review: locale === "ja" ? "サービスが良かったです。" : "Great service!",
        reply: locale === "ja"
          ? "ありがとうございます。お客様のご満足が私たちの喜びです。またのご利用を心よりお待ちしております。"
          : "Thank you for your kind words! We're delighted to hear you had a positive experience. We look forward to serving you again!",
      },
    ],
  };
}
