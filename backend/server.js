const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});

const rooms = {};

io.on('connection', (socket) => {
  console.log('A user connected: ' + socket.id);

  // Handle user disconnection
  socket.on("disconnect", () => {
    const roomId = socket.roomId;
    if (roomId && rooms[roomId]) {
      rooms[roomId] = rooms[roomId].filter(id => id !== socket.id);
      console.log(`User ${socket.id} disconnected from room ${roomId}`);
      socket.to(roomId).emit('user-left', { userId: socket.id });
    }
  });

  // Handle user joining a room
  socket.on("join", ({ roomId }) => {
    socket.roomId = roomId;
    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }
    rooms[roomId].push(socket.id);
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
    socket.to(roomId).emit('user-joined', { userId: socket.id });
  });

  // Handle local description
  socket.on("localDescription", ({ description }) => {
    const roomId = socket.roomId;
    if (roomId) {
      socket.to(roomId).emit("localDescription", {
        userId: socket.id,
        description // Fixed the typo here
      });
    }
  });

  // Handle remote description
  socket.on("remoteDescription", ({ description }) => {
    const roomId = socket.roomId;
    if (roomId) {
      socket.to(roomId).emit("remoteDescription", {
        userId: socket.id,
        description
      });
    }
  });

  // Handle ICE candidates
  socket.on("iceCandidate", ({ candidate }) => {
    const roomId = socket.roomId;
    if (roomId) {
      socket.to(roomId).emit("iceCandidate", {
        userId: socket.id,
        candidate
      });
    }
  });

  // Handle ICE candidate reply
  socket.on("iceCandidateReply", ({ candidate }) => {
    const roomId = socket.roomId;
    if (roomId) {
      socket.to(roomId).emit("iceCandidateReply", {
        userId: socket.id,
        candidate
      });
    }
  });
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});
