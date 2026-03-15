import type { Metadata } from "next";
import Link from "next/link";
import { type Locale } from "@/lib/i18n/dictionaries";

export const metadata: Metadata = {
  title: "利用規約 | Terms of Service",
};

type TermsPageProps = {
  params: Promise<{ lang: Locale }>;
};

export default async function TermsPage({ params }: TermsPageProps) {
  const { lang } = await params;

  return (
    <main className="min-h-screen">
      <div className="section-shell py-16">
        <Link
          href={`/${lang}`}
          className="inline-flex text-sm font-semibold text-slate-600 transition hover:text-ink mb-8"
        >
          ← {lang === "ja" ? "ホームに戻る" : "Back to Home"}
        </Link>

        {lang === "ja" ? (
          <div className="prose prose-slate max-w-4xl">
            <h1 className="text-4xl font-semibold text-ink mb-8">利用規約</h1>

            <p className="text-slate-600 mb-6">最終更新日: 2026年3月15日</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">1. 利用規約への同意</h2>
              <p className="text-slate-600 mb-4">
                Review Reply AI（以下「本サービス」）をご利用いただくことで、本利用規約に同意したものとみなされます。本利用規約に同意いただけない場合は、本サービスをご利用いただけません。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">2. サービスの内容</h2>
              <p className="text-slate-600 mb-4">
                本サービスは、AIを利用して口コミへの返信文を自動生成するツールです。生成された返信案は参考として提供されるものであり、最終的な返信内容はお客様の判断で決定してください。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">3. アカウント</h2>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>アカウント登録時には正確な情報を提供してください</li>
                <li>パスワードの管理はお客様の責任で行ってください</li>
                <li>アカウントの不正使用が発覚した場合、直ちにご連絡ください</li>
                <li>1つのアカウントを複数人で共有することはできません</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">4. 料金とお支払い</h2>
              <p className="text-slate-600 mb-4">
                本サービスは、無料プラン（月5回まで）とProプラン（月額$19）を提供しています：
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>無料プランは、サインアップ不要でゲストモードとして利用できます</li>
                <li>Proプランは、Stripeを通じて安全に決済されます</li>
                <li>サブスクリプションはいつでもキャンセル可能です</li>
                <li>返金は、サービス側の重大な不具合があった場合のみ個別に対応します</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">5. 禁止事項</h2>
              <p className="text-slate-600 mb-4">以下の行為を禁止します：</p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>虚偽の情報を含む口コミ返信を生成すること</li>
                <li>他者の権利を侵害する内容の生成</li>
                <li>本サービスの不正使用や過度な負荷をかける行為</li>
                <li>生成されたコンテンツを再販売すること</li>
                <li>リバースエンジニアリング、逆コンパイル、逆アセンブル</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">6. 知的財産権</h2>
              <p className="text-slate-600 mb-4">
                本サービスおよび関連する技術、ソフトウェア、デザインの知的財産権は、kando1合同会社に帰属します。生成された返信テキストの著作権はお客様に帰属します。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">7. 免責事項</h2>
              <p className="text-slate-600 mb-4">
                当社は、本サービスの利用によって生じた損害について、一切の責任を負いません。生成された返信内容の正確性、適切性について保証するものではありません。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">8. サービスの変更・中断</h2>
              <p className="text-slate-600 mb-4">
                当社は、事前の通知なく本サービスの内容を変更、または一時的に中断する場合があります。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">9. 準拠法と管轄裁判所</h2>
              <p className="text-slate-600 mb-4">
                本利用規約は日本法に準拠し、本サービスに関する一切の紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">10. お問い合わせ</h2>
              <p className="text-slate-600">
                本利用規約に関するご質問は、
                <Link href={`/${lang}/contact`} className="text-coral hover:underline">
                  お問い合わせページ
                </Link>
                よりご連絡ください。
              </p>
            </section>
          </div>
        ) : (
          <div className="prose prose-slate max-w-4xl">
            <h1 className="text-4xl font-semibold text-ink mb-8">Terms of Service</h1>

            <p className="text-slate-600 mb-6">Last updated: March 15, 2026</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">1. Agreement to Terms</h2>
              <p className="text-slate-600 mb-4">
                By using Review Reply AI (the "Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">2. Service Description</h2>
              <p className="text-slate-600 mb-4">
                The Service uses AI to automatically generate reply text for customer reviews. Generated replies are provided as suggestions, and final reply content is determined at your discretion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">3. Account</h2>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>Provide accurate information when registering your account</li>
                <li>You are responsible for managing your password</li>
                <li>Immediately notify us if you discover unauthorized use of your account</li>
                <li>One account may not be shared among multiple people</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">4. Pricing and Payment</h2>
              <p className="text-slate-600 mb-4">
                The Service offers a Free plan (up to 5 generations/month) and a Pro plan ($19/month):
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>The Free plan is available as guest mode without signup</li>
                <li>Pro plan payments are securely processed through Stripe</li>
                <li>Subscriptions can be canceled at any time</li>
                <li>Refunds are handled on a case-by-case basis only for significant Service failures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">5. Prohibited Activities</h2>
              <p className="text-slate-600 mb-4">The following activities are prohibited:</p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>Generating review replies containing false information</li>
                <li>Generating content that infringes on others' rights</li>
                <li>Unauthorized use or placing excessive load on the Service</li>
                <li>Reselling generated content</li>
                <li>Reverse engineering, decompiling, or disassembling the Service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">6. Intellectual Property</h2>
              <p className="text-slate-600 mb-4">
                Intellectual property rights to the Service and related technology, software, and design belong to kando1 LLC. Copyright to generated reply text belongs to you.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">7. Disclaimer</h2>
              <p className="text-slate-600 mb-4">
                We are not liable for any damages arising from use of the Service. We do not guarantee the accuracy or appropriateness of generated reply content.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">8. Service Changes and Interruptions</h2>
              <p className="text-slate-600 mb-4">
                We may change the Service content or temporarily suspend the Service without prior notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">9. Governing Law and Jurisdiction</h2>
              <p className="text-slate-600 mb-4">
                These Terms of Service are governed by Japanese law, and the Tokyo District Court has exclusive jurisdiction as the court of first instance for all disputes related to the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">10. Contact Us</h2>
              <p className="text-slate-600">
                For questions about these Terms of Service, please contact us via our{" "}
                <Link href={`/${lang}/contact`} className="text-coral hover:underline">
                  Contact page
                </Link>.
              </p>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
