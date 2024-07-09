import parse from "html-react-parser";
const InfoModal = ({
  isOpen,
  onClose,
  component,
}: {
  isOpen: boolean;
  onClose: () => void;
  component: React.ReactNode;
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed  inset-0 z-[50] flex items-center justify-center bg-black bg-opacity-50 font-retrolight tracking-widest">
          <div
            className={`flex h-auto w-[90%] flex-col items-start rounded-lg border-y-2 border-regalia bg-body p-4 md:w-[50%] lg:w-[35%] `}
          >
            <div className="mb-2 flex w-full flex-row items-center justify-between">
              <h2 className="text-lg font-semibold">Information</h2>

              <h2
                onClick={onClose}
                className="cursor-pointer rounded-full border-2 border-regalia bg-regalia px-2 py-1 text-sm font-semibold text-white  hover:border-regalia hover:bg-black hover:text-regalia md:px-3 md:py-2"
              >
                X
              </h2>
            </div>
            <div className=" my-1 w-full overflow-y-auto px-1 py-2 font-hollirood tracking-widest">
              {component}
            </div>
            {/* <button
              className="border-2 mt-3 border-regalia px-5 py-1 rounded-full font-semibold bg-regalia text-black hover:bg-black hover:text-regalia"
              onClick={onClose}
            >
              Close
            </button> */}
          </div>
        </div>
      )}
    </>
  );
};

export default InfoModal;
