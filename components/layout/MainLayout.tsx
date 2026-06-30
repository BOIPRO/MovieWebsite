'use client';

import { usePathname } from 'next/navigation';
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";

interface Props {
    user : {
        username : string,
    },
     children : React.ReactNode
}

export default function MainLayoutWrapper({user,children }: Props) {
  const pathname = usePathname();
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