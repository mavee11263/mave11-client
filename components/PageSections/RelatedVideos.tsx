import React from "react";
import SingleVideo from "../SingleVideo/SingleVideo";

function RelatedVideos() {
  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1  gap-4">
        {[1, 2, 3, 4, 5].map((item: any, key: number) => (
          <div className="col-span-1">
            <SingleVideo _id={'item._id'} />
          </div>
        ))}
      </div>
    </>
  );
}

export default RelatedVideos;
