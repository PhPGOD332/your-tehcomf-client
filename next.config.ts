import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tehcomf.ru',
        pathname: '/images/**',
      }
    ]
  }
};

export default nextConfig;
