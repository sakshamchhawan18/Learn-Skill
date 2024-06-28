"use client"
import React, { useRef, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { useRouter } from 'next/router';
import io from 'socket.io-client';

let socket: Socket;

const Stream = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    socket = io('http://localhost:5000');

    const startStreaming = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (e) => {
        socket.emit('stream', e.data);
      };
      mediaRecorder.start(1000); // Send data every 1 second
    };

    startStreaming();

    // Cleanup function to disconnect the socket
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Stream Live to Classroom</h1>
      <video ref={videoRef} autoPlay muted></video>
    </div>
  );
};

export default Stream;