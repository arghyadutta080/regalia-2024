"use client";
import React from "react";
import { BackgroundGradient } from "../ui/background-gradient";
import Link from "next/link";
import Image from "next/image";
import { ArtistType } from "@/utils/constants/artists";

const ArtistCard = ({ name, logo, link, date }: ArtistType) => {
  return (
    <div className="relative hover:cursor-pointer mx-md:px-2 flex gap-2 flex-col items-center justify-center">
      <Link
        href={link}
        target="_blank"
        className=" flex flex-col items-center gap-8 "
      >
        <Image
          src={logo}
          width={450}
          height={0}
          alt="partner"
          className=" rounded-xl object-cover"
        />
      </Link>
      <h1 className=" pt-2 text-center text-regalia font-hollirood text-lg font-semibold tracking-widest ">
        {name}
      </h1>
      <h1 className=" text-center font-hollirood text-sm font-semibold tracking-widest ">
        {date}
      </h1>
    </div>
  );
};

export default ArtistCard;
