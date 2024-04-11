"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FadeIn } from "react-slide-fade-in";

const Hero = () => {
  return (
    <div className="flex flex-col items-center font-annabel">
      <div className="relative mt-5  flex w-full flex-row  gap-10   max-lg:items-center">
        <Image src={"/assets/home/hero.svg"} height={500} width={1000} alt="" />
        <div className=" absolute -bottom-[4rem] hidden flex-col items-start gap-4 max-xl:mx-auto max-xl:w-full max-xl:text-center xl:bottom-60 xl:right-36 xl:flex">
          <FadeIn
            from="left"
            positionOffset={200}
            triggerOffset={0}
            delayInMilliseconds={80}
          >
            <div className="flex flex-row items-end gap-10">
              <Link href={"https://rcciit.org/"} target="_blank">
                <Image
                  src="/assets/home/rcc.svg"
                  height={40}
                  width={250}
                  alt="rcc"
                />
              </Link>
             
            </div>
            <h1 className=" font-hollirood text-4xl">presents</h1>
          </FadeIn>
          <FadeIn
            from="bottom"
            positionOffset={200}
            triggerOffset={0}
            delayInMilliseconds={80}
          >
            <div className=" avatar flex flex-col">
              <div className="flex-row text-3xl md:text-5xl xl:flex xl:self-end xl:text-5xl">
                2k24
              </div>
              <h1 className="text-4xl  text-white lg:text-9xl ">Regalia</h1>
            </div>
          </FadeIn>
        </div>

        <Image
          src={"/assets/home/guitar.svg"}
          height={240}
          width={400}
          alt=""
          className="absolute  right-0 w-40 md:top-20 md:w-72 lg:top-0 lg:w-96"
        />
      </div>
      <div className="-mt-5 flex flex-row flex-wrap items-center justify-evenly gap-10 xl:hidden">
        {/* <div className="flex flex-col gap-1">
        <Link href={"https://rcciit.org/"} target="_blank">
              <Image
                src="/assets/home/rcc.svg"
                height={40}
                width={100}
                alt="rcc"
              />
            </Link>
            <h1 className=" text-xl">Presents</h1>
        </div>
      */}
        <div className="  flex flex-col ">
          <div className="flex-row text-3xl md:text-5xl xl:flex xl:self-end xl:text-5xl">
            2k24
          </div>
          <h1 className="text-4xl text-white md:text-6xl lg:text-9xl ">
            Regalia
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
