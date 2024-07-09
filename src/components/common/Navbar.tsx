"use client";
import { useUser } from "@/lib/store/user";
import { supabase } from "@/lib/supabase-client";
import { navRoutes } from "@/utils/constants/navRoutes";
import { login } from "@/utils/functions/login";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import DropdownCustom from "./Dropdown";
import { clickSound, hoverSound } from "@/utils/functions";
import toast, { Toaster } from "react-hot-toast";
import CustomToast from "./CustomToast";
import { MdDone, MdError } from "react-icons/md";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [userImg, setUserImg] = useState("");
  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRole] = useState("");
  const [moreOpen, setMoreOpen] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [showRegisterDashboard, setShowRegisterDashboard] = useState(false);
  const [showConvenorDashboard, setShowConvenorDashboard] = useState(false);
  const [showVolunteerDashboard, setShowVolunteerDashboard] = useState(false);
  const [showSecurityDashboard, setShowSecurityDashboard] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showCoordinatorDashboard, setShowCoordinatorDashboard] =
    useState(false);
  const handleLogout = async () => {
    setShowAdminDashboard(false);
    setShowCoordinatorDashboard(false);
    setShowDashboard(false);
    setShowSecurityDashboard(false);
    await supabase.auth.signOut();
    router.refresh();

    setUser(undefined);

    toast.custom(
      <CustomToast
        message="Logged out successfully!"
        icon={<MdDone className="bg-green-400 text-white" size={15} />}
      />,
    );
  };

  useEffect(() => {
    const readUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data) {
        setShowDashboard(true);
        setUserImg(data?.session?.user.user_metadata?.avatar_url);
      }

      const { data: roleData }: any = await supabase
        .from("roles")
        .select(
          "role,event_id,events(event_name,fest_name,year),event_categories(fest_name,year)",
        )
        .eq("id", data?.session?.user.id);

      let isSuperAdmin = false;
      let isCoordinator = false;
      let isVolunteer = false;
      let isConvenor = false;
      let isRegistrar = false;
      let isSecurity = false;
      console.log(roleData);
      if (roleData) {
        for (const obj of roleData!) {
          if (obj.role === "super_admin") {
            isSuperAdmin = true;
            isSecurity = true;
          }
          if (obj.role === "event_coordinator") {
            if (
              obj.events &&
              obj.events.fest_name === "Regalia" &&
              obj.events.year == 2024
            ) {
              isCoordinator = true;
            }
          }
          if (obj.role === "volunteer") {
            if (
              obj.events &&
              obj.events.fest_name === "Regalia" &&
              obj.events.year == 2024
            ) {
              isVolunteer = true;
            }
          }
          if (obj.role === "convenor") {
            if (
              obj.event_categories &&
              obj.event_categories.fest_name === "Regalia" &&
              obj.event_categories.year == 2024
            ) {
              isConvenor = true;
            }
          }
          if (obj.role === "registrar") {
            isRegistrar = true;
          }
          if (obj.role === "security" || obj.role === "security_admin") {
            isSecurity = true;
          }
        }

        if (isSuperAdmin) {
          setShowAdminDashboard(true);
          setShowConvenorDashboard(true);
          setShowRegisterDashboard(true);
          setShowCoordinatorDashboard(false);
          setShowSecurityDashboard(true);
        } else {
          if (isConvenor) {
            setShowConvenorDashboard(true);
            setShowRegisterDashboard(true);
            setShowCoordinatorDashboard(false);
            setShowSecurityDashboard(false);
            return;
          } else {
            if (isCoordinator) {
              setShowConvenorDashboard(false);
              setShowRegisterDashboard(true);
              setShowCoordinatorDashboard(true);
              setShowVolunteerDashboard(false);
              setShowSecurityDashboard(false);
            }
            if (isVolunteer) {
              !isConvenor && setShowConvenorDashboard(false);
              setShowRegisterDashboard(true);
              !isCoordinator && setShowCoordinatorDashboard(false);
              !isCoordinator && setShowVolunteerDashboard(true);
              setShowSecurityDashboard(false);
            }else if(isSecurity){
              setShowSecurityDashboard(true);
            }
             else if (!isSuperAdmin && !isCoordinator && !isConvenor && !isRegistrar && !isSecurity) {
              setShowCoordinatorDashboard(false);
              setShowConvenorDashboard(false);
              setShowSecurityDashboard(false);
            }
          }
        }

        if (isRegistrar) {
          setShowRegisterDashboard(true);
        }

        setShowDashboard(true);
        setShowAdminDashboard(isSuperAdmin);
      }
    };

    const handleScroll = () => {
      setScrolling(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    readUserSession();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [user]);

  const handleLogin = async () => {
    try {
      await login();

      setShowDashboard(true);
      router.refresh();
    } catch (error) {
      <CustomToast
        message="Error Occured ! Please try again later !"
        icon={<MdError className="bg-red-600 text-white" size={15} />}
      />;
    }
  };

  //Custom toast code (Please refere this)
  // const TestToast = ()=>{
  //   toast.custom(<CustomToast
  //   message="Error Occured ! Please try again later !"
  //   icon={<MdError className="bg-red-600 text-white" size={15} />}
  // />)
  // console.log("Hello")
  // }

  return (
    <>
      <div className="sticky left-0 top-0 z-[100] w-screen overflow-x-hidden font-hollirood lg:w-full ">
        <div
          className={`${
            scrolling || isMenuOpen
              ? "rounded-xl border-b border-regalia bg-body"
              : "bg-transparent"
          } flex flex-row items-center justify-between overflow-hidden  border-regalia py-2 pl-2 pr-4 max-md:border-b max-md:px-3 md:flex md:items-start  xl:items-center 2xl:gap-20 2xl:px-5 min-[1700px]:justify-around 
        `}
        >
          <Toaster position="bottom-right" />
          <div className="flex cursor-pointer items-center  font-hollirood text-3xl font-bold text-regalia duration-500 hover:scale-105 hover:text-yellow-400">
            <Link
              href={"/"}
              // onMouseEnter={hoverSound}
              onClick={clickSound}
              className="flex flex-row items-end"
            >
              <Image
                src="/assets/home/regalia_1.png"
                height={20}
                width={48}
                alt="rcc"
              />
              <h1 className="pt-2 text-[1.7rem]">REGALIA</h1>
            </Link>
          </div>
          <div className="flex flex-row-reverse items-center justify-between gap-4 md:flex-row">
            <div
              className="flex h-full w-8 cursor-pointer flex-col items-center justify-center gap-[6px] md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span
                className={`block h-[2px] w-7 bg-regalia transition-all duration-500
            ${isMenuOpen ? "translate-y-2 rotate-45" : ""}
            `}
              ></span>
              <span
                className={`block h-[2px] w-7 bg-regalia transition-all duration-500
            ${isMenuOpen ? "translate-x-44 " : "translate-x-0"}
            `}
              ></span>
              <span
                className={`block h-[2px] w-7 bg-regalia transition-all duration-500
            ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}
            `}
              ></span>
            </div>
            {user && (
              <Link
                onMouseEnter={hoverSound}
                href={"/profile"}
                onClick={() => {
                  clickSound();
                  setIsMenuOpen(false);
                }}
                className={`block rounded-full border-4 md:hidden ${
                  pathname === "/profile" &&
                  " rounded-full border-4 border-regalia"
                }`}
              >
                <Image
                  src={userImg}
                  alt="user"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </Link>
            )}
            <ul
              className={`fixed top-[3.8rem]  z-[100] w-full rounded-b-xl border-regalia bg-[#151515] pb-6 pl-4 transition-all duration-500 ease-in max-md:border-b-2 max-md:border-t md:static md:z-auto md:flex md:w-auto md:items-start md:bg-transparent md:pb-0 md:pl-0 xl:items-center  ${
                isMenuOpen ? "right-0 block" : " right-[-790px]"
              }`}
            >
              {navRoutes.map((link, index) => (
                <Link
                  // onMouseEnter={hoverSound}
                  href={link.path}
                  onClick={() => {
                    clickSound();
                    setIsMenuOpen(false);
                  }}
                  key={index}
                >
                  <li
                    className={`my-2 cursor-pointer rounded-xl px-2 py-1 pt-2 font-retrolight text-sm font-semibold duration-200 ease-linear  hover:text-yellow-400  md:my-0 md:ml-2 md:mt-2 md:text-xs md:hover:scale-105 lg:ml-4 lg:text-sm xl:mt-0 2xl:text-[18px] ${
                      pathname === link.path && "text-regalia"
                    }`}
                  >
                    {link.name}
                  </li>
                </Link>
              ))}
              {user &&
                (showAdminDashboard ||
                  showConvenorDashboard ||
                  showCoordinatorDashboard ||
                  showRegisterDashboard) && (
                  <div className="relative hidden md:mt-2 md:block xl:mt-0 xl:hidden">
                    <DropdownCustom
                      moreOpen={moreOpen}
                      setMoreOpen={setMoreOpen}
                      setIsMenuOpen={setIsMenuOpen}
                      showAdminDashboard={showAdminDashboard}
                      showCoordinatorDashboard={showCoordinatorDashboard}
                      showConvenorDashboard={showConvenorDashboard}
                      showRegisterDashboard={showRegisterDashboard}
                      user={user}
                    />
                  </div>
                )}
              {user && showDashboard && (
                <Link
                  // onMouseEnter={hoverSound}
                  href={"/dashboard"}
                  onClick={() => {
                    clickSound();
                    setIsMenuOpen(false);
                  }}
                >
                  <li
                    className={`my-2 cursor-pointer rounded-xl px-2 py-1 pt-2 font-retrolight text-sm font-semibold duration-200 ease-linear  hover:text-yellow-400  md:my-0 md:ml-2 md:mt-2 md:text-xs md:hover:scale-105 lg:ml-4 lg:text-sm  xl:mt-0 2xl:text-[18px] ${
                      pathname === "/dashboard" && "text-regalia"
                    }`}
                  >
                    Dashboard
                  </li>
                </Link>
              )}
               {user && showSecurityDashboard && (
                  <Link
                    // onMouseEnter={hoverSound}
                    href={"/entry"}
                    onClick={() => {
                      clickSound();
                      setIsMenuOpen(false);
                    }}
                  >
                    <li
                      className={`my-2 cursor-pointer rounded-xl px-2 py-1 pt-2 font-retrolight text-sm font-semibold duration-200 ease-linear  hover:text-yellow-400  md:my-0 md:ml-2 md:mt-2 md:text-xs md:hover:scale-105 lg:ml-4 lg:text-sm  xl:mt-0 2xl:text-[18px] ${
                        pathname === "/entry" && "text-regalia"
                      }`}
                    >
                      Security
                    </li>
                  </Link>
                )}
              <div className=" block flex-row items-center md:hidden xl:flex">
                {user && showCoordinatorDashboard && (
                  <Link
                    // onMouseEnter={hoverSound}
                    href={"/coordinator"}
                    onClick={() => {
                      clickSound();
                      setIsMenuOpen(false);
                    }}
                  >
                    <li
                      className={`my-2 cursor-pointer rounded-xl px-2 py-1 pt-2 font-retrolight text-sm font-semibold duration-200 ease-linear  hover:text-yellow-400  md:my-0 md:ml-2 md:mt-2 md:text-xs md:hover:scale-105 lg:ml-4 lg:text-sm  xl:mt-0 2xl:text-[18px] ${
                        pathname === "/coordinator" && "text-regalia"
                      }`}
                    >
                      Coordinator
                    </li>
                  </Link>
                )}

                {user && showConvenorDashboard && (
                  <Link
                    // onMouseEnter={hoverSound}
                    href={"/coordinator"}
                    onClick={() => {
                      clickSound();
                      setIsMenuOpen(false);
                    }}
                  >
                    <li
                      className={`my-2 cursor-pointer rounded-xl px-2 py-1 pt-2 font-retrolight text-sm font-semibold duration-200 ease-linear  hover:text-yellow-400  md:my-0 md:ml-2 md:mt-2 md:text-xs md:hover:scale-105 lg:ml-4 lg:text-sm  xl:mt-0 2xl:text-[18px] ${
                        pathname === "/coordinator" && "text-regalia"
                      }`}
                    >
                      Convenor
                    </li>
                  </Link>
                )}

                {user && showVolunteerDashboard && (
                  <Link
                    // onMouseEnter={hoverSound}
                    href={"/coordinator"}
                    onClick={() => {
                      clickSound();
                      setIsMenuOpen(false);
                    }}
                  >
                    <li
                      className={`my-2 cursor-pointer rounded-xl px-2 py-1 pt-2 font-retrolight text-sm font-semibold duration-200 ease-linear  hover:text-yellow-400  md:my-0 md:ml-2 md:mt-2 md:text-xs md:hover:scale-105 lg:ml-4 lg:text-sm  xl:mt-0 2xl:text-[18px] ${
                        pathname === "/coordinator" && "text-regalia"
                      }`}
                    >
                      Volunteer
                    </li>
                  </Link>
                )}
                {/* {user && showRegisterDashboard && (
                  <Link
                    // onMouseEnter={hoverSound}
                    href={"/registrar"}
                    onClick={() => {
                      clickSound();
                      setIsMenuOpen(false);
                    }}
                  >
                    <li
                      className={`my-2 cursor-pointer rounded-xl px-2 py-1 pt-2 font-retrolight text-sm font-semibold duration-200 ease-linear  hover:text-yellow-400  md:my-0 md:ml-2 md:mt-2 md:text-xs md:hover:scale-105 lg:ml-4 lg:text-sm  xl:mt-0 2xl:text-[18px] ${
                        pathname === "/registrar" && "text-regalia"
                      }`}
                    >
                      Registrar
                    </li>
                  </Link>
                )} */}

                {user && showAdminDashboard && (
                  <Link
                    // onMouseEnter={hoverSound}
                    href={"/admin"}
                    onClick={() => {
                      clickSound();
                      setIsMenuOpen(false);
                    }}
                  >
                    <li
                      className={`my-2 cursor-pointer rounded-xl px-2 py-1 pt-2 font-retrolight text-sm font-semibold duration-200 ease-linear  hover:text-yellow-400  md:my-0 md:ml-2 md:mt-2 md:text-xs md:hover:scale-105 lg:ml-4 lg:text-sm  xl:mt-0 2xl:text-[18px] ${
                        pathname === "/admin" && "text-regalia"
                      }`}
                    >
                      Admin
                    </li>
                  </Link>
                )}
              </div>

              <div className="flex cursor-pointer flex-row items-center gap-5  md:ml-5 ">
                {user && (
                  <Link
                    // onMouseEnter={hoverSound}
                    href={"/profile"}
                    onClick={() => {
                      clickSound();
                      setIsMenuOpen(false);
                    }}
                    className={`hidden rounded-full border-4 md:block ${
                      pathname === "/profile" &&
                      "rounded-full border-4 border-regalia"
                    }`}
                  >
                    <Image
                      src={userImg}
                      alt="user"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </Link>
                )}
                <button
                  // onMouseEnter={hoverSound}
                  onClick={() => {
                    {
                      clickSound();
                      user ? handleLogout() : handleLogin();
                      setIsMenuOpen(false);
                    }
                  }}
                  className="cursor-pointer rounded-full border-2 border-regalia bg-transparent px-5 py-2 text-sm font-bold text-white duration-300 hover:bg-regalia hover:text-black md:text-xs lg:px-6 lg:text-[10px] 2xl:px-10 2xl:text-[18px]"
                >
                  {user ? (
                    <>
                      <IoIosLogOut
                        size={24}
                        className="inline-block xl:hidden"
                      />
                      <h1 className="hidden xl:block">Logout</h1>
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
