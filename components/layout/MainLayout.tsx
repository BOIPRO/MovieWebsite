'use client';

import { usePathname } from 'next/navigation';
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";
import { useAuthStore } from '@/lib/services/useAuthStore';
import { useEffect } from 'react';
interface Props {
    user : {
        username : string,
    },
    accessToken : string,
     children : React.ReactNode
}

export default function MainLayoutWrapper({user,accessToken,children }: Props) {
  const pathname = usePathname();
  useEffect(() => {
    if (accessToken) {
      useAuthStore.getState().setAccessToken(accessToken);
    }
  }, [accessToken]);
  const isAuthPage = pathname === '/login' || pathname === '/register';
  return (
    <>
      <main className="min-h-screen w-screen  font-extrabold  bg-[#010202] text-white">
        
        {!isAuthPage && <NavBar user = {user} />}
        
        {children}
        {!isAuthPage && <Footer />}
        </main>
      
    </>
  );
}