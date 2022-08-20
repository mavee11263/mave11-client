import React from "react";
import Navbar from "../components/Navigation/Navbar";

interface Props {
  children?: any;
}

function ChatLayout({ children }: Props) {
  return (
    <div className="dark:bg-gray-800">
      <Navbar />
      <div className="body">{children}</div>
    </div>
  );
}

export default ChatLayout;
