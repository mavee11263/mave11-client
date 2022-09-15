import { Divider } from "@chakra-ui/react";
import React, { useState } from "react";
import DeleteModal from "../../../components/Modals/DeleteModal";
import DashboardLayout from "../../../layouts/DashboardLayout";

type Props = {};

function Settings({}: Props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [pictures_for_upload, setPicturesForUpload] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");

  const selectedPictures = (pictures: any) => {
    setPicturesForUpload(pictures);
  };

  const save_info = () => {};
  return (
    <DashboardLayout>
      <div className="max-w-7xl w-full mx-auto">
        <div className="flex flex-col w-full ">
          <p className="text-center py-4 capitalize font-semibold text-3xl">
            Manage Site
          </p>
        </div>
        <div className="flex">
      <div className="flex max-w-7xl w-full flex-col px-2">
        <p className="text-center my-8 text-gray-800 mx-auto font-semibold">
          Profile - {"For Site"}
        </p>

        <div className="flex flex-col w-full py-16">
          <p className="text-gray-700 pb-8 md:pb-4">
            Account Info
          </p>
          <div className="flex flex-col w-full flex-1 gap-4">
            <input
              type="text"
              className=" bg-white rounded text-gray-700 md:w-1/3 w-full p-2 outline-none border-none"
              defaultValue={"Username"}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
            />
            <input
              type="text"
              className=" bg-white rounded text-gray-700 md:col-span-4 col-span-5 p-2 outline-none border-none"
              defaultValue={"doe@gmail.com"}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />

            <input
              type="text"
              className=" bg-white rounded text-gray-700 md:col-span-4 col-span-5 p-2 outline-none border-none"
              defaultValue={"country"}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="country"
            />
          
          </div>
          <div className="col-span-4 ml-auto py-8">
            <div
              onClick={loading ? () => console.log("loading") : save_info}
              className="flex bg-pink-500 p-2 rounded text-white font-semibold cursor-pointer hover:bg-pink-600 text-sm"
            >
              {loading ? "Loading" : "Change Info"}
            </div>
          </div>
          <div className="flex flex-col space-y-2 ">
            <Divider />
            <div className="flex self-end">
              <DeleteModal />
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    </DashboardLayout>
  );
}

export default Settings;
