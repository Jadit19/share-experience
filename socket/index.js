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

io.on("connection", (socket) => {
    console.log('A User Connected!')
})