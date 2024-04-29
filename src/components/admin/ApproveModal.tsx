"use client";

import { supabase } from "@/lib/supabase-client";
import { registrationVerificationEmail } from "@/utils/constants/emails";
import { getImageUrl } from "@/utils/functions/getImageUrl";
import { getRegistrations } from "@/utils/functions/getRegistrations";
import { getWhatsAppLink } from "@/utils/functions/getWhatsappLink";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const ApproveModal = ({
  isOpen,
  onClose,
  data,
  setRegistrations,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  setRegistrations: any;
}) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [whatsappLink, setWhatsappLink] = useState<string>("");
  const [combinedEmails, setCombinedEmails] = useState<string>("");
  const [coordinators, setCoordinators] = useState<any>([]);

  const [imageUrl, setImageUrl] = useState<any>("");
  const [loaded, setLoaded] = useState(false);
  let teamType;

  useEffect(() => {
    const eventName: string = data && data?.events[0].event_name;
    const link: any = getWhatsAppLink(eventName);
    const participantEmails: any =
      data && data.participations?.map((participant: any) => participant.email);
    const allEmails =
      participantEmails &&
      participantEmails.length > 0 &&
      participantEmails.join(" , ");
    setCombinedEmails(allEmails);
    setWhatsappLink(link);
    const getCoordinators = async () => {
      const { data: coordinatorData, error: coordinatorError } = await supabase
        .from("roles")
        .select("users(name,phone,email)")
        .eq("role", "event_coordinator")
        .eq("event_id", data?.event_id);
      if (coordinatorData) {
        const coordinatorsArray = coordinatorData.map(
          (coordinator: any) => coordinator.users,
        );
        setCoordinators(coordinatorsArray);
      }
    };
    getCoordinators();
  }, [data && data?.event_id]);
  if (data?.events.max_team_member > 1) {
    teamType = "Team";
  } else {
    teamType = "Individual";
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const image = await getImageUrl({
          eventId: data.event_id,
          fileName: data.transaction_ss_filename,
        });
        if (image) {
          setImageUrl(image.publicUrl);
        }
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();
  }, [data]);

  const handleAccept = async () => {
    // console.log(data.team_id)
    setDisabled(true);
    const { data: confirmData, error } = await supabase
      .from("teams")
      .update({ transaction_verified: true })
      .eq("team_id", data.team_id)
      .select();

    if (error) {
      toast.error("Error Occured");
      onClose();
      setImageUrl("");
      setLoaded(false);
      return;
    }
    if (confirmData) {
      const verificationEmail = registrationVerificationEmail(
        data?.events[0].event_name,
        whatsappLink,
        data?.team_name,
        data?.users,
        data?.participations,
        coordinators,
      );
      const emailData = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: verificationEmail,
          targetEmails: combinedEmails,
          subject: `${data?.team_name} : Registration Verified for ${data?.events[0].event_name} in Regalia 2024`,
        }),
      });

      if (emailData.status == 200) {
        const { data: confirmMailData, error } = await supabase
          .from("teams")
          .update({ payment_confirmation_mail_sent: true })
          .eq("team_id", data.team_id)
          .select();
      }
      toast.success("Team Verified");

      const updatedData = await getRegistrations();
      setRegistrations(updatedData);
      setImageUrl("");

      setLoaded(false);
      onClose();
      setDisabled(false);
    }
    // if (!data) {
    //   onClose();
    //   setImageUrl("");
    //   toast.error("Error Occured");
    //   setLoaded(false);
    //   return;
    // }
    // // console.log(response)
    // if (data) {
    //   toast.success("Team Verified");
    //   const updatedData = await getRegistrations();
    //   setRegistrations(updatedData);
    //   setImageUrl("");
    //   onClose();
    //   setLoaded(false);
    // }
  };
  return (
    <>
      {isOpen && (
        <div className="fixed  inset-0 z-[50] flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={`flex h-[60%] w-[90%] flex-col items-start rounded-lg border-y-2 border-regalia
            bg-body p-4 font-hollirood tracking-widest md:w-[40%] lg:w-[30%] `}
          >
            <div className="mb-2 flex w-full flex-row items-center justify-between">
              <h2 className="text-lg font-semibold">Approve Registration</h2>
              <h2
                onClick={onClose}
                className="cursor-pointer rounded-full border-2 border-black bg-black px-2 py-1 text-sm font-semibold  text-white hover:bg-white hover:text-black md:px-3 md:py-2"
              >
                X
              </h2>
            </div>

            <div className="mx-auto my-1 flex h-full w-full flex-col gap-3 overflow-y-scroll px-1 py-2">
              <h1 className="text-sm font-semibold">
                Transaction ID : {data.transaction_id}
              </h1>
              <h1 className="text-sm font-semibold">
                Event Name : {data.events[0].event_name}
              </h1>
              {/* <h1 className="font-semibold text-sm">Team Type : {teamType}</h1> */}
              <h1 className="text-sm font-semibold">
                Team Name : {data.team_name}
              </h1>
              <h1 className="text-sm font-semibold">
                Team Lead Name : {data.participations[0]?.name!}
              </h1>
              <h1 className="text-sm font-semibold">
                Team Lead Phone : {data.participations[0]?.phone!}
              </h1>
              <h1 className="text-sm font-semibold">
                Team Size : {data.participations.length}
              </h1>

              {imageUrl && (
                <img
                  src={imageUrl && imageUrl}
                  alt="Team Image"
                  width={300}
                  height={300}
                  onLoad={() => setLoaded(true)}
                  className="mx-auto rounded-lg border-2  border-gray-600 object-cover"
                />
              )}
            </div>
            {data?.transaction_verified == false && (
              <div className="mt-5 flex w-full flex-row items-center justify-center gap-5">
                <button
                  className="w-full rounded-md bg-red-400 px-4 py-2 font-semibold text-white shadow-md hover:cursor-pointer hover:bg-red-600"
                  onClick={() => {
                    onClose();
                    setImageUrl("");
                    setLoaded(false);
                  }}
                >
                  Reject
                </button>
                <button
                  disabled={disabled}
                  className="w-full rounded-md bg-green-400 px-4 py-2 text-white shadow-md hover:cursor-pointer hover:bg-green-600"
                  onClick={handleAccept}
                >
                  {disabled ? <ClipLoader size={20} color="white" /> : "Accept"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ApproveModal;
