import { useToast } from "@chakra-ui/react";
import {
  UserGroupIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import FileUploadComponent from "../../components/FileUploadComponent/FileUploadComponent";
import ProfileCard from "../../components/ProfilePage/ProfileCard";
import { Store } from "../../Context/Store";
import { useFetch } from "../../hooks/useFetch";
import HomeLayout from "../../layouts/HomeLayout";
import { apiUrl } from "../../utils/apiUrl";
import { getError } from "../../utils/error";

// for firebase upload
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { firebaseApp } from "../../utils/firebase-config";

function ProfilePage() {
  const { state: user_state } = useContext(Store);
  const { mavee_11_user } = user_state;
  const url = `${apiUrl}/api/user/info?user=${mavee_11_user?._id}`;
  const state = useFetch(url);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [pictures_for_upload, setPicturesForUpload] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [picture_progress, setPIctureProgress] = useState(1);

  // for firebase
  const storage = getStorage(firebaseApp);

  useEffect(() => {
    setEmail(state?.data?.user_info?.email);
    setUsername(state?.data?.user_info?.username);
  }, [state]);

  const selectedPictures = (pictures: any) => {
    setPicturesForUpload(pictures);
  };

  const save_info = async () => {
    const pictureFile = pictures_for_upload[0];
    if (pictures_for_upload?.length >= 1) {
      const storageRef = ref(
        storage,
        `Profiles/${Date.now()}-${pictureFile.name}`
        );
        //upload picture
        const uploadTask = uploadBytesResumable(storageRef, pictureFile);
        setLoading(true);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const uploadProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPIctureProgress(uploadProgress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            try {
              const { data } = await axios.put(
                `${apiUrl}/api/user/edit/${mavee_11_user?._id}`,
                {
                  username: username,
                  picture_url: downloadURL,
                },
                {
                  headers: {
                    Authorization: mavee_11_user?.token,
                  },
                }
              );
              setLoading(false);
              toast({
                title: "Saved Successfully.",
                status: "success",
                position: "top-right",
                duration: 9000,
                isClosable: true,
              });
            } catch (error) {
              setLoading(false);
              toast({
                title: getError(error),
                status: "error",
                position: "top-right",
                duration: 9000,
                isClosable: true,
              });
            }
          });
        }
      );
    } else {
      setLoading(true);
      try {
        const { data } = await axios.put(
          `${apiUrl}/api/user/edit/${mavee_11_user?._id}`,
          {
            username: username,
            picture_url: state?.data?.user_info?.photoURL,
          },
          {
            headers: {
              Authorization: mavee_11_user?.token,
            },
          }
        );
        setLoading(false);
        toast({
          title: "Saved Successfully.",
          status: "success",
          position: "top-right",
          duration: 9000,
          isClosable: true,
        });
      } catch (error) {
        setLoading(false);
        toast({
          title: getError(error),
          status: "error",
          position: "top-right",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

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
            <div className="md:col-span-2 col-span-4">
              <p className="block dark:text-gray-200 text-gray-700">
                Select Profile Piture
              </p>
              <FileUploadComponent
                selectedPictures={selectedPictures}
                multiple
              />
            </div>
          </div>
          <div className="col-span-4 ml-auto py-8">
            <div
              onClick={loading ? () => console.log("loading") : save_info}
              className="flex bg-pink-500 p-2 rounded text-white font-semibold cursor-pointer hover:bg-pink-600 text-sm"
            >
              {loading ? "Loading" : "Change Info"}
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default ProfilePage;
