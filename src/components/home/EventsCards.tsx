"use client";

import Image from "next/image";
import Link from "next/link";

const EventCard = ({ event }: { event: any }) => {
  return (
    <>
      <Link href={`/events/${event.id}`}>
        <div
          className="card relative w-[300px] cursor-pointer overflow-hidden rounded-md transition-all duration-500
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
            <h1 className="pt-2 text-center font-got font-semibold md:text-2xl">
              {event.title}
            </h1>
            <p className="px-4 py-2">{event.description}</p>
            <div className="flex flex-row justify-between gap-5  px-5 pt-3">
              {/* <Link href={`/events/${event.title.toLowerCase()}`}>
              <button className="rounded-md bg-green-600 px-2 py-1 font-medium">
                See More
              </button>
            </Link> */}
              {/* <button
              className="rounded-md bg-violet-800 px-2 py-1 font-medium "
              onClick={() => {
                setOpenModal(true);
                setGame(event.title, event.teamType);
              }}
            >
              Register Now
            </button> */}
            </div>
          </div>
        </div>
      </Link>

      {/* <EventReg openModal={openModal} setOpenModal={setOpenModal} /> */}
    </>
  );
};

export default EventCard;