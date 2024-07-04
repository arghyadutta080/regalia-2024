"use client";

import { User } from '@/utils/functions/enterStudent';
import Link from 'next/link';
import { useState } from 'react';

const EntryModal = ({
    isOpen,
    accept,
    reject,
    data
  }: {
    isOpen: boolean;
    accept: (band: string, data: User & {security: string}) => void;
    reject: () => void;
    data: User & {security: string};
  }) => {

    const [band, setBand] = useState<string | undefined>(undefined);

    const handleAccept = () => {
      if (!band) return;
      accept(band, data);
      setBand(undefined);
    }

    return (
        <>
        {isOpen && (
          <div className="fixed  inset-0 z-[50] flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex h-[40%] w-[90%] flex-col justify-between items-start rounded-lg border-y-2 border-regalia bg-body py-4 px-2 font-hollirood tracking-widest md:w-[40%] lg:w-[30%]">

              <div className="mb-2 flex w-full flex-row items-center justify-center">
                <h2 className="text-lg font-semibold">Approve Entry</h2>
              </div>

              {/* Show Data */}

              <div className="mx-auto my-1 h-full w-full flex flex-col justify-center items-start">
                <h1 className="text-sm font-semibold mb-2">
                  Name: <a className='text-white text-xs'>{data.full_name}</a>
                </h1>
                <h1 className="text-sm font-semibold mb-2">
                  Email: <Link href={`mailto:${data.email}`} className='text-white text-xs'>{data.email}</Link>
                </h1>
                <h1 className="text-sm font-semibold">
                  Phone: <Link href={`tel:${data.phone}`} className='text-white text-xs'>{data.phone}</Link>
                </h1>
                <h1 className="text-sm font-semibold items-center flex justify-start mt-5">
                  Band No: <input 
                        type="number"
                        inputMode="numeric"
                        placeholder="0"
                        onChange={(e) => setBand(e.target.value)}
                        className="border-2 ml-2 border-regalia p-[0.20rem] bg-transparent rounded-lg w-[30%] text-xs text-white"
                    />
                </h1>
              </div>

              <div className='flex w-full flex-row items-center justify-center gap-5'>
                <button 
                className={`w-full rounded-md bg-green-400 px-4 py-2 text-white shadow-md hover:cursor-pointer hover:bg-green-600 text-sm ${!band?'cursor-not-allowed opacity-50':''}`}
                onClick={handleAccept}
                disabled={!band}
                >
                  Approve
                </button>
                <button className='w-full rounded-md bg-red-400 px-4 py-2 font-semibold text-white shadow-md hover:cursor-pointer hover:bg-red-600 text-sm' onClick={reject}>Reject</button>
              </div>

            </div>
          </div>
        )}
        </>
    );
};

export default EntryModal;