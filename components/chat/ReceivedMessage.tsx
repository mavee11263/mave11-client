import React from "react";

interface Props {
  message: string;
}

function ReceivedMessage({ message }: Props) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 mb-1 text-sm p-1 rounded self-start">
      <p className="text-gray-800 dark:text-white text-sm">{message}</p>
    </div>
  );
}

export default ReceivedMessage;
