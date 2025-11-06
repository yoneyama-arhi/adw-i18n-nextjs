import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED = ['en', 'ja', 'zh'] as const;

/**
 * 振る舞い:
 * - /            → /en/home（Cookie NEXT_LOCALE があればその言語）に 1 回だけリダイレクト
 * - /about       → /en/about（同上）
 * - /en          → /en/home に 1 回だけリダイレクト
 * - /_next/* /api/* や拡張子付き（画像/CSS/JS など）は素通し
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1) 静的/内部/拡張子付きは素通し
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    /\.(?:ico|png|jpg|jpeg|gif|svg|webp|avif|css|js|map|txt)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // 2) クッキーの言語（無ければ en）
  const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value ?? 'en';
  const locale = SUPPORTED.includes(cookieLocale as any) ? cookieLocale : 'en';

  // 3) すでにロケール付きのパスか？
  const hasLocalePrefix = SUPPORTED.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  // 3-1) /en → /en/home（/ja, /zh も同様）
  if (hasLocalePrefix) {
    for (const l of SUPPORTED) {
      if (pathname === `/${l}`) {
        const url = req.nextUrl.clone();
        url.pathname = `/${l}/home`;
        return NextResponse.redirect(url);
      }
    }
    // すでに /{locale}/... ならそのまま通す
    return NextResponse.next();
  }

  // 4) ロケール無しのとき
  const url = req.nextUrl.clone();

  // 4-1) ルート / は /{locale}/home へ
  if (pathname === '/') {
    url.pathname = `/${locale}/home`;
    return NextResponse.redirect(url);
  }

  // 4-2) それ以外は同パス頭にロケールを付与
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

/**
 * 追加のマッチャ（任意）:
 * すべて通した上で静的はコード側で除外しているので省略可。
 * きっちり絞る場合は以下のように設定:
 */
// export const config = {
//   matcher: ['/((?!_next/|api/|.*\\.(?:ico|png|jpg|jpeg|gif|svg|webp|avif|css|js|map|txt)$).*)'],
// };
