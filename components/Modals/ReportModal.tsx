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
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { FlagIcon } from "@heroicons/react/solid";

function ReportModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div onClick={onOpen}>
        <FlagIcon height={20} width={20} />
      </div>
      <Modal size={"xl"} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="dark:bg-gray-800 bg-white text-gray-800 dark:text-white">
          <ModalHeader>REPORT THIS VIDEO</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="text-justify">
            <p className="font-semibold text-lg text-center pb-8">
              We will put custom reports here
            </p>
            <Stack>
              <Radio size="md" name="1" colorScheme="green">
                Not a porn video
              </Radio>
              <Radio size="md" name="1" colorScheme="green">
                Violent or Abusive
              </Radio>
              <Radio size="md" name="1" colorScheme="green">
                Young or Underage
              </Radio>
              <Radio size="md" name="1" colorScheme="green">
                Wrong Category
              </Radio>
              <Radio size="md" name="1" colorScheme="green">
                This Is My Video
              </Radio>
            </Stack>
            <div className="flex flex-col w-full items-center px-5">
              <div className="flex flex-col items-center text-center w-full my-8 bg-pink-600 rounded-full p-2 text-white">
                Report
              </div>
              <div onClick={onClose} className="flex">
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
