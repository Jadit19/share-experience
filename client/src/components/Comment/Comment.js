import React from 'react'

import './styles.css'

const Comment = ({ username, comment }) => {
    return (
        <div className='comment'>
            <div className='comment__name'>{ username }</div>
            <div className='comment__content' dangerouslySetInnerHTML={{ __html: comment }}></div>
        </div>
    )
}

export default Comment
