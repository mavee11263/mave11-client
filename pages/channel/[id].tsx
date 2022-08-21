import React, { useContext, useState } from "react";
import { Avatar } from "@chakra-ui/react";
import HomeLayout from "../../layouts/HomeLayout";
import { useRouter } from "next/router";
import Subscribers from "../../components/Subscribers/Subscribers";
import { useFetch } from "../../hooks/useFetch";
import { apiUrl } from "../../utils/apiUrl";
import VideoItemLoading from "../../components/Loading/VideoItemLoading";
import Pagination from "../../components/Pagination/Pagination";
import SingleVideo from "../../components/SingleVideo/SingleVideo";
import BlueButton from "../../components/Buttons/BlueButton";
import { Store } from "../../Context/Store";
import not_found from "../../public/images/not_found_video.svg";
import Image from "next/image";

const PER_PAGE = 16;

function ChannelVideos() {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const { query } = router;
  const { state: store_state, dispatch } = useContext(Store);
  const { search_category, search_query, mavee_11_user } = store_state;
  const url = `${apiUrl}/api/channel/videos/${query.id}`;
  const state = useFetch(url);

  console.log("items ----- ", state);

  return (
    <HomeLayout>
      <div className="flex flex-col w-full py-8 bg-gray-50 min-h-screen">
        {/* // page header */}
        <div className="bg-white shadow mb-8 rounded-lg mx-auto max-w-7xl w-full">
          <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
              <div className="min-w-0 flex-1">
                {/* Profile */}
                <div className="flex items-center">
                  <div className="hidden rounded-full sm:block">
                    <Avatar
                      size="lg"
                      name={state?.data?.channel_info?.username}
                      src={state?.data?.channel_info?.photoURL}
                    />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <div className="rounded-full sm:hidden">
                        <Avatar
                          size="lg"
                          name={state?.data?.channel_info?.username}
                          src={state?.data?.channel_info?.photoURL}
                        />
                      </div>
                      <div className="flex flex-col ml-3">
                        <h1 className=" md:text-2xl text-xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                          {state?.data?.channel_info?.username}, {state?.data?.meta?.total} videos
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                <div className="flex">
                    {/* //@ts-ignore */}
                  <Subscribers channel_id={query?.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto w-full">
          {state.status === "fetching" && (
            <div className="flex flex-col w-full max-w-7xl mx-auto md:px-4 px-2 ">
              <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1  gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 7, 7, 7, 7, 77, 9].map(
                  (item, index) => (
                    <div className="col-span-1">
                      <VideoItemLoading />
                    </div>
                  )
                )}
              </div>
            </div>
          )}
          {state.status === "fetched" && (
            <>
              <div className="flex flex-col w-full max-w-7xl mx-auto md:px-4 px-2">
                {state?.data?.videos.length < 1 ? (
                  <div className="flex flex-col py-8 items-center max-w-7xl mx-auto">
                    <div className="relative h-44 w-44">
                      <Image
                        src={not_found}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <p className="dark:text-gray-300 text-gray-800 text-lg py-4 font-semibold">
                      {search_query || search_category
                        ? "No Videos Found"
                        : "No videos at the moment"}
                    </p>
                    {mavee_11_user ? (
                      <BlueButton
                        onClick={() => router.push("/upload")}
                        text="Click here to add a video"
                      />
                    ) : (
                      <BlueButton
                        onClick={() => router.push("/login?redirect=/upload")}
                        text="Click here to add a video"
                      />
                    )}
                  </div>
                ) : (
                  <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2  md:gap-6 gap-2">
                    {state?.data?.videos?.map((item: any, key: number) => (
                      <div key={key} className="col-span-1">
                        <SingleVideo
                          thumbnail={item.thumbnail}
                          numberOfViews={item.numberOfViews}
                          likes={item.numberOfLikes}
                          title={item.title}
                          _id={item._id}
                          createdAt={item.createdAt}
                          duration={item.duration}
                          video={item.video}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <>
                  <Pagination
                    className="flex flex-1 py-8 mx-auto"
                    currentPage={page}
                    totalCount={state?.data.meta?.total}
                    pageSize={PER_PAGE}
                    onPageChange={(page: number) => setPage(page)}
                  />
                </>
              </div>
            </>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default ChannelVideos;
