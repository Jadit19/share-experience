//! STATUS: OK
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { TextField } from '@material-ui/core'

import { showArticle, newComment } from '../../../actions/ArticleActions'
import Comment from '../../../components/Comment/Comment'
import NoLogin from '../../../components/NoLogin/NoLogin'
import './styles.css'

const ShowArticle = ({ user }) => {

    let { deptSlug, subjectSlug, articleSlug } = useParams()
    const [dept, setDept] = useState({})
    const [subject, setSubject] = useState({})
    const [article, setArticle] = useState({})
    const [comments, setComments] = useState([])
    const [postData, setPostData] = useState({
        deptSlug: deptSlug,
        subjectSlug: subjectSlug,
        articleSlug: articleSlug,
        username: user.firstName + ' ' + user.lastName,
        markdown: ''
    })

    useEffect(() => {
        showArticle(deptSlug, subjectSlug, articleSlug)
            .then(res => {
                // console.log(res)
                setDept(res.data.dept)
                setSubject(res.data.subject)
                setArticle(res.data.article)
                setComments(res.data.comments)
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
            username: user.firstName + ' ' + user.lastName,
            markdown: ''
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (postData.markdown === ''){
            alert('Comment cannot be empty!')
        } else {
            newComment(postData)
                .then(res => {
                    // console.log(res.data)
                    window.location.reload()
                })
                .catch(error => {
                    console.log(error)
                    alert('Something went wrong! Please try again..')
                })
        }
    }

    if (user){

        // console.log(dept)
        // console.log(subject)
        // console.log(article)
        // console.log(comments)

        return (
            <>
                <div className='container'>
                    <h1 className='header'>{ article.title }</h1>
                    <h3 className='articleName'>By:&nbsp;{ article.username }</h3>

                    <div className='content'>
                        <div dangerouslySetInnerHTML={{ __html: article.sanitizedHTML }} />
                        {/* { article.sanitizedHTML } */}
                    </div>
                </div>

                <div className='container' style={{ marginTop: '20px' }}>
                    <h1 className='header'>Comments</h1>

                    <div className='content'>
                        {
                            comments.map(comment => <Comment username={comment.username} comment={comment.sanitizedHTML} />)
                        }
                    </div>
                </div>

                <div className='container' style={{ marginTop: '20px' }}>
                    <h1 className='header'>New Comment</h1>

                    <form className='content' autoComplete='off' noValidate onSubmit={handleSubmit}>
                        <TextField type='text' name='comment' label='Your Comment' variant='outlined' required fullWidth value={postData.markdown} onChange={(e) => setPostData({ ...postData, markdown: e.target.value })} />

                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <button className='btn btn__primary' type='submit' style={{ marginRight: '5px' }}>Submit</button>
                            <button className='btn btn__secondary' type='reset' style={{ marginLeft: '5px' }} onClick={resetFunc}>Reset</button>
                        </div>
                    </form>
                </div>
            </>
        )
    } else {
        return (
            <NoLogin />
        )
    }
}

export default ShowArticle
