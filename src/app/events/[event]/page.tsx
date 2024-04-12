"use client";
import React from "react";
import EventDetails from "@/components/event/EventDetails";

type Params = {
  params: {
    event: string;
  };
};

const page = ({ params }: Params) => {
  const eventDetails = {
    eventId: params.event.replace(/%20/g, "-").toLowerCase(),
    eventname: "Carpe Diem",
    desc: "<h3>Carpe Diem is an event to showcase your creativity and talent. It is a solo dancing, acting, beat boxing, reciting, instrument playing and rapping competition.</h3>",
    schedule:
      "<p>Date : <strong>10th May 2024</strong></p><p>Time : <strong>10 : 00 AM	</strong></p>",
    regFees: "400",
    prizePool: "1000",
    teamSize: {
      min: 1,
      max: 4,
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
    <div className="flex flex-col overflow-hidden  mb-20">
      <EventDetails eventDetails={eventDetails}/>
    </div>
  );
};

export default page;
