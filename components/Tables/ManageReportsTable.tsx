import React, { useContext, useState } from "react";
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

interface Props {
  delete_item_from_table?: any;
  setPage?: any;
  page?: any;
  data_info?: any;
  PER_PAGE?: number;
  data: any;
  reports: any;
  auth_token: string;
}

function ManageReportsTable({
  delete_item_from_table,
  setPage,
  page,
  data_info,
  PER_PAGE,
  data,
  reports,
  auth_token,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [report_name, setReportName] = useState("");
  const [report_id, setReportsId] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [change_status, setChangeStatus] = useState(false);
  const [new_status, setNewStatus] = useState("");

  const { state } = useContext(Store);
  const { mavee_11_user } = state;

  const confirm_delete_item = async (report_id: string) => {
    try {
      await axios.delete(`${apiUrl}/api/video/delete/${report_id}`, {
        headers: {
          Authorization: auth_token,
        },
      });
      delete_item_from_table(report_id);
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
    report_id: string,
    description: string,
    thumbnail: string,
    category: string,
    title: string
  ) => {
    await axios.put(
      `${apiUrl}/api/video/edit/${report_id}`,
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
    setReportsId(id);
    setReportName(name);
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
                    Video
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 "
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 "
                  >
                    Report
                  </th>
                  <th
                    onClick={() => setChangeStatus(true)}
                    scope="col"
                    className="px-6 py-3 cursor-pointer text-left text-xs font-medium uppercase tracking-wider text-gray-500 "
                  >
                    Created On
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
                  {reports?.map((video: any, index: number) => (
                    <>
                      <tr key={video.thumbnail + index}>
                        <td
                          className="whitespace-nowrap px-6 py-4"
                          onClick={() => router.push(`/video/${video?.video}`)}
                        >
                          <div className="flex items-center cursor-pointer">
                            <div className="ml-4">
                              <div className="max-w-xs overflow-hidden text-sm font-medium text-gray-900 ">
                                {video?.video}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-500 ">
                            {video.report}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-500 ">
                            {video.user}
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-500 ">
                            {moment(video?.createdAt).fromNow()}
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
                                <MenuItem>View Video</MenuItem>
                                <MenuItem>View Channel</MenuItem>
                                <MenuItem>Block Video</MenuItem>
                                <MenuDivider />
                                <MenuItem>Delete Report</MenuItem>
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

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
              <ModalOverlay />
              <ModalContent className=" ">
                <ModalBody className="flex w-full   flex-col items-center ">
                  <TrashIcon
                    height={80}
                    width={80}
                    className="text-gray-800 dark:text-white "
                  />
                  <p className="my-4 text-center text-lg font-semibold text-gray-800 dark:text-white">
                    Delete
                  </p>
                  <p className="text-center dark:text-white">
                    Are you sure you want to delete video with name{" "}
                    {report_name}?
                  </p>
                </ModalBody>

                <ModalFooter className="">
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    onClick={() => confirm_delete_item(report_id)}
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

export default ManageReportsTable;
