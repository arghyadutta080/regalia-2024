"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/utils/cn";
import "./styles.css";
import { BackgroundGradient } from "./background-gradient";
import SparkleComponent from "./SparkleComponent";
import { Footer } from "../common";

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef, // remove this if your container is not fixed height
    offset: ["start start", "end start"], // remove this if your container is not fixed height
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <div
      className={cn(
        "h-auto w-full items-start overflow-hidden md:overflow-y-auto lg:h-[45rem] ",
        className,
      )}
      ref={gridRef}
    >
      <div className="mt-12 flex h-[8rem] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-transparent">
        <h1 className="relative z-20 text-center font-annabel text-4xl font-bold text-regalia md:text-3xl lg:text-5xl">
          Gallery
        </h1>
        <div className="text-center">
          <SparkleComponent />
        </div>
      </div>
      <div
        className="mx-auto grid max-w-full grid-cols-1 items-start gap-10 px-10 py-0 md:py-4 md:grid-cols-2 md:px-20 md:pb-40 lg:grid-cols-3"
        ref={gridRef}
      >
        <div className="grid gap-10">
          {firstPart.map((el, idx) => (
            <motion.div
              style={{ y: translateFirst }} // Apply the translateY motion value here
              key={"grid-1" + idx}
            >
              <BackgroundGradient>
                <Image
                  src={el}
                  className="!m-0 w-full gap-10 rounded-3xl object-cover object-left-top !p-0 h-64"
                  height="4000"
                  width="6000"
                  alt="thumbnail"
                />
              </BackgroundGradient>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((el, idx) => (
            <motion.div style={{ y: translateSecond }} key={"grid-2" + idx}>
              <BackgroundGradient>
                <Image
                  src={el}
                  className="!m-0 w-full gap-10 rounded-3xl object-cover object-left-top !p-0 h-64"
                  height="4000"
                  width="6000"
                  alt="thumbnail"
                />
              </BackgroundGradient>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((el, idx) => (
            <motion.div style={{ y: translateThird }} key={"grid-3" + idx}>
              <BackgroundGradient>
                <Image
                  src={el}
                  className="!m-0 w-full gap-10 rounded-3xl object-cover object-left-top !p-0 h-64"
                  height="4000"
                  width="6000"
                  alt="thumbnail"
                />
              </BackgroundGradient>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
