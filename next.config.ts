import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Wlaczone tymczasowo do diagnostyki: bez tego duze wlasne chunki JS
  // pokazuja sie w Chrome DevTools Performance jako zminifikowane hashe
  // (np. "4bd1b696-...js:1:163563") bez nazwy funkcji/komponentu - nie da
  // sie ustalic co konkretnie zjada czas watku glownego przed LCP.
  productionBrowserSourceMaps: true,
  images: {
    qualities: [25, 50, 75, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.licdn.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;