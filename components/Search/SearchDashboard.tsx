import { SearchIcon } from "@heroicons/react/solid";
import React, { useContext, useState } from "react";
import { Store } from "../../Context/Store";

type Props = {};

const SearchDashboard = (props: Props) => {
  const [search_query, setQuery] = useState("");
  const { dispatch } = useContext(Store);

  const search_video = () => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: search_query });
  };

  return (
    <div className="flex flex-row items-center w-full flex-1 my-4 bg-gray-200 dark:bg-gray-700 px-4 rounded">
      <input
        type="text"
        placeholder="Search Video"
        onChange={(e) => setQuery(e.target.value)}
        className=" border-none outline-none p-2 bg-gray-200 dark:bg-gray-700 flex-1 dark:text-gray-300 text-gray-700"
      />
      <div className="flex cursor-pointer" onClick={search_video}>
        <SearchIcon
          height={20}
          width={20}
          className="dark:text-gray-200 text-gray-500 "
        />
      </div>
    </div>
  );
};

export default SearchDashboard;
