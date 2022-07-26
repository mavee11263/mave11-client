import {
  ArrowCircleRightIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/solid";
import React, { useContext, useEffect, useState } from "react";
import { getError } from "../../utils/error";
import CommentItem from "../CommentItem/CommentItem";
import axios from "axios";
import { useRouter } from "next/router";
import { apiUrl } from "../../utils/apiUrl";
import { useToast } from "@chakra-ui/react";
import { Store } from "../../Context/Store";
import { socket } from "../../utils/socket";

interface Props {
  videoId?: any;
}

function Comments({ videoId }: Props) {
  const router = useRouter();
  const toast = useToast();
  const { query } = router;
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<any>();
  const [comment, setComment] = useState("");

  const { state, dispatch } = useContext(Store);
  const { mavee_11_user } = state;

  const create_comment = async () => {
    try {
      const { data } = await axios.post(
        `${apiUrl}/api/comment/create`,
        {
          comment: comment,
          videoId: query.id,
        },
        {
          headers: {
            Authorization: mavee_11_user?.token,
          },
        }
      );
      setComments((old_comments: any) => [...old_comments, data.comments]);
      console.log(data);
      toast({
        title: "Comment added.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {}
  };

  //get all reviews for the store
  useEffect(() => {
    const getReviews = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${apiUrl}/api/comment/all?videoId=${query?.id}`
        );
        console.log(data);
        setComments(data.comments);
        setLoading(false);
      } catch (error) {
        console.log(getError(error));
        setLoading(false);
      }
    };
    getReviews();
  }, []);

  useEffect(() => {
    socket.on("comment", (data) => {
      setComments((old_comments: any) => [...old_comments, data.comment]);
    });
  }, [socket]);

  return (
    <div className="flex flex-col space-y-4 md:py-4 py-2 col-span-7 dark:text-gray-200 text-gray-700 w-full">
      <div className="flex flex-row items-center space-x-4 border-b pb-4 border-gray-400 dark:border-gray-500 capitalize  ">
        {/* <p className=" font-semibold">comments</p> */}
        <div className="flex flex-1 flex-row items-center space-x-4">
          <input
            type="text"
            placeholder="Write a comment"
            onChange={(e) => setComment(e.target.value)}
            className="bg-gray-100 dark:bg-gray-700 p-2 rounded w-full outline-none"
          />
          <span onClick={create_comment} className="">
            <ArrowCircleRightIcon
              height={32}
              width={32}
              className="text-blue-700 hover:text-blue-800 "
            />
          </span>
        </div>
      </div>
      {loading ? (
        <p className="text-gray-400 w-full text-center">Loading ...</p>
      ) : (
        <>
          {comments?.map((item: any, index: number) => (
            <CommentItem name={item?.sentFromId} comment={item?.comment} />
          ))}
        </>
      )}
      <div className="flex mx-auto">
        <div className="flex flex-col bg-gray-200 dark:bg-gray-700 cursor-pointer px-1 rounded">
          <DotsHorizontalIcon
            height={20}
            width={20}
            className="text-gray-700 dark:text-gray-300"
          />
        </div>
      </div>
    </div>
  );
}

export default Comments;
