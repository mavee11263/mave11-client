import {
  ScaleIcon,
  UserGroupIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import React, { useContext, useEffect, useState } from "react";
import ProfileCard from "../../components/ProfilePage/ProfileCard";
import { Store } from "../../Context/Store";
import { useFetch } from "../../hooks/useFetch";
import HomeLayout from "../../layouts/HomeLayout";
import { apiUrl } from "../../utils/apiUrl";

function ProfilePage() {
  const { state: user_state } = useContext(Store);
  const { mavee_11_user } = user_state;
  const url = `${apiUrl}/api/user/info?user=${mavee_11_user?._id}`;
  const state = useFetch(url);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  useEffect(()=>{
    setEmail(state?.data?.user_info?.email)
    setUsername(state?.data?.user_info?.username)
  },[state])

  const save_info = () =>{

    console.log(email, username);
  }


  return (
    <HomeLayout>
      <div className="flex max-w-7xl mx-auto flex-col px-2">
        <p className="text-center my-8 text-gray-800 dark:text-white mx-auto font-semibold">
          Profile - {state?.data?.user_info?.username}
        </p>
        <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ">
          <ProfileCard
            name="My Subscribers"
            icon={
              <UserGroupIcon
                className="h-6 w-6 text-red-600"
                aria-hidden="true"
              />
            }
            location="#"
            amount={state?.data?.subscribers}
            loading={state?.status === "fetching"}
            bg_color={"bg-red-200"}
          />
          <ProfileCard
            name="My Videos"
            icon={
              <VideoCameraIcon
                className="h-6 w-6 text-green-600"
                aria-hidden="true"
              />
            }
            location="/my-videos"
            amount={state?.data?.videos}
            loading={state?.status === "fetching"}
            bg_color={"bg-green-200"}
          />
        </div>
        <div className="flex flex-col w-full py-16">
          <p className="dark:text-white text-gray-700 pb-8 md:pb-4">
            Account Info
          </p>
          <div className="grid grid-cols-5 gap-4">
            <input
              type="text"
              className="dark:bg-gray-700 bg-gray-100 rounded dark:text-gray-200 text-gray-700 md:col-span-3 col-span-5 p-2 outline-none border-none"
              defaultValue={state?.data?.user_info?.username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
            />
            <input
              type="text"
              className="dark:bg-gray-700 bg-gray-100 rounded dark:text-gray-200 text-gray-700 md:col-span-4 col-span-5 p-2 outline-none border-none"
              defaultValue={state?.data?.user_info?.email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
          </div>
          <div className="col-span-4 ml-auto py-8">
            <div onClick={save_info} className="flex bg-pink-500 p-2 rounded text-white font-semibold cursor-pointer hover:bg-pink-600 text-sm">
              Change Info
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default ProfilePage;
