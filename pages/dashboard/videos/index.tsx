import React, { useContext, useEffect, useState } from "react";
import Pagination from "../../../components/Pagination/Pagination";
import AdminVideosTable from "../../../components/Tables/AdminVideosTable";
import { Store } from "../../../Context/Store";
import { useFetch } from "../../../hooks/useFetch";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { apiUrl } from "../../../utils/apiUrl";

const PER_PAGE = 16;

function Videos() {
  const url = `${apiUrl}/api/video/explore?perPage=${PER_PAGE}`;
  const state = useFetch(url);
  const [page, setPage] = useState(1);
  const [all_videos, setAllVideos] = useState<any>();

  const { state: store_state } = useContext(Store);
  const { search_category, search_query, mavee_11_user } = store_state;

  const token = mavee_11_user?.token;

  // rerender whenever total video changes
  useEffect(() => {
    setAllVideos(state?.data?.videos);
  }, [state]);

  const delete_item_from_table = (id: any) => {
    setAllVideos(all_videos?.filter((item: any) => item._id !== id));
  };

  console.log(state);

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full max-w-7xl mx-auto px-2">
        <AdminVideosTable
          delete_item_from_table={delete_item_from_table}
          setPage={setPage}
          page={page}
          data={state}
          auth_token={token}
          videos={all_videos}
        />
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
    </DashboardLayout>
  );
}

export default Videos;
