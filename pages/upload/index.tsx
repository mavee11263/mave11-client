import React, { useContext, useState } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import axios from "axios";
import { apiUrl } from "../../utils/apiUrl";
import { Store } from "../../Context/Store";
import { getError } from "../../utils/error";
import { useToast } from "@chakra-ui/react";
import FileUploadComponent from "../../components/FileUploadComponent/FileUploadComponent";
import UploadLoading from "../../components/UploadLoading/UploadLoading";

// prettier-ignore
import {getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject} from 'firebase/storage'
import { firebaseApp } from "../../utils/firebase-config";
import { TrashIcon } from "@heroicons/react/outline";
import { data } from "../../utils/data";

function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pictures_for_upload, setPicturesForUpload] = useState<any>([]);
  const [category, setCategory] = useState("");
  const [videoAsset, setVideoAsset] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(1);
  const [alert, setAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState<any>("");
  const [alertMsg, setAlertMsg] = useState("");
  const toast = useToast();

  const storage = getStorage(firebaseApp);

  // setting selected pictures to upload
  const selectedPictures = (pictures: any) => {
    setPicturesForUpload(pictures);
  };

  const { state } = useContext(Store);
  const { mavee_11_user } = state;

  const sace_video = async () => {
    setLoading(true);

    // creatin the form data to senf to api
    const formData = new FormData();
    pictures_for_upload.forEach((file: any | Blob) => {
      formData.append('thumbnail_picture', file)
    })
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append('video_url', videoAsset)
    

    try {
      await axios.post(
        `${apiUrl}/api/video/create`,
        formData,
        {
          headers: {
            Authorization: mavee_11_user?.token,
          },
        }
      );
      toast({
        title: "Video Uploaded",
        status: "success",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    } catch (error) {
      console.log(getError(error));
      setLoading(false);
    }
  };

  const upload_video = (e: any) => {
    setLoading(true);
    const videoFile = e.target.files[0];
    const storageRef = ref(storage, `Videos/${Date.now()}-${videoFile.name}`);
    try {
      const uploadTask = uploadBytesResumable(storageRef, videoFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const uploadProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(uploadProgress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setVideoAsset(downloadURL);
            setLoading(false);
            setAlert(true);
            setAlertStatus("success");
            setAlertMsg("Your video is uploaded to our server");
            setTimeout(() => {
              setAlert(false);
            }, 4000);
          });
        }
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const deleteVideo = () =>{
    const deleteRef = ref(storage, videoAsset)
    deleteObject(deleteRef).then(() =>{
      setVideoAsset(null)
    }).catch(error=>{
      console.log(error)
    })
  }

  return (
    <HomeLayout>
      <div className="grid grid-cols-6 md:gap-8 max-w-7xl mx-auto md:pt-16 pt-8 gap-4 lg:px-16 md:px-8 px-2 dark:text-gray-200 text-gray-700">
       
      <div className="form-group w-full col-span-6">
          <p className="pb-4">Select Video</p>
          <div className="px-4 py-5 bg-gray-50 dark:bg-gray-700 rounded shadow w-full">
            <div className="mx-auto rounded-lg overflow-hidden max-w-xl">
              {videoAsset ? (
                <div className="relative flex flex-col h-80 w-full">
                  <div className="flex ml-auto">
                    <div onClick={deleteVideo} className=" bg-red-600 hover:bg-red-700 cursor-pointer text-white p-2 rounded-full">
                      <TrashIcon height={20} width={20} />
                    </div>
                  </div>
                  <video
                    src={videoAsset}
                    controls
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              ) : (
                <div className="md:flex">
                  {loading ? (
                    <UploadLoading progress={progress} />
                  ) : (
                    <div className="w-full p-3">
                      <div
                        className={` cursor-pointer relative h-20 rounded-lg border-dashed border-2 border-gray-300 flex justify-center items-center `}
                      >
                        <div className="absolute">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex flex-col items-center">
                            <span className="block text-gray-400 font-normal">
                              Select video
                            </span>{" "}
                          </div>
                        </div>

                        <input
                          // onChange={uploadMultipleFiles}
                          type="file"
                          className="h-full w-full opacity-0"
                          onChange={upload_video}
                          accept="video/mp4,video/x-m4v,video/*"
                          name=""
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex col-span-3 flex-col">
          
          <label htmlFor="title">Title</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="title"
            placeholder="Enter video title"
            className="p-2 rounded dark:bg-gray-700 bg-gray-100"
          />
        </div>
        <div className="flex flex-col col-span-3">
          <label htmlFor="title">Category</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="flex-1 w-full rounded dark:bg-gray-700 bg-gray-100 border-none px-2 outline-none dark:text-gray-300 text-gray-700"
            placeholder="Select Category"
          >
            {
              data.categories?.map((item, index)=>(
                <option value="category">{item.name}</option>
              ))
            }
           
          </select>
        </div>
        <div className="flex col-span-6 flex-col">
          <label htmlFor="title">Description</label>
          <textarea
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            id="title"
            placeholder="Enter description of the video"
            className="p-2 rounded dark:bg-gray-700 bg-gray-100"
          />
        </div>
        <div className="col-span-6">
          <p>Select Thumbnail</p>
          <FileUploadComponent selectedPictures={selectedPictures} multiple />
        </div>
        

        <div className="ml-auto flex-1 col-span-6 flex flex-col">
          {loading ? (
            <div className="flex self-end bg-blue-700 p-1 rounded text-white font-semibold hover:bg-blue-800 cursor-pointer">
              Uploading...
            </div>
          ) : (
            <div
              onClick={sace_video}
              className="flex self-end bg-blue-700 p-1 rounded text-white font-semibold hover:bg-blue-800 cursor-pointer"
            >
              Save Video
            </div>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default Upload;
