import SparkleComponent from '@/components/ui/SparkleComponent';
import { ParallaxScroll } from '@/components/ui/parallax-scroll';
import { images } from '@/utils/constants/gallery';
import React from 'react'

const galleryPage = () => {
  return (
    <div className="mx-auto max-w-full ">
      
      <ParallaxScroll images={images} />
    </div>
  );
}

export default galleryPage