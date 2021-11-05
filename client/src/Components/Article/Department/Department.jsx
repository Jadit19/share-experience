import React from 'react'
import ArrowDropDownCircleSharpIcon from '@material-ui/icons/ArrowDropDownCircleSharp'

import './Department.css'

const Department = ({ deptName, to }) => {
    return (
        <div className='department__wrapper'>
            <div className="department" onClick={() => window.location.href = to}>
                <div className="dept__name">
                    { deptName }
                </div>
                <div className="dept__link">
                    <ArrowDropDownCircleSharpIcon style={{ transform: 'rotateZ(-90deg)' }} />
                </div>
            </div>
        </div>
    )
}

export default Department
