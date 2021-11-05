import React from 'react'

import loginFalseSVG from '../../../SVG/LoginFalse.svg'

const LoginFalse = () => {
    return (
        <div className="card__wrapper">
            <div className="card">
                <div className="card__left">
                    <img className='svg__img' src={loginFalseSVG} alt="No Login Detected" />
                </div>
                <div className="card__right">
                    <div className="card__title">Uh Oh!</div>
                    <div className="card__subtitle">No Login Detected</div>
                    <div style={{ marginTop: '20px' }}>
                        &emsp;We couldn't detect a logged-in user from this system. Proceed to Login:
                    </div>
                    <div className="btn__container">
                        <button className='btn btn-1' onClick={() => window.location.href = '/user/login'}>Login</button>
                        <button className='btn btn-3' onClick={() => window.history.go(-1)}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginFalse
