import { dictionaries, type Locale } from '@/lib/dictionary'
import Image from 'next/image'
import Link from 'next/link'

export default function Home({ params }: { params: { locale: string } }) {
  const locale = (['en','ja','zh'].includes(params.locale) ? params.locale : 'en') as Locale
  const t = dictionaries[locale]

  return (
    <main>
      <section className="hero">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight">{t.hero.title}</h1>
              <p className="text-lg text-gray-600 mt-4">{t.hero.subtitle}</p>
              <div className="mt-8 flex gap-3">
                <Link href={`/${locale}/collections`} className="btn btn-primary">{t.hero.ctaShop}</Link>
                <Link href={`/${locale}/contact`} className="btn btn-ghost">{t.hero.ctaCustom}</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1,2,3,4].map(i => (
                <Image key={i} src="/placeholder.jpg" alt="" width={800} height={800} className="rounded-2xl object-cover aspect-square" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-narrow mt-10">
        <h2 className="text-2xl font-semibold mb-4">{t.home.featured}</h2>
        <div className="grid-cards">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="card">
              <Image src="/placeholder.jpg" alt="" width={800} height={800} className="rounded-xl object-cover aspect-square mb-4" />
              <div className="font-medium">Product Name</div>
              <div className="text-sm text-gray-500 mt-1">Category</div>
              <button className="btn btn-ghost mt-4 w-full">View</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
