import React from "react";
import Link from "next/link";

const AdminTab = ({ name, path }: { name: string; path: string }) => {
  return (
    <Link
      href={path}
      className="bg-regalia border-regalia hover:text-regalia cursor-pointer rounded-xl  border-4 px-5 py-2 text-xs font-semibold text-black hover:bg-white md:px-10 lg:py-3 lg:text-sm xl:text-lg"
    >
      {name}
    </Link>
  );
};
const AdminWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div className="flex flex-row flex-wrap items-center justify-center gap-4 max-md:mt-5 md:gap-10">
        <AdminTab
          name="Edit Events"
          path="/admin/manage-events" />
        <AdminTab
          name="Approve Registrations"
          path="/admin/approve"
        />
      </div>
      {children}
    </div>
  );
};

export default AdminWrapper;
