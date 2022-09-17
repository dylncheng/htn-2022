import { Server } from "socket.io";
import messageHandler from "../../utils/sockets/messageHandler";

export default function SocketHandler(req, res) {
  // It means that socket server was already initialised
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
      cors: {
          origin: ["https://htn-2022.vercel.app", "http://localhost:3000/"],
          allowedHeaders: ['Access-Control-Allow-Origin'],
      }
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