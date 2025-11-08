// app/[locale]/layout.tsx（抜粋）
import './globals.css';
import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { dictionaries, type Locale } from '@/lib/dictionary';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function RootLayout({
  children,
  params,
}: { children: ReactNode; params: { locale: string } }) {
  const locale: Locale =
    (['en', 'ja', 'zh'] as const).includes(params.locale as any)
      ? (params.locale as Locale)
      : 'en';

  const t = dictionaries[locale];

  return (
    <html lang={locale}>
      <body>
        <header>
          {/* 省略 */}
          <nav className="flex items-center gap-6 text-sm">
            <Link href={`/${locale}/collections`} className="no-underline">{t.nav.collections}</Link>
            <Link href={`/${locale}/about`} className="no-underline">{t.nav.about}</Link>
            <Link href={`/${locale}/contact`} className="no-underline">{t.nav.contact}</Link>

            {/* ← 関数 props を渡さず、置くだけ */}
            <LanguageSwitcher locale={locale} />
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}
