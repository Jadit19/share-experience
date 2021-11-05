import React from 'react'
import ArrowDropDownCircleSharpIcon from '@material-ui/icons/ArrowDropDownCircleSharp'

import './Subject.css'

const Subject = ({ subjectName, to }) => {
    return (
        <div className='subject__wrapper'>
            <div className="subject" onClick={() => window.location.href = to}>
                <div className="subject__name">
                    { subjectName }
                </div>
                <div className="subject__link">
                    <ArrowDropDownCircleSharpIcon style={{ transform: 'rotateZ(-90deg)' }} />
                </div>
            </div>
        </div>
    )
}

export default Subject
