import React, { useState } from 'react'
import { IconButton, TextField } from '@material-ui/core'
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

import { registerUser } from '../../Actions/UserActions'
import { uploadFile } from '../../Actions/ImageActions'
import './auth.css'

import helloSVG from '../../SVG/Hello.svg'

const Register = ({ setUser }) => {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        profilePic: ''
    })
    let postData = {
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        profilePic: ''
    }
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passVisible, setPassVisible] = useState(0)
    const [file, setFile] = useState(null)
    const inputVariant = 'standard'
    const inputStyle = {
        marginBottom: '10px'
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'confirmPassword'){
            setConfirmPassword(e.target.value)
        } else {
            setUserData({
                ...userData,
                [name]: value
            })
        }
    }
    const handleReset = () => {
        setUserData({
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: '',
            profilePic: ''
        })
        setConfirmPassword('')
        setPassVisible(0)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (userData.password !== confirmPassword){
            alert("Passwords don't match!")
        } else {
            postData = userData
            if (file){
                const data = new FormData()
                const fileName = Date.now() + file.name
                postData.profilePic = fileName
                data.append("fileName", fileName)
                data.append("file", file)
                uploadFile(data)
            }
            registerUser(postData)
                .then(res => {
                    setUser(res.data)
                    window.location.href = `/user/profile/${res.data.userName}`
                })
                .catch ((res, error) => {
                    console.log(error)
                    alert('Snap! Something went wrong! X(')
                })
        }
    }

    return (
        <div className="card__wrapper">
            <div className='card'>
                <div className="card__left">
                    <img className='svg__img' src={helloSVG} alt="Hello SVG" />
                </div>
                <div className="card__right">
                    <div className="card__title">Hello!</div>
                    <div className="card__subtitle">Let's get to know each other!</div>
                    <form className="auth__form" onSubmit={handleSubmit} autoComplete='off'>
                        <TextField style={inputStyle} type='text' name='firstName' variant={inputVariant} label='First Name' required fullWidth value={userData.firstName} onChange={handleChange} />
                        <TextField style={inputStyle} type='text' name='lastName' variant={inputVariant} label='Last Name' fullWidth value={userData.lastName} onChange={handleChange} />
                        <TextField style={inputStyle} type='text' name='userName' variant={inputVariant} label='User Name' required fullWidth value={userData.userName} onChange={handleChange} />
                        <TextField style={inputStyle} type='email' name='email' variant={inputVariant} label='Email ID' required fullWidth value={userData.email} onChange={handleChange} />
                        <div style={{ position: 'relative' }}>
                            <TextField style={inputStyle} type={passVisible ? 'text' : 'password'} name='password' variant={inputVariant} label='Password' required fullWidth value={userData.password} onChange={handleChange} />
                            <IconButton tabIndex={-1} onClick={() => setPassVisible(!passVisible)} style={{ position: 'absolute', top: '4px', right: '4px' }}>
                                {
                                    passVisible ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />
                                }
                            </IconButton>
                        </div>
                        <TextField style={inputStyle} type='password' name='confirmPassword' variant={inputVariant} label='Confirm Password' required fullWidth value={confirmPassword} onChange={handleChange} />
                        <input style={{ marginTop: '10px', width: '100%' }} type='file' id='file' accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])} />
                        <div className="btn__container">
                            <button className="btn btn-1" tpye='submit'>Sign In</button>
                            <button className="btn btn-3" onClick={handleReset}>Clear</button>
                        </div>
                    </form>
                    <div className="text__muted" style={{ marginTop: '15px' }}>Already have an account? <a href='/user/login' style={{ color: "var(--color-1)" }}>Login</a></div>
                </div>
            </div>
        </div>
    )
}

export default Register
