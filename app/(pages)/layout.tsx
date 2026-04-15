import NavBar from "../../compoments/NavBar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="bg-mainbackground  ">
        <NavBar />
        {children}
      </div>
  );
}
