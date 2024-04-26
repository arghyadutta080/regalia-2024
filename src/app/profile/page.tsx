import Heading from '@/components/common/Heading'
import UserRegForm from '@/components/profile/UserRegForm'
import { constructMetaData } from '@/utils'
import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'

export const metadata: Metadata = constructMetaData({
  title: 'Profile | Regalia 2024',
  description: 'Inter-college cultural fest of RCCIIT.',
})

const page = () => {
  return (
    <div className="flex flex-col w-full my-10 lg:w-[80%] items-center justify-center gap-10  mx-auto">
    <Heading text="Registration" />
    <div className='w-full px-10 flex flex-col lg:flex-row  items-start justify-center gap-5'>
      <div className='w-full lg:w-1/3'>
      <UserRegForm />
      </div>
      <div className='w-full lg:w-1/2'>
      <Image src={"/assets/home/landing.png"} height={200} width={1000} alt="" />
      </div>
   
    </div>
  
  </div>
  )
}

export default page