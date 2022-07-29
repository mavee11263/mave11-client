import { Progress, Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";

interface Props {
  progress: any;
}

function UploadLoading({progress}: Props) {
    useEffect(()=>{

    },[progress])
  return (
    <div className="flex w-full dark:text-gray-300 text-gray-700 flex-col items-center">
      <Spinner size={"xl"} />
      <p>Uploading Video ...</p>
      <Progress
        hasStripe
        mt={5}
        isAnimated
        size={"sm"}
        value={Number.parseInt(progress)}
        width="lg"
        rounded={"sm"}
        colorScheme="facebook"
      />
    </div>
  );
}

export default UploadLoading;
