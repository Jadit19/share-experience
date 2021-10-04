import React from 'react'
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle'

import './styles.css'

const Department = ({ deptName, link }) => {
    return (
        <a className='dept' href={link}>
            <div className='dept__name'>{deptName}</div>
            <div className='dept__link'>
                VIEW&nbsp;<ArrowDropDownCircleIcon style={{ transform: 'rotateZ(-90deg)' }} />
            </div>
        </a>
    )
}

export default Department