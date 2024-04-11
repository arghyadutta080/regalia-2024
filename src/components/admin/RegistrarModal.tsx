"use client";
import { supabase } from "@/lib/supabase-client";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import RegFormElement from "../common/RegFormElement";
import FormElement from "../common/FormElement";


const RegistrarModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [email, setEmail] = useState("");

  const submitRegistrar = async () => {
    if (email === "") {
      toast.error("Enter Email !");
    } else {
      const { data, error } = await supabase
        .from("users")
        .select("id")
        .eq("email", email);
      if (data == null || data.length == 0) {
        toast.error("User not found !");
      } else {
        await supabase
          .from("roles")
          .insert({
            id: data[0].id,
            role: "registrar",
          })
          .select();
        toast.success("Registrar Added !");
        onClose();
      }
    }
  };
  return (
    <>
      {isOpen && (
        <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[50]">
          <div className="bg-body border-y-2 border-regalia text-regalia w-[90%] md:w-1/4 px-4 py-8 rounded-lg relative   flex flex-col items-start  ">
            <div className="w-full flex flex-row mb-2 items-center justify-between">
              <h2 className="text-lg font-semibold">Registrar Addition</h2>

              <h2
                onClick={onClose}
                className="border-2 mt-3 border-regalia px-5 py-1 rounded-full font-semibold bg-regalia text-black hover:bg-black cursor-pointer hover:text-regalia"
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
              <FormElement
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                name="Email"
                value={email}
                type="email"
                width="100%"
              />
            </div>
            <div className="flex flex-row flex-wrap justify-between w-full">
              <button
                className="border-2 mt-3 border-regalia px-5 py-1 rounded-full font-semibold bg-regalia text-black hover:bg-black hover:text-regalia"
                onClick={onClose}
              >
                Close
              </button>
              <button
                className="border-2 mt-3 border-regalia px-5 py-1 rounded-full font-semibold bg-regalia text-black hover:bg-black hover:text-regalia"
                onClick={submitRegistrar}
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

export default RegistrarModal;