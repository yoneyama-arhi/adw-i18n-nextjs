import Image from 'next/image';
import { getDictionary } from '@/lib/dictionary';

export default async function Home({
  params: { locale },
}: {
  params: { locale: 'en' | 'ja' | 'zh' };
}) {
  const t = await getDictionary(locale);

  return (
    <main className="p-6 max-w-6xl mx-auto">
      {/* ヒーロー */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-3">ADW — {t['brand.tagline']}</h1>
          <p className="text-gray-600 mb-6">{t['about.body']}</p>
          <div className="flex gap-3">
            <a href={`/${locale}/collections`} className="btn btn-primary">{t['cta.shop']}</a>
            <a href={`/${locale}/contact`} className="btn btn-ghost">{t['cta.bespoke']}</a>
          </div>
        </div>

        {/* 4枚グリッド（自社ホスト画像） */}
        <div className="grid grid-cols-2 gap-4">
          <Image src="/images/hero-1.jpg" alt="" width={800} height={800} priority />
          <Image src="/images/hero-2.jpg" alt="" width={800} height={800} />
          <Image src="/images/hero-3.jpg" alt="" width={800} height={800} />
          <Image src="/images/hero-4.jpg" alt="" width={800} height={800} />
        </div>
      </section>

      {/* Featured（仮） */}
      <h2 className="text-xl font-semibold mt-12 mb-6">{t['section.featured']}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { img: '/images/hero-1.jpg', name: 'Product Name' },
          { img: '/images/hero-3.jpg', name: 'Product Name' },
          { img: '/images/hero-4.jpg', name: 'Product Name' },
        ].map((p, i) => (
          <div key={i} className="rounded-2xl border p-4">
            <div className="aspect-square relative mb-3">
              <Image
                src={p.img}
                alt=""
                fill
                sizes="(min-width:1024px) 33vw, 100vw"
                className="object-cover rounded-xl"
              />
            </div>
            <div className="text-sm text-gray-500">Category</div>
            <div className="font-medium">{p.name}</div>
            <a href={`/${locale}/collections`} className="mt-3 inline-block w-full text-center rounded-xl border py-2">
              View
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}

