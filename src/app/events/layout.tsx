import { Footer } from '@/components/common'
import { constructMetaData } from '@/utils'
import { Metadata } from 'next'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export const metadata: Metadata = constructMetaData({
  title: 'Events | Regalia 2024',
  description: 'Events : Sargam Carpe-Diem Nrityam Band Bash Kashish-E-Haya Regalia 2024',
})

const EventLayout = ({children}: Props) => {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}

export default EventLayout