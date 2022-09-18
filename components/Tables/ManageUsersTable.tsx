import React, { useContext, useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";
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

function ManageUsersTable({
  delete_item_from_table,
  setPage,
  page,
  data_info,
  PER_PAGE,
  data,
  videos,
  auth_token,
}: Props) {
  // for modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modal_heading, setModalHeading] = useState("");
  const [modal_body, setModalBody] = useState("");
  const [modal_button, setModalButton] = useState<any>();
  const [user_to_delete, setUserToDelete] = useState('')

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
      //   await axios.delete(`${apiUrl}/api/video/delete/${video_id}`, {
      //     headers: {
      //       Authorization: auth_token,
      //     },
      //   });
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
    setUserToDelete(user_id)
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

  const confirm_block_user = (user_id:string) =>{
    console.log('block user')
  }


  const open_block_modal = (user_id:any, user_name:string) =>{
    setModalHeading("Block User");
    setUserToDelete(user_id)
    setvideoId(user_id);
    setvideoName(user_name)
    setModalBody(`Are you sure you want to block user? User's videos will no longer appear on site`);
    // @ts-ignore
    setModalButton(() => {
      return (
        <Button
          onClick={() => confirm_block_user(user_id)}
          colorScheme="red"
          isLoading={false}
        >
          Block
        </Button>
      );
    });
    onOpen()
  }

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
                    Email
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 "
                  >
                    created on
                  </th>

                  <th
                    onClick={() => setChangeStatus(true)}
                    scope="col"
                    className="px-6 py-3 cursor-pointer text-left text-xs font-medium uppercase tracking-wider text-gray-500 "
                  >
                    Role
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 "
                  >
                    {/* Actions */}
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
                          onClick={() => router.push(`/video/${"video?._id"}`)}
                        >
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-100 ">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={video?.photoURL}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="max-w-xs overflow-hidden text-sm font-medium text-gray-900 ">
                                {video?.username}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-500 ">
                            {video?.email}
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-500 ">
                            {moment(video?.createdAt).fromNow()}
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-500 ">
                            {video?.role}
                          </div>
                        </td>

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
                                <MenuItem onClick={()=> open_block_modal(video?._id, video?.username)}>Block Account</MenuItem>
                                <MenuItem>View User</MenuItem>
                                <MenuDivider />
                                <MenuItem onClick={() => open_delete_modal(video?._id, video?.username)}>
                                  Delete User
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </div>

                          {/* <div className="flex flex-row items-center space-x-2">
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
                          </div> */}
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

export default ManageUsersTable;
