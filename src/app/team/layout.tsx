import TeamWrapper from "@/components/team/TeamWrapper";
import { Metadata } from "next";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const TeamLayout = ({children}: Props) => {
  return (
    <>
      <TeamWrapper>{children}</TeamWrapper>;
    </>
  );
};

export default TeamLayout;
