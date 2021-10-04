//! STATUS: OK
import React, { useState } from 'react'
import { TextField } from '@material-ui/core'

import { newDept } from '../../../actions/ArticleActions'
import NoLogin from '../../../components/NoLogin/NoLogin'

const NewDept = ({ user }) => {
    
    const [postData, setPostData] = useState({
        deptName: ''
    })

    const resetFunc = () => {
        setPostData({
            deptName: ''
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(postData)

        if (postData.deptName === ''){
            alert('Department name cannot be empty!')
        } else if (postData.deptName === 'newDepartment'){
            alert(';)')
        } else {
            newDept(postData)
            window.location.href = '/article'
        }
    }

    if (user){
        return (
            <div className='container'>
                <h1 className='header'>New Department</h1>

                <form className='content' autoComplete='off' noValidate onSubmit={handleSubmit}>
                    <TextField type='text' name='deptName' label='Department Name' variant='outlined' required fullWidth value={postData.deptName} onChange={(e) => setPostData({ ...postData, deptName: e.target.value })} />

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <button className='btn btn__primary' type='submit' style={{ marginRight: '5px' }}>Submit</button>
                        <button className='btn btn__secondary' type='reset' style={{ marginLeft: '5px' }} onClick={resetFunc}>Reset</button>
                    </div>
                </form>
            </div>
        )
    } else {
        return(
            <NoLogin />
        )
    }

}

export default NewDept
