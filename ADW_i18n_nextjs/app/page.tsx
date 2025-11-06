'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'

const labels = { en: 'English', ja: '日本語', zh: '中文' } as const
type L = keyof typeof labels

export default function LanguageChooser() {
  const [locale, setLocale] = useState<L>('en')
  const router = useRouter()

  const go = () => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${60*60*24*365}`
    router.push(`/${locale}/home`)
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="container-narrow">
        <div className="card">
          <div className="flex items-center gap-6">
            <Image src="/placeholder.jpg" alt="" width={80} height={80} className="rounded-2xl object-cover" />
            <div>
              <h1 className="text-2xl font-semibold">ADW — Luxury Faux Florals &amp; Botanicals</h1>
              <p className="text-gray-600 mt-1">Choose your language</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {(['en','ja','zh'] as L[]).map(k => (
              <button
                key={k}
                onClick={() => setLocale(k)}
                className={`btn ${locale===k ? 'btn-primary' : 'btn-ghost'}`}
              >
                {labels[k]}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <button onClick={go} className="btn btn-primary">{'Continue'}</button>
          </div>
        </div>
      </div>
    </main>
  )
}
