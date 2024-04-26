"use client";

import ApproveModal from "@/components/admin/ApproveModal";
import { MemberModal } from "@/components/admin/MemberModal";
import FormElement from "@/components/common/FormElement";
import { useUser } from "@/lib/store/user";
import { getRegistrations } from "@/utils/functions/getRegistrations";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { PuffLoader } from "react-spinners";

const Page = () => {
  const user = useUser((state) => state.user);
  const [registrations, setRegistrations] = useState<any>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filteredResults, setFilteredResults] = useState<any>([]);
  const [modalData, setModalData] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    phone: "",
    transactionId: "",
    eventName: "",
    createdAt: "",
    swc: "",
    teamLeadName: "",
    teamLeadEmail: "",
    college: "",
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>,
  ) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  useEffect(() => {
    const sortedResults = [...filteredResults].sort((a, b) =>
      sortOrder === "asc"
        ? a.transaction_verified - b.transaction_verified
        : b.transaction_verified - a.transaction_verified,
    );
    setFilteredResults(sortedResults);
  }, [sortOrder, JSON.stringify(filteredResults)]);

  const [loading, setLoading] = useState(true);
  const [swcCount, setSwcCount] = useState(0);
  const [nonSwcCount, setNonSwcCount] = useState(0);
  const [collegeRegCount, setCollegeRegCount] = useState(0);
  const [outCollegeRegCount, setOutCollegeRegCount] = useState(0);
  const [membersData, setMembersData] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  useMemo(() => {
    const fetchData = async () => {
      try {
        const data = await getRegistrations();

        setFilteredResults(data);
        setRegistrations(data);
        // console.log(data);
        setLoading(false);
        // const swcPaidRegistrationsCount = data.filter(
        //   (res: any) => res.swc === "Yes"
        // ).length;
        // setSwcCount(swcPaidRegistrationsCount);
        // const nonswcPaidRegistrationsCount = data.filter(
        //   (res: any) => res.swc === "No" && (res.college.toLowerCase().includes("rcciit") || res.college.toLowerCase().includes("rcc institute of information technology"))
        // ).length;
        // setNonSwcCount(nonswcPaidRegistrationsCount);

        // const collegeRegs = data.filter(
        //   (res: any) =>
        //     res.college.toLowerCase().includes("rcciit") ||
        //     res.college
        //       .toLowerCase()
        //       .includes("rcc institute of information technology")
        // ).length;
        // setOutCollegeRegCount(data.length - collegeRegs);
        // setCollegeRegCount(collegeRegs);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();
  }, [filteredResults.length == 0]);

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const onClose = () => {
    setOpen(false);
  };
  // useEffect(() => {
  //   const filteredResults = registrations.filter(
  //     (registration: any) =>
  //       registration.team_lead_phone.includes(inputs.phone) &&
  //     registration.team_lead_email.includes(inputs.teamLeadEmail) &&
  //       registration.transaction_id.includes(inputs.transactionId) &&
  //       registration.swc.toLowerCase().includes(inputs.swc.toLowerCase()) &&
  //       registration.college
  //         .toLowerCase()
  //         .includes(inputs.college.toLowerCase()) &&
  //       registration.team_lead_name
  //         .toLowerCase()
  //         .includes(inputs.teamLeadName.toLowerCase()) &&
  //       registration.events.event_name
  //         .toLowerCase()
  //         .includes(inputs.eventName.toLowerCase()) &&
  //       new Date(registration.created_at)
  //         .toLocaleDateString("en-US", options)
  //         .includes(inputs.createdAt)
  //   );
  //   setFilteredResults(filteredResults);
  // }, [inputs, registrations]);
  const options: any = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  return (
    <div className="mx-auto flex  min-h-[80vh] w-full flex-col items-center gap-5">
      <h1 className="text-center font-hollirood text-4xl font-semibold tracking-wider">
        Admin Dashboard
      </h1>

      {loading ? (
        <div className="flex min-h-[60vh] flex-col items-center justify-center">
          <PuffLoader size={40} color="#c9a747" />{" "}
        </div>
      ) : filteredResults?.length == 0 ? (
        <h1 className="mx-auto mt-20 flex w-full flex-col items-center justify-center font-hollirood text-2xl font-semibold tracking-wider text-red-600">
          No Such Registrations Available !
        </h1>
      ) : (
        <div className="mx-auto w-full overflow-x-auto px-3">
          <table className="oveflow-x-auto w-full table-auto rounded-xl border border-gray-300 font-hollirood leading-8 tracking-widest">
            <thead>
              <tr className="text-center">
                <th>Sl. No.</th>
                <th
                  className="flex cursor-default items-center px-4 py-2"
                  onClick={handleSort}
                >
                  Payment Status
                  {sortOrder === "asc" ? (
                    <span className="ml-1">▲</span>
                  ) : (
                    <span className="ml-1">▼</span>
                  )}
                </th>
                <th>Event Name</th>
                <th>Type</th>
                <th>Team Name</th>
                <th>College</th>
                <th>Name</th>
                <th>Team Lead Phone</th>
                <th>Team Lead Email</th>
                <th>Transaction ID</th>
                <th>Members</th>
                <th>Registered at</th>
                <th>SWC</th>
              </tr>
            </thead>

            <tbody>
              {filteredResults.map((registration: any, index: number) => {
                return (
                  <>
                    <tr
                      key={index}
                      className={
                        registration.transaction_verified
                          ? "bg-green-100 text-center text-sm font-semibold text-green-500"
                          : "cursor-pointer bg-red-100 text-center text-sm font-semibold text-red-500 hover:bg-red-200 hover:text-red-600"
                      }
                    >
                      <td className="border  border-gray-300 px-4 py-2">
                        {index + 1}
                      </td>
                      <td
                        className="border border-gray-300 px-4 py-2"
                        onClick={() => {
                          setModalData(registration);
                          setOpen(true);
                        }}
                      >
                        {registration.transaction_verified
                          ? "Verified"
                          : "Not Verified"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {registration.events[0].event_name}
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        {registration.events[0].max_team_member > 1
                          ? "Team"
                          : "Solo"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {registration.team_name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {registration.college}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {registration?.users?.name!}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {registration?.team_lead_phone!}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {registration?.users?.email!}
                      </td>
                      <td className="border border-gray-300  py-2">
                        {registration.transaction_id}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <button
                          onClick={() => {
                            setMembersData(registration.participations);
                            setIsModalOpen(true);
                          }}
                          className="rounded-xl border border-black bg-black px-5 py-2 text-center text-xs font-semibold text-white hover:bg-white hover:text-black"
                        >
                          View Members
                        </button>
                      </td>
                      <td className="border border-gray-300 py-2">
                        {new Date(registration.created_at).toLocaleDateString(
                          "en-US",
                          options,
                        )}
                      </td>
                      <td
                        className={`${
                          !registration.users.swc ? "text-red-600" : ""
                        } border border-gray-300 py-2`}
                      >
                        {registration.users.swc ? "Yes" : "No"}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <ApproveModal
        isOpen={open}
        onClose={onClose}
        data={modalData}
        setRegistrations={setRegistrations}
      />
      <MemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        members={membersData}
      />
    </div>
  );
};

export default Page;
