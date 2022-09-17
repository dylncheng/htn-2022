import { Server } from 'socket.io'
import messageHandler from "../../utils/sockets/messageHandler";


const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    const onConnection = (socket) => {
      messageHandler(io, socket);
    };

    // Define actions inside
    io.on("connection", onConnection);

    io.on('connection', socket => {
      socket.on('input-change', msg => {
        socket.broadcast.emit('update-input', msg)
      })
    })


  }
  res.end()
}

export default SocketHandler