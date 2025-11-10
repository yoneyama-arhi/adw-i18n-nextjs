// app/[locale]/layout.tsx（抜粋）

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
      import Header from '@/app/components/Header';

...

<body>
  <Header locale={locale} t={t} />
  {children}
</body>

        {children}
      </body>
    </html>
  );
}
