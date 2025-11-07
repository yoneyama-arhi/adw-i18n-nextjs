// app/[locale]/layout.tsx （抜粋）
import './globals.css';
import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { dictionaries, type Locale } from '@/lib/dictionary';
import LanguageSwitcher from '@/components/LanguageSwitcher'; // ← 追加

export const dynamicParams = true;

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale: Locale = (['en', 'ja', 'zh'] as const).includes(params.locale as any)
    ? (params.locale as Locale)
    : 'en';

  const t = dictionaries[locale];

  return (
    <html lang={locale}>
      <body>
        <header className="border-b">
          <div className="container-narrow flex items-center justify-between h-16">
            <Link href={`/${locale}/home`} className="flex items-center gap-3 no-underline">
              <Image src="/placeholder.jpg" alt="" width={36} height={36} className="rounded-lg object-cover" />
              <span className="font-semibold">ADW</span>
              <span className="text-sm text-gray-500">{t.brandTagline}</span>
            </Link>

            <nav className="flex items-center gap-6 text-sm">
              <Link href={`/${locale}/collections`} className="no-underline">{t.nav.collections}</Link>
              <Link href={`/${locale}/about`} className="no-underline">{t.nav.about}</Link>
              <Link href={`/${locale}/contact`} className="no-underline">{t.nav.contact}</Link>

              {/* ← ここを Client Component に置き換え */}
              <LanguageSwitcher locale={locale} />
            </nav>
          </div>
        </header>

        {children}

        <footer className="mt-20 border-t">
          <div className="container-narrow py-10 text-sm text-gray-500 flex items-center justify-between">
            <div>© {new Date().getFullYear()} ADW. {t.footer.rights}</div>
            <div className="badge">ADW</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
