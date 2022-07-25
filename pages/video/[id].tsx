import { ThumbDownIcon, ThumbUpIcon } from "@heroicons/react/outline";
import React from "react";
import SingleVideo from "../../components/SingleVideo/SingleVideo";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import HomeLayout from "../../layouts/HomeLayout";

function SinglePost() {
  return (
    <HomeLayout>
      <main className="lg:px-20 md:px-12 px-4 flex flex-col w-full">
        <div className="grid grid-cols-7 lg:gap-12 md:gap-8 gap-4 pt-8">
          <div className="lg:col-span-5 md:col-span-6 col-span-7">
            <VideoPlayer />
            <div className="flex py-8 dark:text-gray-200 text-gray-900 w-full md:flex-row flex-col md:items-center">
              <p className="font-semibold flex-1">
                Iam a video added by a user click me to play
              </p>
              <div className="flex flex-row items-center md:justify-between justify-end space-x-2 dark:text-gray-200 text-gray-700">
                <span>
                  <ThumbUpIcon height={20} width={20} />
                </span>
                <span>
                  <ThumbDownIcon height={20} width={20} />
                </span>
                <div className="flex self-end bg-green-600 hover:bg-green-700 uppercase text-white py-1 px-2 md:text-sm text-xs rounded">
                  Subscribe - 12M
                </div>
              </div>
            </div>
          </div>

          {/* // ads component */}
          <div className="lg:col-span-2 dark:text-gray-200 text-gray-700 cols-span-1 md:flex hidden flex-col w-full">
            <div className=" w-full">ads go here</div>
          </div>

          {/* // related videos component */}
          <div className="flex md:py-4 py-2 col-span-7 border-t border-gray-400 dark:border-gray-500 dark:text-gray-200 text-gray-700 w-full font-semibold">
            Related Videos
          </div>
        </div>

        {/* // the video component */}
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1  gap-4">
          {[1, 2, 3, 4, 5].map((item: any, key: number) => (
            <div className="col-span-1">
              <SingleVideo />
            </div>
          ))}
        </div>
      </main>
    </HomeLayout>
  );
}

export default SinglePost;
