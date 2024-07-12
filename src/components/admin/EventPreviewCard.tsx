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
      <div className="mx-1 flex w-[95%] flex-col-reverse items-center justify-between  gap-10 rounded-xl border-2 border-regalia px-5 py-5 md:w-[80%] lg:flex-row lg:items-start">
        <div className="flex flex-col items-start gap-5 font-semibold">
          <div className="flex w-full  flex-col justify-between">
            <h1 className="text-3xl  tracking-wider">{event.event_name}</h1>

            <label className="inline-flex cursor-pointer items-center gap-2">
              <h1 className="text-lg">Registration Open :</h1>
              <input
                checked={eventRegistrationOpen == true ? true : false}
                onChange={toggleRegistrationOpen}
                value={eventRegistrationOpen}
                type="checkbox"
                className="peer sr-only"
              />
              <div className="peer relative h-6 w-11 rounded-full bg-regalia  before:bg-regalia after:absolute  after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-black after:transition-all after:content-[''] peer-checked:bg-regalia peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4  rtl:peer-checked:after:-translate-x-full"></div>
            </label>
          </div>
          <div className="flex w-full flex-row flex-wrap items-center justify-between gap-2 md:gap-10">
            <h1>{parse(event?.schedule)}</h1>
          </div>
          <div className="flex w-full flex-row flex-wrap items-center justify-between gap-2">
            <h1>Fees: {event.registration_fees} /-</h1>
            <h1>Prize : {event.prize} /-</h1>
          </div>

          <div className="flex w-full flex-col flex-wrap items-start justify-between gap-2">
            <h1>
              Team Size : {event.min_team_member} - {event.max_team_member}
            </h1>
          </div>

          <div>
            Description: <br />
            <div
              className="font-medium "
              dangerouslySetInnerHTML={{ __html: event.desc }}
            ></div>
          </div>
          <div className="flex w-full  flex-row flex-wrap items-center justify-center max-md:gap-5 md:justify-between">
            <button
              onClick={() => setIsOpen(true)}
              className="rounded-full border-2 border-black bg-regalia px-5 py-1 text-black hover:border-regalia hover:bg-black hover:text-regalia"
            >
              View Rules
            </button>
            <Link href={`/admin/manage-events/${event.id}`}>
              <button className="rounded-full border-2 border-black bg-regalia px-5 py-1 text-black hover:border-regalia hover:bg-black hover:text-regalia">
                Edit Event
              </button>
            </Link>
            <button
              onClick={() => setConfirmOpen(true)}
              className="rounded-full border-2 border-black bg-red-500 px-5 py-1 text-black hover:bg-white hover:text-black"
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
        <div className="fixed  inset-0 z-[50] flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={`flex h-auto w-[90%] flex-col  items-start
             rounded-lg bg-body p-4 text-regalia md:w-auto `}
          >
            <div className="mb-2 flex w-full flex-row items-center justify-between gap-5">
              <h2 className="text-lg font-semibold">
                Are you sure to delete this event ?
              </h2>
            </div>
            <div className="flex w-full flex-row flex-wrap items-center justify-between gap-2">
              <button
                className="mt-3 rounded-full border-2 border-black bg-black px-5 py-1 font-semibold text-white hover:bg-white hover:text-black"
                onClick={onClose}
              >
                Go Back
              </button>
              <button
                className="rounded-full border-2 border-black bg-red-600 px-5 py-1  font-semibold text-white hover:bg-white hover:text-black"
                onClick={() => {
                  deleteEvent(eventId!);
                  onClose();
                  router.refresh();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventPreviewCard;
