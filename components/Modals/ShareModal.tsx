import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
} from "@chakra-ui/react";
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
import { data } from "../../utils/data";

interface Props {
  video_id: string;
}

function ShareModal({ video_id }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div onClick={onOpen}>
        <ShareIcon height={16} width={16} />
      </div>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="dark:bg-gray-800 bg-white text-gray-800 dark:text-white">
          <ModalHeader className="text-center">
            Where do you want to share
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="text-justify">
            <div className="flex flex-row w-full justify-around">
              <FacebookShareButton url={`${data.site_url}/video/${video_id}`}>
                <FacebookIcon size={40} round />
              </FacebookShareButton>

              <RedditShareButton url={`${data.site_url}/video/${video_id}`}>
                <RedditIcon size={40} round />
              </RedditShareButton>
              <WhatsappShareButton url={`${data.site_url}/video/${video_id}`}>
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>
              <TwitterShareButton url={`${data.site_url}/video/${video_id}`}>
                <TwitterIcon size={40} round />
              </TwitterShareButton>
              <InstapaperShareButton url={`${data.site_url}/video/${video_id}`}>
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
