import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photographs are served from /public — no remote patterns are needed.
    // AVIF first, WebP as the fallback, for the athlete and facility imagery
    // that will be dropped into data/images.ts.
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
};

export default nextConfig;
