"use client";
import { useUser } from "@/lib/store/user";
import { supabase } from "@/lib/supabase-client";
import { navRoutes } from "@/utils/constants/navRoutes";
import { login } from "@/utils/functions/login";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
  const searchParams = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [userImg, setUserImg] = useState("");
  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRole] = useState("");
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [showRegisterDashboard, setShowRegisterDashboard] = useState(false);
  const [showConvenorDashboard, setShowConvenorDashboard] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showCoordinatorDashboard, setShowCoordinatorDashboard] =
    useState(false);
  const handleLogout = async () => {
    setShowAdminDashboard(false);
    setShowCoordinatorDashboard(false);
    setShowDashboard(false);
    await supabase.auth.signOut();
    router.refresh();

    setUser(undefined);
  };

  useEffect(() => {
    const readUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data) {
        setShowDashboard(true);
        setUserImg(data?.session?.user.user_metadata?.avatar_url);
      }

      const { data: roleData } = await supabase
        .from("roles")
        .select()
        .match({ id: data?.session?.user?.id });

      let isSuperAdmin = false;
      let isCoordinator = false;
      let isConvenor = false;
      let isRegistrar = false;
      if (roleData) {
        for (const obj of roleData!) {
          if (obj.role === "super_admin") {
            isSuperAdmin = true;
          }
          if (obj.role === "event_coordinator") {
            isCoordinator = true;
          }
          if (obj.role === "convenor") {
            isConvenor = true;
          }
          if (obj.role === "registrar") {
            isRegistrar = true;
          }
        }

        if (isSuperAdmin) {
          setShowAdminDashboard(true);
          setShowConvenorDashboard(true);
          setShowRegisterDashboard(true);
          setShowCoordinatorDashboard(false);
        } else {
          if (isConvenor) {
            setShowConvenorDashboard(true);
            setShowRegisterDashboard(true);
            setShowCoordinatorDashboard(false);
            return;
          } else {
            if (isCoordinator) {
              setShowConvenorDashboard(false);
              setShowRegisterDashboard(true);
              setShowCoordinatorDashboard(true);
            } else if (!isSuperAdmin && !isCoordinator && !isConvenor) {
              setShowCoordinatorDashboard(false);
              setShowConvenorDashboard(false);
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
    await login();

    // Show the dashboard and refresh the router
    setShowDashboard(true);
    router.refresh();
  };

  return (
    <>
      <div className="sticky left-0 top-0 z-[40] w-screen overflow-x-hidden font-hollirood lg:w-full ">
        <div
          className={`${
            scrolling || isMenuOpen ? "bg-transparent" : "bg-transparent"
          } flex flex-row items-center  justify-between overflow-hidden border-[#c9a747] py-2 pl-2 pr-4 max-md:border-b max-md:px-3 md:mb-14 md:flex 2xl:justify-around 2xl:gap-20 2xl:px-10 
        `}
        >
          <div className="flex cursor-pointer items-center pt-2 font-hollirood text-3xl font-bold text-[#c9a747] ">
            <Link href={"/"}>REGALIA</Link>
          </div>
          <div className="flex flex-row-reverse items-center justify-between gap-4 md:flex-row">
            <div
              className="flex h-full w-8 cursor-pointer flex-col items-center justify-center gap-[6px]
           md:hidden
          "
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span
                className={`block h-[2px] w-7 bg-[#c9a747] transition-all duration-500
            ${isMenuOpen ? "translate-y-2 rotate-45" : ""}
            `}
              ></span>
              <span
                className={`block h-[2px] w-7 bg-[#c9a747] transition-all duration-500
            ${isMenuOpen ? "translate-x-44 " : "translate-x-0"}
            `}
              ></span>
              <span
                className={`block h-[2px] w-7 bg-[#c9a747] transition-all duration-500
            ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}
            `}
              ></span>
            </div>

            <ul
              className={`fixed top-14  z-[100] w-full rounded-b-xl border-[#c9a747] bg-[#151515] pb-6 pl-4 transition-all duration-500 ease-in max-md:border-b-2 max-md:border-t md:static md:z-auto md:flex md:w-auto md:items-center md:bg-transparent md:pb-0 md:pl-0  ${
                isMenuOpen ? "right-0 block" : " right-[-790px]"
              }`}
            >
              {navRoutes.map((link, index) => (
                <Link
                  href={link.path}
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  key={index}
                >
                  <li
                    className={`font-retrolight my-2  rounded-xl px-2 py-1 pt-2 text-sm font-semibold  duration-200  ease-linear hover:text-yellow-400 md:my-0 md:ml-2 md:text-xs md:hover:scale-105 lg:ml-4 lg:text-sm 2xl:text-[18px] ${
                      pathname === link.path && "text-[#c9a747]"
                    }`}
                  >
                    {link.name}
                  </li>
                </Link>
              ))}
              {user && showDashboard && (
                <Link href={"/dashboard"}>
                  <li
                    className={`font-retrolight my-2  rounded-xl px-2 py-1 pt-2 text-sm font-semibold  duration-200  ease-linear hover:text-yellow-400 md:my-0 md:ml-2 md:text-xs md:hover:scale-105 lg:ml-4  lg:text-sm 2xl:text-[18px] ${
                      pathname === "/dashboard" && "text-[#c9a747]"
                    }`}
                  >
                    Dashboard
                  </li>
                </Link>
              )}
              {user && showCoordinatorDashboard && (
                <Link href={"/coordinator"}>
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
                <Link href={"/coordinator"}>
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
                <Link href={"/registrar"}>
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
              <div className="flex flex-row items-center gap-5  md:ml-5 ">
                {user && (
                  <Link
                    href={"/profile"}
                    className={`${
                      pathname === "/profile" &&
                      "rounded-full border-4 border-[#c9a747]"
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
                  onClick={() => {
                    {
                      user ? handleLogout() : handleLogin();
                    }
                  }}
                  className="rounded-full border-2 border-[#c9a747] bg-transparent px-5 py-2 text-sm font-bold text-white duration-300 hover:bg-[#c9a747] hover:text-black md:text-xs lg:px-6 lg:text-[10px] 2xl:px-10 2xl:text-[18px]"
                >
                  {user ? (
                    <>
                      <IoIosLogOut
                        size={24}
                        className="inline-block lg:hidden"
                      />
                      <h1 className="hidden lg:block">Logout</h1>
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
