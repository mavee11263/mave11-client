import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import SingleVideo from "../components/SingleVideo/SingleVideo";
import { Store } from "../Context/Store";
import { useFetch } from "../hooks/useFetch";
import HomeLayout from "../layouts/HomeLayout";
import { apiUrl } from "../utils/apiUrl";

const PER_PAGE = 16;

const Home: NextPage = () => {

  const [page, setPage] = useState<number>(1);
  const { state: store_state } = useContext(Store);
  const { search_category, search_query } = store_state;
  const url = `${apiUrl}/api/video/explore?page=${page}&category=${
    search_category ? search_category : ""
  }&keyword=${search_query ? search_query : ""}&perPage=${PER_PAGE}`;

  // start the fetching using the useFetch hook
  const state = useFetch(url);

  return (
    <HomeLayout>
      <div className="flex flex-col w-full lg:px-0 md:px-4 px-4 ">
        <div className="flex flex-row items-center space-x-6 overflow-y-scroll py-4 scrollbar-hide">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3].map(
            (item, index) => (
              <div
                key={index}
                className="flex border dark:border-gray-600 dark:text-gray-200 text-gray-700 border-gray-300 md:px-4 rounded-full px-2 py-1"
              >
                category
              </div>
            )
          )}
        </div>
        {
          state.status === 'fetching' && (
            <p>loading </p>
          )
        }
        {state.status === "fetched" && (
          <>
            <div className="flex flex-col w-full max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1  gap-6">
                {state?.data?.videos?.map((item: any, key: number) => (
                  <div key={key} className="col-span-1">
                    <SingleVideo _id={item._id} />
                  </div>
                ))}
              </div>

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
