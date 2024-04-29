import SparkleHeading from "@/components/common/SparkleHeading";
import GalleryCard from "@/components/gallery/GalleryCard";
import SparkleComponent from "@/components/ui/SparkleComponent";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { constructMetaData } from "@/utils";
import { gallery } from "@/utils/constants/gallery";
import { Metadata } from "next";

import React from "react";

export const metadata: Metadata = constructMetaData({
  title: "Gallery | Regalia 2024",
  description: "Glimpses of Regalia 2023",
})

const galleryPage = () => {
  return (
    <div className="mx-auto max-w-full scroll-smooth">
      
      <ParallaxScroll images={gallery} />
    </div>
  );
};

export default galleryPage
