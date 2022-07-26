import React from "react";
import { Text } from "@chakra-ui/react";

interface Props {
  className?: string;
}

function CustomText({ className }: Props) {
  return (
    <Text className={`${className} dark:text-gray-200 text-gray-700`}>
      Text
    </Text>
  );
}

export default CustomText;
