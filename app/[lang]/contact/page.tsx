import type { Metadata } from "next";
import Link from "next/link";
import { type Locale } from "@/lib/i18n/dictionaries";

export const metadata: Metadata = {
  title: "お問い合わせ | Contact",
};

type ContactPageProps = {
  params: Promise<{ lang: Locale }>;
};

export default async function ContactPage({ params }: ContactPageProps) {
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

        <div className="max-w-2xl">
          <h1 className="text-4xl font-semibold text-ink mb-8">
            {lang === "ja" ? "お問い合わせ" : "Contact Us"}
          </h1>

          {lang === "ja" ? (
            <div className="space-y-6">
              <p className="text-slate-600">
                Review Reply AIに関するご質問、ご要望、不具合の報告などがございましたら、下記の情報をご利用ください。
              </p>

              <div className="card-surface p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-ink mb-2">会社情報</h2>
                  <p className="text-slate-600">kando1合同会社</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-ink mb-2">メールでのお問い合わせ</h2>
                  <p className="text-slate-600 mb-2">
                    以下のメールアドレスまでご連絡ください：
                  </p>
                  <a
                    href="mailto:support@kando1.com"
                    className="text-coral font-semibold hover:underline"
                  >
                    support@kando1.com
                  </a>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-ink mb-2">お問い合わせ時のご注意</h2>
                  <ul className="list-disc pl-6 text-slate-600 space-y-2">
                    <li>お問い合わせ内容をできるだけ詳しくお書きください</li>
                    <li>不具合報告の場合は、再現手順やスクリーンショットがあると助かります</li>
                    <li>通常、1〜3営業日以内にご返信いたします</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <h2 className="text-xl font-semibold text-ink mb-2">よくある質問</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-slate-800 mb-1">Q: 無料プランの制限回数はいつリセットされますか？</p>
                      <p className="text-sm text-slate-600">A: 毎月1日に自動的にリセットされます（ブラウザのローカルストレージベース）。</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 mb-1">Q: Proプランはいつでもキャンセルできますか？</p>
                      <p className="text-sm text-slate-600">A: はい、いつでもキャンセル可能です。キャンセル後も請求期間の終了まで利用できます。</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 mb-1">Q: 生成された返信は商用利用できますか？</p>
                      <p className="text-sm text-slate-600">A: はい、生成された返信テキストの著作権はお客様に帰属し、自由に商用利用できます。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-slate-600">
                If you have questions, feature requests, or bug reports about Review Reply AI, please use the contact information below.
              </p>

              <div className="card-surface p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-ink mb-2">Company Information</h2>
                  <p className="text-slate-600">kando1 LLC</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-ink mb-2">Email Contact</h2>
                  <p className="text-slate-600 mb-2">
                    Please contact us at:
                  </p>
                  <a
                    href="mailto:support@kando1.com"
                    className="text-coral font-semibold hover:underline"
                  >
                    support@kando1.com
                  </a>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-ink mb-2">Contact Guidelines</h2>
                  <ul className="list-disc pl-6 text-slate-600 space-y-2">
                    <li>Please provide as much detail as possible about your inquiry</li>
                    <li>For bug reports, reproduction steps and screenshots are helpful</li>
                    <li>We typically respond within 1-3 business days</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <h2 className="text-xl font-semibold text-ink mb-2">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-slate-800 mb-1">Q: When does the free plan limit reset?</p>
                      <p className="text-sm text-slate-600">A: It resets automatically on the 1st of each month (browser localStorage-based).</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 mb-1">Q: Can I cancel the Pro plan at any time?</p>
                      <p className="text-sm text-slate-600">A: Yes, you can cancel at any time. After cancellation, you can continue using the service until the end of the billing period.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 mb-1">Q: Can I use generated replies for commercial purposes?</p>
                      <p className="text-sm text-slate-600">A: Yes, copyright to generated reply text belongs to you and you can freely use it commercially.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
