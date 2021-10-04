import React, { useState } from 'react'
import { TextField } from '@material-ui/core'

import { forgotPass } from '../../../actions/UserActions'

const ForgotPass = () => {

    const [postData, setPostData] = useState({
        email: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (postData.email === '')
            alert('Email cannot be empty!')
        else{
            // console.log(postData)
            forgotPass(postData)
                .then(res => {
                    alert(res.data.message)
                    window.location.href = '/user/login'
                })
        }
    }
    const resetFunc = () => {
        setPostData({
            email: ''
        })
    }

    return (
        <div className='container'>
            <h1 className='header'>Forgot Password</h1>

            <form className='content' noValidate onSubmit={handleSubmit}>
                <TextField type='email' name='email' variant='outlined' label='Email ID' required fullWidth value={postData.email} onChange={(e) => setPostData({ ...postData, email: e.target.value })} />

                <div className='btn__container'>
                    <button className='btn btn__primary' type='submit'>Submit</button>
                    <button className='btn btn__secondary' type='reset' onClick={resetFunc}>RESET</button>
                </div>
            </form>
        </div>
    )
}

export default ForgotPass
