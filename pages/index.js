import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import QRCode from "react-qr-code";
import io from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import { Typography } from '@mui/material';

let socket;

export default function Home() {
  const [message, setMessage] = useState(null);
  const socketOpened = useRef(false);

  const socketInitializer = async () => {
    // We just call it because we don't need anything else out of it
    await fetch("/api/socket");
    console.log("HI")
    socket = io(process.env.BASE_URL, {
      path: "/api/socket",
    });

    socket.on("newIncomingMessage", (msg) => {
      console.log("hi")
      setMessage((msg)); //hi
    });

    socket.on('connect', () => {
        console.log('connected')
      })

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err}`);
    });
  };

  // const handleRedirect = async () => {
  //   await fetch(`/api/getContact?name=${message.name}&email=${message.email}`);
  // }

  useEffect(() => {
    if(!socketOpened.current) {
      socketOpened.current = true;
      socketInitializer();
    }
  }, []);

  // useEffect()

  return (
    <div className={styles.container}>
      <Head>
        <title>NFTakeIt</title>
        <meta name="description" content="Event authentication for the future" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        { !message && <Typography variant="h1" textAlign="center">NFTakeIt</Typography>}
        {
          !message?<QRCode value="https://htn-2022.vercel.app/signup"></QRCode>:<Typography variant="h1">{`Hi, ${message.name.toUpperCase()}!`}</Typography>
        }
        {
          message &&
          <form method='post' action="/api/contact">
            <input style={{display:'none'}} name="name" value={message.name}></input>
            <input style={{display:'none'}} name="email" value={message.email}></input>
            <Button variant="contained" type="submit">Start</Button>
          </form>
        }
        { !message && <Typography variant="h4">Scan here to start</Typography>}
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
