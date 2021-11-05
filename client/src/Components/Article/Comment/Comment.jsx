import React, { useState } from 'react'
import { IconButton, TextField } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import CloseIcon from '@material-ui/icons/Close'

import { editComment, deleteComment } from '../../../Actions/ArticleActions'
import './Comment.css'

const Comment = ({ comment, allowEdit, userId }) => {
    const [commentPostData, setCommentPostData] = useState({
        userId: userId,
        content: comment.content,
        commentId: comment._id
    })
    const [formVisible, setFormVisible] = useState(0)
    const [poppupVisible, setPoppupVisible] = useState(0)
    const stylizing = {
        marginRight: '45px'
    }
    const inputVariant = 'standard'
    const inputStyle = {
        marginBottom: '10px'
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault()
        editComment(commentPostData)
            .then(res => {
                window.location.reload()
            })
            .catch(error => {
                alert('Snap! Something went wrong! X(')
                console.log(error)
                setFormVisible(0)
            })
    }
    const handleCommentDelete = (e) => {
        deleteComment({
            userId: userId,
            commentId: comment._id
        })
            .then(res => {
                window.location.reload()
            })
            .catch(error => {
                alert('Snap! Something went wrong! X(')
                console.log(error)
                setFormVisible(0)
            })
    }

    return (
        <div className='comment__wrapper'>
            <div className="comment">
                {
                    formVisible ? (
                        <>
                            <form onSubmit={handleCommentSubmit} style={{ marginBottom: '10px', padding: '10px' }}>
                                <TextField style={inputStyle} type='text' name='commentContent' variant={inputVariant} label='New Comment' required fullWidth value={commentPostData.content} onChange={(e) => setCommentPostData({ ...commentPostData, content: e.target.value })} />
                                <div className="btn__container" style={{ maxWidth: '300px !important' }}>
                                    <button className="btn btn-1" type='submit'>Submit</button>
                                    <button className="btn btn-3" onClick={() => setFormVisible(0)}>Cancel</button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <>
                            <div className="comment__name" style={ allowEdit ? stylizing : null }>
                                <a href={`/user/profile/${comment.authorName}`}>
                                    { comment.authorName }
                                </a>
                            </div>
                            <div className="comment__content"style={ allowEdit ? stylizing : null }>
                                { comment.content }
                            </div>
                            {
                                allowEdit ? (
                                    <div className="comment__options">
                                        <IconButton onClick={() => setPoppupVisible(1)}>
                                            <MoreVertIcon />
                                        </IconButton>
                                        {
                                            poppupVisible ? (
                                                <div className="comment__operations">
                                                    <IconButton onClick={() => {
                                                        setFormVisible(1)
                                                        setPoppupVisible(0)
                                                    }}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton onClick={handleCommentDelete}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    <IconButton onClick={() => setPoppupVisible(0)}>
                                                        <CloseIcon />
                                                    </IconButton>
                                                </div>
                                            ) : null
                                        }
                                    </div>
                                ) : null
                            }
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Comment
