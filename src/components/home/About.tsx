"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";


const About = () => {
  return (
    <div className="flex flex-row justify-center mx-auto w-full py-10 min-h-[40vh] items-center font-annabel relative">
      
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
          
        </div>
        <div className="my-8">
        <Image
          src={"/assets/home/about_guitar.png"}
          height={240}
          width={250}
          alt=""
          className="absolute  left-0  md:top-0 lg:top-50 "
        />
        </div>
      
      
    </div>
  );
};

export default About;
