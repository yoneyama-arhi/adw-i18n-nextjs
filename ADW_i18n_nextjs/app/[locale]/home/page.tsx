import Image from 'next/image'
import { getDictionary } from '@/lib/dictionary'

export default async function Page({ params:{ locale } }:{ params:{locale:'en'|'ja'|'zh'} }) {
  const t = await getDictionary(locale)
  return (
    <main className="p-6 max-w-6xl mx-auto">
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-3">ADW — {t['brand.tagline']}</h1>
          <p className="text-gray-600 mb-6">{t['about.body']}</p>
          <div className="flex gap-3">
            <a href={`/${locale}/collections`} className="btn btn-primary">{t['cta.shop']}</a>
            <a href={`/${locale}/contact`} className="btn btn-ghost">{t['cta.bespoke']}</a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* 参考サイト画像（例。実URLに置き換え） */}
          <Image src="https://www.ndi.com/path/to/hero1.jpg" alt="" width={800} height={800}/>
          <Image src="https://www.ndi.com/path/to/hero2.jpg" alt="" width={800} height={800}/>
          <Image src="https://www.ndi.com/path/to/hero3.jpg" alt="" width={800} height={800}/>
          <Image src="https://www.ndi.com/path/to/hero4.jpg" alt="" width={800} height={800}/>
        </div>
      </section>

      <h2 className="text-xl font-semibold mt-12 mb-4">{t['section.featured']}</h2>
      {/* 商品カードはモックでOK */}
    </main>
  )
}
