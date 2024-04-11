"use client";
import React from "react";
import { SparklesCore } from "../ui/sparkles";
import SparkleComponent from "../ui/SparkleComponent";

export default function Header() {
  return (
    <div className="flex h-[8rem] w-full flex-col items-center  overflow-hidden rounded-md bg-transparent mt-12">
      <h1 className="relative z-20 text-center font-annabel text-xl font-bold text-regalia md:text-3xl lg:text-5xl">
        Events
      </h1>
      <SparkleComponent/>
    </div>
  );
}
