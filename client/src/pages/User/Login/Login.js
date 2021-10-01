//! STATUS: OK
import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import { useHistory } from 'react-router'

import { login } from '../../../actions/UserActions'
import './styles.css'

const Login = ({ saveUser }) => {

    const history = useHistory()

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        // console.log(name, value)

        setUser({
            ...user,
            [name]: value
        })
    }
    const resetFunc = () => {
        setUser({
            email: '',
            password: ''
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        // console.log(user)
        login(user)
            .then(res => {
                localStorage.setItem('profile', JSON.stringify(res.data.result))
                saveUser(res.data.result)
                history.push('/user/profile')
            })
            .catch((error) => {
                console.log(error)
                alert('Something went wrong! X(')
            })
    }

    return (
        <div className='container'>
            <h1 className='header'>Login</h1>
            <form className='content' onSubmit={handleSubmit}>
                <TextField type='email' name='email' variant='outlined' label='Email ID' required fullWidth value={user.email} onChange={handleChange} />
                <TextField type='password' name='password' variant='outlined' label='Password' required fullWidth style={{ marginTop: '20px' }} value={user.password} onChange={handleChange} />

                <div className='btn__container'>
                    <button className='btn btn__primary' type='submit'>Submit</button>
                    <button className='btn btn__secondary' type='reset' onClick={resetFunc}>RESET</button>
                </div>

                <div className='btn__container'>
                    <Button onClick={() => window.location.href = '/user/signUp'}>New here?&nbsp;<b>SignUp!</b></Button>
                </div>
            </form>
        </div>
    )
}

export default Login
