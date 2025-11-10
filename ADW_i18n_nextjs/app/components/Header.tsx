'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const pathname = usePathname() || '/';
  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = ['en', 'ja', 'zh'].includes(segments[0]) ? segments[0] : 'en';

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      {/* ロゴ部分 */}
      <div className="text-2xl font-bold">
        <Link href={`/${currentLocale}/home`}>ADW</Link>
      </div>

      {/* ナビゲーションリンク */}
      <nav className="flex gap-6 text-sm font-medium">
        <Link href={`/${currentLocale}/collections`} className="hover:text-gray-500">
          Collections
        </Link>
        <Link href={`/${currentLocale}/about`} className="hover:text-gray-500">
          About
        </Link>
        <Link href={`/${currentLocale}/contact`} className="hover:text-gray-500">
          Contact
        </Link>
      </nav>

      {/* 言語切り替えボタン */}
      <LanguageSwitcher />
    </header>
  );
}
