"use client";
import AddCoordinator from "@/components/admin/AddCoordinator";
import EventPreview from "@/components/admin/EventPreview";
import RegistrarModal from "@/components/admin/RegistrarModal";
import Heading from "@/components/common/Heading";
import { getEvents } from "@/utils/functions/getEvent";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [isRegistrarOpen, setIsRegistrarOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    setIsSecurityOpen(false);
  };
  const [events, setEvents] = useState<any>([]);
  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      setEvents(data);
    };
    fetchEvents();
  }, []);
  const [eventName, setEventName] = useState("");
  const [filteredEvent, setFilteredEvent] = useState<any>([]);
  useEffect(() => {
    setFilteredEvent(
      events &&
        events.filter((event: any) =>
          event.event_name.toLowerCase().includes(eventName.toLowerCase()),
        ),
    );
  }, [eventName, events]);
  return (
    <div className="mx-auto flex flex-col items-center gap-5 ">
      <Heading text="Manage Events" />
      <div className="mx-auto flex  w-full flex-col flex-wrap  items-center justify-center gap-2 md:w-[90%] md:flex-row">
        <div className="flex w-[90%] flex-row items-center gap-2  px-2 md:w-[60%]">
          <input
            type="text"
            placeholder="Search for Events"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="bg-body w-full  rounded-full border-2 border-regalia px-4 py-3"
          />
          <IoSearchSharp className="h-10 w-10 text-regalia" />
        </div>
        <div className="md:full flex w-[60%] flex-row flex-wrap items-center justify-center gap-2 md:gap-5">
          <button className="flex cursor-pointer flex-row items-center gap-2 rounded-xl border-2 border-regalia bg-regalia px-3 py-1 text-sm font-semibold text-black hover:border-regalia hover:bg-black hover:text-regalia ">
            <FaPlus />
            <Link href={"/admin/manage-events/add-event"}>Add Event</Link>
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="flex cursor-pointer flex-row items-center gap-2 rounded-xl border-2 border-regalia bg-regalia px-3 py-1 text-sm font-semibold text-black hover:border-regalia hover:bg-black hover:text-regalia "
          >
            <FaPlus />
            Add Coordinator
          </button>
          <button
            onClick={() => setIsRegistrarOpen(true)}
            className="flex cursor-pointer flex-row items-center gap-2 rounded-xl border-2 border-regalia bg-regalia px-3 py-1 text-sm font-semibold text-black hover:border-regalia hover:bg-black hover:text-regalia "
          >
            <FaPlus />
            Add Registrar
          </button>

          <button
            onClick={() => setIsSecurityOpen(true)}
            className="flex cursor-pointer flex-row items-center gap-2 rounded-xl border-2 border-regalia bg-regalia px-3 py-1 text-sm font-semibold text-black hover:border-regalia hover:bg-black hover:text-regalia "
          >
            <FaPlus />
            Add Security
          </button>
        </div>

        <EventPreview events={filteredEvent} />
      </div>

      <AddCoordinator isOpen={isOpen} onClose={onClose} />

      <RegistrarModal
        isOpen={isRegistrarOpen}
        onClose={() => setIsRegistrarOpen(false)}
      />
    </div>
  );
};

export default Page;
