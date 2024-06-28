"use client";
import { useEffect, useRef } from "react";

// Define the type for the props
interface VideoProps {
  stream: MediaStream | null;
}

export const Video: React.FC<VideoProps> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div>
      <video
        style={{ borderRadius: 10 }}
        ref={videoRef}
        muted
        width="100%"
        autoPlay
        playsInline
      />
    </div>
  );
};
