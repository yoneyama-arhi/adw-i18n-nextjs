import '@/app/globals.css'
import type { ReactNode } from 'react'
import { dictionaries, type Locale } from '@/lib/dictionary'
import Link from 'next/link'
import Image from 'next/image'

export const dynamicParams = true

export default function RootLayout({ children, params }: { children: ReactNode, params: { locale: string } }) {
  const locale = (['en','ja','zh'].includes(params.locale) ? params.locale : 'en') as Locale
  const t = dictionaries[locale]
  return (
    <html lang={locale}>
      <body>
        <header className="border-b">
          <div className="container-narrow flex items-center justify-between h-16">
            <Link href={`/${locale}/home`} className="flex items-center gap-3 no-underline">
              <Image src="/placeholder.jpg" alt="" width={36} height={36} className="rounded-lg object-cover" />
              <span className="font-semibold">ADW</span>
              <span className="text-sm text-gray-500">— {t.brandTagline}</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href={`/${locale}/collections`} className="no-underline">{t.nav.collections}</Link>
              <Link href={`/${locale}/about`} className="no-underline">{t.nav.about}</Link>
              <Link href={`/${locale}/contact`} className="no-underline">{t.nav.contact}</Link>
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
  )
}

function LanguageSwitcher({ locale }: { locale: Locale }) {
  const items: Array<[Locale,string]> = [['en','English'],['ja','日本語'],['zh','中文']]
  return (
    <div className="flex items-center gap-2">
      {items.map(([l, label]) => (
        <a key={l} href={`/${l}/home`} onClick={() => { document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=${60*60*24*365}` }} className={`no-underline ${l===locale ? 'font-semibold' : ''}`}>{label}</a>
      ))}
    </div>
  )
}
