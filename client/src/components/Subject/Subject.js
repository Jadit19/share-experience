import React from 'react'
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle'

import './styles.css'

const Subject = ({ subjectName, link }) => {
    return (
        <a className='subject' href={link}>
            <div className='subject__name'>{subjectName}</div>
            <div className='subject__link'>
                VIEW&nbsp;<ArrowDropDownCircleIcon style={{ transform: 'rotateZ(-90deg)' }} />
            </div>
        </a>
    )
}

export default Subject
