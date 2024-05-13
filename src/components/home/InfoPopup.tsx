"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const InfoPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);

    useEffect(() => {
      setIsOpen(true);

      const timer = setTimeout(() => {
          onClose(); 
      }, 40000); 

      return () => clearTimeout(timer); 
  }, []);
  return (
    <>
      {isOpen && (
        <div className="fixed  inset-0 flex items-center font-retrolight tracking-widest justify-center bg-black bg-opacity-50 z-[50]">
          <div
            className={`bg-body border-y-2 border-regalia p-4 rounded-lg h-auto lg:h-[70vh] 2xl:h-auto w-[90%] flex flex-col items-start md:w-[50%] lg:w-[35%] `}
          >
            <div className="w-full flex flex-row mb-2 items-center justify-between">
              <h2 className="text-lg font-semibold">Important Announcement</h2>

              <h2
                onClick={onClose}
                className="bg-regalia md:py-2 md:px-3 px-2 py-1 hover:bg-black hover:text-regalia border-2 border-regalia hover:border-regalia  text-white text-sm font-semibold rounded-full cursor-pointer"
              >
                X
              </h2>
            </div>
            <div
              className=" overflow-y-auto my-1 py-2 px-1 w-full font-hollirood tracking-widest leading-[2rem] max-xl:text-[0.6rem]  lg:leading-[2.5rem]"
            >
              Due to unavoidable circumstances and Notice from election commission and unavailibility of venue,
              <br />
              Events dates are postponed to July 2024.
              <br />
              <span className="text-regalia font-semibold">Events BAND BASH , Nrityam & Kashish-e-Haya</span> is going to take place in  <span className="font-semibold text-regalia">July 2024</span> on further announced Dates.
              <br />
               We are sorry for the inconvenience caused. We will update the new dates soon.

                <br />
              
                Finals of events <span className="text-regalia font-semibold">Sargam & Carpe Diem</span> is going to take place on <span className="text-regalia font-semibold">15th May 2024 in RCCIIT Old Campus College Auditorium.</span> 
                To know more about location, <Link className="text-regalia font-semibold tracking-widest hover:text-green-500" href={`/contacts`}>Visit Here</Link>
            </div>
            <button
              className="border-2 mt-3 border-regalia px-5 py-1 rounded-full font-semibold bg-regalia text-black hover:bg-black hover:text-regalia"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoPopup;