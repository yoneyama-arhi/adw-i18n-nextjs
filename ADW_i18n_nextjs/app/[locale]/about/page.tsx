import { getDictionary } from '@/lib/dictionary';

export default async function AboutPage({
  params,
}: {
  params: { locale: 'en' | 'ja' | 'zh' };
}) {
  const t = await getDictionary(params.locale);

  return (
    <section className="grid md:grid-cols-2 gap-8 items-start">
      <div>
        <h1 className="text-3xl font-bold mb-3">About ADW</h1>
        <p className="text-gray-700 leading-7">{t.about.body}</p>
      </div>
      <div className="rounded-xl overflow-hidden">
        <img src="/images/hero-2.jpg" alt="" className="w-full h-auto" />
      </div>
    </section>
  );
}
