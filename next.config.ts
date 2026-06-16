import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [480, 768, 1024, 1280, 1536, 1920, 2560],
    remotePatterns: [],
  },
};

export default nextConfig;
