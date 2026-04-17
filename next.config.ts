import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tehcomf.ru',
        pathname: '/images/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 's3.regru.cloud',
        pathname: '/tehcomf-s3/**',
      }
    ]
  }
};

export default nextConfig;
