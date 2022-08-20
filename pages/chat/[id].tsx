import React, { useContext } from "react";
import ChatBody from "../../components/chat/ChatBody";
import ChatLeft from "../../components/chat/ChatLeft";
import { Store } from "../../Context/Store";

import ChatLayout from "../../layouts/ChatLayout";

function Chat() {
  const { state } = useContext(Store);
  const { chat_state } = state;

  console.log(chat_state)

  return (
    <ChatLayout>
      <div className="w-full md:flex hidden flex-row min-h-screen">
        <div className="w-1/4 border-r border-gray-200 dark:border-gray-700">
          <ChatLeft />
        </div>
        <div className="w-3/4">
          <ChatBody />
        </div>
      </div>
      <div className="md:hidden flex">
        {chat_state === "open" ? (
          <div className="w-full min-h-screen flex-col">
            <ChatBody />
          </div>
        ) : (
          <div className="w-full">
            <ChatLeft />
          </div>
        )}
      </div>
    </ChatLayout>
  );
}

export default Chat;
