'use client';

import React, { useRef, useState } from "react";

import QrReader from './_components/QrCodePlugin';
import { PuffLoader } from "react-spinners";

const EntryPage = () => {

    const [scanned, setScanned] = useState<string | undefined>();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [startScan, setStartScan] = useState<boolean>(false);

    type dataTypes = 'email' | 'roll' | 'phone';

    function handleEntry(dataType: dataTypes, data: string) {
        setScanned(data);
    }

    function handleScan(data: string | null) {
        setStartScan(false);
        console.log(data);
        if (data) {
            handleEntry('roll', data);
        }
    }

    function startScanning() {
        setScanned(undefined);
        setStartScan(true);
    }

    const handleSubmitPhoneNumber = () => {
        const phoneNumberPattern = /[0-9]{10}/;
        if (!phoneNumberPattern.test(phoneNumber)) {
            alert('Please enter a valid phone number (e.g., 123-456-7890)');
        } else {
            setScanned(undefined);
            setStartScan(false);
            setPhoneNumber('');
            handleEntry('phone', phoneNumber);
        }
    };

    const handleInputPhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const phoneNumberPattern = /^[0-9]{0,10}$/;
        if (phoneNumberPattern.test(e.target.value)) {
            setPhoneNumber(e.target.value);
        }
    }

    return (
        <div className="text-regalia font-hollirood  min-h-[80vh]  text-center text-3xl font-bold flex justify-center flex-col items-center">
          Only for Admins!

            <div className="bg-transparent h-[350px] w-[350px] m-5 flex flex-col justify-between">
                {
                    startScan ? (
                        <QrReader 
                        onScanSuccess={handleScan}
                        />
                    ) : (
                        <>
                            <div className="flex items-center justify-center h-full">
                                {
                                    scanned ? (
                                        <div className="text-lg text-white p-2 rounded-lg">
                                            {scanned} successfully entered the venue!
                                        </div>
                                    ) : (
                                        <PuffLoader color="" size={30} />
                                    )
                                }
                            </div>
                            <div className="flex items-center justify-center mb-10">
                                <button 
                                    className="bg-regalia text-white p-2 rounded-lg text-lg"
                                    onClick={startScanning}
                                >
                                    Scan QR Code
                                </button>
                            </div>
                        </>
                    )
                }
            </div>

            <input 
                type="text" 
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={handleInputPhoneNumber}
                className="border-2 border-regalia p-2 rounded-lg w-[85%] text-lg text-black"
            />
            <button 
                className="bg-regalia text-white p-2 rounded-lg mt-3 text-lg"
                onClick={handleSubmitPhoneNumber}
            >
                Submit Phone Number
            </button>
        </div>
    );

};

export default EntryPage;