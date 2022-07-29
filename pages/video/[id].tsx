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
import {ShareIcon} from '@heroicons/react/outline'
 
const Comments = dynamic(() => import("../../components/Commets/Comments"), {
  ssr: false,
});

function SinglePost(props: any) {
  
  let router = useRouter();
  const { query } = router;

  // from server side props
  const { video } = props;

  useEffect(() => {
    const getVideo = async () => {
      await axios.get(
        `${apiUrl}/api/video/single?videoId=${query.id}`
      );
    };
    getVideo();
  }, [query.id]);

  console.log(video)

  return (
    <HomeLayout>
      <main className="lg:px-20 max-w-[1920px] mx-auto md:px-12 px-4 flex flex-col w-full">
        <div className="grid grid-cols-7 lg:gap-12 md:gap-8 gap-4 pt-8">
          <div className="lg:col-span-5 md:col-span-6 col-span-7">
            <VideoPlayer thumbnail={video?.thumbnail} video_url={video?.video} />
            <div className="flex pb-8 pt-2 dark:text-gray-200 text-gray-900 w-full md:flex-row flex-col-reverse md:items-center">
              <p className="font-semibold flex-1">{video?.title}</p>
              <div className="flex flex-row items-center md:justify-between justify-end py-2 space-x-2 dark:text-gray-200 text-gray-700">
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
            <div className=" w-full">ads go here</div>
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
