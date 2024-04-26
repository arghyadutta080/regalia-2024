"use client";
import React from "react";

import Image from "next/image";

import Heading from "../common/Heading";
import { partnerType, sponsors } from "@/utils/constants/sponsors";
import SparkleComponent from "../ui/SparkleComponent";
import { BackgroundGradient } from "../ui/background-gradient";
const SponsorCard = ({ name, logo, type }: partnerType) => {
  return (
    <BackgroundGradient className="relative flex h-[320px] w-[300px] flex-col items-center justify-center p-8">
      <div className=" flex flex-col items-center gap-8 ">
        <Image
          src={logo}
          width={250}
          height={0}
          alt="partner"
          className="rounded-xl"
        />
        <h1 className=" font-hollirood text-xl font-semibold tracking-widest ">
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
      className="mx-auto flex flex-col items-center justify-center gap-10 py-14"
    >
      <div className="mx-auto my-5 flex flex-col items-center justify-center gap-10">
        <Heading text="Sponsors" />
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
