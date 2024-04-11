"use client";
import CoordinatorForm from "@/components/admin/CoordinatorForm";
import LinkChip from "@/components/admin/LinkChip";
import LinkForm from "@/components/admin/LinkForm";
import FormElement from "@/components/common/FormElement";
import parse from "html-react-parser";
import Heading from "@/components/common/Heading";
import { supabase } from "@/lib/supabase-client";
import { coordinatorType, eventInputType, linkType } from "@/lib/types/event";
import { getCoordinators } from "@/utils/functions/getCoordinators";
import { updateEvent } from "@/utils/functions/updateEvent";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import { BeatLoader, FadeLoader, PuffLoader } from "react-spinners";
import "react-quill/dist/quill.snow.css";
import ConfirmModal from "@/components/admin/ConfirmModal";

const Page = () => {
  const eventId = useParams().event.toLocaleString();
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(true);
  const [isLinkFormOpen, setIsLinkFormOpen] = useState<boolean>(false);
  const [coordinators, setCoordinators] = useState<any>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
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

  useEffect(() => {
    const fetchEvent = async () => {
      const { data } = await supabase
        .from("events")
        .select("*,roles(id)")
        .eq("id", eventId);
      if (data && data.length > 0) {
        setInputs((prevInputs) => ({
          ...prevInputs,
          name: data![0].event_name,
          description: data![0].desc,
          date: data![0].date,
          time: data![0].time,
          schedule: data![0].schedule,
          minTeamSize: data![0].min_team_member,
          maxTeamSize: data![0].max_team_member,
          coordinators: [],
          links: data![0].links,
          price: data![0].registration_fees,
          prize: data![0].prize,
          rules: data![0].rules,
          imagePath: data![0].event_image_url,
        }));
      }
    };
    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    const getCoordinatorData = async () => {
      const coordinatorData = await getCoordinators(eventId);
    
      let coordinatorsArray: any = [];
      coordinatorData?.forEach((eventCoordinator: any) => {
        coordinatorsArray.push(eventCoordinator.users!);
      });
      setCoordinators(coordinatorsArray);
      setLoading(false);
    };
    getCoordinatorData();
  }, [eventId]);
  const router = useRouter();
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    [],
  );
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
  // console.log(inputs);
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

  const submitEvent = async () => {
    await updateEvent(inputs, eventId);
    toast.success("Event Updated Successfully !");
    router.push("/admin/manage-events");
  };
  const onClose = () => {
    setIsConfirmOpen(false);
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
  return (
    <div className="mx-auto flex w-[90%] flex-col items-center justify-center gap-5 overflow-x-hidden font-hollirood tracking-wider md:w-[80%]">
      <Heading text="Edit Event" />
      {loading ? (
        <div className="mx-auto flex min-h-[80vh] w-full flex-col items-center justify-center">
          <PuffLoader size={25} color="#c9a747" className="text-regalia" />
        </div>
      ) : (
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
                    key={index}
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
              <div>{coordinators.length > 0 && (
                <div className="font-sans">
                  <h2 className="text-xl font-semibold ">Old Coordinators</h2>
                  <ul className="flex flex-col items-center gap-2">
                    {coordinators.map((coordinator:any, index:number) => (
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
                          onClick={() => setIsConfirmOpen(true)}
                          className="mt-3 rounded-full border-2 border-red-500 px-2 font-semibold  text-red-500"
                        >
                          Remove
                        </button>
                        <ConfirmModal
                        setCoordinators={setCoordinators}
                        coordinators={coordinators}
                        isConfirmOpen={isConfirmOpen}
                        onClose={onClose}
                        coordinatorId={coordinator.id!.toString()}
                      />
                      </li>
                    ))}
                  </ul>
                 
                </div>
              )}
            
            </div>
              <div>{inputs.coordinators.length == 0 ? (
                <h1>No Coordinators Added yet !</h1>
              ) : (
                <div className="font-sans">
                  <h2 className="text-xl font-semibold ">New Coordinators</h2>
                  <ul className="flex flex-col items-center gap-2">
                    {inputs.coordinators.map((coordinator:any, index:number) => (
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
              </h1></div>
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
      )}

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

export default Page;
