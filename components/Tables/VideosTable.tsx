import React, { ReactElement, useState, useContext } from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/outline";
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
import axios from "axios";
import Pagination from "../Pagination/Pagination";

const PER_PAGE = 16;

interface Props {
  videos?: any;
  delete_item_from_table?: any;
  setPage?: any;
  page?: any;
  data_info?: any;
  PER_PAGE?: number;
}

function VideosTable({
  videos,
  delete_item_from_table,
  setPage,
  page,
  data_info,
  PER_PAGE,
}: Props): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [video_name, setvideoName] = useState("");
  const [video_id, setvideoId] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const confirm_delete_item = async (video_id: string) => {};

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
                    Description
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
                  {[1, 2, 3, 4, 5, 6, 7]?.map((video: any, index: number) => (
                    <>
                      <tr key={index}>
                        <td
                          className="whitespace-nowrap px-6 py-4"
                          onClick={() =>
                            router.push(`/video/description/${"video?._id"}`)
                          }
                        >
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-100 dark:bg-gray-700">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={"video.pictures[0]"}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="max-w-xs overflow-hidden text-sm font-medium text-gray-900 dark:text-gray-100">
                                {"video.title"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-500 dark:text-gray-200">
                            {"video.category"}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm max-w-sm overflow-hidden text-gray-500 dark:text-gray-200">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Sit quibusdam libero dolorem eaque explicabo,
                            ipsam dolore ratione corrupti exercitationem?
                            Nesciunt, non. Dolorem voluptas eaque doloribus odio
                            impedit, quos aspernatur accusantium!
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-500 dark:text-gray-200">
                            {"video.upload_date"}
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-500 dark:text-gray-200">
                            {"video.views"}
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          <span className="inline-flex rounded-full bg-green-700 px-2 text-xs font-semibold leading-5 text-white">
                            Active
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          <div className="flex flex-row items-center space-x-2">
                            <span
                              onClick={() =>
                                set_delete_item("video._id", "video.title")
                              }
                              className="cursor-pointer"
                            >
                              <TrashIcon
                                height={20}
                                width={20}
                                className="text-red-400 "
                              />
                            </span>

                            {/* 
                            remove comments to enable edit video
                            redirects to edit video page
                             */}
                            {/* <span
                              onClick={() =>
                                router.push(
                                  `/dashboard/inventory/edit/${"video?._id"}`
                                )
                              }
                              className="cursor-pointer"
                            >
                              <PencilIcon
                                height={20}
                                width={20}
                                className="cursor-pointer text-gray-500 dark:text-gray-200"
                              />
                            </span> */}
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
          totalCount={800}
          currentPage={1}
        />
      </>
    </div>
  );
}

export default VideosTable;
