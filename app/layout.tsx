import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import "@fortawesome/fontawesome-svg-core/styles.css";
import Providers from "./Provider";
import {Roboto } from 'next/font/google'
const roboto = Roboto({ 
  weight: ['400', '500', '700'], 
  subsets: ['latin', 'vietnamese'], 
});
import "./globals.css";
import MainLayoutWrapper from "@/components/layout/MainLayout";
// SEO
export const metadata: Metadata = {
  title: {
    default: "BMovie - Xem Anime Online Miễn Phí Không Quảng Cáo",
    template: "%s | BMovie",
  },

  description:
    "BMovie là website xem anime online miễn phí, cập nhật anime mới nhất với chất lượng cao, tốc độ nhanh và không quảng cáo.",

  keywords: [
    "anime",
    "xem anime",
    "anime online",
    "anime vietsub",
    "anime miễn phí",
    "phim anime",
    "BMovie",
  ],

  authors: [
    {
      name: "BMovie",
    },
  ],

  creator: "BMovie",

  icons: {
    icon: [
      {
        url: "/icons/BMovie.svg",
        type: "image/svg+xml",
      },
    ],
  },

  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://movie-website-red-tau.vercel.app/",
    siteName: "BMovie",

    title:
      "BMovie - Xem Anime Online Miễn Phí Không Quảng Cáo",

    description:
      "Xem anime vietsub miễn phí, cập nhật anime mới nhất nhanh chóng tại BMovie.",

    images: [
      {
        url: "/icons/BMovie.svg",
        width: 512,
        height: 512,
        alt: "BMovie Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "BMovie - Xem Anime Online Miễn Phí",

    description:
      "Website xem anime online miễn phí, tốc độ nhanh, không quảng cáo.",

    images: [
      "/icons/BMovie.svg",
    ],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,

      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://movie-website-red-tau.vercel.app/",
  },
};
// async function fetchAuthData() {
//   const cookieStore = await cookies();
//   const cookieString = cookieStore.toString();

//   // 1. Gọi API Refresh để lấy accessToken mới
//   const refreshRes = await fetch(`${process.env.API_URL}/auth/refresh`, {
//     method: 'POST',
//     headers: { 'Cookie': cookieString },
//   });

//   if (!refreshRes.ok) return { user: null, accessToken: null };
//   const { accessToken } = await refreshRes.json();
//   const userRes = await fetch(`${process.env.API_URL}/auth/me`, {
//     headers: {
//       'Authorization': `Bearer ${accessToken}`, 
//     },
//   });

//   if (!userRes.ok) return { user: null, accessToken: null };
//   const user = await userRes.json();
//   console.log(user)
//   return { user, accessToken };
// }

export default async function  RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    // const {user,accessToken} = await fetchAuthData();
  return (
    <html
      lang="en">
      <body  className = {`bg- flex flex-col w-screen ${roboto.className}`}>
          <Providers>
                <MainLayoutWrapper >{children}</MainLayoutWrapper>
          </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
