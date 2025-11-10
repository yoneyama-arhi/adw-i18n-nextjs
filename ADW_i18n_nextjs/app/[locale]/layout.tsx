import '../globals.css';
import Header from '../components/Header';
import type { ReactNode } from 'react';

// ここで対応するロケール一覧を定義
const LOCALES = ['en', 'ja', 'zh'] as const;

export const dynamicParams = false;

// 3言語分を静的生成しておく
export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: l }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: 'en' | 'ja' | 'zh' };
}) {
  return (
    <html lang={params.locale}>
      <body className="bg-white text-gray-900">
        <Header />
        <main className="max-w-6xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
