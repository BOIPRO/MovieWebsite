import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's4.anilist.co', // Tên miền chứa ảnh của AniList
        port: '',
        pathname: '/file/anilistcdn/**',
      },
    ],
  },
};

export default nextConfig;
