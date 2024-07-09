"use client";
import React from "react";
import Image from "next/image";
import Heading from "../common/Heading";
import { partnerType, sponsors } from "@/utils/constants/sponsors";
import { BackgroundGradient } from "../ui/background-gradient";
import { Button } from "../ui/moving-border";
import { clickSound } from "@/utils/functions";
import Link from "next/link";
const SponsorCard = ({ name, logo, type, link }: partnerType) => {
  return (
    <BackgroundGradient className="relative flex h-[350px] w-[300px] flex-col items-center justify-center p-8">
      <Link
        href={link}
        target="_blank"
        className=" flex flex-col items-center gap-8 "
      >
        <Image
          src={logo}
          width={250}
          height={0}
          alt="partner"
          className="rounded-xl"
        />
        <h1 className=" text-center font-hollirood text-xl font-semibold tracking-widest ">
          {type}
        </h1>
      </Link>
    </BackgroundGradient>
  );
};
const Sponsors = () => {
  return (
    <div
      id="sponsors"
      className="mx-auto flex flex-col items-center justify-center gap-10 py-14 xl:w-[70%]"
    >
      <div className="mx-auto my-5 flex flex-col items-center justify-center gap-10">
        <Heading text="Sponsors" />
        <Link
          target="_blank"
          href="https://drive.google.com/file/d/12ioxUo3T7jbVruX5KEj1gvLgiDRZc2U8/view?usp=sharing"
        >
          <Button
            borderRadius="1.75rem"
            className={`bg-slate-800 px-5 py-1 font-retrolight text-lg font-semibold text-white hover:scale-95 hover:border-2 md:px-7 md:py-2 lg:px-10 lg:py-3 `}
            onClick={clickSound}
          >
            View Sponsorship Brochure
          </Button>
        </Link>

        <div className="flex flex-row flex-wrap items-end justify-center gap-16">
          {sponsors.map((sponsor, index) => {
            return (
              <SponsorCard
                key={index}
                name={sponsor.name}
                logo={sponsor.logo}
                type={sponsor.type}
                link={sponsor.link}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
