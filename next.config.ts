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
        destination: `${process.env.API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
