import type { NextConfig } from "next";

import type openNextCloudflareConfig from "./open-next.config";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "i.scdn.co",
        protocol: "https",
      },
      {
        hostname: "image.mux.com",
        protocol: "https",
      },
      {
        hostname: "img.youtube.com",
        protocol: "https",
      },
      {
        hostname: "media.discordapp.net",
        protocol: "https",
      },
      {
        hostname: "cdn.discordapp.com",
        protocol: "https",
      },
      {
        hostname: "x.com",
        protocol: "https",
      },
      {
        hostname: "pbs.twimg.com",
        protocol: "https",
      },
      {
        hostname: "abs.twimg.com",
        protocol: "https",
      },
      {
        hostname: "directus.obambulo.studio",
        protocol: "https",
      },
    ],
  },
  reactStrictMode: true,
} satisfies NextConfig;

export type OpenNextCloudflareConfigRef = typeof openNextCloudflareConfig;

export default nextConfig;
