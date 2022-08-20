import { Avatar } from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Store } from "../../Context/Store";

interface Props {
  picture: string;
  time: any;
  message: string;
  not_sent_by_you: any;
  username: string;
  user_id: string;
}

function UserChatItem({
  picture,
  time,
  message,
  not_sent_by_you,
  username,
  user_id,
}: Props) {
  const history = useRouter();
  const { dispatch } = useContext(Store);

  const open_chat = () => {
    dispatch({ type: "OPEN_CHAT", payload: "open" });
    history.push(`/chat/${user_id}`);
  };

  return (
    <div
      onClick={open_chat}
      className="grid grid-cols-5 border-b gap-2 border-gray-200 dark:border-gray-700 p-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 items-center"
    >
      <div className="h-12 w-12 col-span-1 overflow-hidden">
        <Avatar src={picture} name={username} />
      </div>
      <div className="col-span-4 flex flex-col justify-center overflow-ellipsis">
        <div className="flex flex-row items-center justify-between">
          <p className="text-gray-700 dark:text-white font-semibold text-sm">
            {username}
          </p>
          <p className="text-xs text-gray-400">{moment(time).fromNow()}</p>
        </div>
        {!not_sent_by_you ? (
          <p className="truncate text-xs text-gray-600 dark:text-gray-400">
            <span className="text-gray-700 dark:text-gray-500">you: </span>
            {message}
          </p>
        ) : not_sent_by_you === "initial" ? (
          <p className="truncate text-xs font-semibold text-gray-500">
            send message and start chating
          </p>
        ) : (
          <p className="truncate text-xs text-gray-600 dark:text-gray-500">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default UserChatItem;
