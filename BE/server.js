const app = require("express")
const http = require("http").createServer(app)
const io = require("socket.io")(http)

const port = 4000

function get_public_rooms() {
    const { sockets: { adapter: { sids, rooms } } } = io
    const public_rooms = []
    rooms.forEach((_, key) => {
        if (sids.get(key) === undefined) public_rooms.push(key)
    })
    return public_rooms
}

io.on("connection", (socket) => {
    socket.on("enter_room", (message, callback) => {
        socket.join(message.room_name)
        socket.nickname = message.nickname

        socket.to(message.room_name).emit(
            "welcome",
            {
                announce: `Chatter ${socket.nickname} has come to our room!`,
                room_name: message.room_name,
            }
        )

        io.sockets.emit("room_change", get_public_rooms())
    })

    socket.on("chat", (message, callback) => {
        socket.to(message.room_name).emit(
            "chat",
            {
                nickname: socket.nickname,
                chat: message.chat
            }
        )
        callback(message.chat)
    })

    socket.on("disconnecting", () => {
        socket.rooms.forEach((room) => socket.to(room).emit(
            "bye", { announce: `Goodbye, ${socket.nickname}!` }
        ));
    })

    socket.on("disconnect", () => {
        io.sockets.emit("room_change", get_public_rooms())
    })

    socket.on("init", (callback) => {
        callback(get_public_rooms())
    })
})

http.listen(port, () => console.log(`http://localhost:${port}`))
//http.listen(port, () => console.log(`http://172.69.33.14:${port}`))
