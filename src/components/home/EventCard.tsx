"use client";

import Image from "next/image";
import Link from "next/link";

const EventCard = ({ event }: { event: any }) => {
  return (
    <>
      <Link href={`/events/${event.id}`}>
        <div
          className="card relative z-[20] w-[300px] font-hollirood cursor-pointer overflow-hidden rounded-md transition-all duration-500
        ease-in-out hover:scale-110 md:h-[250px] md:w-[350px]
        "
        >
          <Image
            src={event.hoverImage}
            alt="football"
            className="h-full w-full object-cover"
            width={0}
            height={0}
          />
          <div className="card-body absolute bottom-[-100%] flex h-full w-full flex-col items-center justify-center bg-[#1f3d4738] px-3 backdrop-blur-[5px] duration-500">
            <h1 className="font-got pt-2 text-center font-semibold text-2xl md:text-3xl">
              {event.title}
            </h1>

            <div className="flex flex-row justify-between gap-5  px-5 pt-3"></div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default EventCard;
