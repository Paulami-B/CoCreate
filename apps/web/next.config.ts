import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: ( config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    return config
  },
  images: {
    domains: ['img.freepik.com']
  }
};

export default nextConfig;
