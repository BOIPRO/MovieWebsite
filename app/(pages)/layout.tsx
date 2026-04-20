import Footer from "@/compoments/Footer";
import NavBar from "../../compoments/NavBar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="bg-mainbackground min-h-screen ">
        <NavBar />
        {children}
        <div className="max-w-[200px] mx-auto border border-white/50 mt-6"></div>
        <Footer />
      </div>
  );
}
