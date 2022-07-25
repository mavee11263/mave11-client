import React from "react";
import Navbar from "../components/Navigation/Navbar";

interface Props {
  children?: any;
}

function HomeLayout({ children }: Props) {
  return (
    <div className="dark:bg-gray-800 bg-white flex flex-col w-full">
      <header className="flex">
          <Navbar />
      </header>
      <main className="min-h-screen">{children}</main>
      <footer>footer</footer>
    </div>
  );
}

export default HomeLayout;
