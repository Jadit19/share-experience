import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import { getUser } from '../../Actions/UserActions'
import { IMG_URL } from '../../Actions/config'
import ProfileData from '../../Components/User/ProfileData/ProfileData'
import UserNotFound from '../../Components/User/UserNotFound'
import './auth.css'

const Profile = ({ user }) => {
    const { userName } = useParams()
    const [profileUser, setProfileUser] = useState(null)

    useEffect(() => {
        getUser({ userName, userId: user._id })
            .then(res => {
                setProfileUser(res.data)
            })
    }, [userName, user._id])

    const redirect = (url_link) => {
        window.location.href = url_link
    }

    if (profileUser){
        return (
            <div className='card__wrapper'>
                <div className="card">
                    <div className="card__right w60">
                        <div className="card__title">
                            { profileUser.userName }
                        </div>
                        <div className="card__subtitle">
                            User Profile:
                        </div>
                        <div className="profile__img__container">
                            <img src={IMG_URL+profileUser.profilePic} alt="" className='svg__img' />
                            <div className="btn__container">
                            {
                                user._id === profileUser._id ? (
                                    <button className="btn btn-1" onClick={() => redirect('/user/editProfile')}>Edit</button>
                                ) : (
                                    <button className="btn btn-3" onClick={() => redirect('/chat')}>Chat</button>
                                )
                            }
                            </div>
                        </div>
                        <div className="profile__container">
                            <ProfileData name='First Name' value={profileUser.firstName} />
                            <ProfileData name='Last Name' value={profileUser.lastName} />
                        </div>
                        <div className="profile__container">
                            <ProfileData name='Contributions' value={0} />
                            {
                                user._id === profileUser._id ? <ProfileData name='Email ID' value={user.email} /> : null
                            }
                        </div>
                    </div>
                    <div className="card__left w40">
                        <img className='svg__img' src={IMG_URL+profileUser.profilePic} alt="" />
                        <div className="btn__container">
                        {
                            user._id === profileUser._id ? (
                                <button className="btn btn-1" onClick={() => redirect('/user/editProfile')}>Edit</button>
                            ) : (
                                <button className="btn btn-3" onClick={() => redirect('/chat')}>Chat</button>
                            )
                        }
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <UserNotFound userName={userName} />
        )
    }
}

export default Profile
