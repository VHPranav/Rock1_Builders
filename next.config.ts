import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 85 for grainy editorial photography — 75 visibly smears the film grain.
    qualities: [75, 85],
  },
};

export default nextConfig;
