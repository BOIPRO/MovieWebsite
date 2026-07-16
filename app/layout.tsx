import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import "@fortawesome/fontawesome-svg-core/styles.css";
import Providers from "./Provider";
import {Roboto } from 'next/font/google'
const roboto = Roboto({ 
  weight: ['400', '500', '700'], // BẮT BUỘC phải chọn weight đối với Roboto
  subsets: ['latin', 'vietnamese'], 
});
import "./globals.css";
import MainLayoutWrapper from "@/components/layout/MainLayout";
import { cookies } from "next/headers";
async function fetchAuthData() {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  // 1. Gọi API Refresh để lấy accessToken mới
  const refreshRes = await fetch(`${process.env.API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Cookie': cookieString },
  });

  if (!refreshRes.ok) return { user: null, accessToken: null };
  const { accessToken } = await refreshRes.json();
  const userRes = await fetch(`${process.env.API_URL}/auth/me`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`, 
    },
  });

  if (!userRes.ok) return { user: null, accessToken: null };
  const user = await userRes.json();
  return { user, accessToken };
}

export const metadata: Metadata = {
  title: "BMovie",
  description: "Xem tất cả anime yêu thích",
  icons : [
    {
      url : '/icons/BMovie.svg',
      type: 'image/svg+xml'
    }
  ]
};
export default async function  RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const {user,accessToken} = await fetchAuthData();
  return (
    <html
      lang="en">
      <body  className = {`bg-black flex flex-col px-2 w-screen ${roboto.className}`}>
          <Providers>
                <MainLayoutWrapper user = {user} accessToken = {accessToken} >{children}</MainLayoutWrapper>
          </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
