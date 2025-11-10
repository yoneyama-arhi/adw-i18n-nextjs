// ADW_i18n_nextjs/middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const locales = ['en', 'ja', 'zh'] as const;
const defaultLocale = 'en' as const;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ------------- バイパス（静的ファイルは通す） -------------
  // _next や画像、アイコン、sitemap などはミドルウェア対象外
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') || // ← これが重要
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/apple-touch-icon.png' ||
    pathname === '/manifest.webmanifest' ||
    // 拡張子付き（.jpg/.png/.css/.js/フォント等）は全部バイパス
    /\.(?:png|jpe?g|gif|webp|svg|ico|txt|xml|json|map|css|js|woff2?|ttf)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // ------------- i18n リダイレクト -------------
  // "/" → "/en/home"
  if (pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = `/${defaultLocale}/home`;
    return NextResponse.redirect(url);
  }

  // "/en" | "/ja" | "/zh" → "/{locale}/home"
  if (locales.some((l) => pathname === `/${l}`)) {
    const l = pathname.slice(1);
    const url = req.nextUrl.clone();
    url.pathname = `/${l}/home`;
    return NextResponse.redirect(url);
  }

  // "/about" などロケール無しのトップレベルは defaultLocale を付与
  const noLocale = ['about', 'contact', 'collections'] as const;
  if (noLocale.some((s) => pathname === `/${s}` || pathname.startsWith(`/${s}/`))) {
    const url = req.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // 既にロケール付きのパスはそのまま通過
  const first = pathname.split('/')[1];
  if ((locales as readonly string[]).includes(first)) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

// ミドルウェアの適用対象（静的系は除外）
export const config = {
  matcher: [
    '/((?!_next|images|favicon.ico|robots.txt|sitemap.xml|apple-touch-icon.png|manifest.webmanifest).*)',
  ],
};
