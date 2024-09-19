import React, { useState, useRef } from 'react';
import videoSource from '../../assets/video 1.mp4'; // Replace with your video path

function VideoWithText() {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative w-full h-[91vh]">
      <video
        ref={videoRef}
        src={videoSource}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-xl font-semibold bg-black bg-opacity-50 p-6">
        <h1 className="text-3xl mb-4">Welcome to the Anganwadi Parent Portal</h1>
        <p className="mb-4">Stay informed about your child's growth and activities in our Anganwadi center.</p>
       
      
      </div>
    </div>
  );
}

export default VideoWithText;
