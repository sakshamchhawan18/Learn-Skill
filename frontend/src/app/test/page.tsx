"use client"; // This directive ensures that the file is treated as a client-side component

import React, { useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';
import { useRouter } from 'next/router';
import io from 'socket.io-client';

let socket: Socket;

const Test = () => {
  const router = useRouter(); // This should now work without issues
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Client-side only code here
      socket = io('http://localhost:5000');

      socket.on('stream', (data) => {
        const stream = new Blob([data], { type: 'video/webm' });
        if (videoRef.current) {
          videoRef.current.src = URL.createObjectURL(stream);
        }
      });

      // Cleanup function
      return () => {
        socket.disconnect(); // This is a void function, now correctly used as cleanup
      };
    }
  }, []);

  return (
    <div>
      <h1>Classroom Live Stream</h1>
      <video ref={videoRef} controls autoPlay></video>
      <button onClick={() => router.push('/stream')}>Start Streaming</button>
    </div>
  );
};

export default Test;
