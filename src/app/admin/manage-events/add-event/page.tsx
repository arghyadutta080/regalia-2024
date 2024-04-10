"use client";
import LinkChip from "@/components/admin/LinkChip";
import LinkForm from "@/components/admin/LinkForm";
import FormElement from "@/components/common/FormElement";
import Heading from "@/components/common/Heading";
import { coordinatorType, eventInputType, linkType } from "@/lib/types/event";
import { addEvent } from "@/utils/functions/addEvent";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import "react-quill/dist/quill.snow.css";
import { FadeLoader } from "react-spinners";

const page = () => {
  const router = useRouter();
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    [],
  );
  const [isLinkFormOpen, setIsLinkFormOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(true);
  const [inputs, setInputs] = useState<eventInputType>({
    name: "",
    description: "",
    schedule: "",
    minTeamSize: 1,
    maxTeamSize: 1,
    coordinators: [],
    price: "",
    prize: "",
    rules: "",
    imagePath: "",
    links: [],
  });
  const [error, setError] = useState("");
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>,
  ) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  const handleQuillChange = (value: string, name: string) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleAddCoordinator = (coordinator: coordinatorType) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      coordinators: [...prevInputs.coordinators, coordinator],
    }));
  };
  const handleRemoveCoordinator = (index: number) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      coordinators: prevInputs.coordinators.filter((_, idx) => idx !== index),
    }));
  };
  const [isCoordinatorFormOpen, setIsCoordinatorFormOpen] = useState(false);
  const openCoordinatorForm = () => {
    setIsCoordinatorFormOpen(true);
  };

  const closeCoordinatorForm = () => {
    setIsCoordinatorFormOpen(false);
  };

  const handleAddLink = (link: linkType) => {
    setInputs((prevInputs: any) => ({
      ...prevInputs,
      links: [...prevInputs.links, link],
    }));
  };
  const handleRemoveLink = (index: number) => {
    setInputs((prevInputs: any) => ({
      ...prevInputs,
      links: prevInputs.links.filter((_: any, idx: number) => idx !== index),
    }));
  };
  const submitEvent = () => {
    setIsSubmitted(false);
    addEvent(inputs);
    setIsSubmitted(true);
    router.push("/admin/manage-events");
  };

  return (
    <div className="mx-auto flex w-[90%] flex-col items-center justify-center gap-5 overflow-x-hidden font-hollirood tracking-wider md:w-[80%]">
      <Heading text="Add Event" />
      <div className="bg-body mx-auto flex w-full flex-col flex-wrap gap-5  rounded-xl border-2 border-regalia px-2 py-5  md:px-10 md:py-10">
        <div className=" flex w-full flex-row flex-wrap items-center justify-start gap-8 md:gap-5  ">
          <FormElement
            name="Event Name"
            value={inputs.name}
            id="name"
            onChange={(e: any) => handleInputChange(e)}
            type="text"
          />
          <div className="flex w-full flex-col flex-wrap items-start justify-start gap-1 md:gap-5">
            <label htmlFor={"schedule"} className="font-semibold md:text-xl">
              Schedule :
            </label>
            <ReactQuill
              theme="snow"
              value={inputs.schedule}
              className="w-full border-2 border-black"
              onChange={(value) => handleQuillChange(value, "schedule")}
            />
          </div>
          <FormElement
            name="Registration Fees"
            value={inputs.price}
            id="price"
            onChange={(e: any) => handleInputChange(e)}
            type="text"
          />
          <FormElement
            name="Prize Pool"
            value={inputs.prize}
            id="prize"
            onChange={(e: any) => handleInputChange(e)}
            type="text"
          />
          <FormElement
            name="Min Team Size"
            value={inputs.minTeamSize.toString()}
            id="minTeamSize"
            onChange={(e: any) => handleInputChange(e)}
            type="number"
          />
          <FormElement
            name="Max Team Size"
            value={inputs.maxTeamSize.toString()}
            id="maxTeamSize"
            onChange={(e: any) => handleInputChange(e)}
            type="number"
          />
          {/* <FormElement
            name="Venue"
            value={inputs.venue}
            id="venue"
            onChange={(e: any) => handleInputChange(e)}
            type="text"
          /> */}
          <FormElement
            name="Image Path"
            value={inputs.imagePath}
            id="imagePath"
            onChange={(e: any) => handleInputChange(e)}
            type="text"
          />
        </div>
        <div className="flex flex-col items-start gap-2 text-regalia">
          <label
            htmlFor={"links"}
            className="flex flex-row items-center gap-2 text-base font-semibold  text-white md:text-lg"
          >
            Links :
            {inputs.links.length == 0 && (
              <div className="font-semibold">
                <TbSquareRoundedPlusFilled
                  onClick={() => setIsLinkFormOpen(true)}
                  className="cursor-pointer rounded-full font-semibold text-regalia"
                  size={30}
                />
              </div>
            )}
          </label>
          <div className="flex flex-col items-start">
            {inputs.links.length > 0 &&
              inputs.links.map((link: linkType, index: number) => {
                return (
                  <LinkChip
                    name={link.title}
                    link={link.url}
                    index={index}
                    handleAddLink={handleAddLink}
                    handleRemoveLink={handleRemoveLink}
                    isLinkFormOpen={isLinkFormOpen}
                    setIsLinkFormOpen={setIsLinkFormOpen}
                  />
                );
              })}
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-5 max-md:flex-wrap lg:flex-row">
          <div className="flex w-full flex-col gap-5 lg:w-1/2">
            <div className="flex w-full flex-col flex-wrap items-start justify-start gap-1 md:gap-5">
              <label
                htmlFor={"description"}
                className="font-semibold md:text-xl"
              >
                Description :
              </label>
              <ReactQuill
                theme="snow"
                value={inputs.description}
                className="w-full border-2 border-black"
                onChange={(value) => handleQuillChange(value, "description")}
              />
            </div>

            <div className="flex w-full flex-col flex-wrap items-start justify-start gap-1 md:gap-5">
              <label
                htmlFor={"description"}
                className="font-semibold md:text-xl"
              >
                Rules :
              </label>
              <ReactQuill
                theme="snow"
                value={inputs.rules}
                className="w-full border-2 border-black"
                onChange={(value) => handleQuillChange(value, "rules")}
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 text-center lg:w-1/2">
            {inputs.coordinators.length == 0 ? (
              <h1>No Coordinators Added yet !</h1>
            ) : (
              <div className="font-sans">
                <h2 className="text-xl font-semibold ">Coordinators</h2>
                <ul className="flex flex-col items-center gap-2">
                  {inputs.coordinators.map((coordinator, index) => (
                    <li
                      key={index}
                      className="rounded-xl border-2 border-regalia px-2 py-1 text-regalia"
                    >
                      <p className="text-lg font-semibold text-regalia">
                        {index + 1}. {coordinator.name}
                      </p>
                      <p className="text-lg font-semibold text-white">
                        {coordinator.email}
                      </p>
                      <button
                        onClick={() => handleRemoveCoordinator(index)}
                        className="mt-3 rounded-full border-2 border-red-500 px-2 font-semibold  text-red-500"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button
              onClick={openCoordinatorForm}
              className="mx-auto rounded-full border-2 border-regalia bg-regalia px-2 py-1 text-sm font-semibold text-black hover:border-regalia hover:bg-black hover:text-regalia  md:w-1/2  md:text-lg"
            >
              ADD COORDINATOR
            </button>
            <h1 className="text-xs font-semibold text-red-600">
              This feature is optional ! You can add coordinators seperately
              later.
            </h1>
          </div>
        </div>
        <p className="text-lg font-semibold text-red-500">{error}</p>

        <button
          onClick={submitEvent}
          disabled={!isSubmitted}
          className=" mx-auto w-1/2 cursor-pointer rounded-full border-2 border-regalia bg-regalia px-2 py-1 font-semibold text-black hover:border-regalia hover:bg-black hover:text-regalia md:w-1/3 md:text-xl"
        >
          {isSubmitted ? (
            "Submit"
          ) : (
            <FadeLoader className="text-black" width={20} height={20} />
          )}
        </button>
      </div>

      <CoordinatorForm
        isOpen={isCoordinatorFormOpen}
        onClose={closeCoordinatorForm}
        onAddCoordinator={handleAddCoordinator}
      />
      <LinkForm
        handleAddLink={handleAddLink}
        isOpen={isLinkFormOpen}
        onClose={() => setIsLinkFormOpen(false)}
      />
    </div>
  );
};

const CoordinatorForm = ({
  isOpen,
  onClose,
  onAddCoordinator,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddCoordinator: (coordinator: coordinatorType) => void;
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = () => {
    if (name && email) {
      onAddCoordinator({ name, email });
      setName("");
      setEmail("");
      setPhone("");
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-body rounded-lg border-y-2 border-regalia p-4 font-sans">
            <h2 className="mb-2 text-lg font-semibold">Add Coordinator</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="bg-body rounded-xl border-regalia px-2 py-1 text-slate-300"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="bg-body rounded-xl border-regalia px-2 py-1 text-slate-300"
              />
              {/* <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                className="border-black  px-2 py-1 rounded-xl"
              /> */}
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="mr-2 cursor-pointer rounded-md border-regalia bg-regalia px-4 py-2 text-black hover:border-regalia hover:bg-black hover:text-regalia"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="cursor-pointer rounded-md border-regalia bg-regalia px-4 py-2 text-black hover:border-regalia hover:bg-black hover:text-regalia"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default page;
