"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { Button, Grid, Typography } from "@mui/material";
import { CentralizedCard } from "../components/CentralizedCard";
import Video from "../components/Video";

const MeetingPage = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [meetingJoined, setMeetingJoined] = useState(false);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [remoteVideoStream, setRemoteVideoStream] = useState<MediaStream | null>(null);
  const params = useParams();
  const roomId = params.roomId as string;
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const router = useRouter();  // Use useRouter for navigation

  useEffect(() => {
    if (!roomId) return;

    pcRef.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    const s = io("http://localhost:3001");

    s.on("connect", () => {
      setSocket(s);
      s.emit("join", { roomId });

      window.navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(async (stream) => {
          setVideoStream(stream);
          addLocalTrack(stream);
        });

      s.on("localDescription", async ({ description }) => {
        if (pcRef.current && pcRef.current.signalingState !== 'stable') {
          try {
            await pcRef.current.setRemoteDescription(description);
            console.log("Remote description set");
            pcRef.current.ontrack = (event) => {
              console.log("Remote track received:", event.track);
              if (!remoteVideoStream) {
                const stream = new MediaStream();
                stream.addTrack(event.track);
                setRemoteVideoStream(stream);
              }
            };

            s.on("iceCandidate", ({ candidate }) => {
              pcRef.current?.addIceCandidate(candidate);
            });

            pcRef.current.onicecandidate = ({ candidate }) => {
              s.emit("iceCandidateReply", { candidate });
            };

            await pcRef.current.setLocalDescription(await pcRef.current.createAnswer());
            console.log("Local description set");
            s.emit("remoteDescription", { description: pcRef.current.localDescription });
          } catch (err) {
            console.error("Error setting remote description:", err);
          }
        }
      });

      s.on("remoteDescription", async ({ description }) => {
        if (pcRef.current && pcRef.current.signalingState !== 'stable') {
          try {
            await pcRef.current.setRemoteDescription(description);
            console.log("Remote description set");
            pcRef.current.ontrack = (event) => {
              console.log("Remote track received:", event.track);
              if (!remoteVideoStream) {
                const stream = new MediaStream();
                stream.addTrack(event.track);
                setRemoteVideoStream(stream);
              }
            };

            s.on("iceCandidate", ({ candidate }) => {
              pcRef.current?.addIceCandidate(candidate);
            });

            pcRef.current.onicecandidate = ({ candidate }) => {
              s.emit("iceCandidateReply", { candidate });
            };
          } catch (err) {
            console.error("Error setting remote description:", err);
          }
        }
      });
    });

    return () => {
      pcRef.current?.close();
      s.disconnect();
    };
  }, [roomId]);

  const addLocalTrack = (stream: MediaStream) => {
    if (pcRef.current) {
      const existingSenders = pcRef.current.getSenders();
      const videoTrack = stream.getVideoTracks()[0];
      const hasSender = existingSenders.some(sender => sender.track === videoTrack);
      if (!hasSender) {
        pcRef.current.addTrack(videoTrack);
      }
    }
  };

  const disconnect = () => {
    if (socket) {
      socket.disconnect();
    }
    if (pcRef.current) {
      pcRef.current.close();
    }
    router.push("/dashboard-student");  // Redirect to dashboard
  };

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
                  addLocalTrack(videoStream);
                  try {
                    await pcRef.current.setLocalDescription(await pcRef.current.createOffer());
                    console.log("Local description set");
                    if (socket) {
                      socket.emit("localDescription", { description: pcRef.current.localDescription });
                    }
                  } catch (err) {
                    console.error("Error setting local description:", err);
                  }

                  if (socket) {
                    socket.on("remoteDescription", async ({ description }) => {
                      if (pcRef.current) {
                        await pcRef.current.setRemoteDescription(description);
                      }
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
    <div>
      <Grid container spacing={2} alignContent={"center"} justifyContent={"center"}>
        <Grid item xs={12} md={6} lg={4}>
          {videoStream && <Video stream={videoStream} />}
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          {remoteVideoStream && <Video stream={remoteVideoStream} />}
        </Grid>
      </Grid>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          onClick={disconnect}
          variant="contained"
          color="secondary"
        >
          Disconnect and Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default MeetingPage;
