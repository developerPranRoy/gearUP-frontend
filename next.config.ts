import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Providers paste arbitrary image URLs (gear.images: string[] on the
    // backend) — there's no upload/storage service, so we can't allowlist
    // specific hostnames ahead of time.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
