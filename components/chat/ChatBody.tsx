import React, { useState, useEffect, useContext } from "react";
import { ArrowLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import SentMessage from "./SentMessage";
import ReceivedMessage from "./ReceivedMessage";
import { Store } from "../../Context/Store";
import { useRouter } from "next/router";
import axios from "axios";
import { apiUrl } from "../../utils/apiUrl";
import { useAuthFetch } from "../../hooks/useAuthFetch";
import { socket } from "../../utils/socket";

type Props = {};

const ChatBody = (props: Props) => {
  const [body, setBody] = useState("");
  //to gert all messaged
  const [page_loading, setPageLoading] = useState(false);
  const [all_messages, setAllMessages] = useState<any>([])
  const [send_loading, setSendLoading] = useState(false); 
  const router = useRouter();
  const { query } = router;
  const [rows, setRows] = useState(1);

  useEffect(() => {
    const rowlen = body.split("\n");

    if (rowlen.length > 1) {
      setRows(rowlen.length);
    }
  }, [body]);

  
  const { state: store_state, dispatch } = useContext(Store);
  const { mavee_11_user } = store_state;

  // get chat messages
  const url = `${apiUrl}/api/chat/messages/${query.id}/${mavee_11_user?._id}`

  const state = useAuthFetch(url, mavee_11_user?.token)

  useEffect(()=>{
    setAllMessages(state?.data?.messages)
  },[state])

  const close_chat = () => {
    dispatch({ type: "CLOSE_CHAT", payload: "close" });
  };

  console.log(all_messages)

  const sentMessage = async () => {
    if (body === "") {
      console.log("empty body");
    } else {
      const {data} = await axios.post(`${apiUrl}/api/chat/send/${query.id}`,{
        body: body
      },{
        headers:{
          Authorization: mavee_11_user?.token
        }
      })
      console.log(data)
      setBody("");
    }
  };

  useEffect(() => {
    socket.on('message', data => {
        setAllMessages((old_messages:any) => [...old_messages, data])
    })
}, [socket])

  return (
    <div className="dark:bg-gray-700 bg-white flex flex-col w-full md:p-4 p-2 md:h-full h-full">
      <div
        onClick={close_chat}
        className="md:hidden flex py-4 mb-2 border-b border-gray-300 dark:border-gray-800 flex-row items-center"
      >
        <ArrowLeftIcon height={16} width={16} className="text-gray-700 dark:text-gray-200 mr-2" />
        <p className="text-gray-700 text-sm">Close chat</p>
      </div>
      {query.id !== 'user' ? (
        <>
          <div className="flex-1"></div>
          {state?.status === 'fetching' ? (
            <p className="text-center my-16 text-lg font-semibold text-gray-700">
              Loading ...
            </p>
          ) : (
            <>
              {all_messages?.map((message:any, index:number) => (
                <div key={index} className="flex flex-col">
                  {message.sent_by === mavee_11_user?._id ? (
                    <SentMessage
                      message={message.body}
                      time={message.createdAt}
                    />
                  ) : (
                    <ReceivedMessage message={message.body} />
                  )}
                </div>
              ))}
            </>
          )}
          <div className="text-gray-700 rounded-full bottom-4 w-full mt-4 flex flex-row  pb-8 self-end">
            <textarea
              rows={rows}
              value={body}
              className="py-3 px-4 rounded-lg flex-1 dark:text-gray-100 text-gray-700 align-bottom outline-none bg-gray-100 dark:bg-gray-800"
              placeholder="Type message..."
              onChange={(e) => setBody(e.target.value)}
            />
            <div className="flex flex-col self-end">
              <span
                onClick={
                  send_loading ? () => console.log("loading") : sentMessage
                }
                className="cursor-pointer rounded-full bg-blue-900 p-3 ml-2 hover:bg-blue-800"
              >
                <ChevronRightIcon
                  height={20}
                  width={20}
                  className="text-white"
                />
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="text-lg text-gray-700 dark:text-gray-200 font-semibold flex flex-row items-center w-full h-full">
          <p className="self-center text-center w-full">
            Click on a chat to start talking
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatBody;
