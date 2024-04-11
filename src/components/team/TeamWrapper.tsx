import { teams } from '@/utils/constants/team';
import React from 'react'
import TeamTab from './TeamTab';
import SparkleComponent from '../ui/SparkleComponent';

type Props = {
  children: React.ReactNode
}

const TeamWrapper = ({children}: Props) => {
  return (
    <div className="mx-auto flex flex-col items-center gap-5">
      <div className="">
        <div className="mt-10 text-center font-annabel text-4xl font-bold text-regalia">
          Organizing Team:{" "}
          <span className=" font-hollirood"> REGALIA 2K24</span>
        </div>
        <SparkleComponent />
      </div>
      <div className="mx-auto flex w-full flex-row flex-wrap items-center justify-center gap-2 md:gap-4 lg:gap-10 ">
        {teams.map((teamItem, index) => (
          <TeamTab key={index} team={teamItem} />
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
}

export default TeamWrapper