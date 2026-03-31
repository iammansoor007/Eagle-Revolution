import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true, // If they are using local imports or want simple behavior
  },
};

export default nextConfig;
