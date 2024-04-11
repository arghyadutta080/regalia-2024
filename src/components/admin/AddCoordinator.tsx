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

}: {
  isOpen: boolean;
  onClose: () => void;

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
    >
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
        .eq("fest_name", "Regalia").eq("year",2024);
      setEvents(res.data?.map((event: any) => event.event_name));
    };
    getEventDetails();
    
  }, [isOpen]);

  const submitCoordinator = async () => {
    await addCoordinator(inputs);
    toast.success("Coordinator Added !");
    onClose();
  };
  return (
    <>
      {isOpen && (
        <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[50]">
          <div className="bg-body border-y-2  border-regalia w-[90%] md:w-1/3 p-4 rounded-lg relative   flex flex-col items-start  ">
            <div className="w-full flex flex-row mb-2 items-center justify-between">
              <h2 className="text-lg font-semibold">Coordinator Addition</h2>

              <h2
                onClick={onClose}
                className="bg-regalia  md:py-2 md:px-3 px-2 py-1 hover:bg-black hover:text-regalia border-2 border-black hover:border-regalia  text-black text-sm font-semibold rounded-full cursor-pointer"
              >
                X
              </h2>
            </div>
            {/* <h1 className="text-red-600 font-semibold text-xs mb-2">
              {
                "This feature is currently under production, please don't use it !"
              }
            </h1> */}

            <div className="flex flex-col items-start gap-2 my-2 w-full">
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
            <div className="flex flex-row flex-wrap justify-between w-full">
            <button
                className="border-2 mt-3 cursor-pointer border-regalia px-5 py-1 rounded-full font-semibold bg-regalia text-black hover:bg-black hover:text-regalia"
                onClick={onClose}
              >
                Close
              </button>
              <button
                className="border-2 mt-3 cursor-pointer border-regalia px-5 py-1 rounded-full font-semibold bg-regalia text-black hover:bg-black hover:text-regalia"
                onClick={submitCoordinator}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      <Toaster  position="bottom-right" />
    </>
  );
};

export default AddCoordinator;