import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className='relative mt-5  w-full flex flex-row  max-lg:items-center font-annabel  gap-10'>
        <Image src={"/assets/home/hero.svg"}
        height={200}
        width={1000}
        alt=''
        />
        <div className='absolute -bottom-[4rem] xl:bottom-40 max-xl:mx-auto max-xl:w-full max-xl:text-center xl:right-36 flex flex-col'>
            <div className='text-3xl md:text-5xl xl:text-5xl xl:flex flex-row xl:self-end'>2k24</div>
        <h1 className='text-4xl  lg:text-9xl text-white '>Regalia</h1>
        </div>
       
     <Image src={"/assets/home/guitar.svg"}
        height={240}
        width={400}
        
        alt=''
        className='w-40  md:w-72 lg:w-96 absolute md:top-20 lg:top-0 right-0'
        />
    </div>
  )
}

export default Hero