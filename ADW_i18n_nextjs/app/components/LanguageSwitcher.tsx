// app/components/LanguageSwitcher.tsx
'use client';

import Link from 'next/link';

type Props = { locale: string };

const items: Array<[string, string]> = [
  ['en', 'English'],
  ['ja', '日本語'],
  ['zh', '中文'],
];

export default function LanguageSwitcher({ locale }: Props) {
  return (
    <div className="flex items-center gap-2">
      {items.map(([l, label]) => (
        <Link
          key={l}
          href={`/${l}/home`}
          onClick={() => {
            // クリック時に Cookie をセット（1年）
            document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=${60 * 60 * 24 * 365}`;
          }}
          className={l === locale ? 'no-underline opacity-60' : 'no-underline'}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
