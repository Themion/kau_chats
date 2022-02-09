import React, {useState, useEffect} from 'react';
import io from "socket.io-client"

import styles from "./Chats.module.css"

import {Chat, Announce} from "./components/ChatTypes"

const BE_PORT = 4000
const BE = `http://localhost:${BE_PORT}`

const socket = io.connect(BE)

function Chats() {
    const [chat, setChat] = useState("")
    const [chats, setChats] = useState([])

    const onChange = event => { setChat(event.target.value) }
    const onSubmit = (event) => {
        event.preventDefault()
        console.log(chat)
        socket.emit("chat", {
            nickname: "Anon",
            chat: chat,
            roomname: "random"
        })
    }

    socket.on("chat", ({nickname, chat}) => {
        setChats([...chats, {nickname, chat}])
    })

    return (
        <div className={styles.chat_room}>
            <h3 className={styles.title} id="room_name"></h3>
            <div className={`mtb-1 ${styles.chats}`} id="chats">
                {chats.map(({nickname, chat}) => 
                    <Chat nickname={nickname} chat={chat} />
                )}
            </div>
            <form className={`container ${styles.chat_form}`} id="chat_form"
                onSubmit={onSubmit}>
                {/* <textarea className={styles.chat_input} id="chat_input" rows="2" required></textarea> */}
                <input 
                    className={styles.chat_input} 
                    id="chat_input" 
                    required 
                    onChange={onChange}></input>
                <button className={`btn btn-outline-primary ${styles.chat_send}`} id="chat_send">보내기</button>
            </form>
        </div>
    );
}

export default Chats;
