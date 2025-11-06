// /middleware.ts（プロジェクト直下）
import { NextRequest, NextResponse } from 'next/server'

const LOCALES = ['en', 'ja', 'zh'] as const
type Locale = typeof LOCALES[number]

// 静的ファイル・Next の内部パスを完全に素通り
const PUBLIC_FILE = /\.(?:ico|png|jpg|jpeg|gif|svg|webp|avif|css|js|map|txt)$/i

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // 1) 素通りルート
  if (
    pathname.startsWith('/_next') ||     // Next の内部アセット
    pathname.startsWith('/api') ||       // API ルート
    PUBLIC_FILE.test(pathname)           // 画像/CSS/JS 等
  ) {
    return NextResponse.next()
  }

  // 2) クッキーから希望言語（不正なら 'en'）
  const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value
  const hasValidCookie = LOCALES.includes(cookieLocale as any)
  const locale: Locale = (hasValidCookie ? cookieLocale : 'en') as Locale

  // 3) すでに /{locale} で始まるか？
  const hasLocalePrefix = LOCALES.some(l => pathname === `/${l}` || pathname.startsWith(`/${l}/`))

  // 3-1) /en など言語トップは /en/home に 1 回だけ
  if (hasLocalePrefix) {
    for (const l of LOCALES) {
      if (pathname === `/${l}`) {
        const url = req.nextUrl.clone()
        url.pathname = `/${l}/home`
        return NextResponse.redirect(url) // ← ここで 1 回だけ
      }
    }
    return NextResponse.next() // /en/home, /en/about 等はそのまま
  }

  // 4) 言語プレフィックスが無いときだけ 1 回だけ付ける
  const url = req.nextUrl.clone()
  if (pathname === '/' || pathname === '') {
    url.pathname = `/${locale}/home`
  } else {
    url.pathname = `/${locale}${pathname}`
  }
  return NextResponse.redirect(url)
}

// 5) middleware を当てる対象（静的/内部パスを完全除外）
export const config = {
  matcher: [
    // 先頭が _next / api / favicon.ico 以外、かつ拡張子付き静的ファイル以外
    '/((?!_next|api|favicon.ico).*)(?<!\\.\\w+$)'
  ],
}
