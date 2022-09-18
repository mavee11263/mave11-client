import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  isOpen?: any;
  onClose?: any;
  heading?: string;
  body?: any;
  modal_button?:any
};

function ReusableModal({
  isOpen,
  onClose,
  heading,
  body,
  modal_button
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent className=" ">
        <ModalBody className="flex w-full   flex-col items-center ">
          {/* <TrashIcon
          height={80}
          width={80}
          className="text-gray-800  "
        /> */}
          <p className="my-4 text-center text-lg font-semibold text-gray-800 ">
            {heading}
          </p>
          <p className="text-center ">{body}</p>
        </ModalBody>

        <ModalFooter className="">
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          {modal_button}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ReusableModal;
