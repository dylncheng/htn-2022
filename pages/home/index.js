import io from "socket.io-client";
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";

let socket;

export default function Home() {
  const [username, setUsername] = useState("");
  const [chosenUsername, setChosenUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    // We just call it because we don't need anything else out of it
    await fetch("/api/socket");

    socket = io();

    socket.on("newIncomingMessage", (msg) => {
      setMessages((currentMsg) => [
        ...currentMsg,
        { name: msg.name },
      ]);
      console.log(messages);
    });
  };


  return(
    <>
        <QRCode value="https://htn-2022.vercel.app/signup"></QRCode>
        <ul>
            {messages.map((message, index) => {
                return <li key={index}>{message.name}</li>
            })}
        </ul>
    </>
  );
}