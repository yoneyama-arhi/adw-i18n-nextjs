import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const PUBLIC_FILE = /\.(.*)$/

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return
  }

  // Cookie からロケールを取得（なければ英語）
  const locale = req.cookies.get('NEXT_LOCALE')?.value || 'en'

  // "/" の場合はホームページへ自動リダイレクト
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${locale}/home`, req.url))
  }

  // 他のパスがロケールを含まない場合も補完
  if (!pathname.startsWith(`/${locale}`)) {
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url))
  }
}
