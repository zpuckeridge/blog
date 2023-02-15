/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["i.scdn.co", "imagedelivery.net", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
