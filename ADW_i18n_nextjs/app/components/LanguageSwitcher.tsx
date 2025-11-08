'use client';

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
        <a
          key={l}
          href={`/${l}/home`}
          onClick={() => {
            // Cookie を1年保持
            document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=${60 * 60 * 24 * 365}`;
          }}
          className={l === locale ? 'no-underline opacity-60' : 'no-underline'}
        >
          {label}
        </a>
      ))}
    </div>
  );
}
