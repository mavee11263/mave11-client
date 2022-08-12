import React from "react";
import SearchDashboard from "../../components/Search/SearchDashboard";
import VideosTable from "../../components/Tables/VideosTable";
import HomeLayout from "../../layouts/HomeLayout";

function MyVideos() {
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
