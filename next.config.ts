import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's4.anilist.co',
        port: '',
        pathname: '/file/anilistcdn/**',
      },  
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/bemovie/:path*',
        destination: 'https://bemovie-737r.onrender.com/:path*',
      },
    ];
  },
};

export default nextConfig;
