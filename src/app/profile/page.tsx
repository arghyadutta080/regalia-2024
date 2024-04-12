import Heading from '@/components/common/Heading'
import UserRegForm from '@/components/profile/UserRegForm'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col w-full lg:w-[80%] mt-5 items-center justify-center gap-10  mx-auto">
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