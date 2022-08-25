import React, { useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { Store } from "../../Context/Store";
import axios from "axios";
import { apiUrl } from "../../utils/apiUrl";
import { getError } from "../../utils/error";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

function DeleteModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state, dispatch } = useContext(Store);
  const { mavee_11_user } = state;
  const history = useRouter()
  const toast = useToast();

  const delete_user = async () => {
    try {
      const { data } = await axios.delete(`${apiUrl}/api/user/delete`, {
        headers: {
          Authorization: mavee_11_user?.token,
        },
      });
      history.push("/");
      Cookies.remove("mavee_11_user");
      dispatch({type: 'USER_LOGOUT'})
      toast({
        title: "Account deleted",
        status: "success",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
      console.log(data);
    } catch (error) {
      toast({
        title: getError(error),
        status: "error",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
      console.log(getError(error));
    }
  };

  return (
    <>
      <div
        onClick={onOpen}
        className="flex bg-red-700 text-center p-2 rounded text-white font-semibold cursor-pointer hover:bg-red-600 text-sm"
      >
        Delete Account
      </div>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="dark:bg-gray-800 bg-white text-gray-800 dark:text-white">
          <ModalHeader className="text-center">DELETE THIS ACCOUNT</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="text-justify">
            <div className="flex flex-col w-full items-center px-5">
              <div onClick={delete_user} className="flex cursor-pointer flex-col items-center text-center w-full my-8 bg-red-600 hover:bg-red-700 rounded-full p-2 text-white">
                Delete Account
              </div>
              <div
                onClick={onClose}
                className="flex flex-col items-center text-center cursor-pointer p-2 w-full dark:hover:bg-gray-700 hover:bg-gray-200 rounded-full"
              >
                Cancel
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="flex flex-col w-full items-center mx-auto"></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteModal;
