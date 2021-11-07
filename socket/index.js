const dotenv = require('dotenv')
dotenv.config()

const SOCKET_PORT = process.env.SOCKET_PORT
const CLIENT_PORT = process.env.CLIENT_PORT
const CLIENT_ADDRESS = process.env.CLIENT_ADDRESS || `http://localhost:${CLIENT_PORT}`

console.log(`Socket listening on port #${SOCKET_PORT}`)

const io = require('socket.io')(SOCKET_PORT, {
    cors: {
        origin: CLIENT_ADDRESS
    }
})

let users = []

const addUser = async (userId, socketId) => {
    const oldUser = await users.find(user => user.userId === userId)
    if (!oldUser){
        users.push({ userId, socketId })
    }
}
const getUser = (userId) => {
    return users.find(user => user.userId===userId)
}
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId!==socketId)
}

io.on("connection", (socket) => {
    //! Connect
    console.log('A User Connected!')

    //! Take userId and socketId from user
    socket.on("addUser", userId => {
        addUser(userId, socket.id)
    })

    //! Send and get message
    socket.on("sendMessage", ({ senderId, recieverId, text }) => {
        const recieverUser = getUser(recieverId)
        io.to(recieverUser.socketId).emit("getMessage", {
            senderId,
            text
        })
    })

    //! Disconnect
    socket.on("disconnect", () => {
        console.log("A User Disconnected!")
        removeUser(socket.id)
    })
})