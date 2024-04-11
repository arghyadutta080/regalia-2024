import React from "react";

type Params = {
  params: {
    event: string;
  };
};

const page = ({ params: { event } }: Params) => {
  const eventName = event.replace(/%20/g, "-").toLowerCase();
  return <div>{eventName} page</div>;
};

export default page;
