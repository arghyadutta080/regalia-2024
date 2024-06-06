"use client";

import { Footer } from "@/components/common";
import Heading from "@/components/common/Heading";
import { EventCard } from "@/components/event/EventCard";
import { useUser } from "@/lib/store/user";
import { supabase } from "@/lib/supabase-client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

const Page = () => {
  const user = useUser((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [coordinatingEvents, setCoordinatingEvents] = useState<any>([]);
  useEffect(() => {
    const getCoordinatingEvents = async () => {
      const { data } = await supabase.auth.getSession();
      const userRoles = await supabase
        .from("roles")
        .select()
        .match({ id: data?.session?.user?.id });
      const allEvents = await supabase
        .from("events")
        .select("*")
        .eq("fest_name", "Regalia")
        .eq("year", 2024);
      const events = allEvents.data;
      // console.log(events)

      let showAllEvents = false;
      let coordinatingEventIds: any = [];

      if (userRoles.data) {
        for (const obj of userRoles.data!) {
          if (obj.role === "super_admin") {
            showAllEvents = true;
            break;
          }
          if (obj.role === "event_coordinator" || obj.role === "volunteer") {
            coordinatingEventIds.push(obj.event_id);
          } else if (obj.role === "convenor") {
            // conveningEventCategoryIds.push(obj.event_category_id);
            coordinatingEventIds.push(obj.event_id);
          }
        }
      }

      let filteredEvents: any = [];
      if (showAllEvents) {
        filteredEvents = events;
      } else {
        filteredEvents = events!.filter((event) =>
          coordinatingEventIds.includes(event.id),
        );
      }

      setCoordinatingEvents(filteredEvents);
      setLoading(false);
    };

    getCoordinatingEvents();
  }, [user]);

  return (
      <div className="mx-auto my-10 flex w-full flex-col items-center justify-center gap-10">
        <Heading text="Management Dashboard" />
        <div className="flex h-full min-h-[60vh] flex-row flex-wrap items-center justify-center gap-20 mb-10">
          {loading ? (
            <div className=" flex flex-col items-center justify-center">
              <PuffLoader size={24} color="#000" />{" "}
            </div>
          ) : (
            coordinatingEvents?.map((value: any, index: number) => {
              return (
                <Link href={`/coordinator/${value.id}`} key={index}>
                  <>
                    {!value.event_image_url ? (
                      <h1 className="flex h-full w-full flex-col justify-center rounded-xl border border-regalia pt-2 text-center font-hollirood font-semibold tracking-widest  text-regalia md:text-xl">
                        {value.event_name}
                      </h1>
                    ) : (
                      <EventCard
                        link={`/coordinator/${value.id}`}
                        hoverImage={value.event_image_url}
                        image={value.event_image_url}
                        title={value.event_name}
                        key={index}
                      />
                    )}
                  </>
                </Link>
              );
            })
          )}
        </div>
      </div>
  );
};

export default Page;
