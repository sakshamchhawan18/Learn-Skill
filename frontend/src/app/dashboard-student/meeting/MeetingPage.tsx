"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { io, Socket } from "socket.io-client";
import { Button, Grid, Typography } from "@mui/material";
import {CentralizedCard} from "./components/CentralizedCard";
import Video from "./components/Video";

const MeetingPage = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [meetingJoined, setMeetingJoined] = useState(false);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [remoteVideoStream, setRemoteVideoStream] = useState<MediaStream | null>(null);
  const router = useRouter();
  const { roomId } = router.query;
  const pcRef = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    if (!roomId) return;

    const s = io("http://localhost:3001");
    s.on("connect", () => {
      setSocket(s);
      s.emit("join", { roomId });

      window.navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(async (stream) => {
          setVideoStream(stream);
        });

      s.on("localDescription", async ({ description }) => {
        if (pcRef.current) {
          pcRef.current.setRemoteDescription(description);
          pcRef.current.ontrack = (e) => {
            setRemoteVideoStream(new MediaStream([e.track]));
          };

          s.on("iceCandidate", ({ candidate }) => {
            pcRef.current?.addIceCandidate(candidate);
          });

          pcRef.current.onicecandidate = ({ candidate }) => {
            s.emit("iceCandidateReply", { candidate });
          };
          await pcRef.current.setLocalDescription(await pcRef.current.createAnswer());
          s.emit("remoteDescription", { description: pcRef.current.localDescription });
        }
      });

      s.on("remoteDescription", async ({ description }) => {
        if (pcRef.current) {
          pcRef.current.setRemoteDescription(description);
          pcRef.current.ontrack = (e) => {
            setRemoteVideoStream(new MediaStream([e.track]));
          };

          s.on("iceCandidate", ({ candidate }) => {
            pcRef.current?.addIceCandidate(candidate);
          });

          pcRef.current.onicecandidate = ({ candidate }) => {
            s.emit("iceCandidateReply", { candidate });
          };
        }
      });
    });

    return () => {
      pcRef.current?.close();
      s.disconnect();
    };
  }, [roomId]);

  if (!videoStream) {
    return <div>Loading...</div>;
  }

  if (!meetingJoined) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <CentralizedCard>
          <div>
            <Typography textAlign={"center"} variant="h5">
              Hi, welcome to meeting {roomId}.
            </Typography>
          </div>
          <br />
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={async () => {
                if (pcRef.current && videoStream) {
                  pcRef.current.onicecandidate = ({ candidate }) => {
                    if (socket) {
                      socket.emit("iceCandidate", { candidate });
                    }
                  };
                  pcRef.current.addTrack(videoStream.getVideoTracks()[0]);

                  try {
                    await pcRef.current.setLocalDescription(await pcRef.current.createOffer());
                    if (socket) {
                      socket.emit("localDescription", { description: pcRef.current.localDescription });
                    }
                  } catch (err) {
                    console.error("Error setting local description:", err);
                  }

                  if (socket) {
                    socket.on("remoteDescription", async ({ description }) => {
                      await pcRef.current?.setRemoteDescription(description);
                    });
                    socket.on("iceCandidateReply", ({ candidate }) => {
                      pcRef.current?.addIceCandidate(candidate);
                    });
                  }
                  setMeetingJoined(true);
                }
              }}
              disabled={!socket}
              variant="contained"
            >
              Join meeting
            </Button>
          </div>
        </CentralizedCard>
      </div>
    );
  }

  return (
    <Grid container spacing={2} alignContent={"center"} justifyContent={"center"}>
      <Grid item xs={12} md={6} lg={4}>
        {videoStream && <Video stream={videoStream} />}
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        {remoteVideoStream && <Video stream={remoteVideoStream} />}
      </Grid>
    </Grid>
  );
};

export default MeetingPage;
