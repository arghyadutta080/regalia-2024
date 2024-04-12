"use client";

import Heading from "@/components/common/Heading";
import EventButton from "@/components/event/EventButton";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { useUser } from "@/lib/store/user";
import { supabase } from "@/lib/supabase-client";
import { clickSound } from "@/utils/functions";
import { getRegbyUser } from "@/utils/functions/getRegbyUser";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// import QRCode from "react-qr-code";
import { PuffLoader } from "react-spinners";

const EventRegCard = ({ teams }: { teams: any }) => {
  const [verified, setVerified] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [eventImage, setEventImage] = useState<string>("");
  const [event, setEvent] = useState<any>("");
  const [members, setMembers] = useState<any>([]);
  useEffect(() => {
    const getEventName = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("event_name,event_image_url")
        .eq("id", teams.event_id);
      setEvent(data![0].event_name);
      setEventImage(data![0].event_image_url);

      setMembers(teams.members);
      teams?.transaction_verified ? setVerified(true) : setVerified(false);
    };
    getEventName();
  }, [teams]);

  return (
    <div className="px-5 lg:px-0 md:w-[70%] lg:w-[40%] xl:w-auto 2xl:h-auto">
      <BackgroundGradient className="">
        <div className="flex w-[100%] flex-col items-center justify-around gap-5 rounded-xl  bg-body p-12 font-hollirood  text-sm font-semibold tracking-widest  ">
        {eventImage! && (
          <Image src={eventImage!} width={150} height={100} alt="" />
        )}

     
        <div className="flex flex-row flex-wrap items-center gap-2">
          <h1>Event :</h1> <span>{event!}</span>
        </div>

        <div className="flex flex-row flex-wrap items-center justify-center gap-2">
          <h1>{members! && members?.length > 1 ? "Team Name" : "Name"} :</h1>{" "}
          <span>{teams.team_name}</span>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-center gap-2">
          <h1>
            {members! && members?.length > 1 ? "Team Lead Phone" : "Phone"}:
          </h1>{" "}
          <span>{teams.team_lead_phone}</span>
        </div>
        {members! && members?.length > 1 && (
          <button
            onClick={() =>{ 
              clickSound();
              setIsOpen(true)}}
            className="rounded-xl border hover:cursor-pointer border-regalia bg-regalia px-3 py-1 text-black hover:bg-black hover:text-regalia hover:border-regalia "
          >
            View Members
          </button>
        )}
        {verified! ? (
          <h1
            className="rounded-xl text-black bg-green-300
         px-3 py-1 font-semibold"
          >
            Verified
          </h1>
        ) : (
          <h1
            className="rounded-xl bg-red-300 text-black
         px-3 py-1 font-semibold"
          >
            Not Verified
          </h1>
        )}
       
            <MemberModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        members={teams.members}
      />
      </div>
      </BackgroundGradient>
  
   
          </div>
  );
};

const MemberModal = ({
  isOpen,
  onClose,
  members,
}: {
  isOpen: boolean;
  onClose: () => void;
  members: any;
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed  inset-0 z-[50] flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={`flex h-auto w-[90%] flex-col
             items-start rounded-lg bg-body border-y-2 border-regalia p-4 md:w-[25%] `}
          >
            <div className="mb-2 flex w-full flex-row items-center justify-between">
              <h2 className="text-lg font-semibold">Members</h2> 

              <h2
                onClick={onClose}
                className="cursor-pointer rounded-xl border border-regalia bg-regalia px-3 py-1 text-black hover:bg-black hover:text-regalia hover:border-regalia"
              >
                X
              </h2>
            </div>

            <div className="my-1 flex h-full w-full flex-col items-center gap-2 overflow-y-scroll px-1 py-2 text-center">
              {members.map((member: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex w-full flex-col flex-wrap justify-around bg-body text-center font-semibold md:flex-row"
                  >
                    <h1>{member.name}</h1>
                    <a
                      className="text-red-500 hover:cursor-pointer hover:opacity-70"
                      href={`tel:${member.phone}`}
                    >
                      {member.phone}
                    </a>
                    
                  </div>
                );
              })}
            </div>
            <button
              className="mt-3 rounded-xl border border-regalia bg-regalia px-3 py-1 text-black hover:bg-black hover:text-regalia hover:border-regalia"
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

const Page = () => {
  const [teamData, setTeamData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userImage, setUserImage] = useState<string>("");
  const user = useUser((state: any) => state.user);
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    const getData = async () => {
      const data = await getRegbyUser(user);
      console.log(data);
      const { data: userData, error } = await supabase.auth.getSession();
      setUserImage(userData?.session?.user?.user_metadata?.avatar_url!);
      setTeamData(data);
      setLoading(false);
    };
    getData();
  }, [user]);
  return (
    <div className="min-h-[80vh] w-full px-2 lg:px-10 mb-10 flex flex-col items-center gap-10 mt-10">
        <Heading text="Your Registrations" />
     <div className="flex flex-row text-center items-center text-xl flex-wrap gap-5 md:gap-8 xl:gap-20 justify-evenly font-hollirood">
        <h1>Name : {user?.name}</h1>
        <h1>Email : {user?.email}</h1>
        <h1>Phone: {user?.phone}</h1>
        <EventButton  name="Edit Profile" onClick={()=>{
          router.push("/profile")
        }}  />
     </div>
      
        <div className="flex flex-row flex-wrap items-center justify-center lg:w-[80%] gap-20">
        {loading ? (
        <div className="mx-auto flex min-h-[80vh] w-full flex-col items-center justify-center">
          <PuffLoader color="" size={30} />
        </div>
      ) :   (teamData?.length > 0 ?
            teamData?.map((team: any, index: number) => {
              return(<>
              <EventRegCard key={index} teams={team} />
            
              </> );
            }) : <div className="flex flex-col items-center justfiy-center font-hollirood gap-5 mt-20 mx-auto">
                <h1 className="font-semibold text-xl">No Registrations Yet !</h1>
                <EventButton  name="Register" onClick={()=>{
          router.push("/events")
        }}  />
            </div>   )}
        </div>
    
    </div>
  );
};

export default Page;
