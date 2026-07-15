import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Eliminuje render-blocking <link rel="stylesheet"> zamieniajac je na
    // inline <style> w HTML. Jedyna oficjalna opcja Next.js 15 dzialajaca
    // z App Router (optimizeCss/critters NIE dziala z App Router - streaming
    // jest niekompatybilny z tym jak critters przetwarza HTML). Wciaz
    // oznaczone jako eksperymentalne przez zespol Next.js, ale dla stron na
    // Tailwind (male, atomowe bundle CSS) kompromis sie oplaca - mediana
    // poprawy FCP ok. 400ms wg danych z produkcji innych stron.
    inlineCss: true,
  },
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