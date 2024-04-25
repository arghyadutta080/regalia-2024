"use client";
import SparkleHeading from "@/components/common/SparkleHeading";
import Block from "@/components/contacts/Block";
import { registrationConfirmationEmail } from "@/utils/constants/emails";
import React from "react";
import parse from "html-react-parser";
const page = () => {
  const dummyInputs = {
    teamName: "Team Awesome",
    teamLeadName: "John Doe",
    teamLeadPhone: "123-456-7890",
    teamLeadEmail: "john@example.com"
  };
  
  const dummyParticipants = [
    {
      name: "Alice",
      email: "alice@example.com",
      phone: "987-654-3210"
    },
    {
      name: "Bob",
      email: "bob@example.com",
      phone: "555-555-5555"
    }
  ];
  

  const dummyEmailHTML = registrationConfirmationEmail("Sargam" ,dummyInputs, dummyParticipants);
  const handleSendEmail = async () => {
  const data=  await fetch("/api/sendEmail", {
     method: "POST",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify({
       email: dummyEmailHTML
     })
    })
    console.log(data)
 }
  return (
    <div className="mx-auto my-10 flex flex-col w-full items-center gap-5">
      <div className="h-full w-full mx-auto flex items-center justify-center">
        {parse(dummyEmailHTML)}
      </div>
      
      <SparkleHeading text="Contact Us" />
      <Block />
      <button className="" onClick={handleSendEmail}>Send</button>
    </div>
  );
};

export default page;
