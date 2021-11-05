import React, { useState } from 'react'
import { IconButton, TextField } from '@material-ui/core'
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

import { loginUser } from '../../Actions/UserActions'
import './auth.css'

import welcomeSVG from '../../SVG/Welcome.svg'

const Login = ({ setUser }) => {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })
    const [passVisible, setPassVisible] = useState(0)
    const inputVariant = 'standard'
    const inputStyle = {
        marginBottom: '10px'
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData({
            ...userData,
            [name]: value
        })
    }
    const handleReset = () => {
        setUserData({
            email: '',
            password: ''
        })
        setPassVisible(0)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        loginUser(userData)
            .then(res => {
                setUser(res.data)
                window.location.href = `/user/profile/${res.data.userName}`
            })
            .catch((res, error) => {
                console.log(error)
                alert('Snap! Something went wrong! X(')
            })
    }

    return (
        <div className="card__wrapper">
            <div className='card'>
                <div className="card__left">
                    <img className='svg__img' src={welcomeSVG} alt="Welcome SVG" />
                </div>
                <div className="card__right">
                    <div className="card__title">Welcome!</div>
                    <div className="card__subtitle">It's great to see you back!</div>
                    <form className="auth__form" onSubmit={handleSubmit} autoComplete='off'>
                        <TextField style={inputStyle} type='email' name='email' variant={inputVariant} label='Email ID' required fullWidth value={userData.email} onChange={handleChange} />
                        <div style={{ position: 'relative' }}>
                            <TextField style={inputStyle} type={passVisible ? 'text' : 'password'} name='password' variant={inputVariant} label='Password' required fullWidth value={userData.password} onChange={handleChange} />
                            <IconButton tabIndex={-1} onClick={() => setPassVisible(!passVisible)} style={{ position: 'absolute', top: '4px', right: '4px' }}>
                                {
                                    passVisible ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />
                                }
                            </IconButton>
                        </div>
                        <div className="btn__container" style={{ marginTop: '10px' }}>
                            <button className="btn btn-1" tpye='submit'>LogIn</button>
                            <button className="btn btn-3" onClick={handleReset}>Clear</button>
                        </div>
                    </form>
                    <div className="text__muted" style={{ marginTop: '15px' }}>Don't have an account? <a href='/user/register' style={{ color: "var(--color-1)" }}>Sign Up</a></div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}><a href='/user/forgot' className="text__muted">Forgot Password</a></div>
                </div>
            </div>
        </div>
    )
}

export default Login
