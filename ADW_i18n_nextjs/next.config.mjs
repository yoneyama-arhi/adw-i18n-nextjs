/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'ja', 'zh'],
    defaultLocale: 'en',
    localeDetection: false,  
  },
  reactStrictMode: true,
};
export default nextConfig;
