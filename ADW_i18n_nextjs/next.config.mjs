/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { typedRoutes: true },
  i18n: {
    locales: ['en', 'ja', 'zh'],
    defaultLocale: 'en',
    localeDetection: true
  }
};
export default nextConfig;
