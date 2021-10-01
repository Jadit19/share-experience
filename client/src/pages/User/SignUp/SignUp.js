//! STATUS: OK
import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import { useHistory } from 'react-router'
import FileBase from 'react-file-base64'

import { signUp } from '../../../actions/UserActions'
import './styles.css'

const SignUp = () => {

    const history = useHistory()

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        profilePic: ''
    })
    const [confirmPass, setConfirmPass] = useState('')
    const [isSame, setIsSame] = useState(true)

    const handleChange = (e) => {
        const { name, value } = e.target
        // console.log(name, value)

        if (name === 'confirmPass'){
            setConfirmPass(e.target.value)
            if (e.target.value===user.password || e.target.value==='' || user.password===''){
                setIsSame(true)
            } else {
                setIsSame(false)
            }
        } else {
            setUser({
                ...user,
                [name]: value
            })
            if (e.target.value===confirmPass || confirmPass==='' || user.password===''){
                setIsSame(true)
            } else {
                setIsSame(false)
            }
        }
    }

    const resetFunc = () => {
        setUser({
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        })
        setConfirmPass('')
    }

    const handleSubmit= (e) => {
        e.preventDefault()
        // console.log(user)

        if (isSame){
            // console.log(user)
            signUp(user)
                .then(() => {
                    alert(`Welcome ${user.firstName}! Please proceed to Login :)`)
                    history.push('/user/login')
                })
                .catch((error) => {
                    console.log(error)
                    alert('Error!! Please try again after some time..')
                    resetFunc()
                })
        } else {
            alert("Passwords don't match!")
        }
    }

    return (
        <div className='container'>
            <h1 className='header'>Sign In</h1>
            <form className='content' onSubmit={handleSubmit}>
                <TextField type='text' name='firstName' variant='outlined' label='First Name' required fullWidth value={user.firstName} onChange={handleChange} />
                <TextField type='text' name='lastName' variant='outlined' label='Last Name' fullWidth style={{ marginTop: '20px' }} value={user.lastName} onChange={handleChange} />

                <TextField type='email' name='email' variant='outlined' label='Email ID' required fullWidth style={{ marginTop: '20px' }} value={user.email} onChange={handleChange} />
                <TextField type='password' name='password' variant='outlined' label='Password' required fullWidth style={{ marginTop: '20px' }} value={user.password} onChange={handleChange} />

                <TextField type='password' name='confirmPass' variant='outlined' label='Confirm Password' required fullWidth style={{ marginTop: '20px' }} value={confirmPass} onChange={handleChange} />
                {
                    isSame ? null : (
                        <div style={{ color: 'red', marginTop: '10px' }}>
                            Passwords Don't Match!
                        </div>
                    )
                }

                <FileBase type='file' multiple={false} onDone={({ base64 }) => setUser({ ...user, profilePic: base64 })} />

                <div className='btn__container'>
                    <button className='btn btn__primary' type='submit'>Submit</button>
                    <button className='btn btn__secondary' type='reset' onClick={resetFunc}>RESET</button>
                </div>

                <div className='btn__container'>
                    <Button onClick={() => window.location.href = '/user/login'}>Already a User?&nbsp;<b>Login!</b></Button>
                </div>
            </form>
        </div>
    )
}

export default SignUp
