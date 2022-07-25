import React, { useState } from "react";
import {
  MenuAlt3Icon,
  MoonIcon,
  SearchIcon,
  SunIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import MobileNavDrawers from "../Drawers/MobileNavDrawers";
import NavSearch from "../NavSearch/NavSearch";

function Navbar() {
  const { systemTheme, theme, setTheme } = useTheme();
  const history = useRouter();

  const [mobile_nav, setMobileNav] = useState(false);
  const router = useRouter();
  const toggle_mobile_nav = () => {
    mobile_nav ? setMobileNav(false) : setMobileNav(true);
  };

  const userInfo = {
    name: "tatendaZw",
    role: "user",
  };

  const renderThemeToggle = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    if (currentTheme === "dark") {
      return (
        <button
          className="flex p-2 rounded-full dark:bg-gray-800 bg-gray-100 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => setTheme("light")}
        >
          <SunIcon height={20} width={20} />
        </button>
      );
    }
    return (
      <button
        className="flex p-2 rounded-full dark:bg-gray-800 bg-gray-100 cursor-pointer hover:bg-gray-200"
        onClick={() => setTheme("dark")}
        type="button"
      >
        <MoonIcon height={20} width={20} />
      </button>
    );
  };

  return (
    <div className="dark:bg-gray-800 bg-white dark:text-gray-200 text-gray-700 shadow w-full ">
      <div className="md:flex hidden flex-row items-center  h-16 lg:px-0 md:16 md:px-4 px-2 space-x-4 max-w-7xl mx-auto justify-between">
        <div
          onClick={() => history.push("/")}
          className="uppercase cursor-pointer font-bold text-sm text-gray-700 flex flex-row items-center"
        >
          {/* <Image width={100} objectFit='contain' src={logo} alt="logo representing the website icon" className="h-8 ml-2" /> */}
          logo
        </div>

        <div className="flex-1"></div>
        <>
          <NavSearch />
        </>

        {renderThemeToggle()}
        <Link href={"/login"}>
          <a className="">Sign In</a>
        </Link>
        <Link href={"/register"}>
          <a>Register</a>
        </Link>

        {/* //drawer when on moblie view */}
        <div className="md:hidden flex">
          <MobileNavDrawers user={userInfo} />
        </div>
      </div>

      <div className="md:hidden flex flex-row items-center h-16 max-w-7xl mx-auto justify-between">
        <div className="flex flex-row items-center space-x-2">
          {/* //drawer when on moblie view */}
          <div className="md:hidden flex pl-4">
            <MobileNavDrawers user={userInfo} />
          </div>
          <div className="relative flex p-4"> </div>
        </div>
        <div className="flex">
          <div
            onClick={() => history.push("/")}
            className="uppercase cursor-pointer font-bold text-sm text-gray-700 flex flex-row items-center"
          >
            {/* <Image height={30} objectFit="contain" src={logo} alt="logo representing the website icon" className="h-8" /> */}
            logo
          </div>
        </div>

        <div className="flex space-x-2 pr-2">
          <div>
            <NavSearch />
          </div>
          {renderThemeToggle()}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
