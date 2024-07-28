"use client";
import { useEffect, useRef } from "react";

interface VideoProps {
  stream: MediaStream;
}

export const Video = ({ stream }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div>
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
    </div>
  );
};

export default Video;
