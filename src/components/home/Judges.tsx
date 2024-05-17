"use client";
import React from 'react'
import Heading from '../common/Heading'
import { judges } from '@/utils/constants/judges'
import Image from 'next/image'
import { BackgroundGradient } from '../ui/background-gradient'

const Judges = () => {
  return (
    <div
  
      className="mx-auto flex flex-col w-full lg:w-[90%] items-center justify-center gap-10 py-14"
    >
<Heading text="Judges" />
<div className='flex flex-col justify-center mx-auto w-full gap-10'>
    {
        judges.map((judge, index) => {
            return(
                <div key={index} className='flex flex-col justify-center mx-auto items-center gap-5 px-5'>
                    <h1 className='font-hollirood text-xl font-semibold tracking-widest'>{judge.category}</h1>
                    <div className='flex flex-row items-center justify-center flex-wrap gap-5'>
                        {
                            judge.judges.map((judge, index) => {
                                return(
                                    <BackgroundGradient key={index}  className="relative flex  flex-col items-center justify-center p-1">
                                    <Image  src={judge} alt='judge' width={400} height={100} className='rounded-lg' />
                                    </BackgroundGradient>
                                )
                            })
                        }
                    </div>
                </div>
            )
        })
    }
</div>
        </div>
  )
}

export default Judges