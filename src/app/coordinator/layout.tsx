import { Footer } from "@/components/common";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
};

export default layout;
