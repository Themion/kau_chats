import React, { useState, useEffect } from 'react';
import io from "socket.io-client"
import styles from "./Table.module.css"

const BE_PORT = 4000
const BE = `http://localhost:${BE_PORT}`
//const BE = `http://127.0.0.1:${BE_PORT}`

const socket = io.connect(BE)

function Room_Record({ room }) {
    // let [room, set_room] = useState(room)

    return (
        <tr
            className={styles.tr}
            onClick={() => window.open(`/${room.id}`, "_blank")}>
            <td className={styles.td}>{room.id}</td>
            <td className={styles.td}>{room.name}</td>
        </tr>
    )
}

function Table() {
    const [newRoomName, setNewRoomName] = useState("")
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        socket.emit("init", (rooms) => { setRooms(rooms) })
    }, [rooms])

    return (
        <div>
            <table className={`table table-striped table-hover`}>
                <colgroup>
                    <col className={styles.room_id}></col>
                    <col className={styles.room_name}></col>
                </colgroup>
                <thead>
                    <tr className={styles.tr}>
                        <th className={styles.th}>#</th>
                        <th className={styles.th}>채팅방 이름</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map(room => <Room_Record key={room.id} room={room} />)}
                </tbody>
            </table>
            <form onSubmit={(event) => {
                event.preventDefault()
                socket.emit("enter_room", newRoomName)
            }}>
                <input 
                    className={styles.input} 
                    required 
                    placeholder='Room Name'
                    onChange={(event) => {
                        setNewRoomName(event.target.value)
                    }}></input>
                <button className="btn btn-outline-primary">
                    Create A New Room
                </button>
            </form>
        </div>
    );
}

export default Table;
