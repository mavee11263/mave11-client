import React, { useContext } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import MobileNavDrawers from "../Drawers/MobileNavDrawers";
import NavSearch from "../NavSearch/NavSearch";
import { Store } from "../../Context/Store";
import { Avatar } from "@chakra-ui/react";
import { UploadIcon } from "@heroicons/react/outline";

function Navbar() {
  const { systemTheme, theme, setTheme } = useTheme();
  const history = useRouter();
  const { state, dispatch } = useContext(Store);
  const { mavee_11_user } = state;

  const logout_user = () => {
    dispatch({ type: "USER_LOGOUT" });
    history.push("/");
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
          className="uppercase cursor-pointer font-bold text-sm text-gray-700 flex flex-row items-center dark:text-white"
        >
          {/* <Image width={100} objectFit='contain' src={logo} alt="logo representing the website icon" className="h-8 ml-2" /> */}
          logo
        </div>

        <div className="flex-1"></div>
        <>
          <NavSearch />
        </>

        {renderThemeToggle()}

        {/* // right side navbar options */}
        {/* {mavee_11_user ? (
          <div className="flex flex-row items-start space-x-4">
            <div className="flex flex-col my-auto">
              <Link href={"/upload"}>
                <a ><UploadIcon height={20} width={20} /></a>
              </Link>
            </div>
            <div className="flex flex-row" onClick={logout_user}>
              <Avatar name={mavee_11_user?.name} size="sm" />
            </div>
          </div>
        ) : (
          <div>
            <Link href={"/login"}>
              <a className="">Sign In</a>
            </Link>
            <Link href={"/register"}>
              <a>Register</a>
            </Link>
          </div>
        )} */}

        {/* //drawer when on moblie view */}
        <div className="md:hidden flex">
          <MobileNavDrawers user={mavee_11_user} />
        </div>
      </div>

      <div className="md:hidden flex flex-row items-center h-16 max-w-7xl mx-auto justify-between">
        <div className="flex flex-row items-center space-x-2">
          {/* //drawer when on moblie view */}
          <div className="md:hidden flex pl-4">
            <MobileNavDrawers user={mavee_11_user} />
          </div>
          <div className="relative flex p-4"> </div>
        </div>
        <div className="flex">
          <div
            onClick={() => history.push("/")}
            className="uppercase cursor-pointer font-bold text-sm text-gray-700 dark:text-white flex flex-row items-center"
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
