import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="text-center text-[#c9a747] font-hollirood text-xl gap-2 md:text-3xl font-semibold items-center flex flex-col justify-center w-full mx-auto min-h-[80vh]">
    <h1>Regalia 2024 is Loading !</h1>
    <Link
      href={"/"}
      className="mt-10 border-2 border-[#c9a747] rounded-full hover:bg-[#c9a747] hover:text-white duration-300 text-[#c9a747] font-bold text-md md:text-xl px-5 py-1  md:px-10 md:py-2"
    >
      Go Home
    </Link>
  </div>
  )
}

export default page