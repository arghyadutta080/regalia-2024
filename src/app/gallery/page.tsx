import SparkleHeading from "@/components/common/SparkleHeading";
import GalleryCard from "@/components/gallery/GalleryCard";
import SparkleComponent from "@/components/ui/SparkleComponent";
import { constructMetaData } from "@/utils";
import { gallery } from "@/utils/constants/gallery";
import { Metadata } from "next";

import React from "react";

export const metadata: Metadata = constructMetaData({
  title: "Gallery | Regalia 2024",
  description: "Glimpses of Regalia 2023",
})

const page = () => {
  return (
    <div className="mx-auto max-w-full md:px-20 my-10">
      <SparkleHeading text="Gallery" />

      <div className="mx-auto mt-10 grid max-w-[1600px] grid-cols-1 items-center justify-center gap-20 rounded-2xl px-5 py-10 font-sans md:grid-cols-2 md:border-2 shadow-sm shadow-regalia border-regalia md:px-10 md:py-20 lg:grid-cols-3">
        {gallery.map((photo, index) => (
          <GalleryCard photo={photo} key={index} />
        ))}
      </div>
    </div>
  );
};

export default page;
