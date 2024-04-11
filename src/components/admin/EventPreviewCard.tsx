"use client";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";
import RulesModal from "./RulesModal";
import { deleteEvent } from "@/utils/functions/deleteEvent";


const EventPreviewCard = ({ event }: { event: any }) => {
  const [eventRegistrationOpen, setEventRegistrationOpen] =
    useState<any>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    setConfirmOpen(false);
  };

  const toggleRegistrationOpen = async () => {
    setEventRegistrationOpen(!eventRegistrationOpen);
    const { data, error } = await supabase
      .from("events")
      .update({
        is_open: !eventRegistrationOpen,
      })
      .eq("id", event.id);
  };

  useEffect(() => {
    setEventRegistrationOpen(event.is_open);
  }, [event.is_open]);

  return (
    <>
      <div className="border-2 border-regalia rounded-xl flex flex-col-reverse lg:flex-row  items-center lg:items-start px-5 py-5 gap-10 justify-between w-[95%] mx-1 md:w-[80%]">
        <div className="flex flex-col items-start gap-5 font-semibold">
          <div className="flex flex-col  w-full justify-between">
            <h1 className="text-3xl  tracking-wider">{event.event_name}</h1>

            <label className="inline-flex items-center gap-2 cursor-pointer">
              <h1 className="text-lg">Registration Open :</h1>
              <input
                checked={eventRegistrationOpen == true ? true : false}
                onChange={toggleRegistrationOpen}
                value={eventRegistrationOpen}
                type="checkbox"
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-regalia peer-focus:outline-none peer-focus:ring-4  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] before:bg-regalia after:bg-black after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-regalia"></div>
            </label>
          </div>
          <div className="flex flex-row items-center gap-2 md:gap-10 w-full justify-between flex-wrap">
            <h1>{parse(event?.schedule)}</h1>
          </div>
          <div className="flex flex-row items-center gap-2 w-full justify-between flex-wrap">
            <h1>Fees: {event.registration_fees} /-</h1>
            <h1>Prize : {event.prize} /-</h1>
          </div>

          <div className="flex flex-col items-start gap-2 w-full justify-between flex-wrap">
           <h1>Team Size : {event.min_team_member} - {event.max_team_member}</h1>
          </div>

          <div>
            Description: <br />
            <div
              className="font-medium "
              dangerouslySetInnerHTML={{ __html: event.desc }}
            ></div>
          </div>
          <div className="flex flex-row  items-center justify-center max-md:gap-5 md:justify-between flex-wrap w-full">
            <button
              onClick={() => setIsOpen(true)}
              className="border-2 border-black px-5 py-1 rounded-full bg-regalia text-black hover:bg-black hover:border-regalia hover:text-regalia"
            >
              View Rules
            </button>
            <Link href={`/admin/manage-events/${event.id}`}>
              <button className="border-2 border-black px-5 py-1 rounded-full bg-regalia text-black hover:bg-black hover:border-regalia hover:text-regalia">
                Edit Event
              </button>
            </Link>
            <button
              onClick={() => setConfirmOpen(true)}
              className="border-2 border-black px-5 py-1 rounded-full bg-red-500 text-black hover:bg-white hover:text-black"
            >
              Delete
            </button>
          </div>

          {/* <h1>Coordinators:</h1>
  <div className='flex flex-col items-center gap-2 -mt-3 flex-semibold'>
  <h1>John Doe : +91 8337045160</h1>
  <h1>Jane Doe : +91 8337045160</h1>
  </div> */}
        </div>
        <img
          src={event.event_image_url}
          alt=""
          className="w-80"
          height={0}
          width={0}
        />
      </div>
      <RulesModal isOpen={isOpen} onClose={onClose} rules={event.rules} />
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={onClose}
        eventId={event.id}
      />
    </>
  );
};

const ConfirmModal = ({
  isOpen,
  onClose,
  eventId,
}: {
  isOpen: boolean;
  onClose: () => void;
  eventId: any;
}) => {
  const router = useRouter();
  return (
    <>
      {isOpen && (
        <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[50]">
          <div
            className={`bg-gray-100 p-4 rounded-lg  h-auto
             w-[90%] flex flex-col items-start md:w-auto `}
          >
            <div className="w-full flex flex-row mb-2 gap-5 items-center justify-between">
              <h2 className="text-lg font-semibold">
                Are you sure to delete this event ?
              </h2>
            </div>
            <div className="flex flex-row items-center gap-2 w-full justify-between flex-wrap">
              <button
                className="border-2 border-black px-5 py-1 rounded-full bg-red-600  font-semibold text-white hover:bg-white hover:text-black"
                onClick={() => {
                  deleteEvent(eventId!);
                  onClose();
                  router.refresh();
                }}
              >
                Delete
              </button>
              <button
                className="border-2 mt-3 border-black px-5 py-1 rounded-full font-semibold bg-black text-white hover:bg-white hover:text-black"
                onClick={onClose}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventPreviewCard;