'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';

const LOCALES = ['en','ja','zh'] as const;
type L = typeof LOCALES[number];

function useLocaleFromPath(): L {
  const segs = (usePathname() || '/').split('/').filter(Boolean);
  const l = segs[0];
  return (LOCALES as readonly string[]).includes(l) ? (l as L) : 'en';
}

export default function Header() {
  const locale = useLocaleFromPath();

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="text-xl font-bold">
        <Link href={`/${locale}/home`}>ADW</Link>
      </div>

      <nav className="flex gap-4">
        <Link href={`/${locale}/collections`}>Collections</Link>
        <Link href={`/${locale}/about`}>About</Link>
        <Link href={`/${locale}/contact`}>Contact</Link>
      </nav>

      {/* 言語ボタン（EN/JA/ZH） */}
      <LanguageSwitcher />
    </header>
  );
}

