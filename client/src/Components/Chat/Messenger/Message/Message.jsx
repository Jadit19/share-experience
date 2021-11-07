import React from 'react'
import { format } from 'timeago.js'

import './Message.css'

const Message = ({ message, own }) => {
    return (
        <div className={`msg ${ own ? 'own' : '' }`}>
            <div className="msg__top">
                { message.text }
            </div>
            <div className="msg__bottom">
                { format(message.createdAt) }
            </div>
        </div>
    )
}

export default Message
