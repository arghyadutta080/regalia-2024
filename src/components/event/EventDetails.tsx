import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";
import { BackgroundGradient } from "../ui/background-gradient";
import Image from "next/image";
import EventButton from "./EventButton";

type preview = {
    url: string, 
    title: string
}

type Props = {
  eventDetails: {
    eventId: string;
    eventname: string;
    desc: string;
    schedule: string;
    regFees: string;
    prizePool: string;
    teamSize: {
      min: number;
      max: number;
    };
    img: string;
    rules: string;
    link: preview[];
  };
};

const EventDetails = ({ eventDetails }: Props) => {
    const onRegister = () => {
        console.log("Do register");
    }
    const onPreview = () => {
        console.log("Do preview");
    }
    const viewRules = () => {
        console.log("Preview Rules");
    }
  return (
    <>
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="font-hollirood text-4xl text-regalia dark:text-white mt-12 md:mt-0">
              Explore <br />
              <span className=" mt-1 text-[3.7rem] font-bold leading-none md:text-[6rem]">
                {eventDetails.eventname}
              </span>
            </h1>
          </>
        }
      >
        <BackgroundGradient className="h-full w-full rounded-[22px] bg-[#151515]">
          <div>
            <div className="items-left flex flex-col justify-center gap-5 p-5">
              <div className="items-left flex flex-col justify-center gap-5">
                <h1 className="text-center font-retrolight text-3xl font-bold text-yellow-400 md:pb-6">
                  {eventDetails.eventname}
                </h1>
                <div className="flex flex-col-reverse justify-between gap-5 text-lg md:flex-row">
                  <div className=" space-y-5">
                    <div
                      className="items-left flex flex-col justify-center gap-5"
                      dangerouslySetInnerHTML={{ __html: eventDetails.desc }}
                    ></div>
                    <div
                      className="items-left flex flex-col justify-center gap-5"
                      dangerouslySetInnerHTML={{
                        __html: eventDetails.schedule,
                      }}
                    ></div>
                    <div className="items-left flex flex-col justify-center gap-5">
                      Registration Fees: ₹{eventDetails.regFees}
                    </div>
                    <div className="items-left flex flex-col justify-center gap-5">
                      Prize Pool: ₹{eventDetails.prizePool}
                    </div>
                    <div className="items-left flex flex-col justify-center gap-5">
                      Team Size: {eventDetails.teamSize.min} -{" "}
                      {eventDetails.teamSize.max}
                    </div>
                  </div>
                  <Image
                    src={eventDetails.img}
                    alt="hero"
                    height={600}
                    width={300}
                    className="mx-auto h-full rounded-2xl object-cover object-left-top"
                  />
                </div>
                <div className=" flex flex-row space-x-5">
                <EventButton name="Register" onClick={onRegister}/>
                <EventButton name="View Rules" onClick={viewRules}/>
                <EventButton name="Preview" onClick={onPreview}/>
                </div>
              </div>
            </div>
          </div>
        </BackgroundGradient>
      </ContainerScroll>
    </>
  );
};

export default EventDetails;
