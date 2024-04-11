"use client";
import Image from "next/image";
import React from "react";
import Heading from "../common/Heading";

const About = () => {
  return (
    <div className="relative mx-auto flex h-[60vh] md:h-[40vh]  lg:h-[60vh] w-full  flex-col items-center gap-5 "
    id="about"
    >
      <div className="relative mx-auto flex h-auto w-full flex-row items-center justify-center gap-5">
        <div className="absolute -top-20 left-0">
          <Image
            src={"/assets/home/about_guitar.svg"}
            width={340}
            height={240}
            alt=""
          />
        </div>
        <div className="absolute top-20 flex h-full  w-[80%] flex-col items-center gap-10 text-start font-hollirood text-sm tracking-widest md:right-10 md:w-[70%]  md:text-lg lg:right-20 lg:w-[50%] lg:text-xl ">
          <Heading text="About" />
          <p className="flex flex-row self-end">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
     
    </div>
  );
};

export default About;
