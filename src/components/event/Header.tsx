"use client";
import React from "react";
import { SparklesCore } from "../ui/sparkles";
import Heading from "../common/Heading";

export default function Header() {
  return (
    <div className="flex h-[8rem] w-full flex-col items-center  overflow-hidden rounded-md bg-transparent mt-12">
      {/* <h1 className="relative z-20 text-center font-annabel text-xl font-bold text-regalia md:text-3xl lg:text-5xl">
        Events
      </h1> */}
      <Heading text="Events" />
      <div className="relative h-20 w-[40rem]">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-yellow-400 to-transparent blur-sm" />
        <div className="absolute inset-x-20 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-regalia to-transparent" />
        <div className="absolute inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-yellow-300 to-transparent blur-sm" />
        <div className="absolute inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1500}
          className="h-full w-full rounded-full "
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 h-1/2 w-1/2 [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,yellow)]"></div>
      </div>
    </div>
  );
}
