import { Inter } from "next/font/google";

import "./globals.css";
import { constructMetaData } from "@/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetaData();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
