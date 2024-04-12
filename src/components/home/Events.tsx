/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Heading from "../common/Heading";
import { events } from "@/utils/constants/Events";

import Image from "next/image";
import { EventCard } from "../event/EventCard";

const Events = () => {
  const router = useRouter();

  const [hover, setHover] = useState(false);
  return (
    <div className="relative  w-full ">
      <div className="mx-auto flex max-w-full flex-col gap-10">
        <Heading text="Events" />

        <ul className="oveflow-x-scroll accordion relative mt-[10px] hidden h-full w-full justify-center gap-2 space-x-10 font-hollirood xl:flex">
          {events.map((event, index) => {
            return (
              <li
                onMouseEnter={() => setHover(true)}
                onMouseOut={() => setHover(false)}
                key={index}
                // onClick={() => router.push(`/events/${event.title}`)}
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
                    {/* <Link href={`/events/${event.title}`}> */}
                    <button className="pb-5 tracking-widest duration-300 hover:scale-105 hover:text-green-300">
                      {`Know More >>`}
                    </button>
                    {/* </Link> */}
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
