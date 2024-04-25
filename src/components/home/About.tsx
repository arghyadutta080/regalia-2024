"use client";
import Image from "next/image";
import React from "react";
import Heading from "../common/Heading";

const About = () => {
  return (
    <div
      className="relative mx-auto flex mb-20  w-full  flex-col items-center  gap-5 "
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
        <div className=" relative top-20 flex h-full self-end   flex-col items-center gap-10 text-start font-hollirood text-sm tracking-widest    md:text-lg   lg:text-xl ">
          <div className="w-[80%] md:w-[70%] lg:w-[60%] 2xl:w-[50%] lg:self-end">
          <Heading text="About" />
          <p className="flex mt-5 flex-row self-end xl:tracking-widest lg:leading-relaxed">
            Regalia is the annual cultural fest of RCCIIT, which is a highly
            anticipated event among the college students and faculties. The fest
            is scheduled to be held in the month of May. Regalia 2024 fest
            promises to be an exciting and colorful extravaganza of music,
            dance, drama, fashion show and more . There will be a wide range of
            events and activities, including a fashion show, a group dance
            competition, a battle of bands, a singing competition and more. The
            fest will also feature performances by renowned artists and
            celebrities. The organizing committee of Regalia 2024 has put in
            months of effort and planning to ensure that the fest is a grand
            success and provides a memorable experience for all participants.
            Regalia 2024 promises to be a celebration of art, culture,
            creativity, and talent.
          </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default About;
