import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../../Context/Store";
import { apiUrl } from "../../utils/apiUrl";
import { getError } from "../../utils/error";
import { socket } from "../../utils/socket";

type Props = {
  video_id: String;
  channel_id: String;
};

function Subscribers(props: Props) {
  const { state } = useContext(Store);
  const { mavee_11_user } = state;

  const toast = useToast();

  const [all_subscribers, setAllSubscribers] = useState<any>({
    subscribers: null,
    user_subscribed: null,
  });

  const toggle_subscribe = async () => {
    try {
      const { data } = await axios.post(
        `${apiUrl}/api/subscribe/toggle`,
        {
          channel_id: props.channel_id,
        },
        {
          headers: {
            Authorization: mavee_11_user?.token,
          },
        }
      );
      toast({
        title: "Success",
        status: "success",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: getError(error),
        status: "error",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const getLikes = async () => {
      const { data } = await axios.get(
        `${apiUrl}/api/subscribe/all/${props?.channel_id}?user_id=${mavee_11_user?._id}`
      );
      console.log("all subscribers", data);
      setAllSubscribers({
        subscribers: data.subscribers,
        user_subscribed: data.user_subscribed,
      });
    };
    getLikes();
  }, [props?.channel_id]);

  useEffect(() => {
    socket.on("subscribe", (data) => {
      setAllSubscribers({
        subscribers: data.subscribers,
        user_subscribed: true,
      });
    });
  }, [socket]);

  useEffect(() => {
    socket.on("un_subscribe", (data) => {
      setAllSubscribers({
        subscribers: data.subscribers,
        user_subscribed: false,
      });
    });
  }, [socket]);

  console.log(all_subscribers);

  return (
    <div
      onClick={toggle_subscribe}
      className={`${
        all_subscribers?.user_subscribed
          ? "bg-gray-200 hover:bg-gray-300 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-800 "
          : "bg-blue-700 hover:bg-blue-800 text-white"
      } flex self-end  cursor-pointer uppercase py-1 px-2 md:text-sm text-xs rounded`}
    >
      {all_subscribers?.user_subscribed ? "Un-Subscribe" : "Subscribe"} -{" "}
      {all_subscribers?.subscribers}
    </div>
  );
}

export default Subscribers;
