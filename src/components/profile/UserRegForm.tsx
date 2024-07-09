"use client";
import { useUser } from "@/lib/store/user";
import { supabase } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import RegFormElement from "../common/RegFormElement";
import { clearSpaces, validateUserReg } from "@/utils/functions/validate";
import FormElement from "../common/FormElement";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "../ui/moving-border";
import { clickSound } from "@/utils/functions";
import { ClipLoader } from "react-spinners";
import { checkSWC } from "@/utils/functions/checkSWC";
import { generatePass } from "@/utils/functions/generatePass";
import { updatePass } from "@/utils/functions/updatePass";

const UserRegForm = () => {
  const [isPassGenerated, setIsPassGenerated] = useState(true);
  const user = useUser((state) => state.user);
  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
    roll: "",
    college: "",
    gender: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    college: "",
    roll: "",
    gender: "",
  });
  const router = useRouter();
  // console.log(inputs);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>,
  ) => {
    const { name, value } = e.target;
    setInputs((prevInputs: any) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const validation = validateUserReg(inputs);
      const allFieldsEmpty = Object.values(validation).every(
        (value) => value === "",
      );
      if (allFieldsEmpty) {
        const { error } = await supabase
          .from("users")
          .update({
            name: inputs.name,
            college: inputs.college,
            phone: clearSpaces(inputs.phone).trim(),
            gender: inputs.gender,
            college_roll: inputs?.roll!,
          })
          .eq("id", user?.id);
        if (error) {
          error.message.includes("duplicate key value")
            ? toast.error("Phone number already registered")
            : toast.error("There was an error submitting the form");
          throw error;
        }
        // sendReferral();
        router.push("/events");
        router.refresh();
        toast.success("Registration Successful");
      }
      if (!allFieldsEmpty) {
        setErrors(validation);
        toast.error("Fill all the fields accurately !");
        return;
      }
    } catch (error) {
      // console.log("Error occurred", { error });
    }
  };

  useEffect(() => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      name: user?.name!,
      phone: user?.phone!,
      roll: user?.college_roll!,
      college: user?.college!,
      gender: user?.gender!,
    }));
  }, [user]);
  const [generatedPass, setGeneratedPass] = useState("");
  const handleGeneratePass = async () => {
    clickSound();
    setIsPassGenerated(false);
    const res = await checkSWC(user?.email!);
    if (res) {
      const data = await generatePass(
        inputs.name,
        inputs.phone,
        user?.email!,
        inputs.roll,
      );
      setGeneratedPass(data?.response?.imgur_response?.data?.link);
      const userData = await updatePass(
        data?.response?.imgur_response?.data?.link,
        user?.email!,
      );
      console.log(userData);
    } else {
      console.log("Good");
    }
    console.log(res);
    setIsPassGenerated(true);
  };

  return (
    <div className="flex w-full flex-col justify-center gap-6  rounded-xl border border-regalia bg-body p-6 font-hollirood  md:py-10">
      {/* <Button
        borderRadius="1.75rem"
        className={`bg-slate-800 px-5 py-1 font-retrolight text-lg font-semibold text-white hover:scale-95 hover:border-2 md:px-7 md:py-2 lg:px-5 lg:py-3 `}
        onClick={handleGeneratePass}
      >
        {isPassGenerated ? (
          "View Pass"
        ) : (
          <ClipLoader color="#c9a747" size={20} />
        )}
      </Button> */}
      <FormElement
        name="Name"
        value={inputs.name}
        type="text"
        id={"name"}
        width="100%"
        onChange={handleInputChange}
      />
      {errors.name && (
        <h1 className="text-xs font-semibold text-red-600">{errors.name}</h1>
      )}
      <div className="flex flex-row items-end gap-2">
        <div className="text-md rounded-xl border border-regalia bg-body px-2 py-1 font-semibold">
          +91
        </div>
        <RegFormElement
          name="Phone"
          value={inputs.phone}
          type="text"
          id={"phone"}
          width="100%"
          onChange={handleInputChange}
        />
      </div>

      {errors.phone && (
        <h1 className="text-xs font-semibold text-red-600">{errors.phone}</h1>
      )}
      <FormElement
        name="Email"
        value={user?.email!}
        type="text"
        id={"email"}
        disabled={true}
        width="100%"
        onChange={handleInputChange}
      />

      <FormElement
        name="College"
        value={inputs.college}
        type="text"
        id="college"
        width="100%"
        onChange={handleInputChange}
      />
      {errors.college && (
        <h1 className="text-xs font-semibold text-red-600">{errors.college}</h1>
      )}
      <FormElement
        name="College Roll"
        value={inputs.roll}
        type="text"
        id="roll"
        width="100%"
        onChange={handleInputChange}
      />
      <h1 className="-mt-4 text-center text-xs font-semibold text-red-400">
        Roll Only for College students.
      </h1>
      {errors.roll && (
        <h1 className="text-xs font-semibold text-red-600">{errors.roll}</h1>
      )}
      <div className="flex flex-row flex-wrap items-center px-3 font-semibold  md:gap-2">
        <label htmlFor="gender">Gender : </label>
        <div className="flex w-full flex-row flex-wrap items-center gap-10  max-md:justify-between  md:items-center md:gap-16 ">
          <label className="flex flex-row items-center gap-1">
            <input
              name="gender"
              type="radio"
              value="male"
              className="bg-white text-regalia"
              checked={inputs.gender === "male"}
              onChange={handleInputChange}
              required={true}
            />
            Male
          </label>
          <label className="flex flex-row items-center gap-1">
            <input
              name="gender"
              type="radio"
              value="female"
              className="bg-white text-regalia"
              checked={inputs.gender === "female"}
              onChange={handleInputChange}
              required={true}
            />
            Female
          </label>
        </div>
      </div>
      {errors.gender && (
        <h1 className="text-xs font-semibold text-red-600">{errors.gender}</h1>
      )}
      <button
        onClick={handleSubmit}
        className="mx-auto rounded-xl border border-regalia bg-regalia px-10 py-2 font-semibold text-black hover:bg-black hover:text-regalia md:w-1/3"
      >
        Submit
      </button>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default UserRegForm;
