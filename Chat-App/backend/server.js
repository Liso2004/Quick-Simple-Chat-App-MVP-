import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors()); // Allow requests from other devices

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow connections from any device
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
