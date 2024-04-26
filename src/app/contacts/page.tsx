"use client";
import SparkleHeading from "@/components/common/SparkleHeading";
import Block from "@/components/contacts/Block";

import React from "react";

const page = () => {
  return (
    <div className="mx-auto my-10 flex w-full flex-col items-center gap-5">
      <SparkleHeading text="Contact Us" />
      <Block />
    </div>
  );
};

export default page;
