import React from "react";
import ReactPlayer from "react-player";

const Videos = () => {
  return (
    <section className="w-full h-[300px] md:h-[500px] lg:h-screen mt-12 md:mt-20">
      <ReactPlayer
        url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" // Replace with your video URL
        controls={true} // Show video controls (play, pause, volume, etc.)
        playing={false} // Video will not auto-play
        width="100%" // Adjust width based on container
        height="100%" // Adjust height based on container
        config={{
          youtube: {
            playerVars: { modestbranding: 1 },
          },
        }}
      />
    </section>
  );
};

export default Videos;
