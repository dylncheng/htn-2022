export default (io, socket) => {
    const createdMessage = (msg) => {
        console.log("Sending a message")
        socket.broadcast.emit("newIncomingMessage", msg);
    };

    socket.on("createdMessage", createdMessage);
};