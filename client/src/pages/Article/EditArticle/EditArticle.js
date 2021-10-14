//! STATUS: OK
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { TextField } from '@material-ui/core'

import { showArticle, editArticle } from '../../../actions/ArticleActions'
import NoLogin from '../../../components/NoLogin/NoLogin'

const EditArticle = ({ user }) => {
    
    let { deptSlug, subjectSlug, articleSlug } = useParams()
    const [dept, setDept] = useState({})
    const [subject, setSubject] = useState({})
    const [article, setArticle] = useState({})
    const [postData, setPostData] = useState({
        deptSlug: deptSlug,
        subjectSlug: subjectSlug,
        articleSlug: articleSlug,
        markdown: ''
    })

    useEffect(() => {
        showArticle(deptSlug, subjectSlug, articleSlug)
            .then(res => {
                console.log(res)
                setDept(res.data.dept)
                setSubject(res.data.subject)
                setArticle(res.data.article)
                setPostData({
                    deptSlug: deptSlug,
                    subjectSlug: subjectSlug,
                    articleSlug: articleSlug,
                    markdown: res.data.article.markdown
                })
                if (res.data.article.username !== user.firstName+' '+user.lastName){
                    alert("You don't have permission to view this webpage")
                    window.location.href = `/article/${deptSlug}/${subjectSlug}/${articleSlug}`
                }
            })
            .catch(error => {
                console.log(error)
                window.location.href = `/article/${deptSlug}/${subjectSlug}`
            })
    }, [])

    const resetFunc = () => {
        setPostData({
            deptSlug: deptSlug,
            subjectSlug: subjectSlug,
            articleSlug: articleSlug,
            markdown: ''
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(postData)

        if (postData.title === ''){
            alert('Title cannot be empty!')
        } else if (postData.markdown === ''){
            alert('Message cannot be empty!')
        } else {
            editArticle(postData)
                .then(res => {
                    alert(res.data.message)
                    window.location.href = `/article/${deptSlug}/${subjectSlug}/${articleSlug}`
                })
                .catch(error => {
                    console.log(error)
                    alert('Something went wrong! X(')
                })
        }
    }
    
    if (user){
        // console.log(user)


        return (
            <div className='container'>
                <h1 className='header'>Edit Article</h1>

                <form className='content' autoComplete='off' noValidate onSubmit={handleSubmit}>
                    <TextField type='text' name='markdown' label='Content' variant='outlined' required fullWidth value={postData.markdown} onChange={(e) => setPostData({ ...postData, markdown: e.target.value })} placeholder='You can enter in markdown as well..' />

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

export default EditArticle
