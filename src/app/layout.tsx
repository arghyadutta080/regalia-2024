import { Inter } from "next/font/google";

import "./globals.css";
import { constructMetaData } from "@/utils";
import { Footer, Navbar } from "@/components/common";


const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetaData();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
        </body>
    </html>
  );
}
