// import AdminWrapper from "@/components/admin/AdminWrapper";
import SessionProvider from "@/components/common/SessionProvider";
import { constructMetaData } from "@/utils";
import type { Metadata } from "next";

export const metadata: Metadata = constructMetaData({
  title: "Entry | TechTrix 2024",
  description: "TechTrix 2024's Events",
});

export default function EntryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex justify-center">
      <main className="h-[800px] w-[500px]">
        {children}
      </main>
      <SessionProvider />
    </div>
  );
}
