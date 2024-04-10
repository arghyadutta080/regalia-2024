import Heading from '@/components/common/Heading'
import Block from '@/components/contacts/Block'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col items-center mx-auto mt-10'>
    <Heading text='Contact Us' />
    <Block />
  </div>
  )
}

export default page