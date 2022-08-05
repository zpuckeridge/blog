/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  nextConfig,
};
