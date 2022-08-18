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
import { ShareIcon } from "@heroicons/react/outline";
import {
  FacebookShareButton,
  FacebookIcon,
  InstapaperShareButton,
  InstapaperIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "next-share";

interface Props {
  video_id: string;
}

function ShareModal({ video_id }: Props) {
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
          description: "Thank you for your feedback",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        onClose();
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
        <ShareIcon height={16} width={16} />
      </div>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="dark:bg-gray-800 bg-white text-gray-800 dark:text-white">
          <ModalHeader className="text-center">
            Choose were you want to share
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="text-justify">
            <div className="flex flex-row w-full justify-around">
              <FacebookShareButton url={"http://localhost:3000"}>
                <FacebookIcon size={40} round />
              </FacebookShareButton>

              <RedditShareButton url={"http://localhost:3000"}>
                <RedditIcon size={40} round />
              </RedditShareButton>
              <WhatsappShareButton url={"http://localhost:3000"}>
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>
              <TwitterShareButton url={"http://localhost:3000"}>
                <TwitterIcon size={40} round />
              </TwitterShareButton>
              <InstapaperShareButton url={"http://localhost:3000"}>
                <InstapaperIcon size={40} round />
              </InstapaperShareButton>
            </div>
            <div className="flex flex-col w-full items-center px-5">
              <div
                onClick={onClose}
                className="flex cursor-pointer flex-col items-center text-center w-full mt-8 bg-pink-600 hover:bg-pink-700 rounded-full p-2 text-white"
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

export default ShareModal;
