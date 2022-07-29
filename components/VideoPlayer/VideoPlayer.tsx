import { useRef } from "react";
//@ts-ignore
import { Video, CloudinaryContext } from "cloudinary-react";

interface Props {
  video_url?: string;
  thumbnail?: string;
}

const VideoPlayer = ({ video_url, thumbnail }: Props) => {
  const videoRef = useRef();
  return (
    <CloudinaryContext cloud_name="codedog">
      <div>
        <Video
          poster
          publicId={video_url}
          width="100%"
          controlsList="nodownload"
          controls
          innerRef={videoRef}
          dataSrc={video_url}
        />
      </div>
    </CloudinaryContext>
  );
};
export default VideoPlayer;
