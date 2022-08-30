import { useContext } from "react";
import ReactPlayer from "react-player/lazy";
import { Store } from "../../Context/Store";

interface Props {
  video_url?: string;
  thumbnail?: string;
}

const VideoPlayer = ({ video_url, thumbnail }: Props) => {
  const { state } = useContext(Store);
  const { mavee_11_user } = state;
  return (
    <div className="flex lg:h-[550px] md:h-[350px] h-[200px] w-full flex-col items-center bg-black">
      {mavee_11_user ? (
        <ReactPlayer
          // Disable right click
          onContextMenu={(e: any) => e.preventDefault()}
          // Your props
          url={video_url}
          playing={true}
          className="react-player"
          light={thumbnail}
          controls
          width="100%"
          height="100%"
        />
      ) : (
        <ReactPlayer
          // Disable download button
          config={{ file: { attributes: { controlsList: "nodownload" } } }}
          // Disable right click
          onContextMenu={(e: any) => e.preventDefault()}
          // Your props
          url={video_url}
          playing={true}
          className="react-player"
          light={thumbnail}
          controls
          width="100%"
          height="100%"
        />
      )}
    </div>
  );
};
export default VideoPlayer;
