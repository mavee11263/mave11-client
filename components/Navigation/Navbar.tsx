import React from "react";
import { SearchIcon } from "@heroicons/react/solid";
import Link from "next/link";

function Navbar() {
  return (
    <div className="flex flex-row items-center h-16 shadow w-full lg:px-20 md:px-12 px-4">
      <div className="logo">LOGO</div>
      <div className="flex-1"></div>
      <div className="flex flex-row space-x-4 items-center">
        <div className="searc">
          <div className="flex p-2 rounded-full bg-gray-100 cursor-pointer hover:bg-gray-200">
            <SearchIcon height={20} width={20} className="text-gray-700" />
          </div>
        </div>
        <Link href={"/login"}>
          <a className="">Sign In</a>
        </Link>
        <Link href={"/register"}>
          <a>Register</a>
        </Link>
      </div>
      {/* <div className="w"></div> */}
    </div>
  );
}

export default Navbar;
