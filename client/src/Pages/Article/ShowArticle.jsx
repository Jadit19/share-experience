import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { TextField, IconButton, Modal, Box } from '@material-ui/core'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import CloseIcon from '@material-ui/icons/Close'

import { getAllComments, getOneArticle, newComment, editArticle, likeArticle, deleteArticle } from '../../Actions/ArticleActions'
import Comment from '../../Components/Article/Comment/Comment'
import './general.css'

const ShowArticle = ({ user }) => {
    const { deptSlug, subjectSlug, articleSlug } = useParams()
    const [article, setArticle] = useState(null)
    const [comments, setComments] = useState([])
    const [postData, setPostData] = useState({
        articleId: '',
        content: '',
        authorId: user._id,
        authorName: user.userName
    })
    const [editPostData, setEditPostData] = useState({
        userId: user._id,
        articleId: '',
        content: ''
    })
    const [likeData, setLikeData] = useState({
        userId: user._id,
        articleId: ''
    })
    const [formVisible, setFormVisible] = useState(0)
    const [likes, setLikes] = useState(0)
    const [isLiked, setIsLiked] = useState(0)
    const [displayModal, setDisplayModal] = useState(false)
    const inputVariant = 'standard'
    const inputStyle = {
        marginBottom: '10px'
    }

    useEffect(() => {
        getOneArticle({
            deptSlug: deptSlug,
            subjectSlug: subjectSlug,
            articleSlug: articleSlug
        })
            .then(res => {
                setArticle(res.data)
                setPostData({
                    ...postData,
                    articleId: res.data._id
                })
                setEditPostData({
                    userId: user._id,
                    articleId: res.data._id,
                    content: res.data.content
                })
                setLikes(res.data.likes.length)
                setLikeData({
                    userId: user._id,
                    articleId: res.data._id
                })
                if (res.data.likes.includes(user._id)){
                    setIsLiked(1)
                }
                getAllComments({
                    articleId: res.data._id
                })
                    .then(resp => {
                        setComments(resp.data)
                    })
                    .catch(err => {
                        alert('Snap! Something went wrong! X(')
                        console.log(err)
                    })
            })
            .catch(error => {
                console.log(error)
                window.location.href = `/article/${deptSlug}/${subjectSlug}`
            })
    }, [deptSlug, subjectSlug, articleSlug])

    const closeModal = () => {
        setDisplayModal(false)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        newComment(postData)
            .then(res => {
                window.location.reload()
            })
            .catch(error => {
                alert('Snap! Something went wrong! X(')
                console.log(error)
            })
    }
    const handleLike = () => {
        if (isLiked){
            setLikes(likes-1)
        } else {
            setLikes(likes+1)
        }
        setIsLiked(!isLiked)
        likeArticle(likeData)
            .then(res => {
                console.log(res.data)
            })
            .catch(error => {
                alert('Snap! Something went wrong! X(')
                console.log(error)
            })
    }
    const handleEdit = (e) => {
        e.preventDefault()
        editArticle(editPostData)
            .then(res => {
                window.location.reload()
            })
            .catch(error => {
                alert('Snap! Something went wrong! X(')
                console.log(error)
                setFormVisible(0)
            })
    }
    const handleDelete = () => {
        deleteArticle({
            userId: user._id,
            articleId: article._id
        })
            .then(res => {
                window.location.href = `/article/${deptSlug}/${subjectSlug}`
            })
            .catch(error => {
                alert('Snap! Something went wrong! X(')
                console.log(error)
                setFormVisible(0)
            })
    }

    if (article){
        return (
            <div className="card__wrapper fdc">
                <div className="card article__card">
                    <div className="article__card__left">
                        <div className="card__title" style={{ textTransform: 'uppercase' }}>{ article.articleName }</div>
                        <div className="card__subtitle">
                            Displaying ./<a href='/article' className='over__link'>article</a>/<a href={`/article/${deptSlug}`} className='over__link'>{ deptSlug }</a>/<a href={`/article/${deptSlug}/${subjectSlug}`} className='over__link'>{ subjectSlug }</a>/<a href={`/article/${deptSlug}/${subjectSlug}/${articleSlug}`} className='over__link'>{ articleSlug }</a>
                        </div>
                        <div className="card__subtitle">
                            By: <a href={`/user/profile/${article.authorName}`} className='over__link'>{ article.authorName }</a>
                        </div>
                        <br />
                        {
                            formVisible ? (
                                <>
                                    <form onSubmit={handleEdit} className="auth__form">
                                        <textarea required defaultValue={article.content} className='article__textarea' onChange={(e) => setEditPostData({ ...editPostData, content: e.target.value })}>
                                        </textarea>
                                        <div className="btn__container">
                                            <button className="btn btn-1" type='submit'>Submit</button>
                                            <button className="btn btn-3" onClick={() => setFormVisible(0)}>Cancel</button>
                                        </div>
                                    </form>
                                </>
                            ) : article.content
                        }
                        <div className="article__options">
                            <div className="like__div">
                                <IconButton onClick={handleLike}>
                                    {
                                        isLiked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />
                                    }
                                </IconButton>
                                Likes:&nbsp;{ likes }
                            </div>
                            {
                                article.authorId === user._id ? (
                                    <div className='article__edit__delete'>
                                        <IconButton onClick={() => setFormVisible(1)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => setDisplayModal(true)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                ) : null
                            }
                        </div>
                    </div>
                    <div className="article__card__right">
                        <div className="card__title">New Comment</div>
                        <div className="card__subtitle">Do Leave a comment!</div>
                        <form autoComplete='off' onSubmit={handleSubmit} className="auth__form">
                            <TextField style={inputStyle} type='text' name='content' variant={inputVariant} label='Comment' required fullWidth value={postData.value} onChange={(e) => setPostData({ ...postData, content: e.target.value })} />
                            <div className="btn__container">
                                <button className="btn btn-1" type='submit'>Submit</button>
                                <button className="btn btn-3" onClick={() => setPostData({ ...postData, content: '' })}>Clear</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="card mh0 ep fdc" style={{ marginTop: '20px' }}>
                    <div className="card__title">
                        Article Comments
                    </div>
                    <div className="card__subtitle" style={{ marginBottom: '15px' }}>
                        Here are the comments posted to this article:
                    </div>
                    {
                        comments.map((comment, index) => (
                            <Comment key={index} comment={comment} allowEdit={comment.authorId === user._id} userId={user._id} />
                        ))
                    }
                </div>

                <Modal open={displayModal} onClose={closeModal}>
                    <Box className="modal__box">
                        <div className="modal__heading__container">
                            <div className="modal__heading">
                                Delete Article
                            </div>
                            <IconButton onClick={closeModal}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <div className="modal__body">
                            <div>Are you sure you want to delete this article?</div>
                            <div className="btn__container">
                                <button className="btn btn-3" onClick={handleDelete}>Yes</button>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        )
    } else {
        return (
            <div>No Article</div>
        )
    }
}

export default ShowArticle
