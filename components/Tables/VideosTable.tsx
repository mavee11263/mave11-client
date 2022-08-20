import React, { ReactElement, useContext, useState } from "react";
import {
  CheckCircleIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import Pagination from "../Pagination/Pagination";
import moment from "moment";
import axios from "axios";
import { apiUrl } from "../../utils/apiUrl";
import { Store } from "../../Context/Store";

interface Props {
  delete_item_from_table?: any;
  setPage?: any;
  page?: any;
  data_info?: any;
  PER_PAGE?: number;
  data: any;
  videos: any;
  auth_token: string;
}

function VideosTable({
  delete_item_from_table,
  setPage,
  page,
  data_info,
  PER_PAGE,
  data,
  videos,
  auth_token,
}: Props): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [video_name, setvideoName] = useState("");
  const [video_id, setvideoId] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [change_status, setChangeStatus] = useState(false);
  const [new_status, setNewStatus] = useState("");

  const { state } = useContext(Store);
  const { mavee_11_user } = state;

  const confirm_delete_item = async (video_id: string) => {
    try {
      await axios.delete(`${apiUrl}/api/video/delete/${video_id}`, {
        headers: {
          Authorization: auth_token,
        },
      });
      delete_item_from_table(video_id);
      toast({
        title: "Video Deleted!",
        status: "success",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const change_status_handler = async (
    status: string,
    video_id: string,
    description: string,
    thumbnail: string,
    category: string,
    title: string
  ) => {
    await axios.put(
      `${apiUrl}/api/video/edit/${video_id}`,
      {
        status: status,
        description,
        thumbnail,
        category,
        title,
      },
      {
        headers: {
          Authorization: mavee_11_user?.token,
        },
      }
    );
    router.reload()
    setChangeStatus(false);
  };

  const set_delete_item = (id: string, name: string) => {
    onOpen();
    setvideoId(id);
    setvideoName(name);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="overflow-x-auto ">
        <div className="inline-block min-w-full  py-2 align-middle">
          <div className="w-full overflow-hidden border-b border-gray-200 dark:border-gray-700 sm:rounded">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-200"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-200"
                  >
                    Category
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-200"
                  >
                    Uploaded On
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-200"
                  >
                    Views
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-200"
                  >
                    Likes
                  </th>

                  <th
                    onClick={() => setChangeStatus(true)}
                    scope="col"
                    className="px-6 py-3 cursor-pointer text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-200"
                  >
                    Status
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-200"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                <>
                  {videos?.map((video: any, index: number) => (
                    <>
                      <tr key={video.thumbnail + index}>
                        <td
                          className="whitespace-nowrap px-6 py-4"
                          onClick={() => router.push(`/video/${"video?._id"}`)}
                        >
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-100 dark:bg-gray-700">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={video?.thumbnail}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="max-w-xs overflow-hidden text-sm font-medium text-gray-900 dark:text-gray-100">
                                {video?.title}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-500 dark:text-gray-200">
                            {video.category}
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-500 dark:text-gray-200">
                            {moment(video?.createdAt).fromNow()}
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-500 dark:text-gray-200">
                            {video?.numberOfViews}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-500 dark:text-gray-200">
                            {video?.numberOfLikes}
                          </div>
                        </td>

                        {change_status ? (
                          <td className="whitespace-nowrap px-6 py-4 outline-none">
                            <select
                              name="status"
                              id="status"
                              defaultValue={video.status}
                              className="outline-none dark:bg-gray-600 dark:text-white p-1 text-sm rounded"
                              onChange={(e) => setNewStatus(e.target.value)}
                            >
                              <option value="private">Private</option>
                              <option value="public">Public</option>
                            </select>
                          </td>
                        ) : (
                          <>
                            {new_status ? (
                              <td
                                onClick={() => setChangeStatus(true)}
                                className="whitespace-nowrap px-6 py-4"
                              >
                                {new_status === "public" ? (
                                  <StatusItem text="Public" status="public" />
                                ) : (
                                  <StatusItem text="Private" status="private" />
                                )}
                              </td>
                            ) : (
                              <td
                                onClick={() => setChangeStatus(true)}
                                className="whitespace-nowrap px-6 py-4"
                              >
                                {video?.status === "public" ? (
                                  <StatusItem text="Public" status="public" />
                                ) : (
                                  <StatusItem text="Private" status="private" />
                                )}
                              </td>
                            )}
                          </>
                        )}
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          <div className="flex flex-row items-center space-x-2">
                            {change_status ? (
                              <div className="flex flex-row items-center space-x-2">
                                <span
                                  onClick={() =>
                                    change_status_handler(
                                      new_status,
                                      video._id,
                                      video.description,
                                      video.thumbnail,
                                      video.category,
                                      video.title
                                    )
                                  }
                                  className="cursor-pointer"
                                >
                                  <CheckCircleIcon
                                    height={24}
                                    width={24}
                                    className="text-green-400 "
                                  />
                                </span>
                                <span
                                  onClick={() => setChangeStatus(false)}
                                  className="cursor-pointer"
                                >
                                  <XCircleIcon
                                    height={24}
                                    width={24}
                                    className="text-red-400 "
                                  />
                                </span>
                              </div>
                            ) : (
                              <span
                                onClick={() =>
                                  set_delete_item(video._id, video.title)
                                }
                                className="cursor-pointer"
                              >
                                <TrashIcon
                                  height={20}
                                  width={20}
                                  className="text-red-400 "
                                />
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    </>
                  ))}
                </>
              </tbody>
            </table>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
              <ModalOverlay />
              <ModalContent className=" dark:bg-gray-800">
                <ModalBody className="flex w-full dark:bg-gray-800  flex-col items-center ">
                  <TrashIcon
                    height={80}
                    width={80}
                    className="text-gray-800 dark:text-white "
                  />
                  <p className="my-4 text-center text-lg font-semibold text-gray-800 dark:text-white">
                    Delete
                  </p>
                  <p className="text-center dark:text-white">
                    Are you sure you want to delete video with name {video_name}
                    ?
                  </p>
                </ModalBody>

                <ModalFooter className="dark:bg-gray-800">
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    onClick={() => confirm_delete_item(video_id)}
                    colorScheme="red"
                    isLoading={loading}
                  >
                    Delete
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </div>
      </div>
      <>
        <Pagination
          className="flex self-center pt-8"
          onPageChange={(page: number) => setPage(page)}
          pageSize={8}
          totalCount={data?.data?.meta?.totalPages}
          currentPage={1}
          //@ts-ignore
          page={page}
        />
      </>
    </div>
  );
}

interface StatusProps {
  status: string;
  text: string;
  onClick?: any;
}

const StatusItem = ({ status, text, onClick }: StatusProps) => {
  return (
    <span
      onClick={onClick}
      className={`${
        status === "public"
          ? "bg-green-700 hover:bg-green-600"
          : "bg-red-500 hover:bg-red-600"
      } inline-flex rounded-full cursor-pointer  px-2 text-xs font-semibold leading-5 text-white`}
    >
      {text}
    </span>
  );
};

export default VideosTable;
