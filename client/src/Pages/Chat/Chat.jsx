import React, { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

import { WEB_SOCKET_URL, isDesktopApp } from '../../config'
import Sidebar from '../../Components/Chat/Sidebar/Sidebar'
import Messenger from '../../Components/Chat/Messenger/Messenger'
import './Chat.css'

const Chat = ({ user }) => {
    const [displayChats, setDisplayChats] = useState(0)
    const [convId, setConvId] = useState('')
    const [reciever, setReciever] = useState('')
    const [recieverId, setRecieverId] = useState('')
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        setSocket(io(WEB_SOCKET_URL))
    }, [])
    useEffect(() => {
        socket?.emit("addUser", user._id)
        console.log(socket?.id)
    }, [socket])

    return (
        <div className='chat__main__container__wrapper' style={{ height: isDesktopApp ? 'calc(100vh - 80px)' : 'calc(100vh - 50px)', top: isDesktopApp ? '30px' : '0' }}>
            {
                window.innerWidth>850 || !displayChats ? (
                    <div className="sidebar__wrapper">
                        <Sidebar setRecieverId={setRecieverId} convId={convId} setReciever={setReciever} user={user} clickChange={setDisplayChats} setConvId={setConvId} />
                    </div>
                ) : null
            }
            {
                window.innerWidth>850 || displayChats ? convId !== '' ? (
                    <div className="messenger__wrapper">
                        <Messenger recieverId={recieverId} reciever={reciever} clickChange={setDisplayChats} userId={user._id} convId={convId} socket={socket} />
                    </div>
                ) : (
                    <div className='messenger__wrapper'>
                        <div className="no__msg">
                            <div>Open a Conversation</div>
                            <div>to start Messaging.</div>
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}

export default Chat
