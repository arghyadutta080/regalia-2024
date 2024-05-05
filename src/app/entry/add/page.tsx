'use client';

import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react';

import { User, addStudent, checkDayEntry, getCurrentSession } from '@/utils/functions/enterStudent';

const EntryAddPage = () => {

    const [name, setName] = useState<string>('');
    const [roll, setRoll] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [band, setBand] = useState<string>('');

    const nameRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const router = useRouter();

    function redirectToEntry() {
        router.push('/entry');
    };

    function resetForm() {
        setName('');
        setRoll('');
        setEmail('');
        setPhone('');
        setBand('');
        formRef.current?.reset();
        nameRef.current?.focus();
    }

    async function _addStudent() {

        const student: User  = {
            full_name: name,
            college_roll: roll,
            email,
            phone: parseInt(phone),
            day1: null,
            day2: null
        }

        if(band) {
            const day = checkDayEntry();
            if (day==='day_missed') {
                resetForm()
                alert('Event days have already missed')
                return;
            }

            const security = await getCurrentSession();

            student[day] = {
                security: security as string,
                band_no: band,
                time: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
            }
        }

        // Add Student
        await addStudent(student);
        resetForm();

        // Redirect to Entry Page
        redirectToEntry();
    }

    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value.toUpperCase());
    }

    function handleRollChange(e: React.ChangeEvent<HTMLInputElement>) {
        setRoll(e.target.value.toUpperCase());
    }

    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPhone(e.target.value);
    }

    function handleBandChange(e: React.ChangeEvent<HTMLInputElement>) {
        setBand(e.target.value);
    }

    return (
        <div className="text-regalia font-hollirood w-full  min-h-[80vh]  text-center text-2xl font-bold flex justify-evenly flex-col items-center">
            ---&nbsp;Add Students&nbsp;---

            <form ref={formRef} className='w-full max-w-sm text-lg space-y-2'>
                <div className="flex items-center justify-evenly">
                    <label className='w-1/4'>Name:</label>
                    <input 
                    type="text"
                    ref={nameRef}
                    placeholder='Full Name'
                    onChange={handleNameChange}
                    className="w-1/2 border-2 border-regalia p-2 rounded-lg text-sm text-black" 
                    />
                </div>
                <div className="flex items-center justify-evenly">
                    <label className='w-1/4'>Roll:</label>
                    <input 
                    type="text"
                    placeholder='Roll Number'
                    onChange={handleRollChange}
                    className="w-1/2 border-2 border-regalia p-2 rounded-lg text-sm text-black" 
                    />
                </div>
                <div className="flex items-center justify-evenly">
                    <label className='w-1/4'>Email:</label>
                    <input 
                    type="email"
                    placeholder='Email Address'
                    onChange={handleEmailChange}
                    className="w-1/2 border-2 border-regalia p-2 rounded-lg text-sm text-black" 
                    />
                </div>
                <div className="flex items-center justify-evenly">
                    <label className='w-1/4'>Phone:</label>
                    <input 
                    type="number" 
                    inputMode='tel'
                    placeholder='Phone Number'
                    onChange={handlePhoneChange}
                    className="w-1/2 border-2 border-regalia p-2 rounded-lg text-sm text-black" 
                    />
                </div>
                <div className="flex items-center justify-evenly pt-8">
                    <label className='w-1/4'>Band No:</label>
                    <input 
                    type="number" 
                    inputMode='numeric'
                    placeholder='0'
                    onChange={handleBandChange}
                    className="w-1/4 border-2 border-regalia p-2 rounded-lg text-sm text-black" 
                    />
                </div>
            </form>

            <div>
                <button 
                className={`text-white bg-regalia p-2 rounded-lg ${(name && roll && email && phone) ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                onClick={_addStudent}
                disabled={!name || !roll || !email || !phone}
                >Add Student
                </button>
            </div>
        </div>
    );
};

export default EntryAddPage;