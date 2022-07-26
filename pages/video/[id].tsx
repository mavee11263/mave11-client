import {  ThumbDownIcon, ThumbUpIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React from "react";
import SingleVideo from "../../components/SingleVideo/SingleVideo";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import HomeLayout from "../../layouts/HomeLayout";
import dynamic from 'next/dynamic'
import RelatedVideos from '../../components/PageSections/RelatedVideos'


const Comments = dynamic(() => import('../../components/Commets/Comments'), {
  ssr: false,
})

function SinglePost() {
  const router = useRouter()
  const {query} = router
  return (
    <HomeLayout>
      <main className="lg:px-20 md:px-12 px-4 flex flex-col w-full">
        <div className="grid grid-cols-7 lg:gap-12 md:gap-8 gap-4 pt-8">
          <div className="lg:col-span-5 md:col-span-6 col-span-7">
            <VideoPlayer />
            <div className="flex pb-8 pt-2 dark:text-gray-200 text-gray-900 w-full md:flex-row flex-col-reverse md:items-center">
              <p className="font-semibold flex-1">
                Iam a video added by a user click me to play
              </p>
              <div className="flex flex-row items-center md:justify-between justify-end py-2 space-x-2 dark:text-gray-200 text-gray-700">
                <span>
                  <ThumbUpIcon height={20} width={20} />
                </span>
                <span>
                  <ThumbDownIcon height={20} width={20} />
                </span>
                <div className="flex self-end bg-blue-700 hover:bg-blue-800 cursor-pointer uppercase text-white py-1 px-2 md:text-sm text-xs rounded">
                  Subscribe - 12M
                </div>
              </div>
            </div>
          </div>

          {/* // ads component */}
          <div className="lg:col-span-2 dark:text-gray-200 text-gray-700 cols-span-1 md:flex hidden flex-col w-full">
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

export default SinglePost;
