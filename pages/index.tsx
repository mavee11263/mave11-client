import type { NextPage } from "next";
import SingleVideo from "../components/SingleVideo/SingleVideo";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";
import HomeLayout from "../layouts/HomeLayout";

const Home: NextPage = () => {
  return (
    <HomeLayout>
      <div className="flex flex-col w-full ">
        <div className="flex flex-row items-center space-x-6 overflow-y-scroll py-4 scrollbar-hide">
          {
            [1,2,3,4,5,6,7,8,9,4,4,3,3,3,3,3,3,3,3,3,3].map((item, index)=>(
              <div key={index} className="flex border dark:border-gray-600 dark:text-gray-200 text-gray-700 border-gray-300 md:px-4 rounded-full px-2 py-1">
                  category
              </div>
            ))
          }
        </div>
        <div className="flex flex-col w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1  gap-4">
            {[1, 2, 3, 4, 5].map((item: any, key: number) => (
              <div className="col-span-1">
                <SingleVideo />
              </div>
            ))}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Home;
