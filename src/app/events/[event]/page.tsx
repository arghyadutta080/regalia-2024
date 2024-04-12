"use client";
import React, { useMemo, useState } from "react";
import EventDetails from "@/components/event/EventDetails";
import { fetchEvent } from "@/utils/functions/fetchEvent";
import { PuffLoader } from "react-spinners";

type Params = {
  params: {
    event: string;
  };
};

const page = ({ params }: Params) => {
  const eventName = decodeURIComponent(params.event.toString());
  const [loading, setLoading] = useState<boolean>(true);
  const [eventData, setEventData] = useState<any>(null);
  useMemo(() => {
    const getEventData = async () => {
      const data = await fetchEvent(eventName);
      setEventData(data);
      setLoading(false);
    };
    getEventData();
  }, [params.event]);

  return (
    <div className="mb-20 flex flex-col  overflow-hidden">
      {loading ? (
        <div className="mx-auto flex min-h-[80vh] w-full flex-col items-center justify-center">
          <PuffLoader color="" size={30} />
        </div>
      ) : (
        <EventDetails eventDetails={eventData} />
      )}
    </div>
  );
};

export default page;
