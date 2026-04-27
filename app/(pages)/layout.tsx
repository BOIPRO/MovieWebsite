import Footer from "@/compoments/Footer";
import NavBar from "../../compoments/NavBar";
import Providers from "../Provider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <div  className="bg-mainbackground min-h-screen" >
        <NavBar />
        {children}
        <div className="max-w-[200px] mx-auto border border-white/50 mt-6"></div>
        <Footer />
      </div>
    </Providers>
  );
}
