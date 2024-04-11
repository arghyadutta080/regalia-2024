import { coordinatorType } from '@/lib/types/event';
import React, { useState } from 'react'

const CoordinatorForm = ({
    isOpen,
    onClose,
    onAddCoordinator,
  }: {
    isOpen: boolean;
    onClose: () => void;
    onAddCoordinator: (coordinator: coordinatorType) => void;
  }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const handleSubmit = () => {
      if (name && email) {
        onAddCoordinator({ name, email });
        setName("");
        setEmail("");
        setPhone("");
        onClose();
      }
    };
  
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-body rounded-lg border-y-2 border-regalia p-4 font-sans">
              <h2 className="mb-2 text-lg font-semibold">Add Coordinator</h2>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="bg-body rounded-xl border-regalia px-2 py-1 text-slate-300"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="bg-body rounded-xl border-regalia px-2 py-1 text-slate-300"
                />
                {/* <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                  className="border-black  px-2 py-1 rounded-xl"
                /> */}
                <div className="flex justify-end">
                  <button
                    onClick={onClose}
                    className="mr-2 cursor-pointer rounded-md border-regalia bg-regalia px-4 py-2 text-black hover:border-regalia hover:bg-black hover:text-regalia"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="cursor-pointer rounded-md border-regalia bg-regalia px-4 py-2 text-black hover:border-regalia hover:bg-black hover:text-regalia"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

export default CoordinatorForm