import Image from 'next/image'

export default function Collections() {
  const cats = ['Bouquets','Centerpieces','Single Stems','Greenery','Seasonal','Vases']
  return (
    <main className="container-narrow py-12">
      <h1 className="text-3xl font-semibold mb-6">Collections</h1>
      <div className="grid-cards">
        {cats.map((c, i) => (
          <div key={i} className="card">
            <Image src="/placeholder.jpg" alt="" width={800} height={800} className="rounded-xl object-cover aspect-square mb-4" />
            <div className="font-medium">{c}</div>
          </div>
        ))}
      </div>
    </main>
  )
}
