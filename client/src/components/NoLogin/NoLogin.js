import React from 'react'
import { useHistory } from 'react-router'

const NoLogin = () => {
    const history = useHistory()
    const loginRedirect = () => {
        history.push('/user/login')
    }

    return (
        <div className='container'>
            <h1 className='header'>
                Error 404
            </h1>

            <div className='content'>
                <h4>We are extremely sorry but we were unable to detect a saved login from this Computer. Reasons might be (but are not limited to):</h4>
                
                <ol style={{ paddingLeft: '30px', marginTop: '10px', marginBottom: '20px' }}>
                    <li>You are not logged in.</li>
                    <li>Logged in duration period of 1h is over.</li>
                    <li>Invalid Token.</li>
                </ol>
                
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className='btn btn__primary' onClick={loginRedirect}>Proceed to Login</button>
                </div>
            </div>

        </div>
    )
}

export default NoLogin
