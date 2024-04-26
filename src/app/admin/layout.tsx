import AdminWrapper from "@/components/admin/AdminWrapper";
import SessionProvider from "@/components/common/SessionProvider";
import { constructMetaData } from "@/utils";
import type { Metadata } from "next";

export const metadata: Metadata = constructMetaData({
  title: "Admin | Regalia 2024",
  description: "Admin Dashboard of Regalia 2024",
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-10">
      <AdminWrapper>{children}</AdminWrapper>
      <SessionProvider />
    </div>
  );
}
