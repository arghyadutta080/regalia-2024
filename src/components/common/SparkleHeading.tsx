import React from 'react'
import SparkleComponent from '../ui/SparkleComponent'

const SparkleHeading = ({text}:{text:string}) => {
  return (
    <div className=" flex h-[8rem] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-transparent">
    <h1 className="relative z-20 text-center font-annabel text-4xl font-bold text-regalia md:text-3xl lg:text-5xl">
      {text}
    </h1>
    <div className="text-center">
      <SparkleComponent />
    </div>
  </div>
  )
}

export default SparkleHeading