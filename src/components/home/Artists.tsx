import React from 'react'
import ArtistCard from './ArtistCard'
import { artists } from '@/utils/constants/artists'
import Heading from '../common/Heading'

const Artists = () => {
  return (
    <div
      id="artists"
      className="mx-auto flex flex-col  xl:w-[100%] items-center justify-center gap-10 py-14"
    >
      <div className="mx-auto my-5 flex flex-col items-center justify-center gap-10">
        <Heading text="Artists" />       
        <div className="flex flex-row flex-wrap items-end justify-center gap-10">
          {artists.map((sponsor, index) => {
            return (
              <ArtistCard
                key={index}
                name={sponsor.name}
                logo={sponsor.logo}
                date={sponsor.date}
                link={sponsor.link}
              />
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Artists
