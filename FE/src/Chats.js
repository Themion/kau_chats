import React, {useState, useEffect} from 'react';
import io from "socket.io-client"
import TextField from "@material-ui/core/TextField"

import styles from "./Chats.module.css"

const BE_PORT = 4000
//const BE = `http://localhost:${BE_PORT}`
const BE = `http://172.23.251.51:${BE_PORT}`

const socket = io.connect(BE)

function Chat({nickname, chat}) {
    return (
        <div className={styles.chat}>
            {nickname}: {chat}
        </div>
    )
}

function Announce() {
    return (
        <div className={styles.announce} align="center">
            <hr className={styles.hr} />

            <hr className={styles.hr} />
        </div>
    )
}

function Chats() {
    const [chat, setChat] = useState("")
    const [chats, setChats] = useState([])

    socket.on("chat", ({nickname, chat}) => {
        setChats(chats.join(<Chat nickname={nickname} chat={chat} />))
    })

    return (
        <div className={styles.chat_room}>
            <h3 className={styles.title} id="room_name"></h3>
            <div className={`mtb-1 ${styles.chats}`} id="chats">

            </div>
            <form className={`container ${styles.chat_form}`} id="chat_form"
                onSubmit={(event) => {
                    event.preventDefault()
                    console.log(chat)
                    socket.emit("chat", {
                        nickname: "Anon",
                        chat: chat,
                        roomname: "random"
                    })
                }}>
                {/* <textarea className={styles.chat_input} id="chat_input" rows="2" required></textarea> */}
                <input 
                    className={styles.chat_input} 
                    id="chat_input" 
                    required 
                    onChange={(event) => {
                        setChat(event.target.value)
                    }}></input>
                <button className={`btn btn-outline-primary ${styles.chat_send}`} id="chat_send">보내기</button>
            </form>
        </div>
    );
}

export default Chats;
