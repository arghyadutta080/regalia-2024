import Link from "next/link";

export const MemberModal = ({
    isOpen,
    onClose,
    members,
  }: {
    isOpen: boolean;
    onClose: () => void;
    members: any;
  }) => {
    return (
      <>
        {isOpen && (
          <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[50]">
            <div
              className={`bg-body font-hollirood tracking-widest border-y-2 border-regalia p-4 rounded-lg h-auto
                 w-[90%] flex flex-col items-start md:w-[25%] `}
            >
              <div className="w-full flex flex-row mb-2 items-center justify-between">
                <h2 className="text-lg font-semibold">Members</h2>
  
                <h2
                  onClick={onClose}
                  className="bg-regalia md:py-2 md:px-3 px-2 py-1 hover:bg-black hover:text-regalia border-2 border-regalia  text-black hover:border-regalia text-sm font-semibold rounded-full cursor-pointer"
                >
                  X
                </h2>
              </div>
  
              <div className="h-full overflow-y-scroll flex flex-col items-center gap-2 my-1 py-2 px-1 w-full text-center">
                {members.map((member: any, index: number) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row  flex-wrap justify-around font-semibold w-full"
                  >
                    <h1>{member.name}</h1>
                    <Link
                      className="text-red-500 hover:cursor-pointer hover:opacity-70"
                      href={`tel:${member.phone}`}
                    >
                      {member.phone}
                    </Link>
                  
                  </div>
                ))}
              </div>
              <button
                className="border-2 mt-3 border-black px-5 py-1 rounded-full font-semibold bg-black text-white hover:bg-white hover:text-black"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </>
    );
  };