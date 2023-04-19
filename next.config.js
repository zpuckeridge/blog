/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "static.ghost.org",
      "res.cloudinary.com",
      "i.scdn.co",
    ],
  },
};

module.exports = nextConfig;
