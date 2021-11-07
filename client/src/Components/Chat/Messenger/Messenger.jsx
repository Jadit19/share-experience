import React, { useState, useEffect, useRef } from 'react'

import { getMessages } from '../../../Actions/ChatActions'
import Topbar from './Topbar/Topbar'
import SendMessage from './SendMessage/SendMessage'
import Message from './Message/Message'
import './Messenger.css'

const Messenger = ({ userId, recieverId, clickChange, convId, reciever, socket }) => {
    const [messages, setMessages] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const msgEndRef = useRef('sive1')

    useEffect(() => {
        socket.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [])
    useEffect(() => {
        arrivalMessage &&
        setMessages(prevMsgs => [ ...prevMsgs, arrivalMessage ])
    }, [arrivalMessage])
    useEffect(() => {
        getMessages({
            convId: convId,
            userId: userId
        })
            .then(res => {
                setMessages(res.data)
            })
            .catch(error => {
                alert('Snap! Something went wrong! X(')
                console.log(error)
            })
    }, [convId, userId])

    const scrollToBottom = () => {
        document.getElementById('sive').scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages])
    
    return (
        <div className='messenger'>
            <Topbar userName={reciever} clickChange={clickChange} />
            <div className="messages__full__absolute__wrapper">
                <div className="all__messages__wrapper">
                {
                    messages.map((message, index) => (
                        <Message key={index} message={message} own={message.sender === userId} />
                    ))
                }
                    <div id='sive' ref={msgEndRef}></div>
                </div>
                <SendMessage setMessages={setMessages} userId={userId} convId={convId} socket={socket} recieverId={recieverId} />
            </div>
        </div>
    )
}

export default Messenger
