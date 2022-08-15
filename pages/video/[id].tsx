import { useRouter } from "next/router";
import React, { useEffect } from "react";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import HomeLayout from "../../layouts/HomeLayout";
import dynamic from "next/dynamic";
import RelatedVideos from "../../components/PageSections/RelatedVideos";
import LikeAndDislike from "../../components/LikeAndDislike/LikeAndDislike";
import axios from "axios";
import { apiUrl } from "../../utils/apiUrl";
import { connect, convertDocToObj, disconnect } from "../../utils/mongo";
import Video from "../../models/Video";
import Subscribers from "../../components/Subscribers/Subscribers";
import { ShareIcon } from "@heroicons/react/outline";
import { EyeIcon, ChatAlt2Icon } from "@heroicons/react/solid";
import { Badge } from "@chakra-ui/react";
import moment from "moment";
import ad1 from "../../public/images/ads-example.jpg";
import Image from "next/image";
import ads22 from "../../public/images/ads22.png";
import ReportModal from "../../components/Modals/ReportModal";

const Comments = dynamic(() => import("../../components/Commets/Comments"), {
  ssr: false,
});

function SinglePost(props: any) {
  let router = useRouter();
  const { query } = router;

  var current = moment().startOf("day");

  // from server side props
  const { video } = props;

  useEffect(() => {
    const getVideo = async () => {
      await axios.get(`${apiUrl}/api/video/single?videoId=${query.id}`);
    };
    getVideo();
  }, [query.id]);

  const search_tag = () =>{
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
                moment.duration(moment(current).diff(video?.createdAt)).asDays() < 8 && (
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
            <div className="flex flex-wrap space-x-4 pb-4 ">
              {
                video?.tags?.map((tag:string, index:number)=>(
                  <span onClick={()=> console.log(tag)} className="dark:bg-gray-700 bg-gray-200 mb-1 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white text-gray-700 text-xs p-1 rounded" key={`${tag}${index}`}>{tag}</span>
                ))
              }
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
                <div className="hover:bg-gray-100 cursor-pointer p-2 rounded-full">
                  <ShareIcon height={16} width={16} />
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
