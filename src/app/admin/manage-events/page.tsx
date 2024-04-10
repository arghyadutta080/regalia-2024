"use client";
import AddCoordinator from '@/components/admin/AddCoordinator'
import EventPreview from '@/components/admin/EventPreview'
import RegistrarModal from '@/components/admin/RegistrarModal'
import Heading from '@/components/common/Heading'
import { getEvents } from '@/utils/functions/getEvent'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { IoSearchSharp } from 'react-icons/io5'

const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConvenorOpen, setIsConvenorOpen] = useState(false);
  const [isRegistrarOpen, setIsRegistrarOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    setIsConvenorOpen(false);
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
     events && events.filter((event: any) =>
        event.event_name.toLowerCase().includes(eventName.toLowerCase())
      )
    );
  }, [eventName, events]);
  return (
    <div className="flex flex-col items-center mx-auto gap-5 ">
      <Heading text="Manage Events" />
      <div className="flex flex-col  md:flex-row w-full md:w-[90%]  gap-2 mx-auto items-center justify-center flex-wrap">
        <div className="w-[90%] px-2 md:w-[60%] flex flex-row  items-center gap-2">
          <input
            type="text"
            placeholder="Search for Events"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full bg-body  border-2 border-regalia rounded-full py-3 px-4"
          />
          <IoSearchSharp className="w-10 h-10 text-regalia" />
        </div>
        <div className="flex flex-row items-center flex-wrap w-[60%] md:full gap-2 md:gap-5 justify-center">
        <button className="flex flex-row items-center cursor-pointer font-semibold border-2 border-regalia px-3 py-1 hover:bg-black hover:text-regalia hover:border-regalia rounded-xl bg-regalia text-black gap-2 text-sm ">
          <FaPlus />
          <Link href={"/admin/manage-events/add-event"}>
            Add Event
          </Link>
        </button>
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-row items-center cursor-pointer font-semibold border-2 border-regalia px-3 py-1 hover:bg-black hover:text-regalia hover:border-regalia rounded-xl bg-regalia text-black gap-2 text-sm "
        >
          <FaPlus />
          Add Coordinator
        </button>
        <button
          onClick={() => setIsRegistrarOpen(true)}
          className="flex flex-row items-center cursor-pointer font-semibold border-2 border-regalia px-3 py-1 hover:bg-black hover:text-regalia hover:border-regalia rounded-xl bg-regalia text-black gap-2 text-sm "
        >
          <FaPlus />
          Add Registrar
        </button>

        <button
          onClick={() => setIsConvenorOpen(true)}
          className="flex flex-row cursor-pointer items-center font-semibold border-2 border-regalia px-3 py-1 hover:bg-black hover:text-regalia hover:border-regalia rounded-xl bg-regalia text-black gap-2 text-sm "
        >
          <FaPlus />
          Add Convenor
        </button>
        </div>
       
        <EventPreview events={filteredEvent} />
      </div>
      {isOpen ? (
        <AddCoordinator isOpen={isOpen} onClose={onClose} role="Coordinator" />
      ) : null}
      {isConvenorOpen ? (
        <AddCoordinator
          isOpen={isConvenorOpen}
          onClose={onClose}
          role="Convenor"
        />
      ) : null}
      <RegistrarModal isOpen={isRegistrarOpen} onClose={()=>setIsRegistrarOpen(false)} />
    </div>
  )
}

export default page