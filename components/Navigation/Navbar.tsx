import React, { useContext } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import MobileNavDrawers from "../Drawers/MobileNavDrawers";
import NavSearch from "../NavSearch/NavSearch";
import { Store } from "../../Context/Store";
import { UploadIcon } from "@heroicons/react/outline";
import UserDropdown from "../Dropdowns/UserDropdown";

type Props = {};

const navigation = {
  social: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/Mavee11-fun-page-101540095598092",
      icon: (
        props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
      ) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      icon: (
        props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
      ) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "https://www.twitter.com/real_mavee11",
      icon: (
        props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
      ) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
  ],
};

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
      <div className="flex flex-row items-center space-x-4 p-1 bg-black">
        <div className="flex-1"></div>
        {navigation.social.map((item) => (
          <Link href={item.href} passHref key={item.name}>
            <a
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-gray-700"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          </Link>
        ))}
      </div>
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
        {mavee_11_user ? (
          <div className="flex flex-row items-start space-x-4">
            <div className="flex flex-col my-auto">
              <Link href={"/upload"}>
                <a>
                  <UploadIcon height={20} width={20} />
                </a>
              </Link>
            </div>
            <UserDropdown />
          </div>
        ) : (
          <div className="flex flex-row items-center space-x-4">
            <Link passHref href={"/login"}>
              <a className="">Sign In</a>
            </Link>
            <Link passHref href={"/register"}>
              <a className="bg-pink-600 hover:bg-pink-700 rounded p-2 text-white">
                Join For Free
              </a>
            </Link>
          </div>
        )}

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
