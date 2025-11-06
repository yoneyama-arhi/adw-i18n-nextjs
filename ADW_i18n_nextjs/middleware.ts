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

  const locale = req.cookies.get('NEXT_LOCALE')?.value || 'en'
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${locale}/home`, req.url))
  }

  if (!pathname.startsWith(`/${locale}`)) {
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url))
  }
}
