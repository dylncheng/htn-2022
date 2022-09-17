import { Button, TextField, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import styles from "../../styles/Signup.module.css"

let socket;

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");


    const sendMessage = async () => {
        console.log("HEYA")
        socket.emit("createdMessage", { name: name, email:email });
    };

    const socketInitializer = async () => {
        // We just call it because we don't need anything else out of it
        // await fetch("/api/socket");
        console.log("IF problem bbefore this then its problem with server")
        socket = io(process.env.BASE_URL, {
            path: "/api/socket",
          });
        console.log("problem is with socket io() call if error abovve")
    //hi
      };

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage()
    }

    useEffect(() => {
        socketInitializer();
    }, [])

    return(
        <>
            <main className={styles.main}>
                <h1>SIGNUP PAGE</h1>
                <form onSubmit={handleSubmit}>
                    <Grid container textAlign={"center"} rowSpacing={3}> 
                        <Grid item xs={12}>
                            <TextField onChange={handleName} id="outlined-required" variant="outlined" label="name"></TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField onChange={handleEmail} id="outlined-required" variant="outlined" label="email"></TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" display="block" type="submit">Start</Button>
                        </Grid>
                    </Grid>
                </form>
            </main>
        </>
    );
}