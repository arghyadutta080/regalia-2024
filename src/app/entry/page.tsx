"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PuffLoader } from "react-spinners";

import QrReader from "./_components/QrCodePlugin";
import {
  checkDayEntry,
  getStudent,
  enterStudent,
  User,
  DayEntry,
  getSecurityRoll,
  getSecurityDetails,
} from "@/utils/functions/enterStudent";
import EntryModal from "@/components/admin/EntryModal";
import InfoModal from "./_components/InfoModal";
import Link from "next/link";

const EntryPage = () => {
  const [specialMessage, setSpecialMessage] = useState<string>("");
  const [scanned, setScanned] = useState<string | undefined>();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [startScan, setStartScan] = useState<boolean>(false);
  const [day, setDay] = useState<DayEntry | null>(null);
  const [studentDetails, setStudentDetails] = useState<User | undefined>(
    undefined,
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<(User & { security: string }) | undefined>();
  const [canAddUser, setCanAddUser] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [securityEntries, setSecurityEntries] = useState<DayEntry[]>([]); // State to hold security entries
  const router = useRouter();

  useEffect(() => {
    getSecurityRoll().then((roles) => {
      if (roles.includes("super_admin") || roles.includes("security_admin")) {
        setCanAddUser(true);
      }
    });
  }, []);

  function resetEntry() {
    setScanned(undefined);
    setStartScan(false);
    setPhoneNumber("");
    setRollNumber(""); // Reset rollNumber state
    setStudentDetails(undefined);
    setData(undefined);
    setDay(null);
    setSecurityEntries([]); // Reset security entries state
  }

  async function handleEntry(data: {
    name?: string;
    email?: string;
    phone?: string;
    roll?: string;
  }) {
    if (!data.email && !data.phone && !data.roll) {
      alert("Invalid QR Data !");
      return;
    }

    try {
      const student: any = await getStudent({
        email: data?.email,
        phone: data?.phone,
        college_roll: data?.roll,
      });
      setStudentDetails(student);

      if (!student) {
        resetEntry();
        setSpecialMessage("Student not found !");
        setShowModal(true);
        return;
      }

      const dayEntry = checkDayEntry();

      if (dayEntry === "day_missed") {
        resetEntry();
        setSpecialMessage("Today is not an event day !");
        setShowModal(true);
        return;
      }

      if (student[dayEntry]) {
        const dayOfScanning = checkDayEntry();
        const dayEntryObj: DayEntry = {
          security: student?.security,
          time: new Date().toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
          }),
        };

        if (dayOfScanning === "day1" || dayOfScanning === "day2") {
          const updatedDay = [...(student[dayOfScanning] || []), dayEntryObj];
          await enterStudent({
            userEntry: updatedDay,
            email: student.email,
            day: dayOfScanning,
          });
          setScanned(student.full_name);
          const details = await getSecurityDetails(updatedDay);
          setSecurityEntries(details);
        } else {
          alert("Invalid Day");
        }
        setDay(student[dayEntry]);
        return;
      }

      setScanned(student.full_name);
      setData(student);
      setIsOpen(true);
    } catch (error) {
      console.error("Error handling entry:", error);
      alert("Failed to process entry");
    }
  }

  function handleScan(data: string | null) {
    setStartScan(false);
    try {
      const parsedData = JSON.parse(data || "");
      if (parsedData) {
        handleEntry(parsedData);
      }
    } catch (e) {
      resetEntry();
      alert("Invalid QR Code");
    }
  }

  function startScanning() {
    resetEntry();
    setStartScan(true);
  }

  const handleSubmitPhoneNumber = () => {
    resetEntry();
    handleEntry({ phone: phoneNumber });
  };

  const handleSubmitRollNumber = () => {
    resetEntry();
    handleEntry({ roll: rollNumber.toUpperCase() });
  };

  const handleInputPhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleInputRollNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRollNumber(e.target.value);
  };

  const handleAccept = async (data: User & { security: string }) => {
    setIsOpen(false);
    resetEntry();
    const student: any = await getStudent({
      email: data?.email,
      phone: data?.phone.toString(),
      college_roll: data?.college_roll,
    });
    setStudentDetails(student);

    if (!student) {
      resetEntry();
      setSpecialMessage("Student not found !");
      setShowModal(true);
      return;
    }
    const dayEntry: DayEntry = {
      security: data.security,
      time: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
    };

    try {
      const dayOfScanning = checkDayEntry();
      if (dayOfScanning === "day1" || dayOfScanning === "day2") {
        const updatedDay = [...(data[dayOfScanning] || []), dayEntry];
        await enterStudent({
          userEntry: updatedDay,
          email: data.email,
          day: dayOfScanning,
        });
        setScanned(data.full_name);
        const details = await getSecurityDetails(updatedDay);
        setSecurityEntries(details);
      } else {
        alert("Invalid Day");
      }
    } catch (error: any) {
      console.error("Error accepting entry:", error.message);
      alert("Failed to process entry");
    }
  };

  const handleReject = () => {
    setIsOpen(false);
    resetEntry();
  };

  return (
    <div className="mt-5 flex min-h-[80vh]  flex-col  items-center justify-center text-center font-hollirood text-3xl font-bold text-regalia">
      {showModal && (
        <InfoModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          component={
            <h1 className="font-hollirood text-sm tracking-wide">
              {specialMessage}
            </h1>
          }
        />
      )}
      <div className="m-5 flex  flex-col justify-between bg-transparent">
        {startScan ? (
          <QrReader onScanSuccess={handleScan} />
        ) : (
          <>
            <div className="flex h-full items-center justify-center">
              {scanned ? (
                <div
                  className={`rounded-lg p-2 text-base tracking-wide text-green-400`}
                >
                  <div className="flex flex-col items-start justify-center gap-1">
                    <h1>
                      Name : <span className="text-regalia">{scanned}</span>{" "}
                    </h1>
                    <h1>
                      Roll :{" "}
                      <span className="text-regalia">
                        {studentDetails?.college_roll}
                      </span>
                    </h1>
                    <h1>
                      Phone :{" "}
                      <span className="text-regalia">
                        {studentDetails?.phone}
                      </span>
                    </h1>
                  </div>
                  {securityEntries.length > 0 && (
                    <div className="mx-auto my-2 max-h-[30vh] overflow-y-scroll px-2 text-sm text-white">
                      Previous entries:
                      <ul className=" ml-4">
                        {securityEntries.map((entry, index) => (
                          <li key={index} className="my-2">
                            <span className="mr-2 text-regalia">
                              {index + 1}.
                            </span>{" "}
                            {entry?.time?.split(",")[1]} -{" "}
                            <span className="text-regalia">
                              {entry.security}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col text-center font-hollirood text-regalia">
                  Scan the QR Code to enter the venue
                </div>
              )}
            </div>
            <div className="my-10 flex items-center justify-center">
              <button
                className="rounded-lg bg-regalia p-2 text-lg text-white"
                onClick={startScanning}
              >
                Scan QR Code
              </button>
            </div>
          </>
        )}
      </div>
      <input
        type="text"
        inputMode="numeric"
        placeholder="Enter Phone Number"
        value={phoneNumber}
        onChange={handleInputPhoneNumber}
        className="w-[85%] rounded-lg border-2 border-regalia p-2 text-lg text-black"
      />
      <button
        className={`mb-4 mt-3 rounded-lg bg-regalia p-2 text-lg text-white ${phoneNumber.length === 10 ? "" : "cursor-not-allowed opacity-50"}`}
        disabled={phoneNumber.length !== 10}
        onClick={handleSubmitPhoneNumber}
      >
        Submit Phone Number
      </button>
      <input
        type="text"
        inputMode="numeric"
        placeholder="Enter Roll Number"
        value={rollNumber}
        onChange={handleInputRollNumber}
        className="w-[85%] rounded-lg border-2 border-regalia p-2 text-lg text-black"
      />
      <button
        className={`mt-3 rounded-lg bg-regalia p-2 text-lg text-white ${rollNumber.length > 6 ? "" : "cursor-not-allowed opacity-50"}`}
        disabled={rollNumber.length <= 6}
        onClick={handleSubmitRollNumber}
      >
        Submit Roll Number
      </button>
      {canAddUser && (
        <button
          className="mt-5 rounded-lg bg-regalia p-2 text-lg text-white"
          onClick={() => router.push("/entry/add")}
        >
          Add Student
        </button>
      )}
      <EntryModal
        isOpen={isOpen}
        accept={handleAccept}
        reject={handleReject}
        data={data as User & { security: string }}
      />
      <div className="mt-5 flex flex-col items-center gap-2 text-sm tracking-wider">
        <h1 className="tracking-widest text-red-500">
          For Emergency Issues : Contact
        </h1>

        <h1 className="tracking-widest text-white">
          ATANU BISWAS :{" "}
          <Link href={"tel:+91 8116335804"} className="text-green-400">
            +91 8116335804
          </Link>
        </h1>
        <h1 className="tracking-widest text-white">
          SOUMYARAJ BAG :{" "}
          <Link href={"tel:+91 8337045160"} className="text-green-400">
            +91 8337045160
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default EntryPage;
