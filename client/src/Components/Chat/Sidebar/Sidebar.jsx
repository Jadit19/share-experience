import React, { useState, useEffect } from 'react'
import { IconButton, Modal, Box, TextField } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

import { newConversation, getConversations } from '../../../Actions/ChatActions'
import ConversationItem from './Conversation/ConversationItem'
import './Sidebar.css'

const Sidebar = ({ user, clickChange, setConvId, setReciever, convId, setRecieverId }) => {
    const [conversations, setConversations] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [newConvData, setNewConvData] = useState({
        firstUserName: user.userName,
        secondUserName: ''
    })

    useEffect(() => {
        getConversations({
            userId: user._id
        })
            .then(res => {
                setConversations(res.data)
            })
            .catch(error => {
                alert('Snap! Something went wrong! X(')
                console.log(error)
            })
    }, [user._id])

    const setConv = (cId, rId) => {
        setConvId(cId)
        setRecieverId(rId)
        clickChange(1)
    }
    const closeModal = () => setModalOpen(false)
    const handleNewConv = (e) => {
        e.preventDefault()
        setNewConvData({
            ...newConvData,
            secondUserName: ''
        })
        closeModal()
        newConversation(newConvData)
            .then(res => {
                window.location.reload()
            })
            .catch(error => {
                alert('Snap! Something went wrong! X(')
                console.log(error)
            })
    }

    return (
        <div className='sidebar'>
            <div className="sidebar__top">
                <div className="chat__heading">
                    Chats
                </div>
                <IconButton onClick={() => setModalOpen(true)}>
                    <AddIcon style={{ color: 'white' }} />
                </IconButton>
            </div>

            <div className="sidebar__content">
            {
                conversations.map((conversation, index) => (
                    <ConversationItem selected={convId === conversation._id} setReciever={setReciever} onClickFunction={() => setConv(
                        conversation._id,
                        conversation.memberIds[0]===user._id ? conversation.memberIds[1] : conversation.memberIds[0]    
                    )} key={index} conv={conversation} userId={user._id} />
                ))
            }
            </div>

            <Modal open={modalOpen} onClose={closeModal}>
                <Box className='modal__box'>
                    <div className="modal__heading__container">
                        <div className="modal__heading">
                            New Chat
                        </div>
                        <IconButton onClick={closeModal}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div className="modal__body">
                        <div className="modal__content">
                            &emsp;Enter the User Name of the person you want to chat with:
                        </div>
                        <form onSubmit={handleNewConv} style={{ marginTop: '5px' }}>
                            <TextField type='text' name='secondUserName' variant='standard' label='User Name' required fullWidth value={newConvData.secondUserName} onChange={(e) => setNewConvData({ ...newConvData, secondUserName: e.target.value })} />
                            <div className="btn__container" style={{ marginBottom: '5px' }}>
                                <button className="btn btn-1" type='submit'>Submit</button>
                            </div>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default Sidebar
