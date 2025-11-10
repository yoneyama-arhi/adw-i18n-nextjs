// ADW_i18n_nextjs/middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const LOCALES = ['en', 'ja', 'zh'] as const;
const DEFAULT_LOCALE = 'en';

// NOTE: ここを書き換えれば、i18n対象外のトップレベルも制御できます
const TOP_LEVEL_NO_LOCALE = ['about', 'contact', 'collections'] as const;

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const path = url.pathname;

  // -------------------------------
  // 1) 静的ファイルは完全バイパス（早期return）
  // -------------------------------
  // - /_next/*：Next.jsビルド成果物
  // - /images/*：public/images の配信
  // - /favicon.ico, /robots.txt, /sitemap.xml など
  // - 画像/CSS/JS/フォント等の拡張子を持つもの
  if (
    path.startsWith('/_next/') ||
    path.startsWith('/images/') ||
    path === '/favicon.ico' ||
    path === '/robots.txt' ||
    path === '/sitemap.xml' ||
    path === '/manifest.webmanifest' ||
    path === '/apple-touch-icon.png' ||
    // 任意で public/fonts 等を直配信している場合は以下を増やす
    path.startsWith('/fonts/') ||
    // 拡張子が付いている静的ファイルはすべて通す
    /\.(?:png|jpe?g|gif|webp|svg|ico|avif|bmp|txt|xml|json|map|css|js|mjs|woff2?|ttf|otf)$/i.test(
      path
    )
  ) {
    return NextResponse.next();
  }

  // -------------------------------
  // 2) i18n リダイレクト
  // -------------------------------

  // "/" → "/en/home"
  if (path === '/') {
    const next = url.clone();
    next.pathname = `/${DEFAULT_LOCALE}/home`;
    return NextResponse.redirect(next);
  }

  // "/en" | "/ja" | "/zh" → "/{locale}/home"
  if (LOCALES.some((l) => path === `/${l}`)) {
    const locale = path.slice(1);
    const next = url.clone();
    next.pathname = `/${locale}/home`;
    return NextResponse.redirect(next);
  }

  // 既にロケール付き（/en/... 等）はそのまま通す
  const first = path.split('/')[1];
  if ((LOCALES as readonly string[]).includes(first)) {
    return NextResponse.next();
  }

  // ロケール無しのトップレベル（/about, /contact, /collections など）は defaultLocale へ付与
  if (
    (TOP_LEVEL_NO_LOCALE as readonly string[]).some(
      (seg) => path === `/${seg}` || path.startsWith(`/${seg}/`)
    )
  ) {
    const next = url.clone();
    next.pathname = `/${DEFAULT_LOCALE}${path}`;
    return NextResponse.redirect(next);
  }

  // それ以外は通す
  return NextResponse.next();
}

// -------------------------------
// 3) ミドルウェア適用範囲（静的系は除外）
// -------------------------------
export const config = {
  matcher: [
    // _next / images / 各種静的ファイルは対象外
    '/((?!_next|images|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|apple-touch-icon.png|fonts/|.*\\..*).*)',
  ],
};

