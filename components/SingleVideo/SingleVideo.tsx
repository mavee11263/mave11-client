import { Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import image_video from "../../public/images/video.png";

interface Props{
  _id:string
}

function SingleVideo({_id}:Props) {
  const router = useRouter()
  return (
    <div onClick={()=> router.push(`/video/${_id}`)} className="col-span-1 cursor-pointer flex flex-col">
      <div className="relative">
        <Image src={image_video} layout="responsive" objectFit="cover" />
      </div>
      <div className="flex flex-col md:px-0 px-2">
        <Text
          size={"sm"}
          noOfLines={2}
          className="font-semibold dark:text-gray-200 text-gray-700 pt-2"
        >
          Iam a video added by a user click me to play
        </Text>
      </div>
      <div className="flex flex-row items-center justify-left space-x-2 dark:text-gray-500 text-gray-500 text-sm py-2 md:px-0 px-2">
        <Text>100 Views</Text>
        <span className="text-xl">&#183;</span>
        <Text>143 likes</Text>
      </div>
    </div>
  );
}

export default SingleVideo;
