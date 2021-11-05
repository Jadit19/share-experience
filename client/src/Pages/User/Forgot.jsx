import React, { useState } from 'react'
import { TextField } from '@material-ui/core'

import { forgotPass } from '../../Actions/UserActions'
import './auth.css'

import forgotSVG from '../../SVG/Forgot.svg'

const Forgot = () => {
    const [userData, setUserData] = useState({
        email: ''
    })
    const inputVariant = 'standard'
    const inputStyle = {
        marginBottom: '10px'
    }

    const handleReset = () => {
        setUserData({
            email: ''
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        forgotPass(userData)
        alert(`If ${userData.email} matches with any of our Users, we'll send you a mail :)`)
        window.location.href = '/user/login'
    }

    return (
        <div className="card__wrapper">
            <div className="card">
                <div className="card__left">
                    <img className='svg__img' src={forgotSVG} alt="Login Detected" />
                </div>
                <div className="card__right">
                    <div className="card__title">Forgot Password?</div>
                    <div className="card__subtitle">Don't worry :D</div>
                    <form className="auth__form" onSubmit={handleSubmit}>
                        <TextField style={inputStyle} type='email' name='email' variant={inputVariant} label='Email ID' required fullWidth value={userData.email} onChange={(e) => setUserData({ email: e.target.value })} />
                        <div className="btn__container" style={{ marginTop: '10px' }}>
                            <button className="btn btn-1" tpye='submit'>Reset</button>
                            <button className="btn btn-3" onClick={handleReset}>Clear</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Forgot
