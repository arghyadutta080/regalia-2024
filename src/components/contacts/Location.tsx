"use client";
import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { FadeIn } from "react-slide-fade-in";

const Location = () => {
  return (
    <div className="flex flex-col tracking-widest items-start gap-5 w-full">
      <h1 className="text-2xl font-semibold tracking-wider text-primary lg:px-10">
        Locations
      </h1>
      <FadeIn
            from="bottom"
            positionOffset={200}
            triggerOffset={0}
            delayInMilliseconds={80}
          >
         <div className="flex flex-col w-[90%] mx-auto lg:px-8 mb-3 items-start">
        <h1>For Prelims</h1>
        <div className="mx-auto flex  w-full flex-col gap-10 ">
        <div className="flex flex-col items-start gap-2">
          <div className="text-sm lg:text-md flex flex-row items-center w-full gap-2  font-semibold">
          <IoLocationSharp size={24} />
            <p className="w-full">
            Old Campus Auditorium ,  Canal S Rd, Beleghata, Kolkata, West Bengal <span className="font-annabel">700015</span>
              <br />
              RCC Institute of Information Technology.
            </p>
          </div>
          
          <iframe
            className="mx-auto h-[300px] w-full rounded-md lg:h-[500px]"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.5301581721264!2d88.39382967591769!3d22.559266533457734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027686b848fb8d%3A0xed09795e4836e886!2sRCC%20Institute%20of%20Information%20Technology!5e0!3m2!1sen!2sin!4v1712781353426!5m2!1sen!2sin" loading="lazy" ></iframe>
        </div>
      </div>
        </div>
  </FadeIn>
        <FadeIn
            from="bottom"
            positionOffset={200}
            triggerOffset={0}
            delayInMilliseconds={80}
          >
        <div className="flex flex-col w-[90%] mx-auto lg:px-8 mb-3 items-start">
        <h1>For Finals</h1>
        <div className="mx-auto flex  w-full flex-col gap-10 ">
        <div className="flex flex-col items-start gap-2">
          <div className="text-sm lg:text-md flex flex-row items-center gap-2  font-semibold">
          <IoLocationSharp size={24} />
            <p>
           BF Block(Newtown), Action Area I, New Town, West Bengal <span className="font-annabel">700156</span>
              <br />
              New Town Mela Ground
            </p>
          </div>
          
          <iframe
          className="mx-auto h-[300px] w-full rounded-md lg:h-[500px]"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.976427897317!2d88.46649707591807!3d22.579984932698533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02753a628db657%3A0xd22b9fadfb4f18d2!2sNew%20Town%20Mela%20Ground!5e0!3m2!1sen!2sin!4v1712780693907!5m2!1sen!2sin"  loading="lazy" ></iframe>
        </div>
      </div>
        </div>
     </FadeIn>
    </div>
  );
};

export default Location;