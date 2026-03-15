import type { Metadata } from "next";
import Link from "next/link";
import { type Locale } from "@/lib/i18n/dictionaries";

export const metadata: Metadata = {
  title: "プライバシーポリシー | Privacy Policy",
};

type PrivacyPageProps = {
  params: Promise<{ lang: Locale }>;
};

export default async function PrivacyPage({ params }: PrivacyPageProps) {
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
            <h1 className="text-4xl font-semibold text-ink mb-8">プライバシーポリシー</h1>

            <p className="text-slate-600 mb-6">最終更新日: 2026年3月15日</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">1. 収集する情報</h2>
              <p className="text-slate-600 mb-4">
                kando1合同会社（以下「当社」）は、Review Reply AIサービス（以下「本サービス」）の提供にあたり、以下の情報を収集します：
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>アカウント情報（メールアドレス、パスワード）</li>
                <li>生成した口コミ返信のテキスト</li>
                <li>使用状況データ（生成回数、選択した業種やトーンなど）</li>
                <li>技術情報（IPアドレス、ブラウザ情報、デバイス情報）</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">2. 情報の利用目的</h2>
              <p className="text-slate-600 mb-4">収集した情報は以下の目的で利用します：</p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>本サービスの提供・運営</li>
                <li>AI返信生成機能の改善</li>
                <li>カスタマーサポート</li>
                <li>利用規約違反の検出・防止</li>
                <li>新機能や重要な変更に関する通知</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">3. 情報の共有</h2>
              <p className="text-slate-600 mb-4">
                当社は、以下の場合を除き、お客様の個人情報を第三者に提供しません：
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>お客様の同意がある場合</li>
                <li>法令に基づく場合</li>
                <li>サービス提供に必要な範囲で、業務委託先（Anthropic、Stripe、Supabaseなど）に提供する場合</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">4. データの保管</h2>
              <p className="text-slate-600 mb-4">
                生成された返信データは、Supabaseのデータベースに保管されます。ゲストモードで生成されたデータは、ブラウザのローカルストレージに保存され、当社のサーバーには送信されません。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">5. お客様の権利</h2>
              <p className="text-slate-600 mb-4">お客様は以下の権利を有します：</p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>個人情報の開示請求</li>
                <li>個人情報の訂正・削除請求</li>
                <li>個人情報の利用停止請求</li>
                <li>アカウントの削除</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">6. お問い合わせ</h2>
              <p className="text-slate-600">
                本プライバシーポリシーに関するご質問は、
                <Link href={`/${lang}/contact`} className="text-coral hover:underline">
                  お問い合わせページ
                </Link>
                よりご連絡ください。
              </p>
            </section>
          </div>
        ) : (
          <div className="prose prose-slate max-w-4xl">
            <h1 className="text-4xl font-semibold text-ink mb-8">Privacy Policy</h1>

            <p className="text-slate-600 mb-6">Last updated: March 15, 2026</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">1. Information We Collect</h2>
              <p className="text-slate-600 mb-4">
                kando1 LLC ("we", "our", or "us") collects the following information when providing the Review Reply AI service ("Service"):
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>Account information (email address, password)</li>
                <li>Generated review reply text</li>
                <li>Usage data (generation count, selected industry, tone, etc.)</li>
                <li>Technical information (IP address, browser information, device information)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">2. How We Use Your Information</h2>
              <p className="text-slate-600 mb-4">We use collected information for the following purposes:</p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>Providing and operating the Service</li>
                <li>Improving AI reply generation functionality</li>
                <li>Customer support</li>
                <li>Detecting and preventing Terms of Service violations</li>
                <li>Notifying users about new features or important changes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">3. Information Sharing</h2>
              <p className="text-slate-600 mb-4">
                We do not share your personal information with third parties except in the following cases:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>With your consent</li>
                <li>When required by law</li>
                <li>With service providers necessary for Service delivery (Anthropic, Stripe, Supabase, etc.)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">4. Data Storage</h2>
              <p className="text-slate-600 mb-4">
                Generated reply data is stored in the Supabase database. Data generated in guest mode is stored in browser local storage and is not transmitted to our servers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">5. Your Rights</h2>
              <p className="text-slate-600 mb-4">You have the following rights:</p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>Request access to your personal information</li>
                <li>Request correction or deletion of your personal information</li>
                <li>Request suspension of use of your personal information</li>
                <li>Delete your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">6. Contact Us</h2>
              <p className="text-slate-600">
                For questions about this Privacy Policy, please contact us via our{" "}
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
