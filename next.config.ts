import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.geeksforgeeks.org',
      },
    ],
  },

  /* config options here */
};

export default nextConfig;
