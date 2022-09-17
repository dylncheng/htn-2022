import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

export default function Signup() {
    const [name, setName] = useState("");

    const sendMessage = async (name) => {
        console.log("HEYA")
        socket.emit("createdMessage", { name: name });
    };

    const socketInitializer = async () => {
        // We just call it because we don't need anything else out of it
        await fetch("/api/socket");
    
        socket = io();
    
      };

    const handleChange = (e) => {
        setName(e.target.value);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(name)
    }

    useEffect(() => {
        socketInitializer();
    }, [])

    return(
        <>
            <h1>SIGNUP PAGE</h1>
            <form onSubmit={handleSubmit}>
                <label>name</label>
                <input type="text" name="name" onChange={handleChange}></input>
                <button type="submit"></button>
            </form>
            <button onClick={() => sendMessage()}></button>
        </>
    );
}