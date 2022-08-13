import { Spinner } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import SearchDashboard from "../../components/Search/SearchDashboard";
import VideosTable from "../../components/Tables/VideosTable";
import { Store } from "../../Context/Store";
import { useAuthFetch } from "../../hooks/useAuthFetch";
import HomeLayout from "../../layouts/HomeLayout";
import { apiUrl } from "../../utils/apiUrl";

const PER_PAGE = 8;

function MyVideos() {
  const [page, setPage] = useState<number>(1);
  const { state: store_state } = useContext(Store);
  const { search_category, search_query, mavee_11_user } = store_state;
  const url = `${apiUrl}/api/user/videos?page=${page}&category=${
    search_category ? search_category : ""
  }&keyword=${search_query ? search_query : ""}&perPage=${PER_PAGE}`;
  const [all_videos, setAllVideos] = useState<any>();
  const token = mavee_11_user?.token;

  // start the fetching using the useFetch hook
  const state = useAuthFetch(url, token);

  // rerender whenever total video changes
  useEffect(() => {
    setAllVideos(state?.data);
  }, [state, all_videos]);

  console.log(all_videos)

  const delete_item_from_table = (id: any) => {
    setAllVideos(all_videos?.videos.filter((item: any) => item._id !== id));
  };

  return (
    <HomeLayout>
      <div className="flex flex-col max-w-7xl mx-auto">
        <p className="text-center max-w-7xl mx-auto text-lg font-semibold py-16 dark:text-white text-gray-800">
          Manage My Videos
        </p>
        <div>
          <SearchDashboard />
        </div>
        <div className="flex">
          {state?.status === "fetching" ? (
            <div className="h-96 w-full dark:text-white text-gray-700 grid items-center justify-center content-center">
              <Spinner />
            </div>
          ) : (
            <>
              <VideosTable
                delete_item_from_table={delete_item_from_table}
                data={state}
                page={page}
                setPage={setPage}
                videos={all_videos?.videos}
              />
            </>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default MyVideos;
