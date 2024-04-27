"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.1, 1];
  };

  const rotateDimensions = () => {
    return isMobile ? [10, 0] : [20, 0];
  }

  const rotate = useTransform(scrollYProgress, [0, 1], rotateDimensions());
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [-10, -100]);

  return (
    <div
      className="relative flex h-auto justify-center px-2 md:h-[80rem] lg:h-[70rem] md:px-20 md:pt-20"
      ref={containerRef}
    >
      <div
        className="relative w-full h-fit"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div mx-auto max-w-5xl text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
      }}
      className="mx-auto mt-[-14rem] md:mt-[-3rem] lg:mt-[-2.5rem]   w-full max-w-5xl rounded-[30px]"
    >
      <div className=" h-full w-full overflow-hidden rounded-2xl bg-[#151515] dark:bg-zinc-900 md:rounded-2xl md:p-16 ">
        {children}
      </div>
    </motion.div>
  );
};
