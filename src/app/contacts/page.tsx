import Heading from "@/components/common/Heading";
import Block from "@/components/contacts/Block";
import React from "react";

const page = () => {
  return (
    <div className="mx-auto mt-10 flex flex-col items-center gap-5">
      <Heading text="Contact Us" />
      <Block />
    </div>
  );
};

export default page;
