import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.mpgstone.com",
      },
      {
        protocol: "https",
        hostname: "**.mpgstone.co.uk",
      },
    ],
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
};

export default nextConfig;
