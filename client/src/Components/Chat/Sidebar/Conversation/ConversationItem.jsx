import React from 'react'
import { Avatar } from '@material-ui/core'

import { IMG_URL } from '../../../../config'
import './ConversationItem.css'

const ConversationItem = ({ selected, conv, userId, onClickFunction, setReciever }) => {
    const i = conv.memberIds[0] === userId ? 1 : 0
    const recieverUserName = conv.memberNames[i]
    const recieverProfilePic = conv.memberProfilePic[i]

    const clickFunc = () => {
        setReciever(recieverUserName)
        onClickFunction()
    }

    return (
        <div className='conv__item' onClick={clickFunc} style={selected ? { backgroundColor: 'rgba(0,0,0,0.1)' } : null}>
            <Avatar src={IMG_URL + recieverProfilePic} />
            <div className="conv__name">{ recieverUserName }</div>
        </div>
    )
}

export default ConversationItem
