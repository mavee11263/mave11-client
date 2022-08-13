import Head from "next/head";
import React from "react";
import Navbar from "../components/Navigation/Navbar";

interface Props {
  children?: any;
}

function HomeLayout({ children }: Props) {
  return (
    <div>
      <Head>
        <title>MaVee 11 - NSFW | Watch best porn content on the internet</title>
        <meta
          name="description"
          content={
            "Watch all your favoutite porn videos from your favourite creators"
          }
        />
      </Head>
      <div className="dark:bg-gray-800 bg-white flex flex-col w-full">
        <header className="flex">
          <Navbar />
        </header>
        <main className="min-h-screen">{children}</main>
        <footer>footer</footer>
      </div>
      {/* // cookies Modal */}
    </div>
  );
}

export default HomeLayout;
