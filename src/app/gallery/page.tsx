import SparkleComponent from '@/components/ui/SparkleComponent';
import { ParallaxScroll } from '@/components/ui/parallax-scroll';
import { images } from '@/utils/constants/gallery';
import React from 'react'

const page = () => {
  return (
    <div className="mx-auto max-w-full md:px-20">
      <div className="mt-12 flex h-[8rem] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-transparent">
        <h1 className="relative z-20 text-center font-annabel text-4xl font-bold text-regalia md:text-3xl lg:text-5xl">
          Gallery
        </h1>
        <div className="text-center">
          <SparkleComponent />
        </div>
      </div>
      <ParallaxScroll images={images} />
    </div>
  );
}

export default page