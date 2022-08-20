import React, { useEffect, Fragment, useState, useContext } from "react";
import { Store } from "../../Context/Store";
import { useAuthFetch } from "../../hooks/useAuthFetch";
import { apiUrl } from "../../utils/apiUrl";
import UserChatItem from "./UserChatItem";

type Props = {};

const ChatLeft = (props: Props) => {
  const {state: store_state} = useContext(Store)
  const {mavee_11_user} = store_state

  const url = `${apiUrl}/api/chat/rooms`
  const state = useAuthFetch(url, mavee_11_user?.token)

  return (
    <div className="flex flex-col w-full dark:bg-gray-800 ">
      <div className="input border-t border-gray-100 dark:border-gray-700 w-full">
        <input
          type="text"
          placeholder="Search..."
          className="text-gray-700 dark:text-gray-200 p-2 bg-gray-100 dark:bg-gray-900 w-full outline-none border-none"
        />
      </div>
      {state?.status === 'fetching' ? (
        <p className="text-lg text-gray-700 dark:text-white text-center font-semibold my-4">
          Loading...
        </p>
      ) : (
        <>
          {state?.data?.chats?.map((chat:any, index:number) => (
            <Fragment key={index}>
              <UserChatItem
                time={chat.createdAt}
                picture={chat.user_picture}
                message={chat.last_message}
                username={chat.message_username}
                not_sent_by_you={chat.not_sent_by_you}
                user_id={chat.user_id}
              />
            </Fragment>
          ))}
        </>
      )}
    </div>
  );
};

export default ChatLeft;
