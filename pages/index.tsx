import type { NextPage } from "next";
import SingleVideo from "../components/SingleVideo/SingleVideo";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";
import HomeLayout from "../layouts/HomeLayout";

const Home: NextPage = () => {
  return (
    <HomeLayout>
      <main className="lg:px-20 md:px-12 px-4 flex flex-col w-full">
        <div className="grid grid-cols-7 lg:gap-12 md:gap-8 gap-4 pt-8">
          <div className="lg:col-span-5 md:col-span-6 col-span-7">
            <VideoPlayer />
            <div className="flex py-8 text-gray-900 w-full flex-row items-center">
              <p className="font-semibold flex-1">Tatenda Bako</p>
              <div className="flex bg-green-600 hover:bg-green-700 uppercase text-white py-1 px-2 text-sm rounded">
                Subscribe - 12M
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 cols-span-1 md:flex hidden flex-col">
            <div className="uu bg-green-200 w-full">ads go here</div>
          </div>
        <div className="flex py-4 border-y border-gray-300 w-full">
          asldjk
        </div>
        </div>
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1  gap-8">
          {[1, 2, 3, 4, 5].map((item: any, key: number) => (
            <div className="col-span-1 bg-green-200">
              <SingleVideo />
            </div>
          ))}
        </div>
      </main>
    </HomeLayout>
  );
};

export default Home;
