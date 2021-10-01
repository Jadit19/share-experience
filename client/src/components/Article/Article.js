import React from 'react'
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle'

import './styles.css'

const Article = ({ title, author, link }) => {
    return (
        <a className='article' href={link}>
            <div className='upper'>
                <div className='upper__title'>{ title }</div>
                <div className='upper__name'>By:&nbsp;{ author }</div>
            </div>
            <div className='article__link'>
                VIEW&nbsp;<ArrowDropDownCircleIcon style={{ transform: 'rotateZ(-90deg)' }} />
            </div>
        </a>
    )
}

export default Article
