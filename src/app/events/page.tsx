"use client";
import { EventCard } from "@/components/event/EventCard";
import Header from "@/components/event/Header";
import { events } from "@/utils/constants/Events";


export default function CardHoverEffectDemo() {
  return (
    <div className="mx-auto max-w-full md:px-20">
      <Header />
      <div className="oveflow-x-hidden flex min-h-[60vh] flex-col items-center gap-10">
        <div className=" flex flex-col items-center  justify-center gap-5">
          <div className="mt-5 pb-24 flex flex-row flex-wrap justify-center gap-10 md:gap-32">
            {events.map((event, index) => (
              <EventCard
                key={index}
                title={event.title}
                image={event.image}
                hoverImage={event.hoverImage}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
