import React, { useState } from 'react'
import { TextField } from '@material-ui/core'

import NoLogin from '../../../components/NoLogin/NoLogin'
import { changePass } from '../../../actions/UserActions'

const ChangePass = ({ user }) => {

    const [postData, setPostData] = useState({
        email: user.email,
        password: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (postData.password === '')
            alert('New Password cannot be empty!')
        else{
            // console.log(postData)
            changePass(postData)
                .then(res => {
                    alert(res.data.message)
                    window.location.href = '/user/profile'
                })
                .catch(error => {
                    console.log(error)
                    alert('Something went wrong! X(')
                })
        }
    }

    const resetFunc = () => {
        setPostData({
            email: user.email,
            password: ''
        })
    }
    
    if (user){
        return (
            <div className='container'>
                <h1 className='header'>Change Password</h1>

                <form className='content' noValidate onSubmit={handleSubmit}>
                    <TextField type='password' name='password' variant='outlined' label='New Password' required fullWidth value={postData.password} onChange={(e) => setPostData({ ...postData, password: e.target.value })} />

                    <div className='btn__container'>
                        <button className='btn btn__primary' type='submit'>Submit</button>
                        <button className='btn btn__secondary' type='reset' onClick={resetFunc}>RESET</button>
                    </div>
                </form>
            </div>
        )
    } else {
        return (
            <NoLogin />
        )
    }
}

export default ChangePass
