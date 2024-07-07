"use client";
import React from "react";

import Image from "next/image";

import Heading from "../common/Heading";
import { partnerType, sponsors } from "@/utils/constants/sponsors";
import SparkleComponent from "../ui/SparkleComponent";
import { BackgroundGradient } from "../ui/background-gradient";
import { Button } from "../ui/moving-border";
import { clickSound } from "@/utils/functions";
import Link from "next/link";
const SponsorCard = ({ name, logo, type }: partnerType) => {
  return (
    <BackgroundGradient className="relative flex h-[350px] w-[300px] flex-col items-center justify-center p-8">
      <div className=" flex flex-col items-center gap-8 ">
        <Image
          src={logo}
          width={250}
          height={0}
          alt="partner"
          className="rounded-xl"
        />
        <h1 className=" font-hollirood text-center text-xl font-semibold tracking-widest ">
          {type}
        </h1>
      </div>
    </BackgroundGradient>
  );
};
const Sponsors = () => {
  return (
    <div
      id="sponsors"
      className="mx-auto flex flex-col xl:w-[70%] items-center justify-center gap-10 py-14"
    >
      <div className="mx-auto my-5 flex flex-col items-center justify-center gap-10">
        <Heading text="Sponsors" />
        <Link target="_blank" href="https://drive.google.com/file/d/12ioxUo3T7jbVruX5KEj1gvLgiDRZc2U8/view?usp=sharing">
        <Button
        borderRadius="1.75rem"
        className={`text-white px-5 md:px-7 lg:px-10 py-1 md:py-2 lg:py-3 font-retrolight font-semibold text-lg bg-slate-800 hover:scale-95 hover:border-2 `}
        onClick = {clickSound}
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
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
