"use client";

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

import {
  User,
  addStudent,
  checkDayEntry,
  getCurrentSession,
} from "@/utils/functions/enterStudent";
import FormElement from "@/components/common/FormElement";
import { ClipLoader, FadeLoader } from "react-spinners";
import Image from "next/image";

const EntryAddPage = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(true);
  const [generatedPass, setGeneratedPass] = useState<string>("");
  const [isEntry, setIsEntry] = useState<boolean>(false);
  const [inputs, setInputs] = useState<any>({
    name: "",
    roll: "",
    email: "",
    phone: "",
  });

  const nameRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const router = useRouter();

  function redirectToEntry() {
    router.push("/entry");
  }

  async function handleAddStudent() {
    const student: User | any = {
      full_name: inputs.name,
      college_roll: inputs.roll,
      email: inputs.email,
      phone: parseInt(inputs.phone),
      day1: null,
      day2: null,
    };

    setIsSubmitted(false);

    if (isEntry) {
      const day = checkDayEntry();
      const security = await getCurrentSession();
      student[day] = {
        security: security,
        time: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
      };
    }

    await addStudent(student);

    try {
      const res = await fetch("/api/sendPass", {
        method: "POST",
        body: JSON.stringify({
          name: inputs.name,
          roll: inputs.roll,
          email: inputs.email,
          phone: inputs.phone,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const responseData = await res.json();
      setGeneratedPass(responseData.response?.imgur_response?.data?.link);
      setIsSubmitted(true);
      alert(responseData.message);
    } catch (error) {
      console.error("Error in sending email:", error);
      alert("Failed to send email. Please try again later.");
      setIsSubmitted(true);
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>,
  ) => {
    const { name, value } = e.target;
    setInputs((prevInputs: any) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  return (
    <div className="mx-auto flex w-full flex-col items-start  justify-center gap-5 px-2 py-10">
      <h1 className="w-full text-center font-hollirood text-2xl font-semibold tracking-wider text-regalia">
        Add Entry
      </h1>
      <div className="mx-auto w-full max-w-md px-4">
        <div className="mx-auto flex w-full flex-col justify-center gap-5">
          <FormElement
            id="name"
            name="Name"
            type="text"
            value={inputs?.name}
            onChange={handleInputChange}
            width="100%"
          />
          <FormElement
            id="email"
            name="Email"
            type="text"
            value={inputs?.email}
            onChange={handleInputChange}
            width="100%"
          />
          <FormElement
            id="roll"
            name="College Roll"
            type="text"
            value={inputs?.roll}
            onChange={handleInputChange}
            width="100%"
          />
          <FormElement
            id="phone"
            name="Phone"
            type="text"
            value={inputs?.phone}
            onChange={handleInputChange}
            width="100%"
          />
          <div className="flex flex-row items-center gap-2">
            <label htmlFor="entry">Entry</label>
            <input
              type="checkbox"
              id="entry"
              name="Entry"
              checked={isEntry}
              className="checked:bg-regalia focus:ring-0 active:ring-0"
              onChange={() => setIsEntry(!isEntry)}
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleAddStudent}
        disabled={!isSubmitted}
        className=" mx-auto w-1/2 cursor-pointer rounded-full border-2 border-regalia bg-regalia px-2 py-1 font-semibold text-black hover:border-regalia hover:bg-black hover:text-regalia md:w-1/3 md:text-xl"
      >
        {isSubmitted ? "Submit" : <ClipLoader color="#c9a747" size={20} />}
      </button>
      {generatedPass && (
        <Image
          src={generatedPass}
          alt="Generated Pass"
          width={200}
          height={200}
        />
      )}
    </div>
  );
};

export default EntryAddPage;
