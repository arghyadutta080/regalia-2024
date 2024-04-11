import { Metadata } from 'next'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Regalia 2K24 | Events',
  description: 'Regalia 2K24 Event Description',
}

const EventLayout = ({children}: Props) => {
  return (
    <div>{children}</div>
  )
}

export default EventLayout