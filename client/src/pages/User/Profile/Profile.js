//! STATUS: OK
import React, { useState } from 'react'

import NoLogin from '../../../components/NoLogin/NoLogin'
import './styles.css'

const Profile = ({ user }) => {

    if (user){
        return (
            <div className='container'>
                <h1 className='header'>User Profile</h1>

                <div className='content'>
                    {user.firstName}<br /><br />
                    <img src={user.profilePic} alt='profilePic' width='200px' />
                </div>

            </div>
        )
    } else {
        return (
            <NoLogin />
        )
    }

}

export default Profile