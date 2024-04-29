"use client";
import React, { use } from "react";
import Link from 'next/link';
import { Button } from "../ui/moving-border";
import { clickSound } from "@/utils/functions";
import { usePathname } from "next/navigation";

type Props = {
  team: {
    category: string;
    path: string;
  }
}

const TeamTab = ({team}: Props) => {

  const pathname = usePathname();
  return (
    <Link href={team.path} className="cursor-pointer">
      <Button
        borderRadius="1.75rem"
        className={`text-white px-5 md:px-7 lg:px-10 py-1 md:py-2 lg:py-3 font-retrolight font-semibold text-lg bg-slate-800 hover:scale-95 hover:border-2 ${ pathname === team.path && 'border-yellow-300 border-2' }`}
        onClick = {clickSound}
      >
        {team.category}
      </Button>
    </Link>
  );
}

export default TeamTab