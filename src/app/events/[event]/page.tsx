"use client";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import React from "react";

type Params = {
  params: {
    event: string;
  };
};

const page = ({ params: { event } }: Params) => {
  const eventDetails = {
    eventId: event.replace(/%20/g, "-").toLowerCase(),
    eventname: "Carpe Diem",
    desc: "<h3>Carpe Diem is an event to showcase your creativity and talent. It is a solo dancing, acting, beat boxing, reciting, instrument playing and rapping competition.</h3>",
    schedule:
      "<p>Date : <strong>10th May 2024</strong></p><p>Time : <strong>10 : 00 AM	</strong></p>",
    regFees: "400",
    prizePool: "1000",
    teamSize: {
      min: "1",
      max: "4",
    },
    rules:
      "<p>• The participants will have 3 mins to showcase their creativity. If the time exceeds, the participant will be disqualified.</p><p><br></p><p>• Any type of art form will be accepted except singing ( For singing, we have another event, Sargam )</p><p><br></p><p>• It will be a solo performance</p><p><br></p><p>• If the participant want to play any instrument, then it is instructed to bring it during the event.</p><p><br></p><p>• For dancing, the participant will bring the soundtrack.</p><p><br></p><p>• Any form of vulgar activity won't be entertained during the performance .</p><p><br></p><p>• Flammable objects, Gulal, slippery things, water can not be used as props.</p>",
    img: "https://i.postimg.cc/FzTpS7Sz/ctf.jpg",
    link: [
      {
        url: "https://www.instagram.com/reel/C5YD7DryuIp/?igsh=MTB3ZGF6Yjd2N2ZkYQ==",
        title: "Preview",
      },
    ],
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="font-hollirood text-4xl text-regalia dark:text-white">
              Explore <br />
              <span className="mb-5 mt-1 text-4xl font-bold leading-none md:text-[6rem]">
                {eventDetails.eventname}
              </span>
              <span className="mb-5 mt-1 text-4xl font-bold leading-none md:text-[6rem]">
                {" "}
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`/linear.webp`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto h-full rounded-2xl object-cover object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
};

export default page;
