import Footer from "@/compoments/Footer";
import NavBar from "../../compoments/NavBar";
import Providers from "../Provider";
import { cookies } from "next/headers";
import { decodeTokenServer } from "@/helper/decodejwt";
async function getUserInfo() {
  const cookieStore = await cookies()
  const token = cookieStore.get('refreshToken')?.value
  const user = token ? decodeTokenServer(token) : null;
  return user;
  
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserInfo();
  return (
    <Providers>
      <div className="bg-mainbackground min-h-screen" >
        <NavBar user = {user}/>
        {children}
        <div className="max-w-[200px] mx-auto border border-white/50 mt-6"></div>
        <Footer />
      </div>
    </Providers>
  );
}
