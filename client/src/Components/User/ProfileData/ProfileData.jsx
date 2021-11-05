import React from 'react'

import './profileData.css'

const ProfileData = ({ name, value }) => {
    return (
        <div className="profile__data">
            <div className="profile__data__up">{ name }</div>
            <div className="profile__data__down">{ value }</div>
        </div>
    )
}

export default ProfileData
