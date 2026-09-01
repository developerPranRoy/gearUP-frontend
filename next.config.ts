import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  experimental: {
    turbopack: {
      root: __dirname,
    },
  },
};

export default nextConfig;
