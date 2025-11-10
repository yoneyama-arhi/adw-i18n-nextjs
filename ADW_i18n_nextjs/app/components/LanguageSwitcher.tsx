'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';

const LOCALES = ['en', 'ja', 'zh'] as const;
type Locale = typeof LOCALES[number];

function setLocaleCookie(locale: Locale) {
  // 30日保持
  document.cookie = `NEXT_LOCALE=${locale}; Path=/; Max-Age=${60 * 60 * 24 * 30}`;
}

export default function LanguageSwitcher() {
  const pathname = usePathname() || '/';
  const router = useRouter();

  // 先頭のロケールと、残りのパスを取得
  const { currentLocale, restPath } = useMemo(() => {
    const parts = pathname.split('/').filter(Boolean); // '' を除去
    const maybeLocale = (parts[0] || 'en') as Locale;
    const isLocale = LOCALES.includes(maybeLocale);
    return {
      currentLocale: (isLocale ? maybeLocale : 'en') as Locale,
      restPath: isLocale ? parts.slice(1).join('/') : parts.join('/'),
    };
  }, [pathname]);

  const switchTo = (next: Locale) => {
    setLocaleCookie(next);
    const target = `/${next}/${restPath || 'home'}`;
    router.push(target);
  };

  return (
    <div className="flex items-center gap-2">
      {LOCALES.map((l) => {
        const active = l === currentLocale;
        return (
          <button
            key={l}
            onClick={() => switchTo(l)}
            className={
              `px-2 py-1 rounded-lg text-sm ` +
              (active
                ? 'bg-black text-white'
                : 'bg-transparent text-gray-600 hover:bg-gray-100')
            }
            aria-current={active ? 'page' : undefined}
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
