import { Badge, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  _id: string;
  title: string;
  likes: number;
  numberOfViews: number;
  thumbnail: string;
}

function SingleVideo({ _id, title, likes, numberOfViews, thumbnail }: Props) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/video/${_id}`)}
      className="col-span-1 cursor-pointer flex flex-col"
    >
      <div className="relative md:h-44 h-56 overflow-hidden">
        <Image
          quality={50}
          placeholder="blur"
          blurDataURL={thumbnail}
          src={thumbnail}
          layout="fill"
          objectFit="cover"
        />
        {/* <img src={thumbnail} alt="video thumbnail" className=" object-cover" /> */}
      </div>
      <div className="flex flex-col md:px-0 px-2">
        <Text
          size={"sm"}
          noOfLines={2}
          className="font-semibold dark:text-gray-200 text-gray-700 pt-2"
        >
          {title}
        </Text>
      </div>
      <div className="flex flex-row items-center justify-left space-x-2 dark:text-gray-500 text-gray-500 text-sm py-2 md:px-0 px-2">
        <Text>
          {numberOfViews} {numberOfViews < 1 ? "View" : "Views"}
        </Text>
        <span className="text-xl">&#183;</span>
        {likes < 1 ? (
          <Text></Text>
        ) : (
          <Text>
            {likes} {likes > 1 ? "likes" : "like"}
          </Text>
        )}
        <div className="flex-1"></div>
        <Badge size="xs" colorScheme="green">
                    New
                  </Badge>
      </div>
    </div>
  );
}

export default SingleVideo;
