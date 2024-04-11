"use client";
import React from "react";
import SparkleComponent from "../ui/SparkleComponent";
import Heading from "../common/Heading";

export default function Header() {
  return (
    <div className="flex h-[8rem] w-full flex-col items-center  overflow-hidden rounded-md bg-transparent mt-12">
      <Heading text="Events" />
      <SparkleComponent/>
    </div>
  );
}