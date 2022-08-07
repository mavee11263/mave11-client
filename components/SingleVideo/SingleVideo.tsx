import { Badge, Text } from "@chakra-ui/react";
import { DotsVerticalIcon, EyeIcon, FlagIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import moment from "moment";
import ReportModal from "../Modals/ReportModal";

interface Props {
  _id: string;
  title: string;
  likes: number;
  numberOfViews: number;
  thumbnail: string;
  createdAt: any;
}

function SingleVideo({
  _id,
  title,
  likes,
  numberOfViews,
  thumbnail,
  createdAt,
}: Props) {
  const router = useRouter();
  var current = moment().startOf("day");
  return (
    <div className="col-span-1 cursor-pointer flex flex-col">
      <div
        onClick={() => router.push(`/video/${_id}`)}
        className="relative md:h-44 h-28 overflow-hidden"
      >
        <Image
          quality={50}
          placeholder="blur"
          blurDataURL={thumbnail}
          loading={'eager'}
          src={thumbnail}
          layout="fill"
          objectFit="cover"
        />
        {/* <img src={thumbnail} alt="video thumbnail" className=" object-cover" /> */}
        {
          //Difference in number of days
          moment.duration(moment(createdAt).diff(current)).asDays() < 7 && (
            <Badge
              className="absolute top-2 right-2 "
              size="xs"
              colorScheme="green"
            >
              New
            </Badge>
          )
        }
      </div>
      <div className="flex flex-col md:px-0 px-2">
        <Text
          size={"xs"}
          noOfLines={1}
          className="font-semibold dark:text-gray-200 text-gray-700 pt-2"
        >
          {title}
        </Text>
      </div>
      <div className="flex flex-row items-center justify-left space-x-2 dark:text-gray-500 text-gray-500 text-sm py-2 md:px-0 px-2">
        <Text className="flex flex-row items-center gap-2">
          {numberOfViews} <EyeIcon height={20} width={20} />
        </Text>
        <span className="text-xl">&#183;</span>
        {/* {likes < 1 ? (
          <Text></Text>
        ) : (
          <Text>
            {likes} {likes > 1 ? "likes" : "like"}
          </Text>
        )} */}
        <div className="flex-1"></div>
        <>
        <ReportModal />
        </>
        <DotsVerticalIcon height={20} width={20} />
      </div>
    </div>
  );
}

export default SingleVideo;
