import React, { useState } from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";
import { BackgroundGradient } from "../ui/background-gradient";
import Image from "next/image";
import EventButton from "./EventButton";
import parse from "html-react-parser";
import RulesModal from "../admin/RulesModal";
import Link from "next/link";
import EventRegForm from "./EventRegForm";

type preview = {
  url: string;
  title: string;
};

const EventDetails = ({ eventDetails }: any) => {
  const [openRules, setOpenRules] = useState<boolean>(false);
  const [openRegister, setOpenRegister] = useState<boolean>(false);
 
  return (
    <>
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="mt-12 font-hollirood text-3xl text-regalia dark:text-white md:mt-0">
              Explore <br />
              <span className=" mt-1 text-3xl font-bold leading-none md:text-4xl  lg:text-5xl">
                {eventDetails.event_name}
              </span>
            </h1>
          </>
        }
      >
        <BackgroundGradient className="h-full w-full rounded-[22px] bg-[#151515]">
          <div>
            <div className=" flex flex-row max-md:flex-wrap-reverse w-full md:items-start lg:items-center justify-center gap-5 px-10 py-5">
              <div className="items-left w-full md:w-[5/6] lg:w-[70%] flex flex-col justify-center gap-5">
                <h1 className="text-center tracking-widest font-retrolight text-3xl font-bold text-yellow-400 md:pb-6">
                  {eventDetails.event_name}
                </h1>
                <div className="flex flex-col-reverse justify-between gap-5 text-lg md:flex-row">
                  <div className=" space-y-5">
                    <div className="items-left flex text-sm md:text-xs lg:text-sm font-hollirood tracking-widest flex-col justify-center gap-5">
                      {parse(eventDetails.desc)}
                    </div>

                    <div className="items-left font-hollirood tracking-widest flex flex-col justify-center gap-5">
                      {parse(eventDetails.schedule)}
                    </div>
                    <div className="items-left font-hollirood tracking-widest flex flex-col justify-center gap-5">
                      Registration Fees: ₹{eventDetails.registration_fees}
                    </div>
                    {eventDetails?.prize && (
                      <div className="items-left font-hollirood tracking-widest flex flex-col justify-center gap-5">
                        Prize Pool: ₹{eventDetails.prize}
                      </div>
                    )}
                    <div className="items-left font-hollirood tracking-widest flex flex-col justify-center gap-5">
                      Team Size: {eventDetails.min_team_member} -{" "}
                      {eventDetails.max_team_member}
                    </div>
                  </div>
                  
                  
                </div>
                <div className=" flex flex-row space-x-5">
                
                  <EventButton
                    name="Rules"
                    onClick={() => setOpenRules(true)}
                  />
                  {eventDetails?.links.length > 0 &&
                    eventDetails.links.map((link: preview, index: number) => {
                      return (
                        <Link
                          className="relative my-2 inline-flex h-12 overflow-hidden rounded-full p-1 font-retrolight focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 md:my-3"
                          href={link.url}
                          key={index}
                          target="_blank"
                        >
                          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FEC923_0%,#0917F5_50%,#FEC923_100%)]" />
                          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl md:text-lg">
                            {link.title}
                          </span>
                        </Link>
                      );
                    })}
                </div>
              </div>
              <div className="flex flex-col max-md:mt-0 max-lg:mt-10 w-full md:w-[1/6] lg:w-[30%] mx-auto h-full">
                  <Image
                    src={eventDetails.event_image_url}
                    alt="hero"
                    height={600}
                    width={250}
                    className=" rounded-2xl object-cover mx-auto object-left-top"
                  />
                    <button
        className="relative w-auto mx-auto inline-flex h-12 overflow-hidden rounded-full p-1 my-2 md:my-3 font-retrolight focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        onClick={()=>{
          setOpenRegister(true)
        }}
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FEC923_0%,#0917F5_50%,#FEC923_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm md:text-sm lg:text-lg font-medium text-white backdrop-blur-3xl">
          Register Now
        </span>
      </button>
                  </div>
            </div>
          </div>
        </BackgroundGradient>
      </ContainerScroll>
      <RulesModal
        isOpen={openRules}
        onClose={() => setOpenRules(false)}
        rules={eventDetails.rules}
      />
      <EventRegForm
        isOpen={openRegister}
        onClose={() => setOpenRegister(false)}
        eventDetails={eventDetails}

        />
    </>
  );
};

export default EventDetails;
