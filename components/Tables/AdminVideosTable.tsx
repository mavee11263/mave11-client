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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import moment from "moment";
import axios from "axios";
import { apiUrl } from "../../utils/apiUrl";
import { Store } from "../../Context/Store";
import { ChevronDownIcon } from "@heroicons/react/solid";
import ReusableModal from "../Modals/ReusableModal";

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

function AdminVideosTable({
  delete_item_from_table,
  setPage,
  page,
  data_info,
  PER_PAGE,
  data,
  videos,
  auth_token,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [video_name, setvideoName] = useState("");
  const [video_id, setvideoId] = useState("");
  // for modals 
  const [modal_heading, setModalHeading] = useState("");
  const [modal_body, setModalBody] = useState("");
  const [modal_button, setModalButton] = useState<any>();

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

  const open_delete_modal = (user_id:any, user_name:string) => {
    setModalHeading("Delete Item");
    // setUserToDelete(user_id)
    setvideoId(user_id);
    setvideoName(user_name)
    setModalBody(`Are you sure you want to delete item?`);
    // @ts-ignore
    setModalButton(() => {
      return (
        <Button
          onClick={() => confirm_delete_item(user_id)}
          colorScheme="red"
          isLoading={false}
        >
          Delete
        </Button>
      );
    });
    onOpen()
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
    router.reload();
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
          <div className="w-full overflow-hidden border-b border-gray-200  sm:rounded">
            <table className="min-w-full divide-y divide-gray-200 ">
              <thead className="bg-gray-50 ">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 "
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 "
                  >
                    Category
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 "
                  >
                    Uploaded On
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 "
                  >
                    Views
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 "
                  >
                    Likes
                  </th>

                  <th
                    onClick={() => setChangeStatus(true)}
                    scope="col"
                    className="px-6 py-3 cursor-pointer text-left text-xs font-medium uppercase tracking-wider text-gray-500 "
                  >
                    Status
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 "
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200  bg-white ">
                <>
                  {videos?.map((video: any, index: number) => (
                    <>
                      <tr key={video.thumbnail + index}>
                        <td
                          className="whitespace-nowrap px-6 py-4"
                          onClick={() => router.push(`/video/${video?._id}`)}
                        >
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-100 ">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={video?.thumbnail}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="max-w-xs overflow-hidden text-sm font-medium text-gray-900 ">
                                {video?.title}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-500 ">
                            {video.category}
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-500 ">
                            {moment(video?.createdAt).fromNow()}
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-500 ">
                            {video?.numberOfViews}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-500 ">
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
                          <div className="flex">
                            <Menu size={"xs"}>
                              <MenuButton
                                as={Button}
                                rightIcon={<ChevronDownIcon />}
                              >
                                Actions
                              </MenuButton>
                              <MenuList>
                                <MenuItem onClick={() => router.push(`/video/${video?._id}`)}>View Video</MenuItem>
                                <MenuItem onClick={() => router.push(`/video/${video?._id}`)}>View Channel</MenuItem>
                                <MenuItem>Block Video</MenuItem>

                                <MenuDivider />
                                <MenuItem
                                  onClick={() =>
                                    open_delete_modal(video._id, video.title)
                                  }
                                >
                                  Delete Video
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </div>
                        </td>
                      </tr>
                    </>
                  ))}
                </>
              </tbody>
            </table>

            <ReusableModal
              onClose={onClose}
              isOpen={isOpen}
              heading={modal_heading}
              body={modal_body}
              modal_button={modal_button}
            />

            {/* <Modal isOpen={isOpen} onClose={onClose} isCentered>
              <ModalOverlay />
              <ModalContent className=" ">
                <ModalBody className="flex w-full   flex-col items-center ">
                  <TrashIcon
                    height={80}
                    width={80}
                    className="text-gray-800  "
                  />
                  <p className="my-4 text-center text-lg font-semibold text-gray-800 ">
                    Delete
                  </p>
                  <p className="text-center ">
                    Are you sure you want to delete video with name {video_name}
                    ?
                  </p>
                </ModalBody>

                <ModalFooter className="">
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
            </Modal> */}
          </div>
        </div>
      </div>
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

export default AdminVideosTable;
