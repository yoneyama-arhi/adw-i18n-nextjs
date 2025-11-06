import Image from 'next/image'

export default function About() {
  return (
    <main className="container-narrow py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl font-semibold mb-4">About ADW</h1>
          <p className="text-gray-600 leading-7">
            ADW crafts museum-grade faux florals with a fashion-forward sensibility.
            Every arrangement is designed to elevate interiors with lasting beauty.
          </p>
        </div>
        <Image src="/placeholder.jpg" alt="" width={800} height={800} className="rounded-2xl object-cover aspect-square" />
      </div>
    </main>
  )
}
