import React, { useContext, useState } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import axios from "axios";
import { apiUrl } from "../../utils/apiUrl";
import { Store } from "../../Context/Store";
import { getError } from "../../utils/error";
import { Select } from "@chakra-ui/react";

function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const { state, dispatch } = useContext(Store);
  const { mavee_11_user } = state;

  const upload_video = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${apiUrl}/api/video/create`,
        formData,
        {
          headers: {
            Authorization: mavee_11_user?.token,
          },
        }
      );

      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(getError(error));
    }
  };
  return (
    <HomeLayout>
      <div className="max-w-7xl mx-auto py-16">
        <div className="grid grid-cols-6 gap-8">
          <div className=" col-span-4 p-16 border border-dashed border-gray-300 rounded">
            pick video
          </div>
          <div className="flex col-span-3 flex-col">
            <label htmlFor="title">video title</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              id="title"
              placeholder="Enter video title"
              className="p-2 rounded dark:bg-gray-700 bg-gray-100"
            />
          </div>
          <div className="flex col-span-4">
            <Select
              onChange={(e) => setCategory(e.target.value)}
              className="flex-1 w-full rounded dark:bg-gray-700 bg-gray-100"
              placeholder="Select Category"
            >
              <option value="category">Category 1</option>
              <option value="category">Category 2</option>
              <option value="category">Category 3</option>
            </Select>
          </div>
          <div className="flex col-span-4">
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="flex-1 w-full p-2 rounded dark:bg-gray-700 bg-gray-100"
              placeholder="Enter video description "
            />
          </div>
          <div className="ml-auto flex-1 col-span-4 flex flex-col">
            <div
              onClick={upload_video}
              className="flex self-end bg-blue-700 p-1 rounded text-white font-semibold hover:bg-blue-800 cursor-pointer"
            >
              Upload
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Upload;
