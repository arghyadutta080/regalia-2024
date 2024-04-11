import Link from "next/link";
import React from "react";
import {
  TbSquareRoundedMinusFilled,
  TbSquareRoundedPlusFilled,
} from "react-icons/tb";
import LinkForm from "./LinkForm";
import { linkType } from "@/lib/types/event";

const LinkChip = ({
  name,
  link,
  index,
  handleAddLink,
  handleRemoveLink,
  isLinkFormOpen,
  setIsLinkFormOpen,
}: {
  name: string;
  link: string;
  index: number;
  isLinkFormOpen: boolean;
  setIsLinkFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddLink: (link: linkType) => void;
  handleRemoveLink: (index: number) => void;
}) => {
  return (
    <div className="flex flex-row flex-wrap items-center  gap-2 rounded-xl border border-[#1a8fdd] px-4 py-1 font-sans">
      <h1 className="text-sm font-semibold  text-white">{name}</h1>
      <Link
        target="_blank"
        className="text-xs font-medium text-violet-300"
        href={link}
      >
        {link}
      </Link>
      <div className="flex flex-row items-center gap-1">
        {
          <TbSquareRoundedPlusFilled
            onClick={() => setIsLinkFormOpen(true)}
            className="cursor-pointer rounded-full font-semibold"
            size={30}
          />
        }
        {
          <TbSquareRoundedMinusFilled
            onClick={() => handleRemoveLink(index)}
            className="cursor-pointer rounded-full font-semibold"
            size={30}
          />
        }
      </div>
      <LinkForm
        isOpen={isLinkFormOpen}
        onClose={() => setIsLinkFormOpen(false)}
        handleAddLink={handleAddLink}
      />
    </div>
  );
};

export default LinkChip;
