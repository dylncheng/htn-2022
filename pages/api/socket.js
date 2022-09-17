import { Server } from "socket.io";
import messageHandler from "../../utils/sockets/messageHandler";

export default function SocketHandler(req, res) {
  // It means that socket server was already initialised
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(2000, {
    cors: {
        origin: "https://htn-2022.vercel.app/",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
  });

  res.socket.server.io = io;

  const onConnection = (socket) => {
    console.log(socket);
    messageHandler(io, socket);
  };

  // Define actions inside
  io.on("connection", onConnection);

  console.log("Setting up socket");
  res.end();
}