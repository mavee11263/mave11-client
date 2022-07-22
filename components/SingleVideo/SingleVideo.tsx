import Image from "next/image";
import React from "react";
import image_video from "../../public/images/video.png";

function SingleVideo() {
  return (
    <div className="col-span-1 cursor-pointer flex flex-col">
      <div className="relative">
        <Image src={image_video} layout="responsive" objectFit="cover" />
      </div>
    </div>
  );
}

export default SingleVideo;
