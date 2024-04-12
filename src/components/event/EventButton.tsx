import React from "react";

type Props = {
  name: string;
  onClick: () => void;
};

const EventButton = ({ name, onClick }: Props) => {
  return (
    <>
      <button
        className="relative inline-flex h-12 overflow-hidden rounded-full p-1 my-2 md:my-3 font-retrolight focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        onClick={onClick}
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FEC923_0%,#0917F5_50%,#FEC923_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm md:text-lg font-medium text-white backdrop-blur-3xl">
          {name}
        </span>
      </button>
    </>
  );
};

export default EventButton;
