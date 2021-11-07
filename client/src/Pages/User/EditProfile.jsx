import React, { useState } from 'react'
import { IconButton, TextField } from '@material-ui/core'
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

import { updateUser } from '../../Actions/UserActions'
import { uploadFile } from '../../Actions/ImageActions'
import './auth.css'

import editProfileSVG from '../../SVG/Edit.svg'

const EditProfile = ({ user, setUser }) => {
    const [userData, setUserData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        password: '',
        profilePic: user.profilePic
    })
    let postData = {
        firstName: '',
        lastName: '',
        password: user.password,
        profilePic: '',
        id: user._id,
        userId: user._id
    }
    const [passVisible, setPassVisible] = useState(0)
    const [file, setFile] = useState(null)
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
    const handleSubmit = (e) => {
        e.preventDefault()
        postData.firstName = userData.firstName
        postData.lastName = userData.lastName
        postData.password = userData.password !== '' ? userData.password : ''
        postData.profilePic = user.profilePic
        if (file){
            const data = new FormData()
            const fileName = Date.now() + file.name
            postData.profilePic = fileName
            data.append("fileName", fileName)
            data.append("file", file)
            uploadFile(data)
        }
        console.log(postData)
        updateUser(postData)
            .then(res => {
                updateUser(postData)
                    .then((res) => {
                        alert('User info updated successfully!')
                        setUser(res.data)
                        window.location.href = `/user/profile/${user.userName}`
                    })
                    .catch ((res, error) => {
                        console.log(error)
                        alert('Snap! Something went wrong! X(')
                    })
            })
            .catch ((res, error) => {
                console.log(error)
                alert('Snap! Something went wrong! X(')
            })
    }

    return (
        <div className="card__wrapper">
            <div className='card'>
                <div className="card__left">
                    <img className='svg__img' src={editProfileSVG} alt="Hello SVG" />
                </div>
                <div className="card__right">
                    <div className="card__title">Edit Profile</div>
                    <div className="card__subtitle">People change over time..</div>
                    <form className="auth__form" onSubmit={handleSubmit} autoComplete='off'>
                        <TextField style={inputStyle} type='text' name='firstName' variant={inputVariant} label='First Name' required fullWidth value={userData.firstName} onChange={handleChange} />
                        <TextField style={inputStyle} type='text' name='lastName' variant={inputVariant} label='Last Name' fullWidth value={userData.lastName} onChange={handleChange} />
                        <div style={{ position: 'relative' }}>
                            <TextField style={inputStyle} type={passVisible ? 'text' : 'password'} name='password' variant={inputVariant} label='Password' fullWidth value={userData.password} onChange={handleChange} />
                            <IconButton tabIndex={-1} onClick={() => setPassVisible(!passVisible)} style={{ position: 'absolute', top: '4px', right: '4px' }}>
                                {
                                    passVisible ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />
                                }
                            </IconButton>
                        </div>
                        <input style={{ marginTop: '10px', width: '100%' }} type='file' id='file' accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])} />
                        <div className="btn__container">
                            <button className="btn btn-1" tpye='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProfile
