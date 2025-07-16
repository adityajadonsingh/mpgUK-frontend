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
};

export default nextConfig;
