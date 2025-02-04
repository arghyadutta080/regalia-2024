/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Heading from "../common/Heading";
import { events } from "@/utils/constants/Events";

import Image from "next/image";
import { EventCard } from "../event/EventCard";
import { clickSound } from "@/utils/functions";
import { Button } from "../ui/moving-border";

const Events = () => {
  const router = useRouter();

  const [hover, setHover] = useState(false);
  return (
    <div className="relative  w-full lg:mt-10">
      <div className="mx-auto my-5 flex flex-col items-center justify-center gap-10">
        <Heading text="Events" />
        <Link target="_blank" href="https://drive.google.com/file/d/1aa7t9-pvrXudDaFqgOr7JO5vepqeX8Kj/view?usp=sharing">
        <Button
        borderRadius="1.75rem"
        className={`text-white px-5 md:px-7 lg:px-10 py-1 md:py-2 lg:py-3 font-retrolight font-semibold text-lg bg-slate-800 hover:scale-95 hover:border-2 `}
        onClick = {clickSound}
      >
       View Events Brochure
      </Button>
        </Link>
        <ul className="oveflow-x-scroll accordion relative mt-[10px] hidden h-full w-full justify-center gap-2 space-x-10 font-hollirood xl:flex">
          {events.map((event, index) => {
            return (
              <li
                onMouseEnter={() => setHover(true)}
                onMouseOut={() => setHover(false)}
                key={index}
                 onClick={() => {
                  clickSound();
                  router.push(`/events/${event.title}`)}}
                 className="hover:cursor-pointer"
              >
                <img
                  src={` ${!hover ? event.hoverImage : event.image} `}
                  height={200}
                  width={200}
                  alt="image"
                  style={{
                    backgroundPosition: "cover",
                  }}
                />
                <div className="content">
                  <span className="flex flex-col items-center justify-around bg-white bg-opacity-10">
                    <div className="py-5">
                      <h2 className="font-got text-center text-xl font-semibold">
                        {event.title}
                      </h2>
                    </div>
                    <Link href={`/events/${event.title}`}>
                    <button className="pb-5 tracking-widest duration-300 hover:scale-105 hover:text-green-300">
                      {`Know More >>`}
                    </button>
                    </Link>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-center gap-16 rounded-md xl:hidden">
          {events.map((event, index) => (
            <div key={index}>
              <EventCard
              link={`/events/${event.title}`}
                title={event.title}
                image={event.image}
                hoverImage={event.hoverImage}
              />
            </div>
          ))}
        </div>
      </div>

      <Image
        src={"/assets/home/guitar.svg"}
        height={240}
        width={400}
        alt=""
        className="absolute right-0  top-20 z-[10]  w-96 md:w-96   lg:-top-10 lg:w-[22vw]"
      />
    </div>
  );
};

export default Events;