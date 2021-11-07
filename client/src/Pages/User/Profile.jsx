import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Modal, Box, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import { getUser, deleteUser } from '../../Actions/UserActions'
import { IMG_URL } from '../../config'
import ProfileData from '../../Components/User/ProfileData/ProfileData'
import UserNotFound from '../../Components/User/UserNotFound'
import './auth.css'

const Profile = ({ user }) => {
    const { userName } = useParams()
    const [profileUser, setProfileUser] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        getUser({ userName, userId: user._id })
            .then(res => {
                setProfileUser(res.data)
            })
    }, [userName, user._id])

    const redirect = (url_link) => {
        window.location.href = url_link
    }
    const closeModal = () => {
        setModalOpen(false)
    }
    const deleteUserFunc = () => {
        deleteUser({
            id: user._id,
        })
            .then(res => {
                localStorage.clear()
                alert('Profile Deleted Successfully!')
                redirect('/')
            })
            .catch(error => {
                alert('Snap! Something went wrong! X(')
                console.log(error)
            })
    }

    if (profileUser){
        return (
            <div className='card__wrapper'>
                <div className="card">
                    <div className="card__right w60">
                        <div className="card__title">
                            { profileUser.user.userName }
                        </div>
                        <div className="card__subtitle">
                            User Profile:
                        </div>
                        <div className="profile__img__container">
                            <img src={IMG_URL+profileUser.user.profilePic} alt="" className='svg__img' />
                            <div className="btn__container">
                            {
                                user._id === profileUser.user._id ? (
                                    <>
                                        <button className="btn btn-1" onClick={() => redirect('/user/editProfile')}>Edit</button>
                                        <button className="btn btn-3" onClick={() => setModalOpen(true)}>Delete</button>
                                    </>
                                ) : (
                                    <button className="btn btn-3" onClick={() => redirect('/chat')}>Chat</button>
                                )
                            }
                            </div>
                        </div>
                        <div className="profile__container">
                            <ProfileData name='First Name' value={profileUser.user.firstName} />
                            <ProfileData name='Last Name' value={profileUser.user.lastName} />
                        </div>
                        <div className="profile__container">
                            <ProfileData name='Contributions' value={profileUser.contri} />
                            {
                                user._id === profileUser.user._id ? <ProfileData name='Email ID' value={user.email} /> : null
                            }
                        </div>
                    </div>
                    <div className="card__left w40">
                        <img className='svg__img' src={IMG_URL+profileUser.user.profilePic} alt="" />
                        <div className="btn__container">
                        {
                            user._id === profileUser.user._id ? (
                                <>
                                    <button className="btn btn-1" onClick={() => redirect('/user/editProfile')}>Edit</button>
                                    <button className="btn btn-3" onClick={() => setModalOpen(true)}>Delete</button>
                                </>
                            ) : (
                                <button className="btn btn-3" onClick={() => redirect('/chat')}>Chat</button>
                            )
                        }
                        </div>
                    </div>
                </div>

                <Modal open={modalOpen} onClose={closeModal}>
                    <Box className="modal__box">
                        <div className="modal__heading__container">
                            <div className="modal__heading">
                                Delete User
                            </div>
                            <IconButton onClick={closeModal}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <div className="modal__body">
                            Are you sure you want to delete your account? This action is irreversible.
                            <div className="btn__container">
                                <button className="btn btn-3" onClick={deleteUserFunc}>Delete</button>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        )
    } else {
        return (
            <UserNotFound userName={userName} />
        )
    }
}

export default Profile
