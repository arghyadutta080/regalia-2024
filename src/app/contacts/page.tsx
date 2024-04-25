"use client";
import SparkleHeading from "@/components/common/SparkleHeading";
import Block from "@/components/contacts/Block";
import { registrationConfirmationEmail } from "@/utils/constants/emails";
import React from "react";

const page = () => {
  
  return (
    <div className="mx-auto my-10 flex flex-col items-center gap-5">
      <SparkleHeading text="Contact Us" />
      <Block />
    </div>
  );
};

export default page;
