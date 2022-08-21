import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import HomeLayout from "../../layouts/HomeLayout";
import dynamic from "next/dynamic";
import RelatedVideos from "../../components/PageSections/RelatedVideos";
import LikeAndDislike from "../../components/LikeAndDislike/LikeAndDislike";
import { apiUrl } from "../../utils/apiUrl";
import { connect, convertDocToObj, disconnect } from "../../utils/mongo";
import Video from "../../models/Video";
import Subscribers from "../../components/Subscribers/Subscribers";
import { EyeIcon, ChatAlt2Icon } from "@heroicons/react/solid";
import { Avatar, Badge } from "@chakra-ui/react";
import moment from "moment";
import ad1 from "../../public/images/ads-example.jpg";
import Image from "next/image";
import ads22 from "../../public/images/ads22.png";
import ReportModal from "../../components/Modals/ReportModal";
import ShareModal from "../../components/Modals/ShareModal";
import { useFetch } from "../../hooks/useFetch";
import { Store } from "../../Context/Store";

const Comments = dynamic(() => import("../../components/Commets/Comments"), {
  ssr: false,
});

function SinglePost(props: any) {
  let router = useRouter();
  const { query } = router;
  var current = moment().startOf("day");
  const { state: user_state, dispatch } = useContext(Store);
  const { mavee_11_user } = user_state;

  // from server side props
  const { video } = props;
  const url = `${apiUrl}/api/video/single?videoId=${query.id}`;

  // get video info and increase number of views
  const state = useFetch(url);

  const open_chat_Handler = () => {
    dispatch({ type: "OPEN_CHAT", payload: "open" });
    if (mavee_11_user) {
      router.push(`/chat/${state?.data?.creator?.user_id}`);
    } else {
      router.push(`/login?redirect=/video/${query.id}`);
    }
  };


  const set_search_query_handler = (query:string) =>{
    dispatch({type: 'SET_SEARCH_QUERY', payload: query})
    router.push('/')
  }

  return (
    <HomeLayout>
      <main className="lg:px-20 max-w-[1920px] mx-auto md:px-12 px-4 flex flex-col w-full">
        <div className="grid grid-cols-7 lg:gap-12 md:gap-8 gap-4 pt-8">
          <div className="lg:col-span-5 md:col-span-6 col-span-7">
            <div className="flex flex-row items-center space-x-2 flex-1 pb-1">
              <p className="font-semibold dark:text-white flex flex-row items-center text-gray-900 text-lg ">
                {video?.title}
              </p>
              {
                //Difference in number of days
                moment
                  .duration(moment(current).diff(video?.createdAt))
                  .asDays() < 8 && (
                  <Badge size="xs" colorScheme="green">
                    New
                  </Badge>
                )
              }
              <span>-</span>
              <span>
                <p className="text-gray-500 text-sm ">
                  {moment(video?.createdAt).fromNow()}
                </p>
              </span>
            </div>
            <div className="flex flex-wrap space-x-4 pb-4 items-center ">
              <div onClick={() => router.push(`/channel/${state?.data?.creator?.user_id}`)} className="flex flex-row items-center space-x-3 cursor-pointer">
                <Avatar size={"xs"} src={state?.data?.creator?.pro_pic} name={state?.data?.creator?.username} />
                <p className="text-gray-700 dark:text-gray-300 font-semibold text-sm">
                  {state?.data?.creator?.username}
                </p>
              </div>
              {mavee_11_user && (
                <div
                  onClick={open_chat_Handler}
                  className="text-gray-700 flex flex-row text-xs space-x-1 items-center bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-700 hover:bg-gray-200 p-1 rounded cursor-pointer"
                >
                  <ChatAlt2Icon height={16} width={16} />
                  <p>chat</p>
                </div>
              )}
              {video?.tags?.map((tag: string, index: number) => (
                <div className="flex flex-col">
                  <span
                    onClick={() => set_search_query_handler(tag)}
                    className="dark:bg-gray-700 bg-gray-200 mb-1 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white text-gray-700 text-xs p-1 rounded"
                    key={`${tag}${index}`}
                  >
                    {tag}
                  </span>
                </div>
              ))}
            </div>

            <VideoPlayer
              thumbnail={video?.thumbnail}
              video_url={video?.video}
            />
            <div className="flex pb-8 pt-2 dark:text-gray-200 text-gray-700 w-full flex-row  items-center">
              {/* // video info */}
              <div className="flex flex-row items-center space-x-4">
                <div className="flex flex-row items-center space-x-2 ">
                  <EyeIcon height={20} width={20} />
                  <p>{video.numberOfViews}</p>
                </div>
                <div className="flex flex-row space-x-2">
                  <span className="relative inline-block">
                    <ChatAlt2Icon height={20} width={20} />
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                      {video?.numberOfComments ? video?.numberOfComments : 0}
                    </span>
                  </span>
                  <p className="md:flex hidden">Comments</p>
                </div>
              </div>

              <div className="flex-1"></div>
              <div className="flex flex-row items-center md:justify-between justify-end py-2 space-x-2 dark:text-gray-200 text-gray-700">
                <>
                  <ReportModal video_id={video?._id} />
                </>
                <div className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer p-2 rounded-full">
                  <ShareModal video_id={video._id} />
                </div>
                <>
                  <LikeAndDislike
                    video_id={video._id}
                    likes={video.likes ? video.likes : ""}
                  />
                </>

                <>
                  <Subscribers channel_id={video.author} video_id={video._id} />
                </>
              </div>
            </div>
          </div>

          {/* // ads component */}
          <div className="lg:col-span-2 md:col-span-1 dark:text-gray-200 text-gray-700 cols-span-1 md:flex hidden flex-col w-full">
            {/* ads go here */}
            <div className=" w-full flex-col space-y-12 h-full justify-between">
              <div className="relative h-52 flex flex-col bg-gray-200 rounded w-full overflow-hidden">
                <p className="ml-auto text-gray-400 text-sm pr-2">
                  Advertisement
                </p>
                <Image src={ad1} layout={"fill"} objectFit="contain" />
              </div>
              <div className="relative h-96 flex flex-col bg-gray-200 rounded w-full overflow-hidden">
                <p className="ml-auto text-gray-400 text-sm pr-2">
                  Advertisement
                </p>
                <Image src={ads22} layout={"fill"} objectFit="contain" />
              </div>
            </div>
          </div>

          <>
            <Comments videoId={query.id} />
          </>

          {/* // related videos component */}
          <div className="flex md:py-4 py-2 col-span-7 border-t border-gray-400 dark:border-gray-500 dark:text-gray-200 text-gray-700 w-full font-semibold">
            Related Videos
          </div>
        </div>

        {/* // the video component */}
        <>
          <RelatedVideos />
        </>
      </main>
    </HomeLayout>
  );
}

export async function getServerSideProps(context: any) {
  const { params } = context;
  const { id } = params;
  await connect();
  const video = await Video.findOne({ _id: id }).lean();
  await disconnect();
  return {
    props: {
      video: convertDocToObj(video),
    },
  };
}

export default SinglePost;
