import { getDictionary } from '@/lib/dictionary';

export default async function CollectionsPage({
  params,
}: {
  params: { locale: 'en' | 'ja' | 'zh' };
}) {
  const t = await getDictionary(params.locale);

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">{t.section.featured}</h1>
      <p className="text-gray-600 mb-8">{t.about.body}</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="rounded-2xl border p-4">
            <img src={`/images/hero-${n}.jpg`} alt="" className="rounded-xl mb-3" />
            <div className="text-sm text-gray-500">Category</div>
            <div className="font-medium">Product Name</div>
          </div>
        ))}
      </div>
    </section>
  );
}

