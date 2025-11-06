// app 直下ではなく、プロジェクトのルートにある middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const LOCALES = ['en', 'ja', 'zh'] as const;
const PUBLIC_FILE = /\.(?:ico|png|jpg|jpeg|gif|svg|webp|avif|css|js|map|txt)$/i;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 静的系・内部パスは対象外にする（無限ループ防止）
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Cookie から希望言語。なければ 'en'
  const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value ?? 'en';
  const locale = LOCALES.includes(cookieLocale as any) ? cookieLocale : 'en';

  // すでに言語プレフィックスが付いているか？
  const hasLocalePrefix = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  // `/` は `${locale}/home` に一度だけ送る
  if (pathname === '/' || pathname === '') {
    return NextResponse.redirect(new URL(`/${locale}/home`, req.url));
  }

  // `/en` → `/en/home`（言語だけのパスはホームへ）
  if (hasLocalePrefix) {
    for (const l of LOCALES) {
      if (pathname === `/${l}`) {
        return NextResponse.redirect(new URL(`/${l}/home`, req.url));
      }
    }
    // `/en/home` や `/en/about` などはそのまま通す
    return NextResponse.next();
  }

  // それ以外（`/about`, `/home` など）には言語を付けて一度だけ送る
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
}

/**
 * middleware を当てる対象を限定（ここが無いと全部に当たりループしやすい）
 * 画像/CSS/JS、_next、api は除外
 */
export const config = {
  matcher: [
    '/((?!_next/|api/|favicon.ico|.*\\.(?:ico|png|jpg|jpeg|gif|svg|webp|avif|css|js|map|txt)$).*)',
  ],
};
