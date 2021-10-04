//! STATUS: OK
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { TextField } from '@material-ui/core'

import NoLogin from '../../../components/NoLogin/NoLogin'
import { newArticle, getArticle } from '../../../actions/ArticleActions'

const NewArticle = ({ user }) => {

    let { deptSlug, subjectSlug } = useParams()
    const [postData, setPostData] = useState({
        title: '',
        markdown: '',
        deptSlug: deptSlug,
        subjectSlug: subjectSlug,
        username: user.firstName + ' ' + user.lastName
    })

    useEffect(() => {
        getArticle(deptSlug, subjectSlug)
            .then(res => console.log(res))
            .catch(error => {
                console.log(error)
                window.location.href = `/article/${deptSlug}`
            })
    }, [])

    const resetFunc = () => {
        setPostData({
            title: '',
            markdown: ''
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (postData.title === ''){
            alert('Title cannot be empty!')
        } else if (postData.markdown === ''){
            alert('Message content cannot be empty!')
        } else {
            newArticle(postData)
                .then(res => {
                    console.log(res.data)
                    window.location.href = `/article/${deptSlug}/${subjectSlug}`
                })
                .catch(error => {
                    console.log(error)
                    alert('Something went wrong! Please check console for more details..')
                    resetFunc()
                })
        }
    }

    if (user){
        return (
            <div className='container'>
                <h1 className='header'>New Article</h1>

                <form className='content' autoComplete='off' noValidate onSubmit={handleSubmit}>
                    <TextField type='text' name='title' label='Article Title' variant='outlined' required fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                    <TextField style={{ marginTop: '20px' }} type='text' name='markdown' label='Content' variant='outlined' required fullWidth value={postData.markdown} onChange={(e) => setPostData({ ...postData, markdown: e.target.value })} placeholder='You can enter in markdown as well..' />

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

export default NewArticle
