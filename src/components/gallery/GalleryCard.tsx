"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BackgroundGradient } from "../ui/background-gradient";

const GalleryCard = ({ photo }: { photo: string }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <BackgroundGradient className="relative  rounded-[22px]">
      <div
        className="relative  transform overflow-hidden 
          rounded-2xl  transition-all duration-500 ease-in-out hover:scale-105 
          "
      >
        <Image
          src={photo}
          alt="image"
          width={500}
          height={500}
          className="h-full  w-full rounded-xl object-contain object-center"
          style={{}}
          onLoad={() => setLoaded(true)}
        />
        {!loaded && (
          <div className="absolute left-0 top-0 h-full w-full animate-pulse bg-gray-100"></div>
        )}
      </div>
    </BackgroundGradient>
  );
};

export default GalleryCard;