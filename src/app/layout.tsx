import { Inter } from "next/font/google";
import "./globals.css";
import { constructMetaData } from "@/utils";
import { Footer, Navbar } from "@/components/common";
import SessionProvider from "@/components/common/SessionProvider";
import Cursor from "@/components/common/Cursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetaData();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + "cursor-auto"}>
      <Navbar />
        {children}
        <Footer />
        <SessionProvider />
      </body>
    </html>
  );
}
