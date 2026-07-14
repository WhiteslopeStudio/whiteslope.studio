import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [25, 50, 75, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.licdn.com",
      },
    ],
  },
  eslint: {
    i