import React from 'react'

import User404 from '../../SVG/User404.svg'

const UserNotFound = ({ userName }) => {
    return (
        <div className="card__wrapper">
            <div className="card">
                <div className="card__left">
                    <img className='svg__img' src={User404} alt="User not found" />
                </div>
                <div className="card__right">
                    <div className="card__title">Oh No!</div>
                    <div className="card__subtitle">No User Found</div>
                    <div style={{ marginTop: '20px' }}>
                        &emsp;We couldn't find a user with the User Name:
                        <span style={{ color: 'var(--color-3)', fontWeight: '500' }} >&nbsp;{ userName }</span>.
                    </div>
                    <div className="btn__container">
                        <button className='btn btn-1' onClick={() => window.location.href = '/'}>Home</button>
                        <button className='btn btn-3' onClick={() => window.history.go(-1)}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserNotFound
