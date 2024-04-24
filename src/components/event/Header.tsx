"use client";
import React from "react";
import SparkleComponent from "../ui/SparkleComponent";

export default function Header() {
  return (
    <div className="mt-12 flex h-[8rem] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-transparent">
      <h1 className="relative z-20 text-center font-annabel text-4xl font-bold text-regalia md:text-3xl lg:text-5xl">
        Events
      </h1>
      <div className="text-center">
        <SparkleComponent />
      </div>
    </div>
  );
}