import React from 'react'
import ArrowDropDownCircleSharpIcon from '@material-ui/icons/ArrowDropDownCircleSharp'

import './Article.css'

const Article = ({ title, author, to }) => {
    return (
        <div className='link__article__wrapper'>
            <div className="link__article" onClick={() => window.location.href = to}>
                <div className="link__article__title">{ title }</div>
                <div className="link__article__name">By: { author }</div>
                <div className="link__article__link">
                    <ArrowDropDownCircleSharpIcon style={{ transform: 'rotateZ(-90deg)' }} />
                </div>
            </div>
        </div>
    )
}

export default Article