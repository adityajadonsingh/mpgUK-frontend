import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.mpgstone.(com|co.uk)",
      },
    ],
    formats: ["image/avif", "image/webp"], // modern formats
    deviceSizes: [320, 480, 768, 1024, 1200, 1600], // responsive breakpoints
    minimumCacheTTL: 60, // caching
  },
   experimental: {
    optimizeCss: true,
    optimizePackageImports: ["swiper"],
  },
  async redirects() {
    return [
      {
        source: "/product-category/:category/page/1",
        destination: "/product-category/:category/",
        permanent: true,
      },
    ];
  },
   async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|ts|css|woff2?)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  reactStrictMode: true,
};

export default nextConfig;
