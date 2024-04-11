import { supabase } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

const ConfirmModal = ({
  isConfirmOpen,
  onClose,
  coordinatorId,
  coordinators,
  setCoordinators
}: {
  isConfirmOpen: boolean;
  onClose: () => void;
  coordinatorId: any;
  coordinators: any;
    setCoordinators: any;
}) => {
  const router = useRouter();
  const handleConfirm = async () => {
    try{
        const {error} = await supabase.from("roles").delete().eq("id", coordinatorId!).eq("role", "event_coordinator");
        onClose();
        setCoordinators(coordinators.filter((coordinator: any) => coordinator.id !== coordinatorId));
        toast.success("Coordinator deleted Successfully !");
        router.refresh();
    }
    catch(error){
        toast.error("Error deleting Coordinator !");
    }
   
  };
  return (
    <>
      {isConfirmOpen && (
        <div className="fixed  inset-0 z-[50] flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={`flex h-auto w-[90%]  flex-col
               items-start rounded-lg bg-gray-100 p-4 md:w-auto `}
          >
            <div className="mb-2 flex w-full flex-row items-center justify-between gap-5">
              <h2 className="text-lg font-semibold">
                Are you sure to delete this Coordinator ?
              </h2>
            </div>
            <div className="flex w-full flex-row flex-wrap items-center justify-between gap-2">
              <button
                className="rounded-full border-2 border-black bg-red-600 px-5 py-1  font-semibold text-white hover:bg-white hover:text-black"
                onClick={handleConfirm}
              >
                Delete
              </button>
              <button
                className="mt-3 rounded-full border-2 border-black bg-black px-5 py-1 font-semibold text-white hover:bg-white hover:text-black"
                onClick={onClose}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
      <Toaster position="bottom-right" />
    </>
  );
};

export default ConfirmModal;
