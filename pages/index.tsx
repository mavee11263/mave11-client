import type { NextPage } from "next";
import { useContext, useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import SingleVideo from "../components/SingleVideo/SingleVideo";
import { Store } from "../Context/Store";
import { useFetch } from "../hooks/useFetch";
import HomeLayout from "../layouts/HomeLayout";
import { apiUrl } from "../utils/apiUrl";
import not_found from "../public/images/not_found_video.svg";
import Image from "next/image";
import BlueButton from "../components/Buttons/BlueButton";
import { useRouter } from "next/router";
import { data } from "../utils/data";
import { Text } from "@chakra-ui/react";
import VideoItemLoading from "../components/Loading/VideoItemLoading";

const PER_PAGE = 16;

const Home: NextPage = () => {
  const [page, setPage] = useState<number>(1);
  const { state: store_state } = useContext(Store);
  const { search_category, search_query, mavee_11_user } = store_state;
  const url = `${apiUrl}/api/video/explore?page=${page}&category=${
    search_category ? search_category : ""
  }&keyword=${search_query ? search_query : ""}&perPage=${PER_PAGE}`;

  const history = useRouter();

  // start the fetching using the useFetch hook
  const state = useFetch(url);

  return (
    <HomeLayout>
      <div className="flex flex-col w-full lg:px-0  ">
        <div className="flex">
          <div className="max-w-7xl mx-auto  flex flex-wrap items-center space-x-2 overflow-y-scroll py-4 scrollbar-hide">
            {data.categories.map((item, index) => (
              <div
                key={index}
                className="flex break-normal flex-row mb-2 border dark:border-gray-400 cursor-pointer dark:bg-gray-700 bg-gray-100 dark:text-gray-200 text-gray-700 border-gray-300 md:px-4 rounded-full px-2 py-1"
              >
                <Text noOfLines={1}>{item.name}</Text>
              </div>
            ))}
          </div>
        </div>
        {state.status === "fetching" && (
          <div className="flex flex-col w-full max-w-7xl mx-auto md:px-4 px-2 ">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1  gap-6">
              {[1, 2, 3, 4, 5, 6, 7,7,7,7,7,7,7,7,77,9].map((item, index) => (
                <div className="col-span-1">
                  <VideoItemLoading />
                </div>
              ))}
            </div>
          </div>
        )}
        {state.status === "fetched" && (
          <>
            <div className="flex flex-col w-full max-w-7xl mx-auto md:px-4 px-2">
              {state?.data?.videos.length < 1 ? (
                <div className="flex flex-col py-8 items-center max-w-7xl mx-auto">
                  <div className="relative h-44 w-44">
                    <Image src={not_found} layout="fill" objectFit="contain" />
                  </div>
                  <p className="dark:text-gray-300 text-gray-800 text-lg py-4 font-semibold">
                    No videos at the moment
                  </p>
                  {
                    mavee_11_user ? (
                      <BlueButton
                    onClick={() => history.push("/upload")}
                    text="Click here to add a video"
                  />
                    ):(
                      <BlueButton
                    onClick={() => history.push("/login?redirect=/upload")}
                    text="Click here to add a video"
                  />
                    )
                  }
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
    </HomeLayout>
  );
};

export default Home;
