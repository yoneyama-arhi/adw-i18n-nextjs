import { NextResponse, type NextRequest } from 'next/server'

export const config = {
  matcher: ['/((?!_next/|favicon.ico|robots.txt|sitemap.xml).*)']
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const locales = ['en','ja','zh']

  // If path already has a known locale prefix, continue
  const hasLocale = locales.some(l => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  if (hasLocale) return NextResponse.next()

  // Read cookie; if present, redirect into that locale
  const pref = req.cookies.get('NEXT_LOCALE')?.value
  if (pref && locales.includes(pref)) {
    const url = req.nextUrl.clone()
    url.pathname = `/${pref}${pathname === '/' ? '/home' : pathname}`
    return NextResponse.redirect(url)
  }

  // Otherwise show language chooser
  if (pathname === '/') return NextResponse.next()

  // Fallback to default 'en'
  const url = req.nextUrl.clone()
  url.pathname = `/en${pathname}`
  return NextResponse.rewrite(url)
}
