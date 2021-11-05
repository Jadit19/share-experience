import React from 'react'

import loginTrueSVG from '../../../SVG/LoginTrue.svg'

const LoginTrue = ({ user }) => {

    const logoutFunction = () => {
        localStorage.clear()
        window.location.href = '/user/login'
    }

    return (
        <div className="card__wrapper">
            <div className="card">
                <div className="card__left">
                    <img className='svg__img' src={loginTrueSVG} alt="Login Detected" />
                </div>
                <div className="card__right">
                    <div className="card__title">Wait..</div>
                    <div className="card__subtitle">Login Detected</div>
                    <div style={{ marginTop: '20px' }}>
                        &emsp;We detected a login from this system, a user with User Name: 
                        <span style={{ color: 'var(--color-3)', fontWeight: '500' }} >&nbsp;{ user.userName }</span>.
                         Not You?
                    </div>
                    <div className="btn__container">
                        <button className='btn btn-1' onClick={logoutFunction}>Logout</button>
                        <button className='btn btn-3' onClick={() => window.history.go(-1)}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginTrue
