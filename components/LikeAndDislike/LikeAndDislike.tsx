import React, { useContext, useEffect, useState } from "react";
import { ThumbUpIcon as SolidThumbUpIcon } from "@heroicons/react/solid";
import { ThumbUpIcon } from "@heroicons/react/outline";
import axios from "axios";
import { getError } from "../../utils/error";
import { Store } from "../../Context/Store";
import { apiUrl } from "../../utils/apiUrl";
import { useToast } from "@chakra-ui/react";
import { socket } from "../../utils/socket";

type Props = {
  likes: number;
  video_id: String;
};

const LikeAndDislike = (props: Props) => {
  const { state } = useContext(Store);
  const { mavee_11_user } = state;
  const toast = useToast();
  const [all_likes, setAllLikes] = useState<any>({
    likes: null,
    user_liked: null,
  });

  const toggle_like = async () => {
    try {
      const { data } = await axios.post(
        `${apiUrl}/api/like/add`,
        {
          item_id: props.video_id,
          type: "video",
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
        `${apiUrl}/api/like/video/all/${props?.video_id}?user_id=${mavee_11_user?._id}`
      );
      setAllLikes({
        likes: data.likes,
        user_liked: data.user_liked,
      });
    };
    getLikes();
  }, [props?.video_id]);

  useEffect(() => {
    socket.on("like_removed", (data) => {
      setAllLikes({
        likes: data.likes,
        user_liked: false,
      });
    });
  }, [socket]);

  useEffect(() => {
    socket.on("like_added", (data) => {
      setAllLikes({
        likes: data.likes,
        user_liked: true,
      });
    });
  }, [socket]);

  return (
    <>
      <span
        onClick={toggle_like}
        className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full py-1 px-2 cursor-pointer flex flex-row items-center space-x-1"
      >
        {mavee_11_user ? (
          <div className="flex flex-row items-center space-x-2">
            {all_likes?.user_liked ? (
              <SolidThumbUpIcon height={20} width={20} />
            ) : (
              <ThumbUpIcon height={20} width={20} />
            )}
            <p className="">{all_likes?.likes}</p>
          </div>
        ) : (
          <>
            <ThumbUpIcon height={20} width={20} />
            <p>{all_likes?.likes}</p>
          </>
        )}
      </span>
    </>
  );
};

export default LikeAndDislike;
