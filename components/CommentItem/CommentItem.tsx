import { Avatar } from "@chakra-ui/react";
import React from "react";

interface Props{
    name:string,
    comment:string,
    userId?:string,
    pro_pic?:string,
    picture?:string
}

function CommentItem({name, comment, userId, picture}:Props) {
  return (
    <div className="flex flex-row">
      <div className="flex flex-row space-x-4">
        <span>
          <Avatar src={picture} size={'sm'} name={name} />
        </span>
        <div className="flex flex-col">
          <p className="font-semibold text-sm">{name}</p>
          <p className="dark:text-gray-500 text-xs">{comment}</p>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
