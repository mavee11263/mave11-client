import React, { useContext, useState } from "react";
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
import { FlagIcon } from "@heroicons/react/solid";
import { Store } from "../../Context/Store";
import axios from "axios";
import { apiUrl } from "../../utils/apiUrl";
import { getError } from "../../utils/error";

interface Props {
  video_id: string;
}

function ReportModal({ video_id }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [report, setReport] = useState("");
  const toast = useToast();

  const { state } = useContext(Store);
  const { mavee_11_user } = state;

  const send_report_Hadler = async () => {
    if (!report) {
      
      return;
    } else {
      try {
        await axios.post(
          `${apiUrl}/api/report/create`,
          {
            report: report,
            video: video_id,
          },
          {
            headers: {
              Authorization: mavee_11_user?.token,
            },
          }
        );
        toast({
          title: "Report Send.",
          description: 'Thank you for your feedback',
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        onClose()
      } catch (error) {
        toast({
          title: "Something went wrong.",
          description: getError(error),
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };
  return (
    <>
      <div onClick={onOpen}>
        <FlagIcon height={20} width={20} />
      </div>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="dark:bg-gray-800 bg-white text-gray-800 dark:text-white">
          <ModalHeader className="text-center">REPORT THIS VIDEO</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="text-justify">
            <p className="font-semibold capitalize text-lg text-center pb-8">
              what do you want to report
            </p>
            <fieldset className="sm:col-span-2">
              <div className="mt-4 grid grid-cols-1 gap-y-4">
                <div className="flex items-center">
                  <input
                    id="budget-under-1k"
                    name="budget"
                    defaultValue="under_1k"
                    onChange={(e) => setReport("not-porn")}
                    type="radio"
                    className="focus:ring-grape-500 h-4 w-4 text-grape-600 border-gray-300"
                  />
                  <label htmlFor="not-porn" className="ml-3">
                    <span className="block  text-gray-900 dark:text-gray-200 capitalize">
                      Not a porn video
                    </span>
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="violent-abusive"
                    name="budget"
                    defaultValue="violent-abusive"
                    onChange={(e) => setReport("violent-abusive")}
                    type="radio"
                    className="focus:ring-grape-500 h-4 w-4 text-grape-600 border-gray-300"
                  />
                  <label htmlFor="violent-abusive" className="ml-3">
                    <span className="block  text-gray-900 dark:text-gray-200 capitalize">
                      Violent or abusive
                    </span>
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="underage"
                    name="budget"
                    defaultValue="under-age"
                    onChange={(e) => setReport("under-age")}
                    type="radio"
                    className="focus:ring-grape-500 h-4 w-4 text-grape-600 border-gray-300"
                  />
                  <label htmlFor="underage" className="ml-3">
                    <span className="block  text-gray-900 dark:text-gray-200 capitalize">
                      Young or underage
                    </span>
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="wrong-category"
                    name="budget"
                    defaultValue="wrong-category"
                    onChange={(e) => setReport("wrong-category")}
                    type="radio"
                    className="focus:ring-grape-500 h-4 w-4 text-grape-600 border-gray-300"
                  />
                  <label htmlFor="wrong-category" className="ml-3">
                    <span className="block  text-gray-900 dark:text-gray-200 capitalize">
                      Wrong Category
                    </span>
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="my-video"
                    name="budget"
                    defaultValue="my-video"
                    onChange={(e) => setReport("my-video")}
                    type="radio"
                    className="focus:ring-grape-500 h-4 w-4 text-grape-600 border-gray-300"
                  />
                  <label htmlFor="my-video" className="ml-3">
                    <span className="block  text-gray-900 dark:text-gray-200 capitalize">
                      This is my video
                    </span>
                  </label>
                </div>
              </div>
            </fieldset>

            <div className="flex flex-col w-full items-center px-5">
              <div
                onClick={send_report_Hadler}
                className="flex cursor-pointer flex-col items-center text-center w-full my-8 bg-pink-600 hover:bg-pink-700 rounded-full p-2 text-white"
              >
                Report
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

export default ReportModal;
