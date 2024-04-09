import React from "react";

const CustomToast = ({ message, icon }: { message: string; icon: any }) => {
  return (
    <div className="border-y-regalia flex min-w-[300px] max-w-[400px] flex-row items-center gap-2 rounded-xl border bg-transparent p-2 text-white">
      {icon} {message}
    </div>
  );
};

export default CustomToast;
