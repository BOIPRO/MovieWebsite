'use client';

import { usePathname } from 'next/navigation';
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";
import { useAuthStore } from '@/lib/services/useAuthStore';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
interface Props {
     children : React.ReactNode
}

export default function MainLayoutWrapper({children }: Props) {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  // useEffect(() => {
  //   if (accessToken) {
  //     useAuthStore.getState().setAccessToken(accessToken);
  //   }
  //   if (user)
  // queryClient.setQueryData(['userProfile'], user);
  // }, [accessToken]);
  const isAuthPage = pathname === '/login' || pathname === '/register';
  return (
    <>
      <main className="min-h-screen   font-extrabold  bg-[#010202] text-white">
        
        {!isAuthPage && <NavBar />}
        
        {children}
        {!isAuthPage && <Footer />}
        </main>
      
    </>
  );
}