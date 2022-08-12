import React, { useContext, useState } from "react";
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
  // const url = `${apiUrl}/api/user/videos?page=${page}&category=${
  //   search_category ? search_category : ""
  // }&keyword=${search_query ? search_query : ""}&perPage=${PER_PAGE}`;

  const url = `${apiUrl}/api/user/videos`
  const token =  mavee_11_user?.token

   // start the fetching using the useFetch hook
   const state = useAuthFetch(url, token);

   console.log('state ---- ',state)

  return (
    <HomeLayout>
      <div className="flex flex-col max-w-7xl mx-auto">
        <p className="text-center max-w-7xl mx-auto text-lg font-semibold py-16 dark:text-white text-gray-800">
          Manage My Videos
        </p>
        <>
          <SearchDashboard />
        </>
        <div className="flex">
          <VideosTable />
        </div>
      </div>
    </HomeLayout>
  );
}

export default MyVideos;
