import React, { useState } from 'react'
import { IconButton } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'

import { newMessage } from '../../../../Actions/ChatActions'
import './SendMessage.css'

const SendMessage = ({ userId, recieverId, convId, socket, setMessages }) => {
    const [content, setContent] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        socket.emit("sendMessage", {
            senderId: userId,
            recieverId: recieverId,
            text: content
        })
        newMessage({
            conversationId: convId,
            senderId: userId,
            content: content
        })
            .then(res => {
                setMessages(prevMsgs => [ ...prevMsgs, {
                    sender: userId,
                    text: res.data.text,
                    createdAt: res.data.createdAt
                }])
                setContent('')
            })
            .catch(error => {
                alert('Snap! Something went wrong! X(')
                console.log(error)
            })
    }

    return (
        <div className='send__message'>
            <form className="message__form" onSubmit={handleSubmit}>
                <input className='message__input' type='text' value={content} onChange={(e) => setContent(e.target.value)} />
                <IconButton style={{ backgroundColor: 'rgb(22, 204, 22)' }} onClick={handleSubmit}>
                    <SendIcon style={{color: 'white' }} />
                </IconButton>
                <button style={{ display: 'none' }} type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default SendMessage
