// ADW_i18n_nextjs/middleware.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'ja', 'zh']
const defaultLocale = 'en'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ✅ ここが重要：「画像」「静的ファイル」は i18n リダイレクト対象外にする
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') || // ← これを忘れると /images/hero-1.jpg が404になる
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap.xml') ||
    /\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|json|woff2?|ttf|map)$/i.test(pathname)
  ) {
    return NextResponse.next()
  }

  // "/" → "/en/home" にリダイレクト
  if (pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = `/${defaultLocale}/home`
    return NextResponse.redirect(url)
  }

  // "/en" など単一ロケール指定なら "/en/home" に
  if (locales.some((loc) => pathname === `/${loc}`)) {
    const locale = pathname.slice(1)
    const url = request.nextUrl.clone()
    url.pathname = `/${locale}/home`
    return NextResponse.redirect(url)
  }

  // 既にロケール付きは通す
  const firstSegment = pathname.split('/')[1]
  if (locales.includes(firstSegment)) {
    return NextResponse.next()
  }

  // ロケールなしのページはデフォルトロケールにリダイレクト
  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    '/((?!_next|images|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|.*\\..*).*)',
  ],
}

