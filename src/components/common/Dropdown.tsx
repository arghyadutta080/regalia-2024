import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DropdownCustom = ({
  user,
  setIsMenuOpen,
  moreOpen,
  setMoreOpen,
  showAdminDashboard,
  showConvenorDashboard,
  showCoordinatorDashboard,
  showRegisterDashboard,
}: {
  user: any;
  moreOpen: boolean;
  setMoreOpen: any;
  setIsMenuOpen: any;
  showAdminDashboard: boolean;
  showConvenorDashboard: boolean;
  showCoordinatorDashboard: boolean;
  showRegisterDashboard: boolean;
}) => {
  const pathname = usePathname();

  return (
    <div className="z-[110] inline-block  text-left">
      <div>
        <button
          type="button"
          onClick={() => setMoreOpen(!moreOpen)} // Toggle moreOpen state
          className="font-retrolight my-2  rounded-xl px-2 py-1 pt-2 text-sm font-semibold  duration-200  ease-linear hover:text-yellow-400 md:my-0 md:ml-2 md:text-xs md:hover:scale-105 lg:ml-4 lg:text-sm 2xl:text-[18px]"
        >
          More
        </button>
      </div>
      {moreOpen && ( // Render dropdown content only if moreOpen is true
        <div className="   w-auto  rounded-md bg-transparent shadow-lg ring-1 ring-black ring-opacity-5">
        
              {user && showCoordinatorDashboard && (
                <Link href={"/coordinator"}
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                >
                  <li
                    className={`font-retrolight my-2  rounded-xl px-2 py-1 pt-2 text-sm font-semibold  duration-200  ease-linear hover:text-yellow-400 md:my-0 md:ml-2 md:text-xs md:hover:scale-105 lg:ml-4  lg:text-sm 2xl:text-[18px] ${
                      pathname === "coordinator" && "text-[#c9a747]"
                    }`}
                  >
                    Coordinator
                  </li>
                </Link>
              )}

              {user && showConvenorDashboard && (
                <Link href={"/coordinator"}
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                >
                  <li
                    className={`font-retrolight my-2  rounded-xl px-2 py-1 pt-2 text-sm font-semibold  duration-200  ease-linear hover:text-yellow-400 md:my-0 md:ml-2 md:text-xs md:hover:scale-105 lg:ml-4  lg:text-sm 2xl:text-[18px] ${
                      pathname === "coordinator" && "text-[#c9a747]"
                    }`}
                  >
                    Convenor
                  </li>
                </Link>
              )}
              {user && showRegisterDashboard && (
                <Link href={"/registrar"}
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                >
                  <li
                    className={`font-retrolight my-2  rounded-xl px-2 py-1 pt-2 text-sm font-semibold  duration-200  ease-linear hover:text-yellow-400 md:my-0 md:ml-2 md:text-xs md:hover:scale-105 lg:ml-4  lg:text-sm 2xl:text-[18px] ${
                      pathname === "/registrar" && "text-[#c9a747]"
                    }`}
                  >
                    Registrar
                  </li>
                </Link>
              )}

              {user && showAdminDashboard && (
                <Link
                  href={"/admin"}
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                >
                  <li
                    className={`font-retrolight my-2  rounded-xl px-2 py-1 pt-2 text-sm font-semibold  duration-200  ease-linear hover:text-yellow-400 md:my-0 md:ml-2 md:text-xs md:hover:scale-105 lg:ml-4  lg:text-sm 2xl:text-[18px] ${
                      pathname === "/admin" && "text-[#c9a747]"
                    }`}
                  >
                    Admin
                  </li>
                </Link>
              )}
        </div>
      )}
    </div>
  );
};

export default DropdownCustom;
