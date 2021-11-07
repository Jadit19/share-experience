import React from 'react'
import { IconButton } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import './Topbar.css'

const Topbar = ({ userName, clickChange }) => {
    return (
        <div className="messenger__topbar">
            <div className="topbar__back__button" style={{ marginRight: 'auto' }}>
                <IconButton onClick={() => clickChange(0)}>
                    <ArrowBackIosIcon style={{ color: 'white' }} />
                </IconButton>
            </div>
            <div className="topbar__name" onClick={() => window.location.href=`/user/profile/${userName}`}>
                { userName }
            </div>
            <div style={{ width: '48px', marginLeft: 'auto' }} className='topbar__back__button'>
                &nbsp;
            </div>
        </div>
    )
}

export default Topbar
