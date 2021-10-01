//! STATUS: OK 
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { TextField } from '@material-ui/core'

import NoLogin from '../../../components/NoLogin/NoLogin'
import { getSubject, newSubject } from '../../../actions/ArticleActions'

const NewSubject = ({ user }) => {
    
    let { deptSlug } = useParams()
    const [postData, setPostData] = useState({
        subjectName: '',
        deptSlug: deptSlug
    })

    useEffect(() => {
        getSubject(deptSlug)
            .catch(error => {
                console.log(error)
                window.location.href = `/article`
            })
    }, [])

    const resetFunc = () => {
        setPostData({
            subjectName: '',
            deptSlug: deptSlug
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        if (postData.subjectName === ''){
            alert('Subject Name cannot be empty!')
        } else if (postData.subjectName === 'newSubject'){
            alert(';)')
        } else {
            newSubject(postData)
                .then(res => console.log(res))
                .catch(error => {
                    console.log(error)
                    alert('Something went wrong! :(')
                })
            window.location.href = `/article/${deptSlug}`
        }
    }

    if (user){
        return (
            <div className='container'>
                <h1 className='header'>New Subject</h1>

                <form className='content' autoComplete='off' noValidate onSubmit={handleSubmit}>
                    <TextField type='text' name='subjectName' label='Subject Name' variant='outlined' required fullWidth value={postData.subjectName} onChange={(e) => setPostData({ ...postData, subjectName: e.target.value })} />

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <button className='btn btn__primary' type='submit' style={{ marginRight: '5px' }}>Submit</button>
                        <button className='btn btn__secondary' type='reset' style={{ marginLeft: '5px' }} onClick={resetFunc}>Reset</button>
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

export default NewSubject
