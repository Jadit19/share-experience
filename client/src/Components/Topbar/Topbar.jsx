import React from 'react'
import MinimizeIcon from '@material-ui/icons/Minimize'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CloseIcon from '@material-ui/icons/Close'

import { isDesktopApp } from '../../config';
import './Topbar.css'

const Topbar = () => {
    if (isDesktopApp){
        const ipc = window.require('electron').ipcRenderer
        return (
            <div className="top__menu__bar">
                <div className="top__menu__bar__left">
                    Desktop App
                </div>

                <div className="top__menu__bar__right">
                    <div className="top__btn" onClick={() => ipc.send("minimizeApp")}>
                        <MinimizeIcon style={{ color: 'white', zoom: '0.75' }} />
                    </div>
                    <div className="top__btn" onClick={() => ipc.send("maximizeApp")}>
                        <CheckBoxOutlineBlankIcon style={{ color: 'white', zoom: '0.60' }} />
                    </div>
                    <div className="top__btn" onClick={() => ipc.send("closeApp")}>
                        <CloseIcon style={{ color: 'white', zoom: '0.75' }} />
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default Topbar
