"use client";
import { supabase } from "@/lib/supabase-client";
import { addConvenor } from "@/utils/functions/addConvenor";
import { addCoordinator } from "@/utils/functions/addCoordinator";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SelectInput from "../common/SelectInput";
import FormElement from "../common/FormElement";

const AddCoordinator = ({
  isOpen,
  onClose,
  role,
}: {
  isOpen: boolean;
  onClose: () => void;
  role: string;
}) => {
  const [inputs, setInputs] = useState({
    phone: "",
    event: "",
    category: "",
  });
  const [events, setEvents] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
    >,
  ) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
    // console.log(name, value);
  };

  useEffect(() => {
    const getEventDetails = async () => {
      const res = await supabase
        .from("events")
        .select("id, event_name")
        .eq("fest_name", "Regalia")
        .eq("year", 2024);
      setEvents(res.data?.map((event: any) => event.event_name));
    };
    getEventDetails();
  }, [isOpen]);

  const submitCoordinator = async () => {
    await addCoordinator(inputs, role);
    role === "event_coordinator" && toast.success("Coordinator Added !");
    role === "volunteer" && toast.success("Volunteer Added !");
    onClose();
  };
  return (
    <>
      {isOpen && (
        <div className="fixed  inset-0 z-[50] flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative flex  w-[90%] flex-col items-start rounded-lg border-y-2 border-regalia   bg-body p-4 md:w-1/3  ">
            <div className="mb-2 flex w-full flex-row items-center justify-between">
              <h2 className="text-lg font-semibold">
                {" "}
                {role === "event_coordinator" && "Coordinator"}{" "}
                {role === "volunteer" && "Volunteer"} Addition
              </h2>

              <h2
                onClick={onClose}
                className="cursor-pointer  rounded-full border-2 border-black bg-regalia px-2 py-1 text-sm font-semibold text-black  hover:border-regalia hover:bg-black hover:text-regalia md:px-3 md:py-2"
              >
                X
              </h2>
            </div>
            {/* <h1 className="text-red-600 font-semibold text-xs mb-2">
              {
                "This feature is currently under production, please don't use it !"
              }
            </h1> */}

            <div className="my-2 flex w-full flex-col items-start gap-2">
              <SelectInput
                options={events}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                value={inputs.event}
                name={"Event"}
                id={"event"}
              />
              <FormElement
                name="Phone"
                value={inputs.phone}
                type="text"
                id="phone"
                onChange={(e: any) => handleInputChange(e)}
              />
            </div>
            <div className="flex w-full flex-row flex-wrap justify-between">
              <button
                className="mt-3 cursor-pointer rounded-full border-2 border-regalia bg-regalia px-5 py-1 font-semibold text-black hover:bg-black hover:text-regalia"
                onClick={onClose}
              >
                Close
              </button>
              <button
                className="mt-3 cursor-pointer rounded-full border-2 border-regalia bg-regalia px-5 py-1 font-semibold text-black hover:bg-black hover:text-regalia"
                onClick={submitCoordinator}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      <Toaster position="bottom-right" />
    </>
  );
};

export default AddCoordinator;
