    /*
    "use client";
    import { useEffect, useState } from "react";
    import { useParams } from "react-router-dom";
    import socketIO from 'socket.io-client';
    import { Button, Grid, Typography } from "@mui/material";
    import CentralizedCard from '../components/CentralizedCard';
    import { Video } from "./Video";

    // Create the RTCPeerConnection configuration
    let pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    export function MeetingPage() {
      const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
      const [meetingJoined, setMeetingJoined] = useState(false);
      const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
      const [remoteVideoStream, setRemoteVideoStream] = useState<MediaStream | null>(null);

      const { roomId } = useParams<{ roomId: string }>(); // Type the roomId from URL params

      useEffect(() => {
        // Connect to the socket.io server
        const s = socketIO.connect("http://localhost:3000");
        setSocket(s);

        s.on("connect", () => {
          s.emit("join", { roomId });

          // Get user media (camera)
          navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
              setVideoStream(stream);
            })
            .catch((error) => {
              console.error("Error accessing media devices:", error);
            });

          // Listen for remote descriptions and ice candidates from the server
          s.on("localDescription", async ({ description }: { description: RTCSessionDescriptionInit }) => {
            pc.setRemoteDescription(new RTCSessionDescription(description));
            pc.ontrack = (event) => {
              setRemoteVideoStream(new MediaStream([event.track]));
            };

            // Add ICE candidate listener
            s.on("iceCandidate", ({ candidate }: { candidate: RTCIceCandidateInit }) => {
              pc.addIceCandidate(new RTCIceCandidate(candidate));
            });

            pc.onicecandidate = ({ candidate }) => {
              if (candidate) {
                s.emit("iceCandidateReply", { candidate });
              }
            };

            await pc.setLocalDescription(await pc.createAnswer());
            s.emit("remoteDescription", { description: pc.localDescription });
          });

          s.on("remoteDescription", async ({ description }: { description: RTCSessionDescriptionInit }) => {
            await pc.setRemoteDescription(new RTCSessionDescription(description));
            pc.ontrack = (event) => {
              setRemoteVideoStream(new MediaStream([event.track]));
            };

            s.on("iceCandidate", ({ candidate }: { candidate: RTCIceCandidateInit }) => {
              pc.addIceCandidate(new RTCIceCandidate(candidate));
            });

            pc.onicecandidate = ({ candidate }) => {
              if (candidate) {
                s.emit("iceCandidateReply", { candidate });
              }
            };
          });
        });

        // Clean up on component unmount
        return () => {
          s.disconnect();
          pc.close();
          if (videoStream) {
            videoStream.getTracks().forEach(track => track.stop());
          }
          if (remoteVideoStream) {
            remoteVideoStream.getTracks().forEach(track => track.stop());
          }
        };
      }, []);

      if (!videoStream) {
        return <div>Loading...</div>;
      }

      if (!meetingJoined) {
        return (
          <div style={{ minHeight: "100vh" }}>
            <CentralizedCard>
              <Typography textAlign={"center"} variant="h5">
                Hi welcome to meeting {roomId}.
              </Typography>
              <br /><br />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  onClick={async () => {
                    if (socket && videoStream) {
                      pc.onicecandidate = ({ candidate }) => {
                        if (candidate) {
                          socket.emit("iceCandidate", { candidate });
                        }
                      };

                      pc.addTrack(videoStream.getVideoTracks()[0], videoStream);
                      
                      try {
                        await pc.setLocalDescription(await pc.createOffer());
                        socket.emit("localDescription", { description: pc.localDescription });
                      } catch (err) {
                        console.error("Failed to create offer:", err);
                      }

                      socket.on("remoteDescription", async ({ description }: { description: RTCSessionDescriptionInit }) => {
                        await pc.setRemoteDescription(new RTCSessionDescription(description));
                      });

                      socket.on("iceCandidateReply", ({ candidate }: { candidate: RTCIceCandidateInit }) => {
                        pc.addIceCandidate(new RTCIceCandidate(candidate));
                      });

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
            <Video stream={videoStream} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Video stream={remoteVideoStream} />
          </Grid>
        </Grid>
      );
    }
    */
