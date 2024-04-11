"use client";
import React from "react";
import { BackgroundGradient } from "../ui/background-gradient";
import Image from "next/image";
import Link from "next/link";
import { clickSound } from "@/utils/functions";

type Props = {
  title: string;
  image: string;
  hoverImage: string;
};

export function EventCard({ title, image, hoverImage }: Props) {
  return (
    <div className="mb-10 md:mb-0">
      <Link
        //  href={`/events/${title.toLowerCase()}`}
        href={"/events"}
        className=" cursor-pointer"
        onClick={clickSound}
      >
        <BackgroundGradient className="relative max-w-sm rounded-[22px]">
          <Image
            src={hoverImage}
            alt="image"
            width={200}
            height={200}
            style={{ objectFit: "fill", borderRadius: "22px" }}
            className=" h-96 w-auto object-cover"
          />
          <p className="absolute mt-5 w-full text-center font-hollirood text-xl text-yellow-400 ">
            {title}
          </p>
        </BackgroundGradient>
      </Link>
    </div>
  );
}
