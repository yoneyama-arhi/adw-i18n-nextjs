import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ADW | Luxury Faux Florals & Botanicals',
  description:
    'ADW — Modern Luxury Faux Florals & Botanicals. Museum-grade arrangements inspired by contemporary design.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ▼ ファビコンの明示指定（?v=2 はキャッシュ破壊用） */}
        <link rel="icon" href="/favicon.ico?v=2" />

        {/* ▼ メタデータ補助 */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} bg-white text-zinc-900`}>
        {children}
      </body>
    </html>
  );
}
