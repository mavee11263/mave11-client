import React, { useContext } from "react";
import { Store } from "../../Context/Store";
import { useFetch } from "../../hooks/useFetch";
import { apiUrl } from "../../utils/apiUrl";
import SingleVideo from "../SingleVideo/SingleVideo";

const PER_PAGE = 8;

function RelatedVideos() {
  const { state: store_state } = useContext(Store);
  const { search_category, search_query } = store_state;
  const url = `${apiUrl}/api/video/explore?page=${1}&category=${
    search_category ? search_category : ""
  }&keyword=${search_query ? search_query : ""}&perPage=${PER_PAGE}`;

  // start the fetching using the useFetch hook
  const state = useFetch(url);

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2  md:gap-4 gap-2">
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
  );
}

export default RelatedVideos;
