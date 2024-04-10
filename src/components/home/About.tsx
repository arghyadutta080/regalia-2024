"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FadeIn } from "react-slide-fade-in";

const About = () => {
  return (
    <div className="flex flex-col items-center font-annabel">
        <div className="flex flex-col items-center justify-center h-full w-full md:w-1/2 xl:w-1/2 px-16">
          <h1
            className="text-6xl font-semibold text-white py-3 text-left"
            style={{
              letterSpacing: "1px",
              textShadow: "2px 5px 0px rgba(118,99,99,1)",
            }}
          >
            About
          </h1>
          <h2 className="text-lg  text-white py-2 text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.            .
          </h2>
          {/* <a
            className="button mt-6"
            href="https://www.rcciit.org/"
            target="_blank"
            rel="noreferrer"
          >
            Know More About RCCIIT !
          </a> */}
        </div>
        {/* <div className="my-8">
        <Image
          src={"/assets/home/guitar.svg"}
          height={240}
          width={400}
          alt=""
          className="absolute  left-0 w-40 md:top-20 md:w-72 lg:top-0 lg:w-96"
        />
        </div> */}
      
      
    </div>
  );
};

export default About;
